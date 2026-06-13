import { TrendingUp, Users, Briefcase, Globe } from "lucide-react";

const STATS = [
  { value: "500+", label: "Candidatos colocados", icon: Users, color: "#0066FF" },
  { value: "98%", label: "Satisfacción de clientes", icon: TrendingUp, color: "#10B981" },
  { value: "150+", label: "Empresas aliadas", icon: Briefcase, color: "#00A3FF" },
  { value: "15+", label: "Estados en México", icon: Globe, color: "#F59E0B" },
];

export default function StatsSection() {
  return (
    <section className="py-16 px-6 border-y border-[#1F2937] bg-[#111827]/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <p
                className="text-3xl md:text-4xl font-bold text-white mb-1"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {stat.value}
              </p>
              <p className="text-[#6B7280] text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
