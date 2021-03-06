import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popupElement.querySelector(".popup__image");
    }

    open({ name, link }) {
        
        this._image.src = link;
        this._image.alt = name;
        this._popupElement.querySelector(".popup__caption").textContent = name;
        super.open();
    }
}