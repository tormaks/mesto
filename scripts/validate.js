'use strict';

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

const liveSwitchStateButton = (formData, inputs, button) => {
	if (isValid(inputs)) {
		button.classList.add(`${formData.inactiveButtonClass}`);
	} else {
		button.classList.remove(`${formData.inactiveButtonClass}`);
	}
};

const openSwitchStateButton = (formData, popup) => {
	const formElement = popup.querySelector(`${formData.formSelector}`);
	const button = formElement.querySelector(`${formData.submitButtonSelector}`);
	const inputsList = Array.from(formElement.querySelectorAll(`${formData.inputSelector}`));
	if (isValid(inputsList)) {
		button.classList.add(`${formData.inactiveButtonClass}`);
	} else {
		button.classList.remove(`${formData.inactiveButtonClass}`);
	}
	inputsList.forEach(inputElement => checkInputValid(formElement, inputElement));
};

const setEventListeners = (formData, formElement) => {
	const inputs = Array.from(formElement.querySelectorAll(`${formData.inputSelector}`));

	const button = formElement.querySelector(`${formData.submitButtonSelector}`);

	inputs.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
			checkInputValid(formElement, inputElement);
			liveSwitchStateButton(formData, inputs, button);
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

function resetInputs(formData, popup) {
	const formElement = popup.querySelector(`${formData.formSelector}`);
	const inputsList = Array.from(formElement.querySelectorAll(`${formData.inputSelector}`));
	inputsList.forEach(input => {
		hideInputError(formData, formElement, input);
	});
}

enableValidation(formData);



