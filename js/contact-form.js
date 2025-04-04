src="https://www.google.com/recaptcha/api.js";

// Function to format phone number
function formatPhoneNumber(phoneInput) {
  const phoneValue = phoneInput.value.replace(/\D/g, ''); // Remove non-numeric characters
  const formattedPhone = phoneValue.replace(
    /^(\d{3})(\d{3})(\d{0,4})$/,
    (match, p1, p2, p3) => `${p1}-${p2}-${p3}`.trim()
  );
  phoneInput.value = formattedPhone;
}

// Function to validate email and highlight invalid fields on blur
function validateEmail(emailInput) {
  const emailValue = emailInput.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
  if (!emailRegex.test(emailValue)) {
    emailInput.setCustomValidity("Please enter a valid email address.");
    emailInput.style.borderColor = "red"; // Highlight invalid email
    const errorMessage = document.getElementById("email-error");
    if (errorMessage) {
      errorMessage.textContent = "Invalid email format. Please correct it.";
    }
  } else {
    emailInput.setCustomValidity(""); // Clear the error
    emailInput.style.borderColor = ""; // Reset border color
    const errorMessage = document.getElementById("email-error");
    if (errorMessage) {
      errorMessage.textContent = ""; // Clear error message
    }
  }
}

// Attach event listeners to the phone and email fields
document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");

  // Format phone number on input
  phoneInput.addEventListener("input", () => formatPhoneNumber(phoneInput));

  // Validate email on blur
  emailInput.addEventListener("blur", () => validateEmail(emailInput));
});

// Timestamp function for reCAPTCHA
function timestamp() {
  const response = document.getElementById("g-recaptcha-response");
  if (response == null || response.value.trim() == "") {
    const elems = JSON.parse(document.getElementsByName("captcha_settings")[0].value);
    elems["ts"] = JSON.stringify(new Date().getTime());
    document.getElementsByName("captcha_settings")[0].value = JSON.stringify(elems);
  }
}
setInterval(timestamp, 500);