export default function CyberBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 15% 60%, rgba(168, 85, 247, 0.12) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 85% 30%, rgba(34, 211, 238, 0.10) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 50% 80%, rgba(99, 102, 241, 0.08) 0%, transparent 60%),
            linear-gradient(135deg, #030712 0%, #060b1a 50%, #020812 100%)
          `,
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="glow-svg">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#glow-svg)" stroke="rgba(34,211,238,0.5)" strokeWidth="0.5" fill="none">
          <line x1="200" y1="0" x2="200" y2="900" />
          <line x1="400" y1="0" x2="600" y2="900" strokeDasharray="4 8" />
          <line x1="900" y1="0" x2="700" y2="900" />
          <line x1="1200" y1="0" x2="1200" y2="900" strokeDasharray="2 6" />
          <line x1="0" y1="250" x2="1440" y2="350" />
          <line x1="0" y1="600" x2="1440" y2="500" strokeDasharray="6 10" />
        </g>
        <g stroke="rgba(168,85,247,0.4)" strokeWidth="0.5" fill="none">
          <rect x="50" y="50" width="120" height="80" strokeDasharray="3 5" />
          <rect x="1270" y="120" width="100" height="60" strokeDasharray="2 4" />
          <rect x="600" y="750" width="200" height="100" strokeDasharray="4 6" />
          <circle cx="1350" cy="700" r="40" strokeDasharray="3 5" />
          <circle cx="100" cy="800" r="60" strokeDasharray="2 4" />
        </g>
      </svg>

      <div
        className="absolute left-0 right-0 h-px opacity-20"
        style={{
          top: "33%",
          background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.8), transparent)",
        }}
      />
      <div
        className="absolute left-0 right-0 h-px opacity-10"
        style={{
          top: "66%",
          background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)",
        }}
      />
    </div>
  );
}
