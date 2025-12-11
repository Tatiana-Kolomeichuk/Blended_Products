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

  const {
    id,                       // ← додано!
    images,
    title,
    description,
    tags,
    price,
    shippingInformation = 'Standard shipping',
    returnPolicy = '30 days return',
  } = product;

  const markup = `
      <img class="modal-product__img" src="${images[0]}" alt="${title}" />
     <div class="modal-product__content data-id="${id}">
        <p class="modal-product__title">${title}</p>
        <ul class="modal-product__tags">${tags}</ul>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information">Shipping: ${shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
        <p class="modal-product__price">Price: ${price}$</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`;


  refs.modalContainer.innerHTML = markup;
}



//рендер інформації у кошику
export function renderCardWishlist(items) {
    const quantity = items.length;
    refs.cartSummary.textContent = quantity;
     
    let total = 0;

    for (const item of items) {
        total += item.price;
    };
    
    refs.cartSummaryPrice.textContent = total.toFixed(2);
}