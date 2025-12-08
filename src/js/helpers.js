import { refs } from './refs';
import { STATE, ITEMS_PER_PAGE } from './constants';

export function toggleTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  document.body.dataset.theme = theme;

  refs.themeToggleBtn.innerHTML = theme === 'light' ? '🌙' : '☀️';
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