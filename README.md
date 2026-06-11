# Heavenly Dreams Web 2026

Web interactiva de reclutamiento para Heavenly Dreams SAS de CV: página institucional + embudo de postulación con agenda de entrevistas y panel administrativo.

## Ejecutar localmente

```bash
node server.cjs
```

Abrir:

```text
http://127.0.0.1:4173/             # Sitio público
http://127.0.0.1:4173/admin.html   # Panel administrativo (clave de prototipo: HD2026)
```

## Incluye

- Landing institucional: quiénes somos, misión, visión, valores, cultura y aliados comerciales
- Tarjetas de confianza con datos oficiales de la empresa
- 3 vacantes activas con detalle (propósito, funciones, requisitos, beneficios)
- Formulario de postulación por pasos (datos personales → vacante → disponibilidad → consentimiento)
- Aviso de privacidad con checkbox obligatorio
- Agenda de entrevistas con fechas (lunes a sábado) y horarios disponibles
- Confirmación con dirección, Google Maps y mensaje prellenado de WhatsApp
- Asistente tipo chat con opciones rápidas (vacantes, postulación, agenda, ubicación, WhatsApp)
- Panel administrativo: estadísticas, tabla de candidatos con filtros y búsqueda, cambio de estado, reagendado, WhatsApp directo y exportación a CSV
- Estados del candidato: Nuevo registro, Pendiente de agendar, Entrevista agendada, Asistencia confirmada, Reagendar, No asistió, En proceso, Contratado, Descartado

## Arquitectura

- HTML/CSS/JS sin dependencias (servidor estático en `server.cjs`)
- `store.js`: capa de datos compartida (vacantes, candidatos, entrevistas) sobre `localStorage`, lista para sustituirse por una API real (backend, n8n, Google Calendar, WhatsApp Business)
- `app.js`: lógica del sitio público (modales, wizard, agenda, chatbot)
- `admin.js`: lógica del panel administrativo

> Nota: al ser un prototipo sin backend, los datos viven en el navegador (localStorage) y la clave del panel es local. Para producción conecta `store.js` a una API y agrega autenticación real.
