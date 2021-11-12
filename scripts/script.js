'use strict'

let buttonLike = document.querySelectorAll('.card__like');
let buttonEditProfile = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let buttonClosePopup = popup.querySelector('.popup__close');
let popupForm = popup.querySelector('form');
let inputs = popupForm.querySelectorAll('input');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

//Добавить карточку в избранное
for (let i = 0; i < buttonLike.length; i++) { 
	buttonLike[i].addEventListener('click', function () {
		buttonLike[i].classList.toggle('card__like_active');
		if (buttonLike[i].classList.contains('card__like_active')) {
			buttonLike[i].innerHTML = '<img src="./images/likeblack.svg" alt="">';

		} else buttonLike[i].innerHTML = '<img src="./images/like.svg" alt="">';
	});
}

buttonEditProfile.addEventListener('click', function() {
	inputs[0].value = profileName.textContent;
	inputs[1].value = profileJob.textContent;
	popup.classList.toggle('popup_active');
	buttonClosePopup.addEventListener('click', function() {
		popup.classList.remove('popup_active');
	})
})

popupForm.addEventListener('submit', function(evt) {
	evt.preventDefault();
	let newName = inputs[0].value;
	let newJob = inputs[1].value;
	profileName.textContent = `${newName}`;
	profileJob.textContent = `${newJob}`;
	popup.classList.remove('popup_active');
})









