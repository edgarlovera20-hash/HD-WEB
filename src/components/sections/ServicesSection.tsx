import { BarChart3, Headphones, Users } from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Reclutamiento Especializado",
    description:
      "Identificamos y seleccionamos al mejor talento para roles en telecomunicaciones, ventas y servicio al cliente.",
  },
  {
    icon: Headphones,
    title: "Telecomunicaciones",
    description:
      "Proyectos de conectividad y soporte técnico con equipos altamente capacitados en todo México.",
  },
  {
    icon: BarChart3,
    title: "Desarrollo de Talento",
    description:
      "Programas de capacitación y crecimiento profesional para potenciar el rendimiento de tu equipo.",
  },
];

export default function ServicesSection() {
  return (
    <section id="servicios" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Nuestros Servicios
          </h2>
          <p className="text-[#9CA3AF] mt-3 max-w-xl mx-auto">
            Soluciones integrales para empresas y profesionales que buscan crecer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 hover:border-[#0066FF]/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 flex items-center justify-center mb-4 group-hover:bg-[#0066FF]/20 transition-colors">
                <s.icon className="w-6 h-6 text-[#0066FF]" />
              </div>
              <h3
                className="text-lg font-semibold text-[#F9FAFB] mb-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {s.title}
              </h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
