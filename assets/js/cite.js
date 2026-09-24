(function () {
  "use strict";

  var dialog = document.getElementById("cite-dialog");
  if (!dialog || typeof dialog.showModal !== "function") {
    return;
  }
  var list = document.getElementById("cite-dialog-styles");

  function parseName(name) {
    var parts = name.trim().split(/\s+/);
    var family = parts.length > 1 ? parts[parts.length - 1] : parts[0];
    var given = parts.slice(0, parts.length > 1 ? parts.length - 1 : 0).join(" ");
    return { family: family, given: given };
  }

  function initials(given) {
    if (!given) {
      return "";
    }
    return given.split(/\s+/).map(function (token) {
      return token.split("-").map(function (part) {
        return part.charAt(0).toUpperCase() + ".";
      }).join("-");
    }).join(" ");
  }

  function apaAuthors(names) {
    var formatted = names.map(function (n) {
      var p = parseName(n);
      var init = initials(p.given);
      return init ? p.family + ", " + init : p.family;
    });
    if (formatted.length === 1) {
      return formatted[0];
    }
    return formatted.slice(0, -1).join(", ") + ", & " + formatted[formatted.length - 1];
  }

  function mlaAuthors(names) {
    var first = parseName(names[0]);
    var lead = first.given ? first.family + ", " + first.given : first.family;
    if (names.length === 1) {
      return lead;
    }
    if (names.length === 2) {
      return lead + ", and " + names[1].trim();
    }
    return lead + ", et al";
  }

  function buildStyles(d) {
    var title = d.title || "";
    var venue = d.venue || "";
    var year = d.year || "";
    var doi = d.doi || "";
    var names = d.authors ? d.authors.split("|").filter(function (n) {
      return n.trim().length > 0;
    }) : [];

    var apa = "";
    if (names.length > 0) {
      apa += apaAuthors(names) + " (" + year + "). " + title + ". " + venue + ".";
    } else {
      apa += title + ". (" + year + "). " + venue + ".";
    }
    if (doi) {
      apa += " https://doi.org/" + doi;
    }

    var mla = "";
    if (names.length > 0) {
      mla += mlaAuthors(names) + ". ";
    }
    mla += "“" + title + ".” " + venue + ", " + year + ".";
    if (doi) {
      mla += " doi:" + doi + ".";
    }

    var field = d.entrytype === "article" ? "journal" : "booktitle";
    var bib = "@" + (d.entrytype || "misc") + "{" + (d.key || "citation") + ",\n";
    if (names.length > 0) {
      bib += "  author = {" + names.map(function (n) {
        return n.trim();
      }).join(" and ") + "},\n";
    }
    bib += "  title = {" + title + "},\n";
    bib += "  " + field + " = {" + venue + "},\n";
    bib += "  year = {" + year + "}";
    if (doi) {
      bib += ",\n  doi = {" + doi + "}";
    } else if (d.url) {
      bib += ",\n  url = {" + d.url + "}";
    }
    bib += "\n}";

    return [["APA", apa], ["MLA", mla], ["BibTeX", bib]];
  }

  function copyText(text, button) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        button.textContent = "Copied";
        window.setTimeout(function () {
          button.textContent = "Copy";
        }, 1500);
      }, function () {
        window.prompt("Copy the citation:", text);
      });
      return;
    }
    window.prompt("Copy the citation:", text);
  }

  function addStyleBlock(name, text) {
    var section = document.createElement("section");
    section.className = "cite-style";
    var head = document.createElement("div");
    head.className = "cite-style__head";
    var label = document.createElement("span");
    label.className = "cite-style__name";
    label.textContent = name;
    var copy = document.createElement("button");
    copy.type = "button";
    copy.className = "cite-style__copy";
    copy.textContent = "Copy";
    copy.addEventListener("click", function () {
      copyText(text, copy);
    });
    var pre = document.createElement("pre");
    pre.className = "cite-style__text";
    pre.textContent = text;
    head.appendChild(label);
    head.appendChild(copy);
    section.appendChild(head);
    section.appendChild(pre);
    list.appendChild(section);
  }

  function openDialog(data) {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    var styles = buildStyles(data);
    var i;
    for (i = 0; i < styles.length; i += 1) {
      addStyleBlock(styles[i][0], styles[i][1]);
    }
    dialog.showModal();
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!target.closest) {
      return;
    }
    var trigger = target.closest("[data-cite]");
    if (trigger) {
      openDialog(trigger.dataset);
      return;
    }
    if (target.closest("[data-cite-close]")) {
      dialog.close();
      return;
    }
    if (target === dialog) {
      dialog.close();
    }
  });
}());
