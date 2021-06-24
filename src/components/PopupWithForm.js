import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector(".popup__form-main");
        this._buttonText = this._popupElement.querySelector(".popup__submit-button").textContent;
    }

    _getInputValues() {
        this._inputList = this._popupElement.querySelectorAll(".popup__input");
        this._formValues = {};
        
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        
        return this._formValues;
    }

    close() {
        super.close();
        this._popupElement.querySelector(".popup__form-main").reset();
    }

    _renderLoading(isLoading) {
        if(isLoading) {
          this._popupElement.querySelector(".popup__submit-button").textContent = "Saving...";
        } else {
          this._popupElement.querySelector(".popup__submit-button").textContent = this._buttonText;
        }
      }

    setEventListeners() {
        super.setEventListeners();
        
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._renderLoading(true);       
            this._handleFormSubmit(this._getInputValues());

            this.close();
        })       
    }   
}