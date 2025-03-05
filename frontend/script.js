// Sample product data
let products = [
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
      description: "Description for Product 1",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      name: "Product 2",
      price: 49.99,
      description: "Description for Product 2",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      name: "Product 3",
      price: 19.99,
      description: "Description for Product 3",
      image: "https://via.placeholder.com/150"
    }
  ];
  
  // Cart array to store { productId, quantity }
  let cart = [];
  
  // Display the product listing and hide the cart section
  function showProducts() {
    document.getElementById("products-section").style.display = "block";
    document.getElementById("cart-section").style.display = "none";
  
    let productsSection = document.getElementById("products-section");
    productsSection.innerHTML = "<h2>Products</h2>";
  
    // Create a card for each product
    products.forEach(product => {
      let productCard = document.createElement("div");
      productCard.className = "product-card";
  
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
  
      productsSection.appendChild(productCard);
    });
  }
  
  // Display the cart and hide the products section
  function showCart() {
    document.getElementById("products-section").style.display = "none";
    document.getElementById("cart-section").style.display = "block";
  
    let cartItemsDiv = document.getElementById("cart-items");
    cartItemsDiv.innerHTML = "";
    let total = 0;
  
    // Build the cart items
    cart.forEach(item => {
      let product = products.find(p => p.id === item.productId);
      let itemTotal = product.price * item.quantity;
      total += itemTotal;
  
      let cartItemDiv = document.createElement("div");
      cartItemDiv.className = "cart-item";
  
      cartItemDiv.innerHTML = `
        <h4>${product.name}</h4>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: $${product.price.toFixed(2)}</p>
        <p>Subtotal: $${itemTotal.toFixed(2)}</p>
        <button onclick="removeFromCart(${product.id})">Remove</button>
      `;
  
      cartItemsDiv.appendChild(cartItemDiv);
    });
  
    document.getElementById("cart-total").innerText = "Total: $" + total.toFixed(2);
  }
  
  // Add a product to the cart
  function addToCart(productId) {
    let item = cart.find(i => i.productId === productId);
    if (item) {
      item.quantity++;
    } else {
      cart.push({ productId: productId, quantity: 1 });
    }
    updateCartCount();
  }
  
  // Remove a product entirely from the cart
  function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    showCart();
    updateCartCount();
  }
  
  // Update the cart icon count in the nav
  function updateCartCount() {
    let cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById("cart-count").innerText = cartCount;
  }
  
  // Simulate a checkout process
  function checkout() {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Thank you for your purchase!");
    cart = [];
    updateCartCount();
    showProducts();
  }
  
  