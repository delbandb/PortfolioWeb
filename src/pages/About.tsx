import { Cpu, Target, User, Zap } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const stats = [
  { label: "Años programando", value: "2+" },
  { label: "Proyectos desarrollados", value: "10+" },
  { label: "Tecnologías utilizadas", value: "10+" },
  { label: "Contribuciones", value: "20+" },
];

export default function About() {
  return (
    <PageLayout title="SOBRE MÍ" subtitle="// MÓDULO_IDENTIDAD v1.0" accentColor="rgba(168, 85, 247, 0.6)">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div
            className="rounded-2xl p-6 mb-6"
            style={{
              background: "rgba(6,8,24,0.7)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(168,85,247,0.3)",
              boxShadow: "0 0 30px rgba(168,85,247,0.1)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-2 rounded-lg"
                style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}
              >
                <User size={20} style={{ color: "#a855f7" }} />
              </div>
              <h2
                className="text-lg font-bold tracking-wider text-white"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                ¿QUIÉN SOY?
              </h2>
            </div>
            <p className="text-white/70 leading-relaxed text-base" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1rem" }}>
              Soy un perfil junior con formación en Desarrollo de Aplicaciones Multiplataforma (DAM) y Administración y Finanzas, con interés en el desarrollo de software, aplicaciones multiplataforma, automatización y análisis de datos.

              Me interesa construir soluciones útiles, bien estructuradas y funcionales, combinando pensamiento técnico con una visión práctica y organizativa. He trabajado tanto en entornos administrativos como tecnológicos, lo que me ha permitido desarrollar capacidad de adaptación, aprendizaje rápido y resolución de problemas.

              Actualmente continúo desarrollando proyectos personales y ampliando conocimientos en tecnologías como Python, JavaScript/TypeScript, Kotlin, React, Linux y herramientas orientadas al desarrollo y análisis de datos.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-4 text-center"
                style={{
                  background: "rgba(6,8,24,0.7)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(34,211,238,0.2)",
                  boxShadow: "0 0 20px rgba(34,211,238,0.05)",
                }}
              >
                <div
                  className="text-3xl font-black"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: "#22d3ee",
                    textShadow: "0 0 15px rgba(34,211,238,0.6)",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs mt-1 tracking-widest uppercase opacity-60"
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {[
            {
              icon: <Cpu size={20} />,
              title: "FILOSOFÍA",
              color: "#a855f7",
              content:
                "Me interesa entender cómo funcionan los sistemas y los patrones que conectan estructuras complejas, desde lo más macro hasta los pequeños detalles. Suelo abordar los problemas de forma no lineal, buscando relaciones, patrones repetitivos y orden dentro de la complejidad. Veo la tecnología como una herramienta para decodificar sistemas complejos, desde procesos cotidianos hasta estructuras de gran escala. Me atrae la idea de que detrás del software, los datos, la naturaleza o incluso el comportamiento humano existe cierto orden observable, y disfruto explorando cómo transformar esa lógica en soluciones simples y sistemas funcionales. ",
            },
            {
              icon: <Zap size={20} />,
              title: "ENFOQUE",
              color: "#22d3ee",
              content:
                "Trabajo entendiendo primero el sistema, tanto a nivel técnico como de negocio. Mi base en administración me lleva a analizar procesos, detectar ineficiencias y aplicar tecnología para mejorarlos. Busco soluciones que no solo funcionen, sino que tengan sentido a largo plazo: claras, mantenibles y útiles.",
            },
            {
              icon: <Target size={20} />,
              title: "OBJETIVO",
              color: "#ec4899",
              content:
                "Desarrollarme dentro del sector tecnológico participando en proyectos donde pueda conectar tecnología y negocio, mejorando procesos y aportando valor real. Me interesa especialmente el uso de desarrollo, datos y automatización para construir sistemas más eficientes y escalables.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl p-5"
              style={{
                background: "rgba(6,8,24,0.7)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${item.color}30`,
                boxShadow: `0 0 20px ${item.color}10`,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="p-2 rounded-lg"
                  style={{
                    background: `${item.color}20`,
                    border: `1px solid ${item.color}40`,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  className="text-sm font-bold tracking-widest"
                  style={{ fontFamily: "'Orbitron', sans-serif", color: item.color }}
                >
                  {item.title}
                </h3>
              </div>
              <p className="text-white/65 leading-relaxed" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.95rem" }}>
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
