# Arquitectura Empresarial Heavenly Dreams

## Diagnóstico

El ecosistema Heavenly Dreams debe evolucionar desde aplicaciones aisladas hacia una arquitectura empresarial compuesta por 7 plataformas especializadas, servicios compartidos, diseño consistente, seguridad centralizada, automatizaciones reutilizables, CRM independiente e inteligencia artificial transversal.

El repositorio `HEAVENLY-DREAMS-WEB-2026` funciona actualmente como sitio corporativo y prototipo de reclutamiento. En producción debe limitarse a marketing, captación, SEO, formularios públicos y generación de leads. Las capacidades internas de RH, administración, operación, CRM de clientes/morosos y control global deben migrarse a plataformas separadas.

## Riesgos

- Mezclar sitio público con panel administrativo incrementa superficie de ataque.
- Mantener datos críticos en navegador impide auditoría, trazabilidad y seguridad real.
- Duplicar componentes visuales en varios repositorios provocará inconsistencias de marca.
- Crear módulos de operaciones, administración, CRM y control total dentro del mismo frontend generará acoplamiento y deuda técnica.
- Implementar IA sin contratos de datos, permisos y auditoría puede producir resultados no confiables.
- Permitir agentes que contacten clientes sin reglas de consentimiento, horario, auditoría y supervisión puede crear riesgo legal, reputacional y operativo.

## Solución Propuesta

Adoptar la siguiente separación enterprise de 7 plataformas:

```text
heavenlydreams.com.mx        -> Sitio corporativo y marketing
rh.heavenlydreams.com.mx     -> Plataforma de reclutamiento
app.heavenlydreams.com.mx    -> Plataforma operativa
admin.heavenlydreams.com.mx  -> Plataforma administrativa
crm.heavenlydreams.com.mx    -> CRM de clientes, seguimiento y morosos
core.heavenlydreams.com.mx   -> Servicios y librerías compartidas
brain.heavenlydreams.com.mx  -> Cerebro de control total
```

### Repositorios objetivo

```text
HEAVENLY-DREAMS-WEB-2026 -> Marketing, SEO, formularios y lead generation
RHDREAMSAPP2026          -> Reclutamiento, candidatos, entrevistas y expedientes
HD-OPERATIONS            -> Agenda, operación diaria, productividad, supervisor y tareas
HD-ADMIN                 -> Finanzas, usuarios, permisos, auditoría, integraciones y BI
HD-CRM                   -> Clientes nuevos, clientes activos, morosos, cobranza y seguimiento
HD-CORE                  -> Auth, RBAC, API client, tipos, hooks, utilidades y design system
HD-BRAIN                 -> Control tower, KPIs globales, agentes, riesgos y automatización estratégica
```

## Principios obligatorios

1. Ningún módulo administrativo global debe vivir en operaciones.
2. Ningún módulo operativo debe vivir en administración salvo analítica consolidada.
3. El CRM de clientes y morosos debe vivir en `HD-CRM`, no dentro de Operaciones ni Admin.
4. RH, Operations, Admin, CRM y Brain deben consumir autenticación, permisos, diseño y API client desde HD-CORE.
5. El sitio público no debe guardar datos sensibles en cliente.
6. Toda lógica de negocio debe vivir detrás de APIs versionadas.
7. Todo formulario debe validar con esquemas compartidos.
8. Todo módulo debe tener dueño de dominio, permisos y eventos auditables.
9. La IA debe operar como capa transversal, no como lógica embebida en componentes UI.
10. HD-BRAIN observa, coordina, recomienda y dispara automatizaciones aprobadas; no reemplaza a las plataformas de dominio.

## Arquitectura Tecnológica Objetivo

### Frontend

- Next.js
- React
- TypeScript
- TailwindCSS
- Shadcn/UI
- TanStack Query
- React Hook Form
- Zod

### Backend

- NestJS
- Prisma
- PostgreSQL
- Redis
- BullMQ
- WebSockets

### Infraestructura

- Docker
- Docker Compose
- GitHub Actions
- Vercel
- Cloudflare
- AWS o DigitalOcean
- MinIO

## HD-CORE

HD-CORE será la fuente única para diseño, seguridad y utilidades.

### Paquetes recomendados

```text
@hd/core-auth
@hd/core-rbac
@hd/core-api
@hd/core-ui
@hd/core-theme
@hd/core-icons
@hd/core-types
@hd/core-validation
@hd/core-hooks
@hd/core-utils
@hd/core-events
```

### Design System base

```text
Buttons
Inputs
Selects
Tables
Cards
Modals
Layouts
Icons
Typography
Theme
```

### Tokens de marca

```text
Primary: Heavenly Blue
Secondary: Dream Gold
Neutral: Slate / Zinc
Success: Emerald
Warning: Amber
Danger: Rose
Font: Inter o Geist Sans
Radius: 0.75rem / 1rem
Spacing: escala Tailwind estándar
```

## HD-CRM

HD-CRM será la plataforma independiente para clientes nuevos, clientes activos, seguimiento, morosos, promesas de pago, conversaciones, historial de contacto, campañas, recordatorios y agentes que inician conversaciones bajo reglas de negocio.

### Módulos recomendados

```text
Clientes Nuevos
Clientes Activos
Clientes Morosos
Cartera Vencida
Seguimiento
Promesas de Pago
Historial de Contacto
Conversaciones
Campañas
Recordatorios
Segmentación
Scoring de Riesgo
Asignación de Agentes Humanos
Plantillas de Mensajes
Bandeja Omnicanal
Reportes CRM
Auditoría de Contacto
```

### Agentes CRM

```text
Client Follow-up Agent
Collections Agent
Conversation Starter Agent
Retention Agent
Supervisor CRM Agent
```

### Reglas de contacto

- Contactar solo clientes con consentimiento, base legal o relación comercial registrada.
- Respetar horarios configurables por país, estado y política interna.
- Usar plantillas aprobadas.
- Registrar cada intento de contacto.
- Permitir transferencia a humano.
- Evitar lenguaje amenazante, engañoso, discriminatorio o agresivo.
- Respetar listas de exclusión y bajas.
- Auditar todo contacto con clientes morosos.

## HD-BRAIN

HD-BRAIN será el cerebro de control total del ecosistema, pero con límites estrictos de seguridad y gobierno.

### Responsabilidad

```text
Control Tower
Mapa del Ecosistema
Monitoreo Global
KPIs Globales
Alertas Estratégicas
Centro de Agentes IA
Orquestador de Automatizaciones
Reglas de Negocio
Auditoría Inteligente
Bitácora de Decisiones
Salud de Servicios
Costos de IA
Riesgos Operativos
Predicciones
Recomendaciones Ejecutivas
```

### Reglas obligatorias

- No puede saltarse RBAC.
- No puede borrar datos transaccionales.
- No puede modificar finanzas sin autorización explícita.
- No puede contactar clientes directamente; debe pasar por HD-CRM.
- No puede contratar o descartar candidatos directamente; debe pasar por RH.
- No puede cambiar roles globales sin Admin.
- Toda acción debe quedar auditada.
- Toda recomendación debe explicar origen, datos usados y nivel de confianza.

## Capa de IA

La IA debe exponerse mediante un servicio backend con permisos, auditoría y límites.

```text
RH Agent          -> Matching, scoring y análisis CV
Sales Agent       -> Lead scoring y recomendaciones comerciales
CRM Agent         -> Seguimiento, morosidad, retención y conversaciones aprobadas
Supervisor Agent  -> Productividad, alertas y desempeño
Finance Agent     -> Proyecciones y flujo de efectivo
Executive Agent   -> KPIs, resúmenes ejecutivos y alertas estratégicas
Brain Agent       -> Coordinación de agentes, riesgos y automatización global
```

### Reglas de IA

- No acceder a datos sin autorización RBAC.
- Registrar prompt, usuario, contexto, modelo, resultado y costo.
- Separar decisiones automáticas de recomendaciones.
- Mantener revisión humana para contratación, finanzas, cobranza y decisiones sensibles.

## Automatización

n8n será el orquestador central para integraciones y workflows.

```text
WhatsApp
Facebook
Instagram
TikTok
Google Calendar
Google Drive
Outlook
Teams
CRM
Finanzas
RH
Operaciones
Brain
```

### Workflows iniciales

1. Nuevo lead web -> CRM -> asignación -> notificación.
2. Nueva postulación -> RH -> agenda entrevista -> Calendar.
3. Cliente moroso detectado -> CRM -> segmentación -> conversación aprobada -> seguimiento humano.
4. Promesa de pago incumplida -> CRM -> alerta supervisor -> workflow n8n.
5. Candidato contratado -> expediente -> nómina -> administración.
6. Venta cerrada -> comisión -> reporte supervisor.
7. Alerta financiera -> Finance Agent -> dashboard ejecutivo.
8. Riesgo global detectado -> HD-BRAIN -> alerta estratégica.

## Plan de Implementación

### Fase 1: Gobierno arquitectónico

- Crear este documento como contrato base.
- Crear matriz de responsabilidades por repositorio.
- Congelar creación de nuevos módulos fuera de su dominio.
- Definir estándares de ramas, PR, naming, commits y releases.

### Fase 2: Seguridad centralizada

- Mover autenticación a backend.
- Reemplazar claves locales por JWT, refresh tokens y RBAC.
- Crear modelo de usuarios, roles, permisos y auditoría.
- Eliminar almacenamiento sensible en localStorage/sessionStorage.

### Fase 3: HD-CORE

- Crear repositorio HD-CORE.
- Publicar design tokens, UI primitives, validadores y tipos.
- Migrar componentes repetidos desde RH, Admin, CRM, Brain y Operations.
- Documentar uso con Storybook.

### Fase 4: HD-CRM

- Crear repositorio HD-CRM.
- Diseñar modelo de clientes, cartera, seguimiento, conversaciones y promesas de pago.
- Crear permisos CRM y auditoría de contacto.
- Crear agentes de seguimiento y morosidad con revisión humana.
- Integrar n8n, WhatsApp, email y reportes.

### Fase 5: Separación de plataformas

- HEAVENLY-DREAMS-WEB-2026: solo marketing y formularios.
- RHDREAMSAPP2026: reclutamiento completo.
- HD-OPERATIONS: operación diaria sin CRM de morosos.
- HD-ADMIN: administración central, integraciones y BI.
- HD-CRM: clientes, seguimiento, morosos y conversaciones.
- HD-BRAIN: control tower y coordinación global.

### Fase 6: Backend enterprise

- Crear API Gateway.
- Implementar servicios NestJS por dominio.
- Usar PostgreSQL como fuente transaccional.
- Usar Redis/BullMQ para colas, notificaciones y procesos pesados.

### Fase 7: IA y automatización

- Crear servicio transversal de agentes.
- Conectar n8n con eventos de negocio.
- Implementar auditoría y trazabilidad.
- Crear tableros de KPIs por dominio.
- Implementar HD-BRAIN cuando existan datos confiables y eventos auditables.

## Impacto

- Menor deuda técnica.
- Mejor separación de responsabilidades.
- CRM especializado para clientes nuevos y morosos.
- Seguridad real para datos de candidatos, clientes y finanzas.
- Reutilización de diseño y lógica común.
- Escalabilidad para nuevas sedes, productos y países.
- Preparación para IA, automatización y analítica avanzada.
- Control total con gobierno, no con acoplamiento.

## Prioridad

Alta.

## Estimación

- Gobierno y documentación: baja complejidad.
- Seguridad centralizada: alta complejidad.
- HD-CORE: media/alta complejidad.
- HD-CRM: alta complejidad.
- Separación de plataformas: alta complejidad.
- Backend enterprise: alta complejidad.
- HD-BRAIN: alta complejidad.
- IA y automatización: media/alta complejidad.

## Checklist obligatorio para cada cambio

Antes de aprobar cualquier módulo, PR o refactor, validar:

- Deuda técnica
- Escalabilidad
- Seguridad
- Duplicación de código
- Consistencia visual
- UX/UI
- Impacto cross-repo
- Refactor requerido
- Automatización posible
- Alineación con HD-CORE
- Alineación con HD-CRM cuando involucre clientes
- Alineación con HD-BRAIN cuando involucre control global, KPIs o agentes
