gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Do not initialize instantly! Wrap it inside a clean listener function
    const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.1,          
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
    });

    window.smoother = smoother;
    
    // Force recalculating positions right after initialization
    ScrollTrigger.refresh();