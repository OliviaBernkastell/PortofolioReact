import React, { useRef, useState } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: boolean;
}

const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  tilt = true,
  glow = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glowStyle, setGlowStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setTransform(`
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.05, 1.05, 1.05)
    `);

    if (glow) {
      const glowX = (x / rect.width) * 100;
      const glowY = (y / rect.height) * 100;
      setGlowStyle({
        background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(59, 130, 246, 0.3), transparent 50%)`
      });
    }
  };

  const handleMouseLeave = () => {
    setTransform('');
    setGlowStyle({});
  };

  const baseClasses = `
    relative p-6 sm:p-8
    bg-white dark:bg-slate-800
    rounded-2xl
    shadow-xl hover:shadow-2xl
    transition-all duration-300 ease-out
    transform-gpu
    overflow-hidden
    border border-gray-200 dark:border-gray-700
    ${className}
  `;

  return (
    <div
      ref={cardRef}
      className={baseClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transform || 'none'
      }}
    >
      {/* Glow effect overlay */}
      {glow && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={glowStyle}
        />
      )}

      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
      </div>
    </div>
  );
};

export default Card3D;