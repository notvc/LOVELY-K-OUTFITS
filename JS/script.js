// ==========================================
// 1. CRITICAL FAILSAFE: HIDE PRELOADER
// ==========================================
// Placed at the very top so it runs even if errors occur below
const preloader = document.getElementById('preloader');
if (preloader) {
    // Absolute failsafe: Hide after 4 seconds regardless of anything
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 4000);
    
    window.addEventListener('load', () => {
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
    });
}

const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('#nav-list');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active'); // Animates the hamburger to an X
    menuLinks.classList.toggle('active'); // Slides the menu in
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('is-active');
        menuLinks.classList.remove('active');
    });
});

// Shopping Cart System
let cart = [];
try {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
} catch (e) {
    console.warn("Local storage unavailable:", e);
}
const cartBtn = document.getElementById('cart-btn');
const cartDropdown = document.getElementById('cart-dropdown');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountBadge = document.getElementById('cart-count');
const cartTotalDisplay = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Initialize cart UI on load
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});

// Open cart modal
cartBtn.addEventListener('click', () => {
    cartDropdown.style.display = 'flex';
    cartDropdown.offsetHeight; // Reflow
    cartDropdown.classList.add('open');
});

// Move cart dropdown to document body so it escapes the navbar stacking context
document.body.appendChild(cartDropdown);

function closeCartAnimated() {
    cartDropdown.classList.remove('open');
    const cartModalContent = cartDropdown.querySelector('.cart-modal-content');
    if (cartModalContent) cartModalContent.style.transform = '';
    setTimeout(() => {
        cartDropdown.style.display = 'none';
    }, 350);
}

// Swipe to dismiss for Cart (Mobile)
const cartModalContent = cartDropdown.querySelector('.cart-modal-content');
if (cartModalContent) {
    let cartStartY = 0;
    let cartCurrentY = 0;
    let isCartDragging = false;

    cartModalContent.addEventListener('touchstart', (e) => {
        if (window.innerWidth > 768) return;
        const scrollable = e.target.closest('.cart-items');
        if (scrollable && scrollable.scrollTop > 0) return; // Allow normal scrolling
        cartStartY = e.touches[0].clientY;
        isCartDragging = true;
        cartModalContent.style.transition = 'none'; // Remove CSS transition for smooth drag
    }, { passive: true });

    cartModalContent.addEventListener('touchmove', (e) => {
        if (!isCartDragging) return;
        cartCurrentY = e.touches[0].clientY;
        const diffY = cartCurrentY - cartStartY;
        if (diffY > 0) { // Only drag downwards
            cartModalContent.style.transform = `translateY(${diffY}px)`;
        }
    }, { passive: true });

    cartModalContent.addEventListener('touchend', () => {
        if (!isCartDragging) return;
        isCartDragging = false;
        cartModalContent.style.transition = 'transform 0.35s ease-out';
        const diffY = cartCurrentY - cartStartY;
        if (diffY > 100) {
            closeCartAnimated();
        } else {
            cartModalContent.style.transform = ''; // Snap back if threshold not met
        }
    });
}

// Close cart modal via overlay or close button
cartDropdown.addEventListener('click', (e) => {
    if (e.target === cartDropdown || e.target.closest('.cart-close') || e.target.closest('.continue-shopping-btn')) {
        closeCartAnimated();
    }
});

// Add to cart function
function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: product.name,
            // Safely parse price to integer whether it's stored as a string or number
            price: parseInt(String(product.price || '0').replace(/[^0-9]/g, ''), 10) || 0,
            img: product.img,
            instagram_url: product.instagram_url,
            quantity: 1
        });
    }
    
    updateCart();
    
    // Badge Animation (Pop and Pulse)
    cartCountBadge.animate([
        { transform: 'scale(1)', backgroundColor: 'var(--RED)' },
        { transform: 'scale(1.4)', backgroundColor: 'var(--PEACH)' },
        { transform: 'scale(1)', backgroundColor: 'var(--RED)' }
    ], {
        duration: 400,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
    });
    
    // Provide visual feedback
    showToast(`${product.name || 'Item'} added to cart!`, 'success');
}

// Helper function to sanitize HTML to prevent XSS
function escapeHTML(str) {
    if (!str) return '';
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
}

// Update cart display
function updateCart() {
    // Save to localStorage
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) { /* Ignore file protocol errors */ }

    // Update count badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountBadge.textContent = totalItems;
    
    // Update cart items display
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotalDisplay.textContent = '₦0';
        return;
    }
    
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        itemElement.innerHTML = `
            <div class="cart-item-details">
                <h5>${escapeHTML(item.name)}</h5>
                <p>₦${item.price} x ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                <button class="remove-btn" onclick="removeFromCart(${index})">✕</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
    
    // Update total
    cartTotalDisplay.textContent = `₦${total.toLocaleString()}`;
}

// Update quantity
function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        updateCart();
    }
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showInfoModal('YOUR CART IS EMPTY', 'Add some items to your cart before checking out.');
        return;
    }
    
    showCheckoutModal();
});

function showCheckoutModal() {
    const modal = document.createElement('div');
    modal.className = 'product-modal-overlay';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.35s ease-out';
    modal.style.zIndex = '9999'; // Ensures it appears above the cart dropdown
    
    modal.innerHTML = `
        <div class="product-modal-content" style="transform: scale(0.92); transition: transform 0.35s ease-out; text-align: center;">
            <button class="modal-close">✕</button>
            <h2 class="modal-title">DELIVERY DETAILS</h2>
            <p class="modal-description" style="margin-bottom: 20px;">Please enter your details to complete the order via WhatsApp.</p>
            
            <div style="text-align: left;">
                <input type="text" id="checkout-name" class="checkout-input" placeholder="Full Name *" required>
                <textarea id="checkout-address" class="checkout-input" placeholder="Delivery Address *" rows="3" required style="resize: vertical;"></textarea>
                <input type="tel" id="checkout-phone" class="checkout-input" placeholder="Alternate Phone Number (Optional)">
            </div>
            
            <button class="checkout-btn confirm-checkout-btn" style="margin-top: 10px;">PROCEED TO WHATSAPP</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.offsetHeight; // reflow
    modal.style.opacity = '1';
    modal.querySelector('.product-modal-content').style.transform = 'scale(1)';
    
    const closeModal = () => {
        modal.style.opacity = '0';
        modal.querySelector('.product-modal-content').style.transform = 'scale(0.92)';
        setTimeout(() => modal.remove(), 350);
    };
    
    modal.querySelector('.modal-close').onclick = closeModal;
    modal.onclick = (e) => { if (e.target === modal) closeModal(); };
    
    modal.querySelector('.confirm-checkout-btn').onclick = () => {
        const name = document.getElementById('checkout-name').value.trim();
        const address = document.getElementById('checkout-address').value.trim();
        const phone = document.getElementById('checkout-phone').value.trim();
        
        if (!name || !address) {
            showToast('Please provide your name and delivery address.', 'error');
            return;
        }

    // Construct WhatsApp Message with specific clothing info for further discussion
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    let message = "🛍️ *NEW ORDER INQUIRY - LOVELY K OUTFITS*\n";
    message += `📅 *Date:* ${dateStr}\n`;
    message += `⏰ *Time:* ${timeStr}\n`;
    message += `-----------------------------------\n\n`;
    message += "Hello! I am interested in the following items and would like to talk more about them here:\n\n";
    
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        message += `📍 *${item.name}*\n`;
        message += `   Quantity: ${item.quantity} | Price: ₦${item.price.toLocaleString()}\n`;
        message += `   Subtotal: ₦${subtotal.toLocaleString()}\n`;
        if (item.instagram_url) message += `   Instagram Link: ${item.instagram_url}\n`;
        message += `\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `-----------------------------------\n`;
    message += `💰 *TOTAL ESTIMATE: ₦${total.toLocaleString()}*\n\n`;
    message += `👤 *Customer Name:* ${name}\n`;
    message += `🚚 *Delivery Address:* ${address}\n`;
    if (phone) message += `📞 *Alternate Phone:* ${phone}\n\n`;
    else message += `\n`;
    message += "Please let me know if these are available so we can discuss delivery. Thank you!";

    const whatsappNumber = "2348036806640"; // REPLACE with your actual business WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
        closeModal();
    closeCartAnimated(); // Hide modal after checkout
    };
}

// Scroll Reveal - FIXED: No fade out, only fade in once to prevent animation glitch on fast scroll
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Only animate IN, never animate out - prevents glitch on fast scroll
        if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
            let delay = 0;
            const delayMatch = entry.target.className.match(/reveal-delay-(\d+)/);
            if (delayMatch) {
                delay = parseInt(delayMatch[1]) * 80;
            }

            entry.target.classList.add('visible'); // Add 'visible' class
            entry.target.style.willChange = 'opacity, transform'; // Optimize animation performance
            
            entry.target.animate([
                { opacity: 0, transform: 'translateY(20px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], {
                duration: 1200,
                delay: delay,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                fill: 'forwards'
            });
            
            // Remove will-change after animation completes to prevent memory issues
            setTimeout(() => {
                entry.target.style.willChange = 'auto';
            }, 1200 + delay);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

function observeRevealElements() {
    const elements = document.querySelectorAll(`
        .reveal:not([data-observed]),
        h1:not([data-observed]),
        h2:not([data-observed]),
        h3:not([data-observed]),
        p:not([data-observed]),
        .product-card:not([data-observed]),
        .category-card:not([data-observed]),
        .testimonial-card:not([data-observed]),
        .submit-btn:not([data-observed]),
        .footer-brand:not([data-observed]),
        .footer-links:not([data-observed]),
        .footer-socials:not([data-observed]),
        .logo:not([data-observed]),
        .nav-links li:not([data-observed]),
        .nav-actions:not([data-observed]),
        .menu-toggle:not([data-observed])
    `);
    
    elements.forEach(el => {
        // Do not apply to modals, preloader, typing effects, or nested texts within cards/logo
        if (
            el.closest('#preloader') || 
            el.closest('.cart-dropdown') || 
            el.closest('.product-modal-overlay') ||
            el.closest('.carousel-nav') ||
            (el.closest('.product-card') && el !== el.closest('.product-card')) ||
            (el.closest('.category-card') && el !== el.closest('.category-card')) ||
            (el.closest('.testimonial-card') && el !== el.closest('.testimonial-card')) ||
            (el.closest('.logo') && el !== el.closest('.logo')) ||
            el.classList.contains('typing-cursor') ||
            el.closest('.footer-bottom')
        ) {
            return;
        }
        
        el.setAttribute('data-observed', 'true');
        
        // Initialize as hidden to prevent pop-in before animation
        if (!el.classList.contains('visible')) {
            el.style.opacity = '0';
        }
        
        revealObserver.observe(el);
    });
}

// 2. New Product Generation Logic
const productContainer = document.querySelector('#product-container');

// Backend Integration Constants (Supabase Headless CMS)
const SUPABASE_URL = 'https://zhspnvguhegszmeoswja.supabase.co'; // Replace with your Supabase Project URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpoc3Budmd1aGVnc3ptZW9zd2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTQ4ODEsImV4cCI6MjA5Mjg5MDg4MX0.Rzw9BamFQ5hYANSJVJzFfB47fe0rvmirtj5xtqx6u44'; // Replace with your Supabase API Key

// Initialize Supabase Client
// Note: Make sure to include the Supabase CDN script in your HTML file before this script.
let supabaseClient = null;
try {
    if (window.supabase) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
            auth: { persistSession: false } // Fixes SecurityError when opening via file:// protocol
        });
    }
} catch (e) {
    console.error('Supabase initialization failed:', e);
}

// Determine initial items to show based on screen size
function getInitialItemCount() {
    return window.innerWidth >= 768 ? 10 : 6;
}

let itemsToShow = getInitialItemCount();
let allItemsShown = false;

// Function to render products
function renderProducts(sourceList, count, isSearch = false, searchTerm = "") {
    productContainer.innerHTML = '';

    if (sourceList.length === 0) {
        productContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px; color: var(--text-main); font-style: italic;">
                No products found matching your search...
            </div>`;
        return;
    }

    sourceList.slice(0, count).forEach((product, index) => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.setAttribute('data-category', product.category || 'all');
        card.style.cursor = 'pointer';

        const escapedName = escapeHTML(product.name || 'Unnamed Product');
        const safeImg = product.img || ''; // Prevent null reference errors
        const srcsetImg = safeImg ? safeImg.replace('.jpg', '-2x.jpg').replace('.png', '-2x.png') : '';

        const playIconHtml = product.instagram_url ? `<div class="play-icon-overlay"><i class="fa-solid fa-play"></i></div>` : '';

        card.innerHTML = `
            <div class="product-image loading">
                <img src="${escapeHTML(safeImg)}" srcset="${escapeHTML(safeImg)} 1x, ${escapeHTML(srcsetImg)} 2x" alt="${escapedName}" loading="lazy">
                ${playIconHtml}
                ${product.badge ? `<span class="badge">${escapeHTML(product.badge)}</span>` : ''}
            </div>
            <div class="product-info">
                <h4 class="product-title-display"></h4>
                <p class="price">${escapeHTML(product.price)}</p>
            </div>
            <button class="quick-add-btn">ADD TO CART</button>
        `;
        
        const quickAddBtn = card.querySelector('.quick-add-btn');
        quickAddBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(product);
        });

        const titleElement = card.querySelector('.product-title-display');
        if (searchTerm) {
            const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            const parts = product.name.split(regex);
            parts.forEach(part => {
                if (part.toLowerCase() === searchTerm.toLowerCase()) {
                    const mark = document.createElement('mark');
                    mark.className = 'highlight';
                    mark.textContent = part;
                    titleElement.appendChild(mark);
                } else if (part) {
                    titleElement.appendChild(document.createTextNode(part));
                }
            });
        } else {
            titleElement.textContent = product.name;
        }

        card.addEventListener('click', () => openProductModal(product));

        // Handle image fade-in after load
        const img = card.querySelector('img');
        const container = card.querySelector('.product-image');
        
        if (!safeImg) {
            img.src = 'https://via.placeholder.com/400x533/FBE4D8/54162B?text=LOVELY+K';
            img.srcset = '';
        }

        if (img.complete) {
            img.classList.add('loaded');
            container.classList.remove('loading');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
                container.classList.remove('loading');
            });
            // Failsafe: if the image is blocked or broken, show the placeholder
            img.addEventListener('error', () => {
                img.src = 'https://via.placeholder.com/400x533/FBE4D8/54162B?text=LOVELY+K';
                img.classList.add('loaded');
                container.classList.remove('loading');
            });
        }

        // Staggered Entrance with WAAPI
        card.animate([
            { opacity: 0, transform: 'scale(0.94)' },
            { opacity: 1, transform: 'scale(1)' }
        ], {
            duration: 700,
            delay: index * 60,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            fill: 'both'
        });

        productContainer.appendChild(card);
    });
    observeRevealElements(); // Observe newly rendered products
    
    // Add "Show More" or "Show Less" button (disabled during search)
    if (!isSearch && (count < sourceList.length || allItemsShown)) {
        const showMoreBtn = document.createElement('div');
        showMoreBtn.style.gridColumn = '1 / -1';
        showMoreBtn.style.textAlign = 'center';
        showMoreBtn.style.padding = '30px';
        
        const btnElement = document.createElement('button');
        btnElement.textContent = allItemsShown ? 'SHOW LESS' : 'SHOW MORE';
        btnElement.style.cssText = `
            background-color: transparent;
            color: var(--PEACH);
            border: 2px solid var(--PEACH);
            padding: 12px 40px;
            font-family: 'Montserrat', sans-serif;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 3px;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
            border-radius: 4px;
        `;
        
        btnElement.onmouseover = function() {
            this.style.backgroundColor = 'var(--PEACH)';
            this.style.color = 'var(--DARKRED)';
            this.style.boxShadow = '0 0 15px rgba(253, 164, 129, 0.4)';
            this.style.transform = 'translateY(-3px)';
        };
        
        btnElement.onmouseout = function() {
            this.style.backgroundColor = 'transparent';
            this.style.color = 'var(--PEACH)';
            this.style.boxShadow = 'none';
            this.style.transform = 'none';
        };
        
        btnElement.onclick = function() {
            if (allItemsShown) {
                // Show Less: Return to initial count
                itemsToShow = getInitialItemCount();
                allItemsShown = false;
                renderProducts(sourceList, itemsToShow);
                observeRevealElements();
            } else {
                // Show all remaining items
                itemsToShow = sourceList.length;
                allItemsShown = true;
                renderProducts(sourceList, itemsToShow);
                observeRevealElements();
            }
        };
        
        showMoreBtn.appendChild(btnElement);
        productContainer.appendChild(showMoreBtn);
    }
}

// Category Grid Logic: Single Click vs Double-Tap with Timer
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    const bg = card.querySelector('.card-bg');
    if(bg) {
        bg.style.transition = 'background-position 0.1s ease-out, transform 0.8s ease, opacity 0.5s ease';
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const xOffset = ((e.clientX - rect.left) / rect.width - 0.5) * -24; 
            const yOffset = ((e.clientY - rect.top) / rect.height - 0.5) * -24;
            bg.style.backgroundPosition = `calc(50% + ${xOffset}px) calc(50% + ${yOffset}px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            bg.style.transition = 'background-position 0.5s ease-out, transform 0.8s ease, opacity 0.5s ease';
            bg.style.backgroundPosition = 'center';
            setTimeout(() => bg.style.transition = 'background-position 0.1s ease-out, transform 0.8s ease, opacity 0.5s ease', 500);
        });
    }

    let clickCount = 0;
    let clickTimer = null;

    card.addEventListener('click', () => {
        clickCount++;

        if (clickCount === 2) {
            // Double click/tap detected
            clearTimeout(clickTimer);
            clickCount = 0;
            const url = card.getAttribute('data-url');
            if (url) window.location.href = url;
        } else if (clickCount === 1) {
            clickTimer = setTimeout(() => {
                if (clickCount === 1) {
                    // Single click confirmed after timer expires
                    const category = card.getAttribute('data-category');

                    // Update UI State
                    categoryCards.forEach(c => c.classList.remove('active'));
                    card.classList.add('active');

                    // Smooth Fade Out for Grid
                    productContainer.style.opacity = '0';
                    productContainer.style.transform = 'translateY(10px)';

                    setTimeout(() => {
                        if (category === 'all') {
                            itemsToShow = getInitialItemCount();
                            allItemsShown = false;
                            window.currentPageProducts = products;
                            renderProducts(window.currentPageProducts, itemsToShow);
                        } else {
                            const filtered = products.filter(p => p.category === category);
                            window.currentPageProducts = filtered;
                            itemsToShow = getInitialItemCount();
                            renderProducts(filtered, itemsToShow);
                        }

                        // Smooth Fade In for Grid
                        productContainer.style.opacity = '1';
                        productContainer.style.transform = 'translateY(0)';
                    }, 350);
                }
                clickCount = 0;
            }, 280);
        }
    });
});

// Function to render loading skeletons before Supabase fetch completes
function renderProductSkeletons(count) {
    if (!productContainer) return;
    productContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const skeletonCard = document.createElement('div');
        skeletonCard.classList.add('product-card');
        skeletonCard.style.pointerEvents = 'none'; // Prevent interactions
        skeletonCard.innerHTML = `
            <div class="product-image loading"></div>
            <div class="product-info" style="display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 20px 5px;">
                <div class="skeleton-text" style="width: 80%; height: 14px; border-radius: 4px;"></div>
                <div class="skeleton-text" style="width: 40%; height: 14px; border-radius: 4px;"></div>
            </div>
        `;
        productContainer.appendChild(skeletonCard);
    }
}

let products = [];
async function initProducts() {
    // Show skeleton placeholders instantly
    renderProductSkeletons(getInitialItemCount());
    
    try {
        if (SUPABASE_URL === 'YOUR_SUPABASE_URL_HERE') {
            throw new Error('Supabase not configured.');
        }
        if (!supabaseClient) {
            throw new Error('Supabase library not loaded. Please add the CDN link to your HTML.');
        }
        
        const { data, error } = await supabaseClient.from('products').select('*');
        
        if (error) throw error;
        products = data || [];
    } catch (error) {
        console.error('Failed to load products:', error.message);
        products = [];
    }
    
    // Smart detection using the actual file name instead of the page title
    const currentPath = window.location.pathname.toLowerCase();
    let pageCategory = null;
    
    if (currentPath.includes('hair.html')) pageCategory = 'hair';
    else if (currentPath.includes('shoes.html')) pageCategory = 'shoes';
    else if (currentPath.includes('womenclothes.html')) pageCategory = 'women';
    else if (currentPath.includes('menclothes.html')) pageCategory = 'men';
    else if (currentPath.includes('accessories.html') || currentPath.includes('accesories.html')) pageCategory = 'accessories';

    if (pageCategory) {
        window.currentPageProducts = products.filter(p => p.category === pageCategory);
        itemsToShow = getInitialItemCount();
        renderProducts(window.currentPageProducts, itemsToShow);
    } else {
        window.currentPageProducts = products;
        renderProducts(window.currentPageProducts, itemsToShow);
    }
}
initProducts();

// Typing Effect
const typingTarget = document.querySelector('.product-header h3');
if (typingTarget) {
    const fullText = typingTarget.textContent;
    // FIX 5: Protect the typing effect element from the reveal observer
    typingTarget.classList.remove('reveal', 'reveal-delay-2');
    typingTarget.style.cssText = 'opacity: 1; transform: none;';
    typingTarget.textContent = '';
    typingTarget.classList.add('typing-cursor');

    let charIndex = 0;

    function typeText() {
        if (charIndex < fullText.length) {
            typingTarget.textContent += fullText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 60);
        } else {
            // Remove cursor blink after typing finishes
            setTimeout(() => {
                typingTarget.classList.remove('typing-cursor');
            }, 1000);
        }
    }

    // Start typing only when the element scrolls into view
    const typingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeText, 400);
                typingObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    typingObserver.observe(typingTarget);
}

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    if (!allItemsShown) {
        const newCount = getInitialItemCount();
        if (newCount !== itemsToShow) {
            itemsToShow = newCount;
            if (window.currentPageProducts) {
                renderProducts(window.currentPageProducts, itemsToShow);
            }
        }
    }
});

// Search Filter Logic
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const header = document.querySelector('.product-header h2');
        
        // Filter products: Only show items matching the specific keyword in name, description, or category
        const filteredProducts = window.currentPageProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );

        if (searchTerm === "") {
            if (header) header.textContent = "FEATURED COLLECTION";
            allItemsShown = false;
            itemsToShow = getInitialItemCount();
            renderProducts(window.currentPageProducts, itemsToShow);
        } else {
            if (header) header.textContent = `SEARCH RESULTS: "${searchTerm.toUpperCase()}"`;
            renderProducts(filteredProducts, filteredProducts.length, true, searchTerm);
        }
    });
}

// ... (Keep your mobile menu and product generation code at the top) ...

const themeBtn = document.getElementById('theme-toggle');
let currentTheme = null;
try { currentTheme = localStorage.getItem('theme'); } catch(e) {}

// 1. DEFINE THE MISSING FUNCTION
function applyThemeColors(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

// 2. INITIAL THEME LOAD
if (currentTheme) {
    applyThemeColors(currentTheme);
} else {
    applyThemeColors('light');
}

// 3. SINGLE THEME CLICK LISTENER
themeBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = (theme === 'dark') ? 'light' : 'dark';
    try { localStorage.setItem('theme', newTheme); } catch(e) {}
    applyThemeColors(newTheme);
});

// 4. TESTIMONIAL GENERATION

let testimonials = [];
const track = document.getElementById('testimonial-track');

async function initTestimonials() {
    try {
        if (SUPABASE_URL === 'YOUR_SUPABASE_URL_HERE') {
            throw new Error('Supabase not configured.');
        }
        if (!supabaseClient) {
            throw new Error('Supabase library not loaded. Please add the CDN link to your HTML.');
        }
        
        const { data, error } = await supabaseClient.from('testimonials').select('*');
        
        if (error) throw error;
        testimonials = data || [];
    } catch (error) {
        console.error('Failed to load testimonials:', error.message);
        testimonials = [];
    }

    if (track) {
        testimonials.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('testimonial-card', 'reveal', `reveal-delay-${(index % 5) + 1}`);
            card.innerHTML = `
                <p>"${escapeHTML(item.text)}"</p>
                <h4>${escapeHTML(item.author)}</h4>
            `;
            track.appendChild(card);
        });
        observeRevealElements();
        
        // Re-initialize carousel after dynamic DOM injection
        setTimeout(() => {
            updateCarousel();
            if (document.querySelector('.carousel-container')) {
                stopCarousel();
                startCarousel();
            }
        }, 300);
    }
}
initTestimonials();

// 5. CAROUSEL LOGIC
// FIX 4: Rename carousel index variable to avoid collision
let carouselIndex = 0;
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
let carouselInterval;

function updateCarousel() {
    const cards = document.querySelectorAll('.testimonial-card');
    if (cards.length > 0) {
        const width = cards[0].offsetWidth + 20; // Each card width + gap
        track.style.transform = `translateX(-${carouselIndex * width}px)`;
        
        // Calculate how many cards are actually visible
        const containerWidth = document.querySelector('.carousel-container').offsetWidth;
        const visibleCards = Math.round(containerWidth / width);
        
        if(prevBtn) prevBtn.disabled = (carouselIndex === 0);
        if(nextBtn) nextBtn.disabled = (carouselIndex >= cards.length - visibleCards);
    }
}

function autoAdvanceCarousel() {
    const cards = document.querySelectorAll('.testimonial-card');
    const container = document.querySelector('.carousel-container');
    if (!container || cards.length === 0) return;
    
    const containerWidth = container.offsetWidth;
    const width = cards[0].offsetWidth + 20;
    const visibleCards = Math.floor(containerWidth / width);
    
    if (carouselIndex < cards.length - visibleCards) {
        carouselIndex++;
    } else {
        carouselIndex = 0; // Loop back to the start
    }
    updateCarousel();
}

function startCarousel() {
    stopCarousel(); // Prevent overlapping timers
    // Advances the carousel every 6 seconds for comfortable reading
    carouselInterval = setInterval(autoAdvanceCarousel, 6000);
}

function stopCarousel() {
    clearInterval(carouselInterval);
}

const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer && track) {
    // Pause on hover
    carouselContainer.addEventListener('mouseenter', stopCarousel);
    carouselContainer.addEventListener('mouseleave', startCarousel);
    
    // Touch swipe logic for mobile
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let isDragging = false;
    let isScrolling = false;

    carouselContainer.addEventListener('touchstart', (e) => {
        stopCarousel();
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        currentX = startX;
        isDragging = true;
        isScrolling = false;
        track.style.transition = 'none'; // Disable transition for 1:1 drag follow
    }, { passive: true });

    carouselContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        
        // Detect if the user is scrolling vertically instead of swiping
        if (Math.abs(currentY - startY) > Math.abs(currentX - startX) + 5) {
            isScrolling = true;
            isDragging = false;
            track.style.transition = 'transform 0.5s ease-in-out';
            updateCarousel(); // Snap back
            return;
        }

        if (!isScrolling) {
            const diffX = currentX - startX;
            const cards = document.querySelectorAll('.testimonial-card');
            if (cards.length > 0) {
                const width = cards[0].offsetWidth + 20;
                track.style.transform = `translateX(${-(carouselIndex * width) + diffX}px)`;
            }
        }
    }, { passive: true });

    carouselContainer.addEventListener('touchend', () => {
        if (isScrolling) {
            startCarousel();
            return;
        }
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = 'transform 0.5s ease-in-out'; // Restore transition
        
        const diffX = currentX - startX;
        const cards = document.querySelectorAll('.testimonial-card');
        
        if (cards.length > 0) {
            const width = cards[0].offsetWidth + 20;
            const containerWidth = carouselContainer.offsetWidth;
            const visibleCards = Math.floor(containerWidth / width);

            if (Math.abs(diffX) > 50) { // 50px swipe threshold
                if (diffX > 0) {
                    // Swipe right (previous)
                    carouselIndex = carouselIndex > 0 ? carouselIndex - 1 : Math.max(0, cards.length - visibleCards);
                } else {
                    // Swipe left (next)
                    carouselIndex = carouselIndex < cards.length - visibleCards ? carouselIndex + 1 : 0;
                }
            }
            updateCarousel();
        }
        startCarousel(); // Resume auto-slide
    });
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        const cards = document.querySelectorAll('.testimonial-card');
        const containerWidth = document.querySelector('.carousel-container').offsetWidth;
        const width = cards[0].offsetWidth + 20;
        const visibleCards = Math.floor(containerWidth / width);
        
        if (carouselIndex < cards.length - visibleCards) {
            carouselIndex++;
        } else {
            carouselIndex = 0; // Loop forward seamlessly
        }
        updateCarousel();
        stopCarousel();
        startCarousel(); // Reset timer on manual navigation
    });

    prevBtn.addEventListener('click', () => {
        const cards = document.querySelectorAll('.testimonial-card');
        const containerWidth = document.querySelector('.carousel-container').offsetWidth;
        const width = cards[0].offsetWidth + 20;
        const visibleCards = Math.floor(containerWidth / width);
        
        if (carouselIndex > 0) {
            carouselIndex--;
        } else {
            carouselIndex = Math.max(0, cards.length - visibleCards); // Loop backward seamlessly
        }
        updateCarousel();
        stopCarousel();
        startCarousel(); // Reset timer on manual navigation
    });
}

// Initialize carousel state
window.addEventListener('load', () => {
    // Small timeout ensures CSS transitions and fonts are settled
    setTimeout(() => {
        updateCarousel();
        if (document.querySelector('.carousel-container')) startCarousel();
    }, 300);
});

// 6. PRODUCT MODAL FUNCTIONALITY
function openProductModal(product) {
    // Check if modal already exists, if so remove it
    const existingModal = document.getElementById('product-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal HTML
    const modal = document.createElement('div');
    modal.id = 'product-modal';
    modal.className = 'product-modal-overlay';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.35s ease-out';

    const modalContent = document.createElement('div');
    modalContent.className = 'product-modal-content';
    modalContent.style.transform = 'scale(0.92)';
    modalContent.style.transition = 'transform 0.35s ease-out';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.className = 'modal-close';

    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'modal-img-wrapper loading';

    let hasIgEmbed = false;
    if (product.instagram_url) {
        const match = product.instagram_url.match(/\/(p|reel)\/([a-zA-Z0-9_-]+)/);
        if (match && match[1] && match[2]) {
            hasIgEmbed = true;
            const postType = match[1];
            const postId = match[2];
            
            const spinnerWrapper = document.createElement('div');
            spinnerWrapper.className = 'iframe-spinner-wrapper';
            const spinner = document.createElement('div');
            spinner.className = 'spinner';
            spinner.style.width = '40px';
            spinner.style.height = '40px';
            spinner.style.borderWidth = '3px';
            spinnerWrapper.appendChild(spinner);
            imgWrapper.appendChild(spinnerWrapper);

            const iframe = document.createElement('iframe');
            iframe.src = `https://www.instagram.com/${postType}/${postId}/embed`;
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowfullscreen', '');
            
            iframe.onload = () => {
                imgWrapper.classList.remove('loading');
                spinnerWrapper.remove();
                iframe.classList.add('loaded');
            };
            
            imgWrapper.appendChild(iframe);
        }
    }

    if (!hasIgEmbed) {
        const img = document.createElement('img');
        img.src = product.img || 'https://via.placeholder.com/400x533/FBE4D8/54162B?text=LOVELY+K';
        img.srcset = product.img ? `${product.img} 1x, ${product.img.replace('.jpg', '-2x.jpg').replace('.png', '-2x.png')} 2x` : '';
        img.alt = product.name;
        img.className = 'modal-img';

        // Handle image fade-in after load
        if (img.complete) {
            img.classList.add('loaded');
            imgWrapper.classList.remove('loading');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
                imgWrapper.classList.remove('loading');
            });
        }
        imgWrapper.appendChild(img);
    }

    const title = document.createElement('h2');
    title.textContent = product.name;
    title.className = 'modal-title';

    const price = document.createElement('p');
    price.textContent = product.price;
    price.className = 'modal-price';

    const description = document.createElement('p');
    description.textContent = product.description;
    description.className = 'modal-description';

    const addBtn = document.createElement('button');
    addBtn.textContent = 'ADD TO CART';
    addBtn.className = 'checkout-btn modal-add-btn';
    addBtn.onclick = () => {
        addToCart(product);
        closeModal();
        cartDropdown.style.display = 'flex';
        cartDropdown.offsetHeight;
        cartDropdown.classList.add('open');
    };

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(imgWrapper);
    modalContent.appendChild(title);
    modalContent.appendChild(price);
    modalContent.appendChild(description);
    modalContent.appendChild(addBtn);

    // Swipe to dismiss logic for Product Modal (Mobile)
    let modalStartY = 0;
    let modalCurrentY = 0;
    let isModalDragging = false;

    modalContent.addEventListener('touchstart', (e) => {
        if (window.innerWidth > 768) return;
        if (modalContent.scrollTop > 0) return; // Allow normal scrolling inside modal
        modalStartY = e.touches[0].clientY;
        isModalDragging = true;
        modalContent.style.transition = 'none';
    }, { passive: true });

    modalContent.addEventListener('touchmove', (e) => {
        if (!isModalDragging) return;
        modalCurrentY = e.touches[0].clientY;
        const diffY = modalCurrentY - modalStartY;
        if (diffY > 0) {
            modalContent.style.transform = `translateY(${diffY}px) scale(1)`;
        }
    }, { passive: true });

    modalContent.addEventListener('touchend', () => {
        if (!isModalDragging) return;
        isModalDragging = false;
        modalContent.style.transition = 'transform 0.35s ease-out';
        const diffY = modalCurrentY - modalStartY;
        if (diffY > 100) {
            closeModal();
        } else {
            modalContent.style.transform = 'scale(1)'; // Snap back
        }
    });

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    modal.offsetHeight; // reflow
    modal.style.opacity = '1';
    modalContent.style.transform = 'scale(1)';
    
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.92)';
        setTimeout(() => modal.remove(), 350);
    };
    
    closeBtn.onclick = closeModal;

    // Close modal when clicking outside
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeModal();
        }
    };
}

// Close any open modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.product-modal-overlay');
        if (openModal) {
            const content = openModal.querySelector('.product-modal-content');
            openModal.style.opacity = '0';
            if (content) content.style.transform = 'scale(0.92)';
            setTimeout(() => openModal.remove(), 350);
        }
        if (cartDropdown.classList.contains('open')) closeCartAnimated();
    }
});

// 7. CONTACT FORM AJAX SUBMISSION
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    function updateRateLimitUI() {
        const submitBtn = contactForm.querySelector('.submit-btn');
        if (!submitBtn) return;
        
        if (!submitBtn.hasAttribute('data-original-text')) {
            submitBtn.setAttribute('data-original-text', submitBtn.textContent);
        }
        
        const lastSubmit = localStorage.getItem('lastFormSubmit');
        if (!lastSubmit) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.getAttribute('data-original-text');
            return;
        }
        
        const timeSince = Date.now() - parseInt(lastSubmit, 10);
        if (timeSince < 60000) {
            submitBtn.disabled = true;
            const timeLeft = Math.ceil((60000 - timeSince) / 1000);
            submitBtn.textContent = `PLEASE WAIT (${timeLeft}s)`;
            setTimeout(updateRateLimitUI, 1000);
        } else {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.getAttribute('data-original-text');
        }
    }
    
    updateRateLimitUI();

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Honeypot check
        const honeypot = this.querySelector('input[name="bot-trap"]');
        if (honeypot && honeypot.value) {
            return; // Silently block bot
        }
        
        // Rate limit check
        const lastSubmit = localStorage.getItem('lastFormSubmit');
        if (lastSubmit && (Date.now() - parseInt(lastSubmit, 10) < 60000)) {
            return; // Prevent submission
        }
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.hasAttribute('data-original-text') 
            ? submitBtn.getAttribute('data-original-text') 
            : submitBtn.textContent;
        
        // Provide immediate feedback
        submitBtn.textContent = 'SENDING...';
        submitBtn.disabled = true;

        // Convert FormData to URLSearchParams for better Google Forms compatibility
        const formData = new FormData(this);
        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }

        // Google Forms requires 'no-cors' mode for AJAX submissions
        fetch(this.action, {
            method: 'POST',
            body: data,
            mode: 'no-cors'
        })
        .then(() => {
            // Neutral confirmation as no-cors prevents status verification
            showThankYouModal();
            this.reset(); // Clear the form
                localStorage.setItem('lastFormSubmit', Date.now().toString());
                updateRateLimitUI();
        })
        .catch(err => {
            showToast('Oops! There was an issue sending your message. Please try again.', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

// FIX 2: Define the missing showInfoModal function (moved showThankYouModal here for proximity)
function showThankYouModal() {
    const modal = document.createElement('div');
    modal.className = 'product-modal-overlay';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.35s ease-out';
    modal.innerHTML = `
        <div class="product-modal-content" style="text-align: center; transform: scale(0.92); transition: transform 0.35s ease-out;">
            <button class="modal-close">✕</button>
            <div style="font-size: 4rem; color: var(--PEACH); margin-bottom: 20px;"><i class="fa-solid fa-circle-check"></i></div>
            <h2 class="modal-title">FORM SUBMITTED</h2>
            <p class="modal-description">Your message has been submitted. We'll be in touch soon.</p>
            <button class="checkout-btn ok-btn">BACK TO SHOP</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.offsetHeight;
    modal.style.opacity = '1';
    modal.querySelector('.product-modal-content').style.transform = 'scale(1)';
    
    const closeModal = () => {
        modal.style.opacity = '0';
        modal.querySelector('.product-modal-content').style.transform = 'scale(0.92)';
        setTimeout(() => modal.remove(), 350);
    };
    modal.querySelector('.modal-close').onclick = closeModal;
    modal.querySelector('.ok-btn').onclick = closeModal;
    modal.onclick = (e) => { if (e.target === modal) closeModal(); };
}

// FIX 2: Define the missing showInfoModal function
function showInfoModal(title, message) {
    const modal = document.createElement('div');
    modal.className = 'product-modal-overlay';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.35s ease-out';
    modal.innerHTML = `
        <div class="product-modal-content" style="text-align: center; transform: scale(0.92); transition: transform 0.35s ease-out;">
            <button class="modal-close">✕</button>
            <div style="font-size: 3rem; color: var(--PEACH); margin-bottom: 20px;">
                <i class="fa-solid fa-circle-exclamation"></i>
            </div>
            <h2 class="modal-title">${escapeHTML(title)}</h2>
            <p class="modal-description">${escapeHTML(message)}</p>
            <button class="checkout-btn ok-btn">OK</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.offsetHeight;
    modal.style.opacity = '1';
    modal.querySelector('.product-modal-content').style.transform = 'scale(1)';
    
    const closeModal = () => {
        modal.style.opacity = '0';
        modal.querySelector('.product-modal-content').style.transform = 'scale(0.92)';
        setTimeout(() => modal.remove(), 350);
    };
    modal.querySelector('.modal-close').onclick = closeModal;
    modal.querySelector('.ok-btn').onclick = closeModal;
    modal.onclick = (e) => { if (e.target === modal) closeModal(); };
}

// 8. CHARACTER COUNTER FOR MESSAGE
const messageInput = document.getElementById('message-input');
const charCounter = document.getElementById('char-counter');
if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
        charCounter.textContent = `${messageInput.value.length} / 150 characters`;
    });
}

// 9. PHONE NUMBER VALIDATION (Numeric only + optional '+')
const phoneInput = document.querySelector('input[name="entry.517569889"]');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        // Strip any character that isn't a digit or a plus sign immediately
        this.value = this.value.replace(/[^0-9+]/g, '');
    });
}

// Initial observation for existing elements
observeRevealElements();

// Back to Top Button Logic
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Page Transition
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && !link.hasAttribute('target') && link.hostname === window.location.hostname && !link.hash) {
        if(link.href.startsWith('javascript:') || link.href.startsWith('mailto:') || link.href.startsWith('tel:')) return;
        
        e.preventDefault();
        const bar = document.createElement('div');
        bar.style.position = 'fixed';
        bar.style.top = '0';
        bar.style.left = '0';
        bar.style.height = '3px';
        bar.style.backgroundColor = 'var(--RED)';
        bar.style.zIndex = '99999';
        bar.style.transition = 'width 0.4s ease';
        bar.style.width = '0%';
        document.body.appendChild(bar);
        
        bar.offsetHeight; // Force reflow
        bar.style.width = '60%';
        
        setTimeout(() => {
            bar.style.width = '100%';
            setTimeout(() => {
                window.location.href = link.href;
            }, 150);
        }, 300);
    }
});

// Navbar Scroll Behavior
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 60) {
            navbar.classList.add('compact');
        } else {
            navbar.classList.remove('compact');
        }
    }
});

// 10. TOAST NOTIFICATIONS
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-circle-exclamation"></i>';
    
    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-message">${escapeHTML(message)}</div>
        <button class="toast-close">✕</button>
    `;
    
    container.appendChild(toast);
    
    toast.offsetHeight; // Force reflow
    toast.classList.add('show');
    
    const removeToast = () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    };
    
    toast.querySelector('.toast-close').onclick = removeToast;
    setTimeout(removeToast, 5000);
}
