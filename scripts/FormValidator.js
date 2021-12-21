'use strict';

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

   _showInputError = (formElement, inputElement, messageError) => {
      const inputError = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      inputError.classList.add(this._errorClass);
      inputError.textContent = messageError;
   };
   
   //Скрытие ошибок валидации
   _hideInputError = (formElement, inputElement) => {
      const inputError = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      inputError.classList.remove(this._errorClass);
      inputError.textContent = '';
   };

   _checkInputValid = (formElement, inputElement) => {
      if (!inputElement.validity.valid) {
         this._showInputError(formElement, inputElement, inputElement.validationMessage);
      } else {
         this._hideInputError(formElement, inputElement);
      }
   };

   _isValid = inputsList => {
      return inputsList.some(inputElement => {
         return !inputElement.validity.valid;
      });
   };

   _liveSwitchStateButton = (inputsList, buttonElement) => {
      if (this._isValid(inputsList)) {
         buttonElement.classList.add(this._inactiveButtonClass);
         buttonElement.setAttribute('disabled', 'disabled');
      } else {
         buttonElement.classList.remove(this._inactiveButtonClass);
         buttonElement.removeAttribute('disabled');
      }
   };

   _setEventListeners(formElement) {
      const inputsList = Array.from(formElement.querySelectorAll(this._inputSelector));

      const buttonElement = formElement.querySelector(this._submitButtonSelector);

      inputsList.forEach(inputElement => {
         inputElement.addEventListener('input', () => {
            this._checkInputValid(formElement, inputElement);
            this._liveSwitchStateButton(inputsList, buttonElement);
         });
      });
   }

   resetInputsErrors = popup => {
      const formElement = popup.querySelector(this._formSelector);
      const buttonElement = formElement.querySelector(this._submitButtonSelector);
      const inputsList = Array.from(formElement.querySelectorAll(this._inputSelector));
      inputsList.forEach(inputElement => {
         this._hideInputError(formElement, inputElement);
         this._liveSwitchStateButton(inputsList, buttonElement);
      });
   };

   enableValidation() {
      this._formElement.addEventListener('submit', (evt) => {
         evt.preventDefault();
      })

      this._setEventListeners(this._formElement);
   }
}