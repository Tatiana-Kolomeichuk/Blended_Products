import { STATE } from './constants';
import { canLoadMore, clearActiveCategory, clearProductsList, hideLoadMore, hideNotFoundBlock, initTheme, showNotFoundBlock,updateActiveCategory, } from './helpers';
import { getCategories, getProductById, getProducts, getProductsByCategory, searchProducts, } from './products-api';
import {  productsTemplate, renderCardWishlist, renderCategories, renderModalProduct, renderProducts } from './render-function';
import { refs } from './refs';
import { closeModal, onEscapePress, openModal } from './modal';
import { loadFromLS, saveToLS } from './storage';


let totalPages;
let page = 1;
let query;
let category;
let productId = null;
let wishlistItems = loadFromLS('wishlist') || [];
 const CART_KEY = 'cartItems';
const WISHLIST_KEY = 'wishlist';


// Ініціалізація сторінки Home
export async function initHomePage() {
  initTheme();

  try {
    const categories = await getCategories();
    renderCategories(categories);
    const { products } = await getProducts(STATE.PAGE);
    renderProducts(products);
  } catch (error) {
    console.error('Failed to initialize home page:', error);
  }
}

// Обробник кліку по категорії
export async function handleCategoryClick(e) {
  const btnEl = e.target.closest('.categories__btn');
  if (!btnEl) {
    return;
  }
  clearProductsList();
  updateActiveCategory(btnEl);
  hideNotFoundBlock();
  STATE.PAGE = 1;
  const query = btnEl.textContent;

  if (query === 'All') {
    try {
      const { products } = await getProducts(STATE.PAGE);
      renderProducts(products);
    } catch (err) {
      console.error(`Get products error: ${err}`);
    }
  } else {
    STATE.QUERY = query;
    try {
      const { products } = await getProductsByCategory(STATE.QUERY, STATE.PAGE);
      if (products.length === 0) {
        showNotFoundBlock();
      } else {
        renderProducts(products);
      }
    } catch (err) {
      console.error(`Get products error: ${err}`);
    }
  }
}
export async function onProductClick(e) {
  const card = e.target.closest('.products__item');
  if (!card || !refs.productsList.contains(card)) return;

  const id = card.dataset.id;
  if (!id) return;

  try {
    productId = id;
    const product = await getProductById(id);
    renderModalProduct(product);
    openModal();
  } catch (err) {
    console.error('Не вдалося завантажити продукт:', err);
  }
}

export async function handleSearchForm(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const queryCandidate = formData.get('searchValue').trim();
  if (!queryCandidate) {
    alert('type something');
    return;
  }

  clearProductsList();
  hideNotFoundBlock();
  clearActiveCategory();
  hideLoadMore();
  STATE.QUERY = queryCandidate;
  STATE.PAGE = 1;

  try {
    const { products, total } = await searchProducts(STATE.QUERY, STATE.PAGE);
    if (!products?.length) {
      showNotFoundBlock();
    } else {
      renderProducts(products);
      canLoadMore(total);
    }
  } catch (err) {
    console.error(`Get product error: ${err}`);
  }
  e.target.reset();
}
//!============================= CART PAGE ================================

//------------- Завантаження сторінки Card ---------------------------------

//------------- LOAD CART PAGE ---------------------------------
export async function handleCartItemsLoad() {
  const cartItems = loadFromLS('cartItems') || [];

  try {
    const products = await Promise.all(
      cartItems.map(id => getProductById(Number(id)))
    );

    refs.productsList.innerHTML = productsTemplate(products);

    // counters
    countCartItems(cartItems.length);
    countWishlistItems();

    // summary
    renderCardWishlist(products);
  } catch (error) {
    console.log(error);
  }
}

//---------------- COUNT WISH ITEMS ---------------------------
export function countWishlistItems() {
  const wish = loadFromLS('wishlist') || [];
  const quantity = wish.length;

  if (refs.wishlistCountSpan) {
    refs.wishlistCountSpan.textContent = String(quantity);
  }
}

//---------------- COUNT CART ITEMS ---------------------------
export function countCartItems(qty = 0) {
  if (refs.cartCountSpan) {
    refs.cartCountSpan.textContent = String(qty);
  }
}

//------------------- OPEN MODAL ----------------------
export async function handleItemClick(e) {
  const liElem = e.target.closest('li.products__item');
  if (!liElem) return;

  const id = Number(liElem.dataset.id);
  if (!id) return;

  try {
    const product = await getProductById(id);
    renderModalProduct(product);
    openModal();
const cartIds = loadFromLS(CART_KEY) || [];
const wishIds = loadFromLS(WISHLIST_KEY) || [];
    // текст кнопок у модалці
    if (cartIds.includes(id)) {
      refs.addToCartModalBtn.textContent = 'Remove from cart';
    } else {
      refs.addToCartModalBtn.textContent = 'Add to cart';
    }

    if (wishIds.includes(id)) {
      refs.addTowishlistBtn.textContent = 'Remove from Wishlist';
    } else {
      refs.addTowishlistBtn.textContent = 'Add to Wishlist';
    }

    window.addEventListener('keydown', onEscapePress);
  } catch (error) {
    console.error('Error opening product modal:', error);
  }
}

export function handleBtnClose() {
    closeModal();
  window.removeEventListener('keydown', onEscapePress);
}


//------------------ ADD TO CART -------------------------------
export function handleModalBtnAdd(e) {
  if (productId === null) return; 

  let raw = loadFromLS('cartItems') || [];
  const btn = e.target;

  if (raw.includes(productId)) {
    raw = raw.filter(x => x !== productId);
    if (btn) btn.textContent = 'Add to Cart';
  } else {
    raw.push(productId);
    if (btn) btn.textContent = 'Remove from Cart';
  }

  saveToLS('cartItems', raw);
  countCartItems(raw.length);
}
//--------------- ADD TO WISH PRODUCT ----------------------
export function handleWishlistAdd(e) {
  if (productId === null) return; // ⬅️ захист

  let wish = loadFromLS('wishlist') || [];
  const wishBtn = e.target;

  if (wish.includes(productId)) {
    wish = wish.filter(x => x !== productId);
    wishBtn.textContent = 'Add to Wishlist';
  } else {
    wish.push(productId);
    wishBtn.textContent = 'Remove from Wishlist';
  }

  saveToLS('wishlist', wish);
  countWishlistItems(wish.length);
}

//----------------- BUY PRODUCT -----------------------------
export function handleBuyBtnClick() {
  const ids = [];                           
  saveToLS('cartItems', ids);
  countCartItems(0);                        
  handleCartItemsLoad();
}
//-------- SEARCH ---------------------
export function handleBtnSearch(e) {
    e.preventDefault()
    window.location.replace('/index.html');

    const formData = new FormData(e.target);
    const input = formData.get('searchValue');

    saveToLS('inputValue', input);    
}
export function handleBuyItemClick(e) {
    if (e.target.textContent !== 'Buy') return;

    const divEl = e.target.closest('div');
    const id = divEl.dataset.id;

    cartItems = cartItems.filter(el => el != id);
    refs.addToCartModalBtn.textContent = 'Add to cart';

    saveToLS('cartItems', cartItems);
    handleCartItemsLoad();
}

//!==================== WISHLIST PAGE =================================

//----------------- LOAD WISHLIST PAGE -------------------------
export async function handleWishlistLoad(e) {
    wishlistItems = loadFromLS('wishlist') || [];
    initTheme();

    try {
        const response = wishlistItems.map(id => getProductById(id));
        const result = await Promise.all(response);
        const markup = productsTemplate(result);
        refs.wishlistProductList.innerHTML = markup;
        
        countWishlistItems();
        countCartItems();
    } catch (error) {
        console.log(error);
    }
}