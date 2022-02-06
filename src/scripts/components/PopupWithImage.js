import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
   constructor(popupSelector) {
      super(popupSelector);
      this._popupImage = this._popup.querySelector('.popup__image');
      this._popupPictureDescription = this._popup.querySelector('.popup__image-description');
   }

   open(name, link) {
      this._popupImage.src = link;
      this._popupPictureDescription.alt = name;
      this._popupPictureDescription.textContent = name;
      super.open();
   }
}