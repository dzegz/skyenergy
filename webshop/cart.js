// Function to render the cart
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');

    // Clear previous items
    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<li>Your cart is empty</li>';
    } else {
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} - $${item.price} x ${item.quantity}`;
            cartList.appendChild(li);
        });
    }
}

function clearCart() {
    if (confirm("Are you sure you want to clear the cart?")) {
        // Clear the cart in localStorage
        localStorage.removeItem('cart');
        
        // Re-render the cart
        renderCart();
    }
}

// event listener to "Clear Cart" button
document.getElementById('clear-cart-btn').addEventListener('click', clearCart);

// Render cart on page load
window.onload = renderCart;
