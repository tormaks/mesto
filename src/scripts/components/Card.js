import api from '../../pages/index.js';

export default class Card {
   constructor(name, link, templateSelector, cardSelector, cardId, userId, handleCardClick, deleteCardClick) {
      this._name = name;
      this._link = link;
      this._templateSelector = templateSelector;
      this._cardSelector = cardSelector;
      this._cardId = cardId;
      this._userId = userId;
      this._handleCardClick = handleCardClick;
      this._deleteCardClick = deleteCardClick;
   }

   _toggleLike(evt) {
      if (evt.target.classList.contains('card__like_active')) {
         api.toggleLikeCard(this._cardId, 'DELETE').then(data => {
            evt.target.classList.remove('card__like_active');
            evt.target.nextElementSibling.textContent = data.likes.length;
            console.log(data);
         })
      } else {
         api.toggleLikeCard(this._cardId, 'PUT').then(data => {
            evt.target.classList.add('card__like_active');
            evt.target.nextElementSibling.textContent = data.likes.length;
            console.log(data);
         })
      }
   }

   _deleteCard(evt) {
      evt.target.closest('.card').remove();
      api.deleteCard(this._cardId).then(data => console.log(data));
   }

   _openPopupConfirmDeleteCard(evt) {
      const popupConfirmDeleteCard = this._deleteCardClick();
      document.querySelector('.popup__btn_type_confirm-delete-card').addEventListener('click', () => {
         this._deleteCard(evt);
         popupConfirmDeleteCard.close();
      });
   }

   _openPopupPicture() {
      this._handleCardClick();
   }

   _setEventListeners() {
      this._element.querySelector('.card__like').addEventListener('click', evt => this._toggleLike(evt));
      this._element.querySelector('.card__trash').addEventListener('click', evt => this._openPopupConfirmDeleteCard(evt));
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

