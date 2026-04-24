# Lovely K Outfits & Hair - Professional Technical Documentation

**Version:** 1.0.0  
**Last Updated:** April 23, 2026  
**Status:** Production Ready (with configuration required)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Core Logic & Functionality](#core-logic--functionality)
3. [Project Structure](#project-structure)
4. [Technology Stack](#technology-stack)
5. [Installation & Setup](#installation--setup)
6. [Production Checklist](#production-checklist)
7. [Environment Configuration](#environment-configuration)
8. [Features & Components](#features--components)

---

## Project Overview

**Lovely K Outfits & Hair** is a full-featured e-commerce boutique website specializing in premium fashion, accessories, shoes, and hair products. The application features a responsive design, dark/light theme switching, interactive shopping cart, product filtering, customer testimonials, and WhatsApp-based checkout integration.

---

## Core Logic & Functionality

### JavaScript Architecture (`JS/script.js`)

The application follows a modular event-driven architecture with separation of concerns:

#### **1. Navigation System**
- **Mobile Menu Toggle:** Handles hamburger menu animation and mobile navigation by toggling `is-active` and `active` classes on the menu button and nav links.
- **Auto-Close:** Automatically closes the mobile menu when any navigation link is clicked to improve UX.

#### **2. Shopping Cart Management**
- **State Management:** Uses an in-memory `cart` array to store product objects (name, price, image, quantity).
- **Checkout Flow:** Validates the cart, constructs a pre-filled WhatsApp message with order details (including a total estimate), and redirects the user to the business WhatsApp number.
- **CRUD Operations:** Supports adding items, updating quantities, and removing items with real-time UI updates to the cart badge and dropdown.

#### **3. Product Management System**
- **Database:** Uses a centralized `products` array containing 30 items with metadata (name, price, img, badge, description, category).
- **Rendering:** Dynamically generates product cards with staggered animations, lazy-loading images, and skeleton shimmers for better performance.
- **Search & Filtering:** Implements real-time search across names, descriptions, and categories. Includes a custom highlighting logic to mark search terms in the results.

#### **4. Theme & Animation**
- **Theme Management:** Persists user preference (light/dark) using `localStorage`. Applies styles via a `data-theme` attribute on the `<html>` element.
- **Scroll Reveal:** Uses the `IntersectionObserver API` to trigger entrance animations as elements enter the viewport.

#### **5. Contact Form Integration**
- **Google Forms Integration:** Submits form data via a `fetch` request to a Google Form response endpoint using `no-cors` mode. Includes character counting and phone number validation.

---

## Project Structure

```text
LOVELY K OUTFITS/
├── CSS/
│   └── style.css            # Responsive styles & theme definitions
├── HTML/
│   ├── index.html           # Main homepage
│   ├── menclothes.html      # Men's category page
│   ├── womenclothes.html    # Women's category page
│   ├── accesories.html     # Accessories category page
│   ├── shoes.html           # Shoes category page
│   └── hair.html            # Hair products category page
├── JS/
│   └── script.js            # Core application logic & state
├── PICS/
│   ├── product1-20.jpg      # Product images
│   ├── shoes1-5.jpg         # Shoe images
│   ├── hair1-5.jpg          # Hair product images
│   └── icons8-shop-50.png   # Site favicon
├── fonts/                   # Local font assets
└── README.md                # Project documentation
```

---

## Technology Stack

- **Frontend:** HTML5, CSS3 (Custom Properties, Grid/Flexbox), Vanilla JavaScript (ES6+).
- **Libraries:** Font Awesome 6.5.1 (Icons), Google Fonts (Montserrat & Playfair Display).
- **APIs:** Google Maps Embed, Google Forms (Backend-as-a-Service).
- **Storage:** Browser LocalStorage (Theme persistence).

---

## Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge).
- A local development server is recommended for testing image paths and external API calls.

### Quick Start

```bash
# 1. Clone the project
git clone https://github.com/your-repo/lovely-k-outfits.git

# 2. Navigate to the project folder
cd "LOVELY K OUTFITS"

# 3. Start a local server (e.g., using Python)
python -m http.server 8000

# 4. Open in your browser
# http://localhost:8000/HTML/index.html
```

---

## Production Checklist

Before deploying, you **must** replace all filler data with real business credentials.

| Category | Variable / Constant | File | Recommended Action |
| :--- | :--- | :--- | :--- |
| **Checkout** | `whatsappNumber` | `JS/script.js` | Replace `"2348000000000"` with your actual business number. |
| **Contact** | `form action` URL | `HTML/index.html` | Replace the Google Form `formResponse` URL with your own. |
| **Contact** | `entry.ID` names | `HTML/index.html` | Match `entry.768668534` etc. with your Google Form field IDs. |
| **Location** | `iframe src` | `HTML/index.html` | Embed your actual boutique location from Google Maps. |
| **Inventory** | `products` array | `JS/script.js` | Replace mock objects with real product data and image paths. |
| **Social** | `href="#"` | `HTML/*.html` | Update all footer social links (WhatsApp, Facebook, Instagram). |
| **Feedback** | `testimonials` | `JS/script.js` | Replace placeholder text with real client reviews. |

---

## Environment Configuration

Currently, this project uses hardcoded constants. For a production-ready setup, consider the following migration:

1. **Environment Variables:** Create a `.env` file (if using a build tool like Vite/Webpack) to store sensitive keys:
   ```env
   # .env template
   VITE_WHATSAPP_NUMBER=234XXXXXXXXX
   VITE_GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/.../formResponse
   ```

2. **API Endpoints:** If scaling, transition the static `products` array to a dynamic `fetch()` call to a database (e.g., Firebase, Supabase, or a custom REST API).

3. **Port Settings:** No specific port settings are required for deployment, but ensure the hosting provider (GitHub Pages, Vercel, Netlify) is configured to serve the `HTML/` directory correctly.

---

## Features & Components

- **Dark Mode:** Seamless theme switching with persistent memory.
- **Search System:** Real-time filtering with search term highlighting.
- **Scroll Animations:** Lightweight entrance effects using the Intersection Observer API.
- **WhatsApp Integration:** Instant order processing without the need for a complex backend.
- **Preloader:** Ensures a smooth initial load experience with a minimum display timeout.

---

**Last Updated:** April 2026  
**Developed by:** NOTVC | LOVELY K OUTFITS & HAIR  
**License:** All rights reserved.
