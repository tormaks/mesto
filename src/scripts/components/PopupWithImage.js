import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
   constructor(popupSelector, name, link, popupImage, popupPictureDescription) {
      super(popupSelector);
      this._name = name;
      this._link = link;
      this._popupImage = popupImage;
      this._popupPictureDescription = popupPictureDescription;
   }

   open() {
      this._popupImage.src = this._link;
      this._popupPictureDescription.alt = this._name;
      this._popupPictureDescription.textContent = this._name;
      super.open();
   }
}