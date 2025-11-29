//Логіка сторінки Home
import { initHomePage } from "./js/handlers";
import { closeModal, openModal } from "./js/modal";
import { refs } from "./js/refs";

document.addEventListener("DOMContentLoaded",initHomePage)
refs.closeModalBtn.addEventListener('click', closeModal);


