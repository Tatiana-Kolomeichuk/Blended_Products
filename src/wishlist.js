//Логіка сторінки Wishlist

import {  handleModalBtnAdd, handleSearchForm, handleWishlistAdd, handleWishlistLoad, onProductClick } from "./js/handlers";
import { initTheme, toggleTheme } from "./js/helpers";
import { closeModal } from "./js/modal";
import { refs } from "./js/refs";



document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  handleWishlistLoad();
});

refs.modalCloseBtn.addEventListener('click', closeModal);
refs.productsList.addEventListener('click', onProductClick);
refs.searchForm.addEventListener('submit', handleSearchForm);
refs.themeToggleBtn.addEventListener('click', toggleTheme);

// Кнопка ADD TO CART / REMOVE FROM CART в модалці
refs.addToCartModalBtn.addEventListener('click', handleModalBtnAdd);

// Кнопка ADD TO WISHLIST / REMOVE FROM WISHLIST в модалці
refs.addTowishlistBtn.addEventListener('click', handleWishlistAdd);

// ✅ Buy у модалці (а не handleItemClick!)
refs.modal.addEventListener('click', (e) => {
  if (e.target.closest('.modal-product__buy-btn')) {
    handleBuyItemClick(e);
  }
});