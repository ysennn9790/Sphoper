// Shpper E-commerce Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const productsGrid = document.getElementById('productsGrid');
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const searchInput = document.getElementById('searchInput');
    const priceFilter = document.getElementById('priceFilter');
    const sortFilter = document.getElementById('sortFilter');
    const navLinks = document.querySelectorAll('.nav-links a');
    const ctaBtn = document.querySelector('.cta-btn');

    // Cart functionality
    let cart = [];
    let currentCategory = 'all';
    let currentSearch = '';
    let currentPriceRange = 'all';
    let currentSort = 'default';

    // Sample product data with clothing items (₹1000-5000 range)
    const products = [
        {
            id: 1,
            name: 'Premium Cotton Shirt',
            category: 'shirts',
            price: 1899,
            image: '👔',
            description: 'High-quality cotton shirt perfect for formal occasions'
        },
        {
            id: 2,
            name: 'Casual Polo T-Shirt',
            category: 't-shirts',
            price: 1299,
            image: '👕',
            description: 'Comfortable polo t-shirt for everyday wear'
        },
        {
            id: 3,
            name: 'Designer Denim Jeans',
            category: 'jeans',
            price: 2999,
            image: '👖',
            description: 'Stylish denim jeans with perfect fit'
        },
        {
            id: 4,
            name: 'Elegant Summer Dress',
            category: 'dresses',
            price: 3499,
            image: '👗',
            description: 'Beautiful summer dress for special occasions'
        },
        {
            id: 5,
            name: 'Leather Jacket',
            category: 'jackets',
            price: 4799,
            image: '🧥',
            description: 'Premium leather jacket for style and warmth'
        },
        {
            id: 6,
            name: 'Formal Business Shirt',
            category: 'shirts',
            price: 2199,
            image: '👔',
            description: 'Professional business shirt in crisp white'
        },
        {
            id: 7,
            name: 'Graphic Print T-Shirt',
            category: 't-shirts',
            price: 999,
            image: '👕',
            description: 'Trendy graphic print t-shirt for youth'
        },
        {
            id: 8,
            name: 'Slim Fit Jeans',
            category: 'jeans',
            price: 2599,
            image: '👖',
            description: 'Modern slim fit jeans in dark blue'
        },
        {
            id: 9,
            name: 'Party Cocktail Dress',
            category: 'dresses',
            price: 4299,
            image: '👗',
            description: 'Stunning cocktail dress for evening parties'
        },
        {
            id: 10,
            name: 'Winter Puffer Jacket',
            category: 'jackets',
            price: 3899,
            image: '🧥',
            description: 'Warm puffer jacket for cold weather'
        },
        {
            id: 11,
            name: 'Linen Casual Shirt',
            category: 'shirts',
            price: 1699,
            image: '👔',
            description: 'Breathable linen shirt for summer comfort'
        },
        {
            id: 12,
            name: 'Sports T-Shirt',
            category: 't-shirts',
            price: 1199,
            image: '👕',
            description: 'Moisture-wicking sports t-shirt for workouts'
        }
    ];

    // Cart event listeners
    cartIcon.addEventListener('click', function() {
        cartSidebar.classList.add('open');
    });

    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('open');
    });

    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
            cartSidebar.classList.remove('open');
        }
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        currentSearch = this.value.toLowerCase();
        loadProducts();
    });

    // Filter functionality
    priceFilter.addEventListener('change', function() {
        currentPriceRange = this.value;
        loadProducts();
    });

    sortFilter.addEventListener('change', function() {
        currentSort = this.value;
        loadProducts();
    });

    // Category navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            currentCategory = this.dataset.category;
            loadProducts();
        });
    });

    // CTA button scroll to products
    ctaBtn.addEventListener('click', function() {
        document.querySelector('.products').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Product filtering logic
    function filterProducts() {
        let filteredProducts = [...products];

        // Filter by category
        if (currentCategory !== 'all') {
            filteredProducts = filteredProducts.filter(product => 
                product.category === currentCategory
            );
        }

        // Filter by search
        if (currentSearch) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(currentSearch) ||
                product.category.toLowerCase().includes(currentSearch)
            );
        }

        // Filter by price range
        if (currentPriceRange !== 'all') {
            const [min, max] = currentPriceRange.split('-').map(Number);
            filteredProducts = filteredProducts.filter(product =>
                product.price >= min && product.price <= max
            );
        }

        // Sort products
        switch (currentSort) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // Keep original order
                break;
        }

        return filteredProducts;
    }

    // Load and display products
    function loadProducts() {
        const filteredProducts = filterProducts();
        
        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <i class="fas fa-search"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            `;
            return;
        }

        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card fade-in-up" data-product-id="${product.id}">
                <div class="product-image">
                    ${product.image}
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-category">${product.category.replace('-', ' ')}</p>
                    <p class="product-price">₹${product.price.toLocaleString()}</p>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Add to cart function
    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        updateCart();
        showAddToCartAnimation();
    }

    // Update cart display
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

        // Update cart items
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Add some products to get started</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">${item.image}</div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                            <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: 10px; background: #ff6b6b; color: white;">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Update total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toLocaleString();
    }

    // Change quantity function
    window.changeQuantity = function(productId, change) {
        const item = cart.find(item => item.id === productId);
        if (!item) return;

        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }

    // Remove from cart function
    window.removeFromCart = function(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    // Show add to cart animation
    function showAddToCartAnimation() {
        cartIcon.style.animation = 'none';
        cartIcon.offsetHeight; // Trigger reflow
        cartIcon.style.animation = 'fadeInUp 0.3s ease';
    }

    // Initialize
    loadProducts();
    updateCart();

    // Smooth scrolling for all internal links
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
});

