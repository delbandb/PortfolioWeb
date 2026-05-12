import { Briefcase, Download, GraduationCap } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const experience = [
  {
    role: "Desarrollador Full Stack (Prácticas)",
    company: "Aldallana formación y servicios informáticos S.L.",
    period: "25/10/2025 - 25/01/2026",
    points: [
      "Desarrollo y mantenimiento de funcionalidades web en entorno full stack",
      "Participación en tareas de frontend y backend",
      "Uso de herramientas de control de versiones (Git)",
    ],
  },
  {
    role: "Administrativo - Gestión de flota",
    company: "Centauro Rent a car",
    period: "2023 - 2025",
    points: [
      "Gestión documental y administrativa relacionada con flotas de vehículos",
      "Seguimiento de procesos operativos y coordinación interna",
      "Uso de herramientas de control de versiones y visualización de datos como PowerBI",
      "Identificación de oportunidades de mejora en procesos mediante herramientas digitales",
    ],
  },
  {
    role: "Proyectos Destacados",
     period: "2025 - 2026",
    points: [
      "Desarrollo de dashboards de visualizacion financiera con Python, pandas, SQLite, Streamlit y Plotly",
      "Construccion de APIs backend con FastAPI, SQLAlchemy y logica de reconciliacion para facturas, gastos y transacciones",
      "Automatizacion de flujos de trabajo con importacion CSV/JSON, scoring de datos, tests y CI en GitHub Actions",
    ],
  },
];

const education = [
  {
    degree: "FP Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)",
    school: "Instituto Nebrija",
    period: "2023 - 2025",
    note: "Nota media: 8+ (Notable)",
  },
  {
    degree: "FP Superior en Administración y Finanzas",
    school: "Instituto IMF",
    period: "2020 -2022",
  },
];

export default function Resume() {
  return (
    <PageLayout title="Currículum" subtitle="// REGISTRO_PROFESIONAL" accentColor="rgba(34, 211, 238, 0.6)">
      <div className="flex justify-end mb-6">
        <a
          href="/DelbandBehdadfar_CV.pdf"
          download="DelbandBehdadfar_CV.pdf"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
          style={{
            background: "rgba(168,85,247,0.15)",
            border: "1px solid rgba(168,85,247,0.4)",
            color: "#a855f7",
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.1em",
          }}
        >
          <Download size={14} />
          DESCARGAR PDF
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <Briefcase size={18} style={{ color: "#a855f7" }} />
            <h2
              className="text-base font-bold tracking-widest text-white"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              EXPERIENCIA LABORAL
            </h2>
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(90deg, rgba(168,85,247,0.5), transparent)" }}
            />
          </div>

          <div className="space-y-5">
            {experience.map((job) => (
              <div
                key={`${job.role}-${job.company}`}
                className="rounded-xl p-5"
                style={{
                  background: "rgba(6,8,24,0.7)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(168,85,247,0.2)",
                  boxShadow: "0 0 20px rgba(168,85,247,0.05)",
                }}
              >
                <div className="flex items-start justify-between mb-2 gap-4">
                  <div>
                    <h3
                      className="text-white font-bold"
                      style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "13px" }}
                    >
                      {job.role}
                    </h3>
                    <p className="text-purple-400 text-sm mt-0.5" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                      {job.company}
                    </p>
                  </div>
                  <span
                    className="text-xs px-2 py-1 rounded whitespace-nowrap"
                    style={{
                      background: "rgba(168,85,247,0.1)",
                      border: "1px solid rgba(168,85,247,0.2)",
                      color: "rgba(168,85,247,0.8)",
                      fontFamily: "'Share Tech Mono', monospace",
                    }}
                  >
                    {job.period}
                  </span>
                </div>
                <ul className="space-y-1.5 mt-3">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-white/60"
                      style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem" }}
                    >
                      <span style={{ color: "#22d3ee", flexShrink: 0 }}>&gt;</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-5">
            <GraduationCap size={18} style={{ color: "#22d3ee" }} />
            <h2
              className="text-base font-bold tracking-widest text-white"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              EDUCACIÓN
            </h2>
          </div>

          <div className="space-y-4">
            {education.map((item) => (
              <div
                key={`${item.degree}-${item.school}`}
                className="rounded-xl p-4"
                style={{
                  background: "rgba(6,8,24,0.7)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(34,211,238,0.2)",
                  boxShadow: "0 0 20px rgba(34,211,238,0.05)",
                }}
              >
                <h3
                  className="text-white font-bold text-sm"
                  style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "12px" }}
                >
                  {item.degree}
                </h3>
                <p className="text-cyan-400 text-sm mt-1" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  {item.school}
                </p>
                <p
                  className="text-white/40 text-xs mt-1"
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                >
                  {item.period}
                </p>
                <p
                  className="text-white/50 text-sm mt-2"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {item.note}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-6 rounded-xl p-4"
            style={{
              background: "rgba(6,8,24,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(236,72,153,0.2)",
            }}
          >
            <h3
              className="text-sm font-bold tracking-widest text-pink-400 mb-3"
              style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "11px" }}
            >
              HABILIDADES 
            </h3>
            {["Pensamiento analítico y no lineal aplicado a resolución de problemas complejos", "Capacidad para conectar visión técnica y lógica de negocio", "Adaptabilidad rápida a nuevas tecnologías, herramientas y entornos", "Aprendizaje autónomo y exploración constante de sistemas y procesos", "Curiosidad profunda por IA, datos y modelos de comprensión de sistemas", "Orientación natural a automatización y optimización de procesos"].map(
              (skill) => (
                <div key={skill} className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#ec4899" }} />
                  <span className="text-white/60 text-sm" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    {skill}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
