"use strict";

const navButton = document.querySelector(".burger");
const navigation = document.querySelector(".mobile-nav");

let underNav = document.createElement("div");
underNav.classList.add("under-nav");
underNav.addEventListener("click", toggleNav);

function toggleNav() {
  navButton.classList.toggle("burger--close")
  navigation.classList.toggle("mobile-nav--opened");
  document.body.classList.toggle("noscroll-nav");

  if (navigation.classList.contains("mobile-nav--opened")) {
    document.querySelector(".header").append(underNav);
  } else {
    underNav.remove();
  }
}

navButton.addEventListener("click", (e) => {
  e.preventDefault();
  toggleNav();
})

const header = document.querySelector(".header");
const headerOffset = header.offsetTop;

function fixedHeader() {
  if (window.pageYOffset > headerOffset) {
    header.classList.add("header--fixed");
  } else {
    header.classList.remove("header--fixed");
  }
}

window.addEventListener("scroll", fixedHeader);
