document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
  
    const alertBox = document.getElementById("alertBox");
  
    // Basic Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        showAlert("Vui lòng điền đầy đủ thông tin", "danger");
        return;
    }
  
    if (password !== confirmPassword) {
        showAlert("Mật khẩu xác nhận không khớp", "danger");
        return;
    }
  
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
        showAlert("Email đã được sử dụng", "danger");
        return;
    }
  
    // Create new user object
    const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        password
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
});
  
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
  