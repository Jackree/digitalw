"use strict";

const competence = document.querySelector(".competence__wrapper");

competence.scrollLeft = 0;

let pos = { left: 0, x: 0 };

const mouseDownHandler = function (e) {
    competence.style.cursor = "grabbing";
    competence.style.userSelect = "none";

    pos = {
      left: competence.scrollLeft,

      x: e.clientX,
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
};

const mouseMoveHandler = function (e) {
  const dx = e.clientX - pos.x;

  competence.scrollLeft = pos.left - dx;
};

const mouseUpHandler = function () {
  competence.style.cursor = "grab";
  competence.style.removeProperty("user-select");

  document.removeEventListener("mousemove", mouseMoveHandler);
  document.removeEventListener("mouseup", mouseUpHandler);
};

competence.addEventListener("mousedown", mouseDownHandler);
