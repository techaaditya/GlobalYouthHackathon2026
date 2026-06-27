document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.querySelector("#preloader");
  const preloaderWrap = document.querySelector(".preloader-wrap");
  const gridPanels = document.querySelectorAll(".grid-panel");
  const glitchText = document.querySelector("#glitch-text");

  // Prevent user from scrolling while loading
  document.body.style.overflow = "hidden";

  // Glitch Effect Matrix Configurations
  const letters = "#@%$#)(%@&#)ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let iterations = 0;
  let interval = null;

  const triggerGlitch = () => {
    clearInterval(interval);
    interval = setInterval(() => {
      if (!glitchText) return clearInterval(interval);
      glitchText.innerText = glitchText.innerText
        .split("")
        .map((letter, index) => {
          if(index < iterations) {
            return glitchText.dataset.value[index];
          }
          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join("");
      
      if(iterations >= glitchText.dataset.value.length){ 
        clearInterval(interval);
      }
      iterations += 1 / 3;
    }, 20);
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