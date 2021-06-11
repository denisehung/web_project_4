import "./styles/index.css";
import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import { settings, editButton, editForm, addImgButton, addImgForm, nameInput, jobInput, initialCards, profileName, profileJob, popupEditProfile, popupAddImage } from "./utils/constants.js"


const profileValidator = new FormValidator(settings, editForm);
const imageValidator = new FormValidator(settings, addImgForm);

// Apply enableValidation method on forms
profileValidator.enableValidation();
imageValidator.enableValidation();

// User data
const userInfo = new UserInfo ({
  nameSelector: profileName,
  jobSelector: profileJob
});

function createCard(data) {
  const card = new Card({
    data,
    handleCardClick: ({ name,link }) => {
        imagePopup.open({ name, link });
      }
    },
    "#card-template");
  return card.generateCard();
}

// Edit Form popup
const editFormPopup = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  }
});

editFormPopup.setEventListeners();
editButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.title;
  jobInput.value = userData.job;
  editFormPopup.open();
  profileValidator.toggleButtonState(); 
})


//Image popup
const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();


// Add card popup
const addImagePopup = new PopupWithForm({
  popupSelector: popupAddImage,
  handleFormSubmit: (data) => {
      const cardElement = createCard(data);
      cardList.addItem(cardElement);
  }
});

addImagePopup.setEventListeners();
addImgButton.addEventListener("click", () => { 
  addImagePopup.open();
  imageValidator.toggleButtonState(); 
 });


// Load initial cards
const cardList = new Section({
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      cardList.addItem(cardElement);
    }
  },
  ".image-grid");

cardList.renderItems();

export { imageValidator };