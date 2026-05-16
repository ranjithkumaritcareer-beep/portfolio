// =========================================
// PRELOADER
// =========================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // Start Hero Animations after loader
            initHeroAnimations();
        }, 500);
    }, 2000); // 2 seconds minimum loading screen
});

// =========================================
// CUSTOM CURSOR
// =========================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Slight delay for outline
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effect on clickable elements
    const clickables = document.querySelectorAll('a, button, .exp-card, .skill-category, .social-icon-btn, input, textarea');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(255, 140, 0, 0.1)';
            cursorOutline.style.borderColor = 'rgba(255, 215, 0, 0.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorOutline.style.borderColor = 'var(--secondary-color)';
        });
    });
}

// =========================================
// NAVBAR COMPONENT
// =========================================
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

// Sticky Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
});

// Close Mobile Menu on Link Click
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
        }
    });
});

// Active Link Highlighting
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href') === `#${current}`) {
            li.classList.add('active');
        }
    });
});

// =========================================
// TYPEWRITER EFFECT
// =========================================
const typeWriterElement = document.getElementById('typewriter');
const words = [
    "CSE Student", 
    "Python Developer", 
    "Content Creator", 
    "Future Tech Innovator"
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typeWriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeWriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before new word
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typing effect immediately
typeWriter();

// =========================================
// GSAP ANIMATIONS
// =========================================
gsap.registerPlugin(ScrollTrigger);

function initHeroAnimations() {
    const tl = gsap.timeline();
    
    tl.from('.hero-content', {
        z: -200,
        rotationX: -30,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
    })
    .from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=1")
    .from('.avatar-wrapper', {
        scale: 0.5,
        rotationY: 180,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)"
    }, "-=1");
}

// Reveal Animations on Scroll
const revealElements = document.querySelectorAll('.gs-reveal');

revealElements.forEach(element => {
    let direction = { y: 50, x: 0 };
    
    if (element.classList.contains('gs-left')) direction = { x: -50, y: 0 };
    if (element.classList.contains('gs-right')) direction = { x: 50, y: 0 };
    
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        ...direction,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});

// Staggered lists (Skills, Achievements)
gsap.from('.skill-category', {
    scrollTrigger: {
        trigger: '.skills-categories',
        start: "top 80%"
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
});

gsap.from('.achievement-item', {
    scrollTrigger: {
        trigger: '.achievements-list',
        start: "top 80%"
    },
    x: -30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: "power2.out"
});

// Animate Progress Bars
const progressBars = document.querySelectorAll('.progress-line span');

progressBars.forEach(bar => {
    gsap.to(bar, {
        scrollTrigger: {
            trigger: '.skills-progress',
            start: "top 80%"
        },
        width: bar.getAttribute('data-width'),
        duration: 1.5,
        ease: "power3.out"
    });
});

// =========================================
// COUNTERS ANIMATION
// =========================================
const counters = document.querySelectorAll('.counter');
let countersAnimated = false;

window.addEventListener('scroll', () => {
    const statsContainer = document.querySelector('.stats-container');
    if (!statsContainer) return;
    
    const containerTop = statsContainer.offsetTop;
    
    if (scrollY > containerTop - window.innerHeight && !countersAnimated) {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCounter();
        });
        countersAnimated = true;
    }
});

// =========================================
// BACK TO TOP BUTTON
// =========================================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =========================================
// CONTACT FORM - MAILTO LOGIC
// =========================================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('span');

        const name    = document.getElementById('name').value.trim();
        const email   = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            formStatus.innerText = 'Please fill in all fields!';
            formStatus.style.color = '#ff8c00';
            return;
        }

        // Build mailto link and open email client
        const mailtoBody = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
        const mailtoLink = `mailto:ranjith.kumar.itcareer@mail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

        btnText.innerText = 'Opening Email...';
        submitBtn.disabled = true;

        window.location.href = mailtoLink;

        setTimeout(() => {
            formStatus.innerText = '✅ Your email app is opening! Complete the send there.';
            formStatus.style.color = '#ffd700';
            contactForm.reset();
            btnText.innerText = 'Send Message';
            submitBtn.disabled = false;
        }, 1500);
    });
}

// =========================================
// PARTICLES.JS (tsParticles) CONFIG
// =========================================
tsParticles.load("tsparticles", {
    fpsLimit: 60,
    background: {
        color: {
            value: "transparent"
        }
    },
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "push"
            },
            onHover: {
                enable: true,
                mode: "repulse"
            },
            resize: true
        },
        modes: {
            push: {
                quantity: 4
            },
            repulse: {
                distance: 100,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: ["#ffd700", "#ffaa00", "#ffffff"]
        },
        links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.1,
            width: 1
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce"
            },
            random: true,
            speed: 2,
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 120
        },
        opacity: {
            value: 0.3
        },
        shape: {
            type: "circle"
        },
        size: {
            value: { min: 1, max: 3 }
        }
    },
    detectRetina: true
});


// =========================================
// 3D TILT EFFECT (Vanilla-Tilt)
// =========================================
if (typeof VanillaTilt !== 'undefined' && window.innerWidth > 768) {
    VanillaTilt.init(document.querySelectorAll('.glass-card, .exp-card, .skill-category, .cert-card, .stat-box'), {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
        scale: 1.02
    });
}

// =========================================
// PARALLAX BACKGROUND EFFECT
// =========================================
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const slides = document.querySelectorAll('.slide');
        
        // Move the background image slightly as you scroll down for a true parallax effect
        slides.forEach(slide => {
            // We use background-position to avoid overwriting the scale animation
            slide.style.backgroundPositionY = `calc(50% + ${scrolled * 0.4}px)`;
        });
    });
}

// =========================================
// BACKGROUND MUSIC LOGIC
// =========================================
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');

if (bgMusic && musicToggle) {
    const musicIcon = musicToggle.querySelector('i');
    let isMusicPlaying = false;
    
    // Set volume to a reasonable background level
    bgMusic.volume = 0.4;
    
    function toggleMusic() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicIcon.classList.remove('fa-volume-up');
            musicIcon.classList.add('fa-volume-mute');
        } else {
            bgMusic.play().catch(e => console.log('Audio play failed (browser policy):', e));
            musicIcon.classList.remove('fa-volume-mute');
            musicIcon.classList.add('fa-volume-up');
        }
        isMusicPlaying = !isMusicPlaying;
    }
    
    musicToggle.addEventListener('click', toggleMusic);
    
    // Attempt to start music automatically on first user interaction with the document
    // (Modern browsers require user interaction before playing audio)
    document.body.addEventListener('click', () => {
        if (!isMusicPlaying && bgMusic.paused) {
            toggleMusic();
        }
    }, { once: true });
}



// =========================================
// MOUSE MOVE PARALLAX
// =========================================
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) / 50;
    const moveY = (e.clientY - window.innerHeight / 2) / 50;
    
    const heroElements = document.querySelectorAll('.hero-content, .avatar-wrapper, .shape');
    heroElements.forEach((el, index) => {
        const factor = (index + 1) * 0.5;
        el.style.transform = "translate3d(" + (moveX * factor) + "px, " + (moveY * factor) + "px, 0)";
    });
});
