const video = document.getElementById("video");
const title = document.getElementById("birthdayText");
const section = document.querySelector(".animation-section");
const message = document.querySelector(".message-section");

video.addEventListener("loadedmetadata", () => {

  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight - window.innerHeight;

  window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    // hitung progress hanya saat di dalam animation-section
    let progress = (scrollY - sectionTop) / sectionHeight;
    progress = Math.min(Math.max(progress, 0), 1);

    video.currentTime = video.duration * progress;

    // Title + sprinkle
    if (progress > 0.8 && progress < 0.98) {
  title.style.opacity = 1;
  title.style.transform = "translate(-50%, 0)";
  startSprinkle();
} else {
  title.style.opacity = 0;
  title.style.transform = "translate(-50%, -30px)";
  stopSprinkle();
}

    // Message muncul setelah video selesai
    if (progress >= 0.98) {
      message.style.opacity = 1;
    } else {
      message.style.opacity = 0;
    }

  });

});

const sprinkleCanvas = document.getElementById("sprinkle");
const sctx = sprinkleCanvas.getContext("2d");

sprinkleCanvas.width = window.innerWidth;
sprinkleCanvas.height = window.innerHeight;

let particles = [];
let running = false;

function createParticles() {
  particles = [];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * sprinkleCanvas.width,
      y: Math.random() * sprinkleCanvas.height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 1 + 0.5,
      opacity: Math.random()
    });
  }
}

function animateParticles() {
  if (!running) return;

  sctx.clearRect(0, 0, sprinkleCanvas.width, sprinkleCanvas.height);

  particles.forEach(p => {
    p.y += p.speedY;
    if (p.y > sprinkleCanvas.height) p.y = 0;

    sctx.beginPath();
    sctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    sctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
    sctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

function startSprinkle() {
  if (!running) {
    running = true;
    createParticles();
    animateParticles();
  }
}

function stopSprinkle() {
  running = false;
  sctx.clearRect(0, 0, sprinkleCanvas.width, sprinkleCanvas.height);
}
