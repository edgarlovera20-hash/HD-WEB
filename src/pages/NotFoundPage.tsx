import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0F1C] px-6 text-center">
      <p
        className="text-7xl font-bold text-[#0066FF] mb-4"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        404
      </p>
      <h1 className="text-2xl font-semibold text-white mb-2">Página no encontrada</h1>
      <p className="text-[#9CA3AF] mb-8 max-w-sm">
        La página que buscas no existe o fue movida.
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al inicio
      </a>
    </div>
  );
}
