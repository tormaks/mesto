'use strict';

import './index.css';
import { buttonEditProfile, inputName, inputJob, buttonAddCard, cardsContainerSelector} from '../scripts/utils/constants.js';

import { formData } from "../scripts/utils/formData.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
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

(function updateUser() {
   api.getUserName()
   .then(({name, about, avatar}) => userInfo.setUserInfo(name, about, avatar))
   .catch(err => console.log(err));
}())

const createPopupPicture = (name, link) => {
   const popupPicture = new PopupWithImage('.popup_type_picture');
   popupPicture.open(name, link);
   popupPicture.setEventListeners();
}

const createCard = (name, link, cardId) => {
   const cardElement = new Card(name, link, '#card', '.card', cardId, () => {
      createPopupPicture(name, link);
   });
   return cardElement.generateCard();
}

const addCard = (name, link, userId, cardId) => {
   const newCard = createCard(name, link, cardId);
   const buttonDelete = newCard.querySelector('.card__trash');
   if (userId !== '58b594a40c7b10a97241123a') {
      buttonDelete.remove();
   }
   document.querySelector(cardsContainerSelector).prepend(newCard);
}

(function updateCards() {
   api.getCards().then(data => {
      const array = data.reverse();
      console.log(array);
      array.forEach(item => {
         addCard(item.name, item.link, item.owner._id, item._id);
      })
   });
}());

const popupEditProfile = new PopupWithForm('.popup_type_profile', function(formValues, evt) {
   evt.preventDefault();
   const { name, job } = formValues;
   api.setUserName(name, job)
      .then(data => {
         userInfo.setUserInfo(data.name, data.about, data.avatar);
      })
      .catch(err => console.log(err));
   popupEditProfile.close();
});

const popupAddCard = new PopupWithForm('.popup_type_place', function(formValues, evt) {
   evt.preventDefault();
   const { place, link } = formValues;
   api.addNewCard(place, link)
      .then(data => {
         addCard(place, link, data.owner._id, data._id);
      })
      .catch(err => console.log(err));
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

export default api;