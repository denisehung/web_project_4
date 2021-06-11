// Edit profile variables
export const editButton = document.querySelector(".profile__edit-button");
export const editForm = document.querySelector(".popup__form-main_type_edit");
export const popupEditProfile = ".popup_type_edit";

// Add image and card variables
export const addImgButton = document.querySelector(".profile__add-button");
export const addImgForm = document.querySelector(".popup__form-main_img");
export const cardContainer = document.querySelector(".image-grid");
export const popupAddImage = ".popup_type_add-img";

// Profile detail variables
export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_about");
export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__about");

// Array with properties for initial cards
export const initialCards = [{
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg" 
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  }
];

export const settings = {
  formSelector: ".popup__form-main",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}

