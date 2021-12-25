export default class FormValidator { 
   constructor(formData, formElement) {
      this._formElement = formElement;
      this._formSelector = formData.formSelector;
      this._inputSelector = formData.inputSelector;
      this._submitButtonSelector = formData.submitButtonSelector;
      this._inactiveButtonClass = formData.inactiveButtonClass;
      this._inputErrorClass = formData.inputErrorClass;
      this._errorClass = formData.errorClass;
   }

   _showInputError = (inputElement, messageError) => {
      this._inputError = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      this._inputError.classList.add(this._errorClass);
      this._inputError.textContent = messageError;
   };
   
   //Скрытие ошибок валидации
   _hideInputError = (inputElement) => {
      this._inputError = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      this._inputError.classList.remove(this._errorClass);
      this._inputError.textContent = '';
   };

   _checkInputValid = (inputElement) => {
      if (!inputElement.validity.valid) {
         this._showInputError(inputElement, inputElement.validationMessage);
      } else {
         this._hideInputError(inputElement);
      }
   };

   _isValid = () => {
      return this._inputsList.some(inputElement => {
         return !inputElement.validity.valid;
      });
   };

   _liveSwitchStateButton = () => {
      if (this._isValid()) {
         this._buttonElement.classList.add(this._inactiveButtonClass);
         this._buttonElement.setAttribute('disabled', 'disabled');
      } else {
         this._buttonElement.classList.remove(this._inactiveButtonClass);
         this._buttonElement.removeAttribute('disabled');
      }
   };

   _setEventListeners() {
      this._inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

      this._inputsList.forEach(inputElement => {
         inputElement.addEventListener('input', () => {
            this._checkInputValid(inputElement);
            this._liveSwitchStateButton();
         });
      });
   }

   resetInputsErrors = () => {
      this._inputsList.forEach(inputElement => {
         this._hideInputError(inputElement);
         this._liveSwitchStateButton();
      });
   };

   enableValidation() {
      this._formElement.addEventListener('submit', evt => {
         evt.preventDefault();
      })

      this._setEventListeners();      
   }
}