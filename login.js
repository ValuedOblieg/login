document.addEventListener('DOMContentLoaded')
    // Preloader logic
   

    // Registration logic using Firebase Auth (fake email)
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
            const fakeEmail = regUsername + '@k-on.com';
            firebase.auth().createUserWithEmailAndPassword(fakeEmail, regPassword)
                .then(() => {
                    showMessage('Registration successful! You can now log in.', false);
                    registerForm.reset();
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        showMessage('Username already exists.', true);
                    } else if (error.code === 'auth/weak-password') {
                        showMessage('Password should be at least 6 characters.', true);
                    } else {
                        showMessage(error.message, true);
                    }
                });
        });
    }

    // Login logic using Firebase Auth (fake email)
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
            const fakeEmail = username + '@k-on.com';
            firebase.auth().signInWithEmailAndPassword(fakeEmail, password)
                .then(() => {
                    showMessage('Welcome, ' + username + ' ! Redirecting...', false);
                    setTimeout(() => {
                        window.location.href = 'https://valuedoblieg.github.io/k-on/'; // Redirect to your main site on GitHub Pages or Firebase Hosting
                    }, 1500);
                })
                .catch(error => {
                    showMessage('Incorrect username or password.', true);
                });
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

