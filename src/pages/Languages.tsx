import { Globe } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const programmingLanguages = [
  { name: "Python",years: "2 años", progress: 80, color: "#3776ab" },
  { name: "TypeScript / JavaScript", years: "2 años", progress: 75, color: "#f7df1e" },
  { name: "Kotlin", years: "1 año", progress: 50, color: "#00add8" },
  { name: "Java", years: "2 años", progress: 80, color: "#ce422b" },
  { name: "C/C++", years: "1 año", progress: 40, color: "#00599c" },
  { name: "SQL/SQLite", years: "3 años", progress: 80, color: "#336791" },
];

const spokenLanguages = [
  { name: "Persa", level: "Nativo", percent: 100, color: "#22d3ee" },
  { name: "Español", level: "Fluido", percent: 100, color: "#a855f7" },
  { name: "Inglés", level: "Fluido", percent: 90, color: "#ec4899" },
  { name: "Turco", level: "Intermedio", percent: 50, color: "#3b82f6" },

];

export default function Languages() {
  return (
    <PageLayout title="Lenguajes" subtitle="// NIVEL_DE_IDIOMA" accentColor="rgba(34, 211, 238, 0.6)">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div
              className="text-xs tracking-widest px-3 py-1 rounded"
              style={{
                background: "rgba(168,85,247,0.1)",
                border: "1px solid rgba(168,85,247,0.3)",
                color: "#a855f7",
                fontFamily: "'Share Tech Mono', monospace",
              }}
            >
              &lt;/code&gt;
            </div>
            <h2
              className="text-sm font-bold tracking-widest text-white"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              PROGRAMACIÓN
            </h2>
          </div>

          <div className="space-y-4">
            {programmingLanguages.map((lang) => (
              <div
                key={lang.name}
                className="rounded-xl p-4"
                style={{
                  background: "rgba(6,8,24,0.7)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: lang.color, boxShadow: `0 0 6px ${lang.color}` }}
                    />
                    <span
                      className="text-white/85 font-medium"
                      style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.95rem" }}
                    >
                      {lang.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    
                    <span
                      className="text-xs font-bold"
                      style={{ fontFamily: "'Share Tech Mono', monospace", color: lang.color }}
                    >
                      {lang.years}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${lang.progress}%`,
                      background: `linear-gradient(90deg, ${lang.color}60, ${lang.color})`,
                      boxShadow: `0 0 8px ${lang.color}50`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <Globe size={18} style={{ color: "#22d3ee" }} />
            <h2
              className="text-sm font-bold tracking-widest text-white"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              IDIOMAS HABLADOS
            </h2>
          </div>

          <div className="space-y-5">
            {spokenLanguages.map((lang) => (
              <div
                key={lang.name}
                className="rounded-xl p-5"
                style={{
                  background: "rgba(6,8,24,0.7)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${lang.color}25`,
                  boxShadow: `0 0 20px ${lang.color}08`,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: lang.color, boxShadow: `0 0 10px ${lang.color}` }}
                    />
                    <div>
                      <h3
                        className="text-white font-bold"
                        style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "12px" }}
                      >
                        {lang.name}
                      </h3>
                      <p className="text-xs mt-0.5" style={{ fontFamily: "'Share Tech Mono', monospace", color: lang.color }}>
                        {lang.level}
                      </p>
                    </div>
                  </div>
                  <div
                    className="text-2xl font-black"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      color: lang.color,
                      textShadow: `0 0 15px ${lang.color}80`,
                    }}
                  >
                    {lang.percent}%
                  </div>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${lang.percent}%`,
                      background: `linear-gradient(90deg, ${lang.color}60, ${lang.color})`,
                      boxShadow: `0 0 10px ${lang.color}60`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
