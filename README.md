# Lovely K Outfits & Hair - Premium E-Commerce Boutique

A modern, responsive e-commerce boutique website featuring luxury fashion, accessories, shoes, and hair products with an elegant design and premium user experience.

## ✨ Core Features

### Theme & Aesthetics
- **Dual Theme System**: Seamlessly switch between Light and Dark modes
  - **Light Mode**: Warm Peach (#FDA481), Burgundy (#54162B), and cream backgrounds
  - **Dark Mode**: Deep purple (#190019) with coral accents for sophisticated elegance
- **Custom Typography**: 
  - `Playfair Display` for elegant headlines
  - `Montserrat` for body text and UI
  - Custom `BoutiqueFont` (Adobe Light & Bold) for premium branding

### Shopping Experience
- **Interactive Shopping Cart**:
  - Real-time item counter with badge
  - Dropdown cart preview with quantity controls
  - Live total calculations
  - WhatsApp checkout integration for direct communication
- **Product Browsing**:
  - 30 products across 5 categories (Women, Men, Accessories, Shoes, Hair)
  - Dynamic product modals with detailed views
  - Category filtering with single/double-click interactions
  - Search functionality with real-time filtering and highlight

### Navigation & User Interface
- **Responsive Navigation Bar**:
  - Sticky positioning for always-accessible menu
  - Mobile hamburger menu with smooth animations
  - Logo branding with responsive sizing
- **Expanding Search Bar**: Animated search input that expands on focus
- **Advanced UI Components**:
  - **Testimonial Carousel**: 20 customer reviews with smooth navigation
  - **Scroll Reveal Animations**: Elements fade in as user scrolls with staggered timing
  - **Preloader**: Custom branded loading spinner (3-10 second timeout)
  - **Back-to-Top Button**: Appears after scrolling 400px with smooth scroll

### Product Display & Filtering
- **Multi-Category Pages**: Dedicated pages for each product category
  - Men Clothes (menclothes.html)
  - Women Clothes (womenclothes.html)
  - Accessories (accesories.html)
  - Shoes (shoes.html)
  - Hair (hair.html)
- **Responsive Grids**:
  - Desktop: 5 columns
  - Tablets: 2-3 columns
  - Mobile: 1 column
- **Loading States**: Skeleton shimmer animations while images load
- **Product Cards**: Include badges (New/Sale/Hot), prices, and hover effects

### Contact & Communication
- **Contact Form**:
  - AJAX submission to Google Forms
  - Character counter (150 max)
  - Phone number validation (digits + optional +)
  - Success/error modal feedback
- **Social Media Integration**:
  - WhatsApp, Facebook, Instagram links in footer
  - Direct WhatsApp checkout with order details

## 🎨 Color Palette

| Color | Hex | Usage |
|:------|:------|:---------|
| Peach | `#FDA481` | Primary accent, hover states, CTAs |
| Red | `#B41B2D` | Alerts, badges, critical actions |
| Dark Red | `#54162B` | Primary text, headers, secondary |
| Dim Peach | `#DFB6B2` | Form backgrounds, subtle backgrounds |
| Nav BG | `#FBE4D8` | Navigation, card backgrounds, surfaces |
| Dark Purple | `#190019` | Dark mode background |
| Dark Peach | `#2D1B2D` | Dark mode surfaces |

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup with proper structure
- **CSS3**:
  - CSS Custom Properties for theme variables
  - Flexbox & CSS Grid layouts
  - `clamp()` for fluid typography
  - Cubic-bezier animations for smooth transitions
  - Media queries for 3 breakpoints (1024px, 768px, 600px)
- **JavaScript (ES6+)**:
  - Intersection Observer API for scroll animations
  - LocalStorage for theme persistence
  - Fetch API for AJAX form submission
  - Dynamic DOM manipulation for products & cart

### JavaScript Features
- **Shopping Cart System**: Add/remove items, quantity management
- **Theme Management**: Toggle with localStorage persistence
- **Product Filtering**: By category and search terms
- **Modal System**: Product detail view with images and descriptions
- **Carousel**: Testimonial slider with prev/next navigation
- **Form Handling**: Validation, character counting, WhatsApp integration
- **Performance**: Lazy image loading, staggered reveal animations

## 📁 Project Structure

```
LOVELY K OUTFITS/
├── CSS/
│   └── style.css              # All styles, responsive design, animations
├── HTML/
│   ├── index.html             # Main homepage with featured collection
│   ├── menclothes.html        # Men's clothing category page
│   ├── womenclothes.html      # Women's clothing category page
│   ├── accesories.html        # Accessories category page
│   ├── shoes.html             # Shoes category page
│   └── hair.html              # Hair products category page
├── JS/
│   └── script.js              # All interactive functionality (748 lines)
├── PICS/                       # Product images and category images
│   ├── men.jpg, women.jpg, acc.jpg, shoes.jpg, hair.jpg
│   └── product1-20.jpg, shoes1-5.jpg, hair1-5.jpg
├── fonts/
│   └── abode-webfont/
│       ├── Abode-Light.woff
│       └── abode.woff
└── README.md                   # This file
```

## 🚀 Getting Started

1. **Clone or Download** the repository
2. **Open** any HTML file in a modern web browser (Chrome, Firefox, Safari, Edge)
3. **Explore** the categories using the navigation menu
4. **Add items** to your cart and checkout via WhatsApp

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📊 Product Database

**30 Total Products** across 5 categories:

| Category | Count | Price Range |
|:---------|:-----:|:------------|
| Women Clothes | 11 | ₦9,000 - ₦32,000 |
| Men Clothes | 5 | ₦12,000 - ₦35,000 |
| Accessories | 4 | ₦5,000 - ₦45,000 |
| Shoes | 5 | ₦18,000 - ₦32,000 |
| Hair Products | 5 | ₦8,500 - ₦22,000 |

## 🎯 Key JavaScript Functions

- `addToCart(product)` - Add items to shopping cart
- `updateCart()` - Update cart display and totals
- `renderProducts(dataList, count, isSearch, searchTerm)` - Render product grid
- `openProductModal(product)` - Display product details
- `updateCarousel()` - Navigate testimonial carousel
- `applyThemeColors(theme)` - Apply light/dark theme
- `hidePreloader()` - Hide loading spinner

## 🎨 CSS Classes & Animations

### Animations
- `.reveal` / `.reveal.visible` - Scroll-triggered fade-in with stagger delays
- `.typing-cursor` - Blinking cursor effect for headers
- `@keyframes shimmer` - Skeleton loading animation
- `@keyframes spin` - Preloader spinner rotation
- `@keyframes overlayFadeIn` - Modal entrance
- `@keyframes modalSlideUp` - Modal slide animation

### Responsive Breakpoints
- **Desktop**: 1024px+ (5-column grids)
- **Tablet**: 768px - 1023px (2-3 columns, mobile menu)
- **Mobile**: 600px - 767px (1 column, optimized touch targets)
- **Small Mobile**: Below 600px (minimal spacing, full width)

## 📱 Mobile Optimizations

- Fixed sticky navbar with flexible spacing
- Hamburger menu with X-transform animations
- Touch-friendly button sizes (min 40px × 40px)
- Optimized cart dropdown positioning
- Responsive search bar (expands to 180px max)
- Stack-based footer for narrow screens

## 🔒 Features Summary

✅ Dark/Light theme with persistence  
✅ Shopping cart with WhatsApp integration  
✅ 30 products across 5 categories  
✅ 20 customer testimonials in carousel  
✅ Search with real-time filtering  
✅ Product detail modals  
✅ Contact form with validation  
✅ Scroll reveal animations  
✅ Mobile-responsive design  
✅ Accessibility considerations  
✅ Performance optimizations (lazy loading, preloader)  
✅ Social media integration  

## 📞 Contact & Social

- **WhatsApp**: Direct checkout and order inquiries
- **Facebook**: [lovelykoutfits](https://facebook.com/lovelykoutfits)
- **Instagram**: [@lovelykoutfits](https://instagram.com/lovelykoutfits)

## 📄 License

© 2024 LOVELY K OUTFITS & HAIR. All rights reserved.

---

**Made with ❤️ by The Maker ID**