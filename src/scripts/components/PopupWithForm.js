import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
   constructor(popupSelector, submitForm) {
      super(popupSelector);
      this._submitForm = submitForm;
   }

   _getInputValues() {
      this._inputsList = Array.from(this._popupSelector.querySelectorAll('input'));
      console.log(this._inputsList);
   }

   setEventListeners() {
      super.setEventListeners();
      this._popupSelector.querySelector('.popup__form').addEventListener('submit', this._submitForm);
   }

   close() {
      super.close();
      if (!this._popupSelector.classList.contains('popup_type_profile')) {
         this._popupSelector.querySelector('.popup__form').reset();
      }
   }
}