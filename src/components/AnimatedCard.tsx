import React, { useRef } from 'react';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  delay = 0
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    cardRef.current.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.05, 1.05, 1.05)
    `;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      className={`
        relative overflow-hidden rounded-xl
        bg-white dark:bg-gray-800
        shadow-lg hover:shadow-2xl
        transition-all duration-300 ease-out
        transform-gpu
        before:absolute before:inset-0
        before:rounded-xl before:bg-gradient-to-r
        before:from-blue-500/10 before:to-purple-500/10
        before:opacity-0 hover:before:opacity-100
        before:transition-opacity before:duration-300
        ${className}
      `}
      style={{
        animationDelay: `${delay}ms`,
        animation: 'fadeInUp 0.8s ease-out forwards',
        opacity: 0
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-10">{children}</div>

      </div>
  );
};

export default AnimatedCard;