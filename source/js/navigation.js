"use strict";

const navButton = document.querySelector(".header__burger");
const navigation = document.querySelector(".mobile-nav");

navButton.addEventListener("click", (e) => {
  e.preventDefault();
  navigation.classList.toggle("mobile-nav--opened");
})
