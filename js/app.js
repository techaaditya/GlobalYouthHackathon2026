gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // Delay initialization to sync with the Anime.js preloader completion
    setTimeout(() => {
        
        // =========================================
        // GSAP MATCHMEDIA FOR RESPONSIVE ANIMATIONS
        // =========================================
        const mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 769px)",
            isMobile: "(max-width: 768px)"
        }, (context) => {
            const { isDesktop, isMobile } = context.conditions;

            // --- 1. HERO ENTRANCE ANIMATION ---
            const heroTl = gsap.timeline();
            heroTl
                .from('.live-badge', { y: -30, opacity: 0, duration: 0.6, ease: 'power2.out' })
                .from('.hero-title', { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
                .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
                .from('.metadata-pills .pill', { y: 20, opacity: 0, stagger: 0.1, duration: 0.4 }, '-=0.3')
                .from('.portal-container', { scale: 0.5, opacity: 0, duration: 1.5, ease: 'expo.out' }, '-=1');

            // --- 2. PORTAL ZOOM-IN SCROLLTRIGGER ---
            if (isDesktop) {
                // DESKTOP: Scale zoom effect through the hollow portal ring
                gsap.timeline({
                    scrollTrigger: {
                        trigger: "#hero",
                        start: "top top",
                        end: "+=120%", // Distance to scroll while pinned
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true
                    }
                })
                .to('.hero-content', { 
                    opacity: 0, 
                    y: -100, 
                    ease: 'none', 
                    duration: 0.3 
                }, 0)
                .to('.portal-container', { 
                    scale: 14, // Zooms smoothly past the screen
                    ease: 'none', 
                    duration: 1 
                }, 0)
                .to('.portal-core, .portal-text', { 
                    opacity: 0, 
                    ease: 'none', 
                    duration: 0.4 
                }, 0);
            } else {
                // MOBILE: Simplified layout fade
                gsap.timeline({
                    scrollTrigger: {
                        trigger: "#hero",
                        start: "top top",
                        end: "+=50%", 
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true
                    }
                })
                .to('.hero-content', { 
                    opacity: 0, 
                    y: -50, 
                    ease: 'none', 
                    duration: 0.5 
                }, 0)
                .to('.portal-container', { 
                    opacity: 0, 
                    scale: 1.5, 
                    ease: 'none', 
                    duration: 0.5 
                }, 0);
            }

            // --- 3. STATS & TIMER SECTION REVEAL ---
            // Separated from hero pinned trigger to guarantee section visibility
            gsap.from('.stats-section', {
                scrollTrigger: {
                    trigger: '.stats-section',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out'
            });

            gsap.from('.timer-wrapper', {
                scrollTrigger: {
                    trigger: '.timer-wrapper',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 40, opacity: 0, duration: 0.8, ease: 'power2.out'
            });

            gsap.from('.bento-card', {
                scrollTrigger: {
                    trigger: '.bento-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out'
            });

            // --- 4. TRACKS SECTION REVEAL ---
            gsap.from('.track-card', {
                scrollTrigger: {
                    trigger: '.tracks-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out'
            });

            // --- 5. GALLERY SECTION REVEAL ---
            gsap.from('.card-stack', {
                scrollTrigger: {
                    trigger: '.gallery-section',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out'
            });

            // --- 6. FAQ SECTION REVEAL ---
            gsap.from('.faq-item', {
                scrollTrigger: {
                    trigger: '.faq-grid',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 50, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out'
            });

            ScrollTrigger.refresh();
            
            window.addEventListener('resize', () => {
                ScrollTrigger.refresh();
            }, { passive: true });

            return () => {
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            };
        });

    }, 4500); // Syncs with preloader completion
});