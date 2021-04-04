let form = document.querySelector(".popup__form-items");
let heart = document.querySelectorAll(".card__heart-icon");
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

  closePopup();
}

/* Add eventlistener to all hearts, making them all clickable
so we can toggle between inactive and active status */
for (let i = 0; i < heart.length; i++) {
  heart[i].addEventListener("click", function () {
    heart[i].classList.toggle("card__heart-icon_active");
  });
}

editButton.addEventListener("click", editProfile);
closeButton.addEventListener("click", closePopup);
form.addEventListener("submit", handleFormSubmit);
