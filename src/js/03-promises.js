import notiflix from "notiflix";

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();

  const delayInput = Number(form.elements.delay.value);
  const stepInput = Number(form.elements.step.value);
  const amountInput = Number(form.elements.amount.value);

  const promises = [];

  for (let i = 1; i <= amountInput; i++) {
    const delay = delayInput + (i - 1) * stepInput;
    promises.push(createPromise(i, delay));
  }

  promises.forEach((promise) => {
    promise
      .then(({ position, delay }) => {
        notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  });
}