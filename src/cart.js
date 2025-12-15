
import {
  handleBtnClose,
  handleBtnSearch,
  handleBuyBtnClick,
  handleCartItemsLoad,
  handleItemClick,

} from "./js/handlers";
import { toggleTheme } from "./js/helpers";

import { closeModal } from "./js/modal";
import { refs } from "./js/refs";





// // ВІДКРИВАЄМО МОДАЛКУ У КОШИКУ
refs.productsList.addEventListener("click", handleItemClick);

// // ----------------- ПОКУПКА ВСІХ ТОВАРІВ -----------------

refs.buyBtnCart.addEventListener("click", handleBuyBtnClick);

// // ------------------Закриття модалки-----------------------//
refs. modalCloseBtn.addEventListener('click', closeModal);

// // Клік по кнопці Buy у модалці (купити один товар)
 refs.modal.addEventListener("click", handleItemClick);

// // ----------------- ПОШУК З КОШИКА -----------------

refs.searchForm.addEventListener("submit", handleBtnSearch);
//ЗАВАНТАЖЕННЯ СТОРІНКИ
document.addEventListener('DOMContentLoaded', handleCartItemsLoad)

// ВІДКРИВАЄМО МОДАЛКУ У КОШИКУ
refs.cartProductList.addEventListener('click', handleItemClick);
 //ПЕРЕМИКАННЯ ТЕМИ
refs.themeToggleBtn.addEventListener('click', toggleTheme);



// Кнопка ADD TO CART / REMOVE FROM CART в модалці
refs.addToCartModalBtn.addEventListener("click", handleModalBtnAdd);

// Кнопка ADD TO WISHLIST / REMOVE FROM WISHLIST в модалці
refs.addTowishlistBtn.addEventListener("click", handleWishlistAdd);
