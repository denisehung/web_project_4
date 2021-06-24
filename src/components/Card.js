export default class Card {
    constructor({ data, handleCardClick, handleDeleteClick, handleAddLike, handleRemoveLike, userId }, template) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._ownerId = data.owner._id;
        this._userId = userId;
        this._likes = data.likes; 
        this._template = template;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleAddLike = handleAddLike;
        this._handleRemoveLike = handleRemoveLike;
        this._element = this._getTemplate();
        this._image = this._element.querySelector(".card__image");
        this._likesCounter = this._element.querySelector(".card__likes-counter");
        this._likeButton = this._element.querySelector(".card__heart-icon");
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

    // Check if card is liked by user, if yes then make like button active
    _isImageLiked(){
        if(this._likes.some(like => like._id === this._userId)){
            this._likeButton.classList.add("card__heart-icon_active");
        } else {
            this._likeButton.classList.remove("card__heart-icon_active");
        }
    }

    // Display likes counter, but only if there are more than 0 likes
    _likeCount() {
        if(this._likes.length > 0){
            this._likesCounter.textContent = this._likes.length;
        }
    }

    // Remove delete button if card is not created by user
    showDeleteButton() {
        if(this._ownerId !== this._userId) {
            this._element.querySelector(".card__delete").remove();
          }
    }

    // Activate like and update likes counter
    _activeLike() {
        this._likeButton.classList.add("card__heart-icon_active");
        this._likesCounter.textContent = this._likes.length;
    }

    // Inactivate like and update likes counter
    // If there is less than 1 like, don't display counter
    _inactiveLike() {
        this._likeButton.classList.remove("card__heart-icon_active");
        this._likesCounter.textContent = this._likes.length;
        if(this._likes.length < 1) {
            this._likesCounter.textContent = "";
        }
    }    

    // Delete image
    deleteImage() {
        const deleteButton = this._element.querySelector(".card__delete");
        deleteButton.closest(".card").remove();
    }

    generateCard() {
        this._setEventListeners();

        // Add data
        this._element.querySelector(".card__title").textContent = this._name;
        this._image.src = this._link;
        this._image.alt = this._name;
        this.showDeleteButton();
        this._likeCount();
        this._isImageLiked();

        return this._element;
    }

    _setEventListeners() {
        // If likes array contains like from user, remove like with handler
        this._likeButton.addEventListener('click', () => {
            if(this._likes.some(like => like._id === this._userId)){
                this._handleRemoveLike(this);
            }
            else { // Otherwise add like with handler
                this._handleAddLike(this);                
            }
        });

        this._element.querySelector(".card__delete")
            .addEventListener('click', () => this._handleDeleteClick(this));

        this._image
            .addEventListener('click', () => this._handleCardClick({ name: this._name, link: this._link }));
    }

}