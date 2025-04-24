document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check if there are any users
    if (users.length === 0) {
        showAlert("Không tìm thấy tài khoản nào. Vui lòng đăng ký trước.", "danger");
        return;
    }
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Store logged in user info
        localStorage.setItem("currentUser", JSON.stringify({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }));
        
        showAlert("Đăng nhập thành công!", "success");
        
        // Redirect to dashboard after 1 second
        setTimeout(() => {
            window.location.href = "../../admin/dashboard.html";
        }, 1000);
    } else {
        showAlert("Email hoặc mật khẩu không đúng", "danger");
    }
});

function showAlert(message, type) {
    const alertBox = document.getElementById("alertBox");
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type} mt-3`;
    alertBox.classList.remove("d-none");
} 