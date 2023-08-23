import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= new Date()) {
            alert("Please choose a date in the future");
            startButton.disabled = true;
            return;
        }

        startButton.disabled = false;
    },
};

const datePicker = flatpickr("#datetime-picker", options);
const startButton = document.querySelector("[data-start]");
const daysValue = document.querySelector("[data-days]");
const hoursValue = document.querySelector("[data-hours]");
const minutesValue = document.querySelector("[data-minutes]");
const secondsValue = document.querySelector("[data-seconds]");
const datetimeInput = document.querySelector("#datetime-picker");

startButton.disabled = true;
datetimeInput.readOnly = true;

let intervalId;

startButton.addEventListener("click", () => {
    if (intervalId) {
        return; // If the timer is already running, don't do anything
    }
    
    datetimeInput.readOnly = true;
    startButton.disabled = true;
    
    const selectedDate = datePicker.selectedDates[0];
    const currentDate = new Date();
    
    function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);

        return { days, hours, minutes, seconds };
    }

    function addLeadingZero(value) {
        return String(value).padStart(2, "0");
    }

    function updateTimer() {
        const timeLeft = selectedDate - new Date();
        if (timeLeft <= 0) {
            clearInterval(intervalId);
            return;
        }
    
        const { days, hours, minutes, seconds } = convertMs(timeLeft);
        daysValue.textContent = addLeadingZero(days);
        hoursValue.textContent = addLeadingZero(hours);
        minutesValue.textContent = addLeadingZero(minutes);
        secondsValue.textContent = addLeadingZero(seconds);
    }

    updateTimer();
    intervalId = setInterval(updateTimer, 1000);
});