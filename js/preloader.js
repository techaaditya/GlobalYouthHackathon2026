document.addEventListener('DOMContentLoaded', () => {
    const scrambleText = document.getElementById('scramble-text');
    const preloaderLine = document.querySelector('.preloader-line');
    const preloader = document.getElementById('preloader');
    
    const phrases = [
        "GLOBAL YOUTH HACKATHON 2026",
        "INITIALIZING SYSTEM..."
    ];

    const chars = "!@#$%^&*()_+-=<>?/[]{}|";
    let currentPhrase = 0;

    const lineTimeline = anime.timeline({
        autoplay: true,
        loop: false
    });

    lineTimeline.add({
        targets: '.preloader-line',
        width: ['0%', '100%'],
        duration: 3500,
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

    setTimeout(() => {
        scrambleEffect(scrambleText, phrases[0], 1500, () => {
            setTimeout(() => {
                scrambleEffect(scrambleText, phrases[1], 1200, () => {
                    setTimeout(() => {
                        anime({
                            targets: preloader,
                            scaleY: [1, 0],
                            transformOrigin: '100% 100%',
                            duration: 900,
                            easing: 'easeInExpo',
                            complete: () => {
                                preloader.style.display = 'none';
                            }
                        });
                    }, 500);
                });
            }, 400);
        });
    }, 300);
});