import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const colors = [
      "rgba(168, 85, 247,",
      "rgba(34, 211, 238,",
      "rgba(236, 72, 153,",
      "rgba(99, 102, 241,",
    ];

    const spawnParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -(Math.random() * 1.5 + 0.5),
      size: Math.random() * 2 + 0.5,
      opacity: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 200 + 150,
    });

    for (let i = 0; i < 60; i += 1) {
      const particle = spawnParticle();
      particle.y = Math.random() * canvas.height;
      particle.life = Math.random() * particle.maxLife;
      particlesRef.current.push(particle);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        particle.life += 1;
        particle.x += particle.vx;
        particle.y += particle.vy;

        const halfLife = particle.maxLife / 2;
        particle.opacity =
          particle.life < halfLife
            ? particle.life / halfLife
            : (particle.maxLife - particle.life) / halfLife;

        ctx.beginPath();
        ctx.fillStyle = `${particle.color}${particle.opacity * 0.8})`;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        if (particle.size > 1) {
          ctx.beginPath();
          ctx.fillStyle = `${particle.color}${particle.opacity * 0.3})`;
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        if (particle.life >= particle.maxLife || particle.y < -20) {
          particlesRef.current[index] = spawnParticle();
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
