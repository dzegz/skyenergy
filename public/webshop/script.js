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


// -----------------------------------------------------
// Success message for contacting
// -----------------------------------------------------

document.getElementById('contact-form-element').addEventListener('submit', async function (e) {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    let formMessage = document.getElementById('form-message');

    if (!email || !message) {
        formMessage.style.display = 'block';
        formMessage.style.color = 'red';
        formMessage.textContent = 'All fields are required!';
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 2500);
        return;
    }

    // Create a FormData object to send form data
    const formData = {
        email: email,
        message: message
    };
    //console.log("Form data:", formData);

    try {
        const response = await fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });


        // Wait for JSON response to be parsed
        const result = await response.json();
        console.log("Im getting the results:", result);

        if (!response.ok) {
            alert(`Failed to send message: ${result.message}`);
            return;  
        }


        if (result.success == true) {
            //console.log("Email sent", result.message);
            formMessage.style.display = 'block';
            formMessage.style.color = 'green';
            formMessage.textContent = 'Email was sent succesfully.';

            // Reset form fields after successful submission
            email.value = '';
            message.value = '';
        } else {
            //console.log("Email not sent", result.message);
            formMessage.style.display = 'block';
            formMessage.style.color = 'red';
            formMessage.textContent = 'Something went wrong: ' || result.message;
        }
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 2500);


    } catch (error) {
        // Handle any exceptions that occur during fetch
        console.error('Error:', error);
        alert('Network error or cannot connect to server');
    }
});

// end of success message for contacting
// -----------------------------------------------------