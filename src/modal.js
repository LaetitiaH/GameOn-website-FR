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
