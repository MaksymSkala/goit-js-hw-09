import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Define the convertMs function
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
}

const datetimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector('[data-start]');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]')
};

let countdownIntervalId = null;

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  const selectedDate = new Date(datetimePicker.value);

  countdownIntervalId = setInterval(() => {
    const timeLeft = selectedDate - new Date();
    if (timeLeft <= 0) {
      clearInterval(countdownIntervalId);
      updateTimerFields(0);
      return;
    }
    updateTimerFields(timeLeft);
  }, 1000);
});

function updateTimerFields(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  timerFields.days.textContent = addLeadingZero(days);
  timerFields.hours.textContent = addLeadingZero(hours);
  timerFields.minutes.textContent = addLeadingZero(minutes);
  timerFields.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      notiflix.Notify.failure("Please choose a date in the future");
      return;
    }
    startButton.disabled = false;
  },
};

flatpickr(datetimePicker, options);