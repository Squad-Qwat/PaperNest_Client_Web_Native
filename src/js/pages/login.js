document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            if (!email) {
                alert('Email harus diisi!');
                return;
            }

            if (!password) {
                alert('Password harus diisi!');
                return;
            }

            // Cari user berdasarkan email dan password
            const users = GLOBAL_OBJECT.globalUsersData;
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                GLOBAL_OBJECT.setCurrentUser(user.id);

                user.lastLogin = 'baru saja';

                console.log('Login successful:', user);
                alert(`Selamat datang, ${user.firstName} ${user.lastName}!`);

                window.location.href = './dashboard/index.html';
            } else {
                alert('Email atau password salah!\n\nSilakan coba lagi atau daftar akun baru.');
                
                document.getElementById('password').value = '';
            }
        });
    }

    // Handle social login buttons (placeholder)
    const googleBtn = document.querySelector('.social-button button:first-child');
    const githubBtn = document.querySelector('.social-button button:last-child');

    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            alert('Login dengan Google belum tersedia.\n\nSilakan gunakan email dan password.');
        });
    }

    if (githubBtn) {
        githubBtn.addEventListener('click', function() {
            alert('Login dengan GitHub belum tersedia.\n\nSilakan gunakan email dan password.');
        });
    }
});
