/* Capa de datos compartida (localStorage) para Heavenly Dreams.
   Preparada para sustituirse por una API real (n8n, backend, etc.). */

const HD_STORE = (() => {
  const KEYS = {
    candidatos: "hd_candidatos",
    entrevistas: "hd_entrevistas",
    ultimoCandidato: "hd_ultimo_candidato",
  };

  const ESTADOS = [
    "Nuevo registro",
    "Pendiente de agendar",
    "Entrevista agendada",
    "Asistencia confirmada",
    "Reagendar",
    "No asistió",
    "En proceso",
    "Contratado",
    "Descartado",
  ];

  const EMPRESA = {
    nombre: "Heavenly Dreams SAS de CV",
    direccion: "Av. Tláhuac 3632, Int. A 301, Col. Culhuacán, Iztapalapa, CDMX, C.P. 09800",
    telefono: "+52 56 6747 7783",
    whatsapp: "525667477783",
    correo: "Reclutamiento@Heavenlydreams.com.mx",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.+Tlahuac+3632+Iztapalapa+CDMX+09800",
  };

  const VACANTES = [
    {
      id: "ayudante-general",
      titulo: "Ayudante General",
      resumen:
        "Apoya en actividades administrativas y operativas dentro de proyectos de telecomunicaciones. No necesitas experiencia previa.",
      proposito:
        "Brindar soporte operativo y administrativo al equipo, asegurando que los proyectos de telecomunicaciones avancen con orden y puntualidad.",
      funciones: [
        "Apoyo en actividades administrativas y de campo.",
        "Organización de materiales de trabajo.",
        "Soporte al equipo comercial y operativo.",
        "Seguimiento de tareas asignadas por supervisión.",
      ],
      requisitos: [
        "Mayor de 18 años.",
        "Ganas de aprender y crecer.",
        "Disponibilidad de lunes a sábado.",
        "No se requiere experiencia previa.",
      ],
      beneficios: [
        "Capacitación pagada desde el primer día.",
        "Bonos e incentivos por desempeño.",
        "Crecimiento real dentro de la empresa.",
        "Ambiente de trabajo colaborativo.",
      ],
    },
    {
      id: "atencion-cliente",
      titulo: "Atención al Cliente",
      resumen:
        "Sé el primer contacto con los clientes, brinda información clara, seguimiento y asesoría comercial.",
      proposito:
        "Ser la primera línea de contacto con clientes, generando confianza mediante información clara, seguimiento puntual y asesoría comercial.",
      funciones: [
        "Atender e informar a clientes y prospectos.",
        "Dar seguimiento a solicitudes y dudas.",
        "Brindar asesoría comercial sobre servicios de telecomunicaciones.",
        "Registrar interacciones y reportar resultados.",
      ],
      requisitos: [
        "Mayor de 18 años.",
        "Gusto por el trato con personas.",
        "Comunicación clara y actitud de servicio.",
        "Deseable experiencia en atención o ventas (no indispensable).",
      ],
      beneficios: [
        "Capacitación continua en producto y servicio.",
        "Bonos por resultados y reconocimientos.",
        "Plan de crecimiento a posiciones de liderazgo.",
        "Materiales de trabajo incluidos.",
      ],
    },
    {
      id: "supervisor-personal",
      titulo: "Supervisor de Personal",
      resumen:
        "Lidera equipos, supervisa resultados, capacita personal y asegura el cumplimiento de metas.",
      proposito:
        "Liderar y desarrollar equipos comerciales, asegurando el cumplimiento de metas y la calidad de cada proceso.",
      funciones: [
        "Supervisar y acompañar al equipo en campo.",
        "Capacitar e integrar a nuevo personal.",
        "Dar seguimiento a indicadores y metas.",
        "Reportar resultados a coordinación.",
      ],
      requisitos: [
        "Experiencia liderando equipos (deseable en ventas o telecomunicaciones).",
        "Habilidades de comunicación y organización.",
        "Disponibilidad de lunes a sábado.",
        "Orientación a resultados.",
      ],
      beneficios: [
        "Ingresos competitivos con bonos por equipo.",
        "Capacitación en liderazgo.",
        "Crecimiento a coordinación y gerencia.",
        "Reconocimientos por desempeño.",
      ],
    },
  ];

  const HORARIOS = {
    semana: ["09:00", "10:00", "11:00", "12:00", "13:00", "15:00", "16:00", "17:00"],
    sabado: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"],
  };

  function leer(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch (error) {
      return [];
    }
  }

  function guardar(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function uid() {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function getCandidatos() {
    return leer(KEYS.candidatos);
  }

  function getEntrevistas() {
    return leer(KEYS.entrevistas);
  }

  function getVacante(id) {
    return VACANTES.find((vacante) => vacante.id === id) || null;
  }

  function crearCandidato(datos) {
    const candidatos = getCandidatos();
    const candidato = {
      id: uid(),
      estado_candidato: "Pendiente de agendar",
      fecha_registro: new Date().toISOString(),
      ...datos,
    };
    candidatos.push(candidato);
    guardar(KEYS.candidatos, candidatos);
    localStorage.setItem(KEYS.ultimoCandidato, candidato.id);
    return candidato;
  }

  function actualizarCandidato(id, cambios) {
    const candidatos = getCandidatos();
    const indice = candidatos.findIndex((candidato) => candidato.id === id);
    if (indice === -1) return null;
    candidatos[indice] = { ...candidatos[indice], ...cambios };
    guardar(KEYS.candidatos, candidatos);
    return candidatos[indice];
  }

  function getCandidato(id) {
    return getCandidatos().find((candidato) => candidato.id === id) || null;
  }

  function getUltimoCandidato() {
    const id = localStorage.getItem(KEYS.ultimoCandidato);
    return id ? getCandidato(id) : null;
  }

  function crearEntrevista({ candidatoId, fecha, hora }) {
    const entrevistas = getEntrevistas();
    const entrevista = {
      id: uid(),
      candidato_id: candidatoId,
      fecha,
      hora,
      tipo_entrevista: "Presencial",
      direccion: EMPRESA.direccion,
      estado_entrevista: "Agendada",
      confirmacion_asistencia: "Pendiente",
      fecha_creacion: new Date().toISOString(),
    };
    entrevistas.push(entrevista);
    guardar(KEYS.entrevistas, entrevistas);
    actualizarCandidato(candidatoId, {
      estado_candidato: "Entrevista agendada",
      entrevista_fecha: fecha,
      entrevista_hora: hora,
    });
    return entrevista;
  }

  function reagendarEntrevista(candidatoId, fecha, hora) {
    const entrevistas = getEntrevistas();
    const entrevista = entrevistas.find((item) => item.candidato_id === candidatoId);
    if (entrevista) {
      entrevista.fecha = fecha;
      entrevista.hora = hora;
      entrevista.estado_entrevista = "Reagendada";
      guardar(KEYS.entrevistas, entrevistas);
    } else {
      crearEntrevista({ candidatoId, fecha, hora });
      return;
    }
    actualizarCandidato(candidatoId, {
      estado_candidato: "Entrevista agendada",
      entrevista_fecha: fecha,
      entrevista_hora: hora,
    });
  }

  function slotsOcupados(fechaISO) {
    return getEntrevistas()
      .filter((entrevista) => entrevista.fecha === fechaISO)
      .map((entrevista) => entrevista.hora);
  }

  /* Próximos días hábiles (lunes a sábado) para la agenda. */
  function fechasDisponibles(cantidad = 12) {
    const fechas = [];
    const cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    while (fechas.length < cantidad) {
      cursor.setDate(cursor.getDate() + 1);
      if (cursor.getDay() === 0) continue;
      fechas.push(new Date(cursor));
    }
    return fechas;
  }

  function horariosDe(fecha) {
    return fecha.getDay() === 6 ? HORARIOS.sabado : HORARIOS.semana;
  }

  function aISO(fecha) {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatoLargo(fechaISO) {
    const [year, month, day] = fechaISO.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("es-MX", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }

  function linkWhatsApp(mensaje) {
    return `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(mensaje)}`;
  }

  return {
    EMPRESA,
    VACANTES,
    ESTADOS,
    getCandidatos,
    getEntrevistas,
    getVacante,
    getCandidato,
    getUltimoCandidato,
    crearCandidato,
    actualizarCandidato,
    crearEntrevista,
    reagendarEntrevista,
    slotsOcupados,
    fechasDisponibles,
    horariosDe,
    aISO,
    formatoLargo,
    linkWhatsApp,
  };
})();
