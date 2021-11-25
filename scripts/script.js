'use strict'

const cardTemplate = document.querySelector('#card').content;
const cardsList = document.querySelector('.cards__list');

const initialCards = [
	{
		name: 'Петергоф',
		link: '../images/peterhof.jpg',
	},
	{
		name: 'Невский Проспект',
		link: '../images/nevskijprospekt.jpg',
	},
	{
		name: 'Камчатка',
		link: '../images/kamchatka.jpg',
	},
	{
		name: 'Байкал, Иркутск',
		link: '../images/baikal.jpg',
	},
	{
		name: 'Алтай',
		link: '../images/altai.jpg',
	},
	{
		name: 'Карелия',
		link: '../images/kareliya.jpg',
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
const popupEditProfile = document.querySelector('.popup');
const popupFormEditProfile = popupEditProfile.querySelector('form');
const inputName = popupFormEditProfile.querySelector('.popup__input_value_name');
const inputJob = popupFormEditProfile.querySelector('.popup__input_value_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup-add-card');
const popupFormAddCard = popupAddCard.querySelector('form');
const inputPlace = popupFormAddCard.querySelector('.popup__input_value_place');
const inputLink = popupFormAddCard.querySelector('.popup__input_value_link');

const buttonsLike = document.querySelectorAll('.card__like');
const buttonsClosePopup = document.querySelectorAll('.popup__close');

//Поставить лайк карточке
function putLike(buttonLike) {
	buttonLike.addEventListener('click', () => buttonLike.classList.toggle('card__like_active'));
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
	const buttonLike = cardElement.querySelector('.card__like');
	putLike(buttonLike);
}


buttonEditProfile.addEventListener('click', openPopupEditProfile);
buttonAddCard.addEventListener('click', openPopupAddCard);
buttonsClosePopup.forEach(function(buttonClosePopup) {
	buttonClosePopup.addEventListener('click', closePopup);
});
popupFormEditProfile.addEventListener('submit', sendFormEditProfile);
popupFormAddCard.addEventListener('submit', sendFormAddCard);
buttonsLike.forEach(putLike);