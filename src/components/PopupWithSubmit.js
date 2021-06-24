import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupElement = document.querySelector(popupSelector);
        this._confirmDeleteButton = this._popupElement.querySelector(".popup__submit-button_type_delete");
        this._buttonText = this._popupElement.querySelector(".popup__submit-button").textContent;
    }
    
    // Pass callback function when submitting data to server
    setSubmitAction (action) {
        this._handleFormSubmit = action;
      }
    
    // Change button text to 'Saving...' while uploading data (renderLoading is true)
    renderLoading(isLoading) {
        if(isLoading) {
          this._popupElement.querySelector(".popup__submit-button").textContent = "Saving...";
        } else {
          this._popupElement.querySelector(".popup__submit-button").textContent = this._buttonText;
        }
      }

    setEventListeners() {
        super.setEventListeners();
        
        this._confirmDeleteButton.addEventListener("click", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
            this.renderLoading(true);
            this.close();
        })       
    }   
}