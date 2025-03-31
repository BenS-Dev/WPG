/* contact-form.js */
/* 
   Loads the Google reCAPTCHA library and handles the timestamp 
   needed for Salesforce Web-to-Case.
*/

// Load Google reCAPTCHA
// (Note: If you prefer not to dynamically add the <script> tag, you
// can include <script src="https://www.google.com/recaptcha/api.js"></script>
// in your HTML <head> directly. This example shows how you could load it via JS.)
const recaptchaScript = document.createElement('script');
recaptchaScript.src = 'https://www.google.com/recaptcha/api.js';
document.head.appendChild(recaptchaScript);

// Function to handle timestamp for fallback
function timestamp() {
  var response = document.getElementById('g-recaptcha-response');
  if (response == null || response.value.trim() === '') {
    var elems = JSON.parse(document.getElementsByName('captcha_settings')[0].value);
    elems['ts'] = JSON.stringify(new Date().getTime());
    document.getElementsByName('captcha_settings')[0].value = JSON.stringify(elems);
  }
}

// Update the timestamp every half-second
setInterval(timestamp, 500);
