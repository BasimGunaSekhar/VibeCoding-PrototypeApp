# Vibe Coding Shopping Prototype

The prototype is a static client-side app that fetches a local JSON dataset. For best results run a local static server and open the site via `http://` rather than opening the file directly.

Quick local server (Python 3):
```bash
python -m http.server 8000
```
Then open: `http://localhost:8000/ShoppingApp/`

If you prefer to open `index.html` directly (file://) the app includes an embedded fallback dataset so basic functionality will still work in most browsers.

Manual test steps:
1. Open `index.html` and navigate to `#/products`.
2. Add quantities and click `Add` to add items to the cart.
3. Open `#/cart` to update quantities or remove items.
4. Proceed to `#/checkout` to view the order summary and click `Process Order` to see a confirmation.

Notes:
- Cart is persisted in `localStorage` for demo persistence.
- The app uses hash routing (`#/products`, `#/products/:id`, `#/cart`, `#/checkout`).
