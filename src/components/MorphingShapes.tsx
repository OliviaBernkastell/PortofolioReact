import React, { useEffect, useRef, useState } from 'react';

interface MorphingShapesProps {
  className?: string;
}

const MorphingShapes: React.FC<MorphingShapesProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      timeRef.current += 0.01;

      // Create morphing shapes
      const shapes = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: 80 },
        { x: canvas.width * 0.8, y: canvas.height * 0.7, radius: 100 },
        { x: canvas.width * 0.5, y: canvas.height * 0.5, radius: 60 }
      ];

      shapes.forEach((shape, index) => {
        const morphFactor = Math.sin(timeRef.current + index) * 0.2 + 1;
        const rotation = timeRef.current * 0.3 + index;

        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(rotation);

        // Morphing blob shape - more subtle for professional look
        ctx.beginPath();
        const points = 6; // Reduced points for cleaner look
        for (let i = 0; i < points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const radiusVariation = Math.sin(timeRef.current * 1.5 + i) * 15; // Smaller variation
          const r = (shape.radius + radiusVariation) * morphFactor;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            const prevAngle = ((i - 1) / points) * Math.PI * 2;
            const prevRadiusVariation = Math.sin(timeRef.current * 1.5 + (i - 1)) * 15;
            const prevR = (shape.radius + prevRadiusVariation) * morphFactor;
            const prevX = Math.cos(prevAngle) * prevR;
            const prevY = Math.sin(prevAngle) * prevR;

            const cpX = (prevX + x) / 2 + Math.sin(timeRef.current * 2 + i) * 10; // Smaller control points
            const cpY = (prevY + y) / 2 + Math.cos(timeRef.current * 2 + i) * 10;

            ctx.quadraticCurveTo(cpX, cpY, x, y);
          }
        }

        ctx.closePath();

        // Professional blue gradient fill
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, shape.radius);
        const colors = [
          ['rgba(59, 130, 246, 0.08)', 'rgba(59, 130, 246, 0.02)'],  // Blue
          ['rgba(99, 102, 241, 0.08)', 'rgba(99, 102, 241, 0.02)'], // Indigo
          ['rgba(37, 99, 235, 0.08)', 'rgba(37, 99, 235, 0.02)']   // Sky Blue
        ];

        gradient.addColorStop(0, colors[index][0]);
        gradient.addColorStop(1, colors[index][1]);

        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.strokeStyle = colors[index][0].replace('0.08', '0.15');
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
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
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

export default MorphingShapes;