document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset all error messages and invalid states
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(error => error.style.display = 'none');
            
            const inputs = registerForm.querySelectorAll('input');
            inputs.forEach(input => input.classList.remove('is-invalid'));
            
            // Get form fields
            const firstName = document.getElementById('firstName');
            const lastName = document.getElementById('lastName');
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            
            let isValid = true;
            
            // Validate First Name
            if (!firstName.value.trim()) {
                document.getElementById('firstNameError').style.display = 'block';
                firstName.classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate Last Name
            if (!lastName.value.trim()) {
                document.getElementById('lastNameError').style.display = 'block';
                lastName.classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate Email
            if (!email.value.trim()) {
                document.getElementById('emailError').style.display = 'block';
                email.classList.add('is-invalid');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                document.getElementById('emailError').style.display = 'block';
                email.classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate Password
            if (!password.value.trim()) {
                document.getElementById('passwordError').style.display = 'block';
                password.classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate Confirm Password
            if (!confirmPassword.value.trim()) {
                document.getElementById('confirmPasswordError').style.display = 'block';
                confirmPassword.classList.add('is-invalid');
                isValid = false;
            } else if (password.value !== confirmPassword.value) {
                document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
                document.getElementById('confirmPasswordError').style.display = 'block';
                confirmPassword.classList.add('is-invalid');
                isValid = false;
            }
            
            if (isValid) {
                // Get existing users from localStorage
                const users = JSON.parse(localStorage.getItem("users")) || [];
                
                // Check if email already exists
                if (users.some(user => user.email === email.value)) {
                    document.getElementById('emailError').textContent = 'Email đã được sử dụng';
                    document.getElementById('emailError').style.display = 'block';
                    email.classList.add('is-invalid');
                    return;
                }
                
                // Create new user object
                const newUser = {
                    id: Date.now(),
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    password: password.value
                };
                
                // Add new user to users array
                users.push(newUser);
                
                // Save to localStorage
                localStorage.setItem("users", JSON.stringify(users));
                
                showAlert("Đăng ký thành công!", "success");
                
                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            }
        });
        
        // Add input event listeners to hide error messages when user starts typing
        const inputs = registerForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const errorId = this.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.style.display = 'none';
                    this.classList.remove('is-invalid');
                }
            });
        });
    }
});

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
  
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
  
function showAlert(message, type) {
    const alertBox = document.getElementById("alertBox");
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type} mt-3`;
    alertBox.classList.remove("d-none");
}
  