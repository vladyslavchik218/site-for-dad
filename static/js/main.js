// Main JavaScript for Father's Day Website

// Confetti Effect
function triggerConfetti(event) {
    const rect = event.target.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
        particleCount: 150,
        spread: 70,
        origin: { x: x, y: y },
        colors: ['#f472b6', '#a855f7', '#fbbf24', '#ec4899', '#9333ea'],
        disableForReducedMotion: true,
        zIndex: 9999
    });

    // Additional burst effect
    setTimeout(() => {
        confetti({
            particleCount: 100,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#f472b6', '#a855f7', '#fbbf24']
        });
        confetti({
            particleCount: 100,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#f472b6', '#a855f7', '#fbbf24']
        });
    }, 250);
}

// Typing Effect for Message
const messageText = "Тат, за 14 років тільки зараз прийшло те, шо ти маєш набагато більше чим інші чоловіки у 40 років, а саме щасливу сім'ю, власний будинок, машину та мене, чому я себе виділив? Бо мама завжди казала класти себе на перше місце!";

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    // Add cursor
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    element.appendChild(cursor);
    
    function type() {
        if (i < text.length) {
            cursor.before(text.charAt(i));
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                cursor.remove();
            }, 2000);
        }
    }
    
    type();
}

// Reveal Message Button
document.getElementById('revealMessage').addEventListener('click', function() {
    const messageContent = document.getElementById('messageContent');
    const typingText = document.getElementById('typingText');
    
    // Hide button
    this.style.display = 'none';
    
    // Show message content
    messageContent.classList.remove('hidden');
    messageContent.classList.add('fade-in-up');
    
    // Trigger confetti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#a855f7', '#fbbf24', '#ec4899', '#9333ea']
    });
    
    // Start typing effect
    setTimeout(() => {
        typeWriter(typingText, messageText, 40);
    }, 500);
});

// Flip Card Interaction
document.querySelectorAll('.memory-card').forEach(card => {
    const cardInner = card.querySelector('.card-inner');
    
    card.addEventListener('click', function() {
        cardInner.classList.toggle('flipped');
        
        // Trigger small confetti on flip
        if (cardInner.classList.contains('flipped')) {
            const rect = card.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;
            
            confetti({
                particleCount: 30,
                spread: 50,
                origin: { x: x, y: y },
                colors: ['#f472b6', '#a855f7', '#fbbf24']
            });
        }
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero-section');
    const scrolled = window.pageYOffset;
    
    if (heroSection && scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Add hover effect to cards
document.querySelectorAll('.memory-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Random confetti on page load
window.addEventListener('load', function() {
    setTimeout(() => {
        confetti({
            particleCount: 50,
            spread: 100,
            origin: { y: 0.8 },
            colors: ['#f472b6', '#a855f7', '#fbbf24'],
            disableForReducedMotion: true
        });
    }, 1000);
});

// Add keyboard accessibility for flip cards
document.querySelectorAll('.memory-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Натисни, щоб переглянути спогад');
    
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// Intersection Observer for additional animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.memory-card').forEach(card => {
    observer.observe(card);
});

// Prevent text selection on interactive elements
document.querySelectorAll('.memory-card, button').forEach(element => {
    element.style.userSelect = 'none';
    element.style.webkitUserSelect = 'none';
});

// Add touch support for mobile devices
document.querySelectorAll('.memory-card').forEach(card => {
    let touchStartX = 0;
    let touchEndX = 0;
    
    card.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    card.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe(card, touchStartX, touchEndX);
    });
});

function handleSwipe(card, start, end) {
    const swipeThreshold = 50;
    const diff = start - end;
    
    if (Math.abs(diff) > swipeThreshold) {
        const cardInner = card.querySelector('.card-inner');
        cardInner.classList.toggle('flipped');
        
        if (cardInner.classList.contains('flipped')) {
            const rect = card.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;
            
            confetti({
                particleCount: 30,
                spread: 50,
                origin: { x: x, y: y },
                colors: ['#f472b6', '#a855f7', '#fbbf24']
            });
        }
    }
}
