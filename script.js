document.addEventListener('DOMContentLoaded', () => {
    // Show loading spinner
    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.style.opacity = '1';

    // Simulate content loading for the spinner
    setTimeout(() => {
        loadingSpinner.style.opacity = '0';
        loadingSpinner.style.display = 'none';
    }, 1000); // Spinner visible for 1 second

    // --- Global Variables ---
    let currentCurrency = 'USD'; // Default currency
    const USD_SYMBOL = '$';
    const INR_SYMBOL = '₹';

    // --- DOM Elements ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.main-header');
    const quickViewModal = document.getElementById('quickViewModal');
    const closeButton = quickViewModal.querySelector('.close-button');
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductDescription = document.getElementById('modal-product-description');
    const modalProductPrice = document.getElementById('modal-product-price');
    const modalMainImage = document.getElementById('modal-main-image');
    const modalThumbnails = document.querySelector('.modal-thumbnails');
    const modalAddToCartBtn = quickViewModal.querySelector('.add-to-cart'); // Get modal's Add to Cart button
    const gadgetGrid = document.getElementById('gadgetGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const counters = document.querySelectorAll('.counter');
    const countersSection = document.querySelector('.counters-section');
    const exploreMoreBtn = document.getElementById('exploreMoreBtn');
    const heroSection = document.querySelector('.hero-section');
    const reviewForm = document.getElementById('review-form');
    const submittedReviewsContainer = document.getElementById('submitted-reviews');
    const priceToggleBtn = document.getElementById('priceToggleBtn');

    // Product Detail Page Elements
    const productDetailPage = document.getElementById('productDetailPage');
    const productsSection = document.getElementById('products-section'); // The main product grid section
    const backToProductsBtn = document.getElementById('backToProductsBtn');
    const detailMainImage = document.getElementById('detail-main-image');
    const detailThumbnails = document.getElementById('detail-thumbnails');
    const detailProductName = document.getElementById('detail-product-name');
    const detailProductPrice = document.getElementById('detail-product-price');
    const detailProductLongDescription = document.getElementById('detail-product-long-description');
    const detailAddToCartBtn = document.getElementById('detailAddToCartBtn'); // Get detail page's Add to Cart button
    const modalViewFullDetailsBtn = document.getElementById('modalViewFullDetailsBtn');
    const featuredDiscountPrice = document.querySelector('.featured-gadget-card .discount-price');
    const featuredOriginalPrice = document.querySelector('.featured-gadget-card .original-price');
    const featuredAddToCartBtn = document.querySelector('.add-to-cart-featured');

    // --- NEW: Products to showcase on homepage ---
    // Yahan un products ki IDs dalein jinhein aap homepage par dikhana chahte hain.
    // Aap apni pasand ke hisaab se IDs badal sakte hain.
    const showcaseProductIds = [1, 2, 4, 6]; // Example: FlexiScreen Pro, Aura Mood Lamp, PetPal Companion, Smart AeroGarden
    // Agar aap randomly products dikhana chahte hain, toh yeh logic change kar sakte hain.

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
        card.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price" data-usd-price="${product.priceUSD}">${formatPrice(product.priceUSD)}</p>
            <p class="short-desc">${product.shortDescription}</p>
            <button class="btn btn-secondary btn-quick-view" data-id="${product.id}">Quick View</button>
            <button class="btn btn-primary btn-view-product" data-id="${product.id}">View Product</button>
        `;
        return card;
    };

    // --- MODIFIED: Function to populate the product grid (only showcase products) ---
    const populateProductGrid = (filter = 'all') => {
        gadgetGrid.innerHTML = ''; // Clear existing cards
        
        // Filter products based on showcaseProductIds for the initial load
        const productsToDisplay = productsData.filter(product => showcaseProductIds.includes(product.id));

        productsToDisplay.forEach(product => {
            const card = createProductCard(product);
            // Apply initial filter if any specific filter is active on load (though usually 'all' for homepage)
            const categories = card.dataset.category.split(' ');
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
            gadgetGrid.appendChild(card);
        });

        // Re-attach event listeners for newly created buttons
        attachProductButtonListeners();
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


    // --- Product Quick-View Modal ---
    const openQuickViewModal = (productId) => {
        const product = productsData.find(p => p.id == productId);

        if (product) {
            modalProductName.textContent = product.name;
            modalProductDescription.textContent = product.shortDescription; // Quick view shows short description
            modalProductPrice.dataset.usdPrice = product.priceUSD; // Store USD price
            modalProductPrice.textContent = formatPrice(product.priceUSD); // Display formatted price
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

            // Set up "Buy Now" button for Quick View modal
            modalAddToCartBtn.textContent = 'Buy Now';
            modalAddToCartBtn.onclick = () => {
                if (product.affiliateLink) {
                    window.open(product.affiliateLink, '_blank'); // Open affiliate link in new tab
                } else {
                    alert('Affiliate link not available for this product.');
                }
            };

            // Set product ID for "View Full Details" button in modal
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
            document.getElementById('featured').style.display = 'none'; // Hide featured section too
            document.getElementById('testimonials').style.display = 'none';
            document.querySelector('.video-section').style.display = 'none';
            document.querySelector('.review-submission-section').style.display = 'none';
            document.querySelector('.counters-section').style.display = 'none';


            productDetailPage.style.display = 'block';
            window.scrollTo(0, 0); // Scroll to top of the page

            detailProductName.textContent = product.name;
            detailProductPrice.dataset.usdPrice = product.priceUSD; // Store USD price
            detailProductPrice.textContent = formatPrice(product.priceUSD); // Display formatted price
            detailProductLongDescription.textContent = product.longDescription;
            detailMainImage.src = product.images[0];

            // Set up "Buy Now" button for Product Detail Page
            detailAddToCartBtn.textContent = 'Buy Now'; // Change button text
            detailAddToCartBtn.dataset.id = product.id; // Store product ID
            detailAddToCartBtn.onclick = () => { // Attach click handler
                if (product.affiliateLink) {
                    window.open(product.affiliateLink, '_blank'); // Open affiliate link in new tab
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
        }
    };

    backToProductsBtn.addEventListener('click', () => {
        productDetailPage.style.display = 'none';
        productsSection.style.display = 'block';
        document.getElementById('featured').style.display = 'block'; // Show featured section again
        document.getElementById('testimonials').style.display = 'block';
        document.querySelector('.video-section').style.display = 'block';
        document.querySelector('.review-submission-section').style.display = 'block';
        document.querySelector('.counters-section').style.display = 'block';

        window.scrollTo(0, productsSection.offsetTop); // Scroll to products section
    });

    // Handle "Grab the Deal!" for Featured Product
    featuredAddToCartBtn.addEventListener('click', () => {
        const featuredProductId = featuredAddToCartBtn.dataset.productId;
        const featuredProduct = productsData.find(p => p.id == featuredProductId);
        if (featuredProduct && featuredProduct.affiliateLink) {
            window.open(featuredProduct.affiliateLink, '_blank'); // Open affiliate link in new tab
        } else {
            alert('Affiliate link not available for the featured product.');
        }
    });


    // --- MODIFIED: Interactive Filters (now filters only the showcased products) ---
    // If you want filter buttons to show ALL products, you'll need a separate "All Products" page
    // or modify this logic to load all products when a filter is clicked, and then hide them again
    // when returning to the homepage. For simplicity, this currently filters only the showcased ones.
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter only the *currently displayed* products
            document.querySelectorAll('.gadget-card').forEach(card => {
                const categories = card.dataset.category.split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
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
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        updateCounter();
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                counters.forEach(animateCounter);
                countersAnimated = true;
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(countersSection);

    // --- Sticky Call-to-Action Button ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > heroSection.offsetHeight / 2) {
            exploreMoreBtn.classList.add('show');
        } else {
            exploreMoreBtn.classList.remove('show');
        }
    });

    // --- Simple Review Submission Form (Client-side display) ---
    reviewForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const reviewerName = document.getElementById('reviewer-name').value;
        const reviewGadget = document.getElementById('review-gadget').value;
        const reviewText = document.getElementById('review-text').value;
        const reviewRating = document.getElementById('review-rating').value;

        if (reviewerName && reviewGadget && reviewText && reviewRating) {
            const newReviewCard = document.createElement('div');
            newReviewCard.classList.add('submitted-review-card');
            newReviewCard.innerHTML = `
                <h4>${reviewerName} - Reviewed: ${reviewGadget}</h4>
                <p class="rating">Rating: ${'⭐'.repeat(parseInt(reviewRating))}</p>
                <p>"${reviewText}"</p>
            `;
            submittedReviewsContainer.prepend(newReviewCard);

            reviewForm.reset();
        } else {
            alert('Please fill in all review fields!');
        }
    });

    // --- Price Toggle Button ---
    priceToggleBtn.addEventListener('click', () => {
        currentCurrency = currentCurrency === 'USD' ? 'INR' : 'USD';
        updateAllPrices();
    });


    // Initial population of products (only showcase products) and price update
    populateProductGrid(); // This will now only display products from showcaseProductIds
    updateAllPrices(); // Ensure prices are correct on load, especially for featured product
});
