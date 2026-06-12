# Heavenly Dreams Ecosystem — Arquitectura de 7 Plataformas

## Diagnóstico

El ecosistema Heavenly Dreams no debe crecer como una sola aplicación con muchos módulos mezclados. La parte de CRM de clientes nuevos, seguimiento y clientes morosos debe separarse como una plataforma propia porque tiene reglas, riesgos, automatizaciones, agentes, métricas y permisos diferentes a Operaciones, Administración y RH.

Además, el concepto de `cerebro control total` debe existir como una capa superior de inteligencia, gobierno, monitoreo, automatización, auditoría y coordinación entre plataformas. No debe ser una app que rompa la separación de responsabilidades ni que permita modificar cualquier dato sin permisos.

---

## Estructura Oficial de 7 Plataformas

```text
HEAVENLY DREAMS ECOSYSTEM

1. heavenlydreams.com.mx
   └── Sitio Web Corporativo

2. rh.heavenlydreams.com.mx
   └── Plataforma de Reclutamiento

3. app.heavenlydreams.com.mx
   └── App y Plataforma Operativa

4. admin.heavenlydreams.com.mx
   └── Plataforma Administrativa

5. crm.heavenlydreams.com.mx
   └── CRM de Clientes, Seguimiento y Morosos

6. core.heavenlydreams.com.mx
   └── Servicios Compartidos / HD-CORE

7. brain.heavenlydreams.com.mx
   └── Cerebro de Control Total / HD-BRAIN
```

---

# 1. Sitio Web Corporativo

## Repositorio

```text
HEAVENLY-DREAMS-WEB-2026
```

## Responsabilidad

Marketing, SEO, branding, captación de leads y formularios públicos.

## Módulos

```text
Home
Servicios
Nosotros
Contacto
Blog
SEO
Landing Pages
Formularios
Lead Generation
```

## No debe contener

```text
Panel administrativo interno
Gestión de candidatos
CRM operativo
Cartera vencida
Finanzas
Roles globales
Control total del ecosistema
```

---

# 2. Plataforma de Reclutamiento

## Repositorio

```text
RHDREAMSAPP2026
```

## Responsabilidad

Gestionar talento, candidatos, entrevistas, evaluaciones, contratación, expedientes y documentación.

## Módulos

```text
Vacantes
Solicitudes
Entrevistas
Evaluaciones
Contrataciones
Expedientes
Documentación
Seguimiento de candidatos
Reportes RH
RH Agent
```

## Agente

```text
RH Agent
```

Responsable de matching de candidatos, scoring, análisis CV, alertas de entrevistas y recomendaciones de contratación con revisión humana.

---

# 3. App y Plataforma Operativa

## Repositorio

```text
HD-OPERATIONS
```

## Responsabilidad

Operación diaria de equipos internos, supervisores, asesores, ejecutivos y coordinadores.

## Módulos

```text
Agenda Operativa
Tareas
Seguimiento Comercial Operativo
Productividad
Reportes Operativos
Supervisor
Mi Perfil
Notificaciones Internas
Comisiones Operativas
```

## No debe contener

```text
Finanzas globales
Tesorería
Usuarios globales
Roles globales
Permisos globales
Auditoría corporativa
CRM de morosos
Control total del ecosistema
```

---

# 4. Plataforma Administrativa

## Repositorio

```text
HD-ADMIN
```

## Responsabilidad

Administración central de empresa, finanzas, tesorería, compras, inventarios, nóminas globales, auditoría, usuarios, roles, permisos e integraciones corporativas.

## Módulos

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

## No debe contener

```text
CRM de cobranza diaria
Conversaciones automatizadas de morosos
Gestión operativa de clientes
Control total sin auditoría
```

---

# 5. CRM de Clientes, Seguimiento y Morosos

## Repositorio

```text
HD-CRM
```

## Subdominio

```text
crm.heavenlydreams.com.mx
```

## Responsabilidad

Administrar clientes nuevos, clientes activos, clientes en seguimiento, clientes morosos, promesas de pago, conversaciones, historial de contacto, campañas, recordatorios y agentes que inician conversaciones bajo reglas de negocio y cumplimiento.

## Módulos

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

## Usuarios

```text
Agentes CRM
Ejecutivos de Seguimiento
Supervisores CRM
Coordinadores de Cobranza
Dirección Comercial
Auditoría
```

## Agentes IA

```text
Client Follow-up Agent
Collections Agent
Conversation Starter Agent
Retention Agent
Supervisor CRM Agent
```

## Reglas obligatorias para agentes que inician conversaciones

1. Solo pueden contactar clientes con base legal, permiso, relación comercial o consentimiento registrado.
2. Deben respetar horarios permitidos configurables por país, estado y política interna.
3. Deben usar plantillas aprobadas.
4. Deben registrar cada intento de contacto.
5. Deben permitir transferencia a humano.
6. Deben evitar lenguaje amenazante, engañoso, discriminatorio o agresivo.
7. Deben respetar listas de exclusión, bajas y clientes bloqueados.
8. No deben prometer descuentos, acuerdos o consecuencias sin reglas aprobadas.
9. Todo contacto con morosos debe ser auditable.
10. Las decisiones sensibles deben pasar por revisión humana.

## Eventos principales

```text
client.created
client.updated
client.assigned
client.followup.due
client.payment.promise.created
client.payment.promise.broken
client.delinquency.detected
client.conversation.started
client.conversation.replied
client.escalated_to_human
client.recovered
client.lost
```

## Integraciones

```text
WhatsApp Business
SMS
Email
Facebook Leads
Instagram Leads
Google Sheets / Drive
Calendario
Pasarela de Pago
n8n
HD-CORE Auth
HD-ADMIN Finanzas
HD-BRAIN KPIs
```

---

# 6. Servicios Compartidos

## Repositorio

```text
HD-CORE
```

## Responsabilidad

Centralizar seguridad, permisos, diseño, tipos, validaciones, API client, SDK, hooks, utilidades e iconografía.

## Paquetes

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

## Consumidores

```text
RHDREAMSAPP2026
HD-OPERATIONS
HD-ADMIN
HD-CRM
HD-BRAIN
```

---

# 7. Cerebro de Control Total

## Repositorio

```text
HD-BRAIN
```

## Subdominio

```text
brain.heavenlydreams.com.mx
```

## Responsabilidad

Ser la capa superior de control, inteligencia, auditoría, monitoreo, alertas, coordinación de agentes, KPIs globales, reglas de negocio y gobierno del ecosistema.

## Importante

HD-BRAIN no debe reemplazar a Admin, Operaciones, RH ni CRM. Debe observar, coordinar, recomendar y disparar automatizaciones bajo permisos y auditoría. Solo puede ejecutar acciones cuando una política explícita lo permita.

## Módulos

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

## Agentes

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

## Permisos especiales

```text
brain.view_global_kpis
brain.view_risk_alerts
brain.trigger_automation
brain.approve_ai_action
brain.view_audit_logs
brain.manage_business_rules
brain.view_agent_costs
brain.escalate_incident
```

## Reglas obligatorias

1. No puede saltarse RBAC.
2. No puede borrar datos transaccionales.
3. No puede modificar finanzas sin autorización explícita.
4. No puede contactar clientes directamente; debe pasar por HD-CRM.
5. No puede contratar o descartar candidatos directamente; debe pasar por RH.
6. No puede cambiar roles globales sin Admin.
7. Toda acción debe quedar auditada.
8. Toda recomendación debe explicar origen, datos usados y nivel de confianza.

---

## Flujo de Datos Entre Plataformas

```text
Sitio Web -> CRM / RH
CRM -> Admin Finanzas
CRM -> Brain KPIs
RH -> Admin Nómina / Expedientes
Operations -> Brain Productividad
Admin -> Brain Gobierno / Finanzas
Core -> Todas las plataformas
Brain -> Alertas / Recomendaciones / Automatizaciones aprobadas
```

---

## Arquitectura Backend Recomendada

```text
API Gateway
Auth Service
RBAC Service
User Service
Lead Service
Recruitment Service
Operations Service
CRM Service
Collections Service
Finance Service
Notification Service
Automation Service
AI Orchestrator Service
Audit Service
Event Bus
```

## Base de Datos Recomendada

```text
PostgreSQL -> datos transaccionales
Redis -> caché, sesiones, colas rápidas
BullMQ -> jobs y automatizaciones backend
MinIO -> documentos, CVs, contratos, comprobantes
Event Store / Audit Logs -> trazabilidad
Vector DB -> memoria semántica controlada para IA
```

---

## Prioridad de Creación

```text
1. HD-CORE
2. Auth/RBAC Backend
3. HD-CRM
4. RHDREAMSAPP2026 refactorizado
5. HD-OPERATIONS
6. HD-ADMIN
7. HD-BRAIN
```

HD-BRAIN debe crearse después de tener datos confiables, permisos y eventos. Si se crea antes, se convierte en una pantalla bonita sin control real.

---

## Definition of Done

Cada plataforma nueva debe cumplir:

- Dominio claro.
- Rutas protegidas.
- Roles y permisos.
- Auditoría.
- Eventos de negocio.
- Validaciones compartidas.
- UI desde HD-CORE.
- Documentación.
- Pruebas mínimas.
- Integración con n8n cuando aplique.
- Revisión de impacto cross-repo.
