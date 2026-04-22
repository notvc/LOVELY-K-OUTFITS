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