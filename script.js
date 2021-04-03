let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close-icon");
let saveButton = document.querySelector(".popup__save-button");
let formElement = document.querySelector(".popup__form-items");
let nameInput = document.querySelector(".popup__form-input_type_name");
let jobInput = document.querySelector(".popup__form-input_type_about");
let profileName = document.querySelector(".profile__name");
let profileTitle = document.querySelector(".profile__about");

/* Opens modal popup with form when clicked. */
function editProfile() {
  /* Input fields are filled in with values on page */
  nameInput.value = profileName.textContent;
  jobInput.value = profileTitle.textContent;

  popup.classList.add("popup_opened");
}

/* Close popup window */
function closePopup() {
  popup.classList.remove("popup_opened");
}

/* Submit form  */
function handleFormSubmit(evt) {
  evt.preventDefault();
  /* Corresponding values on page are changed into the values the user has entered */
  profileName.textContent = nameInput.value;
  profileTitle.textContent = jobInput.value;
}

editButton.addEventListener("click", editProfile);
closeButton.addEventListener("click", closePopup);
saveButton.addEventListener("click", handleFormSubmit);
saveButton.addEventListener("click", closePopup);
