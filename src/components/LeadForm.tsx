import { Send } from "lucide-react";
import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initial: FormState = { name: "", email: "", phone: "", message: "" };

export default function LeadForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) setForm(initial);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-4">
          <Send className="w-6 h-6 text-[#10B981]" />
        </div>
        <p className="text-[#F9FAFB] font-semibold">¡Mensaje enviado!</p>
        <p className="text-[#9CA3AF] text-sm mt-1">Te contactaremos pronto.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-[#0066FF] text-sm hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "error" && (
        <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          Error al enviar. Por favor intenta de nuevo.
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="name"
          type="text"
          required
          placeholder="Nombre completo"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-[#161F33] border border-[#334155] text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-colors"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-[#161F33] border border-[#334155] text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-colors"
        />
      </div>
      <input
        name="phone"
        type="tel"
        placeholder="Teléfono (opcional)"
        value={form.phone}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-lg bg-[#161F33] border border-[#334155] text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-colors"
      />
      <textarea
        name="message"
        required
        rows={4}
        placeholder="¿En qué podemos ayudarte?"
        value={form.message}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-lg bg-[#161F33] border border-[#334155] text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-colors resize-none"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3 px-4 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" />
        {status === "sending" ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
