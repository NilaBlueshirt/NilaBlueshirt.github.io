#!/usr/bin/env python3
"""
Build the Buns gallery from a Google Photos shared album.

Runs inside the site build (.github/workflows/pages.yml); nothing it writes is
committed. The album link comes from the BUNS_ALBUM_URL environment variable,
a GitHub Actions secret, because the album page shows the owner's name and
Google account. Each photo is downloaded once, stripped of all metadata
(including GPS location), and saved as WebP under images/buns/, which the
workflow keeps between builds with actions/cache. Photos removed from the
album are dropped, so they leave the site on the next deploy.

Outputs (all gitignored):
  images/buns/<id>.webp     photos served by the site
  .buns-cache/manifest.json sizes and album dates (dot-folder, never served)
  _data/buns_gallery.yml    what _pages/buns.html renders

_data/buns.yml is the hand-edited input: entries with an `id` add alt/caption
to an album photo, entries without one are extra photos shown after the album.
"""

import argparse
import hashlib
import io
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import yaml
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
IMAGE_DIR = ROOT / "images" / "buns"
MANIFEST = ROOT / ".buns-cache" / "manifest.json"
INPUT_FILE = ROOT / "_data" / "buns.yml"
OUTPUT_FILE = ROOT / "_data" / "buns_gallery.yml"

MAX_EDGE = 1600
WEBP_QUALITY = 82
ALBUM_PREFIXES = ("https://photos.app.goo.gl/", "https://photos.google.com/share/")
IMAGE_PREFIX = "https://lh3.googleusercontent.com/"
# A browser User-Agent sometimes gets an interstitial page instead of the album.
USER_AGENT = "Mozilla/5.0 (compatible; buns-gallery-sync)"
# The album page lists the first 300 items; the web client fetches the rest
# with this RPC as you scroll: args [album_id, page_token, None, share_key].
RPC_URL = "https://photos.google.com/_/PhotosUi/data/batchexecute"
RPC_ID = "snAcKc"
MAX_PAGES = 200
VIDEO_KEY = "76647426"  # only videos carry this key in an item's trailing dict


class AlbumError(Exception):
    pass


def note(level, message):
    # Keep messages generic: never echo the album URL or page contents.
    print(f"::{level}::{message}")


def fetch(url, form=None):
    """Return (final_url, body), retrying transient failures. `form` makes it a POST."""
    headers = {"User-Agent": USER_AGENT, "Accept-Language": "en-US"}
    data = None
    if form is not None:
        headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8"
        data = urllib.parse.urlencode(form).encode()
    request = urllib.request.Request(url, data=data, headers=headers)
    for attempt in range(3):
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                return response.geturl(), response.read()
        except urllib.error.HTTPError as e:
            error = f"HTTP {e.code}"
        except urllib.error.URLError as e:
            error = str(e.reason)
        time.sleep(2 ** attempt)
    raise AlbumError(error)


def album_payload(html):
    """Find the embedded payload shaped [_, items, next_token, album_meta, ...]."""
    # The page embeds data as AF_initDataCallback({key: 'ds:N', ..., data: [...]}).
    # Check each block's shape rather than trusting a specific key.
    decoder = json.JSONDecoder()
    pos = 0
    while (start := html.find("AF_initDataCallback(", pos)) >= 0:
        pos = start + 1
        data_at = html.find("data:", start)
        if data_at < 0:
            break
        try:
            raw, _ = decoder.raw_decode(html, data_at + len("data:"))
        except ValueError:
            continue
        if (isinstance(raw, list) and len(raw) > 3 and isinstance(raw[1], list)
                and isinstance(raw[3], list) and len(raw[3]) > 21):
            return raw
    raise AlbumError("Found no album data on the page. The album may be empty or unshared, "
                     "or Google changed the page format.")


def next_page(album_id, key, token):
    """Return (items, next_token) for the page after `token`."""
    request = json.dumps([[[RPC_ID, json.dumps([album_id, token, None, key]), None, "generic"]]])
    _, body = fetch(RPC_URL, {"f.req": request})
    text = body.decode("utf-8").removeprefix(")]}'")
    decoder, pos = json.JSONDecoder(), 0
    while pos < len(text):
        if text[pos].isspace():
            pos += 1
            continue
        value, pos = decoder.raw_decode(text, pos)
        for envelope in value if isinstance(value, list) else []:
            if isinstance(envelope, list) and envelope[:2] == ["wrb.fr", RPC_ID] and envelope[2]:
                payload = json.loads(envelope[2])
                return payload[1] or [], payload[2] or ""
    raise AlbumError("Google refused the request for the next page of the album.")


def to_photo(item):
    """Return {uid, url, added} for a photo item, or None for videos and oddities."""
    try:
        uid, (url, width, height), added = item[0], item[1][:3], item[5]
    except (TypeError, ValueError, IndexError):
        return None
    if isinstance(item[-1], dict) and VIDEO_KEY in item[-1]:
        return None
    if (isinstance(uid, str) and isinstance(url, str) and url.startswith(IMAGE_PREFIX)
            and isinstance(width, int) and isinstance(height, int) and isinstance(added, (int, float))):
        return {"uid": uid, "url": url, "added": added}
    return None


def fetch_album(album_url):
    """Return (photos, complete). Raises AlbumError if the album can't be read."""
    try:
        final_url, body = fetch(album_url)
    except AlbumError as e:
        raise AlbumError(f"Could not load the album page ({e}). Is link sharing still on?")
    try:
        raw = album_payload(body.decode("utf-8"))
        items, token, meta = list(raw[1]), raw[2], raw[3]
        album_id, total = meta[0], meta[21]
        key = urllib.parse.parse_qs(urllib.parse.urlparse(final_url).query).get("key", [meta[19]])[0]
        for _ in range(MAX_PAGES):
            if not token:
                break
            page, token = next_page(album_id, key, token)
            if not page:
                break
            items += page
        uids = {item[0] for item in items}
    except (ValueError, TypeError, IndexError, KeyError):
        raise AlbumError("Could not read the album data; Google may have changed the page format.")

    photos = [p for p in map(to_photo, items) if p]
    if not photos:
        raise AlbumError("Found no photos in the album.")
    # The album reports its own item count, so a short listing is detectable.
    complete = not token and (not isinstance(total, int) or len(uids) >= total)
    return photos, complete


def photo_id(uid):
    return hashlib.sha256(uid.encode()).hexdigest()[:12]


def save_photo(photo, pid):
    _, data = fetch(photo["url"] + f"=s{MAX_EDGE}")
    with Image.open(io.BytesIO(data)) as img:
        img = ImageOps.exif_transpose(img)
        img = img.convert("RGBA" if img.has_transparency_data else "RGB")
        img.thumbnail((MAX_EDGE, MAX_EDGE))
        # Re-encoding without exif/xmp drops every metadata tag, GPS included.
        img.save(IMAGE_DIR / f"{pid}.webp", "WEBP", quality=WEBP_QUALITY, method=6,
                 icc_profile=img.info.get("icc_profile"))
        return {"width": img.width, "height": img.height, "added": photo["added"]}


def sync(manifest, photos, complete):
    """Download new album photos and drop removed ones; return the new manifest."""
    album = {photo_id(p["uid"]): p for p in photos}
    # A partial listing can't tell us what was removed, so keep everything we have.
    synced = {} if complete else dict(manifest)
    todo = []
    for pid, photo in album.items():
        if pid in manifest and (IMAGE_DIR / f"{pid}.webp").exists():
            synced[pid] = manifest[pid]
        else:
            todo.append(pid)

    def download(pid):
        try:
            return pid, save_photo(album[pid], pid)
        except (AlbumError, OSError) as e:
            note("warning", f"Skipped photo {pid} ({e}); will retry next run.")
            return pid, None

    with ThreadPoolExecutor(max_workers=6) as pool:
        for pid, info in pool.map(download, todo):
            if info:
                synced[pid] = info

    for path in IMAGE_DIR.glob("*.webp"):
        if path.stem not in synced:
            path.unlink()

    if not complete:
        note("warning", "Could not list the whole album, so removals are skipped this run.")
    return synced


def gallery(manifest):
    """Album photos newest first (with any alt/caption from _data/buns.yml), then extras."""
    entries = yaml.safe_load(INPUT_FILE.read_text(encoding="utf-8")) if INPUT_FILE.exists() else None
    entries = entries or []
    extras = {e["id"]: e for e in entries if "id" in e}
    photos = []
    for pid in sorted(manifest, key=lambda pid: manifest[pid]["added"], reverse=True):
        photo = {"url": f"/images/buns/{pid}.webp",
                 "width": manifest[pid]["width"], "height": manifest[pid]["height"]}
        photo.update({k: v for k, v in extras.get(pid, {}).items() if k in ("alt", "caption")})
        photos.append(photo)
    return photos + [e for e in entries if "id" not in e and e.get("url")]


def main():
    parser = argparse.ArgumentParser(description="Build the Buns gallery from a Google Photos shared album.")
    parser.add_argument("--scheduled", action="store_true",
                        help="fail on album errors instead of building with the last sync")
    args = parser.parse_args()

    previous = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}
    manifest = previous
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)

    album_url = os.environ.get("BUNS_ALBUM_URL", "").strip()
    if not album_url:
        note("warning", f"BUNS_ALBUM_URL is not set; using the {len(previous)} photos from the last sync.")
    else:
        try:
            if not album_url.startswith(ALBUM_PREFIXES):
                raise AlbumError("BUNS_ALBUM_URL is not a Google Photos shared album link.")
            manifest = sync(previous, *fetch_album(album_url))
        except AlbumError as e:
            # Fall back to the last sync only when there is one; never publish an empty gallery.
            if args.scheduled or not previous:
                note("error", str(e))
                sys.exit(1)
            note("warning", f"{e} Building with the {len(previous)} photos from the last sync.")

    MANIFEST.write_text(json.dumps(manifest, indent=1, sort_keys=True))
    OUTPUT_FILE.write_text(yaml.safe_dump(gallery(manifest), sort_keys=False, allow_unicode=True),
                           encoding="utf-8")

    changed = manifest != previous
    if "GITHUB_OUTPUT" in os.environ:
        with open(os.environ["GITHUB_OUTPUT"], "a") as out:
            out.write(f"changed={'true' if changed else 'false'}\n")
    added = len(manifest.keys() - previous.keys())
    removed = len(previous.keys() - manifest.keys())
    print(f"Gallery has {len(manifest)} album photos: added {added}, removed {removed}.")


if __name__ == "__main__":
    main()
