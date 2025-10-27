// Netflix Analytics - Modern Interactive Website
// Professional animations and interactions

// Play intro sound immediately when page loads
(function() {
    const audio = document.createElement('audio');
    audio.src = 'audio/videoplayback.mp4';
    audio.preload = 'auto';
    document.body.appendChild(audio);
    
    // Try to play immediately
    setTimeout(() => {
        audio.play().catch(() => {});
    }, 100);
})();

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSidebar();
    initScrollAnimations();
    initParallaxEffects();
    initSmoothScrolling();
    initTypingEffect();
    initCounterAnimations();
    initParticleEffect();
    initLoadingAnimation();
    initProgressBar();
    initKeyboardNavigation();
    initPerformanceOptimizations();
    initLogoAnimation();
    initIntroSound();
    initBPMNZoom();
});

// BPMN Image Zoom Functionality
function initBPMNZoom() {
    const bpmnImage = document.getElementById('bpmnImage');
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const resetBtn = document.getElementById('resetZoomBtn');
    
    if (!bpmnImage) return;
    
    let scale = 1;
    let posX = 0;
    let posY = 0;
    const minScale = 0.5;
    const maxScale = 3;
    const scaleStep = 0.25;
    
    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    
    function applyTransform() {
        bpmnImage.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    }
    
    function resetPosition() {
        scale = 1;
        posX = 0;
        posY = 0;
        applyTransform();
    }
    
    // Zoom In
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => {
            if (scale < maxScale) {
                scale += scaleStep;
                applyTransform();
            }
        });
    }
    
    // Zoom Out
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => {
            if (scale > minScale) {
                scale -= scaleStep;
                // Auto center when zooming out too much
                if (scale <= 1) {
                    posX = 0;
                    posY = 0;
                }
                applyTransform();
            }
        });
    }
    
    // Reset
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            resetPosition();
        });
    }
    
    // Drag functionality
    bpmnImage.addEventListener('mousedown', (e) => {
        if (scale > 1) {
            isDragging = true;
            currentX = e.clientX - posX;
            currentY = e.clientY - posY;
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging && scale > 1) {
            e.preventDefault();
            posX = e.clientX - currentX;
            posY = e.clientY - currentY;
            applyTransform();
        }
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    // Prevent context menu on right click (optional)
    bpmnImage.addEventListener('contextmenu', (e) => {
        if (scale > 1) {
            e.preventDefault();
        }
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    
    bpmnImage.addEventListener('touchstart', (e) => {
        if (scale > 1 && e.touches.length === 1) {
            isDragging = true;
            touchStartX = e.touches[0].clientX - posX;
            touchStartY = e.touches[0].clientY - posY;
        }
    });
    
    bpmnImage.addEventListener('touchmove', (e) => {
        if (isDragging && scale > 1 && e.touches.length === 1) {
            e.preventDefault();
            posX = e.touches[0].clientX - touchStartX;
            posY = e.touches[0].clientY - touchStartY;
            applyTransform();
        }
    });
    
    bpmnImage.addEventListener('touchend', () => {
        isDragging = false;
    });
}

// Sidebar functionality
function initSidebar() {
    const menuLinks = document.querySelectorAll('.menu-link');
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    
    // Mobile toggle functionality
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });

        // Close sidebar when clicking on a menu link (mobile only)
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 992) {
                    sidebar.classList.remove('open');
                }
            });
        });
    }
    
    // Active link highlighting on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for menu links
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active state
                menuLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Logo animation
function initLogoAnimation() {
    const logo = document.querySelector('.netflix-logo');
    if (logo) {
        // Logo yüklendiğinde animasyon başlat
        logo.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transform = 'scale(0.8) translateY(-20px)';
            
            setTimeout(() => {
                this.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                this.style.opacity = '1';
                this.style.transform = 'scale(1) translateY(0)';
            }, 200);
        });
        
        // Logo zaten yüklüyse animasyonu hemen başlat
        if (logo.complete) {
            logo.style.opacity = '0';
            logo.style.transform = 'scale(0.8) translateY(-20px)';
            
            setTimeout(() => {
                logo.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                logo.style.opacity = '1';
                logo.style.transform = 'scale(1) translateY(0)';
            }, 200);
        }
    }
}

// Scroll animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different elements
                if (entry.target.classList.contains('analysis-card')) {
                    animateCard(entry.target);
                } else if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                } else if (entry.target.classList.contains('insight-card')) {
                    animateInsightCard(entry.target);
                } else if (entry.target.classList.contains('team-member')) {
                    animateTeamMember(entry.target);
                } else if (entry.target.classList.contains('rice-row')) {
                    animateRiceRow(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.analysis-card, .timeline-item, .insight-card, .team-member, .section-header, .vision-card, .mission-card, .why-content, .goal-item, .swot-card, .tows-matrix, .moscow-category, .rice-card, .explanation-card, .sipoc-table tbody tr');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Card animation
function animateCard(card) {
    const delay = Array.from(card.parentNode.children).indexOf(card) * 200;
    setTimeout(() => {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
    }, delay);
}

// Timeline item animation
function animateTimelineItem(item) {
    const delay = Array.from(item.parentNode.children).indexOf(item) * 300;
    setTimeout(() => {
        item.style.transform = 'translateX(0)';
        item.style.opacity = '1';
    }, delay);
}

// Insight card animation
function animateInsightCard(card) {
    const delay = Array.from(card.parentNode.children).indexOf(card) * 250;
    setTimeout(() => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.opacity = '1';
    }, delay);
}

// Team member animation
function animateTeamMember(member) {
    const delay = Array.from(member.parentNode.children).indexOf(member) * 300;
    setTimeout(() => {
        member.style.transform = 'translateY(0) scale(1)';
        member.style.opacity = '1';
    }, delay);
}

// RICE row animation
function animateRiceRow(row) {
    const delay = Array.from(row.parentNode.children).indexOf(row) * 100;
    setTimeout(() => {
        row.style.transform = 'scale(1)';
        row.style.opacity = '1';
    }, delay);
}

// Parallax effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Smooth scrolling for internal links
function initSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero button click handlers
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    heroButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if (index === 0) {
                // Primary button - scroll to analysis section
                const analysisSection = document.querySelector('#analysis');
                if (analysisSection) {
                    analysisSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Secondary button - scroll down
                window.scrollBy({ 
                    top: window.innerHeight, 
                    behavior: 'smooth' 
                });
            }
        });
    });

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--netflix-red);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(229, 9, 20, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';
        
        setTimeout(() => {
            typeText(line, text, 50);
        }, index * 800 + 1000); // Logo animasyonundan sonra başla
    });
}

function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Counter animations for numbers
function initCounterAnimations() {
    const counters = document.querySelectorAll('.insight-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toString().padStart(2, '0');
    }, 16);
}

// Particle effect for hero background
function initParticleEffect() {
    const hero = document.querySelector('.hero');
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    hero.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: var(--netflix-red);
        border-radius: 50%;
        opacity: 0.6;
        animation: float ${Math.random() * 10 + 10}s infinite linear;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    
    container.appendChild(particle);
}

// Loading animation
function initLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="netflix-logo">
                <i class="fab fa-netflix"></i>
            </div>
            <div class="loading-text">Netflix Analiz</div>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--netflix-black);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(loader);

    // Hide loader after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// Add CSS for animations
const animationStyles = `
    .analysis-card {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease;
    }
    
    .analysis-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .timeline-item {
        opacity: 0;
        transform: translateX(-50px);
        transition: all 0.6s ease;
    }
    
    .timeline-item.animate-in {
        opacity: 1;
        transform: translateX(0);
    }
    
    .insight-card {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
        transition: all 0.6s ease;
    }
    
    .insight-card.animate-in {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    
    .section-header {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .section-header.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .team-member {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
        transition: all 0.6s ease;
    }
    
    .team-member.animate-in {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    
    .rice-row {
        opacity: 0;
        transform: scale(0.95);
        transition: all 0.4s ease;
    }
    
    .rice-row.animate-in {
        opacity: 1;
        transform: scale(1);
    }
    
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .loader-content {
        text-align: center;
        color: var(--netflix-white);
    }
    
    .netflix-logo {
        font-size: 4rem;
        color: var(--netflix-red);
        margin-bottom: 1rem;
        animation: pulse 2s infinite;
    }
    
    .loading-text {
        font-size: 1.5rem;
        font-weight: var(--font-weight-bold);
        margin-bottom: 2rem;
    }
    
    .loading-bar {
        width: 200px;
        height: 4px;
        background: var(--netflix-gray);
        border-radius: 2px;
        overflow: hidden;
    }
    
    .loading-progress {
        height: 100%;
        background: linear-gradient(45deg, var(--netflix-red), var(--accent-orange));
        border-radius: 2px;
        animation: loading 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
    
    @keyframes loading {
        0% {
            width: 0%;
        }
        100% {
            width: 100%;
        }
    }
    
    .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(229, 9, 20, 0.4);
    }
    
    .nav-link.active {
        color: var(--netflix-red);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    body.menu-open {
        overflow: hidden;
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Utility functions
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

// Performance optimization
const debouncedScrollHandler = debounce(function() {
    // Handle scroll events here if needed
}, 16);

window.addEventListener('scroll', debouncedScrollHandler);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Console welcome message
console.log(`
🎬 Netflix Analytics Website
🚀 Modern, Professional Design
✨ Smooth Animations & Interactions
📱 Fully Responsive
🎨 Netflix Brand Colors
`);

// Progress bar for page loading
function initProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(45deg, var(--netflix-red), var(--accent-orange));
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Theme toggle functionality (for future use)
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        width: 50px;
        height: 50px;
        background: var(--netflix-gray);
        border: none;
        border-radius: 50%;
        color: var(--netflix-text-light);
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-md);
    `;
    
    document.body.appendChild(themeToggle);

    themeToggle.addEventListener('click', function() {
        // Future theme toggle functionality
        console.log('Theme toggle clicked - feature coming soon!');
    });
}

// Keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Arrow keys for navigation (optional)
        if (e.key === 'ArrowDown' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            const sections = document.querySelectorAll('section');
            const currentSection = getCurrentSection();
            const nextSection = sections[Array.from(sections).indexOf(currentSection) + 1];
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Arrow up for previous section
        if (e.key === 'ArrowUp' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            const sections = document.querySelectorAll('section');
            const currentSection = getCurrentSection();
            const prevSection = sections[Array.from(sections).indexOf(currentSection) - 1];
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    let current = sections[0];
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section;
        }
    });
    
    return current;
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy loading for images (if any are added later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });

    // Service Worker registration (for future PWA features)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // navigator.serviceWorker.register('/sw.js')
            //     .then(registration => console.log('SW registered'))
            //     .catch(error => console.log('SW registration failed'));
        });
    }
}

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    // Google Analytics or other tracking implementation
    console.log('Event tracked:', eventName, eventData);
    
    // Example: track button clicks
    if (eventName === 'button_click') {
        // Send to analytics service
    }
}

    // Add click tracking to buttons
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn')) {
            trackEvent('button_click', {
                button_text: e.target.textContent.trim(),
                button_class: e.target.className
            });
        }
    });

// Error boundary for JavaScript errors
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno
    });
});

// Initialize intro sound
function initIntroSound() {
    const introAudio = document.getElementById('introAudio');
    
    // Play sound immediately when page starts loading
    if (introAudio) {
        // Try to play immediately
        introAudio.play().catch(e => {
            console.log('Ses çalınamadı:', e);
        });
        
        // Also try when page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                introAudio.play().catch(e => {
                    console.log('Ses çalınamadı:', e);
                });
            }, 100);
        });
    }
    
    // Play sound when user first interacts (fallback)
    let hasPlayed = false;
    document.addEventListener('click', () => {
        if (!hasPlayed && introAudio) {
            introAudio.play().catch(e => {
                console.log('Ses çalınamadı:', e);
            });
            hasPlayed = true;
        }
    }, { once: true });
}

// Process Modal Functions
function openProcessModal() {
    const modal = document.getElementById('processModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeProcessModal() {
    const modal = document.getElementById('processModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProcessModal();
    }
});

// Export functions for potential external use
window.NetflixAnalytics = {
    initScrollAnimations,
    initParallaxEffects,
    initSmoothScrolling,
    initTypingEffect,
    initCounterAnimations,
    initParticleEffect,
    initLoadingAnimation,
    initProgressBar,
    initThemeToggle,
    initKeyboardNavigation,
    initPerformanceOptimizations,
    initLogoAnimation,
    initSidebar,
    initIntroSound,
    trackEvent,
    openProcessModal,
    closeProcessModal
};
