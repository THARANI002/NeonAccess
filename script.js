// Neon cursor effect
const neonCursor = document.getElementById('neon-cursor');
const cursorDot = document.getElementById('cursor-dot');

document.addEventListener('mousemove', function(e) {
    neonCursor.style.left = e.clientX + 'px';
    neonCursor.style.top = e.clientY + 'px';
    
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

// Make cursor change on interactive elements
document.querySelectorAll('button, input, a, .toggle-password').forEach(element => {
    element.addEventListener('mouseenter', () => {
        neonCursor.style.width = '30px';
        neonCursor.style.height = '30px';
        neonCursor.style.borderColor = '#0ff';
        neonCursor.style.boxShadow = '0 0 15px #0ff, 0 0 30px #0ff';
    });
    
    element.addEventListener('mouseleave', () => {
        neonCursor.style.width = '20px';
        neonCursor.style.height = '20px';
        neonCursor.style.borderColor = '#0af';
        neonCursor.style.boxShadow = '0 0 10px #0af, 0 0 20px #0af';
    });
});

// Password visibility toggle
document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const passwordField = this.previousElementSibling;
        
        // Toggle password visibility
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            this.innerHTML = '<i class="eye-icon">👁️</i>';
        } else {
            passwordField.type = 'password';
            this.innerHTML = '<i class="eye-icon">👁️‍🗨️</i>';
        }
    });
});

// Lightning animation
function createLightning() {
    const container = document.getElementById('lightning-container');
    container.innerHTML = '';
    
    const boltCount = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < boltCount; i++) {
        setTimeout(() => {
            const bolt = document.createElement('div');
            bolt.className = 'lightning-bolt';
            
            const startX = Math.random() * window.innerWidth;
            const width = Math.random() * 3 + 1;
            const height = Math.random() * (window.innerHeight - 100) + 100;
            const rotation = Math.random() * 20 - 10;
            
            bolt.style.left = `${startX}px`;
            bolt.style.top = '0';
            bolt.style.width = `${width}px`;
            bolt.style.height = `${height}px`;
            bolt.style.transform = `rotate(${rotation}deg)`;
            
            container.appendChild(bolt);
            
            setTimeout(() => {
                bolt.remove();
            }, 5000);
        }, i * 200);
    }
}

// Start lightning animation
function startLightningAnimation() {
    createLightning();
    setTimeout(startLightningAnimation, Math.random() * 5000 + 5000);
}

startLightningAnimation();

// Switch between login and register forms
document.getElementById('showRegister').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', function() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

// Store user data (in a real app, this would be server-side)
let users = [];

// Registration form validation and submission
document.getElementById('registration').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    let isValid = true;
    
    // Reset errors
    document.getElementById('usernameError').style.display = 'none';
    document.getElementById('emailError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';
    document.getElementById('confirmError').style.display = 'none';
    
    // Username validation
    if (username.trim() === '' || username.length < 3) {
        document.getElementById('usernameError').style.display = 'block';
        isValid = false;
    }
    
    // Email validation (must contain @)
    if (!email.includes('@')) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    
    // Password validation (8+ chars with symbol)
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (password.length < 8 || !hasSymbol) {
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }
    
    // Confirm password
    if (password !== confirmPassword) {
        document.getElementById('confirmError').style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        // Store new user
        users.push({ username, email, password });
        
        // Clear form
        document.getElementById('registration').reset();
        
        // Reset password fields to password type
        document.getElementById('password').type = 'password';
        document.getElementById('confirmPassword').type = 'password';
        document.querySelectorAll('.toggle-password').forEach(toggle => {
            toggle.innerHTML = '<i class="eye-icon">👁️‍🗨️</i>';
        });
        
        // Switch to login form
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
        
        // Pre-fill login email
        document.getElementById('loginEmail').value = email;
        
        // Success message with username
        alert(`Registration successful, ${username}! You can now login with your credentials.`);
    }
});

// Login form validation and submission
document.getElementById('login').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    let isValid = true;
    
    // Reset errors
    document.getElementById('loginEmailError').style.display = 'none';
    document.getElementById('loginPasswordError').style.display = 'none';
    
    // Email validation
    if (!email.includes('@')) {
        document.getElementById('loginEmailError').style.display = 'block';
        isValid = false;
    }
    
    // Password validation
    if (!password) {
        document.getElementById('loginPasswordError').style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        // Check if user exists
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            alert(`Login successful! Welcome back, ${user.username}!`);
            // Reset password field to password type
            document.getElementById('loginPassword').type = 'password';
            document.querySelector('#loginForm .toggle-password').innerHTML = '<i class="eye-icon">👁️‍🗨️</i>';
            // In a real app, redirect to dashboard/home page
        } else {
            alert('Invalid email or password. If you are a new user, please register first.');
        }
    }
});

