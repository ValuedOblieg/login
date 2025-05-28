document.addEventListener('DOMContentLoaded', function() {
    // Preloader logic
    const preloader = document.getElementById('preloader');
    const loginContainer = document.querySelector('.login-container');
    setTimeout(() => {
        if (preloader) {
            preloader.style.opacity = 0;
            setTimeout(() => {
                preloader.style.display = 'none';
                if (loginContainer) loginContainer.style.display = '';
            }, 700);
        } else {
            if (loginContainer) loginContainer.style.display = '';
        }
    }, 1200);

    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            if (!username || !password) {
                showMessage('Please enter both username and password.', true);
                return;
            }
            if (password !== 'ilovekon') {
                showMessage('Incorrect password. Hint: It is related to K-ON!', true);
                return;
            }
            // Show welcoming message and redirect
            showMessage('Welcome, ' + username + '! Redirecting...', false);
            setTimeout(() => {
                window.location.href = 'https://valuedoblieg.github.io/k-on/';
            }, 1500);
        });
    }

    function showMessage(msg, isError) {
        let msgElem = document.getElementById('loginMsg');
        if (!msgElem) {
            msgElem = document.createElement('div');
            msgElem.id = 'loginMsg';
            msgElem.className = 'form-text';
            form.appendChild(msgElem);
        }
        msgElem.textContent = msg;
        msgElem.style.color = isError ? '#ff69b4' : '#7c4dff';
        msgElem.style.opacity = 0;
        msgElem.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            msgElem.style.opacity = 1;
        }, 50);
    }
});
