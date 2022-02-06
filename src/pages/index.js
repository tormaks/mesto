'use strict';

import './index.css';

import { buttonEditProfile, buttonUpdateAvatar, inputName, inputJob, buttonAddCard, cardsContainerSelector} from '../scripts/utils/constants.js';
import { formData } from "../scripts/utils/formData.js";

import Card from "../scripts/components/Card.js";
import Section from '../scripts/components/Section';
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithConfirmDeleteCard from '../scripts/components/PopupWithConfirmDeleteCard';
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js"

let userId;
let cardsList;

const popupPicture = new PopupWithImage('.popup_type_picture');
popupPicture.setEventListeners();

const popupConfirmDeleteCard = new PopupWithConfirmDeleteCard('.popup_type_confirm-delete-card');
popupConfirmDeleteCard.setEventListeners();

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

Promise.all([api.getUserName(), api.getCards()])
    .then(([userData, cards]) => {
       updateUser(userData.name, userData.about, userData.avatar, userData._id);
       updateCards(cards);
    }).catch(err => console.log(err));

const updateUser = (name, about, avatar, id) => {
   userId = id;
   userInfo.setUserInfo(name, about);
   userInfo.setUserAvatar(avatar);
}

const updateCards = (cards) => {
   cardsList = new Section({
      items: cards.reverse(),
      renderer: card => {
         addCard(card.name, card.link, card.owner._id, card._id, card.likes);
      }
   }, cardsContainerSelector);

   cardsList.renderItems();
}

const openPopupPicture = (name, link) => {
   popupPicture.open(name, link);
}

const openPopupConfirmDeleteCard = (removedCard, cardId) => {
   popupConfirmDeleteCard.setRemovedCardData(removedCard, cardId);
   popupConfirmDeleteCard.open();
}

const createCard = (name, link, cardId, userId) => {
   const cardElement = new Card(name, link, '#card', '.card', cardId, userId,
      () => {
         openPopupPicture(name, link);
   }, (removedCard, cardId) => {
      openPopupConfirmDeleteCard(removedCard, cardId);
   });
   return cardElement.generateCard();
}

const filterButtonsDelete = (newCard, cardUserId) => {
   const buttonDelete = newCard.querySelector('.card__trash');

   if (cardUserId !== userId) {
      buttonDelete.remove();
   }
}

const filterLikes = (newCard, cardUserId, likes) => {
   const numberLikes = newCard.querySelector('.card__number-likes');
   const buttonLike = newCard.querySelector('.card__like');

   likes.forEach(like => {
      if (like._id === userId) {
         buttonLike.classList.add('card__like_active');
      }
   })

   numberLikes.textContent = likes.length;
}

const addCard = (name, link, cardUserId, cardId, likes) => {
   const newCard = createCard(name, link, cardId, cardUserId);

   filterButtonsDelete(newCard, cardUserId);
   filterLikes(newCard, cardUserId, likes);

   cardsList.addItem(newCard);
}

const popupEditProfile = new PopupWithForm('.popup_type_profile', function(formValues, evt) {
   evt.preventDefault();
   popupEditProfile.loadingStart();
   const { name, job } = formValues;
   api.setUserData({name, about: job})
      .then(data => {
         userInfo.setUserInfo(data.name, data.about);
      })
      .catch(err => console.log(err))
       .finally(() => {
          popupEditProfile.close();
          popupEditProfile.loadingEnd();
       })
});

const popupAddCard = new PopupWithForm('.popup_type_place', function(formValues, evt) {
   evt.preventDefault();
   popupAddCard.loadingStart();
   const { place, link } = formValues;
   api.addNewCard(place, link)
      .then(data => {
         addCard(place, link, data.owner._id, data._id, data.likes);
      }).catch(err => console.log(err))
         .finally(() => {
            popupAddCard.close();
            popupAddCard.loadingEnd();
         })
})

const popupUpdateAvatar = new PopupWithForm('.popup_type_update-avatar', function(formValues, evt) {
   evt.preventDefault();
   popupUpdateAvatar.loadingStart();
   const { avatar } = formValues;
   api.setUserData({avatar}, '/avatar')
      .then(data => {
         userInfo.setUserAvatar(data.avatar);
      })
      .catch(err => console.log(err))
       .finally(() => {
          popupUpdateAvatar.close();
          popupUpdateAvatar.loadingEnd();
       })
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