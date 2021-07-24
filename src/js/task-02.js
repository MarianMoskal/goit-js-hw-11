'use strict';

import Swal from 'sweetalert2';

const inputEl = document.getElementById('date-selector');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtn.setAttribute('disabled', true);

let x;
let a = 0;
let inputDate;
inputEl.addEventListener('input', getValueFromInput);

function getValueFromInput() {
    if (Date.now() < new Date(inputEl.value).getTime() && inputEl.value) {
      startBtn.removeAttribute('disabled');
      inputDate = inputEl.value;
      startBtn.addEventListener('click', () => {
        if (startBtn.classList.contains('isOn')) {
            Swal.fire("The timer is already running");
        } else {
          Timer.start();
          startBtn.classList.add('isOn');
        }
      });
    } else {
      startBtn.setAttribute('disabled', true);
      Swal.fire("Please choose a date in the future");
  }
};

const Timer = {
  start() {  
      x = setInterval(() => {
        const startTime = Date.now();     
        a = convertMs((new Date(inputDate).getTime() - 10800000) - startTime);
        Number(daysEl.textContent = a.days);
        Number(hoursEl.textContent = a.hours);
        Number(minutesEl.textContent = a.minutes);
        Number(secondsEl.textContent = a.seconds);
     
        if ((new Date(inputDate).getTime() - startTime) === 0) {
          console.log('Timer has stopped');
          Timer.stop();
          };
      }, 1000);
     },
  
  stop() {
      clearInterval(x)
      startBtn.classList.remove('isOn');
      },
};



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); //{days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}



