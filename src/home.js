//Логіка сторінки Home
import { handleCategoryClick, initHomePage } from './js/handlers';
import { closeModal, openModal } from './js/modal';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', initHomePage);
refs.closeModalBtn.addEventListener('click', closeModal);
refs.categoriesList.addEventListener('click', handleCategoryClick);
