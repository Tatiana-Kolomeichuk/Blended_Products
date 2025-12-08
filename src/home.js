//Логіка сторінки Home
import { handleCategoryClick, initHomePage, onProductClick,handleSearchForm} from './js/handlers';
import { closeModal, openModal } from './js/modal';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', initHomePage);
refs.closeModalBtn.addEventListener('click', closeModal);
refs.categoriesList.addEventListener('click', handleCategoryClick);
refs.productsList.addEventListener('click', onProductClick);
refs.searchForm.addEventListener('submit', handleSearchForm);