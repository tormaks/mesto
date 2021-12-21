'use strict';

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
	{
		name: 'Петергоф',
		link: './images/peterhof.jpg',
	},
	{
		name: 'Невский Проспект',
		link: './images/nevskijprospekt.jpg',
	},
	{
		name: 'Камчатка',
		link: './images/kamchatka.jpg',
	},
	{
		name: 'Байкал, Иркутск',
		link: './images/baikal.jpg',
	},
	{
		name: 'Алтай',
		link: './images/altai.jpg',
	},
	{
		name: 'Карелия',
		link: './images/kareliya.jpg',
	},
]

const formData = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__btn',
	inactiveButtonClass: 'popup__btn_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
};

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_profile');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close_type_profile');
const popupFormEditProfile = popupEditProfile.querySelector('form');
const inputName = popupFormEditProfile.querySelector('.popup__input_value_name');
const inputJob = popupFormEditProfile.querySelector('.popup__input_value_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_place');
const buttonCloseAddCard = popupAddCard.querySelector('.popup__close_type_place');
const popupFormAddCard = popupAddCard.querySelector('form');
const inputPlace = popupFormAddCard.querySelector('.popup__input_value_place');
const inputLink = popupFormAddCard.querySelector('.popup__input_value_link');

const initializationOfCards = () => {
   initialCards.forEach(initialCard => {
      const cardElement = new Card(initialCard.name, initialCard.link, '#card', '.card');
      cardElement.generateCard();
   })
};

const validationForms = () => {
   const popupForms = document.querySelectorAll(`${formData.formSelector}`);
   popupForms.forEach(formElement => {
      const thisForm = new FormValidator(formData, formElement);
      thisForm.enableValidation();
   })
}

//Открыть попап
const openPopup = popup => {
	popup.classList.add('popup_active');
	popup.addEventListener('click', closePopupPushOverlay(popup));
	document.addEventListener('keydown', closePopupPushEsc(popup));
};

//Закрыть попап
const closePopup = popup => {
	popup.classList.remove('popup_active');
	popup.removeEventListener('click', closePopupPushOverlay(popup));
	document.removeEventListener('keydown', closePopupPushEsc(popup));
};

//Открыть popup добавления карточки
const openPopupAddCard = () => {
   const formAddCard = popupAddCard.querySelector(`${formData.formSelector}`);
	const formElement = new FormValidator(formData, formAddCard);
   formElement.resetInputsErrors(popupAddCard);
	openPopup(popupAddCard);
};

//Открыть popup изменения профиля
const openPopupEditProfile = () => {
	inputName.value = profileName.textContent;
	inputJob.value = profileJob.textContent;
   const formEditProfile = popupEditProfile.querySelector(`${formData.formSelector}`);
   const formElement = new FormValidator(formData, formEditProfile);
   formElement.resetInputsErrors(popupEditProfile);
	openPopup(popupEditProfile);
};

//Закрыть попап нажав на оверлей 
const closePopupPushOverlay = popup => evt => {
	if (evt.target === popup) {
		closePopup(popup);
	} 
};

//Закрыть попап нажав на клавишу Escape
const closePopupPushEsc = popup => evt => {
	if (evt.key === 'Escape') {
		closePopup(popup);
	}
};

//Отправить форму изменения профиля
const sendFormEditProfile = evt => {
	evt.preventDefault();
	profileName.textContent = inputName.value;
	profileJob.textContent = inputJob.value;
	closePopup(popupEditProfile);
};

//Отправить форму добавления карточки
const sendFormAddCard = evt => {
	evt.preventDefault();
   const cardElement = new Card(inputPlace.value, inputLink.value, '#card', '.card');
   cardElement.generateCard();
	closePopup(popupAddCard);
	popupFormAddCard.reset();
};

initializationOfCards();
validationForms();

buttonEditProfile.addEventListener('click', openPopupEditProfile);
buttonAddCard.addEventListener('click', openPopupAddCard);
popupFormEditProfile.addEventListener('submit', sendFormEditProfile);
popupFormAddCard.addEventListener('submit', sendFormAddCard);
buttonCloseEditProfile.addEventListener('click', () => closePopup(popupEditProfile));
buttonCloseAddCard.addEventListener('click', () => closePopup(popupAddCard));

export {openPopup, closePopup, formData};