import { ArrowRight, Calendar } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="relative rounded-3xl p-12 overflow-hidden border border-[#0066FF]/30"
          style={{
            background: "linear-gradient(135deg, #0A1628 0%, #111827 50%, #0A1628 100%)",
          }}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,102,255,0.2), transparent)",
            }}
          />

          <div className="relative">
            <span className="inline-block px-3 py-1 rounded-full bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#60A5FA] text-xs font-semibold mb-6 uppercase tracking-widest">
              Comienza hoy
            </span>

            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              ¿Listo para hacer crecer
              <br />
              tu negocio con IA?
            </h2>

            <p className="text-[#9CA3AF] text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Agenda una demo gratuita y descubre cómo el ecosistema Heavenly Dreams
              puede transformar tu empresa en 30 días.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg,#0066FF,#00A3FF)" }}
              >
                <Calendar className="w-5 h-5" />
                Agendar Demo Gratuita
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="mailto:contacto@heavenlydreams.com.mx"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-[#E5E7EB] border border-[#334155] hover:border-[#0066FF] hover:text-white transition-all"
              >
                Enviar mensaje directo
              </a>
            </div>

            <p className="mt-6 text-[#6B7280] text-xs">
              Sin compromiso · Respuesta en menos de 24 horas · Demo personalizada
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
