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

            // =========================================
            // 1. HERO ENTRANCE ANIMATION (Shared Base)
            // =========================================
            const heroTl = gsap.timeline();
            heroTl
                .from('.live-badge', { y: -20, opacity: 0, duration: 0.6, ease: 'power2.out' })
                .from('.hero-title', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
                .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
                .from('.metadata-pills .pill', { y: 15, opacity: 0, stagger: 0.08, duration: 0.4 }, '-=0.3');

            // --- DESKTOP ONLY: Heavy Portal Transitions ---
            if (isDesktop) {
                heroTl.from('.portal-container', { scale: 6, opacity: 0, duration: 1.5, ease: 'expo.out' }, '-=1');

                // Advanced scroll-tied exit physics (Safely omitted from mobile touch browsers)
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
                    immediateRender: false,
                    y: -60,
                    ease: 'power1.in',
                    duration: 0.65
                }, 0)
                .to('.portal-container', {
                    scale: 4,
                    immediateRender: false,
                    opacity: 0,
                    ease: 'power1.out',
                    duration: 0.8
                }, 0)
                .to('.portal-core, .portal-text', {
                    opacity: 0,
                    immediateRender: false,
                    ease: 'power2.in',
                    duration: 0.5
                }, 0);
            }

            // =========================================
            // 2. MAIN SCROLL REVEALS (Responsive Logic)
            // =========================================
            if (isDesktop) {
               
                // --- Premium Widescreen Timelines (Staggers & Directions) ---
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
                    clearProps: 'all', opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out'
                });

                gsap.from('.track-card', {
                    scrollTrigger: {
                        trigger: '.tracks-grid',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    clearProps: 'all', opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out'
                });

                gsap.from('.podium-col', {
                    scrollTrigger: {
                        trigger: '.prizes-podium',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    clearProps: 'all', opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out'
                });

                gsap.from('.roadmap-step', {
                    scrollTrigger: {
                        trigger: '.roadmap-timeline',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    clearProps: 'all', opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out'
                });

                gsap.from('.sponsors-grid', {
                    scrollTrigger: {
                        trigger: '.sponsors-grid',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    clearProps: 'all', opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out'
                });

                gsap.from('.sponsors-callout', {
                    scrollTrigger: {
                        trigger: '.sponsors-callout',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    clearProps: 'all', opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out'
                });

                gsap.from('.secretariat-category-group', {
                    scrollTrigger: {
                        trigger: '.secretariat-section',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    clearProps: 'all', opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out'
                });

                gsap.from('.card-stack', {
                    scrollTrigger: {
                        trigger: '.gallery-section',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    clearProps: 'all', scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out'
                });

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

            } else if (isMobile) {
                // --- Mobile Performance Set (Ultra-lightweight Section-based Fade-Ins Only) ---
                const simpleRevealElements = [
                    '.stats-section',
                    '.timer-wrapper',
                    '.bento-grid',
                    '.tracks-grid',
                    '.prizes-podium',
                    '.roadmap-timeline',
                    '.secretariat-section',
                    '.sponsors-section',
                    '.gallery-section',
                    '.faq-grid'
                ];

                simpleRevealElements.forEach(selector => {
                    if (document.querySelector(selector)) {
                        gsap.from(selector, {
                            scrollTrigger: {
                                trigger: selector,
                                start: 'top 90%', 
                                toggleActions: 'play none none none' // Play once on mobile to conserve CPU cycles
                            },
                            opacity: 0,
                            y: 20, 
                            duration: 0.6,
                            ease: 'power1.out',
                            clearProps: 'all' // Instantly clean inline modifications after fade-in completes
                        });
                    }
                });
            }

            ScrollTrigger.refresh();
            
            window.addEventListener('resize', () => {
                ScrollTrigger.refresh();
            }, { passive: true });

            return () => {
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            };
        });

    }, 500); 
});