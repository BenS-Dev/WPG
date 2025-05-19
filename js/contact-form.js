// Function to format phone number as (XXX) XXX-XXXX
function formatPhoneNumber(phoneInput) {
  const phoneValue = phoneInput.value.replace(/\D/g, '');
  let formattedPhone = phoneValue;
  if (phoneValue.length > 6) {
    formattedPhone = `(${phoneValue.slice(0,3)}) ${phoneValue.slice(3,6)}-${phoneValue.slice(6,10)}`;
  } else if (phoneValue.length > 3) {
    formattedPhone = `(${phoneValue.slice(0,3)}) ${phoneValue.slice(3,6)}`;
  } else if (phoneValue.length > 0) {
    formattedPhone = `(${phoneValue.slice(0,3)}`;
  }
  phoneInput.value = formattedPhone;
}

// Function to validate email and highlight invalid fields on blur
function validateEmail(emailInput) {
  const emailValue = emailInput.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errorMessage = document.getElementById("email-error");
  if (!emailRegex.test(emailValue)) {
    emailInput.setCustomValidity("Please enter a valid email address.");
    emailInput.style.borderColor = "red";
    emailInput.setAttribute("aria-invalid", "true");
    if (errorMessage) {
      errorMessage.textContent = "Invalid email format. Please correct it.";
    }
  } else {
    emailInput.setCustomValidity("");
    emailInput.style.borderColor = "";
    emailInput.removeAttribute("aria-invalid");
    if (errorMessage) {
      errorMessage.textContent = "";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const form = document.querySelector('form'); // Use a more specific selector if needed

  if (phoneInput) {
    phoneInput.addEventListener("input", () => formatPhoneNumber(phoneInput));
  }
  if (emailInput) {
    emailInput.addEventListener("blur", () => validateEmail(emailInput));
  }
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const data = new URLSearchParams(new FormData(form));
      try {
        await fetch(form.action, {
          method: 'POST',
          body: data,
          mode: 'no-cors' // Can't read response, so always show success
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
  }
});

