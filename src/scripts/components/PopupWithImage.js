import Popup from "./Popup.js";
import { popupImage, popupPictureDescription} from "../pages/index.js";

export default class PopupWithImage extends Popup {
   constructor(popupSelector, name, link) {
      super(popupSelector);
      this._name = name;
      this._link = link;
   }

   open() {
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupPictureDescription.textContent = this._name;
      this._popupSelector.classList.add('popup_active');

      super.setEventListeners();
   }
}