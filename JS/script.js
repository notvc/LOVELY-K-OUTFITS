const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('#nav-list');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active'); // Animates the hamburger to an X
    menuLinks.classList.toggle('active'); // Slides the menu in
});
// 2. New Product Generation Logic
const productContainer = document.querySelector('#product-container');

// This is your "Database". You can easily add all 30 items here.
const products = [
    { name: "Silk Wrap Dress", price: "₦25,000", img: "PICS/product1.jpg", badge: "New" },
    { name: "Vintage Denim", price: "₦18,500", img: "PICS/product2.jpg", badge: "" },
    { name: "Gold Hoop Set", price: "₦5,000", img: "PICS/product3.jpg", badge: "Sale" },
    // ... add more objects here until you reach 30
];

// The loop that builds your grid
products.forEach(product => {
    // Create the card element
    const card = document.createElement('div');
    card.classList.add('product-card');

    // Build the internal HTML structure
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.img}" alt="${product.name}">
            ${product.badge ? `<span class="badge">${product.badge}</span>` : ''}
        </div>
        <div class="product-info">
            <h4>${product.name}</h4>
            <p class="price">${product.price}</p>
        </div>
    `;

    // Add the card to the grid
    productContainer.appendChild(card);
});

const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const currentTheme = localStorage.getItem('theme');

// Set initial state based on saved preference
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '✦'; // Show sun in dark mode
    themeIcon.style.color = '#FDA481'; // Sun Color
    themeIcon.style.borderColor = '#FDA481';
}

themeBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeIcon.textContent = '☪'; // Show moon in light mode
        themeIcon.style.color = '#54162B'; // Moon Color
        themeIcon.style.borderColor = '#54162B';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.textContent = '✦'; // Show sun in dark mode
        themeIcon.style.color = '#FDA481'; // Sun Color
        themeIcon.style.borderColor = '#FDA481';
    }
});

// Check for saved user preference on load
if (currentTheme) {
    applyThemeColors(currentTheme);
} else {
    applyThemeColors('light'); // Default
}

themeBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = (theme === 'dark') ? 'light' : 'dark';
    
    localStorage.setItem('theme', newTheme);
    applyThemeColors(newTheme);
});

// Testimonial Data Array
const testimonials = [
    { text: "The hair quality is unmatched. I feel like a queen!", author: "Kemi A." },
    { text: "Best boutique in the city. The customer service is 10/10.", author: "Sandra O." },
    { text: "Lovely K transformed my wardrobe. Elegant and affordable.", author: "Joy I." },
    { text: "My go-to for accessories. Always on trend!", author: "Blessing T." }
];

const track = document.getElementById('testimonial-track');

// Generate Testimonials
testimonials.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('testimonial-card');
    card.innerHTML = `
        <p>"${item.text}"</p>
        <h4>${item.author}</h4>
    `;
    track.appendChild(card);
});

// Carousel Logic
let index = 0;
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

nextBtn.addEventListener('click', () => {
    if (index < testimonials.length - 3) {
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

function updateCarousel() {
    const width = document.querySelector('.testimonial-card').offsetWidth + 20;
    track.style.transform = `translateX(-${index * width}px)`;
    
    // Disable buttons if at the boundaries
    prevBtn.disabled = (index === 0);
    nextBtn.disabled = (index >= testimonials.length - 3);
}

// Call once on page load to set initial state
updateCarousel();