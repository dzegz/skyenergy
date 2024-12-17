// Simple form validation
document.querySelector("form").addEventListener("submit", function(e) {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    if (!name || !email) {
        alert("Please fill in all fields.");
        e.preventDefault(); // Prevent form submission if fields are empty
    }
});
