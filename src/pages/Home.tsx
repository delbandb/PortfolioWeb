import { useLocation } from "wouter";
import bgImage from "@/assets/hero-background.png";

const NAV_LINKS = [
  { label: "Sobre mí", href: "/about" },
  { label: "Currículum", href: "/resume" },
  { label: "Proyectos", href: "/projects" },
  { label: "Habilidades", href: "/skills" },
  { label: "Certificados", href: "/certificates" },
  { label: "Idiomas", href: "/languages" },
  { label: "Contacto", href: "/contact" },
];

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="relative overflow-hidden" style={{ width: "100vw", height: "100vh" }}>
      <img
        src={bgImage}
        alt="Portfolio hero background"
        className="hero-bg-image absolute inset-0 w-full h-full"
        style={{
          zIndex: 0,
          userSelect: "none",
          pointerEvents: "none",
        }}
      />

      <div
        className="absolute left-0 right-0 top-0"
        style={{
          height: "80px",
          background: "linear-gradient(180deg, rgba(2,5,20,0.7) 0%, transparent 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <nav
        className="absolute top-0 left-0 right-0 flex items-center gap-3"
        style={{
          zIndex: 10,
          padding: "0 1rem",
          height: "60px",
          background: "transparent",
          borderBottom: "none",
        }}
      >
        <div
          className="shrink-0 tracking-widest font-bold"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "clamp(11px, 1.2vw, 14px)",
            color: "#22d3ee",
            textShadow: "0 0 12px rgba(34,211,238,0.8)",
            letterSpacing: "0.18em",
          }}
        >
          INICIO
        </div>

        <div className="nav-scroll flex flex-1 items-center gap-1 overflow-x-auto">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => setLocation(link.href)}
              className="relative group px-2 py-2 transition-all duration-200 shrink-0"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(8px, 0.72vw, 11px)",
                fontWeight: 600,
                letterSpacing: "0.05em",
                color: "rgba(255,255,255,0.8)",
                textTransform: "uppercase",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textShadow: "0 0 8px rgba(0,0,0,0.8)",
              }}
            >
              {link.label}
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-3/4 transition-all duration-200"
                style={{ background: "#22d3ee", boxShadow: "0 0 6px #22d3ee" }}
              />
            </button>
          ))}
        </div>
      </nav>

      <div
        className="absolute flex flex-col items-start justify-center max-w-[38rem]"
        style={{
          zIndex: 5,
          right: "25%",
          top: "40%",
          transform: "translateY(-50%)",
          width: "38%",
        }}
      >
        <div
          className="mb-4"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "clamp(10px, 1vw, 13px)",
            color: "#c084fc",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            textShadow: "0 0 10px rgba(192,132,252,0.7)",
          }}
        >
          {"// TECNOLOGÍA, DESAROLLO, IA Y ANÁLISIS DE DATOS "}
        </div>

        <h1
          className="font-black mb-4 leading-none"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "clamp(28px, 4.5vw, 64px)",
            color: "white",
            textShadow: "0 0 30px rgba(192,132,252,0.5), 0 2px 10px rgba(0,0,0,0.95)",
            letterSpacing: "0.04em",
          }}
        >
          DELBAND
          <br />
          <span
            style={{
              color: "#c084fc",
              textShadow:
                "0 0 30px rgba(192,132,252,0.9), 0 0 60px rgba(168,85,247,0.5), 0 2px 10px rgba(0,0,0,0.95)",
            }}
          >
            BEHDADFAR
          </span>
        </h1>

        <div
          className="mb-4"
          style={{
            width: "60px",
            height: "2px",
            background: "linear-gradient(90deg, #c084fc, transparent)",
            boxShadow: "0 0 10px rgba(192,132,252,0.7)",
          }}
        />

        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "clamp(13px, 1.3vw, 18px)",
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.7,
            textShadow: "0 1px 6px rgba(0,0,0,0.95)",
          }}
        >
          Perfil junior con formación en Desarrollo de Aplicaciones Multiplataforma (DAM) y Administración y Finanzas. 
          Interesado en desarrollo web, automatización, análisis de datos y soluciones tecnológicas orientadas a negocio.
        </p>
      </div>
    </div>
  );
}
