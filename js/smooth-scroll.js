gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,          // was 1.8 — tighter, less "floaty" catch-up
    effects: true,
    normalizeScroll: true,
    ignoreMobileResize: true,
});

window.smoother = smoother;