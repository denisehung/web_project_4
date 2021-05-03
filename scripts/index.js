const cardContainer = document.querySelector(".image-grid");

const editButton = document.querySelector(".profile__edit-button");
const editForm = document.querySelector(".popup__form-main_type_edit");
const editPopup = document.querySelector(".popup_type_edit");
const editCloseButton = document.querySelector(".popup__close-button_type_edit");

const addImgButton = document.querySelector(".profile__add-button");
const addImgForm = document.querySelector(".popup__form-main_img");
const addImgPopup = document.querySelector(".popup_type_add-img");
const addImgSubmitButton = document.querySelector(".popup__submit-button_type_add-img");
const addImgCloseButton = document.querySelector(".popup__close-button_type_add-img");
const cardName = document.querySelector(".popup__input_type_title");
const cardLink = document.querySelector(".popup__input_type_img");

const imagePopup = document.querySelector(".popup_type_image");
const closeImagePopup = document.querySelector(".popup__close-button_type_image");
const largeImage = document.querySelector(".popup__image");
const imageCaption = document.querySelector(".popup__caption");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_about");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__about");

const popups = document.querySelectorAll(".popup");
const popupSubmitButton = document.querySelector(".popup__submit-button");

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


// Like buttons
function likeImage(cardElement) {
  const likeButton = cardElement.querySelector(".card__heart-icon")
  // Toggle between active and inactive state when being clicked
  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__heart-icon_active");
  });
}

// Delete image
function deleteImage(cardElement) {
  const deleteButton = cardElement.querySelector(".card__delete");

  deleteButton.addEventListener("click", function (evt) {
    evt.target.closest(".card").remove();
  });
}

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

// Open popup to display larger image
function openImage(cardElement, name, link) {
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.addEventListener("click", function () {
    largeImage.src = link;
    largeImage.alt = name;
    imageCaption.textContent = name;
    openPopup(imagePopup);
  });
}

// Create new card
function createCard(name, link) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = cardTitle.textContent;

  // Add these functionalities to created cards
  likeImage(cardElement);
  deleteImage(cardElement);
  openImage(cardElement, name, link);

  return cardElement;
}

// Load inital cards by looping through array
initialCards.forEach(function (item) {
  const name = item.name;
  const link = item.link;

  // Create new card, get values from array and append it to the container
  const card = createCard(name, link);
  cardContainer.append(card);
});

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
  const card = createCard(cardName.value, cardLink.value);
  cardContainer.prepend(card);
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

// ******************* EVENT LISTENERS and FUNCTION CALLS *********************** //

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