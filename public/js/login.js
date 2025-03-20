document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    form.addEventListener("submit", function (event) {
        let isValid = true;

        // Validate username
        if (usernameInput.value.trim() === "") {
            alert("Username cannot be empty");
            isValid = false;
        }

        // Validate password
        if (passwordInput.value.trim() === "") {
            alert("Password cannot be empty");
            isValid = false;
        }

        // Prevent form submission if invalid
        if (!isValid) {
            event.preventDefault();
        }
    });

    // Add focus effect on inputs
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            input.style.borderColor = "#2575fc";
            input.style.boxShadow = "0 0 5px rgba(37, 117, 252, 0.5)";
        });

        input.addEventListener("blur", () => {
            input.style.borderColor = "#ccc";
            input.style.boxShadow = "none";
        });
    });
});