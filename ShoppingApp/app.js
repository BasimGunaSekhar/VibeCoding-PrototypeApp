// Simple client-side shopping prototype
(function(){
  const DATA_URL = 'data/products.json';
  let PRODUCTS = [];
  // Fallback dataset to use when `fetch` can't load local JSON (file://)
  const FALLBACK_PRODUCTS = [
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
  ];
  const main = document.getElementById('main');
  const navCount = document.getElementById('navCount');

  // Cart persisted in localStorage as array of {productId, quantity}
  function loadCart(){
    try{ return JSON.parse(localStorage.getItem('cart')||'[]') }catch(e){return[]}
  }
  function saveCart(c){ localStorage.setItem('cart', JSON.stringify(c)) }
  function getCartCount(){ return loadCart().reduce((s,i)=>s+i.quantity,0) }

  function fetchProducts(){
    return fetch(DATA_URL).then(r=>{
      if(!r.ok) return FALLBACK_PRODUCTS;
      return r.json();
    }).catch(()=>{
      // If fetch is blocked (file://) or fails, use fallback dataset
      return FALLBACK_PRODUCTS;
    })
  }

  function formatPrice(v){ return '$' + v.toFixed(2) }

  // render helpers
  function renderProducts(){
    document.title = 'Products - Vibe';
    const html = [];
    html.push('<h1 class="page-title">Products</h1>');
    html.push('<div class="grid">');
    PRODUCTS.forEach(p=>{
      html.push(`<div class="card">
        <div class="emoji">${p.image}</div>
        <div class="meta">
          <a href="#/products/${p.id}" class="title">${p.name}</a>
          <div class="small">${p.description}</div>
          <div class="row"><div class="price">${formatPrice(p.price)} / ${p.unit}</div></div>
        </div>
        <div>
          <div class="qty">
            <button class="btn secondary" data-action="dec" data-id="${p.id}">-</button>
            <input type="number" min="1" value="1" data-qty-for="${p.id}" style="width:52px;padding:6px;border-radius:6px;border:1px solid #e6e9ef" />
            <button class="btn" data-action="add" data-id="${p.id}">Add</button>
          </div>
        </div>
      </div>`)
    })
    html.push('</div>')
    main.innerHTML = html.join('\n');
  }

  function renderProductDetails(id){
    const p = PRODUCTS.find(x=>x.id===id);
    if(!p){ main.innerHTML = '<p>Product not found</p>'; return }
    document.title = p.name + ' - Vibe';
    main.innerHTML = `
      <a href="#/products" class="small">← Back to Products</a>
      <h1 class="page-title">${p.name}</h1>
      <div class="card" style="align-items:flex-start">
        <div class="emoji" style="font-size:72px">${p.image}</div>
        <div class="meta">
          <div class="price">${formatPrice(p.price)} / ${p.unit}</div>
          <p class="small">${p.description}</p>
          <div class="row">
            <input type="number" min="1" value="1" id="detailQty" style="width:80px;padding:6px;border-radius:6px;border:1px solid #e6e9ef" />
            <button class="btn" id="detailAdd">Add to Cart</button>
          </div>
          <div class="small">Stock: ${p.stock}</div>
        </div>
      </div>`;
    document.getElementById('detailAdd').addEventListener('click',()=>{
      const qty = parseInt(document.getElementById('detailQty').value)||1;
      addToCart(p.id, qty);
    })
  }

  function renderCart(){
    document.title = 'Cart - Vibe';
    const cart = loadCart();
    const items = cart.map(ci=>{
      const p = PRODUCTS.find(x=>x.id===ci.productId);
      return Object.assign({},p,{quantity:ci.quantity, line: p.price*ci.quantity});
    })
    let html = ['<h1 class="page-title">Shopping Cart</h1>'];
    if(items.length===0){ html.push('<p>Your cart is empty.</p>') }
    html.push('<div>');
    items.forEach(it=>{
      html.push(`<div class="cart-item">
        <div class="emoji">${it.image}</div>
        <div style="flex:1">
          <a href="#/products/${it.id}">${it.name}</a>
          <div class="small">${formatPrice(it.price)} / ${it.unit}</div>
        </div>
        <div style="width:140px;display:flex;gap:8px;align-items:center">
          <input type="number" min="1" value="${it.quantity}" data-cart-qty="${it.id}" style="width:60px;padding:6px;border-radius:6px;border:1px solid #e6e9ef" />
          <div class="small">${formatPrice(it.line)}</div>
          <button class="btn secondary" data-action="remove" data-id="${it.id}">Remove</button>
        </div>
      </div>`)
    })
    html.push('</div>')
    const subtotal = items.reduce((s,i)=>s+i.line,0);
    html.push(`<div style="margin-top:16px" class="cart-summary"><div class="row"><div class="small">Subtotal</div><div style="margin-left:auto;font-weight:700">${formatPrice(subtotal)}</div></div><div style="margin-top:12px"><a href="#/checkout"><button class="btn">Proceed to Checkout</button></a></div></div>`)
    main.innerHTML = html.join('\n');
    // wire up qty and remove
    document.querySelectorAll('[data-cart-qty]').forEach(inp=>{
      inp.addEventListener('change', (e)=>{
        const id = e.target.getAttribute('data-cart-qty');
        const qty = parseInt(e.target.value)||1;
        updateCart(id, qty);
      })
    })
    document.querySelectorAll('[data-action="remove"]').forEach(b=>b.addEventListener('click', e=>{
      const id = e.target.getAttribute('data-id'); removeFromCart(id);
    }))
  }

  function renderCheckout(){
    document.title = 'Checkout - Vibe';
    const cart = loadCart();
    const items = cart.map(ci=>{
      const p = PRODUCTS.find(x=>x.id===ci.productId);
      return Object.assign({},p,{quantity:ci.quantity, line: p.price*ci.quantity});
    })
    const subtotal = items.reduce((s,i)=>s+i.line,0);
    let html = ['<h1 class="page-title">Checkout</h1>'];
    html.push('<div style="display:grid;grid-template-columns:1fr 320px;gap:16px">');
    html.push('<div>');
    html.push('<label>Name</label><input id="c_name" type="text" />');
    html.push('<label>Email</label><input id="c_email" type="text" />');
    html.push('<label>Address</label><textarea id="c_address" rows="4"></textarea>');
    html.push('</div>');
    // summary
    html.push('<div class="cart-summary">');
    html.push('<div><strong>Order Summary</strong></div>');
    items.forEach(it=>{
      html.push(`<div class="row" style="margin-top:8px"><div>${it.image} ${it.name} × ${it.quantity}</div><div style="margin-left:auto">${formatPrice(it.line)}</div></div>`)
    })
    html.push(`<div class="row" style="margin-top:12px"><div class="small">Total</div><div style="margin-left:auto;font-weight:700">${formatPrice(subtotal)}</div></div>`)
    html.push('<div style="margin-top:12px"><button id="processOrder" class="btn">Process Order</button></div>');
    html.push('</div>');
    html.push('</div>');
    main.innerHTML = html.join('\n');
    document.getElementById('processOrder').addEventListener('click', ()=>{
      // demo: clear cart and show confirmation
      localStorage.removeItem('cart');
      updateNavCount();
      // show inline confirmation and toast
      main.innerHTML = `<h1 class="page-title">Thank you</h1><p>Your order has been processed (demo). <a href="#/products">Continue shopping</a></p>`;
      showToast('Order processed', 'Thank you — your order has been processed (demo).', 'success');
    })
  }

  // cart helper functions
  function addToCart(productId, qty){
    const cart = loadCart();
    const found = cart.find(c=>c.productId===productId);
    if(found) found.quantity += qty; else cart.push({productId, quantity: qty});
    saveCart(cart); updateNavCount();
    // small toast
    showToast('Added to cart', 'Item added to your cart');
    routeTo('products');
  }
  function updateCart(productId, qty){
    const cart = loadCart();
    const idx = cart.findIndex(c=>c.productId===productId);
    if(idx>=0){ cart[idx].quantity = qty; if(qty<=0) cart.splice(idx,1); saveCart(cart); }
    renderCart(); updateNavCount();
  }
  function removeFromCart(productId){
    const cart = loadCart().filter(c=>c.productId!==productId); saveCart(cart); renderCart(); updateNavCount();
  }

  function updateNavCount(){ navCount.textContent = getCartCount(); }

  // Toast helper
  function showToast(title, msg, type){
    const root = document.getElementById('toastRoot');
    if(!root) return; const t = document.createElement('div');
    t.className = 'toast' + (type? ' ' + type : '');
    t.innerHTML = `<div style="position:relative"><button class="close" aria-label="Close">×</button><div class="title">${title}</div><div class="msg">${msg}</div></div>`;
    root.appendChild(t);
    t.querySelector('.close').addEventListener('click', ()=>{ t.remove() });
    setTimeout(()=>{ try{ t.remove() }catch(e){} }, 4000);
  }

  // event delegation for products page add buttons
  function attachGlobalHandlers(){
    document.body.addEventListener('click', (e)=>{
      const t = e.target;
      if(t.matches('[data-action="add"]')){
        const id = t.getAttribute('data-id');
        const input = document.querySelector(`[data-qty-for="${id}"]`);
        const qty = parseInt((input && input.value) || 1);
        addToCart(id, qty);
      }
      if(t.matches('[data-action="dec"]')){
        const id = t.getAttribute('data-id');
        const input = document.querySelector(`[data-qty-for="${id}"]`);
        if(input){ input.value = Math.max(1, parseInt(input.value||1)-1); }
      }
    })
  }

  // router
  function parseHash(){
    const h = location.hash || '#/products';
    const parts = h.replace('#/','').split('/');
    return parts;
  }
  function route(){
    const parts = parseHash();
    if(parts[0]==='products'){
      if(parts[1]) renderProductDetails(parts[1]); else renderProducts();
    } else if(parts[0]==='cart'){
      renderCart();
    } else if(parts[0]==='checkout'){
      renderCheckout();
    } else {
      location.hash = '#/products';
    }
  }
  function routeTo(page){ location.hash = '#/' + page }

  // init
  fetchProducts().then(data=>{ PRODUCTS = (Array.isArray(data) && data.length>0) ? data : FALLBACK_PRODUCTS; updateNavCount(); attachGlobalHandlers(); window.addEventListener('hashchange', route); updateNavCount(); route(); });

})();
