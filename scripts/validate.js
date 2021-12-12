'use strict';

//Показ ошибок валидации
const showInputError = (formData, formElement, inputElement, messageError) => {
	const inputError = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(`${formData.inputErrorClass}`);
	inputError.classList.add(`${formData.errorClass}`);
	inputError.textContent = messageError;
};

//Скрытие ошибок валидации
const hideInputError = (formData, formElement, inputElement) => {
	const inputError = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(`${formData.inputErrorClass}`);
	inputError.classList.remove(`${formData.errorClass}`);
	inputError.textContent = '';
};

//Живая проверка валидности инпута для показа ошибок
const checkInputValid = (formElement, inputElement) => {
	if (!inputElement.validity.valid) {
		showInputError(formData, formElement, inputElement, inputElement.validationMessage);
	} else {
		hideInputError(formData, formElement, inputElement);
	}
};

//Живая проверка валидности инпутов для переключения кнопки
const isValid = inputsList => {
	return inputsList.some(inputElement => {
		return !inputElement.validity.valid;
	});
};

//Живое переключение состояния кнопки
const liveSwitchStateButton = (formData, inputsList, buttonElement) => {
	if (isValid(inputsList)) {
		buttonElement.classList.add(`${formData.inactiveButtonClass}`);
		buttonElement.setAttribute('disabled', 'disabled');
	} else {
		buttonElement.classList.remove(`${formData.inactiveButtonClass}`);
		buttonElement.removeAttribute('disabled');
	}
};

//Поиск всех инпутов во всех формах и их живая валидация
const setEventListeners = (formData, formElement) => {
	const inputsList = Array.from(formElement.querySelectorAll(`${formData.inputSelector}`));

	const buttonElement = formElement.querySelector(`${formData.submitButtonSelector}`);

	inputsList.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
			checkInputValid(formElement, inputElement);
			liveSwitchStateButton(formData, inputsList, buttonElement);
		});
	});
};

//Поиск всех форм на странице и запуск живой валидации
const enableValidation = formData => {
	const formsList = Array.from(document.querySelectorAll(`${formData.formSelector}`));

	formsList.forEach(formElement => {
		formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();
		});

		setEventListeners(formData, formElement);	
	});
};

//Сброс ошибок инпутов
const resetInputsErrors = (formData, popup) => {
	const formElement = popup.querySelector(`${formData.formSelector}`);
	const buttonElement = formElement.querySelector(`${formData.submitButtonSelector}`);
	const inputsList = Array.from(formElement.querySelectorAll(`${formData.inputSelector}`));
	inputsList.forEach(inputElement => {
		hideInputError(formData, formElement, inputElement);
		liveSwitchStateButton(formData, inputsList, buttonElement);
	});
};

enableValidation(formData);



