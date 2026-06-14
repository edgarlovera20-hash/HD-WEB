import { ArrowRight, Briefcase } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,102,255,0.15), transparent)",
        }}
      />
      <div className="max-w-3xl mx-auto relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#00A3FF] text-sm font-medium mb-6">
          <Briefcase className="w-3.5 h-3.5" />
          Nuevas vacantes disponibles
        </div>

        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Tu próxima oportunidad
          <br />
          <span style={{ color: "#0066FF" }}>profesional</span> está aquí
        </h1>

        <p className="mt-6 text-[#9CA3AF] text-lg max-w-xl mx-auto leading-relaxed">
          Conectamos talento con las mejores empresas de telecomunicaciones y servicios en México.
          Únete al equipo Heavenly Dreams.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#vacantes"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold transition-colors"
          >
            Ver vacantes
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#334155] text-[#E5E7EB] hover:border-[#0066FF] hover:text-white transition-colors font-medium"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  );
}
