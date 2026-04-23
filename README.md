# LOVELY K OUTFITS & HAIR

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/vanilla_js-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)

A sophisticated, editorial-style e-commerce boutique website designed for high-fashion outfits and premium hair care. This project focuses on a seamless UI/UX experience, blending modern design aesthetics with robust functional features for a luxury shopping feel.

## 🚀 Live Demo

*[Insert your live demo link here (e.g., GitHub Pages or Netlify URL)]*

## 📸 Screenshots

*[Insert screenshots or a GIF walk-through of the website here]*

## ✨ Features

*   **🌓 Dynamic Dark Mode**: A custom theme switcher that persists user preference via `localStorage`.
*   **🛒 Shopping Cart System**: 
    *   Add items to cart with quantity management.
    *   Real-time subtotal calculation.
    *   Interactive dropdown cart preview.
    *   **Direct WhatsApp Checkout**: Seamlessly transition from cart to chat with a pre-formatted order summary.
*   **🔍 Real-time Product Search**: A sleek, animated search bar that filters products instantly by name, description, or category with keyword highlighting.
*   **🛍️ Featured Collection**:
    *   Dynamic product rendering from a database.
    *   Smart "Show More/Less" logic that adapts to screen size and search states.
    *   Quick-view product modals with detailed descriptions.
*   **📱 Responsive Navigation**: A sticky navbar featuring a mobile-friendly hamburger menu.
*   **📩 AJAX Contact Form**: A custom-validated contact form that submits data to **Google Sheets** in the background without refreshing the page.
*   **🔔 Interactive Modals**: Professional "Thank You" and product preview modals.
*   **🎠 Testimonial Carousel**: An interactive customer review slider with custom navigation controls.
*   **🖼️ Visual Category Grid**: Editorial-style category navigation with smooth hover scaling and overlays.
*   **🎭 Smooth Animations**: Built with CSS Keyframes and Cubic-Bezier transitions for a premium feel.

## 🛠️ Tech Stack

*   **Frontend**: HTML5, CSS3 (Custom Variables, Flexbox, Grid), Vanilla JavaScript.
*   **Icons**: Font Awesome 6.5.1
*   **Fonts**: 
    *   *Montserrat* (Sans-serif) via Google Fonts.
    *   *Playfair Display* (Serif) via Google Fonts.
    *   *Abode* (Custom local webfont).
*   **Backend/Database**: Google Forms (via AJAX/Fetch)

## 📂 Project Structure

```text
LOVELY K OUTFITS/
├── CSS/
│   └── style.css             # Main stylesheet with theme variables
├── JS/
│   └── script.js            # Shopping cart, theme, and carousel logic
├── HTML/
│   ├── index.html           # Main landing page
│   ├── menclothes.html      # Category: Men
│   ├── womenclothes.html    # Category: Women
│   ├── accesories.html      # Category: Accessories
│   ├── shoes.html           # Category: Shoes
│   └── hair.html            # Category: Hair
├── PICS/                    # High-quality product and category imagery
│   ├── product1.jpg ...
│   └── men.jpg ...
├── fonts/
│   └── abode-webfont/       # Custom typography assets
└── README.md
```

## ⚙️ Getting Started

### Prerequisites
A modern web browser (Chrome, Firefox, Safari, or Edge).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/LOVELY-K-OUTFITS.git
   ```
2. Navigate to the project directory:
   ```bash
   cd LOVELY-K-OUTFITS
   ```
3. Open `HTML/index.html` in your browser.

## 🔧 Configuration

Before deploying, ensure the following are updated:

1.  **Google Form Backend**: 
    *   Update the `action` URL in `index.html` with your specific Google Form `formResponse` link.
    *   Ensure the `name` attributes for inputs match your form's `entry.XXXXXX` IDs.
    *   Your current setup is linked to: `1FAIpQLSd7pHKs6kdLmCl-_jF1OkGyzjvsZZdolWPuSBB6RqAo9uFhWg`.
2.  **Character Limits**: The contact message is capped at 150 characters. Update the `maxlength` in `index.html` and the logic in `script.js` if more space is needed.
3.  **Social Links**: Search for `footer-socials` in `index.html` and replace `#` with your actual social media URLs.
3.  **Google Maps**: To change the location, update the `src` URL in the `<iframe>` tag within the `footer-map` section.
4.  **Asset Check**: Ensure all image files referenced in `script.js` exist in the `/PICS/` folder.

## 📏 Responsive Breakpoints

| Breakpoint | Target Device | Major Changes |
| :--- | :--- | :--- |
| `1024px` | Large Tablets | Category grid shifts to 2 columns; Product grid shifts to 3 columns. |
| `768px` | Small Tablets | Mobile hamburger menu activates; Search bar width reduced on hover. |
| `600px` | Phones | Single column layout for all grids; No spanning for "Hair" category. |

## 🎨 Color Palette

### Light Mode (Default)
| Variable | Hex Value | Role |
| :--- | :--- | :--- |
| `--bg-color` | `#854F6C` | Main Section Background |
| `--nav-bg` | `#FBE4D8` | Navbar & Card Background |
| `--PEACH` | `#FDA481` | Primary Accent Color |
| `--RED` | `#B41B2D` | Badges & Hover Alerts |
| `--text-main`| `#54162B` | Primary Typography |

### Dark Mode
| Variable | Hex Value | Role |
| :--- | :--- | :--- |
| `--bg-color` | `#190019` | Main Section Background |
| `--nav-bg` | `#2D1B2D` | Navbar & Card Background |
| `--text-main`| `#FDA481` | High-contrast Typography |

## ⚠️ Known Issues / TODO

*   [ ] Optimize image sizes for faster mobile loading.
*   [ ] Connect a real backend for product management.

## 📜 Credits

*   **Icons**: Font Awesome
*   **Typography**: Google Fonts
*   **Database Integration**: Google Forms & Sheets
*   **Design & Development**: NOTVC

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.
