(function () {
  "use strict";

  var dialog = document.getElementById("cite-dialog");
  if (!dialog || typeof dialog.showModal !== "function") {
    return;
  }
  var list = document.getElementById("cite-dialog-styles");

  function buildStyles(d) {
    var title = d.title || "";
    var venue = d.venue || "";
    var year = d.year || "";
    var apa = title + ". (" + year + "). " + venue + ".";
    var mla = "“" + title + ".” " + venue + ", " + year + ".";
    var field = d.entrytype === "article" ? "journal" : "booktitle";
    var bib = "@" + (d.entrytype || "misc") + "{" + (d.key || "citation") + ",\n";
    bib += "  title = {" + title + "},\n";
    bib += "  " + field + " = {" + venue + "},\n";
    bib += "  year = {" + year + "}";
    if (d.url) {
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
