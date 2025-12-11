import { handleBtnClose, handleBtnSearch, handleBuyBtnClick, handleBuyItemClick, handleCartItemsLoad, handleItemClick, handleModalBtnAdd, handleWishlistAdd } from "./js/handlers";
import { toggleTheme } from "./js/helpers";
import { closeModal } from "./js/modal";
import { refs } from './refs';




//Loading page//
document.addEventListener('DOMContentLoaded', handleCartItemsLoad)

//ПЕРЕМИКАННЯ ТЕМИ
refs.themeToggleBtn.addEventListener('click',toggleTheme );

// ВІДКРИВАЄМО МОДАЛКУ У КОШИКУ
refs.cartProductList.addEventListener('click', handleItemClick);

//тут при додаванні чи видаленні товару у самій корзині, ще додатково викликаємо завантаження сторінки
//щоб товар на фоні модалки відмальовувався правильно
refs.addToCartModalBtn.addEventListener('click', handleCartItemsLoad);

//ПОКУПКА ТОВАРІВ
refs.buyBtnCart.addEventListener('click', handleBuyBtnClick);

//МОДАЛКА
//ці події на всіх сторінках одинакові
//оскільки на всіх сторінках модальне вікно товару і дії в ньому одинакові
refs.modalCloseBtn.addEventListener('click', handleBtnClose);
refs.modal.addEventListener('click', closeModal);
refs.addToCartModalBtn.addEventListener('click', handleModalBtnAdd);
refs.addTowishlistBtn.addEventListener('click', handleWishlistAdd);
refs.modal.addEventListener('click', handleBuyItemClick);
//ПЕРЕМИКАННЯ ТЕМИ
refs.themeToggleBtn.addEventListener('click',toggleTheme);
//


//ПОШУК З КОШИКА
//робимо подію для пошуку і перекидання на головну сторінку
//така сама подія і у wishlst
refs.searchForm.addEventListener('submit', handleBtnSearch);