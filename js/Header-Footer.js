/*Header*/

window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset;
  // Always show header when at the very top
  if (currentScroll <= 0 || currentScroll < lastScroll) {
    header.classList.add('show');
  } else {
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
