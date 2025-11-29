import { getCategories, getProducts } from "./products-api";
import { renderCategories, renderProducts } from "./render-function";

export async function initHomePage() {
    try {
        const categories = await getCategories();
        renderCategories(categories);
        const {products}= await getProducts();
        renderProducts(products);
        
    } catch (error) {
        
    }
}