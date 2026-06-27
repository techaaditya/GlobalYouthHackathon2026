document.addEventListener('DOMContentLoaded', () => {
    const scrambleText = document.getElementById('scramble-text');
    const preloaderLine = document.querySelector('.preloader-line');
    const preloader = document.getElementById('preloader');
    
    // Kept only the initializing message
    const phrase = "INITIALIZING SYSTEM...";
    const chars = "!@#$%^&*()_+-=<>?/[]{}|";

    const lineTimeline = anime.timeline({
        autoplay: true,
        loop: false
    });

    // Tracking bar fills cleanly over 500ms
    lineTimeline.add({
        targets: '.preloader-line',
        width: ['0%', '100%'],
        duration: 500,
        easing: 'easeInOutQuart'
    });

    function scrambleEffect(target, finalText, duration, onComplete) {
        let interval = 0;
        let revealed = 0;
        const totalLength = finalText.length;
        
        const intervalId = setInterval(() => {
            let displayText = "";
            for (let i = 0; i < totalLength; i++) {
                if (i < revealed) {
                    displayText += finalText[i];
                } else {
                    if (finalText[i] === ' ') {
                        displayText += ' ';
                    } else {
                        displayText += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
            }
            target.textContent = displayText;
            
            interval += 10;
            if (interval > duration / totalLength) {
                interval = 0;
                revealed++;
            }

            if (revealed >= totalLength) {
                clearInterval(intervalId);
                target.textContent = finalText;
                if (onComplete) onComplete();
            }
        }, 10);
    }

    // Precise 1.3 Second (1300ms) Execution Timeline:
    setTimeout(() => {
        // Scramble animation runs smoothly for 400ms
        scrambleEffect(scrambleText, phrase, 400, () => {
            // Settle time for user readability before swipe
            setTimeout(() => {
                // Curtain slides up out of view in 350ms
                anime({
                    targets: preloader,
                    scaleY: [1, 0],
                    transformOrigin: '100% 100%',
                    duration: 350,
                    easing: 'easeInExpo',
                    complete: () => {
                        preloader.style.display = 'none';
                    }
                });
            }, 400);
        });
    }, 50);
});