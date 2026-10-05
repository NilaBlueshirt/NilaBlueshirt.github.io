(function () {
  "use strict";

  var button = document.querySelector("[data-copy-email]");
  if (!button) {
    return;
  }
  var email = button.getAttribute("data-copy-email");
  var label = button.getAttribute("aria-label");

  function fallback() {
    window.prompt("Copy the email address:", email);
  }

  button.hidden = false;
  button.addEventListener("click", function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(function () {
        button.classList.add("is-copied");
        button.setAttribute("aria-label", "Copied");
        window.setTimeout(function () {
          button.classList.remove("is-copied");
          button.setAttribute("aria-label", label);
        }, 1500);
      }, fallback);
      return;
    }
    fallback();
  });
}());
