(function () {
  "use strict";

  var grids = Array.prototype.slice.call(document.querySelectorAll("[data-masonry]"));
  if (grids.length === 0) {
    return;
  }

  var ROW = 2;

  function layout(grid) {
    var cards = grid.children;
    var i;
    var card;
    var marginBottom;
    var span;
    for (i = 0; i < cards.length; i += 1) {
      card = cards[i];
      marginBottom = parseFloat(window.getComputedStyle(card).marginBottom) || 0;
      span = Math.max(1, Math.ceil((card.offsetHeight + marginBottom) / ROW));
      card.style.gridRowEnd = "span " + span;
    }
  }

  function layoutAll() {
    var i;
    for (i = 0; i < grids.length; i += 1) {
      layout(grids[i]);
    }
  }

  var pending = null;
  function scheduleLayout() {
    if (pending !== null) {
      window.clearTimeout(pending);
    }
    pending = window.setTimeout(function () {
      pending = null;
      layoutAll();
    }, 100);
  }

  var i;
  var j;
  var imgs;
  for (i = 0; i < grids.length; i += 1) {
    grids[i].classList.add("research-grid--masonry");
    imgs = grids[i].querySelectorAll("img");
    for (j = 0; j < imgs.length; j += 1) {
      imgs[j].addEventListener("load", scheduleLayout);
      imgs[j].addEventListener("error", scheduleLayout);
    }
  }
  layoutAll();

  window.addEventListener("resize", scheduleLayout);
  window.addEventListener("load", layoutAll);
  if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
    document.fonts.ready.then(layoutAll);
  }
}());
