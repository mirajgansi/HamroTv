const carousel = document.querySelector('.carousel');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

let scrollAmount = 0;
const scrollStep = 120; // Width of each movie card
const scrollInterval = 3000; // Auto-slide interval in milliseconds

function autoSlide() {
  scrollAmount += scrollStep;
  if (scrollAmount >= carousel.scrollWidth - carousel.offsetWidth) {
    scrollAmount = 0;
  }
  carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
}

let autoSlideInterval = setInterval(autoSlide, scrollInterval);

leftArrow.addEventListener('click', () => {
  clearInterval(autoSlideInterval); // Pause auto-slide on manual action
  scrollAmount -= scrollStep;
  if (scrollAmount < 0) {
    scrollAmount = carousel.scrollWidth - carousel.offsetWidth;
  }
  carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  autoSlideInterval = setInterval(autoSlide, scrollInterval); // Resume auto-slide
});

rightArrow.addEventListener('click', () => {
  clearInterval(autoSlideInterval); // Pause auto-slide on manual action
  scrollAmount += scrollStep;
  if (scrollAmount >= carousel.scrollWidth - carousel.offsetWidth) {
    scrollAmount = 0;
  }
  carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  autoSlideInterval = setInterval(autoSlide, scrollInterval); // Resume auto-slide
});
