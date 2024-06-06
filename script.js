// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearbtn = document.getElementById("clear-cart-btn");

let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
	cartList.innerHTML = "";
	cart.forEach((cartItem) =>{
		const li = document.createElement("li");
		li.innerHTML = `${cartItem.name} ${cartItem.price} <button class="remove-from-cart-bnt" date-id="${cartItem.id}">Remove form cart</button>`;
		cartList.appendChild(li);
	});
}

// Add item to cart
function addToCart(productId) {
	const productAdd = products.find((product) => product.id === productId)
	if(productAdd){
		cart.push(productAdd);
		sessionStorage.setItem("cart", JSON.stringify(cart));
		renderCart();
	}
}

// Remove item from cart
function removeFromCart(productId) {
	cart = cart.filter((cartItem)=> cartItem.id !== productId);
	sessionStorage.setItem("cart", JSON.stringify(cart));
	renderCart();
}

// Clear cart
function clearCart() {
	cart = [];
	sessionStorage.removeItem("cart");
	renderCart();
}

productList.addEventListener('click', (event) =>{
	if(event.target.classList.contains("add-to-cart-btn")){
		const productId = parseInt(event.target.getAttribute("data-id"));
		addToCart(productId);
	}
});

cartList.addEventListener('click', (event) =>{
	if(event.target.classList.contains("remove-form-cart-btn")){
		const productId = parseInt(event.target.getAttribute("data-id"));
		removeFromCart(productId);
	}
});

clearbtn.addEventListener('click', clearCart);

// Initial render
renderProducts();
renderCart();
