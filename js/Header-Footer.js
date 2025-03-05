/*Header*/

let lastScroll = window.pageYOffset;
const header = document.getElementById('header');

window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset;
  if (currentScroll < lastScroll) {
    // Scrolling up: show the header
    header.classList.add('show');
  } else {
    // Scrolling down: hide the header
    header.classList.remove('show');
  }
  lastScroll = currentScroll;
});



/*footer*/

document.addEventListener("DOMContentLoaded", function() {
  // If the browser does not support lazy-loading on iframes,
  // remove the 'loading' attribute so the iframe loads normally.
  if (!('loading' in HTMLIFrameElement.prototype)) {
    var iframes = document.querySelectorAll('iframe[loading="lazy"]');
    iframes.forEach(function(iframe) {
      iframe.removeAttribute('loading');
    });
  }
});
