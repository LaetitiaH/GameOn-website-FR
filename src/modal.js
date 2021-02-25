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

// Check if formData is valid after focusout

// formData.forEach((formData) =>
//   formData.addEventListener("change", (event) => {
//     if (event.target.validity.tooShort) {
//       const label = formData.children[0].textContent.toLowerCase();
//       formData.setAttribute(
//         "data-error",
//         "Veuillez entrer 2 caractères ou plus pour le champ " + label
//       );
//       formData.setAttribute("data-error-visible", true);
//     } else if (!event.target.validity.valid) {
//       const label = formData.children[0].textContent.toLowerCase();
//       formData.setAttribute(
//         "data-error",
//         "Le champ " + label + " n'est pas correct"
//       );
//     } else {
//       formData.removeAttribute("data-error");
//       formData.setAttribute("data-error-visible", false);
//     }
//   })
// );

// Check if formData is valid after submit button click

submitButton.addEventListener("click", validateForm);

function validateForm() {
  const formValues = document.forms["reserve"];

  const firstNameField = formValues[0].value;
  const emailField = formValues[2].value;
  const birthdate = formValues[3].value;
  const numberOfTournament = Number(formValues[4].value);
  const localisation1 = formValues[5].value;
  const localisation2 = formValues[6].value;
  const localisation3 = formValues[7].value;
  const localisation4 = formValues[8].value;
  const localisation5 = formValues[9].value;
  const localisation6 = formValues[10].value;

  if (firstNameField === "") {
    const label = formData[0].children[0].textContent;
    formData[0].setAttribute("data-error", "Le champ " + label + " est vide");
    formData[0].setAttribute("data-error-visible", true);
  }

  if (firstNameField.length < 2) {
    const label = formData[0].children[0].textContent;
    formData[0].setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ " + label
    );
    formData[0].setAttribute("data-error-visible", true);
  }

  if (!emailField.includes("@")) {
    const label = formData[2].children[0].textContent;
    formData[2].setAttribute("data-error", "L'email saisi n'est pas correct ");
    formData[2].setAttribute("data-error-visible", true);
  }

  if (birthdate) {
    const BirthdateTimeStamp = Date.parse(birthdate);
    if (isNaN(BirthdateTimeStamp)) {
      formData[3].setAttribute("data-error", "La date saisie est incorrecte ");
      formData[3].setAttribute("data-error-visible", true);
    }
  }

  if (
    !Number.isInteger(numberOfTournament) ||
    numberOfTournament <= 0 ||
    numberOfTournament >= 99
  ) {
    formData[4].setAttribute("data-error", "Le nombre saisi est incorrect ");
    formData[4].setAttribute("data-error-visible", true);
  }

  if (
    !localisation1.checked &&
    !localisation2.checked &&
    !localisation3.checked &&
    !localisation4.checked &&
    !localisation5.checked &&
    !localisation6.checked
  ) {
    formData[5].setAttribute("data-error", "Le nombre saisi est incorrect ");
    formData[5].setAttribute("data-error-visible", true);
  }
  debugger;
}
