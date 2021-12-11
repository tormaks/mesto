'use strict';

const formData = {
	formSelector: '.popup__form',
  	inputSelector: '.popup__input',
  	submitButtonSelector: '.popup__btn',
  	inactiveButtonClass: 'popup__btn_disabled',
  	inputErrorClass: 'popup__input_type_error',
  	errorClass: 'popup__error_visible',
};

const showInputError = (formData, formElement, inputElement, messageError) => {
	const inputError = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(`${formData.inputErrorClass}`);
	inputError.classList.add(`${formData.errorClass}`);
	inputError.textContent = messageError;
};
const hideInputError = (formData, formElement, inputElement) => {
	const inputError = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(`${formData.inputErrorClass}`);
	inputError.classList.remove(`${formData.errorClass}`);
	inputError.textContent = '';
};

const checkInputValid = (formElement, inputElement) => {
	if (!inputElement.validity.valid) {
		showInputError(formData, formElement, inputElement, inputElement.validationMessage);
	} else {
		hideInputError(formData ,formElement, inputElement);
	}
};

const isValid = inputs => {
	return inputs.some(input => {
		return !input.validity.valid;
	});
};

const switchStateButton = (formData, inputs, button) => {
	if (isValid(inputs)) {
		button.classList.add(`${formData.inactiveButtonClass}`);
	} else {
		button.classList.remove(`${formData.inactiveButtonClass}`);
	}
};

const setEventListeners = (formData, formElement) => {
	const inputs = Array.from(formElement.querySelectorAll(`${formData.inputSelector}`));

	const button = formElement.querySelector(`${formData.submitButtonSelector}`);

	if (formElement.getAttribute('name') === 'addCard') {
		switchStateButton(formData, inputs, button);
	}
	inputs.forEach(inputElement => {
		inputElement.addEventListener('input', (evt) => {
			checkInputValid(formElement, inputElement);
			switchStateButton(formData, inputs, button);
		});
	});
};

const enableValidation = formData => {
	const forms = Array.from(document.querySelectorAll(`${formData.formSelector}`));

	forms.forEach(formElement => {
		formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();

		});

		setEventListeners(formData, formElement);	
	});
};

enableValidation(formData);



