document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting
    updateActiveLink();
    window.addEventListener('scroll', updateActiveLink);

    // Form submission handler
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // CTA button click handler
    const ctaButtons = document.querySelectorAll('.cta-btn, .cta-btn-large');
    ctaButtons.forEach(button => {
        button.addEventListener('click', handleCTAClick);
    });
});

function updateActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function handleCTAClick(e) {
    const button = e.target;
    const text = button.textContent;
    
    if (text.includes('Join') || text.includes('Member')) {
        window.location.href = 'contact.html#membership';
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    if (validateForm(data)) {
        showSuccessMessage();
        e.target.reset();
        
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    } else {
        showErrorMessage('Please fill in all required fields correctly.');
    }
}

function validateForm(data) {
    if (!data.name || !data.email || !data.subject || !data.message) {
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    return true;
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.textContent = '✓ Message sent successfully! Thank you for contacting us.';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #95E1D3;
        color: #2C3E50;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        font-weight: bold;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function showErrorMessage(text) {
    const message = document.createElement('div');
    message.textContent = '✗ ' + text;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #FF8C42;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        font-weight: bold;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);