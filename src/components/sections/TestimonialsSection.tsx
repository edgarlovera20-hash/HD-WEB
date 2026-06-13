import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Ricardo Fuentes",
    role: "Director de Operaciones",
    company: "TelcomMX",
    avatar: "RF",
    color: "#0066FF",
    text: "Heavenly Dreams transformó nuestro proceso de reclutamiento. En 3 semanas llenamos 12 posiciones críticas con candidatos de altísima calidad.",
    stars: 5,
  },
  {
    name: "Ana Sofía Herrera",
    role: "Gerente de RRHH",
    company: "Conecta Networks",
    avatar: "AH",
    color: "#10B981",
    text: "El ecosistema digital que manejan es impresionante. Tenemos visibilidad completa del proceso desde el primer contacto hasta la contratación.",
    stars: 5,
  },
  {
    name: "Miguel Ángel Torres",
    role: "CEO",
    company: "ServiTel Bajío",
    avatar: "MT",
    color: "#00A3FF",
    text: "Su equipo de IA nos ayuda a predecir necesidades de personal con semanas de anticipación. Reducimos costos operativos en un 30%.",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonios" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-[#9CA3AF] max-w-xl mx-auto">
            Empresas líderes en telecomunicaciones confían en Heavenly Dreams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 hover:border-[#0066FF]/40 transition-all"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6 italic">
                "{t.text}"
              </p>

              {/* Person */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: `${t.color}30`, color: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-[#F9FAFB] text-sm font-semibold">{t.name}</p>
                  <p className="text-[#6B7280] text-xs">{t.role} · {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
