document.addEventListener('DOMContentLoaded', () => {
    // Check if data is loaded
    if (typeof productsData === 'undefined' || typeof productCategories === 'undefined') {
        console.error('Data not loaded. Please check if data(10).js is properly included.');
        return;
    }

    // Show loading spinner
    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.style.opacity = '1';

    // Simulate content loading for the spinner
    setTimeout(() => {
        loadingSpinner.style.opacity = '0';
        loadingSpinner.style.display = 'none';
    }, 1000);

    // --- Global Variables ---
    let currentCurrency = 'USD';
    const USD_SYMBOL = '$';
    const INR_SYMBOL = '₹';
    let currentFilter = 'new-arrivals';
    let currentPage = 1;
    const productsPerPage = 12;

    // --- DOM Elements ---
    const quickViewModal = document.getElementById('quickViewModal');
    const closeButton = quickViewModal.querySelector('.close-button');
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductDescription = document.getElementById('modal-product-description');
    const modalProductPrice = document.getElementById('modal-product-price');
    const modalMainImage = document.getElementById('modal-main-image');
    const modalThumbnails = document.querySelector('.modal-thumbnails');
    const modalAddToCartBtn = quickViewModal.querySelector('.add-to-cart');
    const gadgetGrid = document.getElementById('gadgetGrid');
    const priceToggleBtn = document.getElementById('priceToggleBtn');
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const productsTitle = document.getElementById('productsTitle');
    const featuredAddToCartBtn = document.querySelector('.add-to-cart-featured');
    const featuredDiscountPrice = document.querySelector('.featured-gadget-card .discount-price');
    const featuredOriginalPrice = document.querySelector('.featured-gadget-card .original-price');

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

    // Pagination Elements
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination-container';
    paginationContainer.innerHTML = `
        <div class="pagination">
            <button id="prevPage" class="btn btn-secondary">Previous</button>
            <span id="pageInfo">Page 1 of 1</span>
            <button id="nextPage" class="btn btn-secondary">Next</button>
        </div>
    `;

    // --- Helper Functions ---
    const formatPrice = (priceUSD) => {
        if (currentCurrency === 'USD') {
            return `${USD_SYMBOL}${priceUSD.toFixed(2)}`;
        } else {
            return `${INR_SYMBOL}${(priceUSD * USD_TO_INR_RATE).toFixed(2)}`;
        }
    };

    const updateAllPrices = () => {
        // Update product grid prices
        document.querySelectorAll('.gadget-card .price').forEach(priceEl => {
            const usdPrice = parseFloat(priceEl.dataset.usdPrice);
            priceEl.textContent = formatPrice(usdPrice);
        });

        // Update modal price
        if (modalProductPrice.dataset.usdPrice) {
            modalProductPrice.textContent = formatPrice(parseFloat(modalProductPrice.dataset.usdPrice));
        }

        // Update product detail page price
        if (detailProductPrice.dataset.usdPrice) {
            detailProductPrice.textContent = formatPrice(parseFloat(detailProductPrice.dataset.usdPrice));
        }

        // Update Deal of the Day prices
        if (featuredDiscountPrice && featuredDiscountPrice.dataset.usdPrice) {
            featuredDiscountPrice.textContent = formatPrice(parseFloat(featuredDiscountPrice.dataset.usdPrice));
        }
        if (featuredOriginalPrice && featuredOriginalPrice.dataset.usdPrice) {
            featuredOriginalPrice.textContent = formatPrice(parseFloat(featuredOriginalPrice.dataset.usdPrice));
        }

        // Update button text
        priceToggleBtn.textContent = `Price: ${currentCurrency}`;
    };

    // Function to create a product card
    const createProductCard = (product) => {
        const card = document.createElement('div');
        card.classList.add('gadget-card');
        card.dataset.category = product.category;
        card.dataset.name = product.name.toLowerCase();
        card.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
            <h3>${product.name}</h3>
            <p class="price" data-usd-price="${product.priceUSD}">${formatPrice(product.priceUSD)}</p>
            <p class="short-desc">${product.shortDescription}</p>
            <div class="card-buttons">
                <button class="btn btn-secondary btn-quick-view" data-id="${product.id}">Quick View</button>
                <button class="btn btn-primary btn-view-product" data-id="${product.id}">View Details</button>
            </div>
        `;
        return card;
    };

    // Function to filter featured products
    const getFilteredProducts = (filter, searchTerm = '') => {
        let filtered = productsData;

        // Apply featured filter
        if (filter && filter !== 'all') {
            filtered = filtered.filter(product => {
                const categories = product.category.split(' ');
                return categories.includes(filter);
            });
        }

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    };

    // Function to populate the product grid with pagination
    const populateProductGrid = (filter, searchTerm = '', page = 1) => {
        gadgetGrid.innerHTML = '';
        
        const filteredProducts = getFilteredProducts(filter, searchTerm);
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToShow = filteredProducts.slice(startIndex, endIndex);

        if (productsToShow.length === 0) {
            gadgetGrid.innerHTML = `
                <div class="no-products">
                    <h3>No products found</h3>
                    <p>Try selecting a different category or adjusting your search.</p>
                </div>
            `;
            return;
        }

        productsToShow.forEach(product => {
            const card = createProductCard(product);
            gadgetGrid.appendChild(card);
        });

        // Update pagination
        updatePagination(page, totalPages, filteredProducts.length);

        // Re-attach event listeners for newly created buttons
        attachProductButtonListeners();
    };

    // Function to update pagination
    const updatePagination = (currentPage, totalPages, totalProducts) => {
        const existingPagination = document.querySelector('.pagination-container');
        if (existingPagination) {
            existingPagination.remove();
        }

        if (totalPages > 1) {
            const productsSection = document.getElementById('products-section');
            productsSection.appendChild(paginationContainer);

            const prevBtn = document.getElementById('prevPage');
            const nextBtn = document.getElementById('nextPage');
            const pageInfo = document.getElementById('pageInfo');

            pageInfo.textContent = `Page ${currentPage} of ${totalPages} (${totalProducts} products)`;
            
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages;

            prevBtn.onclick = () => {
                if (currentPage > 1) {
                    currentPage--;
                    populateProductGrid(currentFilter, searchInput.value, currentPage);
                }
            };

            nextBtn.onclick = () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    populateProductGrid(currentFilter, searchInput.value, currentPage);
                }
            };
        }
    };

    // Attach event listeners for Quick View and View Product buttons
    const attachProductButtonListeners = () => {
        document.querySelectorAll('.btn-quick-view').forEach(button => {
            button.onclick = (event) => openQuickViewModal(event.target.dataset.id);
        });
        document.querySelectorAll('.btn-view-product').forEach(button => {
            button.onclick = (event) => showProductDetailPage(event.target.dataset.id);
        });
    };

    // Function to update products title based on filter
    const updateProductsTitle = (filter) => {
        const filterNames = {
            'new-arrivals': 'New Arrivals',
            'trending': 'Trending Products',
            'highly-rated': 'Highly Rated Products'
        };
        productsTitle.textContent = filterNames[filter] || 'Featured Products';
    };

    // --- Search Functionality ---
    const performSearch = () => {
        const searchTerm = searchInput.value.trim();
        currentPage = 1;
        populateProductGrid(currentFilter, searchTerm, currentPage);
    };

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Real-time search (optional)
    searchInput.addEventListener('input', () => {
        clearTimeout(searchInput.searchTimeout);
        searchInput.searchTimeout = setTimeout(() => {
            performSearch();
        }, 500);
    });

    // --- Product Quick-View Modal ---
    const openQuickViewModal = (productId) => {
        const product = productsData.find(p => p.id == productId);

        if (product) {
            modalProductName.textContent = product.name;
            modalProductDescription.textContent = product.shortDescription;
            modalProductPrice.dataset.usdPrice = product.priceUSD;
            modalProductPrice.textContent = formatPrice(product.priceUSD);
            modalMainImage.src = product.images[0];

            modalThumbnails.innerHTML = '';
            product.images.forEach((imgSrc, index) => {
                const thumb = document.createElement('img');
                thumb.src = imgSrc;
                thumb.alt = `${product.name} Thumbnail ${index + 1}`;
                thumb.classList.add('modal-thumbnail');
                if (index === 0) {
                    thumb.classList.add('active');
                }
                thumb.addEventListener('click', () => {
                    modalMainImage.src = imgSrc;
                    modalThumbnails.querySelectorAll('.modal-thumbnail').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                });
                modalThumbnails.appendChild(thumb);
            });

            modalAddToCartBtn.textContent = 'Buy Now';
            modalAddToCartBtn.onclick = () => {
                if (product.affiliateLink) {
                    window.open(product.affiliateLink, '_blank');
                } else {
                    alert('Affiliate link not available for this product.');
                }
            };

            modalViewFullDetailsBtn.dataset.id = productId;
            modalViewFullDetailsBtn.onclick = () => {
                quickViewModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                showProductDetailPage(productId);
            };

            quickViewModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    closeButton.addEventListener('click', () => {
        quickViewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (event) => {
        if (event.target === quickViewModal) {
            quickViewModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // --- Product Detail Page Logic ---
    const showProductDetailPage = (productId) => {
        const product = productsData.find(p => p.id == productId);

        if (product) {
            // Hide main sections and show detail page
            productsSection.style.display = 'none';
            document.querySelector('.page-header').style.display = 'none';
            document.querySelector('#featured').style.display = 'none';
            document.querySelector('.featured-categories').style.display = 'none';
            document.querySelector('.main-footer').style.display = 'none';

            productDetailPage.style.display = 'block';
            window.scrollTo(0, 0);

            detailProductName.textContent = product.name;
            detailProductPrice.dataset.usdPrice = product.priceUSD;
            detailProductPrice.textContent = formatPrice(product.priceUSD);
            detailProductLongDescription.textContent = product.longDescription;
            detailMainImage.src = product.images[0];

            detailAddToCartBtn.textContent = 'Buy Now';
            detailAddToCartBtn.dataset.id = product.id;
            detailAddToCartBtn.onclick = () => {
                if (product.affiliateLink) {
                    window.open(product.affiliateLink, '_blank');
                } else {
                    alert('Affiliate link not available for this product.');
                }
            };

            detailThumbnails.innerHTML = '';
            product.images.forEach((imgSrc, index) => {
                const thumb = document.createElement('img');
                thumb.src = imgSrc;
                thumb.alt = `${product.name} Thumbnail ${index + 1}`;
                thumb.classList.add('detail-thumbnail');
                if (index === 0) {
                    thumb.classList.add('active');
                }
                thumb.addEventListener('click', () => {
                    detailMainImage.src = imgSrc;
                    detailThumbnails.querySelectorAll('.detail-thumbnail').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                });
                detailThumbnails.appendChild(thumb);
            });

            // Show related products
            showRelatedProducts(product);
        }
    };

    const showRelatedProducts = (currentProduct) => {
        const relatedProductsGrid = document.querySelector('.related-products .gadget-grid');
        relatedProductsGrid.innerHTML = '';

        // Get products from the same featured category
        const relatedProducts = productsData
            .filter(p => p.id !== currentProduct.id && p.category.includes(currentFilter))
            .slice(0, 3);

        relatedProducts.forEach(product => {
            const card = createProductCard(product);
            relatedProductsGrid.appendChild(card);
        });

        // Re-attach event listeners for related products
        relatedProductsGrid.querySelectorAll('.btn-quick-view').forEach(button => {
            button.onclick = (event) => openQuickViewModal(event.target.dataset.id);
        });
        relatedProductsGrid.querySelectorAll('.btn-view-product').forEach(button => {
            button.onclick = (event) => showProductDetailPage(event.target.dataset.id);
        });
    };

    backToProductsBtn.addEventListener('click', () => {
        productDetailPage.style.display = 'none';
        productsSection.style.display = 'block';
        document.querySelector('.page-header').style.display = 'block';
        document.querySelector('#featured').style.display = 'block';
        document.querySelector('.featured-categories').style.display = 'block';
        document.querySelector('.main-footer').style.display = 'block';
        window.scrollTo(0, 0);
    });

    // --- Featured Category Filter Functionality ---
    document.querySelectorAll('.featured-category-buttons .filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            currentFilter = filter;
            currentPage = 1;

            document.querySelectorAll('.featured-category-buttons .filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            updateProductsTitle(filter);
            populateProductGrid(filter, searchInput.value, currentPage);
        });
    });

    // --- Featured Deal Button ---
    if (featuredAddToCartBtn) {
        featuredAddToCartBtn.addEventListener('click', () => {
            const productId = featuredAddToCartBtn.dataset.productId;
            const product = productsData.find(p => p.id == productId);
            if (product && product.affiliateLink) {
                window.open(product.affiliateLink, '_blank');
            } else {
                alert('Affiliate link not available for this product.');
            }
        });
    }

    // --- Price Toggle Functionality ---
    priceToggleBtn.addEventListener('click', () => {
        currentCurrency = currentCurrency === 'USD' ? 'INR' : 'USD';
        updateAllPrices();
    });

    // --- Initialize Page ---
    updateProductsTitle(currentFilter);
    populateProductGrid(currentFilter);
    updateAllPrices();
});

