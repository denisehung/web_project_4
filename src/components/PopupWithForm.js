import Popup from "./Popup.js";
import { imageValidator } from "../index.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = this._popupElement.querySelectorAll(".popup__input");
        this._formValues = {};
        
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        
        return this._formValues;
    }

    open() {
        super.open();
        imageValidator.toggleButtonState();
    }

    close() {
        super.close();
        this._popupElement.querySelector(".popup__form-main").reset();
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._popupElement.querySelector(".popup__form-main").addEventListener("submit", (evt) => {
            evt.preventDefault();

            this._handleFormSubmit(this._getInputValues());

            this.close();
        })       
    }   
}