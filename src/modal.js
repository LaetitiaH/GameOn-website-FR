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
// Launch function to launch  modal if click on sign-up button
signUpButton.forEach((btn) => btn.addEventListener("click", displayForm));

// Launch function to close modal if click on cross close button or close button
closeIconButton.addEventListener("click", closeModal); // close close icon
closeButton.addEventListener("click", closeModal); // close close button

// Launch function to display SuccessModal if form valid and data present in params URL
checkSuccessModalDisplay();

// Detect if click outside nav-bar if nav-bar responsive is open
document.addEventListener("click", (evt) => {
  const navResponsive = document.getElementById("main-navbar");
  const targetElement = evt.target; // clicked on element
  const burgerMenu = document.getElementsByClassName("fa fa-bars")[0];
  // check if click is outside nav-bar
  if (
    targetElement !== navResponsive && // check if click into the main-bar
    targetElement !== burgerMenu && // check if click in the burger-menu icon
    targetElement.offsetParent !== navResponsive // check if click on an element whose parent is main-bar
  ) {
    document.getElementById("myTopnav").className = "topnav"; // close the nav-bar responsive
  }
});

// FUNCTIONS
// Open and close nav-responsive
function editNav() {
  topNav.className === "topnav" ? topNav.classList.add("responsive") : false; // if className is topnav, open responsive main-bar
}

// Launch function to display success message if form valid and data present in params URL
function checkSuccessModalDisplay() {
  // Check if params in the URL
  const isFormSend = !!window.location.search.includes("agreeCheck=agree");
  if (isFormSend) {
    displaySuccessMessage(); // if params in URL, launch function to display a success message
  }
}

//  Launch function to maunch modal form
function displayForm() {
  form.style.display = "block";
  successMessage.style.display = "none";
  modalBody.classList.remove("successMessage");
  launchModal();
}

//  Launch function to launch modal success
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

  // Check if url with params and launch function to change url
  if (window.location.search) {
    replaceUrl();
  }
}

// Delete params in url and replace URL without params
function replaceUrl() {
  const url = window.location.href.split("?", 1)[0];
  window.location.replace(url);
}

// Check if formData is valid after click on submit button
function validateForm() {
  const formValues = document.forms["reserve"];
  let isInvalidForm = false; // Initialize boolean variable to know if form is valid or not

  const firstNameField = formValues[0].value; // Firstname value filled by user
  const firstNameFormData = formData[0]; // Firstname form data
  const firstNamelabel = formData[0].children[0].textContent.toLowerCase(); // label to display in case of error

  const lastNameField = formValues[1].value; // Lastname value filled by user
  const lastNameFormData = formData[1]; // Lastname form data
  const lastNameLabel = formData[1].children[0].textContent.toLowerCase(); // label to display in case of error

  const emailField = formValues[2].value; // Email value filled by user
  const emailFormData = formData[2]; // Email form data
  const emailLabel = formData[2].children[0].textContent.toLowerCase(); // label to display in case of error

  const birthdateField = formValues[3].value; // Bithdate value filled by user
  const birthdateFormData = formData[3]; // Bithdate form data
  const birthdateLabel = formData[3].children[0].textContent.toLowerCase(); // label to display in case of error

  const numberOfTournamentField = formValues[4].value; // Number of tournament value filled by user
  const numberOfTournamentFormData = formData[4]; // Number of tournament form data
  const numberOfTournamentLabel =
    "nombre de tournois auxquels vous avez participé"; // label to display in case of error

  const localisationField = [
    formValues[5].checked,
    formValues[6].checked,
    formValues[7].checked,
    formValues[8].checked,
    formValues[9].checked,
    formValues[10].checked,
  ]; // Localisation value filled by user (boolean)
  const localisationFormData = formData[5]; // Localisation form data
  const localisationLabel = "ville"; // label to display in case of error

  const agreeField = formValues[11].checked; // Agree usage conditions value filled by user (boolean)
  const agreeFormData = formData[6]; // Agree usage conditions form data
  const agreeLabel = "Les conditions d'utilisations doivent être acceptée"; // label to display in case of error

  // initialize array with form value, form data, form label error and type of control to applied for each form value
  // Type of controls :
  //  - fieldLength : check if user filled a value (if value.length is > 0)
  //  - minLength : check if the user filled a minimum value of 2 characters (if value.length is >= 2)
  //  - emailValid : check if the user filled a correct email
  //  - dateValid : check if the user filled a valid date
  //  - numberValid : check if the user filled an integer and a number between 0 and 99
  //  - radioButtonSelected : check if the user choose one localization
  //  - checkboxSelected : check if the user accepted usage conditions

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

  // for each array in the array, execute valideField function and initialize data-error-visible to false (display error message) and remove date-error attribute (display error message)
  formToValidate.forEach(
    ([nameField, nameFormData, nameLabel, typeOfControl]) => {
      nameFormData.setAttribute("data-error-visible", false);
      nameFormData.removeAttribute("data-error");
      validateField(nameField, nameFormData, nameLabel, typeOfControl);
    }
  );

  function validateField(nameField, nameFormData, nameLabel, typeOfControl) {
    // check if type of control is fieldLength
    if (
      typeOfControl.find((typeOfControl) => typeOfControl === "fieldLength")
    ) {
      if (nameField.length === 0) {
        // check if length is egal to 0
        nameFormData.setAttribute(
          "data-error",
          "Veuillez saisir votre " + nameLabel
        );
        nameFormData.setAttribute("data-error-visible", true);
        // if error, set isInvalidForm to true
        isInvalidForm = true;
        // if error, return (no need to execute rest of function)
        return;
      }
    }

    // check if type of control is minLength
    if (typeOfControl.find((typeOfControl) => typeOfControl === "minLength")) {
      // check if length is >= 1
      if (nameField.length < 2) {
        // if error, set error message to true and display message
        nameFormData.setAttribute(
          "data-error",
          "Veuillez entrer 2 caractères ou plus pour le champ du  " + nameLabel
        );
        nameFormData.setAttribute("data-error-visible", true);
        // if error, set isInvalidForm to true
        isInvalidForm = true;
      }
    }

    // check if type of control is emailValid
    if (typeOfControl.find((typeOfControl) => typeOfControl === "emailValid")) {
      // check if email doesn't match with regex :
      // - characters between a-z, A-z, 0-9,.,!, #, $, %, &, ', *, +, /, =, ?, ^, _, `, {, |, }, ~, -
      // - character @
      // - characters between a-z, A-z, 0-9, -
      // - character .
      // - characters a-z, A-z, 0-9, -
      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          nameField
        )
      ) {
        // if error, set error message to true and display message
        nameFormData.setAttribute(
          "data-error",
          "Veuillez saisir un " + nameLabel + " correct"
        );
        nameFormData.setAttribute("data-error-visible", true);
        // if error, set isInvalidForm to true
        isInvalidForm = true;
      }
    }

    // check if type of control is dateValid
    if (typeOfControl.find((typeOfControl) => typeOfControl === "dateValid")) {
      // check if date isn't a date format. If not, date.parse return NaN.
      if (isNaN(Date.parse(nameField))) {
        // if error, set error message to true and display message
        nameFormData.setAttribute(
          "data-error",
          "Veuillez saisir une " + nameLabel + " correcte"
        );
        nameFormData.setAttribute("data-error-visible", true);
        // if error, set isInvalidForm to true
        isInvalidForm = true;
      }
    }

    // check if type of control is numberValid
    if (
      typeOfControl.find((typeOfControl) => typeOfControl === "numberValid")
    ) {
      // change type of number in number and check if number isn't an integer or if number isn't between 0 and 99
      if (!Number.isInteger(+nameField) || +nameField < 0 || +nameField > 99) {
        // if error, set error message to true and display message
        nameFormData.setAttribute(
          "data-error",
          "Veuillez saisir un " + nameLabel + " correct"
        );
        nameFormData.setAttribute("data-error-visible", true);
        // if error, set isInvalidForm to true
        isInvalidForm = true;
      }
    }

    // check if type of control is radioButtonSelected
    if (
      typeOfControl.find(
        (typeOfControl) => typeOfControl === "radioButtonSelected"
      )
    ) {
      // check if there isn't at least one true in the array (= one localization chosen)
      if (!nameField.some((nameField) => nameField)) {
        // if error, set error message to true and display message
        nameFormData.setAttribute(
          "data-error",
          "Vous devez choisir une " + nameLabel
        );
        nameFormData.setAttribute("data-error-visible", true);
        // if error, set isInvalidForm to true
        isInvalidForm = true;
      }
    }

    // check if type of control is checkboxSelected
    if (
      typeOfControl.find(
        (typeOfControl) => typeOfControl === "checkboxSelected"
      )
    ) {
      // check if false boolean (= checkbox not checked)
      if (!nameField) {
        // if error, set error message to true and display message
        nameFormData.setAttribute("data-error", nameLabel);
        nameFormData.setAttribute("data-error-visible", true);
        // if error, set isInvalidForm to true
        isInvalidForm = true;
      }
    }
  }
  // return if isInvalidForm is false, else get value in the URL (in the params)
  return !isInvalidForm;
}
