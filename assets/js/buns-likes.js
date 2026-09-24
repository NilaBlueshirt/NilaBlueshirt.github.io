(function () {
  "use strict";

  var API = "https://abacus.jasoncameron.dev";
  var NAMESPACE = "nilablueshirt-buns";

  var medias = document.querySelectorAll(".buns-item__media");
  if (medias.length === 0 || !window.fetch) {
    return;
  }

  function keyFor(src) {
    var h = 5381;
    var i;
    for (i = 0; i < src.length; i += 1) {
      h = ((h << 5) + h + src.charCodeAt(i)) >>> 0;
    }
    return "img-" + h.toString(36);
  }

  function readLiked() {
    try {
      return JSON.parse(window.localStorage.getItem("buns-liked") || "{}");
    } catch (e) {
      return {};
    }
  }

  function writeLiked(map) {
    try {
      window.localStorage.setItem("buns-liked", JSON.stringify(map));
    } catch (e) {
      return;
    }
  }

  var liked = readLiked();

  function setCount(el, value) {
    el.textContent = value > 0 ? String(value) : "";
  }

  function pop(btn) {
    btn.classList.remove("buns-like--pop");
    void btn.offsetWidth;
    btn.classList.add("buns-like--pop");
  }

  function build(media) {
    var img = media.querySelector("img");
    if (!img) {
      return;
    }
    var key = keyFor(img.getAttribute("src") || "");

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "buns-like";
    btn.setAttribute("aria-label", "Like this photo");
    btn.setAttribute("aria-pressed", liked[key] ? "true" : "false");

    var icon = document.createElement("i");
    icon.className = "fas fa-heart";
    icon.setAttribute("aria-hidden", "true");

    var count = document.createElement("span");
    count.className = "buns-like__count";

    btn.appendChild(icon);
    btn.appendChild(count);
    media.appendChild(btn);

    if (liked[key]) {
      btn.classList.add("buns-like--liked");
    }

    window.fetch(API + "/get/" + NAMESPACE + "/" + key).then(function (r) {
      return r.ok ? r.json() : { value: 0 };
    }).then(function (d) {
      setCount(count, d.value || 0);
    }).catch(function () {
      return;
    });

    btn.addEventListener("click", function () {
      if (liked[key]) {
        pop(btn);
        return;
      }
      liked[key] = 1;
      writeLiked(liked);
      btn.classList.add("buns-like--liked");
      btn.setAttribute("aria-pressed", "true");
      pop(btn);
      window.fetch(API + "/hit/" + NAMESPACE + "/" + key).then(function (r) {
        return r.ok ? r.json() : null;
      }).then(function (d) {
        if (d && d.value) {
          setCount(count, d.value);
        }
      }).catch(function () {
        return;
      });
    });
  }

  var i;
  for (i = 0; i < medias.length; i += 1) {
    build(medias[i]);
  }
}());
