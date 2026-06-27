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

        // --- 2. HERO EXIT (no pin) ---
        // Pinning used to hold a content-faded, empty viewport in place while you kept
        // scrolling — that was the "black section". Without the pin the hero scrolls away
        // naturally and the stats section flows straight up behind it, leaving no dead space.
        // Same behaviour on every screen size, just a gentler portal scale on mobile.
            gsap.timeline({
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.8,
                    invalidateOnRefresh: true
                }
            })
            .to('.hero-content', {
                opacity: 0,
                y: -60,
                ease: 'power1.in',
                duration: 0.65          // fully faded by ~65% of the hero scroll, as it exits the top
            }, 0)
            .to('.portal-container', {
                scale: isDesktop ? 1.6 : 1.25,
                opacity: 0,
                ease: 'power1.in',
                duration: 0.8
            }, 0)
            .to('.portal-core, .portal-text', {
                opacity: 0,
                ease: 'power2.in',
                duration: 0.5
            }, 0);

            // --- 3. STATS & TIMER SECTION REVEAL ---
            // Begins a touch sooner so the stats panel eases into focus right as the
            // portal clears the viewport — no empty beat, comfortable settle.
            gsap.from('.stats-section', {
                scrollTrigger: {
                    trigger: '.stats-section',
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 40,
                duration: 0.9,
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