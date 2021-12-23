'use strict';

import { openPopup, popupPicture, popupImage, popupPictureDescription} from "./index.js";

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

   _deleteCard() {
      this._element.remove();
   }

   _openPopupPicture() {
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupPictureDescription.textContent = this._name;
      openPopup(popupPicture);
   }

   _setEventListeners() {
      this._element.querySelector('.card__like').addEventListener('click', evt => this._putLike(evt));
      this._element.querySelector('.card__trash').addEventListener('click', () => this._deleteCard());
      this._elementImage.addEventListener('click', () => this._openPopupPicture());
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
      this._elementImage = this._element.querySelector('.card__image');

      this._setEventListeners();

      this._elementImage.src = this._link;
      this._elementImage.alt = this._name;
      this._element.querySelector('.card__heading').textContent = this._name;

      return this._element;
   }
}

