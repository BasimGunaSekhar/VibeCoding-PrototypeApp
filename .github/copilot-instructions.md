## Vibe Coding PRD (for Copilot Agent)

----

Contents of `VibeCodingPRD.md`:


----------------

<!-- PRD START -->

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
 - Navigation:
   - Persistent left-side navigation with links to `Products`, `Cart` (shows item count), and `Checkout`.
   - Collapse behavior: when viewport width < 600px, nav collapses to a slim bar showing 1–2 letter abbreviations (e.g., `Pr`, `Ct`, `Ch`) with tooltips.
  - Visual indicator: The nav displays a live cart item-count badge over the cart emoji; the badge remains visible when the nav is collapsed.

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

## UI / UX & Wireframes (text)
- Layout: Two-column layout — left navigation (220px) and right content. On narrow screens, nav collapses to slim bar.
 - Nav: Vertical left-side menu with icons and labels; cart count shown. Below 600px width, show abbreviated labels.
  - Nav items must include an emoji icon for each page. When the nav collapses (≤600px) the emoji must be centered horizontally in the slim nav.
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
- Implement left-side nav that collapses below 600px to 1–2 letter abbreviations and shows cart count. Nav items must include an emoji icon for each page and the emoji must be centered horizontally when collapsed.
 - Implement left-side nav that collapses below 600px to 1–2 letter abbreviations and shows cart count. Nav items must include an emoji icon for each page and the emoji must be centered horizontally when collapsed.
 - Replace blocking `alert()` popups with in-app toasts/notification banners. Add a small toast when items are added to the cart and when the order is processed.
 - After `Process Order`, show an inline confirmation view and a non-blocking toast message thanking the user.
- Implement cart actions (add, update qty, remove) and persist cart in `localStorage`.
- Provide `README.md` with run instructions and the manual acceptance test checklist.

## Minimal Implementation Checklist
- `index.html` created and includes left-side nav and main content container.
- `styles.css` with CSS variables and responsive layout.
- `app.js` implementing routing, state, and UI updates.
- `data/products.json` containing the provided sample dataset.
- Cart persisted to `localStorage` and restored on load.
- Checkout shows summary and confirmation message.

<!-- PRD END -->


----

Wireframes (source files under `wireframes/`):

--- nav.txt ---

Expanded Left Navigation (desktop)

Layout:
- Left column (220px):
  - Logo
  - Products
  - Cart (🛒 0) — shows item count badge
  - Checkout

Behavior:
- Persistent on all pages
- Shows full labels and icons when viewport >= 300px
- When viewport < 300px, nav collapses to slim bar showing 1-2 letter abbreviations with tooltips

Collapsed Left Navigation (<300px)

Layout:
- Slim vertical bar (40px):
  - "Pr" (Products)
  - "Ct" (Cart) with small badge
  - "Ch" (Checkout)

Behavior:
- Tooltips on hover/tap show full labels
- Accessible focus states for keyboard navigation

--- products.txt ---

Products Page Wireframe (`#/products`)

Top:
- Page title: "Products"
- Optional controls: Search input | Sort dropdown

Main content:
- Responsive product grid:
  - Desktop: 2–4 columns
  - Tablet: 2 columns
  - Phone: 1 column

Product Card layout:
- Large emoji (image placeholder)
- Product name
- Price per unit (e.g., "$0.99 / each")
- Quantity selector (minus / number / plus)
- Add to Cart button

Interactions:
- Quantity changes affect only the card until "Add to Cart" clicked
- Add to Cart updates nav cart count badge
- Clicking product name or emoji navigates to ProductDetails

--- product_details.txt ---

ProductDetails Page Wireframe (`#/products/:id`)

Header:
- Back link/button: "← Back to Products"
- Page title: Product name

Main section:
- Left/Top: Large emoji image (hero)
- Right/Below: Product info
  - Name
  - Price per unit
  - Unit (each, lb, pint, etc.)
  - Description (paragraph)

Actions:
- Quantity selector (minus / number / plus)
- Add to Cart button
- Small note: stock remaining

Behavior:
- Adding to cart shows small confirmation/toast and updates nav count
- Back link returns to `#/products`

--- cart.txt ---

ShoppingCart Page Wireframe (`#/cart`)

Header:
- Page title: "Shopping Cart"

Main content:
- Cart items list (vertical): for each item:
  - Emoji
  - Product name (link to details)
  - Unit price
  - Quantity input (editable with +/-)
  - Item total (price * qty)
  - Remove (trash icon)

Summary section (bottom or right side):
- Subtotal
- Taxes (optional demo)
- Total
- Proceed to Checkout button

Interactions:
- Changing quantity updates item total and subtotal immediately
- Remove deletes the item and updates subtotal and nav count
- Cart persisted to `localStorage`; restored on page load

--- checkout.txt ---

Checkout Page Wireframe (`#/checkout`)

Layout:
- Left: Customer form (demo only)
  - Name (text)
  - Email (text)
  - Address (textarea)

- Right: Order summary
  - List of items: emoji, name, qty, line total
  - Subtotal and Total
  - Process Order button

Confirmation:
- After clicking Process Order, show a confirmation view/message:
  - "Thank you — your order has been processed (demo)."
  - Summary reference number (demo only) and link back to `#/products`

Notes:
- Form does not submit to any backend (client-only demo)
- Accessible form labels and focus order required
