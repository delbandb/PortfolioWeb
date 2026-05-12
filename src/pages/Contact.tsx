import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Phone, Send } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const CONTACT_EMAIL = "delbandbehdadfar@yahoo.com";
const CONTACT_PHONE = "+34 601119351";
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
};

type SubmitState = "idle" | "sending" | "sent" | "email" | "error";

const initialForm: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

function buildMailtoUrl(form: FormState) {
  const subject = form.subject.trim() || "Nuevo mensaje desde tu portfolio";
  const body = [
    `Nombre: ${form.name}`,
    `Email: ${form.email}`,
    "",
    form.message,
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  useEffect(() => {
    if (submitState !== "sent" && submitState !== "email" && submitState !== "error") return;

    const timeoutId = window.setTimeout(() => setSubmitState("idle"), 5000);
    return () => window.clearTimeout(timeoutId);
  }, [submitState]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.company) return;

    setSubmitState("sending");

    if (!CONTACT_ENDPOINT) {
      window.location.href = buildMailtoUrl(form);
      setSubmitState("email");
      return;
    }

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim() || "Nuevo mensaje desde tu portfolio",
          message: form.message.trim(),
          source: "standalone-portfolio",
        }),
      });

      if (!response.ok) {
        throw new Error("Contact endpoint rejected the message.");
      }

      setForm(initialForm);
      setSubmitState("sent");
    } catch {
      setSubmitState("error");
    }
  };

  const statusMessage = {
    idle: "",
    sending: ">> TRANSMITIENDO MENSAJE...",
    sent: ">> MENSAJE ENVIADO CORRECTAMENTE. GRACIAS.",
    email: ">> SE ABRIÓ UN BORRADOR DE EMAIL. PULSA ENVIAR PARA COMPLETARLO.",
    error: ">> NO SE PUDO ENVIAR. ESCRÍBEME DIRECTAMENTE POR EMAIL.",
  }[submitState];

  const socials = [
    { icon: <Github size={20} />, label: "GitHub", handle: "@delbandb", href: "https://github.com/delbandb", color: "#ffffff" },
    { icon: <Phone size={20} />, label: "Teléfono", handle: CONTACT_PHONE, href: `tel:${CONTACT_PHONE.replace(/\s/g, "")}`, color: "#1d9bf0" },
    { icon: <Mail size={20} />, label: "Email", handle: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, color: "#a855f7" },
  ];

  return (
    <PageLayout title="Contacto" subtitle="// INICIAR_TRANSMISIÓN" accentColor="rgba(236, 72, 153, 0.6)">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div
            className="rounded-xl p-6"
            style={{
              background: "rgba(6,8,24,0.75)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(236,72,153,0.25)",
              boxShadow: "0 0 30px rgba(236,72,153,0.08)",
            }}
          >
            <h2
              className="text-base font-bold tracking-widest mb-6 text-white"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              ENVIAR MENSAJE
            </h2>

            {statusMessage ? (
              <div
                className="mb-4 p-3 rounded-lg text-sm"
                style={{
                  background: submitState === "error" ? "rgba(239,68,68,0.12)" : "rgba(168,85,247,0.15)",
                  border: submitState === "error" ? "1px solid rgba(239,68,68,0.4)" : "1px solid rgba(168,85,247,0.4)",
                  color: submitState === "error" ? "#f87171" : "#c084fc",
                  fontFamily: "'Share Tech Mono', monospace",
                }}
              >
                {statusMessage}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={(event) => setForm({ ...form, company: event.target.value })}
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-widest uppercase mb-2 block opacity-50" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      fontFamily: "'Rajdhani', sans-serif",
                    }}
                    placeholder="Nombre completo"
                    required
                    disabled={submitState === "sending"}
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase mb-2 block opacity-50" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      fontFamily: "'Rajdhani', sans-serif",
                    }}
                    placeholder="correo@email.com"
                    required
                    disabled={submitState === "sending"}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs tracking-widest uppercase mb-2 block opacity-50" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                  Asunto
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(event) => setForm({ ...form, subject: event.target.value })}
                  className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontFamily: "'Rajdhani', sans-serif",
                  }}
                  placeholder="Consulta de proyectos, Entrevistas..."
                  disabled={submitState === "sending"}
                />
              </div>

              <div>
                <label className="text-xs tracking-widest uppercase mb-2 block opacity-50" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                  Mensaje
                </label>
                <textarea
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-200 resize-none"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontFamily: "'Rajdhani', sans-serif",
                  }}
                  placeholder="Cuéntame más..."
                  required
                  disabled={submitState === "sending"}
                />
              </div>

              <button
                type="submit"
                disabled={submitState === "sending"}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all duration-200 disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg, rgba(236,72,153,0.2) 0%, rgba(168,85,247,0.2) 100%)",
                  border: "1px solid rgba(236,72,153,0.4)",
                  color: "white",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                }}
              >
                <Send size={14} />
                {submitState === "sending"
                  ? "TRANSMITIENDO..."
                  : CONTACT_ENDPOINT
                    ? "TRANSMITIR MENSAJE"
                    : "ABRIR EMAIL PARA ENVIAR"}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <div
            className="rounded-xl p-5"
            style={{
              background: "rgba(6,8,24,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(168,85,247,0.2)",
            }}
          >
            <h2
              className="text-sm font-bold tracking-widest mb-4 text-white"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              CONECTAR
            </h2>
            <div className="space-y-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-white/5"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div style={{ color: social.color, opacity: 0.8 }}>{social.icon}</div>
                  <div>
                    <div className="text-white/50 text-xs tracking-widest" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                      {social.label}
                    </div>
                    <div className="text-white/80 text-sm" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                      {social.handle}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl p-5"
            style={{
              background: "rgba(6,8,24,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(34,211,238,0.2)",
            }}
          >
            <div className="text-xs tracking-widest mb-3 opacity-50" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
              // DISPONIBILIDAD
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "#22c55e", boxShadow: "0 0 8px #22c55e", animation: "pulse-soft 2s infinite" }}
              />
              <span className="text-green-400 text-sm font-semibold" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                DISPONIBILIDAD TOTAL
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Disponible para proyectos freelance, puestos a tiempo completo y colaboraciones interesantes.
              Tiempo de respuesta: menos de 24 horas.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
