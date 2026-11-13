// Share buttons: copy a link, or open the device's own share sheet.
// No third-party code, no cookies, nothing stored.

(function () {
  function announce(button, message) {
    var scope = button.closest(".share") || document;
    var status = scope.querySelector(".share-status") || document.querySelector(".share-status");
    if (status) {
      status.textContent = message;
      window.setTimeout(function () { status.textContent = ""; }, 4000);
    }
  }

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      var url = button.getAttribute("data-copy");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(
          function () { announce(button, "Link copied."); },
          function () { announce(button, "Copy this link: " + url); }
        );
      } else {
        announce(button, "Copy this link: " + url);
      }
    });
  });

  document.querySelectorAll("[data-share-url]").forEach(function (button) {
    if (!navigator.share) return;
    button.hidden = false;
    button.addEventListener("click", function () {
      navigator.share({
        title: button.getAttribute("data-share-title"),
        url: button.getAttribute("data-share-url")
      }).catch(function () {});
    });
  });
})();
