document.addEventListener("DOMContentLoaded", () => {
    function showError(inputId, message) {
        const errorSpan = document.getElementById(inputId + "-error");
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.style.display = message ? "block" : "none"; // Show or hide error message
        }
    }

    function formatAadharInput() {
        const aadharInput = document.getElementById("reg-aadhar");
        let value = aadharInput.value.replace(/\D/g, ''); // Remove non-digit characters
        value = value.match(/.{1,4}/g)?.join(' ') || value; // Group digits in sets of 4
        aadharInput.value = value;
    }

    function validateLogin(event) {
        event.preventDefault();
        let isValid = true;

        let username = document.getElementById("login-username").value.trim();
        let password = document.getElementById("login-password").value.trim();

        if (!username) {
            showError("login-username", "Username is required");
            isValid = false;
        } else {
            showError("login-username", "");
        }

        if (!password) {
            showError("login-password", "Password is required");
            isValid = false;
        } else {
            showError("login-password", "");
        }

        if (isValid) {
            // Show the login success modal
            const modal = document.getElementById("loginSuccessModal");
            modal.style.display = "block";

            // Handle the OK button click
            document.getElementById("loginOkButton").addEventListener("click", () => {
                modal.style.display = "none";
                // Redirect to a different page or perform another action
                window.location.href = "./home.html"; // Example redirection
            });

            // Handle the close button click
            document.getElementById("closeLoginModal").addEventListener("click", () => {
                modal.style.display = "none";
            });
        }
    }

    function validateRegister(event) {
        event.preventDefault();
        let isValid = true;

        let username = document.getElementById("reg-username").value.trim();
        let password = document.getElementById("reg-password").value.trim();
        let confirmPassword = document.getElementById("reg-confirm-password").value.trim();
        let email = document.getElementById("reg-email").value.trim();
        let mobile = document.getElementById("reg-mobile").value.trim();
        let aadhar = document.getElementById("reg-aadhar").value.replace(/\s/g, ''); // Remove spaces for validation

        if (!/^[A-Za-z]{6,}$/.test(username)) {
            showError("reg-username", "Username must be at least 6 letters (no numbers/special characters)");
            isValid = false;
        } else {
            showError("reg-username", "");
        }

        if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)) {
            showError("reg-password", "Password must be 8+ chars with 1 uppercase, 1 number & 1 special character");
            isValid = false;
        } else {
            showError("reg-password", "");
        }

        if (confirmPassword !== password) {
            showError("reg-confirm-password", "Passwords do not match");
            isValid = false;
        } else {
            showError("reg-confirm-password", "");
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError("reg-email", "Enter a valid email");
            isValid = false;
        } else {
            showError("reg-email", "");
        }

        if (!/^[6-9]\d{9}$/.test(mobile)) {
            showError("reg-mobile", "Mobile number must be 10 digits and start with a digit between 6 and 9");
            isValid = false;
        } else {
            showError("reg-mobile", "");
        }

        if (!/^\d{12}$/.test(aadhar)) {
            showError("reg-aadhar", "Aadhar must be 12 digits");
            isValid = false;
        } else {
            showError("reg-aadhar", "");
        }

        if (isValid) {
            // Show the registration success modal
            const modal = document.getElementById("successModal");
            modal.style.display = "block";

            // Handle the OK button click
            document.getElementById("okButton").addEventListener("click", () => {
                modal.style.display = "none";
                window.location.href = "./index.html"; // Redirect to index.html
            });

            // Handle the close button click
            document.getElementById("closeModal").addEventListener("click", () => {
                modal.style.display = "none";
            });
        }
    }

    document.getElementById("loginForm")?.addEventListener("submit", validateLogin);
    document.getElementById("registerForm")?.addEventListener("submit", validateRegister);
    document.getElementById("reg-aadhar")?.addEventListener("input", formatAadharInput);
});