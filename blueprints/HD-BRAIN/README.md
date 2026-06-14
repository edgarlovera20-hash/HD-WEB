# HD-BRAIN Blueprint

HD-BRAIN es la plataforma de observabilidad ejecutiva del ecosistema Heavenly Dreams.

## Responsabilidad

- KPIs globales.
- Riesgos operativos.
- Recomendaciones ejecutivas.
- Bitacora de decisiones.
- Estado de servicios.
- Costos de IA.
- Solicitudes de automatizacion revisables.

## Stack

```text
Next.js
NestJS
PostgreSQL
Redis
BullMQ
Prisma
```

## Estructura

```text
HD-BRAIN
├── apps/web
├── apps/api
├── packages/brain-domain
├── packages/brain-contracts
├── packages/brain-agents
├── prisma/schema.prisma
└── docker-compose.yml
```

## Reglas

1. Respeta RBAC.
2. No reemplaza plataformas de dominio.
3. Registra acciones sensibles.
4. Toda recomendacion debe incluir fuente y confianza.
5. Toda solicitud de automatizacion debe quedar auditada.

## Primera version

- Dashboard global.
- Lista de riesgos.
- Recomendaciones.
- Decision Log.
- Registro de agentes.
