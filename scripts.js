document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registerForm").addEventListener("submit", function (event) {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassword").value;
        let email = document.getElementById("email").value;
        let mobile = document.getElementById("mobile").value;
        let aadhaar = document.getElementById("aadhaar").value;

        let usernameRegex = /^[a-zA-Z]{6,}$/;
        let passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
        let emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        let mobileRegex = /^[0-9]{10}$/;
        let aadhaarRegex = /^[0-9]{12}$/;

        if (!usernameRegex.test(username)) {
            alert("Username must be at least 6 characters long and contain only letters.");
            event.preventDefault();
        } else if (!passwordRegex.test(password)) {
            alert("Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.");
            event.preventDefault();
        } else if (password !== confirmPassword) {
            alert("Passwords do not match.");
            event.preventDefault();
        } else if (!emailRegex.test(email)) {
            alert("Invalid email format.");
            event.preventDefault();
        } else if (!mobileRegex.test(mobile)) {
            alert("Mobile number must be exactly 10 digits.");
            event.preventDefault();
        } else if (!aadhaarRegex.test(aadhaar)) {
            alert("Aadhaar number must be exactly 12 digits.");
            event.preventDefault();
        }
    });

    document.getElementById("loginForm").addEventListener("submit", function (event) {
        let username = document.getElementById("loginUsername").value;
        let password = document.getElementById("loginPassword").value;

        if (!username || !password) {
            alert("Both username and password are required.");
            event.preventDefault();
        }
    });
});
