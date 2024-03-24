import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import Error from "../img/error.svg"
import Ok from "../img/success.svg"


const formEl = document.querySelector('form');

const delayEl = document.getElementsByName('delay')[0];
const fulfilldEl = document.querySelector('.fulfilled')
const rejectedEl = document.querySelector('.rejected')

formEl.addEventListener('submit',
    function (event) {
        event.preventDefault();

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (fulfilldEl.checked) {
                    resolve(iziToast.success({
                        message: `Fulfilled promise in ${delayEl.value}ms`,
                        iconUrl: Ok,
                        color: '#59a10d',
                        messageColor: '#ffffff',
                        titleColor: '#ffffff',
                        theme: 'dark',
                        timeout: 3000,
                        position: 'topRight'
                    }));
                } else if (rejectedEl.checked) {
                    reject(iziToast.error({
                        message: `Rejected promise in ${delayEl.value}ms`,
                        iconUrl: Error,
                        color: '#ef4040',
                        messageColor: '#ffffff',
                        titleColor: '#ffffff',
                        theme: 'dark',
                        timeout: 3000,
                        position: 'topRight'
                    }));
                }

            }, delayEl.value);
        });

        promise.finally(() => {
            formEl.reset();
        });

        return promise;
    });
