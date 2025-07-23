const products = [
    // Sample product data
    { id: 1, name: "Smart Wi-Fi Coffee Maker", price: 29.99, category: "budget", imageUrl: "https://m.media-amazon.com/images/I/71b4ReFYVrL._AC_SX679_.jpg", link: "YOUR_AFFILIATE_LINK" },
    { id: 2, name: "Premium Smart Gadget", price: 89.99, category: "premium", imageUrl: "product2.jpg", link: "YOUR_AFFILIATE_LINK" },
    // more products...
];

// Currency conversion rates
const conversionRates = {
    'EUR': 0.85, // Example
    'GBP': 0.75, // Example
    'INR': 75,   // Example
    'USD': 1     // Default
};

function displayProducts() {
    const productGrid = document.getElementById("productGrid");
    const currency = detectCurrency(); // Function to detect user currency
    productGrid.innerHTML = ''; // Clear existing products
    products.forEach(product => {
        const priceInUserCurrency = (product.price * conversionRates[currency]).toFixed(2);
        productGrid.innerHTML += `
            <div class="product">
                <img src="${product.imageUrl}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Price: ${priceInUserCurrency} ${currency}</p>
                <a href="${product.link}" target="_blank">Buy Now</a>
            </div>
        `;
    });
}

function detectCurrency() {
    // Simplified example to detect currency based on the user's country
    return 'INR'; // You can use an API to better detect user location and currency
}

function shareOnPinterest() {
    // Implement Pinterest share functionality
    const shareUrl = `YOUR_SHARE_URL`; // Replace with the URL of the product or the page
    window.open(`https://www.pinterest.com/pin/create/button/?url=${shareUrl}`, '_blank');
}

// Call displayProducts on load
window.onload = displayProducts;
