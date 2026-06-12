# Backlog de Reestructuración del Ecosistema Heavenly Dreams

## Objetivo

Convertir Heavenly Dreams en un ecosistema empresarial escalable con 7 plataformas separadas, dominios claros, seguridad centralizada, CRM independiente, diseño consistente, IA transversal, cerebro de control total y automatizaciones reutilizables.

---

## Épica 1: Separación del sitio corporativo

### Diagnóstico

El sitio corporativo contiene capacidades de reclutamiento y panel administrativo de prototipo. Para producción, el sitio público debe enfocarse en marketing, SEO, landing pages, formularios y captación.

### Solución Propuesta

- Mantener Home, Servicios, Nosotros, Contacto, Blog, SEO, Landing Pages y Lead Generation.
- Convertir formularios a envío seguro hacia API o n8n.
- Enviar leads de clientes hacia HD-CRM.
- Enviar postulaciones hacia RHDREAMSAPP2026.
- Migrar panel administrativo y gestión de candidatos a RHDREAMSAPP2026.
- Reemplazar datos mock/locales por contratos API.

### Prioridad

Alta.

### Estimación

Media.

---

## Épica 2: Crear HD-CORE

### Diagnóstico

Sin una librería compartida, cada app terminará duplicando componentes, temas, validadores, hooks, permisos y clientes API.

### Solución Propuesta

Crear repositorio `HD-CORE` con paquetes compartidos:

```text
@hd/core-ui
@hd/core-theme
@hd/core-icons
@hd/core-auth
@hd/core-rbac
@hd/core-api
@hd/core-types
@hd/core-validation
@hd/core-hooks
@hd/core-utils
@hd/core-events
```

### Prioridad

Alta.

### Estimación

Media/Alta.

---

## Épica 3: Seguridad centralizada

### Diagnóstico

Los prototipos con `localStorage`, `sessionStorage` y claves locales no son seguros para producción.

### Solución Propuesta

- Implementar NestJS Auth Service.
- Usar JWT de corta duración y refresh tokens.
- Implementar RBAC por dominio.
- Auditar acciones críticas.
- Proteger rutas por permisos.
- Mover secretos a variables de entorno seguras.
- Crear permisos específicos para RH, Operations, Admin, CRM y Brain.

### Prioridad

Alta.

### Estimación

Alta.

---

## Épica 4: Plataforma RH

### Diagnóstico

RHDREAMSAPP2026 debe ser la fuente de verdad para reclutamiento, entrevistas, expedientes y documentos.

### Solución Propuesta

- Consolidar Vacantes, Solicitudes, Entrevistas, Evaluaciones, Contrataciones, Expedientes y Reportes RH.
- Consumir `@hd/core-ui`, `@hd/core-auth`, `@hd/core-rbac` y `@hd/core-api`.
- Integrar Google Calendar, Drive y WhatsApp mediante n8n.
- Crear RH Agent para matching, scoring y análisis CV.

### Prioridad

Alta.

### Estimación

Alta.

---

## Épica 5: HD-OPERATIONS

### Diagnóstico

La operación diaria necesita una plataforma separada de administración global y separada del CRM de clientes morosos.

### Solución Propuesta

Crear `HD-OPERATIONS` con:

```text
Agenda Operativa
Tareas
Productividad
Seguimiento Comercial Operativo
Reportes Operativos
Supervisor
Mi Perfil
Notificaciones Internas
Comisiones Operativas
```

### Restricción

No incluir Finanzas globales, Usuarios globales, Roles globales, Auditoría corporativa, CRM de morosos, conversaciones automatizadas de cobranza ni Cerebro de control total.

### Prioridad

Alta.

### Estimación

Alta.

---

## Épica 6: HD-ADMIN

### Diagnóstico

Administración requiere control central de empresa, finanzas, auditoría, permisos, integraciones e inteligencia ejecutiva administrativa.

### Solución Propuesta

Crear `HD-ADMIN` con:

```text
Dashboard Ejecutivo
Finanzas
Tesorería
Compras
Inventarios
Nóminas Globales
Auditoría
Usuarios
Roles
Permisos
Configuración
Integraciones
Analytics
Business Intelligence
Automatizaciones Administrativas
```

### Restricción

No incluir CRM diario de morosos ni agentes que contacten clientes. Esos módulos pertenecen a HD-CRM.

### Prioridad

Alta.

### Estimación

Alta.

---

## Épica 7: HD-CRM

### Diagnóstico

El CRM de clientes nuevos, seguimiento y clientes morosos es un dominio propio. Si se mezcla con Operaciones o Admin, crecerá como deuda técnica, afectará permisos, auditoría, métricas y automatizaciones.

### Solución Propuesta

Crear `HD-CRM` con:

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

### Agentes

```text
Client Follow-up Agent
Collections Agent
Conversation Starter Agent
Retention Agent
Supervisor CRM Agent
```

### Automatizaciones

```text
Nuevo cliente -> asignar agente CRM
Cliente sin respuesta -> recordatorio
Cliente moroso -> segmentar riesgo
Promesa de pago creada -> agendar seguimiento
Promesa incumplida -> alerta supervisor
Cliente recuperado -> notificar Admin Finanzas
Conversación crítica -> escalar humano
```

### Reglas obligatorias

- Contactos auditados.
- Plantillas aprobadas.
- Consentimiento o relación comercial registrada.
- Horarios permitidos configurables.
- Transferencia a humano.
- No usar lenguaje agresivo o engañoso.
- Respetar bajas y listas de exclusión.

### Prioridad

Alta.

### Estimación

Alta.

---

## Épica 8: Backend enterprise

### Diagnóstico

La escalabilidad requiere APIs versionadas, servicios por dominio, base transaccional, colas, eventos y auditoría.

### Solución Propuesta

- API Gateway.
- NestJS por dominios.
- Prisma + PostgreSQL.
- Redis + BullMQ.
- WebSockets para notificaciones.
- MinIO para documentos.
- Docker Compose para desarrollo.
- GitHub Actions para CI/CD.
- Event Bus para conectar Web, RH, Operations, Admin, CRM, Core y Brain.

### Prioridad

Alta.

### Estimación

Alta.

---

## Épica 9: IA transversal

### Diagnóstico

La IA no debe estar mezclada con componentes de UI ni actuar sin trazabilidad.

### Solución Propuesta

- Crear AI Orchestrator Service.
- Implementar agentes RH, Sales, CRM, Supervisor, Finance, Executive y Brain.
- Registrar contexto, usuario, entrada, salida, costo y decisión.
- Usar permisos RBAC por agente.
- Mantener revisión humana para decisiones sensibles.
- Bloquear acciones directas sin política aprobada.

### Prioridad

Media/Alta.

### Estimación

Media/Alta.

---

## Épica 10: Automatización con n8n

### Diagnóstico

Las integraciones deben ser reutilizables y auditables, no scripts aislados.

### Solución Propuesta

- Centralizar workflows en n8n.
- Disparar workflows por eventos de negocio.
- Integrar WhatsApp, redes sociales, Google Workspace, Outlook, Teams, CRM, Finanzas, RH y Brain.
- Versionar workflows críticos.
- Registrar ejecución, estado, error y responsable.

### Prioridad

Media/Alta.

### Estimación

Media.

---

## Épica 11: Consistencia UX/UI

### Diagnóstico

Cada repositorio puede desviarse visualmente si no consume tokens y componentes comunes.

### Solución Propuesta

- Definir theme global en HD-CORE.
- Usar una sola tipografía.
- Unificar botones, inputs, tablas, cards, modales y layouts.
- Crear guía de iconografía.
- Usar Storybook para QA visual.
- Bloquear componentes locales duplicados salvo excepción aprobada.

### Prioridad

Alta.

### Estimación

Media.

---

## Épica 12: HD-BRAIN

### Diagnóstico

El Cerebro de control total debe ser una capa superior de inteligencia y gobierno. Si se crea como una app todopoderosa sin permisos ni auditoría, se vuelve un riesgo crítico.

### Solución Propuesta

Crear `HD-BRAIN` con:

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

### Agentes

```text
Executive Brain Agent
Risk Agent
Automation Orchestrator Agent
Data Quality Agent
Security Watch Agent
Operations Intelligence Agent
CRM Intelligence Agent
Finance Intelligence Agent
RH Intelligence Agent
```

### Restricciones

- No saltarse RBAC.
- No borrar datos transaccionales.
- No modificar finanzas sin aprobación.
- No contactar clientes directamente; debe pasar por HD-CRM.
- No contratar ni descartar candidatos; debe pasar por RH.
- No cambiar roles globales sin Admin.
- Auditar toda acción.

### Prioridad

Media/Alta.

### Estimación

Alta.

---

## Orden recomendado de ejecución

```text
1. HD-CORE
2. Auth/RBAC Backend
3. HD-CRM
4. Refactor de HEAVENLY-DREAMS-WEB-2026
5. Refactor de RHDREAMSAPP2026
6. HD-OPERATIONS
7. HD-ADMIN
8. n8n + eventos
9. AI Orchestrator
10. HD-BRAIN
```

---

## Definition of Done Enterprise

Un cambio se considera listo cuando cumple:

- Dominio correcto.
- Seguridad validada.
- Permisos RBAC aplicados.
- Sin datos sensibles en cliente.
- Validación con Zod o esquema compartido.
- Componentes alineados con HD-CORE.
- Eventos de negocio definidos.
- Auditoría aplicada cuando haya cambios sensibles.
- Pruebas mínimas.
- Documentación actualizada.
- Impacto cross-repo revisado.
- Automatización evaluada.
- Alineación con HD-CRM si toca clientes.
- Alineación con HD-BRAIN si toca control global, KPIs, agentes o automatizaciones estratégicas.
