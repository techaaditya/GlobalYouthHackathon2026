document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. ACTIVE COUNTDOWN TIMER (DYNAMIC VALUE)
    // =========================================
    // Set targets to exactly 30 days into the future based on the user's current session time
    const sessionTime = new Date().getTime();
    const targetDate = sessionTime + (30 * 24 * 60 * 60 * 1000);

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
    // Only run the heavy 3D tilt on devices with a precise hover pointer (desktops).
    // On touch screens it adds nothing and can leave cards stuck mid-transform.
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const tiltCards = supportsHover
        ? document.querySelectorAll('.track-card, .bento-card, .prizes-section .podium-col, .secretariat-card')
        : [];

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPct = x / rect.width;
            const yPct = y / rect.height;
            
            const rotateY = (xPct * 16) - 8; 
            const rotateX = -((yPct * 16) - 8); 
            
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
    // 4. FAQ GRID ACCORDION & CATEGORY FILTER
    // =========================================
    const faqItems = document.querySelectorAll('.faq-item');
    const filterBtns = document.querySelectorAll('.faq-filter-btn');
    
    // Accordion click triggers
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

    // Category filtering triggers
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetFilter = btn.getAttribute('data-filter') || btn.textContent.trim().toLowerCase();
            
            // Switch active tab styling
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            let categoryKey = 'all';
            if (targetFilter.includes('general')) categoryKey = 'general';
            else if (targetFilter.includes('programme') || targetFilter.includes('track')) categoryKey = 'programme';
            else if (targetFilter.includes('logistics')) categoryKey = 'logistics';

            faqItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                // Collapse before filtering to prevent layout gaps
                item.classList.remove('active');

                if (categoryKey === 'all' || itemCategory === categoryKey) {
                    item.style.display = 'block';
                    
                    // Kill existing tweens and reset properties cleanly
                    gsap.killTweensOf(item);
                    gsap.fromTo(item, 
                        { opacity: 0, y: 15 }, 
                        { opacity: 1, y: 0, duration: 0.4, clearProps: 'transform' }
                    );
                } else {
                    item.style.display = 'none';
                }
            });

            // Re-sync ScrollTrigger bounds as content height shifts
            ScrollTrigger.refresh();
        });
    });

    // =========================================
// 5. NAVBAR: SHRINK ON SCROLL, MAGIC LINE, SCROLL-SPY, MOBILE TOGGLE
// =========================================
const navbarEl = document.getElementById('navbar');
const navMenu = document.querySelector('.nav-menu');
const magicLine = document.getElementById('magic-line');
const navItems = document.querySelectorAll('.nav-item');
const navToggle = document.getElementById('nav-toggle');

let navScrolled = false;

function updateNavbarScroll() {
    const shouldShrink = window.scrollY > 80;
    if (shouldShrink === navScrolled) return;
    navScrolled = shouldShrink;
    navbarEl.classList.toggle('scrolled', navScrolled);
    syncLineWithLayout();

}
window.addEventListener('scroll', updateNavbarScroll, { passive: true });

function syncLineWithLayout(duration = 650) {
    magicLine.style.transition = 'none';
    const start = performance.now();
    function tick(now) {
        moveLine(getActiveItem());
        if (now - start < duration) {
            requestAnimationFrame(tick);
        } else {
            magicLine.style.transition = 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
            moveLine(getActiveItem());
        }
    }
    requestAnimationFrame(tick);
}
function moveLine(target) {
    if (!target) return;
    // The magic line is hidden inside the stacked drawer (phones + tablets) —
    // skip all the measuring so it never fights the drawer layout or causes jump bugs.
    if (window.matchMedia('(max-width: 1100px)').matches) return;
    const rect = target.getBoundingClientRect();
    const parentRect = navMenu.getBoundingClientRect();
    magicLine.style.opacity = '1';
    magicLine.style.width = `${rect.width}px`;
    magicLine.style.left = `${rect.left - parentRect.left}px`;
}

function getActiveItem() {
    return document.querySelector('.nav-item.active') || navItems[0];
}

function setActiveItem(item) {
    navItems.forEach(i => i.classList.remove('active'));
    if (item) item.classList.add('active');
}

function closeMobileMenu() {
    navbarEl.classList.remove('menu-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-lock');
}

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = navbarEl.classList.toggle('menu-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('nav-lock', isOpen);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbarEl.classList.contains('menu-open')) closeMobileMenu();
    });
}

// The drawer's Register CTA should dismiss the drawer on tap
const navDrawerCta = document.querySelector('.nav-drawer-cta');
if (navDrawerCta) {
    navDrawerCta.addEventListener('click', closeMobileMenu);
}

// If the viewport grows past the drawer breakpoint while it's open, close it cleanly
window.addEventListener('resize', () => {
    if (window.innerWidth > 1100 && navbarEl.classList.contains('menu-open')) {
        closeMobileMenu();
    }
}, { passive: true });

let isClickScrolling = false;
let clickScrollTimeout;

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();                        // prevent ALL native jumps
        const href = item.getAttribute('href');
        const target = document.querySelector(href);
        if (!target) return;

        setActiveItem(item);
        moveLine(item);
        isClickScrolling = true;
        clearTimeout(clickScrollTimeout);
        clickScrollTimeout = setTimeout(() => { isClickScrolling = false; }, 1200);

        if (window.smoother) {
            window.smoother.scrollTo(target, true, "top 30px");  // smooth scroll via smoother
        } else {
            target.scrollIntoView({ behavior: 'smooth' });      // fallback if smoother not ready
        }

        closeMobileMenu();
    });
});


const spySections = Array.from(navItems)
    .map(item => document.querySelector(item.getAttribute('href')))
    .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
    if (isClickScrolling) return;
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const matchingLink = document.querySelector(`.nav-item[href="#${entry.target.id}"]`);
            if (matchingLink) {
                setActiveItem(matchingLink);
                if (!navMenu.matches(':hover')) moveLine(matchingLink);
            }
        }
    });
}, {
    rootMargin: '-45% 0px -45% 0px',
    threshold: 0
});
spySections.forEach(section => sectionObserver.observe(section));

window.addEventListener('scroll', () => {
    if (isClickScrolling) return; 
    if (window.scrollY < 50) {
        const homeLink = document.querySelector('.nav-item[href="#hero"]');
        if (getActiveItem() !== homeLink) {
            setActiveItem(homeLink);
            moveLine(homeLink);
        }
    }
}, { passive: true });

updateNavbarScroll();

if (navItems.length > 0) {
    setTimeout(() => {
        magicLine.style.transition = 'none';
        moveLine(getActiveItem());
        setTimeout(() => {
            magicLine.style.transition = 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        }, 50);
    }, 500);
}

navItems.forEach(item => {
    item.addEventListener('mouseenter', () => moveLine(item), { passive: true });
});
navMenu.addEventListener('mouseleave', () => moveLine(getActiveItem()), { passive: true });

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