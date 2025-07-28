// script.js

Document.addEventListener('DOMContentLoaded', () => { // Show loading spinner const loadingSpinner = document.getElementById('loading-spinner'); loadingSpinner.style.opacity = '1';

// Simulate content loading for the spinner
setTimeout(() => {
    loadingSpinner.style.opacity = '0';
    loadingSpinner.style.display = 'none'; // Hide completely after fade
}, 1000);

// --- Global Variables ---
let currentCurrency = 'USD';
const USD_SYMBOL = '$';
const INR_SYMBOL = '₹';
const USD_TO_INR_RATE = 83.35;
let currentFilter = 'all';
let currentPage = 1;
const productsPerPage = 12;

// Utility function to resolve image paths
const resolveImagePath = (imgSrc) => {
    return location.pathname.includes('/TopTrends/') ? `../${imgSrc}` : imgSrc;
};

// NOTE: productsData and productCategories are now loaded from data.js

// --- DOM Elements ---
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const quickViewModal = document.getElementById('quickViewModal');
const closeButton = quickViewModal.querySelector('.close-button');
const modalProductName = document.getElementById('modal-product-name');
const modalProductDescription = document.getElementById('modal-product-description');
const modalProductPrice = document.getElementById('modal-product-price');
const modalMainImage = document.getElementById('modal-main-image');
const modalThumbnails = document.querySelector('.modal-thumbnails');
const modalAddToCartBtn = quickViewModal.querySelector('.add-to-cart');
const gadgetGrid = document.getElementById('gadgetGrid');
const counters = document.querySelectorAll('.counter');
const countersSection = document.querySelector('.counters-section');
const priceToggleBtn = document.getElementById('priceToggleBtn');
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

// Product Detail Page Elements
const productDetailPage = document.getElementById('productDetailPage');
const productsSection = document.getElementById('products-section');
const backToProductsBtn = document.getElementById('backToProductsBtn');
const detailMainImage = document.getElementById('detail-main-image');
const detailThumbnails = document.getElementById('detail-thumbnails');
const detailProductName = document.getElementById('detail-product-name');
const detailProductPrice = document.getElementById('detail-product-price');
const detailProductLongDescription = document.getElementById('detail-product-long-description');
const detailAddToCartBtn = document.getElementById('detailAddToCartBtn');
const modalViewFullDetailsBtn = document.getElementById('modalViewFullDetailsBtn');
const featuredDiscountPrice = document.querySelector('.featured-gadget-card .discount-price');
const featuredOriginalPrice = document.querySelector('.featured-gadget-card .original-price');
const featuredAddToCartBtn = document.querySelector('.add-to-cart-featured');

const paginationContainer = document.createElement('div');
paginationContainer.className = 'pagination-container';

// (Your existing code remains unchanged for functions and modal logic)

// Just remember to replace:
// modalMainImage.src = product.images[0];
// detailMainImage.src = product.images[0];
// thumb.src = imgSrc;
// with:
// modalMainImage.src = resolveImagePath(product.images[0]);
// detailMainImage.src = resolveImagePath(product.images[0]);
// thumb.src = resolveImagePath(imgSrc);

});

