'use strict';

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

startBtn.addEventListener('click', changeBodyColor);
stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    startBtn.removeAttribute("disabled");
});

function changeBodyColor() {
    startBtn.setAttribute("disabled", true);
    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
};


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};




