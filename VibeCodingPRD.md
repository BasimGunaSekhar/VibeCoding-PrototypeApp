# Vibe Coding Prototype — Product Requirements Document (PRD)

## Overview
- Purpose: Lightweight client-side e-commerce prototype demonstrating browse → add-to-cart → checkout flows for fruit products.
- Target Audience: Online shoppers and stakeholders evaluating UI/UX for fruit purchases.

## Goals & Success Metrics
- Primary Goal: Demonstrate product browsing, product details, cart management, and checkout summary in a client-only prototype.
- Success Metrics:
  - Navigate between pages using the left-side nav.
  - Add/update/remove cart items; cart persists in `localStorage` between reloads.
  - Checkout shows correct order summary and confirmation message.

## Scope
- In-scope: Pages `Products`, `ProductDetails`, `ShoppingCart`, `Checkout`; left-side navigation with collapse behavior; sample dataset (10 fruits); basic styling; client-side (hash) routing; `localStorage` cart persistence.
- Out-of-scope: Backend APIs, authentication, payments, persistent databases, server-side rendering.

## User Personas
- Casual Shopper: Wants to quickly find fruit items, choose quantity, add to cart, and complete a simple checkout.
- Mobile Shopper: Uses phone; expects a compact nav and readable product list.

## Primary Use Cases / User Journeys
- Browse Products: Open `#/products` and scan the list of fruit items.
- View Details: Click a product → `#/products/:id` to see details.
- Add to Cart: From list or details, choose quantity and add to cart.
- Manage Cart: Update quantity / remove items → subtotal updates.
- Checkout: Review order summary → `Process Order` → confirmation.

## User Stories
- As a user, I can browse a list of fruit products.
- As a user, I can view detailed information about a selected product.
- As a user, I can add products to my shopping cart and adjust quantities.
- As a user, I can review and update my cart before checkout.
- As a user, I can view a summary of my order and "process" it (demo only).
 - As a user, I can navigate between the `Products`, `ProductDetails`, `ShoppingCart`, and `Checkout` pages.

## Functional Requirements (by page)

- Products (`#/products`):
  - Show list/grid of products with `name`, `price`, `unit`, emoji image, quantity selector, and `Add to Cart` button.
  - Responsive grid (1 column on phone, 2–4 on larger screens).

- ProductDetails (`#/products/:id`):
  - Show `name`, `description`, `price`, `unit`, large emoji, quantity selector, `Add to Cart`, and `Back to Products` link.

- ShoppingCart (`#/cart`):
  - Show cart items with `product name`, editable `quantity`, `item total` (price * qty), `remove` action, and subtotal.
  - `Proceed to Checkout` button navigates to `#/checkout`.

- Checkout (`#/checkout`):
  - Show order summary (name, qty, price), total price, simple form fields (Name, Email, Address — demo only), and `Process Order` button showing confirmation message.

- Navigation:
  - Persistent left-side navigation with links to `Products`, `Cart` (shows item count), and `Checkout`.
  - Collapse behavior: when viewport width < 600px, nav collapses to a slim bar showing 1–2 letter abbreviations (e.g., `Pr`, `Ct`, `Ch`) with tooltips.

## Data Model & Sample Dataset

- Product schema:

```
{
  id: string,
  name: string,
  description: string,
  price: number,
  unit: string,
  image: string, // emoji
  stock: number
}
```

- Cart shape:

```
[ { productId: string, quantity: number } ]
```

- Sample dataset (10 fruits):

```json
[
  {"id":"f1","name":"Apple","description":"Crisp red apple","price":0.99,"unit":"each","image":"🍎","stock":50},
  {"id":"f2","name":"Banana","description":"Ripe yellow banana","price":0.25,"unit":"each","image":"🍌","stock":100},
  {"id":"f3","name":"Orange","description":"Juicy navel orange","price":0.75,"unit":"each","image":"🍊","stock":80},
  {"id":"f4","name":"Strawberry","description":"Sweet strawberries","price":3.99,"unit":"pint","image":"🍓","stock":30},
  {"id":"f5","name":"Grapes","description":"Seedless grapes","price":2.49,"unit":"lb","image":"🍇","stock":40},
  {"id":"f6","name":"Pineapple","description":"Tropical pineapple","price":2.99,"unit":"each","image":"🍍","stock":20},
  {"id":"f7","name":"Watermelon","description":"Refreshing watermelon","price":4.99,"unit":"each","image":"🍉","stock":10},
  {"id":"f8","name":"Pear","description":"Juicy green pear","price":1.29,"unit":"each","image":"🍐","stock":45},
  {"id":"f9","name":"Peach","description":"Soft ripe peach","price":1.49,"unit":"each","image":"🍑","stock":35},
  {"id":"f10","name":"Kiwi","description":"Tangy kiwi fruit","price":0.89,"unit":"each","image":"🥝","stock":60}
]
```

Place this JSON in `data/products.json` when implementing; embedding in the PRD is fine for handoff.

## UI / UX & Wireframes (text)
- Layout: Two-column layout — left navigation (220px) and right content. On narrow screens, nav collapses to slim bar.
- Nav: Vertical left-side menu with icons and labels; cart count shown. Below 300px width, show abbreviated labels.
- Product Card: emoji avatar, product name, price/unit, quantity selector, add button.
- Styling: Basic CSS variables for colors and spacing; neutral, clean palette.

## Routing & Navigation Details
- Use hash routing for file-based prototype: `#/products`, `#/products/:id`, `#/cart`, `#/checkout`.
- Client-side routing updates the DOM without full page reloads; deep links supported via hash.

## State Management
- Approach: Small in-memory state object in `app.js` with `localStorage` to persist cart across refreshes.
- Utility functions expected:
  - `getProducts()`
  - `getProduct(id)`
  - `addToCart(productId, qty)`
  - `updateCart(productId, qty)`
  - `removeFromCart(productId)`
  - `getCartSummary()`

## Non-functional Requirements
- Responsiveness: Scales for desktop and phone; left nav collapses below 600px.
- Accessibility: Semantic HTML, emoji `alt` labels/tooltips, visible focus states.
- Browser support: Modern Chrome/Edge/Firefox (no transpilation).
- Performance: Load local JSON quickly; minimal dependencies.

## Technical Stack & File Structure
- Stack: Vanilla HTML, CSS, JavaScript.
- Files to deliver:
  - `index.html`
  - `styles.css`
  - `app.js`
  - `data/products.json` (sample dataset)
  - `assets/` (optional)
  - `README.md`
- No build step: open `index.html` to run.

## Acceptance Criteria / Manual Tests
1. Browse: Navigate to `#/products` → see 10 fruit items with emoji and prices.
2. Details: Click a product → `#/products/:id` shows full description and emoji.
3. Add to Cart: From list or details, add items → cart count updates in nav.
4. Cart Management: In `#/cart`, change quantity and remove items → totals update correctly.
5. Persistence: Reload page → cart restored from `localStorage`.
6. Checkout: `#/checkout` shows order summary and total; `Process Order` shows confirmation message.

## Deliverables
- Ready-to-open prototype source files listed under Technical Stack.
- `VibeCodingPRD.md` (this document) containing the dataset and checklist.
- `README.md` with run instructions (open `index.html`) and manual test steps.

## Constraints & Assumptions
- No backend or payments.
- Emoji images acceptable placeholders for product images.
- Cart persisted only in `localStorage` (demo-level persistence).

## Security & Privacy
- Prototype collects non-sensitive demo info only. Do not submit real payment data.

## Hand-off Instructions for GitHub Copilot Agent
- Implement pages and routes exactly as specified: `#/products`, `#/products/:id`, `#/cart`, `#/checkout`.
- Use the sample JSON in `data/products.json` and hash-based routing.
- Implement left-side nav that collapses below 300px to 1–2 letter abbreviations and shows cart count.
- Implement cart actions (add, update qty, remove) and persist cart in `localStorage`.
- Provide `README.md` with run instructions and the manual acceptance test checklist.

## Minimal Implementation Checklist
- `index.html` created and includes left-side nav and main content container.
- `styles.css` with CSS variables and responsive layout.
- `app.js` implementing routing, state, and UI updates.
- `data/products.json` containing the provided sample dataset.
- Cart persisted to `localStorage` and restored on load.
- Checkout shows summary and confirmation message.

---
End of PRD. Copy-paste this document into the chat or save as `VibeCodingPRD.md` in your project root.
