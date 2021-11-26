'use strict'

const cardTemplate = document.querySelector('#card').content;
const cardsList = document.querySelector('.cards__list');

const initialCards = [
	{
		name: 'Петергоф',
		link: './images/peterhof.jpg',
	},
	{
		name: 'Невский Проспект',
		link: './images/nevskijprospekt.jpg',
	},
	{
		name: 'Камчатка',
		link: './images/kamchatka.jpg',
	},
	{
		name: 'Байкал, Иркутск',
		link: './images/baikal.jpg',
	},
	{
		name: 'Алтай',
		link: './images/altai.jpg',
	},
	{
		name: 'Карелия',
		link: './images/kareliya.jpg',
	},
]

function firstCards(card) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	cardElement.querySelector('.card__image').src = card.link;
	cardElement.querySelector('.card__image').alt = card.name;
	cardElement.querySelector('.card__heading').textContent = card.name; 
	cardsList.append(cardElement);
}

initialCards.forEach(firstCards);

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_profile');
const popupFormEditProfile = popupEditProfile.querySelector('form');
const inputName = popupFormEditProfile.querySelector('.popup__input_value_name');
const inputJob = popupFormEditProfile.querySelector('.popup__input_value_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_place');
const popupFormAddCard = popupAddCard.querySelector('form');
const inputPlace = popupFormAddCard.querySelector('.popup__input_value_place');
const inputLink = popupFormAddCard.querySelector('.popup__input_value_link');

const popupViewPicture = document.querySelector('.popup_type_picture');
const imagesCards = document.querySelectorAll('.card__image');
const popupPicture = popupViewPicture.querySelector('.popup__picture');
const popupPictureDescription = popupViewPicture.querySelector('.popup__picture-description');

const buttonsLike = document.querySelectorAll('.card__like');
const buttonsClosePopup = document.querySelectorAll('.popup__close');

const buttonsDeleteCard = document.querySelectorAll('.card__trash');

//Поставить лайк карточке
function putLike(buttonLike) {
	buttonLike.addEventListener('click', () => buttonLike.classList.toggle('card__like_active'));
}

//Удалить карточку
function deleteCard(buttonDelete) {
	buttonDelete.addEventListener('click', () => {
		const listCard = buttonDelete.closest('.card');
		listCard.remove();
	})
}

//test
function openPopupViewPicture(pictureCard) {
	pictureCard.addEventListener('click', function() {
		popupPicture.src = pictureCard.src;
		popupPicture.alt = pictureCard.alt;
		popupPictureDescription.textContent = pictureCard.alt;
		popupViewPicture.classList.add('popup_active');
	})
}

//Открыть popup добавления карточки
function openPopupAddCard () {
	popupAddCard.classList.add('popup_active');
}

//Открыть popup изменения профиля
function openPopupEditProfile() {
	inputName.value = profileName.textContent;
	inputJob.value = profileJob.textContent;
	popupEditProfile.classList.add('popup_active');
}

//Закрыть popup
function closePopup() {
	popupEditProfile.classList.remove('popup_active');
	popupAddCard.classList.remove('popup_active');
	popupViewPicture.classList.remove('popup_active');
}

//Отправить форму изменения профиля
function sendFormEditProfile(evt) {
	evt.preventDefault();
	let newName = inputName.value;
	let newJob = inputJob.value;
	profileName.textContent = `${newName}`;
	profileJob.textContent = `${newJob}`;
	closePopup();
}

//Отправить форму добавления карточки
function sendFormAddCard(evt) {
	evt.preventDefault();
	const newCard = { 
		name: inputPlace.value, 
		link: inputLink.value,
	};
	closePopup();
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	cardElement.querySelector('.card__image').src = newCard.link;
	cardElement.querySelector('.card__image').alt = newCard.name;
	cardElement.querySelector('.card__heading').textContent = `${newCard.name}`; 
	cardsList.prepend(cardElement);
	const cardImage = cardElement.querySelector('.card__image');
	const buttonLike = cardElement.querySelector('.card__like');
	const buttonDelete = cardElement.querySelector('.card__trash');
	openPopupViewPicture(cardImage);
	putLike(buttonLike);
	deleteCard(buttonDelete);
}


buttonEditProfile.addEventListener('click', openPopupEditProfile);
buttonAddCard.addEventListener('click', openPopupAddCard);
buttonsClosePopup.forEach(function(buttonClosePopup) {
	buttonClosePopup.addEventListener('click', closePopup);
});
popupFormEditProfile.addEventListener('submit', sendFormEditProfile);
popupFormAddCard.addEventListener('submit', sendFormAddCard);
buttonsLike.forEach(putLike);
buttonsDeleteCard.forEach(deleteCard);
imagesCards.forEach(openPopupViewPicture);