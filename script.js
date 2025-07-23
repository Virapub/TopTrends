const products = [
    {
        id: 1,
        name: "Product 1",
        image: "https://via.placeholder.com/150",
        link: "https://www.amazon.com/dp/product1/?tag=your_affiliate_id"
    },
    {
        id: 2,
        name: "Product 2",
        image: "https://via.placeholder.com/150",
        link: "https://www.amazon.com/dp/product2/?tag=your_affiliate_id"
    },
    // Add more products as needed
];

const productsContainer = document.getElementById('products-container');

products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <a href="${product.link}" target="_blank">Buy Now</a>
    `;
    productsContainer.appendChild(productDiv);
});
