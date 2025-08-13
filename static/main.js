// Main JavaScript file for general functionality

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Handle smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Mobile menu toggle (if needed in future)
    setupMobileMenu();
    
    // Initialize other components
    initializeComponents();
});

// Setup mobile menu functionality
function setupMobileMenu() {
    // Add mobile menu button if not exists
    const header = document.querySelector('header nav');
    if (header && !document.getElementById('mobileMenuButton')) {
        const mobileButton = document.createElement('button');
        mobileButton.id = 'mobileMenuButton';
        mobileButton.className = 'md:hidden p-2 text-gray-700 hover:text-blue-600';
        mobileButton.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        `;
        
        // Add mobile menu functionality
        mobileButton.addEventListener('click', toggleMobileMenu);
        
        header.appendChild(mobileButton);
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    const nav = document.querySelector('header nav');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenu) {
        // Create mobile menu
        const menu = document.createElement('div');
        menu.id = 'mobileMenu';
        menu.className = 'hidden md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t';
        menu.innerHTML = `
            <div class="py-2">
                <a href="#inicio" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Início</a>
                <a href="#experiencia" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Experiência</a>
                <a href="#artigos" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Artigos</a>
                <a href="#servicos" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Serviços</a>
                <a href="#contato" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contato</a>
                <button onclick="showLoginModal()" class="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100">Admin</button>
            </div>
        `;
        
        nav.parentElement.appendChild(menu);
    }
    
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Initialize other components
function initializeComponents() {
    // Add scroll-to-top functionality
    addScrollToTop();
    
    // Add loading states
    addLoadingStates();
    
    // Initialize contact form if exists
    initializeContactForm();
}

// Add scroll to top button
function addScrollToTop() {
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.id = 'scrollToTop';
    scrollToTopButton.className = 'fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 pointer-events-none z-40';
    scrollToTopButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    `;
    
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(scrollToTopButton);
    
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.remove('opacity-0', 'pointer-events-none');
            scrollToTopButton.classList.add('opacity-100');
        } else {
            scrollToTopButton.classList.add('opacity-0', 'pointer-events-none');
            scrollToTopButton.classList.remove('opacity-100');
        }
    });
}

// Add loading states to buttons
function addLoadingStates() {
    const buttons = document.querySelectorAll('button[type="submit"]');
    
    buttons.forEach(button => {
        const originalText = button.textContent;
        
        button.addEventListener('click', () => {
            setTimeout(() => {
                if (button.disabled) {
                    button.innerHTML = `
                        <span class="loading"></span>
                        ${button.textContent}
                    `;
                }
            }, 100);
        });
    });
}

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate form submission
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simulate async operation
    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        e.target.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
        type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' :
        type === 'error' ? 'bg-red-100 text-red-800 border border-red-300' :
        'bg-blue-100 text-blue-800 border border-blue-300'
    }`;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('opacity-100');
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('opacity-0');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copiado para a área de transferência!', 'success');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Copiado para a área de transferência!', 'success');
    }
}

// Format phone number for WhatsApp
function formatWhatsApp(phone) {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Add country code if not present
    if (cleaned.length === 11 && !cleaned.startsWith('55')) {
        return '55' + cleaned;
    }
    
    return cleaned;
}

// Open WhatsApp chat
function openWhatsApp(phone, message = '') {
    const formattedPhone = formatWhatsApp(phone);
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${formattedPhone}${message ? '?text=' + encodedMessage : ''}`;
    window.open(url, '_blank');
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate URL format
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Format date to Brazilian format
function formatDateBR(date) {
    return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Debounce function for search/input optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}