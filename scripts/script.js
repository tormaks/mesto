'use strict'

let buttonEditProfile = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let buttonClosePopup = popup.querySelector('.popup__close');
let popupForm = popup.querySelector('form');
let inputName = popupForm.querySelector('.popup__input_value_name');
let inputJob = popupForm.querySelector('.popup__input_value_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

//Открыть popup
function openPopup() {
	inputName.value = profileName.textContent;
	inputJob.value = profileJob.textContent;
	popup.classList.toggle('popup_active');
}

//Закрыть popup
function closePopup() {
	popup.classList.remove('popup_active');
}

//Отправить форму
function sendForm(evt) {
	evt.preventDefault();
	let newName = inputName.value;
	let newJob = inputJob.value;
	profileName.textContent = `${newName}`;
	profileJob.textContent = `${newJob}`;
	closePopup();
}

buttonEditProfile.addEventListener('click', openPopup);
buttonClosePopup.addEventListener('click', closePopup);
popupForm.addEventListener('submit', sendForm);









