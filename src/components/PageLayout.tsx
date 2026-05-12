import type { ReactNode } from "react";
import { useLocation } from "wouter";
import CyberBackground from "./CyberBackground";
import ParticleField from "./ParticleField";

const NAV_LINKS = [
  { label: "Sobre mí", href: "/about" },
  { label: "Currículum", href: "/resume" },
  { label: "Proyectos", href: "/projects" },
  { label: "Habilidades", href: "/skills" },
  { label: "Certificados", href: "/certificates" },
  { label: "Idiomas", href: "/languages" },
  { label: "Contacto", href: "/contact" },
];

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  accentColor?: string;
}

export default function PageLayout({
  title,
  subtitle,
  children,
  accentColor = "rgba(34,211,238,0.6)",
}: PageLayoutProps) {
  const [location, setLocation] = useLocation();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CyberBackground />
      <ParticleField />
      <div className="scan-overlay" />

      <div className="relative z-10 min-h-screen">
        <nav
          className="flex items-center gap-3"
          style={{
            height: "64px",
            padding: "0 1rem",
            background: "rgba(2,5,20,0.8)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(34,211,238,0.2)",
            boxShadow: "0 2px 30px rgba(34,211,238,0.06)",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <button
            onClick={() => setLocation("/")}
            className="shrink-0 tracking-widest font-bold transition-opacity duration-200 hover:opacity-80"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(11px, 1.2vw, 14px)",
              color: "#22d3ee",
              textShadow: "0 0 12px rgba(34,211,238,0.6)",
              letterSpacing: "0.18em",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            INICIO
          </button>

          <div className="nav-scroll flex flex-1 items-center gap-1 overflow-x-auto px-1">
            {NAV_LINKS.map((link) => {
              const isActive = location === link.href;

              return (
                <button
                  key={link.href}
                  onClick={() => setLocation(link.href)}
                  className="relative group px-2 py-2 transition-all duration-200 shrink-0"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "clamp(8px, 0.72vw, 11px)",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    color: isActive ? "#22d3ee" : "rgba(255,255,255,0.65)",
                    textTransform: "uppercase",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-200"
                    style={{
                      background: "#22d3ee",
                      boxShadow: "0 0 6px #22d3ee",
                      width: isActive ? "75%" : "0%",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </nav>

        <div className="flex flex-col items-center pt-10 pb-4 px-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px w-16 opacity-60" style={{ background: accentColor }} />
            <h1
              className="text-xl font-bold tracking-widest uppercase"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color: "white",
                textShadow: `0 0 20px ${accentColor}`,
              }}
            >
              {title}
            </h1>
            <div className="h-px w-16 opacity-60" style={{ background: accentColor }} />
          </div>
          {subtitle ? (
            <p
              className="text-center text-sm tracking-wider opacity-50"
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
            >
              {subtitle}
            </p>
          ) : null}
        </div>

        <main className="container mx-auto px-6 py-6 page-enter max-w-5xl">{children}</main>
      </div>
    </div>
  );
}
