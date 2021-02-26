// NAVBAR

// Open and close nav-responsive
function editNav() {
  let topNav = document.getElementById("myTopnav");
  topNav.className === "topnav" ? topNav.classList.add("responsive") : false;
}

// Detect if click outside nav-bar if nav-bar responsive is open
document.addEventListener("click", (evt) => {
  const navResponsive = document.getElementById("main-navbar");
  const targetElement = evt.target; // clicked element
  const burgerMenu = document.getElementsByClassName("fa fa-bars")[0];
  if (
    targetElement !== navResponsive &&
    targetElement !== burgerMenu &&
    targetElement.offsetParent !== navResponsive
  ) {
    document.getElementById("myTopnav").className = "topnav";
  }
});

// DOM Elements
const page = document.getElementsByTagName("html")[0];
const modalBackground = document.querySelector(".bground");
const modalButton = document.querySelectorAll(".btn-signup");
const closeButton = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");
const submitButton = document.querySelector(".btn-submit");

// launch modal event
modalButton.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeButton.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  window.scrollTo(0, 0);
  modalBackground.style.display = "block";
  page.style.overflow = "hidden";
}

// close modal form
function closeModal() {
  modalBackground.style.display = "none";
  page.style.overflow = "auto";
}

// Check if formData is valid after submit button click
function validateForm() {
  const formValues = document.forms["reserve"];
  let isInvalidForm = false;

  const firstNamelabel = formData[0].children[0].textContent.toLowerCase();
  const firstNameField = formValues[0].value;
  const firstNameFormData = formData[0];
  validateField(firstNameField, firstNameFormData, firstNamelabel, [
    "fieldLength",
    "minLength",
  ]);

  const lastNameLabel = formData[1].children[0].textContent.toLowerCase();
  const lastNameField = formValues[1].value;
  const lastNameFormData = formData[1];
  validateField(lastNameField, lastNameFormData, lastNameLabel, [
    "fieldLength",
    "minLength",
  ]);

  const emailLabel = formData[2].children[0].textContent.toLowerCase();
  const emailField = formValues[2].value;
  const emailFormData = formData[2];
  validateField(emailField, emailFormData, emailLabel, [
    "fieldLength",
    "emailValid",
  ]);

  const birthdateLabel = formData[3].children[0].textContent.toLowerCase();
  let birthdateField = formValues[3].value;
  const birthdateFormData = formData[3];
  validateField(birthdateField, birthdateFormData, birthdateLabel, [
    "fieldLength",
    "dateValid",
  ]);

  const numberOfTournamentLabel = "nombre de tournois";
  let numberOfTournamentField = formValues[4].value;
  const numberOfTournamentFormData = formData[4];
  validateField(
    numberOfTournamentField,
    numberOfTournamentFormData,
    numberOfTournamentLabel,
    ["fieldLength", "numberValid"]
  );

  const localisationLabel = "ville";
  const localisationField = [
    formValues[5].checked,
    formValues[6].checked,
    formValues[7].checked,
    formValues[8].checked,
    formValues[9].checked,
    formValues[10].checked,
  ];
  const localisationFormData = formData[5];
  validateField(localisationField, localisationFormData, localisationLabel, [
    "radioButtonSelected",
  ]);

  const agreeLabel = "Les conditions d'utilisations doivent être acceptée";
  let agreeField = formValues[11].checked;
  const agreeFormData = formData[6];
  validateField(agreeField, agreeFormData, agreeLabel, ["checkboxSelected"]);

  function validateField(nameField, nameFormData, nameLabel, typeOfControl) {
    if (
      typeOfControl.find((typeOfControl) => typeOfControl === "fieldLength")
    ) {
      if (nameField.length === 0) {
        nameFormData.setAttribute(
          "data-error",
          "Veuillez saisir le champ " + nameLabel
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
      if (
        !Number.isInteger(+nameField) ||
        +nameField <= 0 ||
        +nameField >= 99
      ) {
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
