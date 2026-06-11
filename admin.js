/* Panel administrativo de Heavenly Dreams (prototipo, datos en localStorage). */

const SESSION_KEY = "hd_admin_session";
const ACCESS_KEY = "HD2026";

const loginSection = document.querySelector("#admin-login");
const panelSection = document.querySelector("#admin-panel");
const logoutButton = document.querySelector("#logout-button");
const toast = document.querySelector("#toast");

const filtroVacante = document.querySelector("#filter-vacante");
const filtroEstado = document.querySelector("#filter-estado");
const filtroBusqueda = document.querySelector("#filter-busqueda");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

/* ---------- Sesión ---------- */

function sesionActiva() {
  return sessionStorage.getItem(SESSION_KEY) === "ok";
}

function renderSesion() {
  const activa = sesionActiva();
  loginSection.hidden = activa;
  panelSection.hidden = !activa;
  logoutButton.hidden = !activa;
  if (activa) renderPanel();
}

document.querySelector("#login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const clave = document.querySelector("#admin-key").value;
  if (clave === ACCESS_KEY) {
    sessionStorage.setItem(SESSION_KEY, "ok");
    renderSesion();
  } else {
    showToast("Clave incorrecta.");
  }
});

logoutButton.addEventListener("click", () => {
  sessionStorage.removeItem(SESSION_KEY);
  renderSesion();
});

/* ---------- Filtros ---------- */

HD_STORE.VACANTES.forEach((vacante) => {
  filtroVacante.insertAdjacentHTML("beforeend", `<option>${vacante.titulo}</option>`);
});

HD_STORE.ESTADOS.forEach((estado) => {
  filtroEstado.insertAdjacentHTML("beforeend", `<option>${estado}</option>`);
});

[filtroVacante, filtroEstado].forEach((filtro) => filtro.addEventListener("change", renderPanel));
filtroBusqueda.addEventListener("input", renderPanel);

/* ---------- Estadísticas ---------- */

function renderEstadisticas(candidatos) {
  const porEstado = (estado) => candidatos.filter((candidato) => candidato.estado_candidato === estado).length;
  const tarjetas = [
    ["Postulaciones", candidatos.length],
    ["Entrevistas agendadas", porEstado("Entrevista agendada")],
    ["Pendientes de agendar", porEstado("Pendiente de agendar")],
    ["Asistencia confirmada", porEstado("Asistencia confirmada")],
    ["No asistió", porEstado("No asistió")],
    ["Contratados", porEstado("Contratado")],
  ];
  document.querySelector("#admin-stats").innerHTML = tarjetas
    .map(([etiqueta, valor]) => `<article><strong>${valor}</strong><span>${etiqueta}</span></article>`)
    .join("");
}

/* ---------- Tabla de candidatos ---------- */

function candidatosFiltrados() {
  const vacante = filtroVacante.value;
  const estado = filtroEstado.value;
  const busqueda = filtroBusqueda.value.trim().toLowerCase();
  return HD_STORE.getCandidatos()
    .filter((candidato) => !vacante || candidato.vacante_interes === vacante)
    .filter((candidato) => !estado || candidato.estado_candidato === estado)
    .filter((candidato) => {
      if (!busqueda) return true;
      return [candidato.nombre_completo, candidato.telefono, candidato.correo, candidato.whatsapp]
        .filter(Boolean)
        .some((valor) => valor.toLowerCase().includes(busqueda));
    })
    .sort((a, b) => (a.fecha_registro < b.fecha_registro ? 1 : -1));
}

function renderCandidatos() {
  const candidatos = candidatosFiltrados();
  const cuerpo = document.querySelector("#candidates-body");
  document.querySelector("#empty-message").hidden = candidatos.length > 0;

  cuerpo.innerHTML = candidatos
    .map((candidato) => {
      const entrevista = candidato.entrevista_fecha
        ? `${HD_STORE.formatoLargo(candidato.entrevista_fecha)} · ${candidato.entrevista_hora}`
        : "—";
      const opcionesEstado = HD_STORE.ESTADOS.map(
        (estado) => `<option ${estado === candidato.estado_candidato ? "selected" : ""}>${estado}</option>`,
      ).join("");
      return `
        <tr>
          <td><strong>${candidato.nombre_completo}</strong><br /><small class="muted">${candidato.municipio || ""}</small></td>
          <td>${candidato.telefono}<br /><small class="muted">${candidato.correo}</small></td>
          <td>${candidato.vacante_interes || "—"}</td>
          <td><select data-estado="${candidato.id}">${opcionesEstado}</select></td>
          <td>${entrevista}</td>
          <td>${candidato.medio_contacto || "—"}</td>
          <td class="row-actions">
            <button type="button" data-perfil="${candidato.id}" title="Ver perfil">Perfil</button>
            <a href="${HD_STORE.linkWhatsApp(`Hola ${candidato.nombre_completo}, te contactamos de Heavenly Dreams SAS de CV sobre tu proceso de reclutamiento.`)}" target="_blank" rel="noreferrer" title="Enviar WhatsApp">WhatsApp</a>
            <button type="button" data-reagendar="${candidato.id}" title="Reagendar entrevista">Reagendar</button>
            <button type="button" data-contratar="${candidato.id}" title="Marcar como contratado">Contratar</button>
            <button type="button" data-descartar="${candidato.id}" title="Marcar como descartado">Descartar</button>
          </td>
        </tr>`;
    })
    .join("");

  cuerpo.querySelectorAll("[data-estado]").forEach((select) => {
    select.addEventListener("change", () => {
      HD_STORE.actualizarCandidato(select.dataset.estado, { estado_candidato: select.value });
      showToast(`Estado actualizado a "${select.value}".`);
      renderPanel();
    });
  });

  cuerpo.querySelectorAll("[data-perfil]").forEach((boton) => {
    boton.addEventListener("click", () => mostrarPerfil(boton.dataset.perfil));
  });
  cuerpo.querySelectorAll("[data-reagendar]").forEach((boton) => {
    boton.addEventListener("click", () => abrirReagendar(boton.dataset.reagendar));
  });
  cuerpo.querySelectorAll("[data-contratar]").forEach((boton) => {
    boton.addEventListener("click", () => {
      HD_STORE.actualizarCandidato(boton.dataset.contratar, { estado_candidato: "Contratado" });
      showToast("Candidato marcado como contratado.");
      renderPanel();
    });
  });
  cuerpo.querySelectorAll("[data-descartar]").forEach((boton) => {
    boton.addEventListener("click", () => {
      HD_STORE.actualizarCandidato(boton.dataset.descartar, { estado_candidato: "Descartado" });
      showToast("Candidato marcado como descartado.");
      renderPanel();
    });
  });
}

/* ---------- Tabla de entrevistas ---------- */

function renderEntrevistas() {
  const entrevistas = HD_STORE.getEntrevistas().sort((a, b) =>
    `${a.fecha} ${a.hora}` < `${b.fecha} ${b.hora}` ? -1 : 1,
  );
  document.querySelector("#empty-interviews").hidden = entrevistas.length > 0;
  document.querySelector("#interviews-body").innerHTML = entrevistas
    .map((entrevista) => {
      const candidato = HD_STORE.getCandidato(entrevista.candidato_id);
      return `
        <tr>
          <td>${HD_STORE.formatoLargo(entrevista.fecha)}</td>
          <td>${entrevista.hora}</td>
          <td>${candidato ? candidato.nombre_completo : "Candidato eliminado"}</td>
          <td>${candidato ? candidato.vacante_interes : "—"}</td>
          <td>${candidato ? candidato.estado_candidato : "—"}</td>
        </tr>`;
    })
    .join("");
}

/* ---------- Perfil ---------- */

function mostrarPerfil(id) {
  const candidato = HD_STORE.getCandidato(id);
  if (!candidato) return;
  const fila = (etiqueta, valor) => `<p><strong>${etiqueta}:</strong> ${valor || "—"}</p>`;
  document.querySelector("#profile-body").innerHTML = `
    <p class="kicker">Perfil del candidato</p>
    <h3>${candidato.nombre_completo}</h3>
    ${fila("Edad", candidato.edad)}
    ${fila("Teléfono", candidato.telefono)}
    ${fila("WhatsApp", candidato.whatsapp)}
    ${fila("Correo", candidato.correo)}
    ${fila("Ubicación", `${candidato.municipio || ""}, ${candidato.estado || ""}`)}
    ${fila("Vacante de interés", candidato.vacante_interes)}
    ${fila("Experiencia", candidato.experiencia)}
    ${fila("Detalle de experiencia", candidato.descripcion_experiencia)}
    ${fila("Disponibilidad", candidato.disponibilidad)}
    ${fila("Lunes a sábado", candidato.lunes_sabado)}
    ${fila("Fecha de inicio posible", candidato.fecha_inicio)}
    ${fila("Medio de contacto", candidato.medio_contacto)}
    ${fila("Estado", candidato.estado_candidato)}
    ${fila("Registro", new Date(candidato.fecha_registro).toLocaleString("es-MX"))}`;
  abrirModal("#profile-modal");
}

/* ---------- Reagendar ---------- */

let reagendarId = null;
let reagendarFecha = null;
let reagendarHora = null;
const rescheduleDates = document.querySelector("#reschedule-dates");
const rescheduleHours = document.querySelector("#reschedule-hours");
const rescheduleConfirm = document.querySelector("#reschedule-confirm");

function abrirReagendar(id) {
  const candidato = HD_STORE.getCandidato(id);
  if (!candidato) return;
  reagendarId = id;
  reagendarFecha = null;
  reagendarHora = null;
  rescheduleConfirm.disabled = true;
  document.querySelector("#reschedule-candidate").textContent =
    `Candidato: ${candidato.nombre_completo} · Vacante: ${candidato.vacante_interes}`;

  rescheduleDates.innerHTML = HD_STORE.fechasDisponibles(12)
    .map((fecha) => {
      const iso = HD_STORE.aISO(fecha);
      const etiqueta = fecha.toLocaleDateString("es-MX", { weekday: "short", day: "numeric", month: "short" });
      return `<button type="button" class="chip" data-fecha="${iso}">${etiqueta}</button>`;
    })
    .join("");
  rescheduleHours.innerHTML = '<p class="muted">Primero selecciona una fecha.</p>';

  rescheduleDates.querySelectorAll("[data-fecha]").forEach((chip) => {
    chip.addEventListener("click", () => {
      rescheduleDates.querySelectorAll(".chip").forEach((item) => item.classList.remove("active"));
      chip.classList.add("active");
      reagendarFecha = chip.dataset.fecha;
      reagendarHora = null;
      rescheduleConfirm.disabled = true;
      renderHorasReagenda();
    });
  });

  abrirModal("#reschedule-modal");
}

function renderHorasReagenda() {
  const [year, month, day] = reagendarFecha.split("-").map(Number);
  const fecha = new Date(year, month - 1, day);
  const ocupados = HD_STORE.slotsOcupados(reagendarFecha);
  rescheduleHours.innerHTML = HD_STORE.horariosDe(fecha)
    .map((hora) => {
      const ocupado = ocupados.includes(hora);
      return `<button type="button" class="chip" data-hora="${hora}" ${ocupado ? "disabled" : ""}>${hora}${ocupado ? " · Ocupado" : ""}</button>`;
    })
    .join("");

  rescheduleHours.querySelectorAll("[data-hora]").forEach((chip) => {
    chip.addEventListener("click", () => {
      rescheduleHours.querySelectorAll(".chip").forEach((item) => item.classList.remove("active"));
      chip.classList.add("active");
      reagendarHora = chip.dataset.hora;
      rescheduleConfirm.disabled = false;
    });
  });
}

rescheduleConfirm.addEventListener("click", () => {
  if (!reagendarId || !reagendarFecha || !reagendarHora) return;
  HD_STORE.reagendarEntrevista(reagendarId, reagendarFecha, reagendarHora);
  cerrarModales();
  showToast("Entrevista reagendada.");
  renderPanel();
});

/* ---------- Exportar CSV ---------- */

document.querySelector("#export-button").addEventListener("click", () => {
  const candidatos = candidatosFiltrados();
  if (!candidatos.length) {
    showToast("No hay candidatos para exportar.");
    return;
  }
  const columnas = [
    "nombre_completo", "edad", "telefono", "whatsapp", "correo", "municipio", "estado",
    "vacante_interes", "experiencia", "disponibilidad", "fecha_inicio", "medio_contacto",
    "estado_candidato", "entrevista_fecha", "entrevista_hora", "fecha_registro",
  ];
  const escapar = (valor) => `"${String(valor ?? "").replaceAll('"', '""')}"`;
  const csv = [
    columnas.join(","),
    ...candidatos.map((candidato) => columnas.map((columna) => escapar(candidato[columna])).join(",")),
  ].join("\n");
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(new Blob([`﻿${csv}`], { type: "text/csv;charset=utf-8" }));
  enlace.download = `candidatos-heavenly-dreams-${new Date().toISOString().slice(0, 10)}.csv`;
  enlace.click();
  URL.revokeObjectURL(enlace.href);
});

/* ---------- Modales ---------- */

function abrirModal(id) {
  cerrarModales();
  document.querySelector(id).hidden = false;
  document.body.classList.add("modal-open");
}

function cerrarModales() {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.hidden = true;
  });
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-close-modal]").forEach((boton) => boton.addEventListener("click", cerrarModales));
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) cerrarModales();
  });
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") cerrarModales();
});

/* ---------- Render general ---------- */

function renderPanel() {
  renderEstadisticas(HD_STORE.getCandidatos());
  renderCandidatos();
  renderEntrevistas();
}

renderSesion();
