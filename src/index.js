import "./styles/index.css";
//import logoSrc from "./images/logo.svg";
//import profilePicSrc from "./images/profile-pic.jpg";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import { settings, FormValidator } from "./components/FormValidator.js";
import { editButton, editForm, addImgButton, addImgForm, cardContainer, nameInput, jobInput, initialCards } from "./utils/constants.js"

/*const logo = document.getElementById("logo");
logo.src = logoSrc; 

const profilePic = document.getElementById("profile-pic");
profilePic.src = profilePicSrc; */

const profileValidator = new FormValidator(settings, editForm);
const imageValidator = new FormValidator(settings, addImgForm);

// Apply enableValidation method on forms
profileValidator.enableValidation();
imageValidator.enableValidation();

// User data
const userInfo = new UserInfo ({
  nameSelector: ".profile__name",
  jobSelector: ".profile__about"
});


// Edit Form popup
const editFormPopup = new PopupWithForm({
  popupSelector: ".popup_type_edit",
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
})


//Image popup
const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();


// Add card popup
const addImagePopup = new PopupWithForm({
  popupSelector: ".popup_type_add-img",
  handleFormSubmit: (data) => {
    const card = new Card({
      data,
      handleCardClick: ({ name,link }) => {
          imagePopup.open({ name, link });
        }
      },
      "#card-template");

      const cardElement = card.generateCard();
      cardContainer.prepend(cardElement);
  }
});

addImagePopup.setEventListeners();
addImgButton.addEventListener("click", () => { addImagePopup.open() });


// Load initial cards
const cardList = new Section({
    items: initialCards,
    renderer: (data) => {
      const card = new Card({data,
          handleCardClick: ({ name, link }) => {
            imagePopup.open({ name, link });
          }
        },
        "#card-template");

      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }
  },
  ".image-grid");

cardList.renderItems();

export { imageValidator };