// Authentication functions using Firebase Auth

let currentUser = null;

// Import Firebase functions (this will work when loaded after Firebase SDKs)
let auth, signInWithEmailAndPassword, signOut, onAuthStateChanged;

// Initialize Firebase Auth when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Wait for Firebase to be available
    const waitForFirebase = () => {
        return new Promise((resolve) => {
            const checkFirebase = () => {
                if (window.auth) {
                    resolve();
                } else {
                    setTimeout(checkFirebase, 100);
                }
            };
            checkFirebase();
        });
    };

    await waitForFirebase();
    
    // Import Firebase Auth functions
    const { signInWithEmailAndPassword: signInFn, signOut: signOutFn, onAuthStateChanged: onAuthFn } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
    
    auth = window.auth;
    signInWithEmailAndPassword = signInFn;
    signOut = signOutFn;
    onAuthStateChanged = onAuthFn;
    
    // Monitor auth state changes
    onAuthStateChanged(auth, (user) => {
        currentUser = user;
        handleAuthStateChange(user);
    });
});

// Handle authentication state changes
function handleAuthStateChange(user) {
    if (user) {
        console.log('Usuário logado:', user.email);
        
        // If on admin page, update user info
        if (window.location.pathname.includes('admin.html')) {
            const userEmailElement = document.getElementById('userEmail');
            if (userEmailElement) {
                userEmailElement.textContent = user.email;
            }
        }
    } else {
        console.log('Usuário deslogado');
        
        // If on admin page and not authenticated, redirect to login
        if (window.location.pathname.includes('admin.html')) {
            window.location.href = 'index.html';
        }
    }
}

// Show login modal
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('show', 'flex');
    }
}

// Hide login modal
function hideLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('show', 'flex');
    }
    
    // Clear form
    const form = document.getElementById('loginForm');
    if (form) {
        form.reset();
    }
    
    // Hide error message
    hideLoginError();
}

// Show login error
function showLoginError(message) {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }
}

// Hide login error
function hideLoginError() {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.classList.add('hidden');
    }
}

// Handle login form submission
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Close modal when clicking outside
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                hideLoginModal();
            }
        });
    }
});

// Handle login
async function handleLogin(e) {
    e.preventDefault();
    hideLoginError();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showLoginError('Por favor, preencha todos os campos.');
        return;
    }
    
    try {
        // Show loading state
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Entrando...';
        submitButton.disabled = true;
        
        // Wait for Firebase to be initialized
        if (!signInWithEmailAndPassword) {
            throw new Error('Firebase não foi inicializado');
        }
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        console.log('Login realizado com sucesso:', user.email);
        
        // Hide modal and redirect to admin
        hideLoginModal();
        window.location.href = 'admin.html';
        
    } catch (error) {
        console.error('Erro no login:', error);
        
        let errorMessage = 'Erro ao fazer login. Tente novamente.';
        
        switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                errorMessage = 'Email ou senha incorretos.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Email inválido.';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Muitas tentativas. Tente novamente mais tarde.';
                break;
            case 'auth/network-request-failed':
                errorMessage = 'Erro de conexão. Verifique sua internet.';
                break;
        }
        
        showLoginError(errorMessage);
    } finally {
        // Reset button state
        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.textContent = 'Entrar';
        submitButton.disabled = false;
    }
}

// Logout function
async function logout() {
    try {
        if (!signOut) {
            throw new Error('Firebase não foi inicializado');
        }
        
        await signOut(auth);
        console.log('Logout realizado com sucesso');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        alert('Erro ao fazer logout. Tente novamente.');
    }
}

// Check if user is authenticated (for admin page)
function requireAuth() {
    if (!currentUser) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Check authentication status
function isAuthenticated() {
    return currentUser !== null;
}

// Get current user
function getCurrentUser() {
    return currentUser;
}