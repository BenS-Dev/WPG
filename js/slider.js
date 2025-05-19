// ---------- Testimonial Slider (Manual + Auto) ----------
const slidesWrapper = document.getElementById('slidesWrapper');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

if (slidesWrapper && slides.length > 0) {
  let slideIndex = 1;
  let slideWidth = slides[0].getBoundingClientRect().width;

  function updateSlidePosition() {
    slidesWrapper.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
  }

  function nextSlide() {
    slideIndex++;
    slidesWrapper.style.transition = `transform 0.6s ease-in-out`;
    updateSlidePosition();

    if (slideIndex === totalSlides - 1) {
      slidesWrapper.addEventListener('transitionend', function handler() {
        slidesWrapper.style.transition = 'none';
        slideIndex = 1;
        updateSlidePosition();
        slidesWrapper.removeEventListener('transitionend', handler);
      });
    }
  }

  function prevSlide() {
    slideIndex--;
    slidesWrapper.style.transition = `transform 0.6s ease-in-out`;
    updateSlidePosition();

    if (slideIndex === 0) {
      slidesWrapper.addEventListener('transitionend', function handler() {
        slidesWrapper.style.transition = 'none';
        slideIndex = totalSlides - 2;
        updateSlidePosition();
        slidesWrapper.removeEventListener('transitionend', handler);
      });
    }
  }

  const nextArrow = document.getElementById('nextArrow');
  const prevArrow = document.getElementById('prevArrow');
  if (nextArrow) nextArrow.addEventListener('click', nextSlide);
  if (prevArrow) prevArrow.addEventListener('click', prevSlide);

  // Auto-slide every 5 seconds
  let autoSlideInterval = setInterval(nextSlide, 5000);

  // Pause on hover
  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    sliderContainer.addEventListener('mouseleave', () => {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(nextSlide, 5000);
    });
  }

  // On window resize, recalc width
  window.addEventListener('resize', () => {
    slideWidth = slides[0].getBoundingClientRect().width;
    updateSlidePosition();
  });

  // Initialize position (no transition)
  slidesWrapper.style.transition = 'none';
  updateSlidePosition();
}

// ---------- Providers bxSlider Initialization ----------
$(document).ready(function () {
  $('.bxslider').bxSlider({
    mode: 'horizontal',
    pager: true,
    controls: true,
    slideWidth: 800,
    minSlides: 1,
    maxSlides: 1,
    moveSlides: 1,
    adaptiveHeight: true,
    infiniteLoop: true
  });
});