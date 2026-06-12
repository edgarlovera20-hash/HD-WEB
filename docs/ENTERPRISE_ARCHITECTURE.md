# Arquitectura Empresarial Heavenly Dreams

## Diagnóstico

El ecosistema Heavenly Dreams debe evolucionar desde aplicaciones aisladas hacia una arquitectura empresarial compuesta por plataformas especializadas, servicios compartidos, diseño consistente, seguridad centralizada, automatizaciones reutilizables e inteligencia artificial transversal.

El repositorio `HEAVENLY-DREAMS-WEB-2026` funciona actualmente como sitio corporativo y prototipo de reclutamiento. En producción debe limitarse a marketing, captación, SEO, formularios públicos y generación de leads. Las capacidades internas de RH, administración y operación deben migrarse a plataformas separadas.

## Riesgos

- Mezclar sitio público con panel administrativo incrementa superficie de ataque.
- Mantener datos críticos en navegador impide auditoría, trazabilidad y seguridad real.
- Duplicar componentes visuales en varios repositorios provocará inconsistencias de marca.
- Crear módulos de operaciones y administración dentro del mismo frontend generará acoplamiento y deuda técnica.
- Implementar IA sin contratos de datos, permisos y auditoría puede producir resultados no confiables.

## Solución Propuesta

Adoptar la siguiente separación enterprise:

```text
heavenlydreams.com.mx        -> Sitio corporativo y marketing
rh.heavenlydreams.com.mx     -> Plataforma de reclutamiento
app.heavenlydreams.com.mx    -> Plataforma operativa
admin.heavenlydreams.com.mx  -> Plataforma administrativa
core.heavenlydreams.com.mx   -> Servicios y librerías compartidas
```

### Repositorios objetivo

```text
HEAVENLY-DREAMS-WEB-2026 -> Marketing, SEO, formularios y lead generation
RHDREAMSAPP2026          -> Reclutamiento, candidatos, entrevistas y expedientes
HD-OPERATIONS            -> CRM, ventas, agenda, clientes, comisiones y seguimiento
HD-ADMIN                 -> Finanzas, usuarios, permisos, auditoría, integraciones, BI e IA
HD-CORE                  -> Auth, RBAC, API client, tipos, hooks, utilidades y design system
```

## Principios obligatorios

1. Ningún módulo administrativo global debe vivir en operaciones.
2. Ningún módulo operativo debe vivir en administración salvo analítica consolidada.
3. RH debe consumir autenticación, permisos, diseño y API client desde HD-CORE.
4. El sitio público no debe guardar datos sensibles en cliente.
5. Toda lógica de negocio debe vivir detrás de APIs versionadas.
6. Todo formulario debe validar con esquemas compartidos.
7. Todo módulo debe tener dueño de dominio, permisos y eventos auditables.
8. La IA debe operar como capa transversal, no como lógica embebida en componentes UI.

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

## Capa de IA

La IA debe exponerse mediante un servicio backend con permisos, auditoría y límites.

```text
RH Agent          -> Matching, scoring y análisis CV
Sales Agent       -> Lead scoring y recomendaciones comerciales
Supervisor Agent  -> Productividad, alertas y desempeño
Finance Agent     -> Proyecciones y flujo de efectivo
Executive Agent   -> KPIs, resúmenes ejecutivos y alertas estratégicas
```

### Reglas de IA

- No acceder a datos sin autorización RBAC.
- Registrar prompt, usuario, contexto, modelo, resultado y costo.
- Separar decisiones automáticas de recomendaciones.
- Mantener revisión humana para contratación, finanzas y decisiones sensibles.

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
```

### Workflows iniciales

1. Nuevo lead web -> CRM operaciones -> notificación WhatsApp.
2. Nueva postulación -> RH -> agenda entrevista -> Calendar.
3. Candidato contratado -> expediente -> nómina -> administración.
4. Venta cerrada -> comisión -> reporte supervisor.
5. Alerta financiera -> Finance Agent -> dashboard ejecutivo.

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
- Migrar componentes repetidos desde RH, Admin y Operations.
- Documentar uso con Storybook.

### Fase 4: Separación de plataformas

- HEAVENLY-DREAMS-WEB-2026: solo marketing y formularios.
- RHDREAMSAPP2026: reclutamiento completo.
- HD-OPERATIONS: CRM y operación diaria.
- HD-ADMIN: administración central, integraciones, BI e IA.

### Fase 5: Backend enterprise

- Crear API Gateway.
- Implementar servicios NestJS por dominio.
- Usar PostgreSQL como fuente transaccional.
- Usar Redis/BullMQ para colas, notificaciones y procesos pesados.

### Fase 6: IA y automatización

- Crear servicio transversal de agentes.
- Conectar n8n con eventos de negocio.
- Implementar auditoría y trazabilidad.
- Crear tableros de KPIs por dominio.

## Impacto

- Menor deuda técnica.
- Mejor separación de responsabilidades.
- Seguridad real para datos de candidatos, clientes y finanzas.
- Reutilización de diseño y lógica común.
- Escalabilidad para nuevas sedes, productos y países.
- Preparación para IA, automatización y analítica avanzada.

## Prioridad

Alta.

## Estimación

- Gobierno y documentación: baja complejidad.
- Seguridad centralizada: alta complejidad.
- HD-CORE: media/alta complejidad.
- Separación de plataformas: alta complejidad.
- Backend enterprise: alta complejidad.
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
