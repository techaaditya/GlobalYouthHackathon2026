document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let nodes = [];
    const mouse = { x: null, y: null, radius: 150 };

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Node {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.baseX = this.x;
            this.baseY = this.y;
            this.size = Math.random() * 3 + 1.5;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            const colors = ['#1a6bff', '#00b4ff', '#5ba3ff'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Skip the mouse math entirely until the pointer actually moves
            // (avoids NaN work every frame and a stray sqrt per node).
            if (mouse.x !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distSq = dx * dx + dy * dy;
                if (distSq < mouse.radius * mouse.radius) {
                    const dist = Math.sqrt(distSq) || 1;
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= dx * force * 0.05;
                    this.y -= dy * force * 0.05;
                }
            }
        }

        draw() {
            // Cheap glow: a faint halo + a solid core. Canvas shadowBlur was the
            // single biggest per-frame cost, so we fake the glow with globalAlpha.
            ctx.globalAlpha = 0.16;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2.6, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function init() {
        nodes = [];
        const nodeCount = Math.min(90, Math.floor(window.innerWidth / 16));
        for (let i = 0; i < nodeCount; i++) {
            nodes.push(new Node());
        }
    }

    const MAX_LINK = 140;
    const MAX_LINK_SQ = MAX_LINK * MAX_LINK;

    function connect() {
        for (let a = 0; a < nodes.length; a++) {
            const na = nodes[a];
            for (let b = a + 1; b < nodes.length; b++) {
                const nb = nodes[b];
                const dx = na.x - nb.x;
                const dy = na.y - nb.y;
                const distSq = dx * dx + dy * dy;

                // Squared-distance gate first; only pay for sqrt on actual links.
                if (distSq < MAX_LINK_SQ) {
                    const opacity = 1 - Math.sqrt(distSq) / MAX_LINK;
                    ctx.strokeStyle = `rgba(10, 147, 150, ${opacity * 0.45})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(na.x, na.y);
                    ctx.lineTo(nb.x, nb.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        connect();
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].update();
            nodes[i].draw();
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        resizeCanvas();
        init();
    });

    resizeCanvas();
    init();
    animate();
});