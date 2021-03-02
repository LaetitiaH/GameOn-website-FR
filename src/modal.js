// DOM Elements
const page = document.getElementsByTagName("html")[0];
const topNav = document.getElementById("myTopnav");
const modalBackground = document.querySelector(".bground");
const signUpButton = document.querySelectorAll(".btn-signup");
const closeIconButton = document.querySelector(".close");
const closeButton = document.querySelector(".btn-close");
const formData = document.querySelectorAll(".formData");
const successMessage = document.querySelector(".successMessage-content");
const form = document.querySelector(".form");
const modalBody = document.querySelector(".modal-body");

// Listeners CLick buttons
// launch modal if click on Sign-up button
signUpButton.forEach((btn) => btn.addEventListener("click", displayForm));

// close modal if click on cross close button or close button
closeIconButton.addEventListener("click", closeModal);
closeButton.addEventListener("click", closeModal);

// Display SuccessModal if form valid and data present in params URL
checkSuccessModalDisplay();

// Detect if click outside nav-bar if nav-bar responsive is open
document.addEventListener("click", (evt) => {
  const navResponsive = document.getElementById("main-navbar");
  const targetElement = evt.target; // clicked on element
  const burgerMenu = document.getElementsByClassName("fa fa-bars")[0];
  if (
    targetElement !== navResponsive &&
    targetElement !== burgerMenu &&
    targetElement.offsetParent !== navResponsive
  ) {
    document.getElementById("myTopnav").className = "topnav";
  }
});

// FUNCTIONS
// Open and close nav-responsive
function editNav() {
  topNav.className === "topnav" ? topNav.classList.add("responsive") : false;
}

// Display success message if form valid and data present in params URL
function checkSuccessModalDisplay() {
  // Check if params in the URL
  const isFormSend = !!window.location.search.includes("agreeCheck=agree");
  if (isFormSend) {
    displaySuccessMessage();
  }
}

// Launch modal form
function displayForm() {
  form.style.display = "block";
  successMessage.style.display = "none";
  modalBody.classList.remove("successMessage");
  launchModal();
}

// Launch modal success
function displaySuccessMessage() {
  form.style.display = "none";
  successMessage.style.display = "flex";
  modalBody.classList.add("successMessage");
  launchModal();
}

// Launch modal
function launchModal() {
  window.scrollTo(0, 0);
  modalBackground.style.display = "block";
  page.style.overflow = "hidden";
}

// close modal
function closeModal() {
  modalBackground.style.display = "none";
  page.style.overflow = "auto";

  // check if url with params and change url
  if (window.location.search) {
    replaceUrl();
  }
}

function replaceUrl() {
  const url = window.location.href.split("?", 1)[0];
  window.location.replace(url);
}

// Check if formData is valid after click on submit button
function validateForm() {
  const formValues = document.forms["reserve"];
  let isInvalidForm = false;

  const firstNameField = formValues[0].value;
  const firstNameFormData = formData[0];
  const firstNamelabel = formData[0].children[0].textContent.toLowerCase();

  const lastNameField = formValues[1].value;
  const lastNameFormData = formData[1];
  const lastNameLabel = formData[1].children[0].textContent.toLowerCase();

  const emailField = formValues[2].value;
  const emailFormData = formData[2];
  const emailLabel = formData[2].children[0].textContent.toLowerCase();

  const birthdateField = formValues[3].value;
  const birthdateFormData = formData[3];
  const birthdateLabel = formData[3].children[0].textContent.toLowerCase();

  const numberOfTournamentField = formValues[4].value;
  const numberOfTournamentFormData = formData[4];
  const numberOfTournamentLabel =
    "nombre de tournois auxquels vous avez participé";

  const localisationField = [
    formValues[5].checked,
    formValues[6].checked,
    formValues[7].checked,
    formValues[8].checked,
    formValues[9].checked,
    formValues[10].checked,
  ];
  const localisationFormData = formData[5];
  const localisationLabel = "ville";

  const agreeField = formValues[11].checked;
  const agreeFormData = formData[6];
  const agreeLabel = "Les conditions d'utilisations doivent être acceptée";

  const formToValidate = [
    [
      firstNameField,
      firstNameFormData,
      firstNamelabel,
      ["fieldLength", "minLength"],
    ],
    [
      lastNameField,
      lastNameFormData,
      lastNameLabel,
      ["fieldLength", "minLength"],
    ],
    [emailField, emailFormData, emailLabel, ["fieldLength", "emailValid"]],
    [
      birthdateField,
      birthdateFormData,
      birthdateLabel,
      ["fieldLength", "dateValid"],
    ],
    [
      numberOfTournamentField,
      numberOfTournamentFormData,
      numberOfTournamentLabel,
      ["fieldLength", "numberValid"],
    ],
    [
      localisationField,
      localisationFormData,
      localisationLabel,
      ["radioButtonSelected"],
    ],
    [agreeField, agreeFormData, agreeLabel, ["checkboxSelected"]],
  ];

  formToValidate.forEach(
    ([nameField, nameFormData, nameLabel, typeOfControl]) => {
      nameFormData.setAttribute("data-error-visible", false);
      nameFormData.removeAttribute("data-error");
      validateField(nameField, nameFormData, nameLabel, typeOfControl);
    }
  );

  function validateField(nameField, nameFormData, nameLabel, typeOfControl) {
    if (
      typeOfControl.find((typeOfControl) => typeOfControl === "fieldLength")
    ) {
      if (nameField.length === 0) {
        nameFormData.setAttribute(
          "data-error",
          "Veuillez saisir votre " + nameLabel
        );
        nameFormData.setAttribute("data-error-visible", true);
        isInvalidForm = true;
        return;
      }
    }

    if (typeOfControl.find((typeOfControl) => typeOfControl === "minLength")) {
      if (nameField.length < 2) {
        nameFormData.setAttribute(
          "data-error",
          "Veuillez entrer 2 caractères ou plus pour le champ du  " + nameLabel
        );
        nameFormData.setAttribute("data-error-visible", true);
        isInvalidForm = true;
      }
    }

    if (typeOfControl.find((typeOfControl) => typeOfControl === "emailValid")) {
      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          nameField
        )
      ) {
        nameFormData.setAttribute(
          "data-error",
          "Veuillez saisir un " + nameLabel + " correct"
        );
        nameFormData.setAttribute("data-error-visible", true);
        isInvalidForm = true;
      }
    }

    if (typeOfControl.find((typeOfControl) => typeOfControl === "dateValid")) {
      if (isNaN(Date.parse(nameField))) {
        nameFormData.setAttribute(
          "data-error",
          "Veuillez saisir une " + nameLabel + " correcte"
        );
        nameFormData.setAttribute("data-error-visible", true);
        isInvalidForm = true;
      }
    }

    if (
      typeOfControl.find((typeOfControl) => typeOfControl === "numberValid")
    ) {
      if (!Number.isInteger(+nameField) || +nameField < 0 || +nameField > 99) {
        nameFormData.setAttribute(
          "data-error",
          "Veuillez saisir un " + nameLabel + " correct"
        );
        nameFormData.setAttribute("data-error-visible", true);
        isInvalidForm = true;
      }
    }

    if (
      typeOfControl.find(
        (typeOfControl) => typeOfControl === "radioButtonSelected"
      )
    ) {
      if (!nameField.some((nameField) => nameField)) {
        nameFormData.setAttribute(
          "data-error",
          "Vous devez choisir une " + nameLabel
        );
        nameFormData.setAttribute("data-error-visible", true);
        isInvalidForm = true;
      }
    }

    if (
      typeOfControl.find(
        (typeOfControl) => typeOfControl === "checkboxSelected"
      )
    ) {
      if (!nameField) {
        nameFormData.setAttribute("data-error", nameLabel);
        nameFormData.setAttribute("data-error-visible", true);
        isInvalidForm = true;
      }
    }
  }

  return !isInvalidForm;
}
