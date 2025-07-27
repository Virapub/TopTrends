Document.addEventListener('DOMContentLoaded', () => {
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
    let currentFilter = 'all';
    let currentPage = 1;
    const productsPerPage = 12;

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
    const filterButtons = document.querySelectorAll('.filter-btn');
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

    // Function to filter products
    const getFilteredProducts = (filter = 'all', searchTerm = '') => {
        let filtered = productsData;

        // Apply category filter
        if (filter !== 'all') {
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
    const populateProductGrid = (filter = 'all', searchTerm = '', page = 1) => {
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
                    <p>Try adjusting your search or filter criteria.</p>
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

    // Function to create category filter buttons
    const createCategoryFilters = () => {
        const filterContainer = document.querySelector('.filter-buttons');
        filterContainer.innerHTML = '';

        productCategories.forEach(category => {
            const button = document.createElement('button');
            button.className = `btn filter-btn ${category.id === 'all' ? 'active' : ''}`;
            button.dataset.filter = category.id;
            button.innerHTML = `${category.icon} ${category.name}`;
            filterContainer.appendChild(button);
        });

        // Attach event listeners to new filter buttons
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                currentFilter = filter;
                currentPage = 1;

                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                populateProductGrid(filter, searchInput.value, currentPage);
            });
        });
    };

    // --- Header and Navigation ---
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            document.addEventListener('click', closeMobileNavOutside);
        } else {
            document.removeEventListener('click', closeMobileNavOutside);
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.removeEventListener('click', closeMobileNavOutside);
            }
        });
    });

    function closeMobileNavOutside(event) {
        if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
            navLinks.classList.remove('active');
            document.removeEventListener('click', closeMobileNavOutside);
        }
    }

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
            document.getElementById('featured').style.display = 'none';
            document.querySelector('.counters-section').style.display = 'none';
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

    // Function to show related products
    const showRelatedProducts = (currentProduct) => {
        const relatedContainer = document.querySelector('.related-products .gadget-grid');
        relatedContainer.innerHTML = '';

        // Get products from the same category (excluding current product)
        const relatedProducts = productsData
            .filter(p => p.id !== currentProduct.id)
            .filter(p => {
                const currentCategories = currentProduct.category.split(' ');
                const productCategories = p.category.split(' ');
                return currentCategories.some(cat => productCategories.includes(cat));
            })
            .slice(0, 4); // Show only 4 related products

        relatedProducts.forEach(product => {
            const card = createProductCard(product);
            relatedContainer.appendChild(card);
        });

        // Re-attach event listeners for related products
        relatedContainer.querySelectorAll('.btn-quick-view').forEach(button => {
            button.onclick = (event) => openQuickViewModal(event.target.dataset.id);
        });
        relatedContainer.querySelectorAll('.btn-view-product').forEach(button => {
            button.onclick = (event) => showProductDetailPage(event.target.dataset.id);
        });
    };

    backToProductsBtn.addEventListener('click', () => {
        productDetailPage.style.display = 'none';
        productsSection.style.display = 'block';
        document.getElementById('featured').style.display = 'block';
        document.querySelector('.counters-section').style.display = 'block';
        document.querySelector('.main-footer').style.display = 'block';

        window.scrollTo(0, productsSection.offsetTop);
    });

    // Handle "Grab the Deal!" for Featured Product
    if (featuredAddToCartBtn) {
        featuredAddToCartBtn.addEventListener('click', () => {
            const featuredProductId = featuredAddToCartBtn.dataset.productId;
            const featuredProduct = productsData.find(p => p.id == featuredProductId);
            if (featuredProduct && featuredProduct.affiliateLink) {
                window.open(featuredProduct.affiliateLink, '_blank');
            } else {
                alert('Affiliate link not available for the featured product.');
            }
        });
    }

    // --- Currency Toggle ---
    priceToggleBtn.addEventListener('click', () => {
        currentCurrency = currentCurrency === 'USD' ? 'INR' : 'USD';
        updateAllPrices();
    });

    // --- Animated Counters ---
    let countersAnimated = false;
    const animateCounter = (counter) => {
        const target = +counter.dataset.target;
        const speed = 200;
        const increment = target / speed;

        let current = 0;
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 10);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    };

    const handleCountersAnimation = () => {
        if (!countersAnimated && countersSection) {
            const rect = countersSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                countersAnimated = true;
                counters.forEach(counter => animateCounter(counter));
            }
        }
    };

    window.addEventListener('scroll', handleCountersAnimation);

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Initialize the page ---
    const initializePage = () => {
        createCategoryFilters();
        populateProductGrid('all', '', 1);
        updateAllPrices();
        
        // Set featured product data
        if (featuredAddToCartBtn && productsData.length > 0) {
            // Use the first product as featured (you can change this logic)
            const featuredProduct = productsData.find(p => p.id === 2); // Quantum Leap Earbuds
            if (featuredProduct) {
                featuredAddToCartBtn.dataset.productId = featuredProduct.id;
                if (featuredDiscountPrice) {
                    featuredDiscountPrice.dataset.usdPrice = featuredProduct.priceUSD;
                    featuredDiscountPrice.textContent = formatPrice(featuredProduct.priceUSD);
                }
                if (featuredOriginalPrice) {
                    const originalPrice = featuredProduct.priceUSD * 1.5; // 50% discount
                    featuredOriginalPrice.dataset.usdPrice = originalPrice;
                    featuredOriginalPrice.textContent = formatPrice(originalPrice);
                }
            }
        }
    };

    // Initialize the page when DOM is loaded
    initializePage();
}); 
