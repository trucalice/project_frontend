// Kiểm tra trạng thái đăng nhập khi trang được tải
window.addEventListener('load', function() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = '../../index.html';
    }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Ẩn các thông báo lỗi
    emailError.style.display = 'none';
    passwordError.style.display = 'none';

    // Kiểm tra và hiển thị thông báo lỗi
    if (!email) {
        emailError.style.display = 'block';
        return;
    }

    if (!password) {
        passwordError.style.display = 'block';
        return;
    }

    // Nếu đã nhập đủ thông tin thì tiếp tục xử lý đăng nhập
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = '../../index.html';
    }
});

function showAlert(message, type) {
    const alertBox = document.getElementById("alertBox");
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type} mt-3`;
    alertBox.classList.remove("d-none");
} 