import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
   constructor(popupSelector, submitForm) {
      super(popupSelector);
      this._submitForm = submitForm;
   }

   _getInputValues() {
      this._inputsList = this._popupSelector.querySelectorAll('.popup__input');
      this._formValues = {};
      this._inputsList.forEach(input => {
         this._formValues[input.name] = input.value;
      })
      return this._formValues;
   }

   setEventListeners() {
      super.setEventListeners();
      this._popupSelector.querySelector('.popup__form').addEventListener('submit', evt => {
         this._submitForm(this._getInputValues(), evt);
      });  
   }

   close() {
      super.close();
      if (!this._popupSelector.classList.contains('popup_type_profile')) {
         this._popupSelector.querySelector('.popup__form').reset();
      }
   }
}