export default class Popup {
   constructor (popupSelector) {
      this._popup = document.querySelector(popupSelector);
   }

   open() {
      this._popup.classList.add('popup_active');
      this._popup.addEventListener('click', this._pushOverlayClose);
      document.addEventListener('keydown', this._handleEscClose);
   }

   close = () => {
      this._popup.classList.remove('popup_active');
      this._popup.removeEventListener('click', this._pushOverlayClose);
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
      this._popup.querySelector('.popup__close').addEventListener('click', this.close);
   }
}