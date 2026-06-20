gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        
        // Hero Entrance
        const heroTl = gsap.timeline();
        heroTl
            .from('.live-badge', { y: -30, opacity: 0, duration: 0.6, ease: 'power2.out' })
            .from('.hero-title', { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
            .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
            .from('.metadata-pills .pill', { y: 20, opacity: 0, stagger: 0.1, duration: 0.4 }, '-=0.3')
            .from('.portal-container', { scale: 0.5, opacity: 0, duration: 1.5, ease: 'expo.out' }, '-=1');

        // Portal Zoom & Scroll Lock
        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "+=150%",
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        })
        .to('.portal-container', { scale: 8, opacity: 0, ease: 'none' }, 0)
        .to('.hero-content', { opacity: 0, y: -100, ease: 'none' }, 0)
        .to('.portal-text', { opacity: 0, ease: 'none' }, 0.2);

        // Stats Reveal
        gsap.from('.timer-wrapper', {
            scrollTrigger: { trigger: '.stats-section', start: 'top 80%', toggleActions: 'play none none reverse' },
            y: 50, opacity: 0, duration: 0.8, ease: 'power2.out'
        });

        gsap.from('.bento-card', {
            scrollTrigger: { trigger: '.bento-grid', start: 'top 85%', toggleActions: 'play none none reverse' },
            y: 50, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out'
        });

        // Tracks Reveal
        gsap.from('.track-card', {
            scrollTrigger: { trigger: '.tracks-grid', start: 'top 85%', toggleActions: 'play none none reverse' },
            y: 50, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out'
        });

        // Gallery Reveal
        gsap.from('.card-stack', {
            scrollTrigger: { trigger: '.gallery-section', start: 'top 80%', toggleActions: 'play none none reverse' },
            scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out'
        });

        // FAQ Reveal
        gsap.from('.faq-item', {
            scrollTrigger: { trigger: '.faq-grid', start: 'top 85%', toggleActions: 'play none none reverse' },
            y: 50, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out'
        });

    }, 4500); // Matches preloader duration
});