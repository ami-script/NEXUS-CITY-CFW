// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    addSmoothScrolling();
    addScrollEffects();
    createFloatingParticles();
    addTypingEffect();
});

// Initialize Website
function initializeWebsite() {
    console.log('🎮 NEXUS CITY CFW Website Loaded');
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
}

// Toggle Rule Categories
function toggleRule(ruleId) {
    const ruleCategory = document.querySelector(`#${ruleId}`).parentElement;
    const allCategories = document.querySelectorAll('.rule-category');
    
    allCategories.forEach(category => {
        if (category !== ruleCategory) {
            category.classList.remove('active');
        }
    });
    
    ruleCategory.classList.toggle('active');
    playClickSound();
    
    if (window.innerWidth <= 768 && ruleCategory.classList.contains('active')) {
        setTimeout(() => {
            ruleCategory.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }
}

// Play Click Sound Effect
function playClickSound() {
    const audio = new Audio('sounds/click.mp3'); // تأكد من وجود الملف في مجلد المشروع
    audio.volume = 0.3; // تخفيض الصوت إذا كان مرتفعًا
    audio.play().catch(e => console.error('لا يمكن تشغيل الصوت:', e));
}

// دالة تشغيل صوت الديسكورد
function playDiscordSound() {
    const audio = new Audio('sounds/discord-sound.mp3');
    audio.volume = 0.3; // تخفيض الصوت إذا كان مرتفعًا (اختياري)
    audio.play().catch(e => console.error('تعذر تشغيل الصوت:', e));
}

// تعديل زر الديسكورد لإضافة الصوت
document.querySelector('.discord-btn').addEventListener('click', function(e) {
    playDiscordSound();
});


// Add Smooth Scrolling
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// Add Scroll Effects
function addScrollEffects() {
    const header = document.querySelector('.header');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        // Header opacity effect
        header.style.background = `rgba(0, 0, 0, ${0.7 + Math.min(scrollTop / 100, 0.3)})`;
        
        // Hero parallax effect
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollTop * -0.5}px)`;
        }
    });
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.rule-category').forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(category);
    });
}

// Create Floating Particles Effect
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(139, 92, 246, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${startX}px;
        top: 100vh;
        animation: floatUp ${duration}s ${delay}s infinite linear;
        box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
    `;
    
    container.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, (duration + delay) * 1000);
}

// Add Typing Effect to Hero Subtitle
function addTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid #8b5cf6';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setInterval(() => {
                subtitle.style.borderRight = subtitle.style.borderRight === 'none' 
                    ? '2px solid #8b5cf6' 
                    : 'none';
            }, 500);
        }
    }
    setTimeout(typeWriter, 1000);
}

// Auto-hide header on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// إنشاء جسيمات موسيقية
function createMusicParticles() {
    const container = document.createElement('div');
    container.className = 'music-particles';
    document.body.appendChild(container);

    // تحليل الصوت (إذا يوجد)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const particles = [];

    // إنشاء 50 جسيماً
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'music-particle';
        container.appendChild(particle);
        particles.push({
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 10 + 5,
            speed: Math.random() * 2 + 1
        });
    }

    // تحريك الجسيمات مع الموسيقى
    function updateParticles() {
        particles.forEach(particle => {
            particle.y -= particle.speed;
            if (particle.y < 0) {
                particle.y = window.innerHeight;
                particle.x = Math.random() * window.innerWidth;
            }
            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
        });
        requestAnimationFrame(updateParticles);
    }
    updateParticles();
}

function createRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}



// تطبيق التأثير على جميع الأزرار
document.querySelectorAll('button, .discord-btn, .rule-header').forEach(btn => {
    btn.addEventListener('click', createRippleEffect);
});


// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', addFloatingText);



// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', createMusicParticles);

// Console Easter Egg
console.log(`%c
    ███╗   ██╗███████╗██╗  ██╗██╗   ██╗███████╗
    ████╗  ██║██╔════╝╚██╗██╔╝██║   ██║██╔════╝
    ██╔██╗ ██║█████╗   ╚███╔╝ ██║   ██║███████╗
    ██║╚██╗██║██╔══╝   ██╔██╗ ██║   ██║╚════██║
    ██║ ╚████║███████╗██╔╝ ██╗╚██████╔╝███████║
    ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
    
    🎮 NEXUS CITY CFW - أقوى سرفر FiveM
    💀 مرحباً بك في عالم الإثارة والتشويق
    🔥 انضم إلى Discord: https://discord.gg/7NsEv27jcy
`, 'color: #8b5cf6; font-family: monospace;');