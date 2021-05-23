import Card from "./Card.js";
import {settings, FormValidator} from "./FormValidator.js";

// Edit profile variables
const editButton = document.querySelector(".profile__edit-button");
const editForm = document.querySelector(".popup__form-main_type_edit");
const editPopup = document.querySelector(".popup_type_edit");

// Add image variables
const addImgButton = document.querySelector(".profile__add-button");
const addImgForm = document.querySelector(".popup__form-main_img");
const addImgPopup = document.querySelector(".popup_type_add-img");
const addImgSubmitButton = document.querySelector(".popup__submit-button_type_add-img");
const cardName = document.querySelector(".popup__input_type_title");
const cardLink = document.querySelector(".popup__input_type_img");
const cardContainer = document.querySelector(".image-grid");

// Profile detail variables
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_about");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__about");

// Popup variables
const popups = document.querySelectorAll(".popup");
const popupSubmitButton = document.querySelector(".popup__submit-button");

// Create form instance for edit profile and add image form
const profileValidator = new FormValidator(settings, editForm);
const imageValidator = new FormValidator(settings, addImgForm);

// Apply enableValidation method on forms
profileValidator.enableValidation();
imageValidator.enableValidation();

// Array with properties for initial cards
const initialCards = [{
  name: "Yosemite Valley",
  link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
},
{
  name: "Lake Louise",
  link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
},
{
  name: "Bald Mountains",
  link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
},
{
  name: "Latemar",
  link: "https://code.s3.yandex.net/web-code/latemar.jpg"
},
{
  name: "Vanoise National Park",
  link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
},
{
  name: "Lago di Braies",
  link: "https://code.s3.yandex.net/web-code/lago.jpg"
}
];

// Load initial cards
initialCards.forEach((item) => {
  // Create a card instance, return it and append to container
  const card = new Card(item, ".card-template");
  const cardElement = card.generateCard();
  cardContainer.append(cardElement);
});

// Open popup element
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEscape);
}

// Close popup element
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape);
}

// Open modal popup with edit form when clicked
function editProfile() {
  // Submit button is initially enabled
  popupSubmitButton.classList.remove("popup__submit-button_inactive");
  popupSubmitButton.disabled = false;
  // Input fields contain corresponding values on page
  nameInput.value = profileName.textContent;
  jobInput.value = profileTitle.textContent;
  openPopup(editPopup);
}

// Submit form to change profile details
function handleFormSubmit(evt) {
  evt.preventDefault();

  // Corresponding values on page are changed into the submitted values
  profileName.textContent = nameInput.value;
  profileTitle.textContent = jobInput.value;

  closePopup(editPopup);
}

function resetImageForm() {
  addImgForm.reset();
}

// Submit form to create new card
function handleFormSubmitImg(evt) {
  evt.preventDefault();

  // Create new card, get values from input field and prepend it to the container
  const card = new Card({
    name: cardName.value,
    link: cardLink.value
  }, "#card-template");

  const cardElement = card.generateCard();
  cardContainer.prepend(cardElement);

  resetImageForm();
  closePopup(addImgPopup);
}

function addImage() {
  // Submit button is initially disabled until user enters valid inputs
  addImgSubmitButton.classList.add("popup__submit-button_inactive");
  addImgSubmitButton.disabled = true;
  resetImageForm();
  openPopup(addImgPopup);
}

// Close popup by pressing Escape button
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

// ******************* EVENT LISTENERS *********************** //

editForm.addEventListener("submit", handleFormSubmit);
addImgForm.addEventListener("submit", handleFormSubmitImg);

// Open popup to edit profile
editButton.addEventListener("click", editProfile);

// Open popup to add new image
addImgButton.addEventListener("click", addImage);

// Close popup by clicking on overlay or close button
popups.forEach(function (popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
});

export default openPopup;