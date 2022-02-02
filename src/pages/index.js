'use strict';

import './index.css';
import { buttonEditProfile, buttonUpdateAvatar, inputName, inputJob, buttonAddCard, cardsContainerSelector} from '../scripts/utils/constants.js';

import { formData } from "../scripts/utils/formData.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Popup from '../scripts/components/Popup.js';
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
   avatarSelector: '.profile__avatar',
});

(function updateUser() {
   api.getUserName()
   .then(({name, about, avatar}) => {
      userInfo.setUserInfo(name, about);
      userInfo.setUserAvatar(avatar);
   })
   .catch(err => console.log(err));
}())

const createPopupPicture = (name, link) => {
   const popupPicture = new PopupWithImage('.popup_type_picture');
   popupPicture.open(name, link);
   popupPicture.setEventListeners();
}

const createPopupConfirmDeleteCard = () => {
   const popupConfirmDeleteCard = new Popup('.popup_type_confirm-delete-card');
   popupConfirmDeleteCard.open();
   popupConfirmDeleteCard.setEventListeners();
   return popupConfirmDeleteCard;
}

const createCard = (name, link, cardId, userId) => {
   const cardElement = new Card(name, link, '#card', '.card', cardId, userId,
      () => {
         createPopupPicture(name, link);
   }, () => {
      const popupConfirmDeleteCard = createPopupConfirmDeleteCard();
      return popupConfirmDeleteCard;
   });
   return cardElement.generateCard();
}

const addCard = (name, link, userId, cardId, likes) => {
   const newCard = createCard(name, link, cardId, userId);
   const buttonDelete = newCard.querySelector('.card__trash');
   const numberLikes = newCard.querySelector('.card__number-likes');
   const buttonLike = newCard.querySelector('.card__like');
   likes.forEach(like => {
      if (like._id === '58b594a40c7b10a97241123a') {
         buttonLike.classList.add('card__like_active');
      }
   })
   numberLikes.textContent = likes.length;
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
         addCard(item.name, item.link, item.owner._id, item._id, item.likes);
      })
   });
}());

const popupEditProfile = new PopupWithForm('.popup_type_profile', function(formValues, evt) {
   evt.preventDefault();
   const { name, job } = formValues;
   api.setUserData({name, about: job})
      .then(data => {
         userInfo.setUserInfo(data.name, data.about);
         popupEditProfile.close();
      })
      .catch(err => console.log(err));
});

const popupAddCard = new PopupWithForm('.popup_type_place', function(formValues, evt) {
   evt.preventDefault();
   const { place, link } = formValues;
   api.addNewCard(place, link)
      .then(data => {
         addCard(place, link, data.owner._id, data._id, data.likes);
         popupAddCard.close();
      })
      .catch(err => console.log(err));
})

const popupUpdateAvatar = new PopupWithForm('.popup_type_update-avatar', function(formValues, evt) {
   evt.preventDefault();
   const { avatar } = formValues;
   api.setUserData({avatar}, '/avatar')
      .then(data => {
         userInfo.setUserAvatar(data.avatar);
         popupUpdateAvatar.close();
      })
      .catch(err => console.log(err));
})

const validationForm = popup => {
   const formElement = popup.querySelector(`${formData.formSelector}`);
   const formValidator = new FormValidator(formData, formElement);
   formValidator.enableValidation();
   return formValidator;
}

const popupEditFormValidator = validationForm(document.querySelector('.popup_type_profile'));
const popupAddCardFormValidator = validationForm(document.querySelector('.popup_type_place'));
const popupUpdateAvatarFormValidator = validationForm(document.querySelector('.popup_type_update-avatar'));

const openPopupEditProfile = () => {
   const {name, job} = userInfo.getUserInfo();
   inputName.value = name;
   inputJob.value = job;
   popupEditFormValidator.resetInputsErrors();
   popupEditProfile.open();
   popupEditProfile.setEventListeners();
};

const openPopupAddCard = () => {
   popupAddCardFormValidator.resetInputsErrors();
   popupAddCard.open();
   popupAddCard.setEventListeners();
};

const openPopupUpdateAvatar = () => {
   popupUpdateAvatarFormValidator.resetInputsErrors();
   popupUpdateAvatar.open();
   popupUpdateAvatar.setEventListeners();
}

buttonEditProfile.addEventListener('click', openPopupEditProfile);
buttonAddCard.addEventListener('click', openPopupAddCard);
buttonUpdateAvatar.addEventListener('click', openPopupUpdateAvatar);

export default api;