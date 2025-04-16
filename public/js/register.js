document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");

    form.addEventListener("submit", (event) => {
        let isValid = true;

        // Validate Full Name
        if (fullName.value.trim() === "") {
            isValid = false;
            alert("Full Name is required.");
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            isValid = false;
            alert("Please enter a valid email address.");
        }

        // Validate Password
        if (password.value.length < 8 && password.value.length > 14) {
            isValid = false;
            alert("Password must be 8 to 14 characters long.");
        }

        // Validate Confirm Password
        if (password.value !== confirmPassword.value) {
            isValid = false;
            alert("Passwords do not match.");
        }

        // If the form is invalid, prevent submission
        if (!isValid) {
            event.preventDefault();
        }
    });
});
