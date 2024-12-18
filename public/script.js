// Simple contact form validation
/*document.getElementById('contact-form').addEventListener('submit', function(e) {

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
});*/
/*
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    if (!email || !message) {
        //e.preventDefault();
        alert('All fields are required!');
    } else{
        let formData = new FormData(this);

        fetch('/submit-form', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                const statusMessage = document.getElementById('status-message');
                if (data.success) {
                    statusMessage.textContent = 'Thank you for your message!';
                    statusMessage.style.color = 'green';
                    this.reset();
                } else {
                    statusMessage.textContent = 'Something went wrong. Please try again.';
                    statusMessage.style.color = 'red';
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                const statusMessage = document.getElementById('status-message');
                statusMessage.textContent = 'There was an error submitting the form. Please try again.';
                statusMessage.style.color = 'red';
            });
    }
});*/



// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
