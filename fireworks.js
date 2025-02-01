const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.createParticles();
    }

    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push(new Particle(this.x, this.y));
        }
    }

    update() {
        this.particles.forEach((particle, index) => {
            particle.update();
            if (particle.alpha <= 0) this.particles.splice(index, 1);
        });
    }

    draw() {
        this.particles.forEach(particle => particle.draw());
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 1;
        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = (Math.random() - 0.5) * 8;
        this.alpha = 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.02;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// สร้างพลุแบบสุ่ม
function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5;
    fireworks.push(new Firework(x, y));
}

// วนลูปเพื่ออัปเดตและแสดงผลพลุ
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.particles.length === 0) fireworks.splice(index, 1);
    });
    requestAnimationFrame(animate);
}

// เริ่มต้นแสดงผลพลุ
setInterval(createFirework, 800);
animate();
