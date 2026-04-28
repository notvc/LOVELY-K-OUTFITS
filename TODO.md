# 📝 Project Tasks & Milestones

## ✅ Completed
- [x] **Fix Category Card Double-Click Navigation:** Replaced click/dblclick listeners with a single-click + timer approach for better UX on mobile.
- [x] **Global Scroll Reveal Animations:** Upgraded the IntersectionObserver in `script.js` to animate all elements (fade in + scale/slide) as they enter and fade out as they leave the viewport.
- [x] **Animation Timing Optimization:** Dialed in fade animations to a smooth 1.5s duration across the site.
- [x] **Navbar Polish:** Added YouTube-style page transition bars, compact scrolling states, and fade animations.
- [x] **Cross-Page Links & Footers:** Fixed `accessories.html` links across all files and injected the "Follow Us" social icons uniformly into the footer.
- [x] **Color & Theme Contrast:** Overhauled Light and Dark mode semantic variables for better contrast and readability.
- [x] **WhatsApp Checkout Enhancements:** Added dynamic Date, Time, Delivery Address, and Alternate Phone placeholders to the generated order inquiry.
- [x] **Social & Contact Links:** Updated all footer social media URLs (Instagram, Facebook) and WhatsApp Click-to-Chat links globally.
- [x] **Bug Fixes:** Resolved strict CSP font loading issues for FontAwesome, fixed IntersectionObserver excluding the footer-bottom element, and corrected various responsive CSS selector bugs.
## 🛠️ Phase 1: Architecture & Refactoring (Current Backlog)
- [ ] **Data Extraction:** Move the hardcoded `products` and `testimonials` arrays out of `script.js` into separate `data/products.json` and `data/testimonials.json` files and load them via `fetch()`.
- [ ] **Component Abstraction (DRY Principle):** Write a JavaScript function to dynamically inject the Navbar and Footer HTML into all pages so you only have to edit them in one place.
- [x] **Image Optimization:** Implement `loading="lazy"` on the Google Maps iframe and set up `srcset` attributes for responsive product images to improve LightHouse scores.

## 🎨 Phase 2: UI / UX Enhancements
- [x] **Testimonial Carousel Upgrades:** Add `setInterval` auto-rotation functionality with a "pause on mouseenter" feature for the reviews.
- [ ] **Infinite Scrolling:** Upgrade the product grid "Show More" functionality to utilize the `IntersectionObserver` to load more items as the user hits the bottom of the page.
- [x] **Toast Notifications:** Replace the native `alert()` fallback in the Contact form with a custom, elegantly styled CSS Toast notification.
- [x] **Quick View Refinement:** Add a "Swipe to dismiss" gesture on mobile for the Shopping Cart modal and Product Quick View modals.

## 🚀 Phase 3: Future Scalability
- [x] **Backend Database Integration:** Connect the frontend to a Headless CMS (like Firebase, Supabase, or Sanity.io) to allow the boutique owner to add/remove products without touching code.
- [ ] **Payment Gateway API:** Integrate Paystack or Flutterwave alongside the WhatsApp Checkout for users who prefer to pay instantly online.
- [ ] **User Authentication:** Add Firebase Auth to allow users to create accounts, save their wishlist, and track past orders.

---
> *Tip: Pick one task from Phase 1 to tackle next to keep the codebase clean before adding new features!*
