import openPopup from "./index.js";

class Card {
    constructor(data, template) {
        this._name = data.name;
        this._link = data.link;
        this._template = template;
    }

    _getTemplate() {
        // taking the markup from HTML and cloning the element
        const cardElement = document
            .querySelector(this._template)
            .content
            .querySelector(".card")
            .cloneNode(true);

        // return the DOM element of the card
        return cardElement;
    }

    generateCard() {
        // Store the markup in the private field _element
        // so other elements can access it
        this._element = this._getTemplate();
        this._setEventListeners();

        // Add data
        this._element.querySelector(".card__title").textContent = this._name;
        this._element.querySelector(".card__image").src = this._link;
        this._element.querySelector(".card__image").alt = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector(".card__heart-icon")
            .addEventListener('click', () => this._likeImage());

        this._element.querySelector(".card__delete")
            .addEventListener('click', () => this._deleteImage());

        this._element.querySelector(".card__image")
            .addEventListener('click', () => this._openImage());
    }

    // Like button
    _likeImage() {
        const likeButton = this._element.querySelector(".card__heart-icon");
        // Toggle between active and inactive state when being clicked
        likeButton.classList.toggle("card__heart-icon_active");
    }

    // Delete image
    _deleteImage() {
        const deleteButton = this._element.querySelector(".card__delete");
        deleteButton.closest(".card").remove();
    }

    _openImage() {
        const largeImage = document.querySelector(".popup__image");
        const imagePopup = document.querySelector(".popup_type_image");
        const imageCaption = document.querySelector(".popup__caption");

        largeImage.src = this._link;
        largeImage.alt = this._name;
        imageCaption.textContent = this._name;
        openPopup(imagePopup);
    }
}

export default Card;