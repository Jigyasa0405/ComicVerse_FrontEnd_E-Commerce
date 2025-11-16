// auth.js - Authentication Helper
// Add this script to all pages that need authentication

// Get current user session
function getCurrentUser() {
    const session = localStorage.getItem('comicverse_session') || 
                   sessionStorage.getItem('comicverse_session');
    
    if (session) {
        try {
            return JSON.parse(session);
        } catch (e) {
            return null;
        }
    }
    return null;
}

// Check if user is logged in
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Logout function
function logout() {
    localStorage.removeItem('comicverse_session');
    sessionStorage.removeItem('comicverse_session');
    window.location.href = 'auth.html';
}

// Require authentication (redirect to login if not logged in)
function requireAuth() {
    if (!isLoggedIn()) {
        const currentPage = window.location.pathname.split('/').pop();
        window.location.href = `auth.html?return=${currentPage}`;
        return false;
    }
    return true;
}

// Update navigation to show user info
function updateNavWithUser() {
    const user = getCurrentUser();
    const navLinks = document.querySelector('.nav-links');
    
    if (!navLinks) return;
    
    // Find or create user section
    let userSection = document.getElementById('userSection');
    
    if (user) {
        // User is logged in
        if (!userSection) {
            userSection = document.createElement('li');
            userSection.id = 'userSection';
            userSection.style.cssText = 'display: flex; align-items: center; gap: 1rem; padding-left: 1rem; border-left: 2px solid rgba(255, 255, 255, 0.2);';
            navLinks.appendChild(userSection);
        }
        
        userSection.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="display: flex; flex-direction: column; align-items: flex-end;">
                    <span style="color: var(--text); font-weight: 600; font-size: 0.9rem;">${user.name}</span>
                    <span style="color: var(--text-dim); font-size: 0.75rem;">${user.email}</span>
                </div>
                <button onclick="logout()" style="
                    background: var(--primary);
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s;
                " onmouseover="this.style.background='#c20813'" onmouseout="this.style.background='var(--primary)'">
                    Logout
                </button>
            </div>
        `;
    } else {
        // User not logged in
        if (!userSection) {
            userSection = document.createElement('li');
            userSection.id = 'userSection';
            navLinks.appendChild(userSection);
        }
        
        userSection.innerHTML = `
            <a href="auth.html" style="
                background: var(--primary);
                color: white;
                padding: 0.7rem 1.5rem;
                border-radius: 5px;
                text-decoration: none;
                font-weight: 600;
                transition: all 0.3s;
            " onmouseover="this.style.background='#c20813'" onmouseout="this.style.background='var(--primary)'">
                Login / Sign Up
            </a>
        `;
    }
}

// Initialize authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    updateNavWithUser();
    
    // REMOVED: Auth check for cart page
    // Cart is now accessible to everyone
    // Authentication is only required at checkout
});

// Export functions for use in other scripts
window.comicverseAuth = {
    getCurrentUser,
    isLoggedIn,
    logout,
    requireAuth,
    updateNavWithUser
};
