import { Award, Star } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const certificates = [
  {
    title: "Data Science Essentials with Python - AE Programación Nebrija",
    issuer: "Cisco Networking Academy - Nebrija",
    credId: "",
    color: "#f97316",
    icon: <Award size={22} />,
  },
  {
    title: "Fundamentos de Python - AE Programación Nebrija",
    issuer: "Cisco Networking Academy - Nebrija",
    credId: "",
    color: "#22d3ee",
    icon: <Award size={22} />,
  },
  {
    title: "Fundamentos de Python 2",
    issuer: "Cisco Networking Academy",
    credId: "",
    color: "#a855f7",
    icon: <Award size={22} />,
  },
  {
    title: "Linux Avanzado",
    issuer: "Grupo Aspasia",
    credId: "",
    color: "#3b82f6",
    icon: <Star size={22} />,
    mode: "PRESENCIAL",
  },
  {
    title: "JavaScript Essentials 2",
    issuer: "Cisco Networking Academy",
    credId: "",
    color: "#22c55e",
    icon: <Award size={22} />,
  },
  {
    title: "Microsoft Azure AZ-204",
    issuer: "Microsoft",
    credId: "",
    color: "#ec4899",
    icon: <Star size={22} />,
  },
];

export default function Certificates() {
  return (
    <PageLayout title="Certificates" subtitle="// CREDENTIALS_DATABASE" accentColor="rgba(34, 211, 238, 0.6)">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {certificates.map((cert) => (
          <div
            key={`${cert.title}-${cert.issuer}`}
            className="rounded-xl p-5 group transition-all duration-300 cursor-default"
            style={{
              background: "rgba(6,8,24,0.75)",
              backdropFilter: "blur(16px)",
              border: `1px solid ${cert.color}25`,
              boxShadow: `0 0 20px ${cert.color}08`,
            }}
          >
            <div className="flex items-start gap-3 mb-4">
              <div
                className="p-2.5 rounded-lg flex-shrink-0"
                style={{
                  background: `${cert.color}15`,
                  border: `1px solid ${cert.color}30`,
                  color: cert.color,
                }}
              >
                {cert.icon}
              </div>
              <div className="flex-1">
                <h3
                  className="text-white font-bold leading-tight"
                  style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "11px", letterSpacing: "0.05em" }}
                >
                  {cert.title}
                </h3>
                <p
                  className="mt-1.5"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.85rem",
                    color: cert.color,
                    opacity: 0.8,
                  }}
                >
                  {cert.issuer}
                </p>
              </div>
            </div>


            <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${cert.color}15` }}>
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: cert.color,
                    boxShadow: `0 0 6px ${cert.color}`,
                    animation: "pulse-glow 2s infinite",
                  }}
                />
                <span className="text-xs opacity-50 tracking-widest" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                  {cert.mode ?? "ONLINE"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
