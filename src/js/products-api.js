import axios from "axios"
import { API_BASE_URL, API_ENDPOINTS, ITEMS_PER_PAGE } from "./constants";
 axios.defaults.baseURL=API_BASE_URL

export async function getProducts(page = 1) {
    const skip = (page - 1) * ITEMS_PER_PAGE;
    
    const { data } = await axios.get(`${API_ENDPOINTS.PRODUCTS}?limit=${ITEMS_PER_PAGE}&skip=${skip}`);
    return data;

  }

export async function getCategories() {
    
        const { data } = await axios.get(API_ENDPOINTS.CATEGORIES);
        return data;
   
}