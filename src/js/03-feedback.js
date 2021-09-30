import throttle from 'lodash.throttle';

// --------- Поля инпутов
const inputEmail = document.querySelector('#inputEmail');
const textareaMessage = document.querySelector('#textareaMessage');

// --------- Значение обьекта ввода в локальном хранилище
let savedInputs = localStorage.getItem("feedback-form-state");
let parsedInputs = JSON.parse(savedInputs);

// ---------- Проверяем, что обьект в хранилище не пустой
if (savedInputs) {
// ---------Заполняем поля значениями из локального хранилища
    inputEmail.value = parsedInputs.email;
    textareaMessage.value = parsedInputs.message;
}

// --------- Сама форма
const inputForm = document.querySelector('.feedback-form');
// --------- Вешаем на нее "слушателей"
inputForm.addEventListener("input", handleInput);
// inputForm.addEventListener("input", throttle(handleInput, 500));
inputForm.addEventListener("submit", handleSubmit);

// ---------- Колбэк для Inputs
function handleInput(event) {
    const { email, message } = event.currentTarget.elements;
        
    const data = {
        email: email.value,
        message: message.value
    }

    // записываем "текущие значения полей формы" в "локальное хранилище"
    function callback () {
        localStorage.setItem("feedback-form-state", JSON.stringify(data));
    };

    throttle(callback, 500);
}

// --------- Колбэк для Submit
function handleSubmit(event) {
    event.preventDefault();
    
    // вытягиваем с хранилища сохраненные значения полей формы в виде обьекта с полями email и message
    savedInputs = localStorage.getItem("feedback-form-state");
    parsedInputs = JSON.parse(savedInputs);
    console.log(parsedInputs);

    //очистка формы инпута при нажатии Submit
    event.currentTarget.reset();

    //очистка локального хранилища при нажатии Submit
    localStorage.removeItem("feedback-form-state");
    }