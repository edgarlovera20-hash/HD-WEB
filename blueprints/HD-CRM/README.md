# HD-CRM Blueprint

## Diagnóstico

HD-CRM debe ser una aplicacion independiente para clientes nuevos, clientes activos, seguimiento, cuentas vencidas, conversaciones, compromisos de pago, reportes y auditoria. No debe depender de pantallas internas del sitio corporativo ni mezclarse con Operaciones o Administracion.

## Riesgos

- Contactos no auditados.
- Permisos mezclados con Admin u Operations.
- Conversaciones iniciadas sin politica, plantilla o consentimiento.
- Duplicacion de clientes entre CRM y Finanzas.
- Falta de trazabilidad entre promesas, pagos y seguimiento.

## Solucion Propuesta

Crear repositorio `HD-CRM` con arquitectura Next.js + NestJS + PostgreSQL + Redis + BullMQ.

```text
HD-CRM
├── apps
│   ├── web                 # Next.js CRM UI
│   └── api                 # NestJS CRM API
├── packages
│   ├── crm-domain          # Entidades, value objects, reglas de negocio
│   ├── crm-contracts       # DTOs, OpenAPI, eventos
│   └── crm-workers         # Jobs de seguimiento y recordatorios
├── prisma
│   └── schema.prisma
├── docker-compose.yml
└── README.md
```

## Modulos Iniciales

```text
Clientes Nuevos
Clientes Activos
Cuentas en Seguimiento
Cuentas Vencidas
Conversaciones
Compromisos de Pago
Historial de Contacto
Asignaciones
Campanas
Reportes
Auditoria CRM
```

## Modelo de Dominio Inicial

```text
Client
ClientAccount
ClientAssignment
ContactAttempt
Conversation
MessageTemplate
PaymentCommitment
FollowupTask
Campaign
AuditLog
```

## Permisos Iniciales

```text
crm.clients.view
crm.clients.create
crm.clients.update
crm.assignments.create
crm.followups.create
crm.conversations.start_approved_template
crm.conversations.reply
crm.conversations.review
crm.payment_commitments.create
crm.reports.view
```

## Reglas de Agentes

1. Ningun agente inicia conversacion sin plantilla aprobada.
2. Ningun agente contacta clientes en lista de exclusion.
3. Ningun agente contacta fuera de ventana permitida.
4. Toda conversacion se audita.
5. Toda situacion sensible se escala a humano.
6. HD-BRAIN no contacta clientes; solo solicita o recomienda acciones a HD-CRM.

## Eventos Requeridos

```text
crm.client.created
crm.client.assigned
crm.account_status.overdue_detected
crm.conversation.started
crm.conversation.escalated_to_human
crm.payment_commitment.created
crm.payment_commitment.missed
```

## Plan de Implementacion

### Fase 1

- Crear repo HD-CRM.
- Inicializar monorepo.
- Instalar Next.js, NestJS, Prisma, PostgreSQL, Redis y BullMQ.
- Importar contratos desde HD-CORE.

### Fase 2

- Crear modulo Clients.
- Crear modulo Assignments.
- Crear modulo Followups.
- Crear modulo Conversations con auditoria.

### Fase 3

- Crear dashboards CRM.
- Integrar WhatsApp/n8n bajo politicas aprobadas.
- Crear agentes CRM con permisos de service principal.

### Fase 4

- Integrar Admin Finanzas para pagos.
- Integrar HD-BRAIN para KPIs y riesgos.

## Impacto

HD-CRM reduce acoplamiento, controla riesgos de contacto, mejora trazabilidad y permite automatizar seguimiento sin contaminar Operaciones ni Administracion.

## Prioridad

Alta.

## Estimacion

Alta complejidad. Primera version funcional: clientes, seguimiento y conversaciones auditadas.
