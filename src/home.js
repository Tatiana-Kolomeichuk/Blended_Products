//Логіка сторінки Home
import { handleCategoryClick, initHomePage, onProductClick,handleSearchForm} from './js/handlers';
import { initTheme, toggleTheme } from './js/helpers';
import { closeModal, openModal } from './js/modal';
import { refs } from './js/refs';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();       
  initHomePage();    
});
refs. modalCloseBtn.addEventListener('click', closeModal);
refs.categoriesList.addEventListener('click', handleCategoryClick);
refs.productsList.addEventListener('click', onProductClick);
refs.searchForm.addEventListener('submit', handleSearchForm);
refs.themeToggleBtn.addEventListener('click',toggleTheme );
