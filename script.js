function startCelebration() {
    // เล่นเสียง
    const audio = document.getElementById("birthdayAudio");
    if (audio) {
        audio.play();
    }

    // เปลี่ยนสีพื้นหลัง
    document.body.style.backgroundColor = "#ffccbc";

    // แสดงข้อความพิเศษ
    const container = document.querySelector(".container");
    container.innerHTML = `
        <h1>HAPPY BIRTHDAY, KUN SOMWIPA! 🎉</h1>
        <p>ขอให้สุขภาพร่างกายแข็งแรง ได้กินของอร่อยเยอะๆ ได้คร้าบบบ 🎁</p>
        <p>จากน้องพลอย อดีตลูกน้องพี่ตั๊กครับผม!</p>
    `;

    // เรียกฟังก์ชันเพิ่มรูปภาพลอยหลังจากกดปุ่ม
    addFloatingImages();
}

function addFloatingImages() {
    const numImages = 5; // จำนวนรูปที่ต้องการให้ลอย
    const container = document.body;

    for (let i = 0; i < numImages; i++) {
        const img = document.createElement("img");
        img.src = "myj1irypvwex.webp"; // เปลี่ยนเป็น path รูปของคุณ
        img.classList.add("floating-image");

        // สุ่มตำแหน่งไม่ให้ทับข้อความ
        img.style.position = "fixed";
        img.style.top = `${Math.random() * 80 + 10}%`;
        img.style.left = `${Math.random() * 80 + 10}%`;
        img.style.width = "120px";
        img.style.opacity = "0.6";
        img.style.zIndex = "-1"; // ให้รูปอยู่ข้างหลังข้อความ
        img.style.animation = `floatAnimation ${Math.random() * 5 + 5}s ease-in-out infinite alternate`;

        container.appendChild(img);
    }
}

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
