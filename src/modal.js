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
const input = document.querySelectorAll("input");

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

formData.forEach((formData) =>
  formData.addEventListener("change", (event) => {
    if (event.target.validity.tooShort) {
      const label = formData.children[0].textContent.toLowerCase();
      formData.setAttribute(
        "data-error",
        "Veuillez entrer 2 caractères ou plus pour le champ " + label
      );
      formData.setAttribute("data-error-visible", true);
    } else if (!event.target.validity.valid) {
      const label = formData.children[0].textContent.toLowerCase();
      formData.setAttribute(
        "data-error",
        "Le champ " + label + " n'est pas correct"
      );
    } else {
      formData.removeAttribute("data-error");
      formData.setAttribute("data-error-visible", false);
    }
  })
);
