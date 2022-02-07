import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
   constructor(popupSelector, submitForm) {
      super(popupSelector);
      this._submitForm = submitForm;
      this._form = this._popup.querySelector('.popup__form');
      this._btnSubmit = this._form.querySelector('.popup__btn');
   }

   _getInputValues() {
      this._inputsList = this._form.querySelectorAll('.popup__input');
      this._formValues = {};
      this._inputsList.forEach(input => {
         this._formValues[input.name] = input.value;
      })
      return this._formValues;
   }

   loadingStart() {
      this._initialName = this._btnSubmit.textContent;
      this._btnSubmit.setAttribute('disabled', 'disabled');
      this._btnSubmit.textContent = 'Сохранение...';
   }

   loadingEnd() {
      this._btnSubmit.textContent = this._initialName;
   }

   _formSubmission = (evt) => {
      this._submitForm(this._getInputValues(), evt);
   }

   setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', this._formSubmission);
   }

   close() {
      super.close();
      this._form.reset();
   }
}