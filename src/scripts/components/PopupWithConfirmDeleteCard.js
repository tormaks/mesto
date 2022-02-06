import Popup from "./Popup.js";
import api from '../../pages/index';

export default class PopupWithConfirmDeleteCard extends Popup {
	constructor(popupSelector, card, cardId) {
		super(popupSelector);
		this._deleteCard = this._deleteCard.bind(this);
	}

	setRemovedCardData(card, cardId) {
		this._card = card;
		this._cardId = cardId;
	}

	_deleteCard() {
		api.deleteCard(this._cardId)
			.then(() => {
				this._card.remove();
				this.close();
			}).catch(error => console.log(error));
	}

	open() {
		super.open();
		document.querySelector('.popup__btn_type_confirm-delete-card').addEventListener('click', this._deleteCard);
	}

	close() {
		super.close()
		document.querySelector('.popup__btn_type_confirm-delete-card').removeEventListener('click', this._deleteCard);
	}
}