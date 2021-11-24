'use strict'

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

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const buttonClosePopup = popup.querySelector('.popup__close');
const popupForm = popup.querySelector('form');
const inputName = popupForm.querySelector('.popup__input_value_name');
const inputJob = popupForm.querySelector('.popup__input_value_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const buttonsLike = document.querySelectorAll('.card__like');
const cardTemplate = document.querySelector('#card').content;
const cardsList = document.querySelector('.cards__list');


//Добавление начальных карточек
function firstCards(card) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	cardElement.querySelector('.card__image').src = card.link;
	cardElement.querySelector('.card__image').alt = card.name;
	cardElement.querySelector('.card__heading').textContent = card.name; 
	cardsList.append(cardElement);
}

//Поставить лайк карточке
function putLike(buttonLike) {
	buttonLike.addEventListener('click', () => buttonLike.classList.toggle('card__like_active'));
}

//Открыть popup
function openPopup() {
	inputName.value = profileName.textContent;
	inputJob.value = profileJob.textContent;
	popup.classList.toggle('popup_active');
}

//Закрыть popup
function closePopup() {
	popup.classList.remove('popup_active');
}

//Отправить форму
function sendForm(evt) {
	evt.preventDefault();
	let newName = inputName.value;
	let newJob = inputJob.value;
	profileName.textContent = `${newName}`;
	profileJob.textContent = `${newJob}`;
	closePopup();
}

initialCards.forEach(firstCards);
buttonEditProfile.addEventListener('click', openPopup);
buttonClosePopup.addEventListener('click', closePopup);
popupForm.addEventListener('submit', sendForm);
buttonsLike.forEach(putLike);










