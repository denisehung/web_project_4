import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open({name, link}) {
        
        this._popupElement.querySelector(".popup__image").src = link;
        this._popupElement.querySelector(".popup__image").alt = name;
        this._popupElement.querySelector(".popup__caption").textContent = name;
        super.open();
    }
}