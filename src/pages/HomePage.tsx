import Footer from "../components/Footer";
import LeadForm from "../components/LeadForm";
import Navbar from "../components/Navbar";
import HeroSection from "../components/sections/HeroSection";
import ServicesSection from "../components/sections/ServicesSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0F1C]">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />

        <section id="vacantes" className="py-20 px-6 bg-[#111827]/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Vacantes Disponibles
              </h2>
              <p className="text-[#9CA3AF] mt-3">
                Posiciones abiertas para profesionales como tú.
              </p>
            </div>
            <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8 text-center">
              <p className="text-[#9CA3AF]">
                Próximamente: catálogo de vacantes en tiempo real.
              </p>
              <a
                href="#contacto"
                className="mt-4 inline-block text-[#0066FF] hover:underline text-sm font-medium"
              >
                Envíanos tu CV mientras tanto →
              </a>
            </div>
          </div>
        </section>

        <section id="nosotros" className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              ¿Quiénes somos?
            </h2>
            <p className="text-[#9CA3AF] text-lg leading-relaxed">
              Heavenly Dreams es una empresa mexicana enfocada en conectar talento con oportunidades
              reales. Trabajamos con empresas líderes en telecomunicaciones, ventas y atención al
              cliente para ofrecer procesos de reclutamiento transparentes, rápidos y eficientes.
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { value: "+500", label: "Candidatos colocados" },
                { value: "+50", label: "Empresas aliadas" },
                { value: "5+", label: "Años de experiencia" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#111827] border border-[#1F2937] rounded-xl p-6"
                >
                  <p
                    className="text-3xl font-bold text-[#0066FF]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[#9CA3AF] text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="py-20 px-6 bg-[#111827]/50">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Contáctanos
              </h2>
              <p className="text-[#9CA3AF] mt-3">
                ¿Tienes una vacante o quieres postularte? Escríbenos.
              </p>
            </div>
            <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8">
              <LeadForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
