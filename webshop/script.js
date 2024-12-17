// Function to add product to cart
function addToCart(productName, productPrice) {
    // Retrieve current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    
    if (existingProductIndex !== -1) {
        // If product exists, increase the quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // Otherwise, add new product to cart with quantity 1
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    //console.log("Cart updated:", cart);
    //alert(`${productName} added to cart`);

    // Update the cart sidebar display
    updateCartSidebar();

    // Automatically open the cart sidebar
    cartSidebar.style.right = '0';
    pageOverlay.classList.add('active'); // Show the overlay
}

// Event listener for the "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');
        addToCart(productName, productPrice);
    });
});

// -----------------------------------------------------
// Cart Sidebar Functionality
// -----------------------------------------------------
const cartSidebar = document.getElementById('cart-sidebar');
const cartIcon = document.getElementById('cart-icon');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartList = document.getElementById('cart-sidebar-list');
const pageOverlay = document.getElementById('page-overlay');

// Open cart sidebar
cartIcon.addEventListener('click', () => {
    cartSidebar.style.right = '0'; // Slide in
    pageOverlay.classList.add('active'); // Show the overlay
});

// Close cart sidebar
closeCartBtn.addEventListener('click', () => {
    cartSidebar.style.right = '-400px'; // Slide out
});

function updateCartSidebar() {
    // Retrieve cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartList.innerHTML = ''; // Clear current items

    if (cart.length === 0) {
        cartList.innerHTML = '<li>Your cart is empty</li>';
    } else {
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            cartList.appendChild(li);
        });
    }
}

// Initialize cart sidebar on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartSidebar();
});

// Optional: Add "Clear Cart" functionality
document.getElementById('clear-cart-btn')?.addEventListener('click', () => {
    localStorage.removeItem('cart'); // Clear cart data
    updateCartSidebar(); // Refresh sidebar display
});


// Function to close cart sidebar and hide overlay
function closeCartSidebar() {
    cartSidebar.style.right = '-400px'; // Hide the sidebar
    pageOverlay.classList.remove('active'); // Hide the overlay
}

closeCartBtn.addEventListener('click', closeCartSidebar);

// Close sidebar if overlay is clicked
pageOverlay.addEventListener('click', closeCartSidebar);

// end of cart sidebar functionality
// -----------------------------------------------------


