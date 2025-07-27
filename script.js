// script.js

Document.addEventListener('DOMContentLoaded', () => {
    // Show loading spinner
    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.style.opacity = '1';

    // Simulate content loading for the spinner
    setTimeout(() => {
        loadingSpinner.style.opacity = '0';
        loadingSpinner.style.display = 'none'; // Hide completely after fade
    }, 1000);

    // --- Global Variables ---
    let currentCurrency = 'USD';
    const USD_SYMBOL = '$';
    const INR_SYMBOL = '₹';
    const USD_TO_INR_RATE = 83.35; // Crucial: Define your conversion rate here!
    let currentFilter = 'all';
    let currentPage = 1;
    const productsPerPage = 12;

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
    // filterButtons are handled dynamically
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
    // Initial pagination content will be added by updatePagination


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
        let filtered = productsData; // productsData is now from data.js

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
            // Remove pagination if no products
            const existingPagination = document.querySelector('.pagination-container');
            if (existingPagination) {
                existingPagination.remove();
            }
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
    const updatePagination = (currentPageNum, totalPages, totalProducts) => {
        // Clear existing pagination to prevent duplicates
        const existingPagination = document.querySelector('.pagination-container');
        if (existingPagination) {
            existingPagination.remove();
        }

        if (totalPages > 1) {
            const productsSectionEl = document.getElementById('products-section');
            productsSectionEl.appendChild(paginationContainer); // Add the container

            // Set the inner HTML of the pagination container
            paginationContainer.innerHTML = `
                <div class="pagination">
                    <button id="prevPage" class="btn btn-secondary">Previous</button>
                    <span id="pageInfo">Page ${currentPageNum} of ${totalPages} (${totalProducts} products)</span>
                    <button id="nextPage" class="btn btn-secondary">Next</button>
                </div>
            `;

            const prevBtn = document.getElementById('prevPage');
            const nextBtn = document.getElementById('nextPage');
            const pageInfo = document.getElementById('pageInfo');

            pageInfo.textContent = `Page ${currentPageNum} of ${totalPages} (${totalProducts} products)`;

            prevBtn.disabled = currentPageNum === 1;
            nextBtn.disabled = currentPageNum === totalPages;

            prevBtn.onclick = () => {
                if (currentPageNum > 1) {
                    currentPage = currentPageNum - 1; // Update global currentPage
                    populateProductGrid(currentFilter, searchInput.value, currentPage);
                    window.scrollTo(0, productsSection.offsetTop); // Scroll to top of products
                }
            };

            nextBtn.onclick = () => {
                if (currentPageNum < totalPages) {
                    currentPage = currentPageNum + 1; // Update global currentPage
                    populateProductGrid(currentFilter, searchInput.value, currentPage);
                    window.scrollTo(0, productsSection.offsetTop); // Scroll to top of products
                }
            };
        } else {
            // No pagination needed if only one page or no products
            paginationContainer.innerHTML = '';
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

        productCategories.forEach(category => { // productCategories is now from data.js
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
                currentPage = 1; // Reset page to 1 when filter changes

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
        currentPage = 1; // Reset page to 1 when search changes
        populateProductGrid(currentFilter, searchTerm, currentPage);
    };

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Real-time search (optional, with debounce)
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch();
        }, 300); // 300ms debounce
    });

    // --- Product Quick-View Modal ---
    const openQuickViewModal = (productId) => {
        const product = productsData.find(p => p.id == productId); // productsData is from data.js

        if (product) {
            modalProductName.textContent = product.name;
            modalProductDescription.textContent = product.shortDescription;
            modalProductPrice.dataset.usdPrice = product.priceUSD; // Store USD price
            modalProductPrice.textContent = formatPrice(product.priceUSD);
            modalMainImage.src = product.images[0];
            modalMainImage.alt = product.name; // Add alt text

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

            // Update modal Add to Cart/Buy Now button
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
                document.body.style.overflow = 'auto'; // Re-enable scrolling
                showProductDetailPage(productId);
            };

            quickViewModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Disable background scrolling
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
        const product = productsData.find(p => p.id == productId); // productsData is from data.js

        if (product) {
            // Hide main sections and show detail page
            productsSection.style.display = 'none';
            document.getElementById('featured').style.display = 'none';
            // Only hide counters section if it exists, as it's optional in HTML
            if (countersSection) {
                countersSection.style.display = 'none';
            }
            document.querySelector('.main-footer').style.display = 'none';

            productDetailPage.style.display = 'block';
            window.scrollTo(0, 0); // Scroll to top of the page

            detailProductName.textContent = product.name;
            detailProductPrice.dataset.usdPrice = product.priceUSD; // Store USD price
            detailProductPrice.textContent = formatPrice(product.priceUSD);
            detailProductLongDescription.textContent = product.longDescription;
            detailMainImage.src = product.images[0];
            detailMainImage.alt = product.name; // Add alt text

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
        if (!relatedContainer) return; // Exit if related products section not found

        relatedContainer.innerHTML = '';

        // Get products from the same category (excluding current product)
        const relatedProducts = productsData // productsData is from data.js
            .filter(p => p.id !== currentProduct.id)
            .filter(p => {
                const currentCategories = currentProduct.category.split(' ');
                const productCategories = p.category.split(' ');
                // Check if any category of the current product matches any category of another product
                return currentCategories.some(cat => productCategories.includes(cat));
            })
            .slice(0, 4); // Show only 4 related products

        if (relatedProducts.length === 0) {
            relatedContainer.innerHTML = '<p style="text-align: center; color: var(--light-text-color);">No related products found.</p>';
            return;
        }

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
        if (countersSection) { // Check if it exists before trying to display
            countersSection.style.display = 'block';
        }
        document.querySelector('.main-footer').style.display = 'block';

        // Scroll back to the products section or top of the page
        window.scrollTo(0, productsSection.offsetTop || 0);
    });

    // Handle "Grab the Deal!" for Featured Product
    if (featuredAddToCartBtn) {
        featuredAddToCartBtn.addEventListener('click', () => {
            const featuredProductId = featuredAddToCartBtn.dataset.productId;
            const featuredProduct = productsData.find(p => p.id == featuredProductId); // productsData is from data.js
            if (featuredProduct && featuredProduct.affiliateLink) {
                window.open(featuredProduct.affiliateLink, '_blank');
            } else {
                alert('Affiliate link not available for the featured product.');
            }
        });
    }

    // --- Currency Toggle ---
    if (priceToggleBtn) { // Ensure button exists before attaching listener
        priceToggleBtn.addEventListener('click', () => {
            currentCurrency = currentCurrency === 'USD' ? 'INR' : 'USD';
            updateAllPrices();
        });
    }

    // --- Animated Counters ---
    let countersAnimated = false;
    const animateCounter = (counter) => {
        const target = +counter.dataset.target;
        const speed = 200; // Number of animation steps
        const increment = target / speed;

        let current = 0;
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter); // Use requestAnimationFrame for smoother animation
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    };

    const handleCountersAnimation = () => {
        if (countersSection && !countersAnimated) { // Check if section exists
            const rect = countersSection.getBoundingClientRect();
            // Trigger animation when the top of the counters section enters the viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                countersAnimated = true;
                counters.forEach(counter => animateCounter(counter));
            }
        }
    };

    window.addEventListener('scroll', handleCountersAnimation);
    // Also run on page load in case section is already in view
    handleCountersAnimation();


    // --- Smooth Scrolling for navigation links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') { // Handle cases where href is just '#'
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const target = document.querySelector(targetId);
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
        populateProductGrid('all', '', 1); // Load initial products

        // Set featured product data (Quantum Leap Earbuds - ID 2)
        const featuredProduct = productsData.find(p => p.id === 2); // productsData is from data.js
        if (featuredProduct && featuredAddToCartBtn) {
            featuredAddToCartBtn.dataset.productId = featuredProduct.id;
            // Update image source for the featured product if needed (already in HTML for now)
            document.querySelector('.featured-gadget-card img').src = featuredProduct.images[0];
            document.querySelector('.featured-gadget-card img').alt = featuredProduct.name;
            document.querySelector('.featured-gadget-card h3').textContent = featuredProduct.name;
            document.querySelector('.featured-gadget-card .description').textContent = featuredProduct.shortDescription;


            if (featuredDiscountPrice) {
                featuredDiscountPrice.dataset.usdPrice = featuredProduct.priceUSD;
                const originalPrice = 299.99; // Set based on your image example
                featuredOriginalPrice.dataset.usdPrice = originalPrice;

                // Update text content for featured prices
                featuredDiscountPrice.textContent = formatPrice(parseFloat(featuredDiscountPrice.dataset.usdPrice));
                featuredOriginalPrice.textContent = formatPrice(parseFloat(featuredOriginalPrice.dataset.usdPrice));
            }
        }
        updateAllPrices(); // Ensure all prices reflect the initial currency (USD)
    };

    // Initialize the page when DOM is loaded
    initializePage();
});
