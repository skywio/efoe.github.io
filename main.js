// Fichier JS externe pour séparer les scripts et améliorer la maintenabilité
// Copiez ici tout le contenu du <script> de index.html
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Contact form handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link
    const mailtoLink = `mailto:me@efoesossou.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Thank you for your message! Your email client should open now.');
    
    // Reset form
    this.reset();
});

// Add typing effect to hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    const subtitle = document.querySelector('.hero .subtitle');
    const originalText = subtitle.textContent;
    setTimeout(() => {
        typeWriter(subtitle, originalText, 80);
    }, 1500);
});

// Add floating animation to skill categories
function addFloatingEffect() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach((category, index) => {
        const delay = index * 200;
        setTimeout(() => {
            category.style.animation = `float 6s ease-in-out infinite`;
            category.style.animationDelay = `${index * 0.5}s`;
        }, delay);
    });
}

// Add floating keyframes
const floatingKeyframes = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;

// Inject floating animation
const style = document.createElement('style');
style.textContent = floatingKeyframes;
document.head.appendChild(style);

// Initialize floating effect
setTimeout(addFloatingEffect, 2000);

// Add particle effect to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(100, 255, 218, 0.6);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${3 + Math.random() * 4}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }
}

// Add particle animation keyframes
const particleKeyframes = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
        }
    }
`;

const particleStyle = document.createElement('style');
particleStyle.textContent = particleKeyframes;
document.head.appendChild(particleStyle);

// Initialize particles
createParticles();

// Add progress bars to skills on scroll
function addSkillProgress() {
    const skillItems = document.querySelectorAll('.skill-list li');
    
    skillItems.forEach((item, index) => {
        const progress = document.createElement('div');
        progress.className = 'skill-progress';
        progress.style.cssText = `
            height: 3px;
            background: linear-gradient(90deg, #64ffda, #4fd1c7);
            margin-top: 5px;
            border-radius: 2px;
            width: 0%;
            transition: width 1s ease-in-out;
            transition-delay: ${index * 0.1}s;
        `;
        item.appendChild(progress);
    });
}

// Trigger skill progress animation
const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                const progressBars = document.querySelectorAll('.skill-progress');
                progressBars.forEach((bar, index) => {
                    const randomWidth = 70 + Math.random() * 30; // 70-100%
                    setTimeout(() => {
                        bar.style.width = randomWidth + '%';
                    }, index * 100);
                });
            }, 500);
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Initialize skill progress
addSkillProgress();
skillsObserver.observe(skillsSection);

// Add counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
            }
        }, 20);
    });
}

// Trigger counter animation
const aboutSection = document.getElementById('about');
const aboutObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateCounters, 500);
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

aboutObserver.observe(aboutSection);

// Add timeline animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            item.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        }, index * 200);
    });
}

// Trigger timeline animation
const experienceSection = document.getElementById('experience');
const experienceObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateTimeline, 300);
            experienceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

experienceObserver.observe(experienceSection);

// Add mobile menu toggle
function addMobileMenu() {
    const nav = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        @media (max-width: 768px) {
            display: block;
        }
    `;
    
    nav.appendChild(mobileMenuBtn);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-active');
    });
    
    // Add mobile menu styles
    const mobileMenuStyle = document.createElement('style');
    mobileMenuStyle.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            
            .nav-links {
                position: fixed;
                top: 70px;
                right: -100%;
                width: 100%;
                height: calc(100vh - 70px);
                background: rgba(15, 23, 42, 0.98);
                flex-direction: column;
                justify-content: center;
                align-items: center;
                transition: right 0.3s ease;
                backdrop-filter: blur(10px);
            }
            
            .nav-links.mobile-active {
                right: 0;
            }
            
            .nav-links li {
                margin: 1rem 0;
            }
            
            .nav-links a {
                font-size: 1.2rem;
            }
        }
    `;
    document.head.appendChild(mobileMenuStyle);
}

// Initialize mobile menu
addMobileMenu();

// Add scroll-to-top button
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #64ffda, #4fd1c7);
        color: #0f172a;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(100, 255, 218, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'translateY(0)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'translateY(100px)';
        }
    });
    
    // Scroll to top
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
        this.style.boxShadow = '0 10px 25px rgba(100, 255, 218, 0.4)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 5px 15px rgba(100, 255, 218, 0.3)';
    });
}

// Initialize scroll to top
addScrollToTop();

// Add loading animation
function addLoadingAnimation() {
    // Hide all content initially
    document.body.style.opacity = '0';
    
    // Show content with fade in
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.style.transition = 'opacity 1s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Initialize loading animation
addLoadingAnimation();

// Console message for developers
console.log(`
🚀 Welcome to Efoe Sossou's Portfolio!

Built with:
• Vanilla JavaScript
• Modern CSS3 animations
• Responsive design
• Performance optimizations

Contact: me@efoesossou.com
`);