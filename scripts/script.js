'use strict';

const cardTemplate = document.querySelector('#card').content;
const cardsList = document.querySelector('.cards__list');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_profile');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close_type_profile');
const popupFormEditProfile = popupEditProfile.querySelector('form');
const inputName = popupFormEditProfile.querySelector('.popup__input_value_name');
const inputJob = popupFormEditProfile.querySelector('.popup__input_value_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_place');
const buttonCloseAddCard = popupAddCard.querySelector('.popup__close_type_place');
const popupFormAddCard = popupAddCard.querySelector('form');
const inputPlace = popupFormAddCard.querySelector('.popup__input_value_place');
const inputLink = popupFormAddCard.querySelector('.popup__input_value_link');

const popupViewPicture = document.querySelector('.popup_type_picture');
const buttonCloseViewPicture = popupViewPicture.querySelector('.popup__close_type_picture');
const popupPicture = popupViewPicture.querySelector('.popup__picture');
const popupPictureDescription = popupViewPicture.querySelector('.popup__picture-description');

const popups = document.querySelectorAll('.popup');

//Создать карточку
function createCard(card) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
	const buttonLikeCard = cardElement.querySelector('.card__like');
	const buttonDeleteCard = cardElement.querySelector('.card__trash');
	cardImage.src = card.link;
	cardImage.alt = card.name;
	cardElement.querySelector('.card__heading').textContent = card.name;
	buttonLikeCard.addEventListener('click', evt => putLike(evt));
	buttonDeleteCard.addEventListener('click', evt => deleteCard(evt));
	cardImage.addEventListener('click', () => openPopupViewPicture(card.name, card.link));
	return cardElement;
}

//Добавить карточку на страницу
const renderCard = (cardElement) => cardsList.prepend(cardElement);

//Добавление начальных карточек из initialCards.js
initialCards.forEach((initialCard) => {renderCard(createCard(initialCard));});

//Поставить лайк карточке
function putLike(evt) {
	evt.target.classList.toggle('card__like_active');
}

//Удалить карточку
function deleteCard(evt) {
	const cardItem = evt.target.closest('.card');
	console.log(cardItem);
	cardItem.remove();
}

//Открыть попап картинки
function openPopupViewPicture(cardName, cardSrc) {
	popupPicture.src = cardSrc;
	popupPicture.alt = cardName;
	popupPictureDescription.textContent = cardName;
	openPopup(popupViewPicture);
}

//Открыть попап
const openPopup = (popup) => {
	if (popup.querySelector(`${formData.formSelector}`)) {
		openSwitchStateButton(formData, popup);
	}
	popup.classList.add('popup_active');
	popup.addEventListener('click', closePopupPushOverlay);
	document.addEventListener('keydown', closePopupPushEsc);
};

//Закрыть попап
const closePopup = (popup) => {
	popup.classList.remove('popup_active');
	popup.removeEventListener('click', closePopupPushOverlay);
	document.removeEventListener('keydown', closePopupPushEsc);
};

//Закрыть попап нажав на клавишу Escape
function closePopupPushEsc(evt) {
	if (evt.key === 'Escape') {
		const popup = document.querySelector('.popup_active');
		if (popup.querySelector(`${formData.formSelector}`)) {
			closePopupWithResetInputs(popup);
		} else {
			closePopup(popup);
		}
	}
}

//Закрыть попап нажав на оверлей 
function closePopupPushOverlay(evt) {
	if (evt.target.querySelector(`${formData.formSelector}`)) {
		closePopupWithResetInputs(evt.target);
	} else {
		closePopup(evt.target);
	}
}

const closePopupWithResetInputs = (popup) => {
	resetInputs(formData, popup);
	closePopup(popup);
};

//Открыть popup изменения профиля
function openPopupEditProfile() {
	inputName.value = profileName.textContent;
	inputJob.value = profileJob.textContent;
	openPopup(popupEditProfile);
}

//Отправить форму изменения профиля
function sendFormEditProfile(evt) {
	evt.preventDefault();
	profileName.textContent = inputName.value;
	profileJob.textContent = inputJob.value;
	closePopup(popupEditProfile);
}

//Отправить форму добавления карточки
function sendFormAddCard(evt) {
	evt.preventDefault();
	const cardElement = createCard({name: inputPlace.value, link: inputLink.value});
	renderCard(cardElement);
	closePopupWithResetInputs(popupAddCard);
	popupFormAddCard.reset();
}

buttonEditProfile.addEventListener('click', openPopupEditProfile);
popupFormEditProfile.addEventListener('submit', sendFormEditProfile);
buttonAddCard.addEventListener('click', () => openPopup(popupAddCard));
popupFormAddCard.addEventListener('submit', sendFormAddCard);
buttonCloseEditProfile.addEventListener('click', () => closePopupWithResetInputs(popupEditProfile));
buttonCloseAddCard.addEventListener('click', () => closePopupWithResetInputs(popupAddCard));
buttonCloseViewPicture.addEventListener('click', () => closePopup(popupViewPicture));