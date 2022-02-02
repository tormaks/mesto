export default class Popup {
   constructor (popupSelector) {
      this._popupSelector = document.querySelector(popupSelector);
   }

   open() {
      this._popupSelector.classList.add('popup_active');
      this._popupSelector.addEventListener('click', this._pushOverlayClose);
      document.addEventListener('keydown', this._handleEscClose);
   }

   close = () => {
      this._popupSelector.classList.remove('popup_active');
      this._popupSelector.removeEventListener('click', this._pushOverlayClose);
      document.removeEventListener('keydown', this._handleEscClose);
   }

   _pushOverlayClose = evt => {
      if (evt.target.classList.contains('popup_active')) {
         this.close();
      }
   }

   _handleEscClose = evt => {
      if (evt.key === 'Escape') {
         this.close();
      }
   }

   setEventListeners() {
      this._popupSelector.querySelector('.popup__close').addEventListener('click', this.close);
   }
}