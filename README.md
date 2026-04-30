<div align="center">
  <img src="https://via.placeholder.com/1000x300/FBE4D8/54162B?text=LOVELY+K+OUTFITS" alt="Lovely K Banner" style="border-radius: 12px; margin-bottom: 20px;"/>

  <h1>🛍️ Lovely K Outfits</h1>
  <p><i>A premium fashion, accessories, and luxury hair e-commerce boutique built with a modern Vanilla stack.</i></p>

  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Status-Production_Ready-success?style=flat-square" alt="Status" />
  </p>
</div>

---

## Table of Contents

1. [🌟 Project Overview](#-project-overview)
2. [🚀 Live Demo & Screenshots](#-live-demo--screenshots)
3. [✨ Core Features & Functionality](#-core-features--functionality)
4. [📁 Project Structure](#-project-structure)
5. [🛠️ Technology Stack](#-technology-stack)
6. [💻 Quick Start](#-quick-start)
7. [✅ Production Checklist](#-production-checklist)

---

## 🌟 Project Overview

**Lovely K Outfits** is a fully functional, high-performance e-commerce web application. Built entirely without heavy frontend frameworks (No React/Vue), it relies on modern CSS and pure Vanilla JavaScript to deliver a highly interactive, beautifully animated user experience. 

It features a cross-device responsive design, an intuitive state-managed shopping cart, seamless dark/light mode, dynamic search filtering, and a direct-to-WhatsApp checkout system tailored for personalized boutique-style customer interactions.

---

## 🚀 Live Demo & Screenshots

> *(Add your live Vercel/Netlify/GitHub Pages link here once deployed)*

<div align="center">
  <img src="https://via.placeholder.com/800x450/2D1B2D/FDA481?text=Insert+Application+Screenshot+Here" alt="App Screenshot" style="border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);"/>
</div>

---

## ✨ Core Features & Functionality

The application utilizes a modular, event-driven JavaScript architecture designed for maintainability:

### 🛒 Interactive Shopping Cart
- **State Management:** Uses an in-memory `cart` array synced with browser `localStorage` to persist data across sessions.
- **WhatsApp Checkout Flow:** Automatically compiles cart items, calculates totals, and redirects users to a pre-filled WhatsApp conversation for personalized order fulfillment.
- **Fluid UX:** Cart modals slide in/out with Web Animations API, badges "pop" upon adding items, and users can instantly modify item quantities.

### 🎨 Premium Animations & Theming
- **Scroll Reveal:** Utilizes the `IntersectionObserver API` to elegantly fade elements in and out (smooth 1.5s duration) as they enter and leave the viewport.
- **Theme Management:** Supports toggling between **Light Mode** and **Dark Mode** instantly, saving user preferences globally.
- **Page Transitions:** Internal navigation triggers a smooth, YouTube-style top progress bar.

### 🛍️ Dynamic Product Management
- **Filtering & Search:** Real-time text searching across product names, categories, and descriptions with highlighted results.
- **Skeleton Loading:** Product cards feature a CSS-based shimmer effect while images are lazy-loaded in the background to improve perceived LCP (Largest Contentful Paint).

### ✉️ Contact & Integration
- **Serverless Contact Form:** Contact forms securely submit data via AJAX (`no-cors` fetch) to a hidden Google Form endpoint, equipped with rate-limiting and regex validation to prevent spam.

---

## 📁 Project Structure

<details>
<summary><b>Click to expand folder structure</b></summary>

```bash
LOVELY K OUTFITS/
├── CSS/
│   └── style.css            # Core responsive styles & theme variables
├── HTML/
│   ├── index.html           # Main homepage & routing hub
│   └── *.html               # Dedicated category pages (men, women, accessories, etc.)
├── JS/
│   └── script.js            # Core application logic & state
├── PICS/
│   └── *.jpg / *.png        # Image assets and favicons
├── fonts/                   # Local font assets
├── README.md                # Project documentation
└── TODO.md                  # Development tracking & milestones
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
| **Checkout** | `whatsappNumber` | `JS/script.js` | ✅ Completed (Configured to `2348036806640`). |
| **Contact** | `form action` URL | `HTML/index.html` | Replace the Google Form `formResponse` URL with your own. |
| **Contact** | `entry.ID` names | `HTML/index.html` | Match `entry.768668534` etc. with your Google Form field IDs. |
| **Location** | `iframe src` | `HTML/index.html` | Embed your actual boutique location from Google Maps. |
| **Inventory** | `products` array | `JS/script.js` | Replace mock objects with real product data and image paths. |
| **Social** | `href="#"` | `HTML/*.html` | ✅ Completed (Updated to real social profiles). |
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
**Developed by:** NOTVC | LOVELY K OUTFITS  
**License:** All rights reserved.
