'use strict';

import { openPopup, closePopup } from "./index.js";

export default class Card {
   constructor(name, link, templateSelector, cardSelector) {
      this._name = name;
      this._link = link;
      this._templateSelector = templateSelector;
      this._cardSelector = cardSelector;
   }

   _putLike(evt) {
      evt.target.classList.toggle('card__like_active');
   }

   _deleteCard(evt) {
      const cardItem = evt.target.closest(this._cardSelector);
	   cardItem.remove();
   }

   _openPopupPicture() {
      const popupPicture = document.querySelector('.popup_type_picture');
      const buttonClosePopupPicture = document.querySelector('.popup__close_type_picture');
      const popupImage = popupPicture.querySelector('.popup__image');
      const popupPictureDescription = popupPicture.querySelector('.popup__image-description');
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupPictureDescription.textContent = this._name;
      openPopup(popupPicture);
      buttonClosePopupPicture.addEventListener('click', () => {
         closePopup(popupPicture);
      });
   }

   _setEventListeners(cardElement) {
      cardElement.querySelector('.card__like').addEventListener('click', evt => this._putLike(evt));
      cardElement.querySelector('.card__trash').addEventListener('click', evt => this._deleteCard(evt));
      cardElement.querySelector('.card__image').addEventListener('click', () => this._openPopupPicture());
   }

   _getTemplate() {
      const cardElement = document
         .querySelector(this._templateSelector)
         .content
         .querySelector(this._cardSelector)
         .cloneNode(true);

      return cardElement;
   }

   generateCard() {
      this._element = this._getTemplate();

      this._setEventListeners(this._element);
         
      this._element.querySelector('.card__image').src = this._link;
      this._element.querySelector('.card__image').alt = this._name;
      this._element.querySelector('.card__heading').textContent = this._name;

      document.querySelector('.cards__list').prepend(this._element);
   }
}

