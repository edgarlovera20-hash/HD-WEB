# Heavenly Dreams Web 2026

Sitio corporativo y prototipo historico de captacion/reclutamiento para Heavenly Dreams SAS de CV.

## Estado arquitectonico

Este repositorio queda alineado al ecosistema enterprise de 7 plataformas. Su responsabilidad final debe ser exclusivamente:

```text
heavenlydreams.com.mx
Sitio corporativo, marketing, SEO, landing pages, formularios publicos y lead generation.
```

Las capacidades internas deben migrarse a plataformas separadas:

```text
rh.heavenlydreams.com.mx     -> RHDREAMSAPP2026
app.heavenlydreams.com.mx    -> HD-OPERATIONS
admin.heavenlydreams.com.mx  -> HD-ADMIN
crm.heavenlydreams.com.mx    -> HD-CRM
core.heavenlydreams.com.mx   -> HD-CORE
brain.heavenlydreams.com.mx  -> HD-BRAIN
```

## Ejecutar localmente

```bash
node server.cjs
```

Abrir:

```text
http://127.0.0.1:4173/             # Sitio publico
http://127.0.0.1:4173/admin.html   # Panel administrativo de prototipo
```

## Advertencia de produccion

El panel administrativo, el uso de `localStorage`, `sessionStorage` y cualquier clave local son aceptables solo como prototipo. Para produccion deben reemplazarse por API real, autenticacion backend, RBAC, auditoria y contratos compartidos desde HD-CORE.

## Documentacion enterprise

```text
docs/ENTERPRISE_ARCHITECTURE.md
docs/ECOSYSTEM_7_PLATFORMS.md
docs/RESTRUCTURING_BACKLOG.md
```

## Contratos iniciales

```text
contracts/platforms/platform-boundaries.v1.json
contracts/rbac/permissions.v1.json
contracts/events/ecosystem-events.v1.json
contracts/api/hd-crm.openapi.yaml
contracts/api/hd-brain.openapi.yaml
```

## Blueprints

```text
blueprints/HD-CRM/README.md
blueprints/HD-BRAIN/README.md
```

## Incluye actualmente

- Landing institucional: quienes somos, mision, vision, valores, cultura y aliados comerciales.
- Tarjetas de confianza con datos oficiales de la empresa.
- Vacantes activas con detalle.
- Formulario de postulacion por pasos.
- Aviso de privacidad con checkbox obligatorio.
- Agenda de entrevistas.
- Confirmacion con direccion, Google Maps y mensaje prellenado de WhatsApp.
- Asistente tipo chat con opciones rapidas.
- Panel administrativo de prototipo.

## Arquitectura actual

- HTML/CSS/JS sin dependencias.
- Servidor estatico en `server.cjs`.
- `store.js`: capa de datos compartida sobre `localStorage`.
- `app.js`: logica del sitio publico.
- `admin.js`: logica del panel administrativo de prototipo.

## Proxima migracion recomendada

1. Congelar nuevas funcionalidades internas en este repo.
2. Mantener solo sitio corporativo y formularios publicos.
3. Enviar leads de clientes hacia HD-CRM.
4. Enviar postulaciones hacia RHDREAMSAPP2026.
5. Reemplazar almacenamiento local por API Gateway.
6. Consumir diseno, validaciones y auth desde HD-CORE.
