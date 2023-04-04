document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const dialog = document.getElementById("dialog");
  const dialogClose = document.getElementById("dialog-close");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogDescription = document.getElementById("dialog-description");

  /**
   * Open dialog when submitting form, and replace placeholders with user input
   */
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const firstName = name.split(" ")[0];
    const email = document.getElementById("email").value;
    const emailDomain = email.split("@")[1].split(".")[0];

    dialogTitle.innerText = dialogTitle.innerText.replace(
      "name",
      capitalizeFirstLetter(firstName)
    );
    dialogDescription.innerText = dialogDescription.innerText.replace(
      "domain",
      capitalizeFirstLetter(emailDomain)
    );
    form.reset();
    dialog.classList.remove("hidden");
  });

  /**
   * Close dialog when clicking on close button
   */
  dialogClose.addEventListener("click", function () {
    dialog.classList.add("hidden");
  });

  /**
   * Close dialog when clicking outside of it
   */
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      dialog.classList.add("hidden");
    }
  });
});

/**
 * Capitalize first letter of string
 * @param {*} string The string to capitalize
 * @returns Capitalized string
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
