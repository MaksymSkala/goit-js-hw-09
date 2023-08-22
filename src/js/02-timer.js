import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Описаний в документації
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      alert("Please choose a date in the future");
      return;
    }
    startButton.disabled = false;
  },
};

const datePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const timerFields = document.querySelectorAll(".value");

flatpickr(datePicker, options);

let countdownInterval;

function startCountdown(targetDate) {
  countdownInterval = setInterval(() => {
    const timeLeft = targetDate - new Date();
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay(0);
      alert("Countdown has finished!");
      return;
    }
    updateTimerDisplay(timeLeft);
  }, 1000);
}

function updateTimerDisplay(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  timerFields[0].textContent = addLeadingZero(days);
  timerFields[1].textContent = addLeadingZero(hours);
  timerFields[2].textContent = addLeadingZero(minutes);
  timerFields[3].textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
    // Код для конвертації мілісекунд у дні, години, хвилини і секунди
    // ...
    return { days, hours, minutes, seconds };
  }
  
  startButton.addEventListener('click', function () {
    const dateInput = document.querySelector('#datetime-picker').value;
    const selectedDate = new Date(dateInput);
    const currentDate = new Date();
  
    if (selectedDate <= currentDate) {
      alert('Please choose a date in the future');
      return;
    }
  
    startButton.disabled = true;
  
    const intervalId = setInterval(function () {
      const timeLeft = selectedDate - new Date();
  
      if (timeLeft <= 0) {
        clearInterval(intervalId);
        timerElements.forEach((element) => (element.textContent = '00'));
        startButton.disabled = false;
        return;
      }
  
      const { days, hours, minutes, seconds } = convertMs(timeLeft);
  
      daysValue.textContent = addLeadingZero(days);
      hoursValue.textContent = addLeadingZero(hours);
      minutesValue.textContent = addLeadingZero(minutes);
      secondsValue.textContent = addLeadingZero(seconds);
    }, 1000);
  });