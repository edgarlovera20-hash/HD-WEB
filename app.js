const canvas = document.querySelector("#particle-stage");
const ctx = canvas.getContext("2d");
const nav = document.querySelector("#site-nav");
const menuButton = document.querySelector(".menu-button");
const chatWidget = document.querySelector("#chat-widget");
const toast = document.querySelector("#toast");

let particles = [];
const pointer = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const count = Math.min(150, Math.max(56, Math.floor((canvas.width * canvas.height) / 11500)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: Math.random() * 0.42 - 0.21,
    vy: Math.random() * 0.42 - 0.21,
    r: Math.random() * 2.2 + 0.8,
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height * 0.22, 20, canvas.width / 2, canvas.height * 0.22, canvas.width);
  gradient.addColorStop(0, "rgba(22, 132, 255, 0.18)");
  gradient.addColorStop(1, "rgba(2, 6, 18, 0.04)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

    if (pointer.x !== null) {
      const dx = pointer.x - particle.x;
      const dy = pointer.y - particle.y;
      const distance = Math.hypot(dx, dy) || 1;
      if (distance < 180) {
        const push = (180 - distance) / 180;
        particle.x -= (dx / distance) * push * 2.4;
        particle.y -= (dy / distance) * push * 2.4;
      }
    }

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(57, 220, 255, 0.78)";
    ctx.fill();

    for (let next = index + 1; next < particles.length; next += 1) {
      const other = particles[next];
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = dx * dx + dy * dy;
      if (distance < 9800) {
        ctx.strokeStyle = `rgba(22, 132, 255, ${1 - distance / 9800})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawParticles);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 3200);
}

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a, button").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

function activarTilt(scope = document) {
  scope.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateX(${y * -10}deg) rotateY(${x * 12}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

activarTilt();

const sceneObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.18 },
);

document.querySelectorAll("[data-scene]").forEach((scene) => sceneObserver.observe(scene));

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.done) return;
      entry.target.dataset.done = "true";
      const textValue = entry.target.dataset.text;
      if (textValue) {
        window.setTimeout(() => {
          entry.target.textContent = textValue;
        }, 520);
        return;
      }

      const target = Number(entry.target.dataset.count);
      const suffix = entry.target.dataset.suffix || "";
      const started = performance.now();
      const duration = 1300;

      function tick(now) {
        const progress = Math.min(1, (now - started) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        entry.target.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    });
  },
  { threshold: 0.55 },
);

document.querySelectorAll("[data-count], [data-text]").forEach((counter) => countObserver.observe(counter));

/* ---------- Modales ---------- */

function abrirModal(id) {
  cerrarModales();
  const modal = document.querySelector(id);
  modal.hidden = false;
  document.body.classList.add("modal-open");
}

function cerrarModales() {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.hidden = true;
  });
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", cerrarModales);
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) cerrarModales();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") cerrarModales();
});

document.querySelectorAll("[data-open-privacy]").forEach((button) => {
  button.addEventListener("click", () => abrirModal("#privacy-modal"));
});

/* ---------- Vacantes ---------- */

const vacancyGrid = document.querySelector("#vacancy-grid");

function renderVacantes() {
  vacancyGrid.innerHTML = HD_STORE.VACANTES.map(
    (vacante) => `
      <article class="vacancy-card" data-tilt>
        <span class="vacancy-tag">Vacante activa</span>
        <h3>${vacante.titulo}</h3>
        <p>${vacante.resumen}</p>
        <div class="vacancy-actions">
          <button class="button ghost" type="button" data-vacancy-detail="${vacante.id}">Ver detalles</button>
          <button class="button primary" type="button" data-vacancy-apply="${vacante.id}">Postularme</button>
        </div>
      </article>`,
  ).join("");
  activarTilt(vacancyGrid);

  vacancyGrid.querySelectorAll("[data-vacancy-detail]").forEach((button) => {
    button.addEventListener("click", () => mostrarDetalleVacante(button.dataset.vacancyDetail));
  });
  vacancyGrid.querySelectorAll("[data-vacancy-apply]").forEach((button) => {
    button.addEventListener("click", () => abrirPostulacion(button.dataset.vacancyApply));
  });
}

function mostrarDetalleVacante(id) {
  const vacante = HD_STORE.getVacante(id);
  if (!vacante) return;
  const lista = (items) => `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  document.querySelector("#vacancy-modal-body").innerHTML = `
    <p class="kicker">Vacante</p>
    <h3 id="vacancy-modal-title">${vacante.titulo}</h3>
    <p>${vacante.proposito}</p>
    <h4>Funciones</h4>${lista(vacante.funciones)}
    <h4>Requisitos</h4>${lista(vacante.requisitos)}
    <h4>Beneficios</h4>${lista(vacante.beneficios)}
    <div class="modal-actions">
      <button class="button accent full" type="button" data-vacancy-apply="${vacante.id}">Postularme a esta vacante</button>
    </div>`;
  document
    .querySelector("#vacancy-modal-body [data-vacancy-apply]")
    .addEventListener("click", () => abrirPostulacion(vacante.id));
  abrirModal("#vacancy-modal");
}

renderVacantes();

/* ---------- Formulario de postulación por pasos ---------- */

const applyForm = document.querySelector("#apply-form");
const wizardBack = document.querySelector("#wizard-back");
const wizardNext = document.querySelector("#wizard-next");
const wizardSubmit = document.querySelector("#wizard-submit");
const vacancyOptions = document.querySelector("#vacancy-options");
let pasoActual = 1;
let vacanteSeleccionada = "";

vacancyOptions.innerHTML = HD_STORE.VACANTES.map(
  (vacante) => `
    <label class="option-card">
      <input type="radio" name="vacante_interes" value="${vacante.titulo}" required />
      <strong>${vacante.titulo}</strong>
      <span>${vacante.resumen}</span>
    </label>`,
).join("");

function abrirPostulacion(vacanteId = "") {
  vacanteSeleccionada = vacanteId;
  pasoActual = 1;
  applyForm.reset();
  if (vacanteId) {
    const vacante = HD_STORE.getVacante(vacanteId);
    const radio = applyForm.querySelector(`input[name="vacante_interes"][value="${vacante.titulo}"]`);
    if (radio) radio.checked = true;
  }
  mostrarPaso(1);
  abrirModal("#apply-modal");
}

document.querySelectorAll("[data-open-apply]").forEach((button) => {
  button.addEventListener("click", () => abrirPostulacion());
});

function mostrarPaso(paso) {
  pasoActual = paso;
  applyForm.querySelectorAll("fieldset").forEach((fieldset) => {
    fieldset.hidden = Number(fieldset.dataset.step) !== paso;
  });
  document.querySelectorAll("[data-step-dot]").forEach((dot) => {
    dot.classList.toggle("active", Number(dot.dataset.stepDot) <= paso);
  });
  wizardBack.hidden = paso === 1;
  wizardNext.hidden = paso === 4;
  wizardSubmit.hidden = paso !== 4;
  if (paso === 4) renderResumen();
}

function validarPaso(paso) {
  const fieldset = applyForm.querySelector(`fieldset[data-step="${paso}"]`);
  const campos = fieldset.querySelectorAll("input, select, textarea");
  for (const campo of campos) {
    if (!campo.checkValidity()) {
      campo.reportValidity();
      return false;
    }
  }
  if (paso === 2 && !applyForm.querySelector('input[name="vacante_interes"]:checked')) {
    showToast("Selecciona la vacante de tu interés.");
    return false;
  }
  return true;
}

function renderResumen() {
  const datos = Object.fromEntries(new FormData(applyForm).entries());
  document.querySelector("#apply-summary").innerHTML = `
    <p><strong>${datos.nombre_completo || ""}</strong> · ${datos.edad || ""} años</p>
    <p>${datos.telefono || ""} · ${datos.correo || ""}</p>
    <p>${datos.municipio || ""}, ${datos.estado || ""}</p>
    <p>Vacante: <strong>${datos.vacante_interes || "Sin seleccionar"}</strong> · Experiencia: ${datos.experiencia || ""}</p>
    <p>Disponibilidad: ${datos.disponibilidad || ""} · Inicio: ${datos.fecha_inicio || ""} · Contacto por ${datos.medio_contacto || ""}</p>`;
}

wizardNext.addEventListener("click", () => {
  if (!validarPaso(pasoActual)) return;
  mostrarPaso(pasoActual + 1);
});

wizardBack.addEventListener("click", () => mostrarPaso(Math.max(1, pasoActual - 1)));

applyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validarPaso(4)) return;
  const datos = Object.fromEntries(new FormData(applyForm).entries());
  delete datos.acepta_privacidad;
  const candidato = HD_STORE.crearCandidato(datos);

  const mensaje = `Hola, soy ${candidato.nombre_completo} y acabo de postularme a la vacante de ${candidato.vacante_interes} en Heavenly Dreams SAS de CV.`;
  document.querySelector("#success-whatsapp").href = HD_STORE.linkWhatsApp(mensaje);

  abrirModal("#success-modal");
  showToast("Postulación enviada correctamente.");
});

/* ---------- Agenda de entrevista ---------- */

const scheduleDates = document.querySelector("#schedule-dates");
const scheduleHours = document.querySelector("#schedule-hours");
const scheduleSummary = document.querySelector("#schedule-summary");
const scheduleConfirm = document.querySelector("#schedule-confirm");
let agendaFecha = null;
let agendaHora = null;

function abrirAgenda() {
  const candidato = HD_STORE.getUltimoCandidato();
  if (!candidato) {
    showToast("Primero completa tu postulación para agendar tu entrevista.");
    abrirPostulacion();
    return;
  }
  agendaFecha = null;
  agendaHora = null;
  scheduleConfirm.disabled = true;
  scheduleSummary.hidden = true;
  document.querySelector("#schedule-candidate").textContent =
    `Candidato: ${candidato.nombre_completo} · Vacante: ${candidato.vacante_interes}`;
  renderFechas();
  scheduleHours.innerHTML = '<p class="muted">Primero selecciona una fecha.</p>';
  abrirModal("#schedule-modal");
}

document.querySelectorAll("[data-open-schedule]").forEach((button) => {
  button.addEventListener("click", abrirAgenda);
});

function renderFechas() {
  const fechas = HD_STORE.fechasDisponibles(12);
  scheduleDates.innerHTML = fechas
    .map((fecha) => {
      const iso = HD_STORE.aISO(fecha);
      const etiqueta = fecha.toLocaleDateString("es-MX", { weekday: "short", day: "numeric", month: "short" });
      return `<button type="button" class="chip" data-fecha="${iso}">${etiqueta}</button>`;
    })
    .join("");

  scheduleDates.querySelectorAll("[data-fecha]").forEach((chip) => {
    chip.addEventListener("click", () => {
      scheduleDates.querySelectorAll(".chip").forEach((item) => item.classList.remove("active"));
      chip.classList.add("active");
      agendaFecha = chip.dataset.fecha;
      agendaHora = null;
      scheduleConfirm.disabled = true;
      scheduleSummary.hidden = true;
      renderHorarios();
    });
  });
}

function renderHorarios() {
  const [year, month, day] = agendaFecha.split("-").map(Number);
  const fecha = new Date(year, month - 1, day);
  const ocupados = HD_STORE.slotsOcupados(agendaFecha);
  scheduleHours.innerHTML = HD_STORE.horariosDe(fecha)
    .map((hora) => {
      const ocupado = ocupados.includes(hora);
      return `<button type="button" class="chip" data-hora="${hora}" ${ocupado ? "disabled" : ""}>${hora} ${ocupado ? "· Ocupado" : ""}</button>`;
    })
    .join("");

  scheduleHours.querySelectorAll("[data-hora]").forEach((chip) => {
    chip.addEventListener("click", () => {
      scheduleHours.querySelectorAll(".chip").forEach((item) => item.classList.remove("active"));
      chip.classList.add("active");
      agendaHora = chip.dataset.hora;
      scheduleSummary.hidden = false;
      scheduleSummary.innerHTML = `<p>Entrevista: <strong>${HD_STORE.formatoLargo(agendaFecha)}</strong> a las <strong>${agendaHora}</strong></p>`;
      scheduleConfirm.disabled = false;
    });
  });
}

scheduleConfirm.addEventListener("click", () => {
  const candidato = HD_STORE.getUltimoCandidato();
  if (!candidato || !agendaFecha || !agendaHora) return;
  HD_STORE.crearEntrevista({ candidatoId: candidato.id, fecha: agendaFecha, hora: agendaHora });

  document.querySelector("#confirmation-detail").innerHTML =
    `Fecha: <strong>${HD_STORE.formatoLargo(agendaFecha)}</strong> · Hora: <strong>${agendaHora}</strong>`;

  const mensaje =
    `Hola, gracias por postularte a Heavenly Dreams SAS de CV. ` +
    `Mi entrevista quedó agendada para el día ${HD_STORE.formatoLargo(agendaFecha)} a las ${agendaHora}. ` +
    `Confirmo asistencia.`;
  document.querySelector("#confirmation-whatsapp").href = HD_STORE.linkWhatsApp(mensaje);

  abrirModal("#confirmation-modal");
  showToast("Entrevista agendada correctamente.");
});

/* ---------- Asistente / chatbot ---------- */

document.querySelectorAll("[data-open-chat]").forEach((button) => {
  button.addEventListener("click", () => chatWidget.classList.add("open"));
});

document.querySelector("[data-close-chat]").addEventListener("click", () => {
  chatWidget.classList.remove("open");
});

const chatMessages = document.querySelector("#chat-messages");

function chatBot(texto) {
  window.setTimeout(() => {
    chatMessages.insertAdjacentHTML("beforeend", `<p class="bot">${texto}</p>`);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 320);
}

function chatUsuario(texto) {
  chatMessages.insertAdjacentHTML("beforeend", `<p class="user">${texto}</p>`);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

const accionesChat = {
  vacantes() {
    chatBot(
      `Tenemos ${HD_STORE.VACANTES.length} vacantes activas: ${HD_STORE.VACANTES.map((vacante) => vacante.titulo).join(", ")}. Te llevo a la sección de vacantes.`,
    );
    window.setTimeout(() => {
      chatWidget.classList.remove("open");
      document.querySelector("#vacantes").scrollIntoView({ behavior: "smooth" });
    }, 1400);
  },
  postularme() {
    chatBot("Perfecto, abriré el formulario de postulación. Solo toma unos minutos.");
    window.setTimeout(() => {
      chatWidget.classList.remove("open");
      abrirPostulacion();
    }, 1200);
  },
  agendar() {
    chatBot("Te abro la agenda para que elijas fecha y hora de tu entrevista.");
    window.setTimeout(() => {
      chatWidget.classList.remove("open");
      abrirAgenda();
    }, 1200);
  },
  ubicacion() {
    chatBot(
      `Nos encuentras en ${HD_STORE.EMPRESA.direccion}. <a href="${HD_STORE.EMPRESA.mapsUrl}" target="_blank" rel="noreferrer">Abrir en Google Maps</a>`,
    );
  },
  whatsapp() {
    chatBot("Abriendo WhatsApp oficial de reclutamiento...");
    window.setTimeout(() => {
      window.open(HD_STORE.linkWhatsApp("Hola, me interesa información sobre las vacantes de Heavenly Dreams."), "_blank");
    }, 800);
  },
};

document.querySelectorAll("[data-chat-option]").forEach((button) => {
  button.addEventListener("click", () => {
    chatUsuario(button.textContent.trim());
    accionesChat[button.dataset.chatOption]();
  });
});

document.querySelector("#chat-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#chat-input");
  const value = input.value.trim();
  if (!value) return;
  chatUsuario(value);
  input.value = "";

  const texto = value.toLowerCase();
  if (texto.includes("vacante") || texto.includes("empleo") || texto.includes("trabajo")) {
    accionesChat.vacantes();
  } else if (texto.includes("postul")) {
    accionesChat.postularme();
  } else if (texto.includes("entrevista") || texto.includes("agendar") || texto.includes("cita")) {
    accionesChat.agendar();
  } else if (texto.includes("ubicaci") || texto.includes("direcci") || texto.includes("donde") || texto.includes("dónde")) {
    accionesChat.ubicacion();
  } else if (texto.includes("whatsapp") || texto.includes("telefono") || texto.includes("teléfono")) {
    accionesChat.whatsapp();
  } else {
    chatBot(
      "Puedo ayudarte con: ver vacantes, postularte, agendar entrevista, ubicación o contacto por WhatsApp. Usa los botones de abajo para una respuesta rápida.",
    );
  }
});

window.addEventListener("resize", resizeCanvas);
window.addEventListener("mousemove", (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
});
window.addEventListener("mouseout", () => {
  pointer.x = null;
  pointer.y = null;
});

resizeCanvas();
drawParticles();
