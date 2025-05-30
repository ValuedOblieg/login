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

    // Load users from localStorage or use default demo users
    let users = JSON.parse(localStorage.getItem('users')) || {
        'yui': 'guitar123',
        'mio': 'bass456',
        'ritsu': 'drum789',
        'mugi': 'keyboard321',
        'azusa': 'azunyan',
        'admin': 'konadmin'
    };

    // Save users to localStorage if not already present
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Registration logic (for demo)
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const regUsername = document.getElementById('reg-username').value.trim();
            const regPassword = document.getElementById('reg-password').value.trim();
            if (!regUsername || !regPassword) {
                showMessage('Please enter both username and password to register.', true);
                return;
            }
            if (users[regUsername]) {
                showMessage('Username already exists.', true);
                return;
            }
            users[regUsername] = regPassword;
            localStorage.setItem('users', JSON.stringify(users));
            showMessage('Registration successful! You can now log in.', false);
            registerForm.reset();
        });
    }

    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            users = JSON.parse(localStorage.getItem('users')) || users;
            if (!username || !password) {
                showMessage('Please enter both username and password.', true);
                return;
            }
            if (!users[username] || users[username] !== password) {
                showMessage('Incorrect username or password.', true);
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

