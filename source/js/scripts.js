"use strict";

const questions = document.querySelectorAll(".faq__item");

questions.forEach(item => {
  item.addEventListener("click", (e) => {
    item.classList.toggle("faq__item--opened");
   });
});
