// Navigation Scroll Monitoring
const navLinks = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === id) link.classList.add('active');
            });
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('section, main').forEach(s => observer.observe(s));

// Image Tilt and Rotation Logic
document.querySelectorAll('.work-card').forEach(card => {
    const wrapper = card.querySelector('.image-wrapper');

    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return; 

        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xRotation = ((y - rect.height / 2) / rect.height) * -15;
        const yRotation = ((x - rect.width / 2) / rect.width) * 15;
        wrapper.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        wrapper.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

// Rainbow Text Interaction Logic
const layers = document.querySelectorAll('.text-layer');

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = (e.clientX - centerX) / 50;
        const moveY = (e.clientY - centerY) / 50;

        layers.forEach((layer, index) => {
            const depth = (layers.length - index) * 0.25;
            layer.style.transform =
                `translate(calc(-50% + ${moveX * depth}px), calc(-50% + ${moveY * depth}px))`;
        });
    } else {
        layers.forEach((layer) => {
            layer.style.transform = `translate(-50%, -50%)`;
        });
    }
});


// Entrance Animation
gsap.registerPlugin(ScrollTrigger);
gsap.from(".text-layer", { opacity: 0, y: 60, stagger: 0.06, duration: 1.2, ease: "power3.out", delay: 0.2 });
gsap.to("#works-title", {
    scrollTrigger: {
        trigger: "#works",
        start: "top 70%",
    },
    opacity: 1,        
    y: 0,              
    duration: 3,
    ease: "power3.out"
});

// Portfolio Card List Entry Animation
gsap.to(".work-card", {
    scrollTrigger: {
        trigger: "#works",
        start: "top 30%",    
        toggleActions: "play none none none"
    },
    opacity: 1,
    y: 0,                    
    stagger: 0.4,           
    duration: 1.5,          
    ease: "expo.out"         
});