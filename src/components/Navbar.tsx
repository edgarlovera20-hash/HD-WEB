import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Vacantes", href: "#vacantes" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0A0F1C]/90 backdrop-blur border-b border-[#1F2937]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="font-bold text-white text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
          Heavenly Dreams
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[#9CA3AF] hover:text-white transition-colors text-sm font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="px-4 py-2 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-semibold transition-colors"
          >
            Postúlate
          </a>
        </nav>

        <button
          className="md:hidden text-[#9CA3AF] hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#111827] border-t border-[#1F2937] px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[#E5E7EB] hover:text-white text-sm font-medium py-1"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-2 px-4 py-2 rounded-lg bg-[#0066FF] text-white text-sm font-semibold text-center"
          >
            Postúlate
          </a>
        </div>
      )}
    </header>
  );
}
