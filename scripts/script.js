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

//Создать карточку
function createCard(card) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
	const buttonLikeCard = cardElement.querySelector('.card__like');
	const buttonDeleteCard = cardElement.querySelector('.card__trash');
	cardImage.src = card.link;
	cardImage.alt = card.name;
	cardElement.querySelector('.card__heading').textContent = card.name;
	buttonLikeCard.addEventListener('click', putLike(buttonLikeCard));
	buttonDeleteCard.addEventListener('click', deleteCard(buttonDeleteCard));
	cardImage.addEventListener('click', openPopupViewPicture(cardImage));
	return cardElement;
}

//Добавить карточку на страницу
const renderCard = (cardElement) => cardsList.prepend(cardElement);

//Добавление начальных карточек из initialCards.js
initialCards.forEach((initialCard) => {renderCard(createCard(initialCard))});

//Поставить лайк карточке
function putLike(buttonLikeCard) {
	buttonLikeCard.addEventListener('click', () => buttonLikeCard.classList.toggle('card__like_active'));
}

//Удалить карточку
function deleteCard(buttonDeleteCard) {
	buttonDeleteCard.addEventListener('click', () => {
		const cardItem = buttonDeleteCard.closest('.card');
		cardItem.remove();
	})
}

//Открыть попап картинки
function openPopupViewPicture(pictureCard) {
	pictureCard.addEventListener('click', function() {
		openPopup(popupViewPicture);
		popupPicture.src = pictureCard.src;
		popupPicture.alt = pictureCard.alt;
		popupPictureDescription.textContent = pictureCard.alt;
	})
}

//Открыть попап
const openPopup = (popup) => popup.classList.add('popup_active');

//Закрыть попап
const closePopup = (popup) => popup.classList.remove('popup_active');

//Открыть popup изменения профиля
function openPopupEditProfile() {
	openPopup(popupEditProfile);
	inputName.value = profileName.textContent;
	inputJob.value = profileJob.textContent;
}

//Отправить форму изменения профиля
function sendFormEditProfile(evt) {
	evt.preventDefault();
	const newName = inputName.value;
	const newJob = inputJob.value;
	profileName.textContent = `${newName}`;
	profileJob.textContent = `${newJob}`;
	closePopup(popupEditProfile);
}

//Отправить форму добавления карточки
function sendFormAddCard(evt) {
	evt.preventDefault();
	const cardElement = createCard({name: inputPlace.value, link: inputLink.value});
	renderCard(cardElement);
	closePopup(popupAddCard);
	popupFormAddCard.reset();
}

buttonEditProfile.addEventListener('click', openPopupEditProfile);
popupFormEditProfile.addEventListener('submit', sendFormEditProfile);
buttonAddCard.addEventListener('click', () => openPopup(popupAddCard));
popupFormAddCard.addEventListener('submit', sendFormAddCard);
buttonCloseEditProfile.addEventListener('click', () => closePopup(popupEditProfile));
buttonCloseAddCard.addEventListener('click', () => closePopup(popupAddCard));
buttonCloseViewPicture.addEventListener('click', () => closePopup(popupViewPicture));