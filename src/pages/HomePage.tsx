import Footer from "../components/Footer";
import LeadForm from "../components/LeadForm";
import Navbar from "../components/Navbar";
import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import ServicesSection from "../components/sections/ServicesSection";
import AISection from "../components/sections/AISection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import CTASection from "../components/sections/CTASection";
import { Briefcase } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0F1C]">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <AISection />
        <TestimonialsSection />

        {/* Vacantes */}
        <section id="vacantes" className="py-20 px-6 bg-[#111827]/40">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#60A5FA] text-xs font-semibold mb-4">
                <Briefcase className="w-3 h-3" />
                OPORTUNIDADES LABORALES
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Vacantes Disponibles
              </h2>
              <p className="text-[#9CA3AF] mt-3 max-w-lg mx-auto">
                Posiciones abiertas para profesionales en telecomunicaciones, ventas y atención al cliente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { title: "Ejecutivo de Ventas Corporativas", location: "CDMX / Híbrido", type: "Tiempo completo", color: "#0066FF" },
                { title: "Técnico en Telecomunicaciones", location: "Guadalajara, Jalisco", type: "Tiempo completo", color: "#10B981" },
                { title: "Asesor de Atención al Cliente", location: "Monterrey, NL", type: "Tiempo completo", color: "#00A3FF" },
              ].map((job) => (
                <div key={job.title} className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 hover:border-[#0066FF]/40 transition-all group cursor-pointer">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${job.color}18` }}>
                    <Briefcase className="w-4 h-4" style={{ color: job.color }} />
                  </div>
                  <h3 className="text-[#F9FAFB] font-semibold text-sm mb-1">{job.title}</h3>
                  <p className="text-[#6B7280] text-xs mb-3">{job.location}</p>
                  <span className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: `${job.color}15`, color: job.color }}>
                    {job.type}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#0066FF]/40 text-[#60A5FA] hover:bg-[#0066FF]/10 transition-colors text-sm font-medium"
              >
                Ver todas las vacantes y enviar tu CV →
              </a>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="nosotros" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2
                  className="text-3xl md:text-4xl font-bold text-white mb-6"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  ¿Quiénes somos?
                </h2>
                <p className="text-[#9CA3AF] text-base leading-relaxed mb-6">
                  Heavenly Dreams es una empresa mexicana especializada en reclutamiento y servicios de
                  telecomunicaciones. Conectamos talento con oportunidades reales en las mejores empresas
                  del país.
                </p>
                <p className="text-[#9CA3AF] text-base leading-relaxed mb-8">
                  Nuestra tecnología propia — un ecosistema de 7 plataformas con IA integrada — nos permite
                  ofrecer procesos más rápidos, transparentes y efectivos que cualquier agencia tradicional.
                </p>
                <div className="flex gap-3">
                  <div className="w-1 h-full min-h-[60px] rounded-full" style={{ background: "linear-gradient(180deg,#0066FF,#00A3FF)" }} />
                  <blockquote className="text-[#E5E7EB] italic text-sm leading-relaxed">
                    "Nuestra misión es democratizar el acceso al empleo de calidad en México,
                    usando tecnología como palanca de transformación."
                  </blockquote>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "500+", label: "Candidatos colocados", color: "#0066FF" },
                  { value: "150+", label: "Empresas aliadas", color: "#10B981" },
                  { value: "15+", label: "Estados cubiertos", color: "#00A3FF" },
                  { value: "5+", label: "Años de experiencia", color: "#F59E0B" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 text-center">
                    <p className="text-2xl font-bold mb-1" style={{ color: stat.color, fontFamily: "Poppins,sans-serif" }}>
                      {stat.value}
                    </p>
                    <p className="text-[#6B7280] text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTASection />

        {/* Contact */}
        <section id="contacto" className="py-20 px-6 bg-[#111827]/40">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Contáctanos
              </h2>
              <p className="text-[#9CA3AF] mt-3">
                ¿Tienes una vacante o quieres postularte? Escríbenos y te respondemos en 24 horas.
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
