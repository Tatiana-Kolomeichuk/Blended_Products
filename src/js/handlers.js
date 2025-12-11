import { STATE } from './constants';
import { canLoadMore, clearActiveCategory, clearProductsList, hideLoadMore, hideNotFoundBlock, initTheme, showNotFoundBlock,updateActiveCategory, } from './helpers';
import { getCategories, getProductById, getProducts, getProductsByCategory, searchProducts, } from './products-api';
import { renderCardWishlist, renderCategories, renderModalProduct, renderProducts } from './render-function';
import { refs } from './refs';
import { closeModal, onEscapePress, openModal } from './modal';
import { loadFromLS, saveToLS } from './storage';


// let totalPages;
// let page = 1;
// let query;
// let category;

let wishlistItems = (loadFromLS('wishlist') || []).map(Number);

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
export async function handleCartItemsLoad() {
  const raw = loadFromLS('cartItems') || [];
  const cartIds = Array.isArray(raw) ? raw : [];
  const ids = cartIds.map(x => Number(x)).filter(Number.isFinite);

  console.log("Cart IDs from LS:", ids);

  if (!ids.length) {
    if (refs.productsList) refs.productsList.innerHTML = '';
    if (refs.notFoundBlock) refs.notFoundBlock.classList.add('not-found--visible');
    renderCardWishlist([]);
    countCartItems(0);                
    return;
  }

  if (refs.notFoundBlock) refs.notFoundBlock.classList.remove('not-found--visible');

  try {
    const products = await Promise.all(ids.map(id => getProductById(id)));

    clearProductsList();
    renderProducts(products);

    countCartItems(ids.length);     
    countWishlistItems();
    renderCardWishlist(products);
  } catch (error) {
    console.error("Error loading cart items:", error);
  }
}

//---------------- COUNT WISH ITEMS ---------------------------
export function countWishlistItems() {
  const quantity = wishlistItems.length;
  if (refs.wishlistCountSpan) {
    refs.wishlistCountSpan.textContent = quantity;
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

    // текст кнопок у модалці
    if (cartItems.includes(id)) {
      refs.addToCartModalBtn.textContent = 'Remove from cart';
    } else {
      refs.addToCartModalBtn.textContent = 'Add to cart';
    }

    if (wishlistItems.includes(id)) {
      refs.addTowishlistBtn.textContent = 'Remove from Wishlist';
    } else {
      refs.addTowishlistBtn.textContent = 'Add to Wishlist';
    }

    onEscapePress();
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
  const contentEl = refs.modalContainer?.querySelector('.modal-product__content[data-id]');
  if (!contentEl) return;

  const id = Number(contentEl.dataset.id);
  if (!Number.isFinite(id)) return;

  // читаємо й оновлюємо LS
  const raw = loadFromLS('cartItems') || [];
  let ids = (Array.isArray(raw) ? raw : []).map(Number).filter(Number.isFinite);

  const btn = e.target.closest('.modal-product__btn--cart');

  if (ids.includes(id)) {
    ids = ids.filter(x => x !== id);
    if (btn) btn.textContent = 'Add to Cart';
  } else {
    ids.push(id);
    if (btn) btn.textContent = 'Remove from Cart';
  }

  saveToLS('cartItems', ids);
  countCartItems(ids.length);              
}
//--------------- ADD TO WISH PRODUCT ----------------------
export function handleWishlistAdd(e) {
  const actions = e.target.closest('.modal-product__actions');
  if (!actions) return;

  const productElem = actions.previousElementSibling;
  if (!productElem) return;

  const contentEl = productElem.querySelector('[data-id]');
  if (!contentEl) return;

  const id = Number(contentEl.dataset.id);
  if (!id) return;

  console.log('Wishlist toggle id:', id);
  console.log('Wishlist before:', wishlistItems);

  if (wishlistItems.includes(id)) {
    refs.addTowishlistBtn.textContent = 'Add to Wishlist';
    wishlistItems = wishlistItems.filter(el => el !== id);
  } else {
    refs.addTowishlistBtn.textContent = 'Remove from Wishlist';
    wishlistItems.push(id);
  }

  saveToLS('wishlist', wishlistItems);
  countWishlistItems();

  console.log('Wishlist after:', wishlistItems);
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