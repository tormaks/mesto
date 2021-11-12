'use strict'

let buttonLike = document.querySelectorAll('.card__like');

//Добавить карточку в избранное
for (let i = 0; i < buttonLike.length; i++) { 
	buttonLike[i].addEventListener('click', function () {
		buttonLike[i].classList.toggle('card__like_active');
		if (buttonLike[i].classList.contains('card__like_active')) {
			buttonLike[i].innerHTML = '<img src="./images/likeblack.svg" alt="">';

		} else buttonLike[i].innerHTML = '<img src="./images/like.svg" alt="">';
	});
}



