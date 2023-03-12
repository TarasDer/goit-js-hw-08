import throttle from 'lodash.throttle';

const inputEl = document.querySelector('.feedback-form input');
const textareaEl = document.querySelector('.feedback-form textarea');
const formEl = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

let formData = {};

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

function onFormInput(ev) {
  formData[ev.target.name] = ev.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

populateForm();

function populateForm() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedData.message) {
    textareaEl.value = savedData.message;
    formData.message = savedData.message;
  }
  if (savedData.email) {
    inputEl.value = savedData.email;
    formData.email = savedData.email;
  }
}

function onFormSubmit(ev) {
  ev.preventDefault();
  console.log(formData);
  if (textareaEl.value !== '' && inputEl.value !== '') {
    ev.target.reset();
    localStorage.removeItem(STORAGE_KEY);
  } else alert('Заповніть всі поля');
}
