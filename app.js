const navLinks = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".menu-toggle");
const chatWidget = document.querySelector("#chat-widget");
const toast = document.querySelector("#toast");
const searchInput = document.querySelector("#job-search");
const areaSelect = document.querySelector("#job-area");
const jobCards = Array.from(document.querySelectorAll(".job-card"));
const jobCount = document.querySelector("#job-count");
const roleInput = document.querySelector("#role-input");

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
