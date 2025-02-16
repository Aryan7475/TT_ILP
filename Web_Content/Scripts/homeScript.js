document.addEventListener("DOMContentLoaded", function() {
    // Event listeners for forms
    document.getElementById("bookingForm").addEventListener("submit", bookTicket);
    document.getElementById("passwordForm").addEventListener("submit", updatePassword);

    // Get the modal and close button
    var modal = document.getElementById("successModal");
    var span = document.getElementsByClassName("close")[0];

    // Close modal on span click
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Close modal on outside click
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

// Clear error messages
function clearErrors() {
    document.querySelectorAll(".error-msg").forEach(error => error.textContent = "");
}

function showError(inputId, message) {
    const errorSpan = document.getElementById(inputId + "Error");
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.style.display = message ? "block" : "none"; // Show or hide error message
    }
}


// Book ticket function
function bookTicket(event) {
    event.preventDefault();
    clearErrors();

    let userName = document.getElementById("userName").value.trim();
    let age = document.getElementById("age").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let date = document.getElementById("date").value;
    let boarding = document.getElementById("boarding").value.trim();
    let destination = document.getElementById("destination").value.trim();
    let tickets = document.getElementById("tickets").value.trim();
    let trainID = document.getElementById("train").value;

    let isValid = true;

    // Generate Random User ID and Booking ID
    let userID = "USR-" + Math.random().toString(36).substr(2, 6).toUpperCase();
    let bookingID = "TKT-" + Math.random().toString(36).substr(2, 6).toUpperCase();

    // Validate inputs
    if (!validateAge(age)) {
        showError("age", "Age must be between 18 and 100.");
        isValid = false;
    }
    if (!validateMobile(mobile)) {
        showError("mobile","Enter a valid 10-digit Indian mobile number starting with 6-9.");
        isValid = false;
    }
    if (!validateDate(date)) {
        showError("date","Date must be today or a future date.");
        isValid = false;
    }
    if (boarding.toLowerCase() === destination.toLowerCase()) {
        showError("destination","Boarding and destination stations must be different.");
        isValid = false;
    }
    if (tickets <= 0) {
        showError("tickets","Number of tickets should be atleast 1.");
        isValid = false;
    }

    if (!isValid) return;

    let formattedDate = formatDate(date); // Converts YYYY-MM-DD to DD/MM/YYYY

    // Add ticket details to the table
    let table = document.getElementById("ticketTable");
    let row = table.insertRow();
    row.innerHTML = `
        <td>${bookingID}</td>
        <td>${userID}</td>
        <td>${trainID}</td>
        <td>${formattedDate}</td>
        <td>${boarding}</td>
        <td>${destination}</td>
        <td>${userName}</td>
        <td>${tickets}</td>
        <td><button onclick="cancelTicket(this)">Cancel</button></td>
    `;

    // Navigate to "View Ticket" section
    showSection('view-ticket');
}

// Function to switch sections
function showSection(sectionID) {
    document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
    document.getElementById(sectionID).style.display = "block";
}

// Validation functions
function validateMobile(mobile) {
    let regex = /^[6-9]\d{9}$/; // Ensures first digit is 6-9 & total 10 digits
    return regex.test(mobile);
}

function validateAge(age) {
    return age >= 18 && age <= 100;
}

function validateDate(inputDate) {
    let today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time for accurate comparison
    let selectedDate = new Date(inputDate);
    return selectedDate >= today;
}

// Function to format date to dd/mm/yyyy
function formatDate(dateStr) {
    let parts = dateStr.split("-"); // YYYY-MM-DD format from input type="date"
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`; // Convert to DD/MM/YYYY
    }
    return dateStr; // Return as is if format is incorrect
}



function showCancelPopup(button) {
    let popup = document.createElement("div");
    popup.id = "cancelPopup";
    popup.innerHTML = `
        <div class="popup-content">
            <p>Are you sure you want to cancel your booking ?</p>
            <button id="confirmCancel">Yes</button>
            <button id="closePopup">No</button>
        </div>
    `;
    
    // Add styles for the popup
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "rgb(0 0 0 / 55%)";
    popup.style.padding = "30px";
    popup.style.border = "0.5px black";
    popup.style.zIndex = "1000";
    popup.style.backdropFilter = "blur(5px)";
    popup.style.borderRadius = "25px";  
    popup.style.boxShadow = "0px 0px 40px rgba(0, 0, 0, 0.7)";
    document.body.appendChild(popup);
    
    // Handle confirm cancel
    document.getElementById("confirmCancel").onclick = function() {
        button.parentElement.parentElement.remove();
        document.body.removeChild(popup);
    };
    
    // Handle close popup
    document.getElementById("closePopup").onclick = function() {
        document.body.removeChild(popup);
    };
}

// Function to cancel ticket (modified to use the new popup)
function cancelTicket(button) {
    showCancelPopup(button);
}


// Password Policy Validation
function validatePassword(password) {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    return regex.test(password);
}

// Function to update password
function updatePassword(event) {
    event.preventDefault();

    let currentPassword = document.getElementById("currentPassword");
    let newPassword = document.getElementById("newPassword");
    let confirmPassword = document.getElementById("confirmPassword");

    let currentPasswordError = document.getElementById("currentPasswordError");
    let newPasswordError = document.getElementById("newPasswordError");
    let confirmPasswordError = document.getElementById("confirmPasswordError");

    // Clear previous errors
    currentPasswordError.textContent = '';
    newPasswordError.textContent = '';
    confirmPasswordError.textContent = '';

    // Validation
    if (!validatePassword(newPassword.value)) {
        newPasswordError.textContent = "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character.";
        return;
    }
    if (newPassword.value !== confirmPassword.value) {
        confirmPasswordError.textContent = "Passwords do not match !";
        return;
    }

    // If all validations are passed
    document.getElementById("successModal").style.display = "block";
}

// Function to logout
function logout() {
    window.location.href = "./index.html";
}