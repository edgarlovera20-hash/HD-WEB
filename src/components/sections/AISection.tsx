import { Bot, Brain, Shield, Zap, BarChart3, Users } from "lucide-react";

const CAPABILITIES = [
  {
    icon: Bot,
    title: "Agentes IA Especializados",
    desc: "12 agentes de inteligencia artificial dedicados a cada área de negocio: ventas, finanzas, RRHH, operaciones y más.",
    color: "#0066FF",
  },
  {
    icon: Brain,
    title: "Memoria Corporativa",
    desc: "Los agentes aprenden el contexto de tu empresa, recuerdan decisiones pasadas y mejoran con cada interacción.",
    color: "#00A3FF",
  },
  {
    icon: BarChart3,
    title: "KPIs en Tiempo Real",
    desc: "Dashboard ejecutivo con visibilidad total del ecosistema: clientes, candidatos, tareas y métricas financieras.",
    color: "#10B981",
  },
  {
    icon: Shield,
    title: "Seguridad Enterprise",
    desc: "Control de acceso basado en roles, auditoría completa y cumplimiento de normativas de protección de datos.",
    color: "#F59E0B",
  },
  {
    icon: Zap,
    title: "Automatización n8n",
    desc: "Flujos de trabajo automatizados para seguimiento de clientes, alertas de riesgo y reportes ejecutivos.",
    color: "#A78BFA",
  },
  {
    icon: Users,
    title: "Ecosistema Integrado",
    desc: "7 plataformas especializadas funcionando como un solo sistema: CRM, RRHH, Operaciones, Finanzas y más.",
    color: "#F472B6",
  },
];

export default function AISection() {
  return (
    <section id="ia" className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,102,255,0.06), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#60A5FA] text-xs font-semibold mb-4">
            <Bot className="w-3 h-3" />
            INTELIGENCIA ARTIFICIAL CORPORATIVA
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            El cerebro detrás de
            <span
              className="block"
              style={{ background: "linear-gradient(90deg,#0066FF,#00A3FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Heavenly Dreams
            </span>
          </h2>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto text-lg leading-relaxed">
            Nuestro ecosistema digital integra IA avanzada en cada proceso. Desde el primer contacto con un candidato
            hasta el cierre de una venta, la inteligencia artificial amplifica la capacidad de nuestro equipo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="group bg-[#111827] border border-[#1F2937] rounded-2xl p-6 hover:border-[#0066FF]/40 transition-all duration-300 hover:bg-[#161F33]"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${cap.color}18` }}
              >
                <cap.icon className="w-6 h-6" style={{ color: cap.color }} />
              </div>
              <h3
                className="text-[#F9FAFB] font-semibold text-base mb-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {cap.title}
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>

        {/* Platform diagram */}
        <div className="mt-16 bg-[#111827] border border-[#1F2937] rounded-3xl p-8 text-center">
          <p className="text-[#6B7280] text-xs font-semibold uppercase tracking-widest mb-6">
            Plataformas del Ecosistema
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "HD-CORE", color: "#0066FF", desc: "RBAC & Contratos" },
              { name: "HD-CRM", color: "#10B981", desc: "Clientes & Ventas" },
              { name: "HD-RH", color: "#00A3FF", desc: "Talento & Reclutamiento" },
              { name: "HD-BRAIN", color: "#A78BFA", desc: "IA & KPIs" },
              { name: "HD-OPERATIONS", color: "#F59E0B", desc: "Tareas & Proyectos" },
              { name: "HD-ADMIN", color: "#EF4444", desc: "Usuarios & Auditoría" },
              { name: "HD-WEB", color: "#F472B6", desc: "Portal Público" },
            ].map((p) => (
              <div
                key={p.name}
                className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl border transition-all hover:scale-105"
                style={{ borderColor: `${p.color}30`, backgroundColor: `${p.color}08` }}
              >
                <span className="text-xs font-bold font-mono" style={{ color: p.color }}>
                  {p.name}
                </span>
                <span className="text-[10px] text-[#6B7280]">{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
