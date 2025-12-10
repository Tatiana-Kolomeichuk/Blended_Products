import { initCartEvents, initCartPage } from "./js/handlers";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';




let currentProductId = null; 

document.addEventListener('DOMContentLoaded', () => {
  console.log('cart.js loaded');
  initCartPage();
  initCartEvents();
});