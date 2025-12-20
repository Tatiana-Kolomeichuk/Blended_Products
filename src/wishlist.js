//Логіка сторінки Wishlist

import {  handleBtnClose, handleBtnSearch, handleItemClick, handleModalBtnAdd, handleWishlistAdd, handleWishlistLoad } from "./js/handlers";
import { toggleTheme } from "./js/helpers";
import { closeModal } from "./js/modal";
import { refs } from "./js/refs";



document.addEventListener('DOMContentLoaded', handleWishlistLoad);

//на ту саму кнопку додаємо перезагрузку сторінки, щоб відмалювались актуальні продукти зі сховища
refs.addTowishlistBtn.addEventListener('click', handleWishlistLoad);

//МОДАЛКА
//ці події на всіх сторінках одинакові
//оскільки на всіх сторінках модальне вікно товару і дії в ньому одинакові
refs.productsList.addEventListener('click', handleItemClick);
refs.modalCloseBtn.addEventListener('click', handleBtnClose);
refs. modalCloseBtn.addEventListener('click', closeModal);
refs.addToCartModalBtn.addEventListener('click', handleModalBtnAdd);
refs.addTowishlistBtn.addEventListener('click', handleWishlistAdd);
//ПЕРЕМИКАННЯ ТЕМА
refs.themeToggleBtn.addEventListener('click', toggleTheme);
//

//ПОШУК З КОШИКА
//робимо подію для пошуку і перекидання на головну сторінку
refs.searchForm.addEventListener('submit', handleBtnSearch);