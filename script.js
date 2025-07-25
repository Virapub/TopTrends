// ===== GLOBAL VARIABLES AND CONFIGURATION =====
const CONFIG = {
    API_BASE_URL: 'https://api.techhaven.com',
    CART_STORAGE_KEY: 'techhaven_cart',
    WISHLIST_STORAGE_KEY: 'techhaven_wishlist',
    COMPARE_STORAGE_KEY: 'techhaven_compare',
    USER_STORAGE_KEY: 'techhaven_user',
    HERO_SLIDE_INTERVAL: 5000,
    TOAST_DURATION: 4000,
    ANIMATION_DURATION: 300
};

// Global state
let cart = JSON.parse(localStorage.getItem(CONFIG.CART_STORAGE_KEY)) || [];
let wishlist = JSON.parse(localStorage.getItem(CONFIG.WISHLIST_STORAGE_KEY)) || [];
let compareList = JSON.parse(localStorage.getItem(CONFIG.COMPARE_STORAGE_KEY)) || [];
let currentUser = JSON.parse(localStorage.getItem(CONFIG.USER_STORAGE_KEY)) || null;

// ===== UTILITY FUNCTIONS =====
const utils = {
    // DOM manipulation helpers
    $(selector) {
        return document.querySelector(selector);
    },
    
    $$(selector) {
        return document.querySelectorAll(selector);
    },
    
    createElement(tag, className = '', innerHTML = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (innerHTML) element.innerHTML = innerHTML;
        return element;
    },
    
    // Animation helpers
    fadeIn(element, duration = CONFIG.ANIMATION_DURATION) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = null;
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.min(progress / duration, 1);
            
            element.style.opacity = opacity;
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        }
        requestAnimationFrame(animate);
    },
    
    fadeOut(element, duration = CONFIG.ANIMATION_DURATION) {
        let start = null;
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.max(1 - (progress / duration), 0);
            
            element.style.opacity = opacity;
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        }
        requestAnimationFrame(animate);
    },
    
    slideUp(element, duration = CONFIG.ANIMATION_DURATION) {
        const height = element.offsetHeight;
        element.style.height = height + 'px';
        element.style.overflow = 'hidden';
        element.style.transition = `height ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.height = '0px';
        }, 10);
        
        setTimeout(() => {
            element.style.display = 'none';
            element.style.height = '';
            element.style.overflow = '';
            element.style.transition = '';
        }, duration);
    },
    
    slideDown(element, duration = CONFIG.ANIMATION_DURATION) {
        element.style.display = 'block';
        const height = element.scrollHeight;
        element.style.height = '0px';
        element.style.overflow = 'hidden';
        element.style.transition = `height ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.height = height + 'px';
        }, 10);
        
        setTimeout(() => {
            element.style.height = '';
            element.style.overflow = '';
            element.style.transition = '';
        }, duration);
    },
    
    // Format helpers
    formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    },
    
    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },
    
    // Validation helpers
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    validatePhone(phone) {
        const re = /^\+?[\d\s\-\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    },
    
    // Storage helpers
    saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    },
    
    getFromStorage(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('Storage error:', error);
            return defaultValue;
        }
    },
    
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// ===== TOAST NOTIFICATION SYSTEM =====
const toast = {
    container: null,
    
    init() {
        this.container = utils.$('#toastContainer');
        if (!this.container) {
            this.container = utils.createElement('div', 'toast-container');
            this.container.id = 'toastContainer';
            document.body.appendChild(this.container);
        }
    },
    
    show(message, type = 'info', duration = CONFIG.TOAST_DURATION) {
        if (!this.container) this.init();
        
        const toastElement = utils.createElement('div', `toast ${type}`);
        toastElement.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${this.getIcon(type)}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-message">${message}</div>
            </div>
            <div class="toast-close">
                <i class="fas fa-times"></i>
            </div>
        `;
        
        this.container.appendChild(toastElement);
        
        // Show animation
        setTimeout(() => toastElement.classList.add('show'), 10);
        
        // Auto remove
        setTimeout(() => this.remove(toastElement), duration);
        
        // Manual close
        toastElement.querySelector('.toast-close').addEventListener('click', () => {
            this.remove(toastElement);
        });
        
        return toastElement;
    },
    
    remove(toastElement) {
        toastElement.classList.remove('show');
        setTimeout(() => {
            if (toastElement.parentNode) {
                toastElement.parentNode.removeChild(toastElement);
            }
        }, CONFIG.ANIMATION_DURATION);
    },
    
    getIcon(type) {
        const icons = {
            success: 'fa-check',
            error: 'fa-exclamation-triangle',
            warning: 'fa-exclamation',
            info: 'fa-info'
        };
        return icons[type] || icons.info;
    },
    
    success(message) {
        return this.show(message, 'success');
    },
    
    error(message) {
        return this.show(message, 'error');
    },
    
    warning(message) {
        return this.show(message, 'warning');
    },
    
    info(message) {
        return this.show(message, 'info');
    }
};

// ===== LOADING SPINNER =====
const loading = {
    spinner: null,
    
    init() {
        this.spinner = utils.$('#loadingSpinner');
        if (!this.spinner) {
            this.spinner = utils.createElement('div', 'loading-spinner');
            this.spinner.id = 'loadingSpinner';
            this.spinner.innerHTML = '<div class="spinner"></div>';
            document.body.appendChild(this.spinner);
        }
    },
    
    show() {
        if (!this.spinner) this.init();
        this.spinner.classList.add('active');
    },
    
    hide() {
        if (this.spinner) {
            this.spinner.classList.remove('active');
        }
    }
};

// ===== MODAL SYSTEM =====
const modal = {
    activeModal: null,
    
    open(modalId) {
        const modalElement = utils.$(`#${modalId}`);
        if (!modalElement) return;
        
        this.activeModal = modalElement;
        modalElement.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Close on overlay click
        const overlay = modalElement.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => this.close(modalId));
        }
        
        // Close on close button click
        const closeBtn = modalElement.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close(modalId));
        }
        
        // Close on escape key
        document.addEventListener('keydown', this.handleEscape);
    },
    
    close(modalId) {
        const modalElement = utils.$(`#${modalId}`);
        if (!modalElement) return;
        
        modalElement.classList.remove('active');
        document.body.style.overflow = '';
        this.activeModal = null;
        
        document.removeEventListener('keydown', this.handleEscape);
    },
    
    handleEscape(e) {
        if (e.key === 'Escape' && modal.activeModal) {
            modal.close(modal.activeModal.id);
        }
    }
};

// ===== HERO CAROUSEL =====
const heroCarousel = {
    currentSlide: 0,
    slides: [],
    interval: null,
    
    init() {
        this.slides = utils.$$('.hero-slide');
        if (this.slides.length === 0) return;
        
        this.setupNavigation();
        this.setupPagination();
        this.startAutoplay();
        this.showSlide(0);
    },
    
    setupNavigation() {
        const prevBtn = utils.$('.hero-prev');
        const nextBtn = utils.$('.hero-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousSlide());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }
    },
    
    setupPagination() {
        const pagination = utils.$('.hero-pagination');
        if (!pagination) return;
        
        pagination.innerHTML = '';
        this.slides.forEach((_, index) => {
            const dot = utils.createElement('button', 'hero-dot');
            dot.addEventListener('click', () => this.goToSlide(index));
            pagination.appendChild(dot);
        });
    },
    
    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        
        // Show current slide
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
        }
        
        // Update pagination
        const dots = utils.$$('.hero-dot');
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        this.currentSlide = index;
    },
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    },
    
    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    },
    
    goToSlide(index) {
        this.showSlide(index);
        this.resetAutoplay();
    },
    
    startAutoplay() {
        this.interval = setInterval(() => {
            this.nextSlide();
        }, CONFIG.HERO_SLIDE_INTERVAL);
    },
    
    stopAutoplay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    },
    
    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
};

// ===== PRODUCT MANAGEMENT =====
const productManager = {
    products: [],
    filteredProducts: [],
    currentView: 'grid',
    currentSort: 'featured',
    currentFilters: {
        category: 'all',
        priceRange: 'all',
        brand: 'all',
        rating: 'all'
    },
    
    init() {
        this.loadProducts();
        this.setupFilters();
        this.setupViewToggle();
        this.setupSearch();
    },
    
    async loadProducts() {
        // Simulate API call with sample data
        this.products = this.getSampleProducts();
        this.filteredProducts = [...this.products];
        this.renderProducts();
        this.updateProductCount();
    },
    
    getSampleProducts() {
        return [
            {
                id: 1,
                name: 'MacBook Pro 16-inch M3 Max',
                description: 'Powerful laptop with M3 Max chip, perfect for professionals',
                price: 2499.00,
                originalPrice: 2799.00,
                category: 'laptops',
                brand: 'Apple',
                rating: 4.8,
                reviewCount: 1247,
                image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                badges: ['sale', 'featured'],
                inStock: true,
                stockCount: 15
            },
            {
                id: 2,
                name: 'iPhone 15 Pro Max',
                description: 'Latest iPhone with titanium design and advanced camera system',
                price: 1199.00,
                originalPrice: null,
                category: 'smartphones',
                brand: 'Apple',
                rating: 4.9,
                reviewCount: 2156,
                image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                badges: ['new'],
                inStock: true,
                stockCount: 8
            },
            {
                id: 3,
                name: 'Samsung Galaxy S24 Ultra',
                description: 'Premium Android smartphone with S Pen and AI features',
                price: 1299.00,
                originalPrice: 1399.00,
                category: 'smartphones',
                brand: 'Samsung',
                rating: 4.7,
                reviewCount: 892,
                image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                badges: ['sale'],
                inStock: true,
                stockCount: 12
            },
            {
                id: 4,
                name: 'Dell XPS 13 Plus',
                description: 'Ultra-thin laptop with stunning InfinityEdge display',
                price: 1399.00,
                originalPrice: null,
                category: 'laptops',
                brand: 'Dell',
                rating: 4.6,
                reviewCount: 567,
                image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                badges: [],
                inStock: true,
                stockCount: 6
            },
            {
                id: 5,
                name: 'iPad Pro 12.9-inch',
                description: 'Professional tablet with M2 chip and Liquid Retina XDR display',
                price: 1099.00,
                originalPrice: 1199.00,
                category: 'tablets',
                brand: 'Apple',
                rating: 4.8,
                reviewCount: 743,
                image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                badges: ['sale'],
                inStock: false,
                stockCount: 0
            },
            {
                id: 6,
                name: 'Sony WH-1000XM5',
                description: 'Industry-leading noise canceling wireless headphones',
                price: 399.00,
                originalPrice: 449.00,
                category: 'audio',
                brand: 'Sony',
                rating: 4.9,
                reviewCount: 1834,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                badges: ['sale', 'featured'],
                inStock: true,
                stockCount: 23
            }
        ];
    },
    
    setupFilters() {
        const categoryFilter = utils.$('#categoryFilter');
        const priceFilter = utils.$('#priceFilter');
        const brandFilter = utils.$('#brandFilter');
        const ratingFilter = utils.$('#ratingFilter');
        const sortFilter = utils.$('#sortFilter');
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentFilters.category = e.target.value;
                this.applyFilters();
            });
        }
        
        if (priceFilter) {
            priceFilter.addEventListener('change', (e) => {
                this.currentFilters.priceRange = e.target.value;
                this.applyFilters();
            });
        }
        
        if (brandFilter) {
            brandFilter.addEventListener('change', (e) => {
                this.currentFilters.brand = e.target.value;
                this.applyFilters();
            });
        }
        
        if (ratingFilter) {
            ratingFilter.addEventListener('change', (e) => {
                this.currentFilters.rating = e.target.value;
                this.applyFilters();
            });
        }
        
        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.sortProducts();
                this.renderProducts();
            });
        }
    },
    
    setupViewToggle() {
        const gridBtn = utils.$('#gridViewBtn');
        const listBtn = utils.$('#listViewBtn');
        
        if (gridBtn) {
            gridBtn.addEventListener('click', () => {
                this.currentView = 'grid';
                this.updateViewButtons();
                this.renderProducts();
            });
        }
        
        if (listBtn) {
            listBtn.addEventListener('click', () => {
                this.currentView = 'list';
                this.updateViewButtons();
                this.renderProducts();
            });
        }
    },
    
    setupSearch() {
        const searchInput = utils.$('#searchInput');
        if (searchInput) {
            const debouncedSearch = utils.debounce((query) => {
                this.searchProducts(query);
            }, 300);
            
            searchInput.addEventListener('input', (e) => {
                debouncedSearch(e.target.value);
            });
        }
    },
    
    applyFilters() {
        this.filteredProducts = this.products.filter(product => {
            // Category filter
            if (this.currentFilters.category !== 'all' && product.category !== this.currentFilters.category) {
                return false;
            }
            
            // Price filter
            if (this.currentFilters.priceRange !== 'all') {
                const [min, max] = this.currentFilters.priceRange.split('-').map(Number);
                if (max && (product.price < min || product.price > max)) {
                    return false;
                }
                if (!max && product.price < min) {
                    return false;
                }
            }
            
            // Brand filter
            if (this.currentFilters.brand !== 'all' && product.brand !== this.currentFilters.brand) {
                return false;
            }
            
            // Rating filter
            if (this.currentFilters.rating !== 'all') {
                const minRating = parseFloat(this.currentFilters.rating);
                if (product.rating < minRating) {
                    return false;
                }
            }
            
            return true;
        });
        
        this.sortProducts();
        this.renderProducts();
        this.updateProductCount();
    },
    
    searchProducts(query) {
        if (!query.trim()) {
            this.applyFilters();
            return;
        }
        
        const searchTerm = query.toLowerCase();
        this.filteredProducts = this.products.filter(product => {
            return product.name.toLowerCase().includes(searchTerm) ||
                   product.description.toLowerCase().includes(searchTerm) ||
                   product.brand.toLowerCase().includes(searchTerm);
        });
        
        this.sortProducts();
        this.renderProducts();
        this.updateProductCount();
    },
    
    sortProducts() {
        this.filteredProducts.sort((a, b) => {
            switch (this.currentSort) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'newest':
                    return b.id - a.id;
                case 'name':
                    return a.name.localeCompare(b.name);
                default: // featured
                    return b.rating * b.reviewCount - a.rating * a.reviewCount;
            }
        });
    },
    
    renderProducts() {
        const container = utils.$('.products-container');
        if (!container) return;
        
        // Update view class
        container.className = `products-container ${this.currentView}-view`;
        
        if (this.filteredProducts.length === 0) {
            container.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters or search terms.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.filteredProducts.map(product => this.renderProductCard(product)).join('');
        
        // Add event listeners
        this.attachProductEventListeners();
    },
    
    renderProductCard(product) {
        const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
        const badges = product.badges.map(badge => `<span class="product-badge badge-${badge}">${badge}</span>`).join('');
        const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-badges">${badges}</div>
                    <div class="product-actions">
                        <button class="product-action-btn wishlist-btn" data-product-id="${product.id}" title="Add to Wishlist">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="product-action-btn compare-btn" data-product-id="${product.id}" title="Add to Compare">
                            <i class="fas fa-balance-scale"></i>
                        </button>
                        <button class="product-action-btn quick-view-btn" data-product-id="${product.id}" title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-rating">
                        <div class="stars">${stars}</div>
                        <span class="rating-text">(${product.reviewCount} reviews)</span>
                    </div>
                    <div class="product-pricing">
                        <div class="price-container">
                            <span class="current-price">${utils.formatPrice(product.price)}</span>
                            ${product.originalPrice ? `<span class="original-price">${utils.formatPrice(product.originalPrice)}</span>` : ''}
                            ${discount > 0 ? `<span class="discount-percentage">-${discount}%</span>` : ''}
                        </div>
                    </div>
                    <div class="stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                        <i class="fas ${product.inStock ? 'fa-check' : 'fa-times'}"></i>
                        <span>${product.inStock ? `In Stock (${product.stockCount})` : 'Out of Stock'}</span>
                    </div>
                    <div class="product-footer">
                        <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart"></i>
                            ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    },
    
    attachProductEventListeners() {
        // Add to cart buttons
        utils.$$('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('[data-product-id]').dataset.productId);
                cartManager.addToCart(productId);
            });
        });
        
        // Wishlist buttons
        utils.$$('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('[data-product-id]').dataset.productId);
                wishlistManager.toggleWishlist(productId);
            });
        });
        
        // Compare buttons
        utils.$$('.compare-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('[data-product-id]').dataset.productId);
                compareManager.toggleCompare(productId);
            });
        });
        
        // Quick view buttons
        utils.$$('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('[data-product-id]').dataset.productId);
                this.showQuickView(productId);
            });
        });
        
        // Product card clicks
        utils.$$('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    const productId = parseInt(card.dataset.productId);
                    this.goToProductDetail(productId);
                }
            });
        });
    },
    
    updateViewButtons() {
        const gridBtn = utils.$('#gridViewBtn');
        const listBtn = utils.$('#listViewBtn');
        
        if (gridBtn && listBtn) {
            gridBtn.classList.toggle('active', this.currentView === 'grid');
            listBtn.classList.toggle('active', this.currentView === 'list');
        }
    },
    
    updateProductCount() {
        const countElement = utils.$('.product-count');
        if (countElement) {
            countElement.textContent = `${this.filteredProducts.length} products found`;
        }
    },
    
    showQuickView(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        // Create quick view modal content
        const modalContent = `
            <div class="quick-view-body">
                <div class="quick-view-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="quick-view-details">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <div class="product-rating">
                        <div class="stars">${'★'.repeat(Math.floor(product.rating))}</div>
                        <span>(${product.reviewCount} reviews)</span>
                    </div>
                    <div class="price-container">
                        <span class="current-price">${utils.formatPrice(product.price)}</span>
                        ${product.originalPrice ? `<span class="original-price">${utils.formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                    <div class="quick-view-actions">
                        <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i>
                            Add to Cart
                        </button>
                        <button class="btn btn-secondary" onclick="productManager.goToProductDetail(${product.id})">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Update modal and show
        const modalBody = utils.$('#quickViewModal .modal-body');
        if (modalBody) {
            modalBody.innerHTML = modalContent;
            modal.open('quickViewModal');
            
            // Attach event listeners
            const addToCartBtn = modalBody.querySelector('.add-to-cart-btn');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', () => {
                    cartManager.addToCart(productId);
                    modal.close('quickViewModal');
                });
            }
        }
    },
    
    goToProductDetail(productId) {
        window.location.href = `pages/product-detail.html?id=${productId}`;
    }
};

// ===== CART MANAGEMENT =====
const cartManager = {
    init() {
        this.updateCartBadge();
        this.setupCartSidebar();
        this.renderCartItems();
    },
    
    addToCart(productId, quantity = 1) {
        const product = productManager.products.find(p => p.id === productId);
        if (!product || !product.inStock) {
            toast.error('Product is not available');
            return;
        }
        
        const existingItem = cart.find(item => item.productId === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                productId,
                quantity,
                addedAt: new Date().toISOString()
            });
        }
        
        this.saveCart();
        this.updateCartBadge();
        this.renderCartItems();
        
        toast.success(`${product.name} added to cart`);
        
        // Add animation to cart button
        const cartBtn = utils.$('#cartBtn');
        if (cartBtn) {
            cartBtn.classList.add('animate-bounce');
            setTimeout(() => cartBtn.classList.remove('animate-bounce'), 1000);
        }
    },
    
    removeFromCart(productId) {
        cart = cart.filter(item => item.productId !== productId);
        this.saveCart();
        this.updateCartBadge();
        this.renderCartItems();
        
        const product = productManager.products.find(p => p.id === productId);
        if (product) {
            toast.info(`${product.name} removed from cart`);
        }
    },
    
    updateQuantity(productId, quantity) {
        const item = cart.find(item => item.productId === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartBadge();
                this.renderCartItems();
            }
        }
    },
    
    clearCart() {
        cart = [];
        this.saveCart();
        this.updateCartBadge();
        this.renderCartItems();
        toast.info('Cart cleared');
    },
    
    getCartTotal() {
        return cart.reduce((total, item) => {
            const product = productManager.products.find(p => p.id === item.productId);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    },
    
    getCartItemCount() {
        return cart.reduce((count, item) => count + item.quantity, 0);
    },
    
    saveCart() {
        utils.saveToStorage(CONFIG.CART_STORAGE_KEY, cart);
    },
    
    updateCartBadge() {
        const badge = utils.$('#cartBadge');
        if (badge) {
            const count = this.getCartItemCount();
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    },
    
    setupCartSidebar() {
        const cartBtn = utils.$('#cartBtn');
        const cartSidebar = utils.$('#cartSidebar');
        const cartClose = utils.$('#cartClose');
        const cartOverlay = utils.$('#cartOverlay');
        
        if (cartBtn && cartSidebar) {
            cartBtn.addEventListener('click', () => {
                cartSidebar.classList.add('active');
            });
        }
        
        if (cartClose) {
            cartClose.addEventListener('click', () => {
                cartSidebar.classList.remove('active');
            });
        }
        
        if (cartOverlay) {
            cartOverlay.addEventListener('click', () => {
                cartSidebar.classList.remove('active');
            });
        }
    },
    
    renderCartItems() {
        const cartBody = utils.$('#cartBody');
        const cartFooter = utils.$('#cartFooter');
        
        if (!cartBody) return;
        
        if (cart.length === 0) {
            cartBody.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Add some products to get started!</p>
                </div>
            `;
            if (cartFooter) cartFooter.style.display = 'none';
            return;
        }
        
        if (cartFooter) cartFooter.style.display = 'block';
        
        cartBody.innerHTML = cart.map(item => {
            const product = productManager.products.find(p => p.id === item.productId);
            if (!product) return '';
            
            return `
                <div class="cart-item" data-product-id="${item.productId}">
                    <div class="cart-item-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-name">${product.name}</h4>
                        <div class="cart-item-price">${utils.formatPrice(product.price)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus-btn" data-product-id="${item.productId}">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-product-id="${item.productId}">
                            <button class="quantity-btn plus-btn" data-product-id="${item.productId}">+</button>
                        </div>
                        <div class="cart-item-remove" data-product-id="${item.productId}">Remove</div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Update cart total
        this.updateCartTotal();
        
        // Attach event listeners
        this.attachCartEventListeners();
    },
    
    attachCartEventListeners() {
        // Quantity buttons
        utils.$$('.minus-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                const item = cart.find(item => item.productId === productId);
                if (item) {
                    this.updateQuantity(productId, item.quantity - 1);
                }
            });
        });
        
        utils.$$('.plus-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                const item = cart.find(item => item.productId === productId);
                if (item) {
                    this.updateQuantity(productId, item.quantity + 1);
                }
            });
        });
        
        // Quantity inputs
        utils.$$('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                const quantity = parseInt(e.target.value);
                this.updateQuantity(productId, quantity);
            });
        });
        
        // Remove buttons
        utils.$$('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                this.removeFromCart(productId);
            });
        });
    },
    
    updateCartTotal() {
        const subtotal = this.getCartTotal();
        const shipping = subtotal > 100 ? 0 : 9.99;
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;
        
        const cartTotal = utils.$('#cartTotal');
        if (cartTotal) {
            cartTotal.innerHTML = `
                <div class="total-line">
                    <span>Subtotal:</span>
                    <span>${utils.formatPrice(subtotal)}</span>
                </div>
                <div class="total-line">
                    <span>Shipping:</span>
                    <span>${shipping === 0 ? 'Free' : utils.formatPrice(shipping)}</span>
                </div>
                <div class="total-line">
                    <span>Tax:</span>
                    <span>${utils.formatPrice(tax)}</span>
                </div>
                <div class="total-line total-main">
                    <span>Total:</span>
                    <span>${utils.formatPrice(total)}</span>
                </div>
            `;
        }
    }
};

// ===== WISHLIST MANAGEMENT =====
const wishlistManager = {
    init() {
        this.updateWishlistButtons();
    },
    
    toggleWishlist(productId) {
        const index = wishlist.indexOf(productId);
        const product = productManager.products.find(p => p.id === productId);
        
        if (index > -1) {
            wishlist.splice(index, 1);
            toast.info(`${product?.name || 'Product'} removed from wishlist`);
        } else {
            wishlist.push(productId);
            toast.success(`${product?.name || 'Product'} added to wishlist`);
        }
        
        this.saveWishlist();
        this.updateWishlistButtons();
    },
    
    saveWishlist() {
        utils.saveToStorage(CONFIG.WISHLIST_STORAGE_KEY, wishlist);
    },
    
    updateWishlistButtons() {
        utils.$$('.wishlist-btn').forEach(btn => {
            const productId = parseInt(btn.dataset.productId);
            const isInWishlist = wishlist.includes(productId);
            
            btn.classList.toggle('active', isInWishlist);
            btn.querySelector('i').className = isInWishlist ? 'fas fa-heart' : 'far fa-heart';
        });
    }
};

// ===== COMPARE MANAGEMENT =====
const compareManager = {
    maxItems: 4,
    
    init() {
        this.updateCompareButtons();
        this.updateCompareCount();
    },
    
    toggleCompare(productId) {
        const index = compareList.indexOf(productId);
        const product = productManager.products.find(p => p.id === productId);
        
        if (index > -1) {
            compareList.splice(index, 1);
            toast.info(`${product?.name || 'Product'} removed from comparison`);
        } else {
            if (compareList.length >= this.maxItems) {
                toast.warning(`You can only compare up to ${this.maxItems} products`);
                return;
            }
            compareList.push(productId);
            toast.success(`${product?.name || 'Product'} added to comparison`);
        }
        
        this.saveCompareList();
        this.updateCompareButtons();
        this.updateCompareCount();
    },
    
    saveCompareList() {
        utils.saveToStorage(CONFIG.COMPARE_STORAGE_KEY, compareList);
    },
    
    updateCompareButtons() {
        utils.$$('.compare-btn').forEach(btn => {
            const productId = parseInt(btn.dataset.productId);
            const isInCompare = compareList.includes(productId);
            
            btn.classList.toggle('active', isInCompare);
        });
    },
    
    updateCompareCount() {
        const compareCount = utils.$('#compareCount');
        if (compareCount) {
            compareCount.textContent = compareList.length;
            compareCount.style.display = compareList.length > 0 ? 'inline' : 'none';
        }
    },
    
    showCompareModal() {
        if (compareList.length === 0) {
            toast.info('Add products to compare first');
            return;
        }
        
        const products = compareList.map(id => productManager.products.find(p => p.id === id)).filter(Boolean);
        
        // Create comparison table
        const tableHTML = this.createComparisonTable(products);
        
        const modalBody = utils.$('#compareModal .modal-body');
        if (modalBody) {
            modalBody.innerHTML = tableHTML;
            modal.open('compareModal');
        }
    },
    
    createComparisonTable(products) {
        if (products.length === 0) return '<p>No products to compare</p>';
        
        const features = ['Name', 'Price', 'Brand', 'Rating', 'Category'];
        
        let tableHTML = '<table class="compare-table"><thead><tr><th>Feature</th>';
        products.forEach(product => {
            tableHTML += `<th>${product.name}</th>`;
        });
        tableHTML += '</tr></thead><tbody>';
        
        features.forEach(feature => {
            tableHTML += `<tr><td>${feature}</td>`;
            products.forEach(product => {
                let value = '';
                switch (feature) {
                    case 'Name':
                        value = product.name;
                        break;
                    case 'Price':
                        value = utils.formatPrice(product.price);
                        break;
                    case 'Brand':
                        value = product.brand;
                        break;
                    case 'Rating':
                        value = `${product.rating} ★ (${product.reviewCount} reviews)`;
                        break;
                    case 'Category':
                        value = product.category;
                        break;
                }
                tableHTML += `<td>${value}</td>`;
            });
            tableHTML += '</tr>';
        });
        
        tableHTML += '</tbody></table>';
        return tableHTML;
    }
};

// ===== FORM VALIDATION =====
const formValidator = {
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    },
    
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error
        this.clearFieldError(field);
        
        // Required validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Type-specific validation
        if (value && isValid) {
            switch (type) {
                case 'email':
                    if (!utils.validateEmail(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;
                case 'tel':
                    if (!utils.validatePhone(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid phone number';
                    }
                    break;
                case 'password':
                    if (value.length < 8) {
                        isValid = false;
                        errorMessage = 'Password must be at least 8 characters long';
                    }
                    break;
            }
        }
        
        // Custom validation patterns
        if (value && isValid && field.pattern) {
            const regex = new RegExp(field.pattern);
            if (!regex.test(value)) {
                isValid = false;
                errorMessage = field.title || 'Please enter a valid value';
            }
        }
        
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }
        
        return isValid;
    },
    
    showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.form-error');
        if (!errorElement) {
            errorElement = utils.createElement('div', 'form-error');
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    },
    
    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
};

// ===== FAQ FUNCTIONALITY =====
const faqManager = {
    init() {
        this.setupAccordion();
        this.setupSearch();
        this.setupCategoryTabs();
    },
    
    setupAccordion() {
        utils.$$('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isOpen = question.getAttribute('aria-expanded') === 'true';
                
                // Close all other items
                utils.$$('.faq-question').forEach(q => {
                    if (q !== question) {
                        q.setAttribute('aria-expanded', 'false');
                        const a = q.nextElementSibling;
                        if (a) a.classList.remove('active');
                    }
                });
                
                // Toggle current item
                question.setAttribute('aria-expanded', !isOpen);
                if (answer) {
                    answer.classList.toggle('active', !isOpen);
                }
            });
        });
    },
    
    setupSearch() {
        const searchInput = utils.$('#faqSearchInput');
        if (searchInput) {
            const debouncedSearch = utils.debounce((query) => {
                this.searchFAQs(query);
            }, 300);
            
            searchInput.addEventListener('input', (e) => {
                debouncedSearch(e.target.value);
            });
        }
    },
    
    setupCategoryTabs() {
        utils.$$('.category-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.category;
                this.showCategory(category);
                
                // Update active tab
                utils.$$('.category-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });
    },
    
    searchFAQs(query) {
        const items = utils.$$('.faq-item');
        const searchTerm = query.toLowerCase();
        
        items.forEach(item => {
            const question = item.querySelector('.faq-question').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    },
    
    showCategory(category) {
        const categories = utils.$$('.faq-category');
        
        categories.forEach(cat => {
            if (category === 'all' || cat.dataset.category === category) {
                cat.style.display = 'block';
            } else {
                cat.style.display = 'none';
            }
        });
    }
};

// ===== ORDER TRACKING =====
const orderTracking = {
    init() {
        this.setupTrackingForm();
        this.setupSampleOrders();
        this.setupNotifications();
    },
    
    setupTrackingForm() {
        const trackingForm = utils.$('#trackingForm');
        if (trackingForm) {
            trackingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.trackOrder();
            });
        }
    },
    
    setupSampleOrders() {
        utils.$$('.track-sample-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sampleOrder = e.target.closest('.sample-order');
                const orderNumber = sampleOrder.dataset.order;
                const email = sampleOrder.dataset.email;
                
                utils.$('#orderNumber').value = orderNumber;
                utils.$('#emailAddress').value = email;
                
                this.trackOrder();
            });
        });
    },
    
    setupNotifications() {
        const enableSmsBtn = utils.$('#enableSmsBtn');
        if (enableSmsBtn) {
            enableSmsBtn.addEventListener('click', () => {
                modal.open('smsModal');
            });
        }
        
        const smsForm = utils.$('#smsForm');
        if (smsForm) {
            smsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.enableSmsNotifications();
            });
        }
    },
    
    trackOrder() {
        const orderNumber = utils.$('#orderNumber').value;
        const email = utils.$('#emailAddress').value;
        
        if (!orderNumber || !email) {
            toast.error('Please enter both order number and email address');
            return;
        }
        
        loading.show();
        
        // Simulate API call
        setTimeout(() => {
            loading.hide();
            
            // Check if it's a valid sample order
            const sampleOrders = ['TH-2024-001234', 'TH-2024-001235', 'TH-2024-001236'];
            
            if (sampleOrders.includes(orderNumber)) {
                this.showTrackingResults(orderNumber);
            } else {
                this.showNoResults();
            }
        }, 1500);
    },
    
    showTrackingResults(orderNumber) {
        const resultsSection = utils.$('#trackingResults');
        const noResultsSection = utils.$('#noResults');
        
        if (resultsSection) {
            resultsSection.style.display = 'block';
            this.updateOrderDetails(orderNumber);
        }
        
        if (noResultsSection) {
            noResultsSection.style.display = 'none';
        }
        
        // Scroll to results
        resultsSection?.scrollIntoView({ behavior: 'smooth' });
    },
    
    showNoResults() {
        const resultsSection = utils.$('#trackingResults');
        const noResultsSection = utils.$('#noResults');
        
        if (resultsSection) {
            resultsSection.style.display = 'none';
        }
        
        if (noResultsSection) {
            noResultsSection.style.display = 'block';
        }
        
        // Scroll to no results
        noResultsSection?.scrollIntoView({ behavior: 'smooth' });
    },
    
    updateOrderDetails(orderNumber) {
        // Update order number display
        const displayOrderNumber = utils.$('#displayOrderNumber');
        if (displayOrderNumber) {
            displayOrderNumber.textContent = orderNumber;
        }
        
        // Update order date and total based on order number
        const orderData = this.getOrderData(orderNumber);
        
        const displayOrderDate = utils.$('#displayOrderDate');
        if (displayOrderDate) {
            displayOrderDate.textContent = orderData.date;
        }
        
        const displayOrderTotal = utils.$('#displayOrderTotal');
        if (displayOrderTotal) {
            displayOrderTotal.textContent = orderData.total;
        }
    },
    
    getOrderData(orderNumber) {
        const orderData = {
            'TH-2024-001234': {
                date: 'December 15, 2024',
                total: '$2,499.00',
                status: 'out-for-delivery'
            },
            'TH-2024-001235': {
                date: 'December 16, 2024',
                total: '$999.00',
                status: 'shipped'
            },
            'TH-2024-001236': {
                date: 'December 17, 2024',
                total: '$3,299.00',
                status: 'processing'
            }
        };
        
        return orderData[orderNumber] || orderData['TH-2024-001234'];
    },
    
    enableSmsNotifications() {
        const phoneNumber = utils.$('#phoneNumber').value;
        const agreeToSms = utils.$('#agreeToSms').checked;
        
        if (!phoneNumber || !agreeToSms) {
            toast.error('Please enter your phone number and agree to receive SMS notifications');
            return;
        }
        
        if (!utils.validatePhone(phoneNumber)) {
            toast.error('Please enter a valid phone number');
            return;
        }
        
        loading.show();
        
        // Simulate API call
        setTimeout(() => {
            loading.hide();
            modal.close('smsModal');
            toast.success('SMS notifications enabled successfully!');
            
            // Update button text
            const enableSmsBtn = utils.$('#enableSmsBtn');
            if (enableSmsBtn) {
                enableSmsBtn.textContent = 'SMS Enabled';
                enableSmsBtn.disabled = true;
            }
        }, 1000);
    },
    
    copyTrackingNumber() {
        const trackingNumber = '1Z999AA1234567890';
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(trackingNumber).then(() => {
                toast.success('Tracking number copied to clipboard');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = trackingNumber;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            toast.success('Tracking number copied to clipboard');
        }
    }
};

// ===== NEWSLETTER SIGNUP =====
const newsletter = {
    init() {
        this.setupNewsletterForm();
    },
    
    setupNewsletterForm() {
        const newsletterForm = utils.$('#newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.subscribeToNewsletter();
            });
        }
    },
    
    subscribeToNewsletter() {
        const emailInput = utils.$('#newsletterEmail');
        if (!emailInput) return;
        
        const email = emailInput.value.trim();
        
        if (!email) {
            toast.error('Please enter your email address');
            return;
        }
        
        if (!utils.validateEmail(email)) {
            toast.error('Please enter a valid email address');
            return;
        }
        
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        }
        
        // Simulate API call
        setTimeout(() => {
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
            
            emailInput.value = '';
            toast.success('Thank you for subscribing to our newsletter!');
        }, 1500);
    }
};

// ===== HEADER SCROLL EFFECT =====
const headerScroll = {
    init() {
        window.addEventListener('scroll', utils.throttle(() => {
            const header = utils.$('.header');
            if (header) {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        }, 100));
    }
};

// ===== MOBILE NAVIGATION =====
const mobileNav = {
    init() {
        this.setupMobileMenu();
    },
    
    setupMobileMenu() {
        const mobileToggle = utils.$('.mobile-menu-toggle');
        const mobileNav = utils.$('.mobile-nav');
        const mobileClose = utils.$('.mobile-nav-close');
        
        if (mobileToggle && mobileNav) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                mobileNav.classList.toggle('active');
                document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
            });
        }
        
        if (mobileClose) {
            mobileClose.addEventListener('click', () => {
                mobileToggle?.classList.remove('active');
                mobileNav?.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Close on link click
        utils.$$('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle?.classList.remove('active');
                mobileNav?.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
};

// ===== GLOBAL FUNCTIONS =====
window.copyTrackingNumber = function() {
    orderTracking.copyTrackingNumber();
};

window.showCompareModal = function() {
    compareManager.showCompareModal();
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    toast.init();
    loading.init();
    heroCarousel.init();
    productManager.init();
    cartManager.init();
    wishlistManager.init();
    compareManager.init();
    faqManager.init();
    orderTracking.init();
    newsletter.init();
    headerScroll.init();
    mobileNav.init();
    
    // Setup global event listeners
    setupGlobalEventListeners();
    
    console.log('TechHaven website initialized successfully!');
});

function setupGlobalEventListeners() {
    // Form validation
    utils.$$('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!formValidator.validateForm(form)) {
                e.preventDefault();
            }
        });
        
        // Real-time validation
        form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', () => {
                formValidator.validateField(field);
            });
        });
    });
    
    // Smooth scrolling for anchor links
    utils.$$('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = utils.$(`#${targetId}`);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Close modals with Escape
        if (e.key === 'Escape') {
            const activeModal = utils.$('.modal.active');
            if (activeModal) {
                modal.close(activeModal.id);
            }
            
            // Close cart sidebar
            const cartSidebar = utils.$('#cartSidebar');
            if (cartSidebar?.classList.contains('active')) {
                cartSidebar.classList.remove('active');
            }
            
            // Close mobile nav
            const mobileNavElement = utils.$('.mobile-nav');
            if (mobileNavElement?.classList.contains('active')) {
                mobileNavElement.classList.remove('active');
                utils.$('.mobile-menu-toggle')?.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Image lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        utils.$$('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
            }, 0);
        });
    }
}

