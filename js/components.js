document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Magic Line ---
    const navMenu = document.querySelector('.nav-menu');
    const magicLine = document.getElementById('magic-line');
    const navItems = document.querySelectorAll('.nav-item');

    function moveLine(target) {
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const parentRect = navMenu.getBoundingClientRect();
        magicLine.style.opacity = '1';
        magicLine.style.width = `${rect.width}px`;
        magicLine.style.left = `${rect.left - parentRect.left}px`;
    }

    if (navItems.length > 0) {
        setTimeout(() => {
            magicLine.style.transition = 'none';
            moveLine(navItems[0]);
            setTimeout(() => {
                magicLine.style.transition = 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
            }, 50);
        }, 500);
    }

    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => moveLine(item));
    });
    navMenu.addEventListener('mouseleave', () => { if (navItems.length > 0) moveLine(navItems[0]); });

    // --- Countdown Timer ---
    const targetDate = new Date("March 15, 2026 09:00:00").getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days < 10 ? `0${days}` : days;
        document.getElementById('hours').innerText = hours < 10 ? `0${hours}` : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? `0${minutes}` : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? `0${seconds}` : seconds;
    }

    setInterval(updateTimer, 1000);
    updateTimer();

    // --- 3D Tilt Tracks ---
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // --- Draggable Gallery ---
    const stack = document.getElementById('card-stack');
    const polaroids = Array.from(document.querySelectorAll('.polaroid'));
    
    // Initialize random rotation
    polaroids.forEach((p, i) => {
        p.style.zIndex = i;
        p.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
    });

    let topZ = polaroids.length;

    polaroids.forEach(p => {
        let startX, startY, currentX = 0, currentY = 0;
        let isDragging = false;

        p.addEventListener('pointerdown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            p.style.zIndex = ++topZ;
            p.setPointerCapture(e.pointerId);
        });

        p.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            currentX = e.clientX - startX;
            currentY = e.clientY - startY;
            p.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentX / 10}deg)`;
        });

        p.addEventListener('pointerup', () => {
            isDragging = false;
            // Threshold for throwing the card
            if (Math.abs(currentX) > 100 || Math.abs(currentY) > 100) {
                // Animate off screen
                p.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
                p.style.transform = `translate(${currentX * 5}px, ${currentY * 5}px) rotate(${currentX / 2}deg)`;
                p.style.opacity = '0';
                
                setTimeout(() => {
                    // Reset to bottom of stack
                    p.style.transition = 'none';
                    p.style.zIndex = 0;
                    topZ--; // Lower the z-index cap slightly so the next card comes to top
                    p.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
                    p.style.opacity = '1';
                    currentX = 0;
                    currentY = 0;
                    // Put it at the end of the array visually
                    stack.appendChild(p);
                }, 500);
            } else {
                // Snap back
                p.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
                p.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
                setTimeout(() => { p.style.transition = 'none'; }, 300);
                currentX = 0;
                currentY = 0;
            }
        });
    });

    // --- Sponsors Hover Text Split ---
    const sponsorItems = document.querySelectorAll('.sponsor-item');
    sponsorItems.forEach(item => {
        const text = item.textContent;
        item.innerHTML = ''; // Clear text
        
        // Wrap each character in a span
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            span.style.transition = 'transform 0.3s ease';
            item.appendChild(span);
        });

        const charSpans = item.querySelectorAll('span');
        
        item.addEventListener('mouseenter', () => {
            charSpans.forEach((span, i) => {
                const randomX = (Math.random() - 0.5) * 10;
                const randomY = (Math.random() - 0.5) * 10;
                span.style.transform = `translate(${randomX}px, ${randomY}px)`;
            });
        });

        item.addEventListener('mouseleave', () => {
            charSpans.forEach(span => {
                span.style.transform = 'translate(0, 0)';
            });
        });
    });

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all
            faqItems.forEach(i => i.classList.remove('active'));
            // Open clicked one if it was closed
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});