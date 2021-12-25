'use strict';

import '../../pages/index.css';

import { initialCards } from "../utils/initialCards.js";
import { formData } from "../utils/formData.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const buttonEditProfile = document.querySelector('.profile__edit-button');
const inputName = document.querySelector('.popup__input_value_name');
const inputJob = document.querySelector('.popup__input_value_job');

const buttonAddCard = document.querySelector('.profile__add-button');
const inputPlace = document.querySelector('.popup__input_value_place');
const inputLink = document.querySelector('.popup__input_value_link');

const popupPicture = document.querySelector('.popup_type_picture');
const popupImage = popupPicture.querySelector('.popup__image');
const popupPictureDescription = popupPicture.querySelector('.popup__image-description');

const cardsContainerSelector = '.cards__list';

const createCard = (name, link) => {
   const cardElement = new Card(name, link, '#card', '.card', () => {
      const popupPicture = new PopupWithImage('.popup_type_picture', name, link);
      popupPicture.open();
   });
   const newCard = cardElement.generateCard();
   cardsList.addItem(newCard);
}

const cardsList = new Section({
   items: initialCards,
   renderer: item => {
      createCard(item.name, item.link);
   }
}, cardsContainerSelector);

cardsList.renderItems();

const userInfo = new UserInfo({
   nameSelector: '.profile__name',
   jobSelector: '.profile__job',
});

const popupEditProfile = new PopupWithForm('.popup_type_profile', evt => {
   evt.preventDefault();
   userInfo.setUserInfo(inputName.value, inputJob.value);
   popupEditProfile.close();
});

const popupAddCard = new PopupWithForm('.popup_type_place', evt => {
   evt.preventDefault();
   const name = inputPlace.value;
   const link = inputLink.value;
   createCard(name, link);
   popupAddCard.close();
})

//Валидация формы
const validationForm = popup => {
   const formElement = popup.querySelector(`${formData.formSelector}`);
   const formValidator = new FormValidator(formData, formElement);
   formValidator.enableValidation();
   return formValidator;
}

const openPopupAddCard = () => {
   popupAddCardFormValidator.resetInputsErrors();
   popupAddCard.open();
};

//Открыть popup изменения профиля
const openPopupEditProfile = () => {
   const {name, job} = userInfo.getUserInfo();
   inputName.value = name;
   inputJob.value = job;
   popupEditFormValidator.resetInputsErrors();
   popupEditProfile.open();
};

const popupEditFormValidator = validationForm(document.querySelector('.popup_type_profile'));
const popupAddCardFormValidator = validationForm(document.querySelector('.popup_type_place'));

buttonEditProfile.addEventListener('click', openPopupEditProfile);
buttonAddCard.addEventListener('click', openPopupAddCard);

export {popupImage, popupPictureDescription};