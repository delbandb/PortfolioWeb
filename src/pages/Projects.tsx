import { ExternalLink, Github, Layers } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const projects = [
  {
    name: "TextAnalyzer",
    description:
      "Proyecto TFG de analisis textual aplicado a mi libro, con procesamiento de corpus, metricas TF-IDF, coocurrencias, comunidades y visualizacion de relaciones entre personajes y simbolos.",
    tech: ["Python", "NLP", "Streamlit", "NetworkX"],
    color: "#a855f7",
    status: "TFG",
    codeUrl: "https://github.com/delbandb/TextAnalyzer",
    demoUrl: "",
  },
  {
    name: "CashFlow Insight Dashboard",
    description:
      "Dashboard financiero para analizar ingresos facturados, cobros reales, gastos, clientes de riesgo, facturas vencidas y prevision simple de flujo de caja.",
    tech: ["Python", "pandas", "SQLite", "Streamlit", "Plotly"],
    color: "#22d3ee",
    status: "CI READY",
    codeUrl: "https://github.com/delbandb/CashFlow-Insight-Dashboard",
    demoUrl: "",
  },
  {
    name: "Finance Ops Control",
    description:
      "Backend con FastAPI para facturas, gastos, transacciones bancarias, metricas de dashboard y reconciliacion conservadora de pagos con revision manual.",
    tech: ["FastAPI", "SQLAlchemy", "SQLite", "pytest", "Docker"],
    color: "#ec4899",
    status: "BACKEND",
    codeUrl: "https://github.com/delbandb/finance-ops-control",
    demoUrl: "",
  },
  {
    name: "JobApplicationAgent",
    description:
      "Herramienta CLI en Python para importar ofertas, puntuar compatibilidad con un perfil, generar borradores y mantener aprobacion humana antes de aplicar.",
    tech: ["Python", "CLI", "YAML", "JSON", "unittest"],
    color: "#a855f7",
    status: "AUTOMATION",
    codeUrl: "https://github.com/delbandb/JobApplicationAgent",
    demoUrl: "",
  },
  {
    name: "Portfolio Cyberdeck",
    description:
      "Portfolio personal estilo cyberpunk con rutas modulares, contenido editable, diseno responsive, formulario de contacto configurable y experiencia visual inmersiva.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    color: "#22d3ee",
    status: "LIVE",
    codeUrl: "https://github.com/delbandb/PortfolioWeb",
    demoUrl: "",
  },
  {
    name: "BankOpsAI",
    description:
      "Plataforma de automatizacion inteligente para operaciones bancarias inspirada en Pega, con onboarding KYC, scoring de riesgo con IA, cola de revision manual y panel back-office.",
    tech: ["FastAPI", "SQLAlchemy", "SQLite", "OpenAI", "React", "Next.js"],
    color: "#ec4899",
    status: "EN DESARROLLO",
    codeUrl: "https://github.com/delbandb/BankOpsAI",
    demoUrl: "",
  },
];

export default function Projects() {
  return (
    <PageLayout title="Proyectos" subtitle="// ARCHIVO_PROYECTOS" accentColor="rgba(168, 85, 247, 0.6)">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, index) => (
          <div
            key={project.name}
            className="rounded-xl p-5 group cursor-pointer transition-all duration-300"
            style={{
              background: "rgba(6,8,24,0.75)",
              backdropFilter: "blur(16px)",
              border: `1px solid ${project.color}30`,
              boxShadow: `0 0 20px ${project.color}08`,
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="p-2 rounded-lg"
                style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}
              >
                <Layers size={18} style={{ color: project.color }} />
              </div>
              <span
                className="text-xs px-2 py-1 rounded tracking-wider"
                style={{
                  background: `${project.color}15`,
                  border: `1px solid ${project.color}30`,
                  color: project.color,
                  fontFamily: "'Share Tech Mono', monospace",
                }}
              >
                {project.status}
              </span>
            </div>

            <h3
              className="text-lg font-bold mb-2 text-white"
              style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.95rem" }}
            >
              {project.name}
            </h3>
            <p
              className="text-white/55 text-sm leading-relaxed mb-4"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "'Share Tech Mono', monospace",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.codeUrl || project.demoUrl ? (
              <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                {project.codeUrl ? (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs py-1.5 px-3 rounded transition-colors"
                    style={{
                      background: `${project.color}20`,
                      border: `1px solid ${project.color}40`,
                      color: project.color,
                      fontFamily: "'Share Tech Mono', monospace",
                    }}
                  >
                    <Github size={12} />
                    CODE
                  </a>
                ) : null}
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs py-1.5 px-3 rounded transition-colors"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.7)",
                      fontFamily: "'Share Tech Mono', monospace",
                    }}
                  >
                    <ExternalLink size={12} />
                    DEMO
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
