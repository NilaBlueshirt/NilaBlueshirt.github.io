(function () {
  "use strict";

  // "Related paper/talk" links highlight the paired card through :target. The
  // highlight turns off on a click on the page outside the cards, or when the
  // same link is clicked again.
  function clearTarget() {
    // A fragment that matches no element clears :target without scrolling;
    // then drop it from the address bar.
    window.location.hash = "_";
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  function toggle(event) {
    if (window.location.hash !== this.hash) {
      return;
    }
    event.preventDefault();
    clearTarget();
  }

  var links = document.querySelectorAll(".research-card__link--related");
  var i;
  for (i = 0; i < links.length; i += 1) {
    links[i].addEventListener("click", toggle);
  }

  document.addEventListener("click", function (event) {
    if (!document.querySelector(".research-card:target")) {
      return;
    }
    // leave clicks on cards, links and controls alone
    if (event.target.closest(".research-card, a, button, input, select, textarea, label")) {
      return;
    }
    clearTarget();
  });
}());
