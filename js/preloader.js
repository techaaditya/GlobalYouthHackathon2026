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

  // Function to run the dynamic text unscramble
  const triggerGlitch = () => {
    clearInterval(interval);
    
    interval = setInterval(() => {
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
      
      iterations += 1 / 3; // Controls speed of decryption (lower = slower decoding)
    },20);
  };

  // Master Preloader Timeline
  const tl = gsap.timeline({
    onComplete: () => {
      preloader.style.display = "none";
      document.body.style.overflow = "unset";
      window.dispatchEvent(new CustomEvent("preloaderFinished"));
    }
  });

  tl
  // Step 1: Trigger the text decode animation right away
  .call(triggerGlitch)
  
  // Step 2: Let the text sit fully decoded for a brief second
  .to({}, { duration: 1.6 }) 

  // Step 3: Text fades and dissolves away sharply
  .to(".preloader-content", {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: "power2.in"
  })

  // Step 4: Hide the dark background container wrapper
  .to(preloaderWrap, {
    opacity: 0,
    duration: 0.05,
  }, "-=0.1")

  // Step 5: The Grand Finale – High-end grid panels lift up smoothly from center outward
  .to(gridPanels, {
    scaleY: 0,
    duration: 1.2,
    ease: "expo.inOut",
    stagger: {
      amount: 0.3,
      from: "center" 
    }
  }, "-=0.1");
});