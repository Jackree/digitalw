"use strict";
let slideIndex = 1;
const slides = document.querySelectorAll(".solutions-index__item"),
  prev = document.querySelector(".solutions-index__control--prev"),
  next = document.querySelector(".solutions-index__control--next");

showSlides(slideIndex);

function showSlides(n) {
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  slides.forEach((item) =>
    item.classList.remove("solutions-index__item--current")
  );

  slides[slideIndex - 1].classList.add("solutions-index__item--current");
}

function plusSlides(n) {
  showSlides((slideIndex += n));
}

prev.addEventListener("click", function () {
  plusSlides(-1);
});

next.addEventListener("click", function () {
  plusSlides(1);
});
