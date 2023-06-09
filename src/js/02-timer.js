import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  outputEls: document.querySelectorAll('.value'),
  // daysFieldEl: document.querySelector('span[data-days]'),
  // hoursFieldEl: document.querySelector('span[data-hours]'),
  // minutesFieldEl: document.querySelector('span[data-minutes]'),
  secondsFieldEl: document.querySelector('span[data-seconds]'),
};
// console.log(refs.outputEls);
refs.outputEls.forEach(el => console.log(Object.keys(el.dataset)[0]));

let selectedDate = 0;
let timerId = null;

Notify.init({
  position: 'center-top',
});

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    onSelectedDate();
  },
};

flatpickr(refs.inputEl, options);

function onSelectedDate() {
  if (selectedDate <= Date.now()) {
    Notify.failure('Please choose a date in the future');
  } else {
    refs.startBtn.disabled = false;
    refs.startBtn.addEventListener('click', onStartBtnClick);
  }
}

function onStartBtnClick() {
  refs.startBtn.removeEventListener('click', onStartBtnClick);
  timerId = setInterval(countDown, 1000);
}

function countDown() {
  const currentDate = Date.now();
  const deltaDate = selectedDate - currentDate;
  // const { days, hours, minutes, seconds } = convertMs(deltaDate);

  // if (deltaDate < 1000) {
  //   refs.secondsFieldEl.textContent = '00';
  //   clearTimeout(timerId);
  //   Notify.success('Time has passed!');
  //   return;
  // }

  refs.outputEls.forEach(el => {
    const key = Object.keys(el.dataset)[0];
    if (deltaDate < 1000) {
      el.textContent = '00';
      clearTimeout(timerId);
      // Notify.success('Time has passed!');
      return;
    }
    el.textContent = convertMs(deltaDate)[key];
  });

  // const dataTime = convertMs(deltaDate);

  // for (const key in dataTime) {
  //   [...refs.outputEls].forEach(el => {
  //     if (el.dataset[key] === '') el.textContent = dataTime[key];
  //   });
  // }

  // refs.daysFieldEl.textContent = days;
  // refs.hoursFieldEl.textContent = hours;
  // refs.minutesFieldEl.textContent = minutes;
  // refs.secondsFieldEl.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
