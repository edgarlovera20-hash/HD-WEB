const navLinks = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".menu-toggle");
const chatWidget = document.querySelector("#chat-widget");
const toast = document.querySelector("#toast");
const searchInput = document.querySelector("#job-search");
const areaSelect = document.querySelector("#job-area");
const jobCards = Array.from(document.querySelectorAll(".job-card"));
const jobCount = document.querySelector("#job-count");
const roleInput = document.querySelector("#role-input");
const aetherCanvas = document.querySelector("#aether-canvas");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

function filterJobs() {
  const query = searchInput.value.trim().toLowerCase();
  const area = areaSelect.value;
  let visible = 0;

  jobCards.forEach((card) => {
    const matchesQuery = card.dataset.title.includes(query);
    const matchesArea = area === "todas" || card.dataset.area === area;
    const shouldShow = matchesQuery && matchesArea;
    card.style.display = shouldShow ? "flex" : "none";
    if (shouldShow) visible += 1;
  });

  jobCount.textContent = visible;
}

searchInput.addEventListener("input", filterJobs);
areaSelect.addEventListener("change", filterJobs);

document.querySelectorAll("[data-job]").forEach((button) => {
  button.addEventListener("click", () => {
    roleInput.value = button.dataset.job;
    document.querySelector("#postularme").scrollIntoView({ behavior: "smooth", block: "center" });
    showToast(`Puesto seleccionado: ${button.dataset.job}`);
  });
});

document.querySelectorAll("[data-open-chat]").forEach((button) => {
  button.addEventListener("click", () => chatWidget.classList.add("open"));
});

document.querySelector("[data-close-chat]").addEventListener("click", () => {
  chatWidget.classList.remove("open");
});

document.querySelector("#chat-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#chat-input");
  const messages = document.querySelector("#chat-messages");
  const text = input.value.trim();
  if (!text) return;

  messages.insertAdjacentHTML("beforeend", `<p class="user">${text}</p>`);
  input.value = "";
  window.setTimeout(() => {
    messages.insertAdjacentHTML(
      "beforeend",
      '<p class="bot">Gracias. Por tu perfil, revisaria Ayudante General y Atencion al Cliente. Te recomiendo postularte y adjuntar tus documentos.</p>',
    );
    messages.scrollTop = messages.scrollHeight;
  }, 420);
});

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  showToast("Postulacion recibida en el prototipo. Lista para conectar a Supabase o Firebase.");
  event.currentTarget.reset();
});

document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => showToast(button.dataset.toast));
});

if (window.lucide) {
  window.lucide.createIcons({
    attrs: {
      "stroke-width": 1.9,
    },
  });
}

function initAetherCanvas() {
  if (!aetherCanvas) return;
  const ctx = aetherCanvas.getContext("2d");
  if (!ctx) return;

  const mouse = { x: null, y: null, radius: 180 };
  let particles = [];
  let frameId = 0;

  function resizeCanvas() {
    const rect = aetherCanvas.parentElement.getBoundingClientRect();
    aetherCanvas.width = Math.max(320, Math.floor(rect.width));
    aetherCanvas.height = Math.max(520, Math.floor(rect.height));
    particles = [];
    const particleCount = Math.min(128, Math.max(44, Math.floor((aetherCanvas.width * aetherCanvas.height) / 12000)));
    for (let i = 0; i < particleCount; i += 1) {
      particles.push({
        x: Math.random() * aetherCanvas.width,
        y: Math.random() * aetherCanvas.height,
        vx: Math.random() * 0.4 - 0.2,
        vy: Math.random() * 0.4 - 0.2,
        size: Math.random() * 2 + 1,
      });
    }
  }

  function drawParticle(particle) {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(73, 215, 255, 0.82)";
    ctx.fill();
  }

  function animate() {
    frameId = requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    ctx.fillRect(0, 0, aetherCanvas.width, aetherCanvas.height);

    particles.forEach((particle, index) => {
      if (particle.x > aetherCanvas.width || particle.x < 0) particle.vx *= -1;
      if (particle.y > aetherCanvas.height || particle.y < 0) particle.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          particle.x -= (dx / distance) * force * 4;
          particle.y -= (dy / distance) * force * 4;
        }
      }

      particle.x += particle.vx;
      particle.y += particle.vy;
      drawParticle(particle);

      for (let next = index; next < particles.length; next += 1) {
        const other = particles[next];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = dx * dx + dy * dy;
        if (distance < 9000) {
          ctx.strokeStyle = `rgba(47, 140, 255, ${1 - distance / 9000})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }
    });
  }

  function updateMouse(event) {
    const rect = aetherCanvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
  }

  resizeCanvas();
  animate();
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("mousemove", updateMouse);
  window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
  });
  window.addEventListener("pagehide", () => cancelAnimationFrame(frameId), { once: true });
}

initAetherCanvas();
