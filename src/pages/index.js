import "./index.css";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import { settings, editButton, editForm, addImgButton, addImgForm, nameInput, jobInput, profileName, profileJob, popupEditProfile, popupAddImage, popupLargeImage, cardTemplate, imageGrid, popupChangeAvatar, profileImage, avatarForm, profileImageOverlay, popupDeleteImage } from "../utils/constants.js"

const profileValidator = new FormValidator(settings, editForm);
const imageValidator = new FormValidator(settings, addImgForm);
const profileImageValidator = new FormValidator(settings, avatarForm);

// Apply enableValidation method on forms
profileValidator.enableValidation();
imageValidator.enableValidation();
profileImageValidator.enableValidation();


const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "75ee1925-b4bb-487f-88d2-d6f873f1ed28",
    "Content-Type": "application/json"
  }
});

// Create new userInfo object for user data
const userInfo = new UserInfo ({
  nameSelector: profileName,
  jobSelector: profileJob,
  avatar: profileImage
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(res => {
    const [userValues, initialCards] = res;
    console.log(userValues);
    console.log(initialCards);

    // Get userInfo from server and display on page
    userInfo.setUserInfo({ username: userValues.name, userjob: userValues.about });
    userInfo.changeAvatar({ link: userValues.avatar })
    userInfo.userId = userValues._id;
    
    // Get cards array from server and render/display on page
    const cardList = new Section({
      items: initialCards,
      renderer: (data) => { 
        //if(data.owner._id === "e2bd721daeb784ecbaa3545f"){  
          const cardElement = createCard(data);      
          cardList.addItem(cardElement);
        //}
      }
    }, imageGrid);
    cardList.renderItems();
    
    // Popup form to create new card and save data on server
    const addImagePopup = new PopupWithForm({
      popupSelector: popupAddImage,
      handleFormSubmit: (data) => {
        api.addCard(data)
        .then(cardData => {
          console.log(cardData);
          const cardElement = createCard(cardData);
          cardList.addNewItem(cardElement);
          addImagePopup.close();
        })
        .catch((err) => {
          console.log(err); // Log error to console
        })
        .finally(() => {
          addImagePopup.renderLoading(false);
        })    
      }
    });  
    addImagePopup.setEventListeners();
    
    // Open popup with form; input fields and validation messages are being reset
    addImgButton.addEventListener("click", () => { 
      addImagePopup.open();
      imageValidator.resetValidation();
    })
  })
  .catch((err) => {
    console.log(err);
  });

// Create new card
function createCard(data) {
  const card = new Card({
    data, // Open large image popup when clicking on card
    handleCardClick: ({ name,link }) => {
        imagePopup.open({ name, link });
      }, // Open delete popup when clicking on trash icon, set submit handler to remove card
      handleDeleteClick: (data) => {
        deleteImagePopup.open();
        deleteImagePopup.setSubmitAction(() => {
          api.removeCard(data._id)
          .then(() => {
            card.deleteImage();
            deleteImagePopup.close();
          })
          .catch((err) => {
            console.log(err);
          })
        })
      }, // Add like to array
      handleAddLike: (data) => {
        api.addLike(data._id)
        .then(res => {
          card.updateLikes(res.likes);
        })
        .catch((err) => {
          console.log(err);
      })
      }, // Remove like from array
      handleRemoveLike: (data) => {
        api.removeLike(data._id)
        .then(res => {
          card.updateLikes(res.likes);
        })
        .catch((err) => {
          console.log(err);
      })
      }, // pass userId
      userId: userInfo.userId,
    },
    cardTemplate);
  return card.generateCard();
}

// Form to edit profile details and save data on server
const editFormPopup = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleFormSubmit: (data) => {
    api.setUserInfo({ name: data.username, about: data.userjob })
    .then(() => {
      userInfo.setUserInfo({ username: data.username, userjob: data.userjob });
      editFormPopup.close();
    })
    .catch((err) => {
      console.log(err); // Log error to console
    })
    .finally(() => {
      editFormPopup.renderLoading(false);
    })
  }
});
editFormPopup.setEventListeners();

// Open edit profile form, display corresponding data in input fields
// Reset form input fields and validation messages on opening
editButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userJob;
  editFormPopup.open();
  profileValidator.resetValidation(); 
})

// Popup to confirm if image has to be deleted
const deleteImagePopup = new PopupWithSubmit({
  popupSelector: popupDeleteImage
});
deleteImagePopup.setEventListeners();

//Image popup
const imagePopup = new PopupWithImage(popupLargeImage);
imagePopup.setEventListeners();

// Form to change profile image and save data on server
const profileImagePopup = new PopupWithForm({
  popupSelector: popupChangeAvatar,
  handleFormSubmit: (data) => {
    api.setUserAvatar({ avatar: data.link })
       .then(() => {
         userInfo.changeAvatar(data);
         profileImagePopup.close();  
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profileImagePopup.renderLoading(false);
      }) 
    }
  })
profileImagePopup.setEventListeners();

profileImageOverlay.addEventListener("click", () => {
  profileImagePopup.open();
  profileImageValidator.resetValidation();
});

//if(data.owner._id === "e2bd721daeb784ecbaa3545f"){}