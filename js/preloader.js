document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.querySelector("#preloader");
  const preloaderWrap = document.querySelector(".preloader-wrap");
  const gridPanels = document.querySelectorAll(".grid-panel");
  const glitchText = document.querySelector("#glitch-text");

  // Prevent user from scrolling while loading
  document.body.style.overflow = "hidden";

  // Glitch Effect Matrix Configurations
  const letters = "#@%$[]{}+=";
  let iterations = 0;
  let interval = null;

const triggerGlitch = () => {
    const target = glitchText.dataset.value;
    const duration = 1500; // ms
    let startTime = null;

    const result = target.split("").map(() => 
        letters[Math.floor(Math.random() * letters.length)]
    );

    const frame = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // How many characters should be revealed by now
        const revealedCount = Math.floor(progress * target.length);

        glitchText.innerText = result.map((char, index) => {
            if (index < revealedCount) return target[index];
            return letters[Math.floor(Math.random() * letters.length)];
        }).join("");

        if (progress < 1) {
            requestAnimationFrame(frame);
        } else {
            glitchText.innerText = target; // snap to final clean text
        }
    };

    requestAnimationFrame(frame);
};

  if (glitchText) triggerGlitch();

  // Master Preloader Timeline
// Master Preloader Timeline
const tl = gsap.timeline({
    onComplete: () => {
        if (preloader) {
            preloader.style.display = "none";
            preloader.style.pointerEvents = "none";
        }
        const curtainWrap = document.querySelector(".curtain-wrap");
        if (curtainWrap) {
            curtainWrap.style.display = "none";
            curtainWrap.style.pointerEvents = "none";
        }
    }
});

tl.to({}, { duration: 1.8 });

if (preloaderWrap) {
    tl.to(".preloader-content", {
        opacity: 0, y: -20, duration: 0.4, ease: "power2.in"
    })
    .to(preloaderWrap, {
        opacity: 0, duration: 0.05
    }, "-=0.1");
}

if (gridPanels.length > 0) {
    tl.to(gridPanels, {
        scaleY: 0,
        duration: 1.2,
        ease: "expo.inOut",
        stagger: { amount: 0.3, from: "center" },
    }, "-=0.1");
}
});