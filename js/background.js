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
            this.size = Math.random() * 2 + 1;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            const colors = ['#005F73', '#0A9396', '#94D2BD'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < mouse.radius) {
                const force = (mouse.radius - dist) / mouse.radius;
                this.x -= dx * force * 0.05;
                this.y -= dy * force * 0.05;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0; 
        }
    }

    function init() {
        nodes = [];
        const nodeCount = Math.min(80, Math.floor(window.innerWidth / 15)); 
        for (let i = 0; i < nodeCount; i++) {
            nodes.push(new Node());
        }
    }

    function connect() {
        let opacity = 1;
        for (let a = 0; a < nodes.length; a++) {
            for (let b = a + 1; b < nodes.length; b++) {
                const dx = nodes[a].x - nodes[b].x;
                const dy = nodes[a].y - nodes[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    opacity = 1 - (dist / 120);
                    ctx.strokeStyle = `rgba(10, 147, 150, ${opacity * 0.4})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(nodes[a].x, nodes[a].y);
                    ctx.lineTo(nodes[b].x, nodes[b].y);
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