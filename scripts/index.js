'use strict';

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./initialCards.js";

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

const popupPicture = document.querySelector('.popup_type_picture');
const buttonClosePopupPicture = document.querySelector('.popup__close_type_picture');
const popupImage = popupPicture.querySelector('.popup__image');
const popupPictureDescription = popupPicture.querySelector('.popup__image-description');

const cardsList = document.querySelector('.cards__list');

//Создание и добавление карточки на страницу
const renderCard = (name, link) => {
   const cardElement = new Card(name, link, '#card', '.card');
   const newCard = cardElement.generateCard();
   cardsList.prepend(newCard);
}

//Инициализация карточек из массива
const initializationOfCards = () => {
   initialCards.forEach(initialCard => {
      renderCard(initialCard.name, initialCard.link);
   })
};

//Валидация формы
const validationForm = popup => {
   const formElement = popup.querySelector(`${formData.formSelector}`);
   const formValidator = new FormValidator(formData, formElement);
   formValidator.enableValidation();
   return formValidator;
}

const editFormValidator = validationForm(popupEditProfile);
const addFormValidator = validationForm(popupAddCard);

//Открыть попап
const openPopup = popup => {
	popup.classList.add('popup_active');
	popup.addEventListener('click', closePopupPushOverlay);
	document.addEventListener('keydown', closePopupPushEsc);
};

//Закрыть попап
const closePopup = popup => {
	popup.classList.remove('popup_active');
	popup.removeEventListener('click', closePopupPushOverlay);
	document.removeEventListener('keydown', closePopupPushEsc);
};

//Открыть popup добавления карточки
const openPopupAddCard = () => {
   addFormValidator.resetInputsErrors();
	openPopup(popupAddCard);
};

//Открыть popup изменения профиля
const openPopupEditProfile = () => {
	inputName.value = profileName.textContent;
	inputJob.value = profileJob.textContent;
   editFormValidator.resetInputsErrors();
	openPopup(popupEditProfile);
};

//Закрыть попап нажав на оверлей 
const closePopupPushOverlay = evt => {
	if (evt.target.classList.contains('popup_active')) {
      closePopup(evt.target);
   }
};

//Закрыть попап нажав на клавишу Escape
const closePopupPushEsc = evt => {
	if (evt.key === 'Escape') {
		closePopup(document.querySelector('.popup_active'));
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
   renderCard(inputPlace.value, inputLink.value);
	closePopup(popupAddCard);
	popupFormAddCard.reset();
};

initializationOfCards();

buttonEditProfile.addEventListener('click', openPopupEditProfile);
buttonAddCard.addEventListener('click', openPopupAddCard);
popupFormEditProfile.addEventListener('submit', sendFormEditProfile);
popupFormAddCard.addEventListener('submit', sendFormAddCard);
buttonCloseEditProfile.addEventListener('click', () => closePopup(popupEditProfile));
buttonCloseAddCard.addEventListener('click', () => closePopup(popupAddCard));
buttonClosePopupPicture.addEventListener('click', () => closePopup(popupPicture));

export {formData, openPopup, popupPicture, popupImage, popupPictureDescription};