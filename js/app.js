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
                let portalDone = false;

                const portalTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#hero",
                        start: "top top",
                        end: "+=90%",
                        scrub: 2,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        onLeaveBack: (self) => {
                            // When user scrolls back up into the hero, kill the pin
                            // so there's no magnetic snap pulling them back down
                            if (portalDone) {
                                self.disable();
                                gsap.set('.portal-container', { scale: 1, opacity: 1 });
                                gsap.set('.portal-core, .portal-text', { opacity: 1 });
                                portalDone = false;

                                // Re-enable after they fully leave back to top
                                ScrollTrigger.create({
                                    trigger: "#hero",
                                    start: "top top",
                                    onLeave: () => {
                                        self.enable();
                                        portalDone = true;
                                    },
                                    once: true
                                });
                            }
                        },
                        onLeave: () => {
                            portalDone = true;  // portal zoom completed
                        }
                    }
                })
                .to('.portal-container', { 
                    scale: 8,
                    ease: 'power1.inOut', 
                    duration: 1 
                }, 0)
                .to('.portal-core, .portal-text', { 
                    opacity: 0, 
                    ease: 'power2.in', 
                    duration: 0.6
                }, 0)
                .to('.hero-content', {         // ← add this
                opacity: 0,
                y: -20,                    // subtle upward drift, not -100
                ease: 'power1.in',
                duration: 0.8,             // slow fade over most of the scroll
                delay: 0.1                 // starts just slightly after portal begins zooming
            }, 0)
            .to('.metadata-pills', {       // pills fade out slightly before the rest
                opacity: 0,
                y: -10,
                ease: 'power1.in',
                duration: 0.5
            }, 0);

            }
            else {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: "#hero",
                        start: "top top",
                        end: "+=60%",
                        scrub: 2,
                        invalidateOnRefresh: true
                    }
                })
                .to('.portal-container', { 
                    opacity: 0, 
                    scale: 1.3,
                    ease: 'power1.inOut', 
                    duration: 0.8 
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