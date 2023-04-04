document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const termsCheckbox = document.getElementById("terms-checkbox");
  const termsErrorMsg = document.getElementById("terms-error-msg");
  const dialog = document.getElementById("dialog");
  const dialogClose = document.getElementById("dialog-close");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogDescription = document.getElementById("dialog-description");

  /**
   * If checkbox is not checked, show error message. This is needed because
   * the required attribute doesn't seem to work properly with form validation.
   * @returns {boolean} True if checkbox is checked, false if not
   */
  const validateCheckbox = () => {
    if (!termsCheckbox.checked) {
      termsErrorMsg.style.display = "inline";
    } else {
      termsErrorMsg.style.display = "none";
    }

    return termsCheckbox.checked;
  };

  /**
   * Open dialog when submitting form, and replace placeholders with user input
   */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateCheckbox()) {
      return;
    }

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

  /**
   * Remove potential error message when checking the checkbox
   */
  termsCheckbox.addEventListener("change", () => {
    if (termsCheckbox.checked) {
      termsErrorMsg.style.display = "none"; // Hide the error message
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
