import { refs } from './refs';

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
