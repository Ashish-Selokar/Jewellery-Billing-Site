document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");

    // Simple Validation
    if (username === "" || password === "") {
        errorMsg.textContent = "Please fill in all fields.";
        errorMsg.style.display = "block";
        return;
    }

    // Hardcoded Credentials (For Demo)
    if (username === "admin" && password === "password123") {
        errorMsg.style.display = "none";
        alert("Login successful! Redirecting to dashboard...");
        // Replace with actual redirection logic
        window.location.href = "dashboard.html";
    } else {
        errorMsg.textContent = "Invalid username or password.";
        errorMsg.style.display = "block";
    }
});

// Optional: Handle "Sign up" link dynamically
document.querySelector(".signup-link a").addEventListener("click", function (event) {
    event.preventDefault();
    alert("Redirecting to Sign up page...");
    // Replace this alert with actual redirection logic
    window.location.href = "signup.html";
});

// Toggle Password Visibility
const togglePassword = document.getElementById('togglePassword');
const passwordField = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);

    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
});

// Button Event Listeners
const adminLogin = document.getElementById('adminLogin');
const customerLogin = document.getElementById('customerLogin');

adminLogin.addEventListener('click', () => {
    alert('Admin Login clicked');
    // Add logic for admin login here
});

customerLogin.addEventListener('click', () => {
    alert('Customer Login clicked');
    // Add logic for customer login here
});