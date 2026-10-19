(function () {
  "use strict";

  // "Related paper/talk" links highlight the paired card through :target.
  // Clicking the link again while its card is highlighted turns it off.
  var links = document.querySelectorAll(".research-card__link--related");
  if (links.length === 0) {
    return;
  }

  function toggle(event) {
    if (window.location.hash !== this.hash) {
      return;
    }
    event.preventDefault();
    // A fragment that matches no element clears :target without scrolling;
    // then drop it from the address bar.
    window.location.hash = "_";
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  var i;
  for (i = 0; i < links.length; i += 1) {
    links[i].addEventListener("click", toggle);
  }
}());
