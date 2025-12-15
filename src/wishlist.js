//Логіка сторінки Wishlist

import { handleCartItemsLoad, handleItemClick, handleModalBtnAdd, handleWishlistAdd } from "./js/handlers";
import { toggleTheme } from "./js/helpers";
import { closeModal } from "./js/modal";



//ЗАВАНТАЖЕННЯ СТОРІНКИ
document.addEventListener('DOMContentLoaded',handleWishlistAdd)
// ВІДКРИВАЄМО МОДАЛКУ У КОШИКУ
refs.productsList.addEventListener("click", handleItemClick);
// ------------------Закриття модалки-----------------------//
refs.modalCloseBtn.addEventListener('click', closeModal);

// // ВІДКРИВАЄМО МОДАЛКУ У КОШИКУ
refs.productsList.addEventListener("click", handleItemClick);

// // ------------------Закриття модалки-----------------------//
refs. modalCloseBtn.addEventListener('click', closeModal);

// // Клік по кнопці Buy у модалці (купити один товар)
 refs.modal.addEventListener("click", handleItemClick);

// ВІДКРИВАЄМО МОДАЛКУ У КОШИКУ
refs.cartProductList.addEventListener('click', handleItemClick);
 //ПЕРЕМИКАННЯ ТЕМИ
refs.themeToggleBtn.addEventListener('click', toggleTheme);



// Кнопка ADD TO CART / REMOVE FROM CART в модалці
refs.addToCartModalBtn.addEventListener("click", handleModalBtnAdd);

// Кнопка ADD TO WISHLIST / REMOVE FROM WISHLIST в модалці
refs.addTowishlistBtn.addEventListener("click", handleWishlistAdd);