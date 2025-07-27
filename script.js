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

    // --- Sample Product Data ---
    // In a real application, you'd fetch this from an API
    const productsData = [
        {
            id: 1,
            name: 'Aurora Smartwatch',
            shortDescription: 'Track your fitness and stay connected.',
            longDescription: 'The Aurora Smartwatch features a vibrant AMOLED display, 24/7 heart rate monitoring, sleep tracking, and GPS. With a battery life of up to 7 days, it\'s the perfect companion for your active lifestyle. Receive smart notifications, control music, and customize watch faces. Water-resistant design ensures durability.',
            category: 'wearables smartwatches',
            priceUSD: 149.99,
            images: [
                'https://via.placeholder.com/600x400/87CEEB/fff?text=Aurora+Smartwatch+1',
                'https://via.placeholder.com/600x400/ADD8E6/000?text=Aurora+Smartwatch+2',
                'https://via.placeholder.com/600x400/B0E0E6/000?text=Aurora+Smartwatch+3'
            ],
            affiliateLink: 'https://example.com/aurora-smartwatch'
        },
        {
            id: 2,
            name: 'Quantum Leap Earbuds',
            shortDescription: 'Immersive sound with active noise cancellation.',
            longDescription: 'Experience unparalleled audio with Quantum Leap Earbuds. Featuring advanced active noise cancellation, crystal-clear call quality, and a comfortable ergonomic design. With 8 hours of playback on a single charge and a portable charging case for up to 30 hours, your music never stops. Intuitive touch controls and seamless Bluetooth 5.2 connectivity.',
            category: 'audio earbuds',
            priceUSD: 199.99,
            images: [
                'https://via.placeholder.com/600x400/98FB98/000?text=Quantum+Leap+Earbuds+1',
                'https://via.placeholder.com/600x400/3CB371/fff?text=Quantum+Leap+Earbuds+2',
                'https://via.placeholder.com/600x400/2E8B57/fff?text=Quantum+Leap+Earbuds+3'
            ],
            affiliateLink: 'https://example.com/quantum-leap-earbuds'
        },
        {
            id: 3,
            name: 'Chrono Projector',
            shortDescription: 'Pocket-sized projector for big screens anywhere.',
            longDescription: 'The Chrono Projector is your portable cinema. Project up to a 120-inch screen with stunning clarity. Built-in battery provides 3 hours of video playback. Connect via HDMI, USB, or wirelessly stream from your phone. Perfect for movie nights, presentations, or gaming on the go. Compact and lightweight design.',
            category: 'home-tech projectors',
            priceUSD: 299.00,
            images: [
                'https://via.placeholder.com/600x400/DA70D6/fff?text=Chrono+Projector+1',
                'https://via.placeholder.com/600x400/EE82EE/000?text=Chrono+Projector+2'
            ],
            affiliateLink: 'https://example.com/chrono-projector'
        },
        {
            id: 4,
            name: 'Echo Drone',
            shortDescription: 'Capture breathtaking aerial footage effortlessly.',
            longDescription: 'The Echo Drone offers 4K video recording, intelligent flight modes, and a 25-minute flight time. Its foldable design makes it highly portable. Equipped with obstacle avoidance sensors and GPS for stable and safe flights. Ideal for hobbyists and professional content creators alike.',
            category: 'drones cameras',
            priceUSD: 499.50,
            images: [
                'https://via.placeholder.com/600x400/FFA07A/000?text=Echo+Drone+1',
                'https://via.placeholder.com/600x400/FF7F50/fff?text=Echo+Drone+2'
            ],
            affiliateLink: 'https://example.com/echo-drone'
        },
        {
            id: 5,
            name: 'Zenith Smart Scale',
            shortDescription: 'Comprehensive body analysis for better health.',
            longDescription: 'The Zenith Smart Scale measures weight, BMI, body fat, muscle mass, and more. Syncs with your smartphone via Bluetooth to track your progress over time. Supports multiple users, making it perfect for families. Sleek glass design with a large, easy-to-read LED display.',
            category: 'health home-tech',
            priceUSD: 79.99,
            images: [
                'https://via.placeholder.com/600x400/FFE4B5/000?text=Zenith+Smart+Scale+1'
            ],
            affiliateLink: 'https://example.com/zenith-smart-scale'
        },
        {
            id: 6,
            name: 'Vortex Portable Speaker',
            shortDescription: 'Powerful sound, rugged design, go anywhere.',
            longDescription: 'The Vortex Portable Speaker delivers rich, powerful sound in a compact, durable package. IPX7 waterproof rating means it can handle splashes and even submersion. 12 hours of playtime on a single charge. Built-in microphone for hands-free calls. Perfect for outdoor adventures.',
            category: 'audio speakers',
            priceUSD: 89.00,
            images: [
                'https://via.placeholder.com/600x400/87CEFA/000?text=Vortex+Speaker+1',
                'https://via.placeholder.com/600x400/6495ED/fff?text=Vortex+Speaker+2'
            ],
            affiliateLink: 'https://example.com/vortex-speaker'
        },
        {
            id: 7,
            name: 'Aether Gaming Mouse',
            shortDescription: 'Precision and speed for competitive gaming.',
            longDescription: 'The Aether Gaming Mouse features a high-precision optical sensor (up to 16,000 DPI), customizable RGB lighting, and 7 programmable buttons. Ergonomic design provides comfort during long gaming sessions. Durable switches rated for 50 million clicks. Braided cable for enhanced longevity.',
            category: 'gaming peripherals',
            priceUSD: 65.00,
            images: [
                'https://via.placeholder.com/600x400/F08080/fff?text=Aether+Gaming+Mouse+1',
                'https://via.placeholder.com/600x400/CD5C5C/000?text=Aether+Gaming+Mouse+2'
            ],
            affiliateLink: 'https://example.com/aether-mouse'
        },
        {
            id: 8,
            name: 'Nova Smart Bulb',
            shortDescription: 'Control your lighting with voice or app.',
            longDescription: 'The Nova Smart Bulb offers millions of colors and adjustable white light. Control it remotely with your smartphone app or integrate with smart home assistants like Alexa and Google Assistant. Schedule routines, set scenes, and enhance your home ambiance. Easy to install and energy-efficient.',
            category: 'home-tech smart-lighting',
            priceUSD: 25.00,
            images: [
                'https://via.placeholder.com/600x400/FFFACD/000?text=Nova+Smart+Bulb+1'
            ],
            affiliateLink: 'https://example.com/nova-bulb'
        },
        {
            id: 9,
            name: 'Spectra VR Headset',
            shortDescription: 'Dive into virtual worlds with stunning clarity.',
            longDescription: 'The Spectra VR Headset delivers an immersive virtual reality experience with high-resolution displays and a wide field of view. Integrated audio and comfortable head straps ensure long sessions. Compatible with a wide range of VR games and applications. Explore new dimensions of entertainment.',
            category: 'gaming VR',
            priceUSD: 399.00,
            images: [
                'https://via.placeholder.com/600x400/AFEEEE/000?text=Spectra+VR+Headset+1',
                'https://via.placeholder.com/600x400/7FFFD4/000?text=Spectra+VR+Headset+2'
            ],
            affiliateLink: 'https://example.com/spectra-vr'
        },
        {
            id: 10,
            name: 'Glyph Stylus Pen',
            shortDescription: 'Precision input for tablets and touchscreens.',
            longDescription: 'The Glyph Stylus Pen offers pixel-perfect precision for writing, drawing, and navigating on your touchscreen devices. Pressure sensitivity allows for natural artistic expression. Magnetic attachment and long battery life make it a perfect creative tool. Compatible with various tablets.',
            category: 'peripherals accessories',
            priceUSD: 49.99,
            images: [
                'https://via.placeholder.com/600x400/DDA0DD/000?text=Glyph+Stylus+Pen+1'
            ],
            affiliateLink: 'https://example.com/glyph-stylus'
        },
        {
            id: 11,
            name: 'Carbon Fiber Wallet',
            shortDescription: 'Slim, durable, and RFID-blocking for security.',
            longDescription: 'The Carbon Fiber Wallet combines minimalist design with robust protection. Made from high-grade carbon fiber, it\'s incredibly lightweight and durable. RFID-blocking technology keeps your cards safe from electronic theft. Features multiple card slots and a cash strap.',
            category: 'accessories',
            priceUSD: 35.00,
            images: [
                'https://via.placeholder.com/600x400/A9A9A9/fff?text=Carbon+Fiber+Wallet+1'
            ],
            affiliateLink: 'https://example.com/carbon-fiber-wallet'
        },
        {
            id: 12,
            name: 'Aero Portable Fan',
            shortDescription: 'Stay cool anywhere with this powerful personal fan.',
            longDescription: 'The Aero Portable Fan is compact yet powerful, delivering a refreshing breeze. Features multiple speed settings and a long-lasting rechargeable battery. Perfect for desk use, outdoor events, or travel. Quiet operation ensures minimal disturbance.',
            category: 'home-tech accessories',
            priceUSD: 29.99,
            images: [
                'https://via.placeholder.com/600x400/B0C4DE/000?text=Aero+Portable+Fan+1'
            ],
            affiliateLink: 'https://example.com/aero-fan'
        },
        {
            id: 13,
            name: 'Stealth Dash Cam',
            shortDescription: 'Full HD recording for road safety and evidence.',
            longDescription: 'The Stealth Dash Cam records in crystal-clear Full HD, providing crucial evidence in case of incidents. Features a wide-angle lens, loop recording, and G-sensor for automatic emergency recording. Easy to install and discreetly blends into your car\'s interior.',
            category: 'automotive cameras',
            priceUSD: 75.00,
            images: [
                'https://via.placeholder.com/600x400/D3D3D3/000?text=Stealth+Dash+Cam+1'
            ],
            affiliateLink: 'https://example.com/stealth-dashcam'
        },
        {
            id: 14,
            name: 'Orbital Desk Lamp',
            shortDescription: 'Modern, adjustable lighting with wireless charging.',
            longDescription: 'The Orbital Desk Lamp offers adjustable brightness and color temperature to suit any task or mood. Features a built-in wireless charging pad for your smartphone. Sleek, minimalist design enhances any workspace. Energy-efficient LED lighting.',
            category: 'home-tech smart-lighting',
            priceUSD: 59.99,
            images: [
                'https://via.placeholder.com/600x400/F5F5DC/000?text=Orbital+Desk+Lamp+1'
            ],
            affiliateLink: 'https://example.com/orbital-lamp'
        },
        {
            id: 15,
            name: 'Pulse Fitness Tracker',
            shortDescription: 'Monitor your activity, heart rate, and sleep.',
            longDescription: 'The Pulse Fitness Tracker provides accurate tracking of steps, distance, calories burned, and active minutes. Continuous heart rate monitoring and automatic sleep tracking give you insights into your health. Lightweight and comfortable for all-day wear. Long battery life and smartphone notifications.',
            category: 'wearables health',
            priceUSD: 69.99,
            images: [
                'https://via.placeholder.com/600x400/FFB6C1/000?text=Pulse+Fitness+Tracker+1'
            ],
            affiliateLink: 'https://example.com/pulse-tracker'
        },
        {
            id: 16,
            name: 'Sonic Electric Toothbrush',
            shortDescription: 'Advanced cleaning for a healthier smile.',
            longDescription: 'The Sonic Electric Toothbrush uses high-frequency vibrations to remove plaque effectively. Multiple brushing modes for different needs (clean, sensitive, massage). Built-in 2-minute timer and 30-second interval alerts. Long-lasting battery and waterproof design.',
            category: 'health home-tech',
            priceUSD: 45.00,
            images: [
                'https://via.placeholder.com/600x400/AFEEEE/000?text=Sonic+Toothbrush+1'
            ],
            affiliateLink: 'https://example.com/sonic-toothbrush'
        },
        {
            id: 17,
            name: 'Guardian Smart Lock',
            shortDescription: 'Keyless entry and remote access for your home.',
            longDescription: 'The Guardian Smart Lock offers secure keyless entry via smartphone app, keypad code, or fingerprint. Grant temporary access to guests. Monitor lock activity from anywhere. Easy to install and integrates with smart home systems for enhanced security.',
            category: 'home-tech security',
            priceUSD: 180.00,
            images: [
                'https://via.placeholder.com/600x400/F0F8FF/000?text=Guardian+Smart+Lock+1'
            ],
            affiliateLink: 'https://example.com/guardian-lock'
        },
        {
            id: 18,
            name: 'Flow Water Bottle',
            shortDescription: 'Track your hydration and stay healthy.',
            longDescription: 'The Flow Water Bottle helps you meet your daily hydration goals by tracking your water intake. Syncs with a mobile app to provide personalized recommendations and reminders. Made from durable, BPA-free materials. LED indicator lights encourage regular sips.',
            category: 'health accessories',
            priceUSD: 30.00,
            images: [
                'https://via.placeholder.com/600x400/87CEFA/000?text=Flow+Water+Bottle+1'
            ],
            affiliateLink: 'https://example.com/flow-bottle'
        },
        {
            id: 19,
            name: 'Horizon Drone',
            shortDescription: 'Compact and intelligent drone for beginners.',
            longDescription: 'The Horizon Drone is perfect for beginners, offering easy controls and stable flight. Features a 1080p camera for decent aerial shots and a 15-minute flight time. One-key takeoff/landing and altitude hold make it simple to fly. Comes with propeller guards for safety.',
            category: 'drones',
            priceUSD: 120.00,
            images: [
                'https://via.placeholder.com/600x400/FFDAB9/000?text=Horizon+Drone+1'
            ],
            affiliateLink: 'https://example.com/horizon-drone'
        },
        {
            id: 20,
            name: 'Glow Ring Light',
            shortDescription: 'Perfect lighting for vlogging, makeup, and video calls.',
            longDescription: 'The Glow Ring Light provides soft, even illumination to enhance your videos, photos, and live streams. Adjustable brightness and color temperature settings. Includes a phone holder and tripod for versatile setup. USB-powered for convenience.',
            category: 'cameras accessories',
            priceUSD: 40.00,
            images: [
                'https://via.placeholder.com/600x400/E6E6FA/000?text=Glow+Ring+Light+1'
            ],
            affiliateLink: 'https://example.com/glow-ring-light'
        }
    ];

    // Product Categories (for filters)
    const productCategories = [
        { id: 'all', name: 'All Products', icon: '<i class="fas fa-th-large"></i>' },
        { id: 'wearables', name: 'Wearables', icon: '<i class="fas fa-watch"></i>' },
        { id: 'audio', name: 'Audio', icon: '<i class="fas fa-headphones"></i>' },
        { id: 'home-tech', name: 'Home Tech', icon: '<i class="fas fa-home"></i>' },
        { id: 'drones', name: 'Drones', icon: '<i class="fas fa-plane"></i>' },
        { id: 'cameras', name: 'Cameras', icon: '<i class="fas fa-camera"></i>' },
        { id: 'health', name: 'Health', icon: '<i class="fas fa-heartbeat"></i>' },
        { id: 'gaming', name: 'Gaming', icon: '<i class="fas fa-gamepad"></i>' },
        { id: 'accessories', name: 'Accessories', icon: '<i class="fas fa-lightbulb"></i>' }
    ];

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
        const product = productsData.find(p => p.id == productId);

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
        const product = productsData.find(p => p.id == productId);

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
        const relatedProducts = productsData
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
            const featuredProduct = productsData.find(p => p.id == featuredProductId);
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
        const featuredProduct = productsData.find(p => p.id === 2);
        if (featuredProduct && featuredAddToCartBtn) {
            featuredAddToCartBtn.dataset.productId = featuredProduct.id;
            // Update image source for the featured product if needed (already in HTML for now)
            document.querySelector('.featured-gadget-card img').src = featuredProduct.images[0];
            document.querySelector('.featured-gadget-card img').alt = featuredProduct.name;
            document.querySelector('.featured-gadget-card h3').textContent = featuredProduct.name;
            document.querySelector('.featured-gadget-card .description').textContent = featuredProduct.shortDescription;


            if (featuredDiscountPrice) {
                featuredDiscountPrice.dataset.usdPrice = featuredProduct.priceUSD;
                // Calculate original price for a 33% discount to make 199.99 from 299.99
                // If 199.99 is 66.6% of original, original = 199.99 / 0.666 = ~300
                // So, original price is featuredProduct.priceUSD * (1 / 0.666) or simply hardcode if fixed
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
