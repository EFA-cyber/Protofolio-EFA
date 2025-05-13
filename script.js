// DOM Elements
const toggles = document.querySelectorAll('.theme-toggle');
const hamburger = document.querySelector('.hamburger');
const overlayMenu = document.querySelector('.overlay-menu');
const overlayLinks = document.querySelectorAll('.overlay__link');
const contactForm = document.getElementById('contact-form');
const sections = document.querySelectorAll('section');

// Theme Toggle Function
const toggleTheme = () => {
    document.body.classList.toggle('light-mode');
    const isLightMode = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    
    // Update all toggle buttons
    toggles.forEach(toggle => {
        const sunIcon = toggle.querySelector('.fa-sun');
        const moonIcon = toggle.querySelector('.fa-moon');
        
        if (isLightMode) {
            sunIcon.style.opacity = '1';
            sunIcon.style.transform = 'translate(-50%, -50%) rotate(0)';
            moonIcon.style.opacity = '0';
            moonIcon.style.transform = 'translate(-50%, -50%) rotate(-90deg)';
        } else {
            sunIcon.style.opacity = '0';
            sunIcon.style.transform = 'translate(-50%, -50%) rotate(90deg)';
            moonIcon.style.opacity = '1';
            moonIcon.style.transform = 'translate(-50%, -50%) rotate(0)';
        }
    });
};

// Theme Toggle Event Listeners
toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggleTheme();
        // If overlay is open, close it
        if (overlayMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            overlayMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    // Update initial icon states
    toggles.forEach(toggle => {
        const sunIcon = toggle.querySelector('.fa-sun');
        const moonIcon = toggle.querySelector('.fa-moon');
        sunIcon.style.opacity = '1';
        sunIcon.style.transform = 'translate(-50%, -50%) rotate(0)';
        moonIcon.style.opacity = '0';
        moonIcon.style.transform = 'translate(-50%, -50%) rotate(-90deg)';
    });
}

// Hamburger Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    overlayMenu.classList.toggle('active');
    document.body.style.overflow = overlayMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu on link click
overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        overlayMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Typing Animation
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const type = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Initialize typing animation
const titleLogo = document.querySelector('.title__logo');
if (titleLogo) {
    typeWriter(titleLogo, 'E.F.A', 200);
}

// Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const whatsappMessage = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
    const whatsappUrl = `https://wa.me/6281234567890?text=${whatsappMessage}`;
    
    window.open(whatsappUrl, '_blank');
    contactForm.reset();
}); 