// Sample Product Data
const products = [
    {
        id: 1,
        name: "Summer Dress",
        category: "Women's Fashion",
        price: 79.99,
        originalPrice: 99.99,
        image: "https://via.placeholder.com/220x220?text=Summer+Dress",
        rating: 4.5,
        reviews: 128,
        colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
        sizes: ["XS", "S", "M", "L", "XL"],
        description: "Beautiful summer dress perfect for any occasion. Made from premium cotton with breathable fabric."
    },
    {
        id: 2,
        name: "Classic Oxford Shirt",
        category: "Men's Fashion",
        price: 59.99,
        originalPrice: 79.99,
        image: "https://via.placeholder.com/220x220?text=Oxford+Shirt",
        rating: 4.8,
        reviews: 95,
        colors: ["#2C3E50", "#ECF0F1", "#3498DB"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Timeless oxford shirt ideal for work or casual wear. Premium cotton blend for durability."
    },
    {
        id: 3,
        name: "Designer Handbag",
        category: "Accessories",
        price: 189.99,
        originalPrice: 249.99,
        image: "https://via.placeholder.com/220x220?text=Handbag",
        rating: 4.7,
        reviews: 203,
        colors: ["#000000", "#8B4513", "#DAA520"],
        sizes: ["One Size"],
        description: "Elegant designer handbag with multiple compartments. Perfect for both work and leisure."
    },
    {
        id: 4,
        name: "Running Sneakers",
        category: "Footwear",
        price: 119.99,
        originalPrice: 159.99,
        image: "https://via.placeholder.com/220x220?text=Sneakers",
        rating: 4.6,
        reviews: 341,
        colors: ["#FF6B6B", "#000000", "#FFFFFF"],
        sizes: ["5", "6", "7", "8", "9", "10", "11", "12"],
        description: "High-performance running sneakers with cushioned sole and breathable mesh upper."
    },
    {
        id: 5,
        name: "Leather Belt",
        category: "Accessories",
        price: 49.99,
        originalPrice: 69.99,
        image: "https://via.placeholder.com/220x220?text=Leather+Belt",
        rating: 4.4,
        reviews: 87,
        colors: ["#8B4513", "#000000", "#654321"],
        sizes: ["30", "32", "34", "36", "38"],
        description: "Premium leather belt handcrafted with attention to detail. Timeless accessory for any wardrobe."
    },
    {
        id: 6,
        name: "Casual Blazer",
        category: "Women's Fashion",
        price: 149.99,
        originalPrice: 199.99,
        image: "https://via.placeholder.com/220x220?text=Blazer",
        rating: 4.9,
        reviews: 156,
        colors: ["#2C3E50", "#663399", "#DC143C"],
        sizes: ["XS", "S", "M", "L", "XL"],
        description: "Modern casual blazer perfect for professional and casual settings. Premium fabric blend."
    }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cart-btn');
const wishlistBtn = document.getElementById('wishlist-btn');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const productModal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');
const newsletterForm = document.getElementById('newsletterForm');
const accountBtn = document.getElementById('account-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
    updateWishlistUI();
    setupEventListeners();
});

// Render Products
function renderProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <button class="wishlist-icon" onclick="toggleWishlist(event, ${product.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-rating">
                    <span class="stars">${renderStars(product.rating)}</span>
                    <span class="count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current">$${product.price.toFixed(2)}</span>
                    <span class="original">$${product.originalPrice.toFixed(2)}</span>
                    <span class="discount">-${Math.round((1 - product.price/product.originalPrice) * 100)}%</span>
                </div>
                <button class="product-button" onclick="addToCart(event, ${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Render Stars
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '½';
    return stars;
}

// Open Product Modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    const selectedSize = product.sizes[0];
    const selectedColor = product.colors[0];
    
    modalBody.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <div class="rating">${renderStars(product.rating)} (${product.reviews} reviews)</div>
                <div class="product-detail-price">$${product.price.toFixed(2)}</div>
                <p class="product-detail-description">${product.description}</p>
                
                <div class="product-options">
                    <div class="option-group">
                        <label>Size</label>
                        <div class="size-options">
                            ${product.sizes.map(size => `
                                <button class="size-btn ${size === selectedSize ? 'active' : ''}" data-size="${size}">${size}</button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="option-group">
                        <label>Color</label>
                        <div class="color-options">
                            ${product.colors.map(color => `
                                <div class="color-option ${color === selectedColor ? 'active' : ''}" style="background-color: ${color}" data-color="${color}" title="Color"></div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="option-group">
                        <label>Quantity</label>
                        <div class="quantity-selector">
                            <button class="qty-minus">-</button>
                            <input type="number" value="1" min="1" class="qty-input">
                            <button class="qty-plus">+</button>
                        </div>
                    </div>
                </div>
                
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCartFromModal(${product.id})">Add to Cart</button>
                    <button class="wishlist-btn" onclick="toggleWishlistModal(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    productModal.classList.add('active');
    setupModalEventListeners();
}

// Setup Modal Event Listeners
function setupModalEventListeners() {
    const qtyInput = modalBody.querySelector('.qty-input');
    const qtyMinus = modalBody.querySelector('.qty-minus');
    const qtyPlus = modalBody.querySelector('.qty-plus');
    const sizeButtons = modalBody.querySelectorAll('.size-btn');
    const colorOptions = modalBody.querySelectorAll('.color-option');
    
    qtyMinus.addEventListener('click', () => {
        qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1);
    });
    
    qtyPlus.addEventListener('click', () => {
        qtyInput.value = parseInt(qtyInput.value) + 1;
    });
    
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            sizeButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
    
    colorOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            colorOptions.forEach(o => o.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
}

// Add to Cart from Modal
function addToCartFromModal(productId) {
    const qtyInput = modalBody.querySelector('.qty-input');
    const selectedSize = modalBody.querySelector('.size-btn.active').dataset.size;
    const selectedColor = modalBody.querySelector('.color-option.active').dataset.color;
    const quantity = parseInt(qtyInput.value);
    
    addToCartWithOptions(productId, quantity, selectedSize, selectedColor);
    productModal.classList.remove('active');
}

// Add to Cart
function addToCart(event, productId) {
    event.stopPropagation();
    const product = products.find(p => p.id === productId);
    addToCartWithOptions(productId, 1, product.sizes[0], product.colors[0]);
}

// Add to Cart with Options
function addToCartWithOptions(productId, quantity, size, color) {
    const product = products.find(p => p.id === productId);
    const cartItemKey = `${productId}-${size}-${color}`;
    
    const existingItem = cart.find(item => item.key === cartItemKey);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            key: cartItemKey,
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            size: size,
            color: color,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartUI();
    showNotification('Added to cart!');
}

// Toggle Wishlist
function toggleWishlist(event, productId) {
    event.stopPropagation();
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(productId);
    }
    saveWishlist();
    updateWishlistUI();
}

// Toggle Wishlist from Modal
function toggleWishlistModal(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(productId);
    }
    saveWishlist();
    updateWishlistUI();
}

// Update Cart UI
function updateCartUI() {
    const cartBadge = cartBtn.querySelector('.badge');
    cartBadge.textContent = cart.length;
    
    cartItemsContainer.innerHTML = cart.length === 0 
        ? '<p style="padding: 20px; text-align: center; color: #999;">Your cart is empty</p>'
        : cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image" style="background-image: url('${item.image}'); background-size: cover;"></div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button onclick="updateCartQuantity('${item.key}', ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartQuantity('${item.key}', ${item.quantity + 1})">+</button>
                    </div>
                    <a class="cart-item-remove" onclick="removeFromCart('${item.key}')">Remove</a>
                </div>
            </div>
        `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = '$' + total.toFixed(2);
}

// Update Cart Quantity
function updateCartQuantity(key, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(key);
        return;
    }
    const item = cart.find(c => c.key === key);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartUI();
    }
}

// Remove from Cart
function removeFromCart(key) {
    cart = cart.filter(item => item.key !== key);
    saveCart();
    updateCartUI();
}

// Update Wishlist UI
function updateWishlistUI() {
    const wishlistBadge = wishlistBtn.querySelector('.badge');
    wishlistBadge.textContent = wishlist.length;
    
    document.querySelectorAll('.wishlist-icon').forEach(btn => {
        const productId = parseInt(btn.closest('.product-card').onclick.toString().match(/\d+/)[0]);
        if (wishlist.includes(productId)) {
            btn.style.color = '#ff6b6b';
            btn.style.background = '#ffe0e0';
        } else {
            btn.style.color = '#000';
            btn.style.background = '#fff';
        }
    });
}

// Save and Load Cart
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        font-weight: 600;
        z-index: 4000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Setup Event Listeners
function setupEventListeners() {
    // Cart Sidebar
    cartBtn.addEventListener('click', () => {
        cartSidebar.classList.toggle('active');
    });
    
    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });
    
    // Modal Close
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.remove('active');
        }
    });
    
    document.querySelector('.modal-close').addEventListener('click', () => {
        productModal.classList.remove('active');
    });
    
    // Newsletter Form
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        localStorage.setItem('newsletter', email);
        showNotification('Thank you for subscribing!');
        newsletterForm.reset();
    });
    
    // Account Button
    accountBtn.addEventListener('click', () => {
        // TODO: Implement login/register functionality
        alert('Login functionality coming soon!');
    });
}
