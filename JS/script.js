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
const cartBtn = document.getElementById('cart-btn');
const cartDropdown = document.getElementById('cart-dropdown');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountBadge = document.getElementById('cart-count');
const cartTotalDisplay = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Toggle cart dropdown
cartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
});

// Close cart dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.cart-control')) {
        cartDropdown.style.display = 'none';
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
            price: parseInt(product.price.replace(/[^0-9]/g, '')),
            img: product.img,
            quantity: 1
        });
    }
    
    updateCart();
}

// Update cart display
function updateCart() {
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
                <h5>${item.name}</h5>
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
    
    // Construct WhatsApp Message with specific clothing info for further discussion
    let message = "🛍️ *NEW ORDER INQUIRY - LOVELY K OUTFITS*\n\n";
    message += "Hello! I am interested in the following items and would like to talk more about them here:\n\n";
    
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        message += `📍 *${item.name}*\n   Quantity: ${item.quantity} | Price: ₦${item.price.toLocaleString()}\n   Subtotal: ₦${subtotal.toLocaleString()}\n\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `💰 *TOTAL ESTIMATE: ₦${total.toLocaleString()}*\n\n`;
    message += "Please let me know if these are available so we can discuss delivery. Thank you!";

    const whatsappNumber = "2348000000000"; // REPLACE with your actual business WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    cart = [];
    updateCart();
    cartDropdown.style.display = 'none';
});
// 2. New Product Generation Logic
const productContainer = document.querySelector('#product-container');

// 20 Dummy Products Database with Category tags
const products = [
    { name: "Silk Wrap Dress", price: "₦25,000", img: "../PICS/product1.jpg", badge: "New", description: "Luxurious silk wrap dress.", category: "women" },
    { name: "Vintage Denim", price: "₦18,500", img: "../PICS/product2.jpg", badge: "", description: "Classic vintage denim.", category: "men" },
    { name: "Gold Hoop Set", price: "₦5,000", img: "../PICS/product3.jpg", badge: "Sale", description: "Elegant gold hoop earrings.", category: "accessories" },
    { name: "Leather Jacket", price: "₦35,000", img: "../PICS/product4.jpg", badge: "Hot", description: "Premium leather jacket.", category: "men" },
    { name: "Elegant Blazer", price: "₦22,000", img: "../PICS/product5.jpg", badge: "", description: "Professional yet stylish blazer.", category: "women" },
    { name: "Summer Shorts", price: "₦12,000", img: "../PICS/product6.jpg", badge: "", description: "Comfortable cotton shorts.", category: "men" },
    { name: "Pearl Necklace", price: "₦8,500", img: "../PICS/product7.jpg", badge: "New", description: "Timeless pearl necklace.", category: "accessories" },
    { name: "High-Waist Jeans", price: "₦16,000", img: "../PICS/product8.jpg", badge: "", description: "Flattering high-waist jeans.", category: "women" },
    { name: "Satin Blouse", price: "₦14,000", img: "../PICS/product9.jpg", badge: "Sale", description: "Luxurious satin blouse.", category: "women" },
    { name: "Designer Handbag", price: "₦45,000", img: "../PICS/product10.jpg", badge: "", description: "Luxury designer handbag.", category: "accessories" },
    { name: "Floral Dress", price: "₦20,000", img: "../PICS/product11.jpg", badge: "", description: "Beautiful floral print dress.", category: "women" },
    { name: "Wool Cardigan", price: "₦19,000", img: "../PICS/product12.jpg", badge: "New", description: "Cozy wool cardigan.", category: "women" },
    { name: "Silk Scarf", price: "₦7,500", img: "../PICS/product13.jpg", badge: "", description: "Premium silk scarf.", category: "accessories" },
    { name: "Wide-Leg Pants", price: "₦18,000", img: "../PICS/product14.jpg", badge: "", description: "Trendy wide-leg pants.", category: "women" },
    { name: "Crop Top", price: "₦9,000", img: "../PICS/product15.jpg", badge: "Sale", description: "Stylish crop top.", category: "women" },
    { name: "Linen Shirt", price: "₦13,500", img: "../PICS/product16.jpg", badge: "", description: "Breathable linen shirt.", category: "men" },
    { name: "Midi Skirt", price: "₦15,000", img: "../PICS/product17.jpg", badge: "Hot", description: "Elegant midi skirt.", category: "women" },
    { name: "Cashmere Sweater", price: "₦32,000", img: "../PICS/product18.jpg", badge: "", description: "Luxurious cashmere sweater.", category: "women" },
    { name: "Cocktail Dress", price: "₦28,000", img: "../PICS/product19.jpg", badge: "New", description: "Sophisticated cocktail dress.", category: "women" },
    { name: "Tailored Trousers", price: "₦17,000", img: "../PICS/product20.jpg", badge: "", description: "Professional tailored trousers.", category: "men" }
];

// Determine initial items to show based on screen size
function getInitialItemCount() {
    return window.innerWidth >= 768 ? 10 : 6;
}

let itemsToShow = getInitialItemCount();
let allItemsShown = false;

// Function to render products
function renderProducts(dataList, count, isSearch = false, searchTerm = "") {
    productContainer.innerHTML = '';
    if (dataList.length === 0) {
        productContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px; color: var(--text-main); font-style: italic;">
                No products found matching your search...
            </div>`;
        return;
    }

    dataList.slice(0, count).forEach((product, index) => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.style.cursor = 'pointer';

        // Highlight logic for product name
        const displayName = searchTerm 
            ? product.name.replace(new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'), '<mark class="highlight">$1</mark>')
            : product.name;

        card.innerHTML = `
            <div class="product-image loading">
                <img src="${product.img}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h4>${displayName}</h4>
                <p class="price">${product.price}</p>
            </div>
        `;

        card.addEventListener('click', () => openProductModal(product));

        // Handle image fade-in after load
        const img = card.querySelector('img');
        const container = card.querySelector('.product-image');
        if (img.complete) {
            img.classList.add('loaded');
            container.classList.remove('loading');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
                container.classList.remove('loading');
            });
        }

        productContainer.appendChild(card);
    });
    
    // Add "Show More" or "Show Less" button (disabled during search)
    if (!isSearch && (count < dataList.length || allItemsShown)) {
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
                renderProducts(products, itemsToShow);
            } else if (window.innerWidth >= 768) {
                // Desktop: Show all remaining items
                itemsToShow = products.length;
                allItemsShown = true;
                renderProducts(products, itemsToShow);
            } else {
                // Mobile: Navigate to products page
                window.location.href = 'products.html';
            }
        };
        
        showMoreBtn.appendChild(btnElement);
        productContainer.appendChild(showMoreBtn);
    }
}

// Category Grid Filtering Logic
document.querySelectorAll('.grid-item').forEach(item => {
    let clickTimer = null;

    item.addEventListener('click', (e) => {
        e.preventDefault();
        if (clickTimer) {
            // Double click — navigate to page
            clearTimeout(clickTimer);
            clickTimer = null;
            window.location.href = item.getAttribute('href');
            return;
        }
        // Single click — filter products
        clickTimer = setTimeout(() => {
            clickTimer = null;
            const category = item.dataset.category;
            const filtered = products.filter(p => p.category === category);
            const header = document.querySelector('.product-header h2');
            if (header) header.textContent = category.toUpperCase() + " COLLECTION";
            document.querySelector('#product-container').scrollIntoView({ behavior: 'smooth' });
            allItemsShown = true;
            renderProducts(filtered, filtered.length, true);
        }, 250);
    });
});

// Initial render
renderProducts(products, itemsToShow);

// Typing Effect
const typingTarget = document.querySelector('.product-header h3');
if (typingTarget) {
    const fullText = typingTarget.textContent;
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
            renderProducts(products, itemsToShow);
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
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );

        if (searchTerm === "") {
            if (header) header.textContent = "FEATURED COLLECTION";
            allItemsShown = false;
            itemsToShow = getInitialItemCount();
            renderProducts(products, itemsToShow);
        } else {
            if (header) header.textContent = `SEARCH RESULTS: "${searchTerm.toUpperCase()}"`;
            renderProducts(filteredProducts, filteredProducts.length, true, searchTerm);
        }
    });
}

// ... (Keep your mobile menu and product generation code at the top) ...

const themeBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

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
    localStorage.setItem('theme', newTheme);
    applyThemeColors(newTheme);
});

// 4. TESTIMONIAL GENERATION
const testimonials = [
    { text: "The hair quality is unmatched. I feel like a queen!", author: "Kemi A." },
    { text: "Best boutique in the city. The customer service is 10/10.", author: "Sandra O." },
    { text: "Lovely K transformed my wardrobe. Elegant and affordable.", author: "Joy I." },
    { text: "My go-to for accessories. Always on trend!", author: "Blessing T." }
];

const track = document.getElementById('testimonial-track');

if (track) {
    testimonials.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('testimonial-card', 'reveal', `reveal-delay-${(index % 5) + 1}`);
        card.innerHTML = `
            <p>"${item.text}"</p>
            <h4>${item.author}</h4>
        `;
        track.appendChild(card);
    });
}

// 5. CAROUSEL LOGIC
let index = 0;
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

function updateCarousel() {
    const cards = document.querySelectorAll('.testimonial-card');
    if (cards.length > 0) {
        const width = cards[0].offsetWidth + 20; // Each card width + gap
        track.style.transform = `translateX(-${index * width}px)`;
        
        // Calculate how many cards are actually visible
        const containerWidth = document.querySelector('.carousel-container').offsetWidth;
        const visibleCards = Math.round(containerWidth / width);
        
        if(prevBtn) prevBtn.disabled = (index === 0);
        if(nextBtn) nextBtn.disabled = (index >= cards.length - visibleCards);
    }
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        const cards = document.querySelectorAll('.testimonial-card');
        const containerWidth = document.querySelector('.carousel-container').offsetWidth;
        const width = cards[0].offsetWidth + 20;
        const visibleCards = Math.round(containerWidth / width);
        if (index < cards.length - visibleCards) {
            index++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (index > 0) {
            index--;
            updateCarousel();
        }
    });
}

// Initialize carousel state
window.addEventListener('load', () => {
    // Small timeout ensures CSS transitions and fonts are settled
    setTimeout(updateCarousel, 300);
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

    const modalContent = document.createElement('div');
    modalContent.className = 'product-modal-content';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.className = 'modal-close';
    closeBtn.onclick = () => modal.remove();

    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'modal-img-wrapper loading';

    const img = document.createElement('img');
    img.src = product.img;
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
        modal.remove();
        cartDropdown.style.display = 'block';
    };

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(imgWrapper);
    modalContent.appendChild(title);
    modalContent.appendChild(price);
    modalContent.appendChild(description);
    modalContent.appendChild(addBtn);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Close modal when clicking outside
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    };
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes slideUp {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Close any open modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.product-modal-overlay');
        if (openModal) openModal.remove();
    }
});

// 7. CONTACT FORM AJAX SUBMISSION
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
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
        })
        .catch(err => {
            alert('Oops! There was an issue sending your message. Please try again.');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

function showThankYouModal() {
    const modal = document.createElement('div');
    modal.className = 'product-modal-overlay';
    modal.innerHTML = `
        <div class="product-modal-content" style="text-align: center;">
            <button class="modal-close" onclick="this.parentElement.parentElement.remove()">✕</button>
            <div style="font-size: 4rem; color: var(--PEACH); margin-bottom: 20px;"><i class="fa-solid fa-circle-check"></i></div>
            <h2 class="modal-title">FORM SUBMITTED</h2>
            <p class="modal-description">Your message has been submitted. We'll be in touch soon.</p>
            <button class="checkout-btn" onclick="this.parentElement.parentElement.remove()">BACK TO SHOP</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
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

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // Animate once only
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

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

// Full Page Preloader Logic
const preloader = document.getElementById('preloader');
let pageLoaded = false;
let minDisplayTimeElapsed = false;

// Function to hide the preloader
function hidePreloader() {
    if (preloader && pageLoaded && minDisplayTimeElapsed) {
        preloader.classList.add('preloader-hidden');
    }
}

if (preloader) {
    // Ensure preloader is displayed for a minimum time (e.g., 600ms)
    setTimeout(() => {
        minDisplayTimeElapsed = true;
        hidePreloader();
    }, 600);

    // Hide preloader once all assets are loaded
    window.addEventListener('load', () => {
        pageLoaded = true;
        hidePreloader();
    }
);

    // Fallback: Hide preloader after a maximum time, even if window.load doesn't fire
    // This prevents the spinner from getting stuck indefinitely due to a broken asset.
    setTimeout(() => {
        if (!preloader.classList.contains('preloader-hidden')) {
            preloader.classList.add('preloader-hidden');
            console.warn('Preloader hidden by fallback timeout. Check for slow-loading or broken assets.');
        }
    }, 10000); // Hide after 10 seconds maximum
}