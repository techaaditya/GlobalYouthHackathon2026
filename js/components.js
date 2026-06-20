document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. ACTIVE SEGMENT COUNTDOWN TIMER
    // =========================================
    const targetDate = new Date("March 15, 2026 09:00:00").getTime();
    const elDays = document.getElementById('days');
    const elHours = document.getElementById('hours');
    const elMinutes = document.getElementById('minutes');
    const elSeconds = document.getElementById('seconds');

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            if(elDays) elDays.innerText = '00';
            if(elHours) elHours.innerText = '00';
            if(elMinutes) elMinutes.innerText = '00';
            if(elSeconds) elSeconds.innerText = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if(elDays) elDays.innerText = String(days).padStart(2, '0');
        if(elHours) elHours.innerText = String(hours).padStart(2, '0');
        if(elMinutes) elMinutes.innerText = String(minutes).padStart(2, '0');
        if(elSeconds) elSeconds.innerText = String(seconds).padStart(2, '0');
    }

    setInterval(updateTimer, 1000);
    updateTimer();

    // =========================================
    // 2. PARALLAX 3D TILT WITH SMOOTH RESET
    // =========================================
    const tiltCards = document.querySelectorAll('.track-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPct = x / rect.width;
            const yPct = y / rect.height;
            
            const rotateY = (xPct * 20) - 10; 
            const rotateX = -((yPct * 20) - 10); 
            
            card.style.transition = 'none';
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s ease-out';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        }, { passive: true });
    });

    // =========================================
    // 3. DRAGGABLE POLAROID PHOTO GALLERY STACK
    // =========================================
    const stack = document.getElementById('card-stack');
    const polaroids = Array.from(document.querySelectorAll('.polaroid'));
    
    let topZ = polaroids.length;
    
    polaroids.forEach((p, i) => {
        p.style.zIndex = i;
        const initialRotation = Math.random() * 12 - 6; 
        p.dataset.rotation = initialRotation;
        p.style.transform = `rotate(${initialRotation}deg)`;
    });

    polaroids.forEach(p => {
        let startX, startY, currentX = 0, currentY = 0;
        let isDragging = false;

        p.addEventListener('pointerdown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            p.style.zIndex = ++topZ;
            p.style.transition = 'none'; 
            p.setPointerCapture(e.pointerId);
        }, { passive: true });

        p.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            
            currentX = e.clientX - startX;
            currentY = e.clientY - startY;
            
            const baseRotation = parseFloat(p.dataset.rotation);
            p.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${baseRotation + currentX / 15}deg)`;
        }, { passive: true });

        p.addEventListener('pointerup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            if (Math.abs(currentX) > 150 || Math.abs(currentY) > 150) {
                p.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
                p.style.transform = `translate(${currentX * 5}px, ${currentY * 5}px) rotate(${currentX / 2}deg)`;
                p.style.opacity = '0';
                
                setTimeout(() => {
                    p.style.transition = 'none';
                    p.style.zIndex = 0; 
                    topZ--; 
                    p.style.opacity = '1';
                    
                    const newRotation = Math.random() * 12 - 6;
                    p.dataset.rotation = newRotation;
                    p.style.transform = `rotate(${newRotation}deg)`;
                    
                    stack.appendChild(p);
                    
                    currentX = 0;
                    currentY = 0;
                }, 500);
            } else {
                p.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
                p.style.transform = `rotate(${parseFloat(p.dataset.rotation)}deg)`;
                currentX = 0;
                currentY = 0;
            }
        }, { passive: true });
    });

    // =========================================
    // 4. FAQ GRID ACCORDION TRIGGERS
    // =========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            if (!isActive) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });

    // =========================================
    // 5. NAVBAR MAGIC LINE & SPONSOR SPLIT
    // =========================================
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
        item.addEventListener('mouseenter', () => moveLine(item), { passive: true });
    });
    navMenu.addEventListener('mouseleave', () => { if (navItems.length > 0) moveLine(navItems[0]); }, { passive: true });

    // Sponsor Text Split Effect
    const sponsorItems = document.querySelectorAll('.sponsor-item');
    sponsorItems.forEach(item => {
        const text = item.textContent;
        item.innerHTML = ''; 
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; 
            span.style.display = 'inline-block';
            span.style.transition = 'transform 0.3s ease';
            item.appendChild(span);
        });

        const charSpans = item.querySelectorAll('span');
        item.addEventListener('mouseenter', () => {
            charSpans.forEach(span => {
                const randomX = (Math.random() - 0.5) * 6;
                const randomY = (Math.random() - 0.5) * 6;
                span.style.transform = `translate(${randomX}px, ${randomY}px)`;
            });
        }, { passive: true });

        item.addEventListener('mouseleave', () => {
            charSpans.forEach(span => {
                span.style.transform = 'translate(0, 0)';
            });
        }, { passive: true });
    });
});