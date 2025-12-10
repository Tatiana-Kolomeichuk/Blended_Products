import { STATE,CART_KEY } from './constants';
import {
  canLoadMore,
  clearActiveCategory,
  clearProductsList,
  getCart,
  hideLoadMore,
  hideNotFoundBlock,
  setCart,
  showNotFoundBlock,
  updateActiveCategory,
  updateCartSummary,
  updateNavCartCount,
} from './helpers';
import {
  getCategories,
  getProductById,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from './products-api';
import { renderCategories, renderModalProduct, renderProducts } from './render-function';
import { refs } from './refs';
import { onCartProductClick, openModal } from './modal';

let currentProductId = null;

export async function initHomePage() {
  try {
    const categories = await getCategories();
    renderCategories(categories);
    const { products } = await getProducts(STATE.PAGE);
    renderProducts(products);
  } catch (error) {}
}

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

//Card//

export async function initCartPage() {
  const ids = getCart(); 

  if (!ids.length) {
    refs.productsList.innerHTML = ''; 
    refs.notFoundBlock.classList.add('not-found--visible');
    updateCartSummary([]);
    return;
  }

  refs.notFoundBlock.classList.remove('not-found--visible');

  try {
    const products = await Promise.all(ids.map(id => getProductById(id)));
    refs.productsList.innerHTML = '';
    await renderProducts(products);

    updateCartSummary(products); 
  } catch (error) {
    console.error('Error loading cart products:', error);
    refs.notFoundBlock.classList.add('not-found--visible');
    updateCartSummary([]);
  }
}

export function initModalButtonsHandlers() {
  const wishlistBtn = document.querySelector('.modal-product__btn--wishlist');
  const cartBtn = document.querySelector('.modal-product__btn--cart');

  if (!wishlistBtn || !cartBtn) {
    console.warn('Modal buttons not found in DOM');
    return;
  }

  wishlistBtn.addEventListener('click', () => {
    if (currentProductId == null) return;
    const inWishlist = toggleWishlist(currentProductId);
    wishlistBtn.textContent = inWishlist
      ? 'Remove from Wishlist'
      : 'Add to Wishlist';
  });

  cartBtn.addEventListener('click', async () => {
    if (currentProductId == null) return;
    console.log('Cart button clicked with id:', currentProductId);
    const inCart = toggleCart(currentProductId);
    cartBtn.textContent = inCart ? 'Remove from Cart' : 'Add to Cart';
    await initCartPage();
  });
}

export function onBuyProductsClick() {
  const cart = getCart(); 

  if (!cart.length) {
    iziToast.info({
      title: 'Empty',
      message: 'Your cart is empty.',
      position: 'topRight',
    });
    return;
  }

  iziToast.success({
    title: 'Success',
    message: 'You successfully purchased all products in the cart!',
    position: 'topRight',
  });

  setCart([]); 
  initCartPage(); 
}
// ---------- scroll-to-top ----------

function initScrollTop() {
  const scrollBtn = document.querySelector('.scroll-top-btn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.remove('is-hidden');
    } else {
      scrollBtn.classList.add('is-hidden');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

// ---------- init events ----------

export function initCartEvents() {
  
  refs.productsList.addEventListener('click', onCartProductClick);

  
  const buyBtn = document.querySelector('.cart-summary__btn');
  if (buyBtn) {
    buyBtn.addEventListener('click', onBuyProductsClick);
  }


  initModalButtonsHandlers();


  initScrollTop();
}