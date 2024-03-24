import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import Error from "../img/error.svg"

const dateTime = document.getElementById("datetime-picker");
const buttonStart = document.querySelector("[data-start]");

const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate;

buttonStart.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] && selectedDates[0] > new Date()) {
            userSelectedDate = selectedDates[0];
            buttonStart.disabled = false;
        } else {
            iziToast.error({
                message: "Please chose a date in the future",
                color: '#ef4040',
                messageColor: '#ffffff',
                theme: 'dark',
                timeout: 3000,
                pauseOnHover: true,
                position: 'topRight',
                iconUrl: Error,
            });
            buttonStart.disabled = true;
        }
    },
};



flatpickr(dateTime, options);

buttonStart.addEventListener("click", handleClick);
function handleClick() {
    buttonStart.disabled = true;
    dateTime.disabled = true;
    let countdown = setInterval(function () {
        let now = new Date().getTime();
        let distance = userSelectedDate - now;

        if (distance < 0) {
            clearInterval(countdown);
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
        } else {
            let time = convertMs(distance);
            daysEl.textContent = time.days.toString().padStart(2, 0);
            hoursEl.textContent = time.hours.toString().padStart(2, 0);
            minutesEl.textContent = time.minutes.toString().padStart(2, 0);
            secondsEl.textContent = time.seconds.toString().padStart(2, 0);
        }
    }, 1000);
};

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
