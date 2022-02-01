'use strict';

import './index.css';
import { buttonEditProfile, inputName, inputJob, buttonAddCard, cardsContainerSelector} from '../scripts/utils/constants.js';

import { initialCards } from "../scripts/utils/initialCards.js";
import { formData } from "../scripts/utils/formData.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js"

const api = new Api({
   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-35',
   headers: {
      authorization: 'ba215110-62f5-4bce-89bc-aab13847df95',
      'Content-Type': 'application/json'
   }
});

const userInfo = new UserInfo({
   nameSelector: '.profile__name',
   jobSelector: '.profile__job',
   avatarSelector: '.profile__image',
});

api.getUserName()
   .then(({name, about, avatar}) => userInfo.setUserInfo(name, about, avatar))
   .catch(err => console.log(err));

const createPopupPicture = (name, link) => {
   const popupPicture = new PopupWithImage('.popup_type_picture');
   popupPicture.open(name, link);
   popupPicture.setEventListeners();
}

const createCard = (name, link) => {
   const cardElement = new Card(name, link, '#card', '.card', () => {
      createPopupPicture(name, link);
   });
   return cardElement.generateCard();
}

const addCard = (name, link) => {
   const newCard = createCard(name, link);
   cardsList.addItem(newCard);
}

const cardsList = new Section({
   items: initialCards,
   renderer: item => {
      addCard(item.name, item.link);
   }
}, cardsContainerSelector);

cardsList.renderItems();

const popupEditProfile = new PopupWithForm('.popup_type_profile', function(formValues, evt) {
   evt.preventDefault();
   const { name, job } = formValues;
   userInfo.setUserInfo(name, job);
   popupEditProfile.close();
});

const popupAddCard = new PopupWithForm('.popup_type_place', function(formValues, evt) {
   evt.preventDefault();
   const { place, link } = formValues;
   addCard(place, link);
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
   popupAddCard.setEventListeners();
};

const openPopupEditProfile = () => {
   const {name, job} = userInfo.getUserInfo();
   inputName.value = name;
   inputJob.value = job;
   popupEditFormValidator.resetInputsErrors();
   popupEditProfile.open();
   popupEditProfile.setEventListeners();
};

buttonEditProfile.addEventListener('click', openPopupEditProfile);
buttonAddCard.addEventListener('click', openPopupAddCard);