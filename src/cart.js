
import {
  handleBtnClose,
  handleBtnSearch,
  handleBuyBtnClick,
  handleCartItemsLoad,
  handleItemClick,
  handleModalBtnAdd,
  handleWishlistAdd,
} from "./js/handlers";

import { closeModal } from "./js/modal";
import { refs } from "./js/refs";



// ----------------- Клік по товарах у списку кошика -----------------

// ВІДКРИВАЄМО МОДАЛКУ У КОШИКУ
refs.productsList.addEventListener("click", handleItemClick);

// ----------------- ПОКУПКА ВСІХ ТОВАРІВ -----------------

refs.buyBtnCart.addEventListener("click", handleBuyBtnClick);

document.addEventListener('DOMContentLoaded', handleCartItemsLoad)



// Клік по кнопці Buy у модалці (купити один товар)
refs.modal.addEventListener("click", handleItemClick);

// ----------------- ПОШУК З КОШИКА -----------------

refs.searchForm.addEventListener("submit", handleBtnSearch);
