(function () {
  "use strict";

  var button = document.querySelector("[data-copy-email]");
  if (!button) {
    return;
  }
  var email = button.getAttribute("data-copy-email");

  function fallback() {
    window.prompt("Copy the email address:", email);
  }

  button.hidden = false;
  button.addEventListener("click", function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(function () {
        button.textContent = "Copied";
        window.setTimeout(function () {
          button.textContent = "Copy";
        }, 1500);
      }, fallback);
      return;
    }
    fallback();
  });
}());
