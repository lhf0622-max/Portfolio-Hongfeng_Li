const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let mouseFollow = true;
let particles = [];
let mouse = { x: null, y: null };
const MAX_PARTICLES = 80; // Particle Density
const CONNECTION_DIST = 150; 

const COLORS = ['#e74c3c', '#ff8c42', '#ffd700', '#2ecc71', '#3498db', '#9b59b6'];
let colorIndex = 0;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = 2;
    // Random speed
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.life = 1.0; // 透明度生命周期
    this.decay = Math.random() * 0.01 + 0.005; // 消失速度
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.life;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// 连线算法
function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < CONNECTION_DIST) {
        const opacity = (1 - distance / CONNECTION_DIST) * particles[i].life;
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].life <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }

  drawLines();
  requestAnimationFrame(animate);
}

document.addEventListener('mousemove', (e) => {
  if (window.innerWidth <= 768) return; 

  if (!mouseFollow) return;// 如果开关关闭，不生成粒子

  if (particles.length < MAX_PARTICLES) {
    particles.push(new Particle(
      e.clientX,
      e.clientY,
      COLORS[colorIndex]
    ));
  }
});

document.addEventListener('mousedown', () => {
  if (window.innerWidth <= 768) return;
  colorIndex = (colorIndex + 1) % COLORS.length;
});

animate();

document.addEventListener('dblclick', () => {
  if (window.innerWidth <= 768) return;
  mouseFollow = !mouseFollow; // 双击切换开关
  console.log("Mouse follow:", mouseFollow ? "ON" : "OFF");
});