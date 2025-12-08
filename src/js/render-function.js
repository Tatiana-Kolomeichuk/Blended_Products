import { refs } from './refs';
export async function renderProducts(products) {
  const markup = products
    .map(
      ({
        thumbnail,
        id,
        description,
        title,
        price,
        category,
        brand,
      }) => `<li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${description}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${
      brand || 'no brand'
    }</span></p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: ${price}$</p>
 </li>`
    )
    .join('');
  refs.productsList.insertAdjacentHTML('beforeEnd', markup);
}
export function renderCategories(categories) {
  const categoryList = ['All', ...categories];
  const markup = categoryList
    .map(
      item =>
        `<li class="categories__item">
    <button class="categories__btn" type="button">${item}</button>
    </li>`
    )
    .join('');
  refs.categoriesList.innerHTML = markup;
}
export function renderModalProduct(product) {
  
  if (!refs.modalContainer) return;

  const {
    images = [],
    thumbnail = '',
    title = 'Unnamed product',
    description = '—',
    price = null,
    brand = '',
    category = '',
    tags,
  } = product || {};

  const imgSrc = images[0] || thumbnail || '';
  const finalTags = Array.isArray(tags) ? tags : [brand, category].filter(Boolean);
  const tagsMarkup = finalTags.map(t => `<li>${String(t)}</li>`).join('');

  refs.modalContainer.innerHTML = `
    <img class="modal-product__img" src="${imgSrc}" alt="${title}" />
    <div class="modal-product__content">
      <p class="modal-product__title">${title}</p>
      <ul class="modal-product__tags">${tagsMarkup}</ul>
      <p class="modal-product__description">${description}</p>
      <p class="modal-product__shipping-information">Shipping: —</p>
      <p class="modal-product__return-policy">Return Policy: —</p>
      <p class="modal-product__price">Price: $${price != null ? Number(price).toFixed(2) : '—'}</p>
      <button class="modal-product__buy-btn" type="button">Buy</button>
    </div>
  `;
}