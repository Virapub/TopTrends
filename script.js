// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const siteTitle = document.querySelector('.site-title');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const categoryLinks = document.querySelectorAll('.dropdown-content a');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const productGridContainer = document.getElementById('product-grid');
    const heroSection = document.getElementById('hero-section');
    const productListingSection = document.getElementById('product-listing');
    const productDetailSection = document.getElementById('product-detail');
    const detailContent = document.getElementById('detail-content');
    const backToListingButton = document.getElementById('backToListing');
    const relatedProductsSection = document.getElementById('related-products-section');
    const relatedProductsGrid = document.getElementById('related-products-grid');

    // Comparison elements
    const comparePageButton = document.getElementById('compare-page-btn');
    const compareProductsSection = document.getElementById('compare-products-section');
    const compareSelectionGrid = document.getElementById('compare-selection-grid');
    const compareCountSpan = document.getElementById('compare-count');
    const startComparisonBtn = document.getElementById('start-comparison-btn');
    const comparisonTableContainer = document.getElementById('comparison-table-container');
    const comparisonTable = document.getElementById('comparison-table');
    const clearComparisonBtn = document.getElementById('clear-comparison-btn');
    const backFromCompareButton = document.getElementById('backFromCompare');

    // Hero Slider elements
    const heroSlider = document.querySelector('.hero-slider');
    const sliderNavPrev = document.querySelector('.slider-nav.prev');
    const sliderNavNext = document.querySelector('.slider-nav.next');
    const sliderDotsContainer = document.querySelector('.slider-dots');

    // --- State Variables ---
    let currentUserCountry = 'IN'; // Default to India. Will be updated by IPinfo.
    let currentSlide = 0;
    let sliderInterval;
    let selectedProductsForComparison = []; // Stores product IDs

    // --- Utility Functions ---

    // Function to get user's country using IPinfo API
    async function getUserCountry() {
        try {
            // Replace 'YOUR_IPINFO_TOKEN' with your actual IPinfo API token
            const response = await fetch('https://api.ipinfo.io/lite/8.8.8.8?token=13425fe40bc709');
            const data = await response.json();curl https://api.ipinfo.io/lite/8.8.8.8?token=13425fe40bc709
            if (data && data.country) {
                currentUserCountry = data.country;
                console.log('User detected country:', currentUserCountry);
            }
        } catch (error) {
            console.error('Error fetching country:', error);
            // Fallback to default userCountry if API call fails
        }
        // After getting country, initialize the site
        initializeSite();
    }

    // Filters products based on user's country availability
    function filterByAvailability(prods) {
        if (currentUserCountry === 'IN') {
            return prods.filter(p => p.availability === 'India' || p.availability === 'Global');
        } else {
            return prods.filter(p => p.availability === 'Global');
        }
    }

    // --- UI Management Functions ---

    // Hides all main sections
    function hideAllSections() {
        heroSection.classList.add('hidden');
        productListingSection.classList.add('hidden');
        productDetailSection.classList.add('hidden');
        compareProductsSection.classList.add('hidden');
        mainNav.classList.remove('active'); // Hide mobile menu
    }

    // Shows the hero and product listing sections
    function showHome() {
        hideAllSections();
        heroSection.classList.remove('hidden');
        productListingSection.classList.remove('hidden');
        // Reset category filter and search
        categoryLinks.forEach(link => link.classList.remove('active'));
        document.querySelector('.dropdown-content a[data-category="all"]').classList.add('active');
        searchInput.value = '';
        displayProducts(filterByAvailability(products));
        document.querySelector('#product-listing h2').textContent = 'Featured Products';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- Hero Slider Logic ---
    function renderHeroSlider() {
        heroSlider.innerHTML = '';
        sliderDotsContainer.innerHTML = '';
        heroSlides.forEach((slide, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.classList.add('hero-slide');
            slideDiv.style.backgroundImage = `url(${slide.imageUrl})`;

            slideDiv.innerHTML = `
                <div class="hero-slide-overlay">
                    <div class="hero-slide-content">
                        <h2>${slide.title}</h2>
                        <p>${slide.description}</p>
                        <a href="${slide.link}" class="cta-button" data-action="${slide.linkText}">${slide.linkText}</a>
                    </div>
                </div>
            `;
            heroSlider.appendChild(slideDiv);

            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.slideIndex = index;
            sliderDotsContainer.appendChild(dot);
        });

        startSliderAutoplay(); // Start autoplay after rendering
    }

    function moveSlider(direction) {
        stopSliderAutoplay(); // Stop autoplay during manual navigation
        currentSlide = (currentSlide + direction + heroSlides.length) % heroSlides.length;
        updateSlider();
        startSliderAutoplay(); // Restart autoplay
    }

    function updateSlider() {
        const offset = -currentSlide * 100;
        heroSlider.style.transform = `translateX(${offset}%)`;

        document.querySelectorAll('.slider-dots .dot').forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function startSliderAutoplay() {
        clearInterval(sliderInterval);
        sliderInterval = setInterval(() => {
            moveSlider(1); // Move to next slide
        }, 5000); // Change slide every 5 seconds
    }

    function stopSliderAutoplay() {
        clearInterval(sliderInterval);
    }

    // --- Product Display Logic ---

    // Renders products into the specified grid
    function displayProducts(productsToRender, targetGrid = productGridContainer, showCompare = false) {
        targetGrid.innerHTML = '';
        if (productsToRender.length === 0) {
            targetGrid.innerHTML = '<p class="no-results">No products found for this selection.</p>';
            return;
        }

        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.productId = product.id;

            let priceHTML = '';
            if (currentUserCountry === 'IN') {
                priceHTML = `<p class="price">${product.price}</p>`;
            } else {
                priceHTML = `<p class="price-placeholder">Check Price on Amazon</p>`;
            }

            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" loading="lazy">
                <h3>${product.name}</h3>
                ${priceHTML}
                ${showCompare ? `<input type="checkbox" class="compare-checkbox" data-product-id="${product.id}" ${selectedProductsForComparison.includes(product.id) ? 'checked' : ''}>` : ''}
            `;
            targetGrid.appendChild(productCard);

            // Add click listener for product details
            if (!showCompare) { // Only add click for details if not in compare selection mode
                productCard.addEventListener('click', (e) => {
                    // Prevent detail page if compare checkbox is clicked
                    if (e.target.classList.contains('compare-checkbox')) return;
                    showProductDetail(product.id);
                });
            }
        });

        // Add event listeners for compare checkboxes if shown
        if (showCompare) {
            document.querySelectorAll('.compare-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', handleCompareCheckboxChange);
            });
        }
    }

    // --- Product Detail Logic ---

    function showProductDetail(productId) {
        const product = products.find(p => p.id === productId);

        if (!product || !filterByAvailability([product]).length) {
            alert('Sorry, this product is not available in your region.');
            showHome();
            return;
        }

        hideAllSections();
        productDetailSection.classList.remove('hidden');

        let detailPriceHTML = '';
        if (currentUserCountry === 'IN') {
            detailPriceHTML = `<p class="detail-price">Price: ${product.price} <span class="original-price">${product.originalPrice ? '(MRP: ' + product.originalPrice + ')' : ''}</span></p>`;
        } else {
            detailPriceHTML = `<p class="detail-price-placeholder">Click 'Buy Now' to see current price on Amazon.</p>`;
        }

        let specsHTML = '';
        if (product.specifications && Object.keys(product.specifications).length > 0) {
            specsHTML = `
                <h4>Specifications</h4>
                <table class="detail-specs">
                    ${Object.entries(product.specifications).map(([key, value]) => `
                        <tr>
                            <th>${key}</th>
                            <td>${value}</td>
                        </tr>
                    `).join('')}
                </table>
            `;
        }

        detailContent.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" class="main-image">
            <h2>${product.name}</h2>
            ${detailPriceHTML}
            <p class="detail-description">${product.description}</p>
            ${specsHTML}
            <a href="${product.amazonLink || '#'}" target="_blank" rel="noopener noreferrer" class="main-cta-button">Buy Now on Amazon</a>
        `;

        // Display Related Products
        displayRelatedProducts(product.relatedProducts);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function displayRelatedProducts(relatedProductIds) {
        relatedProductsGrid.innerHTML = '';
        if (!relatedProductIds || relatedProductIds.length === 0) {
            relatedProductsSection.classList.add('hidden');
            return;
        }

        const related = products.filter(p => relatedProductIds.includes(p.id) && p.id !== detailContent.dataset.productId && filterByAvailability([p]).length);
        if (related.length > 0) {
            relatedProductsSection.classList.remove('hidden');
            displayProducts(related, relatedProductsGrid);
        } else {
            relatedProductsSection.classList.add('hidden');
        }
    }

    // --- Product Comparison Logic ---

    function showCompareSelection() {
        hideAllSections();
        compareProductsSection.classList.remove('hidden');
        comparisonTableContainer.classList.add('hidden');
        startComparisonBtn.classList.add('hidden');

        const availableProducts = filterByAvailability(products);
        displayProducts(availableProducts, compareSelectionGrid, true); // True to show checkboxes
        updateCompareCount();
    }

    function handleCompareCheckboxChange(event) {
        const productId = event.target.dataset.productId;
        if (event.target.checked) {
            if (selectedProductsForComparison.length < 3) {
                selectedProductsForComparison.push(productId);
            } else {
                alert('You can compare a maximum of 3 products.');
                event.target.checked = false; // Uncheck if limit reached
            }
        } else {
            selectedProductsForComparison = selectedProductsForComparison.filter(id => id !== productId);
        }
        updateCompareCount();
        if (selectedProductsForComparison.length >= 2) {
            startComparisonBtn.classList.remove('hidden');
        } else {
            startComparisonBtn.classList.add('hidden');
        }
    }

    function updateCompareCount() {
        compareCountSpan.textContent = selectedProductsForComparison.length;
    }

    function startComparison() {
        if (selectedProductsForComparison.length < 2) {
            alert('Please select at least 2 products to compare.');
            return;
        }

        const productsToCompare = selectedProductsForComparison.map(id => products.find(p => p.id === id)).filter(p => p);

        if (productsToCompare.length < 2) {
            alert('Selected products could not be found for comparison.');
            return;
        }

        comparisonTableContainer.classList.remove('hidden');
        renderComparisonTable(productsToCompare);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderComparisonTable(productsToCompare) {
        comparisonTable.innerHTML = '';

        // Extract all unique specifications
        const allSpecsKeys = new Set();
        productsToCompare.forEach(p => {
            if (p.specifications) {
                Object.keys(p.specifications).forEach(key => allSpecsKeys.add(key));
            }
        });
        const sortedSpecsKeys = Array.from(allSpecsKeys).sort();

        // Table Header
        let headerRow = '<tr><th>Feature</th>';
        productsToCompare.forEach(p => {
            let priceInfo = '';
            if (currentUserCountry === 'IN') {
                priceInfo = `<br><span style="font-weight: normal; font-size: 0.9em; color: var(--primary-color);">Price: ${p.price}</span>`;
            } else {
                priceInfo = `<br><span style="font-weight: normal; font-size: 0.85em; color: var(--secondary-color);">Check Price on Amazon</span>`;
            }
            headerRow += `
                <th>
                    <img src="${p.imageUrl}" alt="${p.name}"><br>
                    <strong>${p.name}</strong>
                    ${priceInfo}
                    <button class="compare-remove-btn" data-product-id="${p.id}">Remove</button>
                    <a href="${p.amazonLink || '#'}" target="_blank" rel="noopener noreferrer" class="buy-button-compare">Buy Now</a>
                </th>`;
        });
        headerRow += '</tr>';
        comparisonTable.innerHTML += `<thead>${headerRow}</thead>`;

        // Table Body
        let bodyHTML = '<tbody>';
        sortedSpecsKeys.forEach(specKey => {
            let row = `<tr><th>${specKey}</th>`;
            productsToCompare.forEach(p => {
                row += `<td>${p.specifications?.[specKey] || 'N/A'}</td>`;
            });
            row += '</tr>';
            bodyHTML += row;
        });
        bodyHTML += '</tbody>';
        comparisonTable.innerHTML += bodyHTML;

        // Add event listeners to remove buttons in the table
        document.querySelectorAll('.compare-remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productIdToRemove = e.target.dataset.productId;
                selectedProductsForComparison = selectedProductsForComparison.filter(id => id !== productIdToRemove);
                // Also uncheck the checkbox on the selection grid
                const checkbox = document.querySelector(`.compare-selection-grid .compare-checkbox[data-product-id="${productIdToRemove}"]`);
                if (checkbox) checkbox.checked = false;
                
                if (selectedProductsForComparison.length < 2) {
                    alert('Comparison requires at least 2 products. Returning to selection.');
                    clearComparison();
                    showCompareSelection(); // Go back to selection if less than 2
                } else {
                    startComparison(); // Re-render table
                    updateCompareCount();
                }
            });
        });
    }

    function clearComparison() {
        selectedProductsForComparison = [];
        comparisonTableContainer.classList.add('hidden');
        startComparisonBtn.classList.add('hidden');
        updateCompareCount();
        // Uncheck all checkboxes
        document.querySelectorAll('.compare-selection-grid .compare-checkbox').forEach(cb => cb.checked = false);
    }

    // --- Event Listeners ---

    // Initial site setup after country detection
    function initializeSite() {
        renderHeroSlider();
        updateSlider(); // Initial display of the first slide
        showHome(); // Show initial product listing
    }

    // Header title click (go to home)
    siteTitle.addEventListener('click', showHome);

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Category navigation click
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            hideAllSections();
            productListingSection.classList.remove('hidden');

            categoryLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');

            const category = link.dataset.category;
            let filteredProducts;
            if (category === 'all') {
                filteredProducts = filterByAvailability(products);
                document.querySelector('#product-listing h2').textContent = 'Featured Products';
            } else {
                filteredProducts = filterByAvailability(products.filter(p => p.category === category));
                document.querySelector('#product-listing h2').textContent = link.textContent;
            }
            displayProducts(filteredProducts);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Search functionality
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query.length === 0) {
            showHome(); // Go back to home if search is empty
            return;
        }

        hideAllSections();
        productListingSection.classList.remove('hidden');
        document.querySelector('#product-listing h2').textContent = `Search Results for "${query}"`;

        const searchResults = filterByAvailability(products.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            (p.category && p.category.toLowerCase().includes(query))
        ));
        displayProducts(searchResults);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    // Back to listing button from detail page
    backToListingButton.addEventListener('click', showHome); // Changed to showHome to reset category/search

    // Slider navigation
    sliderNavPrev.addEventListener('click', () => moveSlider(-1));
    sliderNavNext.addEventListener('click', () => moveSlider(1));

    // Slider dots navigation
    sliderDotsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
            stopSliderAutoplay();
            currentSlide = parseInt(e.target.dataset.slideIndex);
            updateSlider();
            startSliderAutoplay();
        }
    });

    // Compare Page Buttons
    comparePageButton.addEventListener('click', showCompareSelection);
    startComparisonBtn.addEventListener('click', startComparison);
    clearComparisonBtn.addEventListener('click', clearComparison);
    backFromCompareButton.addEventListener('click', showHome);

    // --- Initialize Site (Get user country first) ---
    getUserCountry(); // This will kick off the entire site's initialization
});
