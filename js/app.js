gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // Delay initialization to sync with the preloader timeline completion
    setTimeout(() => {
        ScrollTrigger.refresh();
        
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

        // --- 2. PORTAL ZOOM-IN SCROLLTRIGGER (SNAPPY ZOOM) ---
            if (isDesktop) {
                // DESKTOP: Fast scale "Dive-Through" with end threshold cut to +=65%
                gsap.timeline({
                    scrollTrigger: {
                        trigger: "#hero",
                        start: "top top",
                        end: "+=65%", // Rapid pin distance for quick transition
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
                    duration: 0.3 
                }, 0);
            } else {
                // MOBILE: Simplified fade
                gsap.timeline({
                    scrollTrigger: {
                        trigger: "#hero",
                        start: "top top",
                        end: "+=40%", 
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

            // --- 5. PRIZE PODIUM REVEAL ---
            gsap.from('.podium-col', {
                scrollTrigger: {
                    trigger: '.prizes-podium',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out'
            });

            // --- 6. ROADMAP REVEAL ---
            gsap.from('.roadmap-step', {
                scrollTrigger: {
                    trigger: '.roadmap-timeline',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 40, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out'
            });

            // --- 7. SECRETARIAT REVEAL ---
            gsap.from('.secretariat-category-group', {
                scrollTrigger: {
                    trigger: '.secretariat-section',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out'
            });

            // --- 8. GALLERY SECTION REVEAL ---
            gsap.from('.card-stack', {
                scrollTrigger: {
                    trigger: '.gallery-section',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out'
            });

            // --- 9. FAQ GRID CONTAINER REVEAL ---
            // Consolidated to parent container to prevent individual item opacity locking on filter states
            gsap.from('.faq-grid', {
                scrollTrigger: {
                    trigger: '.faq-grid',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
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