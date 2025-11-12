import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create gradient particles
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      hue: number;
      opacity: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 100 + 50;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.hue = Math.random() * 60 + 200; // Blue to purple range
        this.opacity = Math.random() * 0.03 + 0.01;
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.hue += 0.1;

        // Wrap around edges
        if (this.x > canvasWidth + this.size) this.x = -this.size;
        if (this.x < -this.size) this.x = canvasWidth + this.size;
        if (this.y > canvasHeight + this.size) this.y = -this.size;
        if (this.y < -this.size) this.y = canvasHeight + this.size;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );

        gradient.addColorStop(0, `hsla(${this.hue}, 70%, 50%, ${this.opacity})`);
        gradient.addColorStop(0.5, `hsla(${this.hue + 20}, 70%, 50%, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${this.hue + 40}, 70%, 50%, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(
          this.x - this.size,
          this.y - this.size,
          this.size * 2,
          this.size * 2
        );
      }
    }

    // Initialize particles
    const particleCount = 8;
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle(canvas.width, canvas.height));
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)'; // Dark blue with low opacity for trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      {/* Base gradient background - more subtle for light mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200/30 via-blue-100/20 to-purple-100/30 dark:from-slate-900/30 dark:via-blue-900/20 dark:to-purple-900/30"></div>

      {/* Animated overlay gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Gradient mesh overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-purple-600/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-600/10 via-transparent to-slate-600/10"></div>
      </div>

      {/* Animated lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
            style={{
              width: '100%',
              top: `${20 + i * 30}%`,
              animation: `slideIn ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 1}s`
            }}
          ></div>
        ))}
      </div>

      </div>
  );
};

export default AnimatedBackground;