document.addEventListener("DOMContentLoaded", () => {
    // 1. Generate discrete background stars
    const generateStars = () => {
        const container = document.getElementById('stars-container');
        if (!container) return;
        
        const count = 100; // number of stars
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            
            // Random properties
            const size = Math.random() * 2 + 0.5; // 0.5px to 2.5px
            const posX = Math.random() * 100; // 0% to 100%
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 4 + 2; // 2s to 6s
            const opacity = Math.random() * 0.5 + 0.1; // 0.1 to 0.6
            
            // Set styles
            star.style.position = 'absolute';
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${posX}%`;
            star.style.top = `${posY}%`;
            star.style.backgroundColor = '#ffffff';
            star.style.borderRadius = '50%';
            star.style.opacity = opacity;
            star.style.animation = `twinkle ${duration}s ease-in-out ${delay}s infinite alternate`;
            
            container.appendChild(star);
        }
    };

    // Inject star animation dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes twinkle {
            0% { opacity: 0.1; transform: scale(0.8); }
            100% { opacity: 0.8; transform: scale(1.2); box-shadow: 0 0 5px rgba(255,255,255,0.5); }
        }
    `;
    document.head.appendChild(style);
    
    generateStars();

    // 2. Scroll Reveal Animations using IntersectionObserver API
    const revealElements = document.querySelectorAll('.fade-in-up, .fade-in-scale');
    
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => observer.observe(el));

    // 3. Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = 'none';
        }
    });
    
    // Smooth scrolling for navigation links
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
                    behavior: "smooth"
                });
            }
        });
    });
});
