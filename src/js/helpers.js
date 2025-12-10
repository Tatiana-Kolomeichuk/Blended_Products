import { refs } from './refs';
import { STATE, ITEMS_PER_PAGE, THEME_KEY, CART_KEY } from './constants';
import { loadFromLS, saveToLS } from './storage';





export function toggleTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  document.body.dataset.theme = theme;

  refs.themeToggleBtn.innerHTML = theme === 'light' ? '☀️' : '🌙';
  saveToLS(THEME_KEY, theme);
}
export function initTheme() {

  const savedTheme = loadFromLS(THEME_KEY);
  refs.themeToggleBtn.addEventListener('click', () => {
    const newTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
    toggleTheme(newTheme);
  });
}

export function clearProductsList() {
  refs.productsList.innerHTML = '';
}

export function updateActiveCategory(activeEl) {
  const oldActiveEl = document.querySelector('.categories__btn--active');
  if (oldActiveEl) {
    oldActiveEl.classList.remove('categories__btn--active');
  }
  activeEl.classList.add('categories__btn--active');
}

export function showNotFoundBlock() {
  refs.notFoundBlock.classList.add('not-found--visible');
}

export function hideNotFoundBlock() {
  refs.notFoundBlock.classList.remove('not-found--visible');
}

export function clearActiveCategory() {
  const oldActiveEl = document.querySelector('.categories__btn--active');
  if (oldActiveEl) {
    oldActiveEl.classList.remove('categories__btn--active');
  }
}

export function canLoadMore(totalItems) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  if (totalPages > STATE.PAGE) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  } else {
    refs.loadMoreBtn.classList.add('is-hidden');
  }
}

export function hideLoadMore() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

export function getArrayFromLS(key) {
  const data = loadFromLS(key);
  return Array.isArray(data) ? data : [];
}

export function setArrayToLS(key, arr) {
  saveToLS(key, arr);
}
export function getCart() {
  const cart = loadFromLS(CART_KEY); 
  return Array.isArray(cart) ? cart : []; 
}

export function setCart(cart) {
  saveToLS(CART_KEY, cart); 
}
export function getWishlist() {
  return getArrayFromLS(WISHLIST_KEY);
}

export function setWishlist(arr) {
  setArrayToLS(WISHLIST_KEY, arr);
}

export function isInCart(id) {
  return getCart().includes(Number(id));
}

export function isInWishlist(id) {
  return getWishlist().includes(Number(id));
}

export function toggleCart(id) {
  id = Number(id);
  const cart = getCart(); 
  const idx = cart.indexOf(id); 

  if (idx === -1) {
    cart.push(id); 
  } else {
    cart.splice(idx, 1);
  }

  setCart(cart); 
  console.log('Cart after toggle:', cart); 
  return cart.includes(id); 
}

export function toggleWishlist(id) {
  id = Number(id);
  const list = getWishlist();
  const idx = list.indexOf(id);

  if (idx === -1) {
    list.push(id);
  } else {
    list.splice(idx, 1);
  }

  setWishlist(list);
  console.log('Wishlist in LS now:', getWishlist());
  return list.includes(id);
}

// ---------- header counter ----------

export function updateNavCartCount() {
  const navCountEl = document.querySelector('.nav__count');
  if (!navCountEl) return;
  navCountEl.textContent = getCart().length;
}

// ---------- summary (Items / Total) ----------

export function updateCartSummary(products) {
  const countEl = document.querySelector('[data-count]');
  const priceEl = document.querySelector('[data-price]');

  const itemsCount = products.length; 
  const totalPrice = products.reduce((sum, p) => sum + Number(p.price || 0), 0);

  if (countEl) countEl.textContent = itemsCount; 
  if (priceEl) priceEl.textContent = `$${totalPrice}`; 
}