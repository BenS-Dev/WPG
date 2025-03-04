// ---------- Testimonial Slider (Manual + Auto) ----------
const slidesWrapper = document.getElementById('slidesWrapper');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// The first "real" slide is index 1 (assuming 0 is a clone at the start).
let slideIndex = 1;
let slideWidth = slides[0].offsetWidth;

function updateSlidePosition() {
  slidesWrapper.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
}

function nextSlide() {
  slideIndex++;
  slidesWrapper.style.transition = `transform 0.6s ease-in-out`;
  updateSlidePosition();

  // If we reach the last clone, jump back to the first "real" slide
  if (slideIndex === totalSlides - 1) {
    setTimeout(() => {
      slidesWrapper.style.transition = 'none';
      slideIndex = 1;
      updateSlidePosition();
    }, 600);
  }
}

function prevSlide() {
  slideIndex--;
  slidesWrapper.style.transition = `transform 0.6s ease-in-out`;
  updateSlidePosition();

  // If we reach the first clone, jump to the last "real" slide
  if (slideIndex === 0) {
    setTimeout(() => {
      slidesWrapper.style.transition = 'none';
      slideIndex = totalSlides - 2;
      updateSlidePosition();
    }, 600);
  }
}

document.getElementById('nextArrow').addEventListener('click', nextSlide);
document.getElementById('prevArrow').addEventListener('click', prevSlide);

// Auto-slide every 5 seconds
let autoSlideInterval = setInterval(nextSlide, 5000);

// Pause on hover
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
sliderContainer.addEventListener('mouseleave', () => {
  autoSlideInterval = setInterval(nextSlide, 5000);
});

// On window resize, recalc width
window.addEventListener('resize', () => {
  slideWidth = slides[0].offsetWidth;
  updateSlidePosition();
});

// Initialize position (no transition)
slidesWrapper.style.transition = 'none';
updateSlidePosition();


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
