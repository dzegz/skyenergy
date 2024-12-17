// Simple contact form validation
document.getElementById('contact-form').addEventListener('submit', function(e) {

    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    if (!email || !message) {
        e.preventDefault();
        alert('All fields are required!');
    } else {
        // Create a FormData object to send form data
        let formData = new FormData(this);

        // Use fetch to submit the form data without reloading the page
        fetch(this.action, {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                alert('Thank you for your message!');  // Show success message
                this.reset();  // Reset the form fields
            } else {
                alert('Something went wrong, please try again later.');  // Show error message
            }
        })
        .catch(error => {
            alert('There was a network error. Please try again later.');
        });

    }
});


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
