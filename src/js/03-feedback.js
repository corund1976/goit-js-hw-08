import throttle from 'lodash.throttle';

// --------- Форма и ее поля ввода
const inputForm = document.querySelector('.feedback-form');
const formEmail = inputForm.querySelector("input");
const formMessage = inputForm.querySelector("textarea");

let parsedInputs = {
    email: '',
    message: ''
};

// --------- Значение обьекта ввода в локальном хранилище
let savedInputs = localStorage.getItem("feedback-form-state");

// ---------- Проверяем, что обьект в хранилище не пустой
if (savedInputs) {
// ---------Заполняем поля ввода значениями из локального хранилища
    parsedInputs = JSON.parse(savedInputs);
    formEmail.value = parsedInputs.email;
    formMessage.value = parsedInputs.message;
}

// --------- Вешаем на форму "слушателей" ---------
inputForm.addEventListener("input", throttle(handleInput, 500));
inputForm.addEventListener("submit", handleSubmit);

// ---------- Колбэк для Inputs ---------
function handleInput() {
    const data = {
        email: inputForm.elements.email.value,
        message: inputForm.elements.message.value
    }

    // записываем "текущие значения полей формы" в "локальное хранилище"
    localStorage.setItem("feedback-form-state", JSON.stringify(data));
}

// --------- Колбэк для Submit --------
function handleSubmit(event) {
    event.preventDefault();
    
    // ---------- Проверяем, что обьект в хранилище не пустой
    if (savedInputs) {
    // ---------Заполняем поля ввода значениями из локального хранилища
        parsedInputs = JSON.parse(savedInputs);
        formEmail.value = parsedInputs.email;
        formMessage.value = parsedInputs.message;
    };
    
    console.log(parsedInputs);

    //очистка формы при нажатии Submit
    event.currentTarget.reset();

    //очистка локального хранилища при нажатии Submit
    localStorage.removeItem("feedback-form-state");
}