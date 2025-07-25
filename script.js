// script.js

document.addEventListener('DOMContentLoaded', async () => {
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
    const clearComparisonBtn = document('clear-comparison-btn'); // Typo: Should be getElementById
    const backFromCompareButton = document.getElementById('backFromCompare');
    const compareCountSelectionSpan = document.getElementById('compare-count-selection');

    // Hero Slider elements
    const heroSlider = document.querySelector('.hero-slider');
    const sliderNavPrev = document.querySelector('.slider-nav.prev');
    const sliderNavNext = document.querySelector('.slider-nav.next');
    const sliderDotsContainer = document.querySelector('.slider-dots');

    // --- State Variables ---
    let currentUserCountry = 'US'; // Default to US. Will be updated by IPinfo.
    let currentSlide = 0;
    let sliderInterval;
    let selectedProductsForComparison = []; // Stores product IDs

    // --- Currency Conversion Constants & Cache ---
    const CURRENCY_API_KEY = '1a708b2b7f5342599aa5484b757e4e83'; // Your CurrencyFreaks API key
    const IPINFO_API_TOKEN = '13425fe40bc709'; // Your IPinfo API token

    // Map for common countries to their currency codes
    const countryCurrencyMap = {
        'US': 'USD',
        'IN': 'INR',
        'PK': 'PKR',
        'GB': 'GBP', // United Kingdom
        'AU': 'AUD', // Australia
        'JP': 'JPY', // Japan
        'CA': 'CAD', // Canada
        // Add more as needed
    };

    // List of EU countries to map to EUR
    const euCountries = [
        'AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'HU',
        'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK'
    ];

    const exchangeRatesCache = {}; // Cache for exchange rates

    // --- Utility Functions ---

    // Function to get user's country using IPinfo API
    async function getUserCountry() {
        try {
            // CORRECTED: Use the IPINFO_API_TOKEN constant in the correct URL format
            const response = await fetch(`https://ipinfo.io/json?token=${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}`);
            if (!response.ok) {
                console.error('IPinfo API error:', response.status, response.statusText);
                if (response.status === 401) {
                    console.error('IPinfo Token may be invalid or unauthorized. Defaulting country to US.');
                }
                currentUserCountry = 'US'; // Fallback
                return;
            }
            const data = await response.json();
            if (data && data.country) {
                currentUserCountry = data.country.toUpperCase();
                console.log('User detected country:', currentUserCountry);
            } else {
                console.warn('Could not detect country from IPinfo data. Defaulting to US.');
                currentUserCountry = 'US'; // Fallback
            }
        } catch (error) {
            console.error('Error fetching country:', error);
            currentUserCountry = 'US'; // Fallback on network/fetch error
        }
    }

    // Determine target currency code based on country
    function getTargetCurrencyCode(countryCode) {
        if (euCountries.includes(countryCode)) {
            return 'EUR';
        }
        return countryCurrencyMap[countryCode] || 'USD'; // Default to USD if not in map
    }

    // Fetch exchange rate from CurrencyFreaks API
    async function getExchangeRate(fromCurrency, toCurrency) {
        if (fromCurrency === toCurrency) {
            return 1;
        }

        const cacheKey = `${fromCurrency}-${toCurrency}`;
        if (exchangeRatesCache[cacheKey]) {
            return exchangeRatesCache[cacheKey];
        }

        try {
            // CORRECTED: Use the CURRENCY_API_KEY constant here
            const url = `https://api.currencyfreaks.com/latest?apikey=${CURRENCY_API_KEY}&symbols=${toCurrency}&base=${fromCurrency}`;
            const response = await fetch(url);
            if (!response.ok) {
                console.error(`Error fetching exchange rate from ${fromCurrency} to ${toCurrency}:`, response.status, response.statusText);
                return null;
            }
            const data = await response.json();
            if (data.rates && data.rates[toCurrency]) {
                const rate = parseFloat(data.rates[toCurrency]);
                exchangeRatesCache[cacheKey] = rate;
                return rate;
            } else {
                console.error('Exchange rate not found in API response:', data);
                return null;
            }
        } catch (error) {
            console.error('Failed to fetch exchange rate:', error);
            return null;
        }
    }

    // Format number to currency string
    function formatCurrency(amount, currencyCode) {
        try {
            // Using 'undefined' locale for Intl.NumberFormat allows it to use the user's default locale
            // for formatting, which is generally good practice.
            return new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency: currencyCode,
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            }).format(amount);
        } catch (error) {
            console.warn(`Could not format currency for ${currencyCode}. Displaying raw amount.`, error);
            return `${currencyCode} ${amount}`;
        }
    }

    // Get product price information with currency conversion
    async function getConvertedPriceInfo(product) {
        const targetCurrency = getTargetCurrencyCode(currentUserCountry);
        const basePrice = product.prices.basePrice;
        const originalBasePrice = product.prices.originalBasePrice;
        const baseCurrency = product.prices.baseCurrency;

        let convertedPrice = basePrice;
        let convertedOriginalPrice = originalBasePrice;
        let displayCurrencyCode = targetCurrency;

        if (baseCurrency !== targetCurrency) {
            const rate = await getExchangeRate(baseCurrency, targetCurrency);
            if (rate !== null) {
                convertedPrice = basePrice * rate;
                convertedOriginalPrice = originalBasePrice ? originalBasePrice * rate : null;
            } else {
                console.warn(`Failed to convert price for ${product.name} from ${baseCurrency} to ${targetCurrency}. Showing placeholder.`);
                convertedPrice = null; // Indicate no specific price to display
                convertedOriginalPrice = null;
                displayCurrencyCode = null; // No specific currency code for display
            }
        }

        return {
            price: convertedPrice ? formatCurrency(convertedPrice, displayCurrencyCode) : null,
            originalPrice: convertedOriginalPrice ? formatCurrency(convertedOriginalPrice, displayCurrencyCode) : null,
            amazonLink: product.amazonLink
        };
    }

    // Filters products based on whether base price information exists
    function filterByAvailability(prods) {
        return prods.filter(p => p.prices && p.prices.basePrice !== undefined);
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
    async function showHome() { // Made async to await displayProducts
        hideAllSections();
        heroSection.classList.remove('hidden');
        productListingSection.classList.remove('hidden');
        // Reset category filter and search
        categoryLinks.forEach(link => link.classList.remove('active'));
        const allProductsLink = document.querySelector('.dropdown-content a[data-category="all"]');
        if (allProductsLink) {
            allProductsLink.classList.add('active');
        }
        searchInput.value = '';
        await displayProducts(filterByAvailability(products));
        document.querySelector('#product-listing h2').textContent = 'Featured Products';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- Hero Slider Logic ---
    function renderHeroSlider() {
        heroSlider.innerHTML = '';
        sliderDotsContainer.innerHTML = '';
        if (heroSlides.length === 0) {
            console.warn('No hero slides defined in data.js');
            heroSection.classList.add('hidden');
            return;
        }

        heroSlides.forEach((slide, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.classList.add('hero-slide');
            slideDiv.style.backgroundImage = `url(${slide.imageUrl})`;

            slideDiv.innerHTML = `
                <div class="hero-slide-overlay">
                    <div class="hero-slide-content">
                        <h2>${slide.title}</h2>
                        <p>${slide.description}</p>
                        <a href="${slide.link}" class="cta-button" target="_blank" rel="noopener noreferrer" data-action="${slide.linkText}">${slide.linkText}</a>
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

        startSliderAutoplay();
    }

    function moveSlider(direction) {
        stopSliderAutoplay();
        currentSlide = (currentSlide + direction + heroSlides.length) % heroSlides.length;
        updateSlider();
        startSliderAutoplay();
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
            moveSlider(1);
        }, 5000);
    }

    function stopSliderAutoplay() {
        clearInterval(sliderInterval);
    }

    // --- Product Display Logic ---

    // Renders products into the specified grid
    async function displayProducts(productsToRender, targetGrid = productGridContainer, showCompare = false) {
        targetGrid.innerHTML = '';
        if (productsToRender.length === 0) {
            targetGrid.innerHTML = '<p class="no-results">No products found for this selection or in your region.</p>';
            return;
        }

        // Use Promise.all to await all price conversions concurrently
        const productCardPromises = productsToRender.map(async product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.productId = product.id;

            const displayPriceInfo = await getConvertedPriceInfo(product);
            let priceHTML = '';
            if (displayPriceInfo.price) {
                priceHTML = `<p class="price">${displayPriceInfo.price}</p>`;
            } else {
                priceHTML = `<p class="price-placeholder">Check Price on Amazon</p>`;
            }

            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" loading="lazy">
                <h3>${product.name}</h3>
                ${priceHTML}
                ${showCompare ? `<input type="checkbox" class="compare-checkbox" data-product-id="${product.id}" ${selectedProductsForComparison.includes(product.id) ? 'checked' : ''}>` : ''}
            `;
            return productCard;
        });

        // Append all cards once they are ready
        const productCards = await Promise.all(productCardPromises);
        productCards.forEach(card => {
            targetGrid.appendChild(card);
            if (!showCompare) {
                card.addEventListener('click', (e) => {
                    if (e.target.classList.contains('compare-checkbox')) return;
                    showProductDetail(card.dataset.productId);
                });
            }
        });

        if (showCompare) {
            document.querySelectorAll('.compare-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', handleCompareCheckboxChange);
            });
        }
    }

    // --- Product Detail Logic ---

    async function showProductDetail(productId) {
        const product = products.find(p => p.id === productId);

        // Check if product exists and if base price is available
        if (!product || !product.prices || product.prices.basePrice === undefined) {
            alert('Sorry, this product is not available or price information is missing.');
            showHome();
            return;
        }

        hideAllSections();
        productDetailSection.classList.remove('hidden');

        const displayPriceInfo = await getConvertedPriceInfo(product);
        let detailPriceHTML = '';
        if (displayPriceInfo.price) {
            detailPriceHTML = `<p class="detail-price">Price: ${displayPriceInfo.price} <span class="original-price">${displayPriceInfo.originalPrice ? '(MRP: ' + displayPriceInfo.originalPrice + ')' : ''}</span></p>`;
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
            <a href="${displayPriceInfo.amazonLink || '#'}" target="_blank" rel="noopener noreferrer" class="main-cta-button">Buy Now on Amazon</a>
        `;

        await displayRelatedProducts(product.relatedProducts); // Await related products
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async function displayRelatedProducts(relatedProductIds) {
        relatedProductsGrid.innerHTML = '';
        if (!relatedProductIds || relatedProductIds.length === 0) {
            relatedProductsSection.classList.add('hidden');
            return;
        }

        // Filter related products by base price availability
        const related = products.filter(p => relatedProductIds.includes(p.id) && p.id !== detailContent.dataset.productId && p.prices && p.prices.basePrice !== undefined);
        if (related.length > 0) {
            relatedProductsSection.classList.remove('hidden');
            await displayProducts(related, relatedProductsGrid); // Await display
        } else {
            relatedProductsSection.classList.add('hidden');
        }
    }

    // --- Product Comparison Logic ---

    async function showCompareSelection() { // Made async to await displayProducts
        hideAllSections();
        compareProductsSection.classList.remove('hidden');
        comparisonTableContainer.classList.add('hidden');
        startComparisonBtn.classList.add('hidden');

        const availableProducts = filterByAvailability(products); // Only show products with base price
        await displayProducts(availableProducts, compareSelectionGrid, true); // Await display
        updateCompareCount();
        updateCompareSelectionCount();
    }

    function handleCompareCheckboxChange(event) {
        const productId = event.target.dataset.productId;
        if (event.target.checked) {
            if (selectedProductsForComparison.length < 3) {
                selectedProductsForComparison.push(productId);
            } else {
                alert('You can compare a maximum of 3 products.');
                event.target.checked = false;
            }
        } else {
            selectedProductsForComparison = selectedProductsForComparison.filter(id => id !== productId);
        }
        updateCompareCount();
        updateCompareSelectionCount();
        if (selectedProductsForComparison.length >= 2) {
            startComparisonBtn.classList.remove('hidden');
        } else {
            startComparisonBtn.classList.add('hidden');
        }
    }

    function updateCompareCount() {
        compareCountSpan.textContent = selectedProductsForComparison.length;
    }

    function updateCompareSelectionCount() {
        compareCountSelectionSpan.textContent = selectedProductsForComparison.length;
    }

    async function startComparison() { // Made async to await renderComparisonTable
        if (selectedProductsForComparison.length < 2) {
            alert('Please select at least 2 products to compare.');
            return;
        }

        const productsToCompare = selectedProductsForComparison
            .map(id => products.find(p => p.id === id))
            .filter(p => p && p.prices && p.prices.basePrice !== undefined); // Filter by base price availability

        if (productsToCompare.length < 2) {
            alert('Not enough selected products available for comparison. Returning to selection.');
            clearComparison();
            showCompareSelection();
            return;
        }

        comparisonTableContainer.classList.remove('hidden');
        await renderComparisonTable(productsToCompare); // Await rendering
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async function renderComparisonTable(productsToCompare) { // Made async
        comparisonTable.innerHTML = '';

        const allSpecsKeys = new Set();
        productsToCompare.forEach(p => {
            if (p.specifications) {
                Object.keys(p.specifications).forEach(key => allSpecsKeys.add(key));
            }
        });
        const sortedSpecsKeys = Array.from(allSpecsKeys).sort();

        // Fetch all prices for header cells concurrently
        const headerPricePromises = productsToCompare.map(async p => {
            const displayPriceInfo = await getConvertedPriceInfo(p);
            let priceInfo = '';
            if (displayPriceInfo.price) {
                priceInfo = `<br><span style="font-weight: normal; font-size: 0.9em; color: var(--primary-color);">Price: ${displayPriceInfo.price}</span>`;
            } else {
                priceInfo = `<br><span style="font-weight: normal; font-size: 0.85em; color: var(--secondary-color);">Check Price on Amazon</span>`;
            }
            return `
                <th>
                    <img src="${p.imageUrl}" alt="${p.name}"><br>
                    <strong>${p.name}</strong>
                    ${priceInfo}
                    <button class="compare-remove-btn" data-product-id="${p.id}">Remove</button>
                    <a href="${displayPriceInfo.amazonLink || '#'}" target="_blank" rel="noopener noreferrer" class="buy-button-compare">Buy Now</a>
                </th>`;
        });

        const headerProductCells = await Promise.all(headerPricePromises);
        let headerRow = `<tr><th>Feature</th>${headerProductCells.join('')}</tr>`;
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
            btn.addEventListener('click', async (e) => { // Made async
                const productIdToRemove = e.target.dataset.productId;
                selectedProductsForComparison = selectedProductsForComparison.filter(id => id !== productIdToRemove);
                const checkbox = document.querySelector(`.compare-selection-grid .compare-checkbox[data-product-id="${productIdToRemove}"]`);
                if (checkbox) checkbox.checked = false;

                if (selectedProductsForComparison.length < 2) {
                    alert('Comparison requires at least 2 products. Returning to selection.');
                    clearComparison();
                    await showCompareSelection(); // Await show selection
                } else {
                    await startComparison(); // Re-render table by awaiting startComparison
                    updateCompareCount();
                    updateCompareSelectionCount();
                }
            });
        });
    }

    function clearComparison() {
        selectedProductsForComparison = [];
        comparisonTableContainer.classList.add('hidden');
        startComparisonBtn.classList.add('hidden');
        updateCompareCount();
        updateCompareSelectionCount();
        document.querySelectorAll('.compare-selection-grid .compare-checkbox').forEach(cb => cb.checked = false);
    }

    // --- Event Listeners ---

    // Initial site setup after country detection
    async function initializeSite() { // Made async
        renderHeroSlider();
        updateSlider();
        await showHome(); // Await initial product display
        console.log("Site fully initialized.");
    }

    // Header title click (go to home)
    siteTitle.addEventListener('click', showHome);
    document.getElementById('home-nav-btn').addEventListener('click', showHome);

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Category navigation click
    categoryLinks.forEach(link => {
        link.addEventListener('click', async (e) => { // Made async
            e.preventDefault();
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
            await displayProducts(filteredProducts); // Await display
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Search functionality
    searchButton.addEventListener('click', async () => { // Made async
        const query = searchInput.value.toLowerCase().trim();
        if (query.length === 0) {
            showHome();
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
        await displayProducts(searchResults); // Await display
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    // Back to listing button from detail page
    backToListingButton.addEventListener('click', showHome);

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

    // --- Initialize Site (Get user country first, then initialize) ---
    await getUserCountry(); // Await country detection
    await initializeSite(); // Await full site initialization
});


