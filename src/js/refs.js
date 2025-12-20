export const refs = {
  // --------- Головні елементи сторінок ---------
  body: document.body,
  themeToggleBtn: document.querySelector('.theme-toggle-btn'),
  searchForm: document.querySelector('.search-form'),
  categoriesList: document.querySelector('.categories'),
  productsList: document.querySelector('.products'),
  wishlistProductList: document.querySelector('.products-wish'),

  // --------- Кошик ---------
  buyBtnCart: document.querySelector('.cart-summary__btn'),
  cartSummary: document.querySelector('[data-count]'),
  cartSummaryPrice: document.querySelector('[data-price]'),

  // --------- Модалка ---------
  modal: document.querySelector('.modal'),
  modalContainer: document.querySelector('.modal-product'),
  modalCloseBtn: document.querySelector('.modal__close-btn'),
  addToCartModalBtn: document.querySelector('.modal-product__btn--cart'),
  addTowishlistBtn: document.querySelector('.modal-product__btn--wishlist'),

  // --------- Індикатори ---------
  cartCountSpan: document.querySelector('[data-cart-count]'),
  wishlistCountSpan: document.querySelector('[data-wishlist-count]'),

  // --------- Стани / службові блоки ---------
  notFoundBlock: document.querySelector('.not-found'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};
