'use strict';

import './index.css';
import { buttonEditProfile, inputName, inputJob, buttonAddCard, popupImage, popupPictureDescription, cardsContainerSelector} from '../scripts/utils/constants.js';

import { initialCards } from "../scripts/utils/initialCards.js";
import { formData } from "../scripts/utils/formData.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";

const createCard = (name, link) => {
   const cardElement = new Card(name, link, '#card', '.card', () => {
      const popupPicture = new PopupWithImage('.popup_type_picture', name, link, popupImage, popupPictureDescription);
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

const popupEditProfile = new PopupWithForm('.popup_type_profile', function(formValues, evt) {
   evt.preventDefault();
   const { name, job } = formValues;
   userInfo.setUserInfo(name, job);
   popupEditProfile.close();
});

const popupAddCard = new PopupWithForm('.popup_type_place', function(formValues, evt) {
   evt.preventDefault();
   const { place, link } = formValues;
   createCard(place, link);
   popupAddCard.close();
})

const validationForm = popup => {
   const formElement = popup.querySelector(`${formData.formSelector}`);
   const formValidator = new FormValidator(formData, formElement);
   formValidator.enableValidation();
   return formValidator;
}

const popupEditFormValidator = validationForm(document.querySelector('.popup_type_profile'));
const popupAddCardFormValidator = validationForm(document.querySelector('.popup_type_place'));

const openPopupAddCard = () => {
   popupAddCardFormValidator.resetInputsErrors();
   popupAddCard.open();
};

const openPopupEditProfile = () => {
   const {name, job} = userInfo.getUserInfo();
   inputName.value = name;
   inputJob.value = job;
   popupEditFormValidator.resetInputsErrors();
   popupEditProfile.open();
};

buttonEditProfile.addEventListener('click', openPopupEditProfile);
buttonAddCard.addEventListener('click', openPopupAddCard);