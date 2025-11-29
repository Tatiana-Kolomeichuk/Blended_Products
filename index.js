import"./assets/styles-JE8YjOlG.js";import{a as r}from"./assets/vendor-2s9xPmg-.js";const _="https://dummyjson.com",i={PRODUCTS:"/products",PRODUCTS_BY_ID:"/products/",CATEGORIES:"/products/category-list",SEARCH:"/products/search"},a=12;r.defaults.baseURL=_;async function g(t=1){const e=(t-1)*a,{data:s}=await r.get(`${i.PRODUCTS}?limit=${a}&skip=${e}`);return s}async function y(){const{data:t}=await r.get(i.CATEGORIES);return t}const o={closeModalBtn:document.querySelector(".modal__close-btn"),modal:document.querySelector(".modal"),body:document.querySelector("body"),themeToggleBtn:document.querySelector(".theme-toggle-btn"),categoriesList:document.querySelector(".categories"),productsList:document.querySelector(".products")};async function E(t){const e=t.map(({thumbnail:s,id:c,description:d,title:l,price:u,category:p,brand:m})=>`<li class="products__item" data-id="${c}">
    <img class="products__image" src="${s}" alt="${d}"/>
    <p class="products__title">${l}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${m||"no brand"}</span></p>
    <p class="products__category">Category: ${p}</p>
    <p class="products__price">Price: ${u}$</p>
 </li>`).join("");o.productsList.insertAdjacentHTML("beforeEnd",e)}function L(t){const s=["All",...t].map(c=>`<li class="categories__item">
    <button class="categories__btn" type="button">${c}</button>
    </li>`).join("");o.categoriesList.innerHTML=s}async function b(){try{const t=await y();L(t);const{products:e}=await g();E(e)}catch{}}function n(){o.modal.classList.remove("modal--is-open"),o.body.style.overflow="",window.removeEventListener("keydown",f),o.modal.removeEventListener("click",S)}function f(t){t.code==="Escape"&&n()}function S(t){t.currentTarget===t.target&&n()}document.addEventListener("DOMContentLoaded",b);o.closeModalBtn.addEventListener("click",n);
//# sourceMappingURL=index.js.map
