export default function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-[#1F2937] py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span
              className="font-bold text-white text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Heavenly Dreams
            </span>
            <p className="text-[#9CA3AF] text-sm mt-1">
              Reclutamiento y talento · CDMX, México
            </p>
          </div>
          <div className="flex gap-6 text-sm text-[#9CA3AF]">
            <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
            <a href="#vacantes" className="hover:text-white transition-colors">Vacantes</a>
            <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[#1F2937] text-center text-[#6B7280] text-xs">
          © {new Date().getFullYear()} Heavenly Dreams SAS de CV. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
