import PageLayout from "@/components/PageLayout";

interface Skill {
  name: string;
  category: string;
  color: string;
}

const skills: Skill[] = [
  { name: "Python", category: "DESARROLLO", color: "#22d3ee" },
  { name: "JavaScript / TypeScript", category: "DESARROLLO", color: "#22d3ee" },
  { name: "React", category: "DESARROLLO", color: "#22d3ee" },
  { name: "Kotlin", category: "DESARROLLO", color: "#22d3ee" },
  { name: "HTML / CSS ", category: "DESARROLLO", color: "#22d3ee" },
  { name: "Node.js", category: "DESARROLLO", color: "#22d3ee" },
  { name: "APIs REST", category: "DESARROLLO", color: "#22d3ee" },
  { name: "SQL", category: "DESARROLLO", color: "#22d3ee" },
  { name: "Linux / Ubuntu Server", category: "SISTEMAS Y DATOS", color: "#a855f7" },
  { name: "Bases de datos relacionales", category: "SISTEMAS Y DATOS", color: "#a855f7" },
  { name: "Automatización de procesos", category: "SISTEMAS Y DATOS", color: "#a855f7" },
  { name: "Análisis de datos", category: "SISTEMAS Y DATOS", color: "#a855f7" },
  { name: "Procesamiento de Lenguaje Natural (NLP) (básico)", category: "SISTEMAS Y DATOS", color: "#a855f7" },
  { name: "TF-IDF / Análisis de texto ", category: "SISTEMAS Y DATOS", color: "#a855f7" },
  { name: "Fundamentos de ciberseguridad (básico)", category: "SISTEMAS Y DATOS", color: "#a855f7" },
  { name: "Git / GitHub", category: "HERRAMIENTAS", color: "#ec4899" },
  { name: "IntelliJ", category: "HERRAMIENTAS", color: "#ec4899" },
  { name: "Android Studio", category: "HERRAMIENTAS", color: "#ec4899" },
  { name: "VS Code", category: "HERRAMIENTAS", color: "#ec4899" },
  { name: "Streamlit", category: "HERRAMIENTAS", color: "#ec4899" },
  { name: "Figma", category: "HERRAMIENTAS", color: "#ec4899" },
  { name: "Adobe Illustrator", category: "HERRAMIENTAS", color: "#ec4899" },
  { name: "MySQL / SQLite", category: "HERRAMIENTAS", color: "#ec4899" },
];

const categories = ["DESARROLLO", "SISTEMAS Y DATOS", "HERRAMIENTAS"];
const categoryColors: Record<string, string> = {
  DESARROLLO: "#22d3ee",
  "SISTEMAS Y DATOS": "#a855f7",
  HERRAMIENTAS: "#ec4899",
};

export default function Skills() {
  return (
    <PageLayout title="Habilidades Técnicas" subtitle="// HARD_SKILLS" accentColor="rgba(34, 211, 238, 0.6)">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div key={category}>
            <div className="flex items-center gap-2 mb-5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: categoryColors[category], boxShadow: `0 0 8px ${categoryColors[category]}` }}
              />
              <h2
                className="text-sm font-bold tracking-widest"
                style={{ fontFamily: "'Orbitron', sans-serif", color: categoryColors[category] }}
              >
                {category}
              </h2>
            </div>

            <div className="space-y-3">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <div
                    key={skill.name}
                    className="rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(6,8,24,0.7)",
                      backdropFilter: "blur(12px)",
                      border: `1px solid ${skill.color}20`,
                    }}
                  >
                    <span
                      className="text-white/85 font-medium"
                      style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.95rem" }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}