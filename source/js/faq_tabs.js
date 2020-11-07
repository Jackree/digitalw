"use strict";

const questionsList = document.querySelector(".faq__list");

questionsList.addEventListener("click", (e) => {
  let questionItem = e.target.closest(".faq__item");
  if (questionItem) {
    questionItem.classList.toggle("faq__item--opened");
  }
});
