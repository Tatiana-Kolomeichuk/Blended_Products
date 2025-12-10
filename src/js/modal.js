import { refs } from "./refs";
import { renderModalProduct } from "./render-function";

export function openModal() {
    refs.modal.classList.add("modal--is-open")
    refs.body.style.overflow = "hidden"
    window.addEventListener('keydown', onEscapePress);
    refs.modal.addEventListener("click", onBackdropClick)
}

export function closeModal() {
    refs.modal.classList.remove("modal--is-open")
    refs.body.style.overflow = ""
    window.removeEventListener("keydown", onEscapePress)
    refs.modal.removeEventListener("click", onBackdropClick)
}

function onEscapePress(e) {
    if (e.code === "Escape") {
        closeModal();
    }
}

function onBackdropClick(e) {
    if (e.currentTarget === e.target) {
        closeModal()
    }
}

export async function onCartProductClick(e) {
  const card = e.target.closest('.products__item');
  if (!card) return;

  const id = card.dataset.id;
  if (!id) return;

  try {
    const product = await getProductById(id);
    currentProductId = Number(product.id); 

    renderModalProduct(product); 
    syncModalButtons();          
    openModal();
  } catch (error) {
    console.error('Error opening product modal:', error);
  }
}


function syncModalButtons() {
  const wishlistBtn = document.querySelector('.modal-product__btn--wishlist');
  const cartBtn = document.querySelector('.modal-product__btn--cart');

  if (!wishlistBtn || !cartBtn || currentProductId == null) return;

  wishlistBtn.textContent = isInWishlist(currentProductId)
    ? 'Remove from Wishlist'
    : 'Add to Wishlist';

  cartBtn.textContent = isInCart(currentProductId)
    ? 'Remove from Cart'
    : 'Add to Cart';
}