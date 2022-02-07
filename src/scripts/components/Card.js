import api from '../../pages/index.js';

export default class Card {
   constructor(name, link, templateSelector, cardSelector, userId, cardUserId, cardId, likes, handleCardClick, deleteCardClick) {
      this._name = name;
      this._link = link;
      this._templateSelector = templateSelector;
      this._cardSelector = cardSelector;
      this._userId = userId;
      this._cardUserId = cardUserId;
      this._cardId = cardId;
      this._likes = likes;
      this._handleCardClick = handleCardClick;
      this._deleteCardClick = deleteCardClick;
   }

   _toggleLike(evt) {
      if (evt.target.classList.contains('card__like_active')) {
         api.toggleLikeCard(this._cardId, 'DELETE')
             .then(data => {
                  evt.target.classList.remove('card__like_active');
                  evt.target.nextElementSibling.textContent = data.likes.length;
             }).catch(error => console.log(error));
      } else {
         api.toggleLikeCard(this._cardId, 'PUT')
             .then(data => {
               evt.target.classList.add('card__like_active');
               evt.target.nextElementSibling.textContent = data.likes.length;
            }).catch(error => console.log(error));
      }
   }

   _openPopupConfirmDeleteCard(evt) {
      const removedCard = evt.target.closest('.card');
      this._deleteCardClick(removedCard, this._cardId);
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

   _filterButtonsDelete(newCard) {
      const buttonDelete = newCard.querySelector('.card__trash');

      if (this._cardUserId !== this._userId) {
         buttonDelete.remove();
      }
   }

   _filterLikes(newCard) {
      const numberLikes = newCard.querySelector('.card__number-likes');
      const buttonLike = newCard.querySelector('.card__like');

      this._likes.forEach(like => {
         if (like._id === this._userId) {
            buttonLike.classList.add('card__like_active');
         }
      })

      numberLikes.textContent = this._likes.length;
   }

   generateCard() {
      this._element = this._getTemplate();
      this._elementImage = this._element.querySelector('.card__image');

      this._setEventListeners();

      this._filterButtonsDelete(this._element)
      this._filterLikes(this._element);

      this._elementImage.src = this._link;
      this._elementImage.alt = this._name;
      this._element.querySelector('.card__heading').textContent = this._name;

      return this._element;
   }
}

