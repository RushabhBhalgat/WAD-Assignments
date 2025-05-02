document.addEventListener("DOMContentLoaded", () => {
    fetchData(); // Load users from localStorage

    document.getElementById("userForm").addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form refresh
        addUser();
    });
});

// Function to fetch users only from local storage (No API)
function fetchData() {
    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    displayData();
}

// Function to validate email format
function validateEmail(email) {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Function to validate mobile number (10 digits only)
function validatePhone(phone) {
    let phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

// Function to display users in the table
function displayData() {
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = ""; // Clear existing rows
    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    storedUsers.forEach((user, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.city}</td>
            </tr>`;
    });
}

// Function to add a new user
function addUser() {
    const name = document.getElementById("name").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const city = document.getElementById("city").value.trim();

    // ✅ Validate Email Format
    if (!validateEmail(email)) {
        alert("❌ Invalid Email! Please enter a valid email address.");
        return;
    }

    // ✅ Validate Phone Number Format
    if (!validatePhone(phone)) {
        alert("❌ Invalid Phone Number! Please enter a 10-digit mobile number.");
        return;
    }

    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    let newUser = {
        id: storedUsers.length + 1,
        name,
        username,
        email,
        phone,
        city
    };

    storedUsers.unshift(newUser); // Add new user to the beginning
    localStorage.setItem("users", JSON.stringify(storedUsers)); // Store updated users

    displayData(); // Refresh user list

    alert("✅ User added successfully!"); // Success alert

    window.location.href = "users.html"; // Redirect to users page
}
