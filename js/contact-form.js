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



// Function to handle form submission








const form = document.querySelector('form');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const data = new URLSearchParams(new FormData(form));
  try {
    await fetch(form.action, {
      method: 'POST',
      body: data,
      mode: 'no-cors' // Salesforce WebToCase supports no-cors POST
    });
    form.innerHTML = `
<h2>Thanks for reaching out!</h2>
<br><br>
<p>
  Your inquiry has been successfully submitted. A member of our team will review the details and be in touch shortly to discuss the next steps.<br><br>
  We appreciate your trust in us and are committed to providing you with timely, personalized support.<br><br>
  If you need immediate assistance, please call us at <br><br>
  <strong>(204) 989-7676</strong>.
</p>

    `;
  } catch (err) {
    console.error(err);
    alert('Oops—something went wrong. Please try again.');
  }
});

