import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const {
    delay: delayEl,
    step: stepEl,
    amount: amountEl,
  } = e.currentTarget.elements;
  let delay = Number(delayEl.value);
  const step = Number(stepEl.value);
  const amount = Number(amountEl.value);
  // console.dir(delay);
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay).then(onSuccess).catch(onFailure);
    // .then(({ position, delay }) => {
    //   Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    // })
    // .catch(({ position, delay }) => {
    //   Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    // });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
        // Fulfill
      } else {
        reject({ position: position, delay: delay });
        // Reject
      }
    }, delay);
  });
}

function onSuccess({ position, delay }) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}
function onFailure({ position, delay }) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}
