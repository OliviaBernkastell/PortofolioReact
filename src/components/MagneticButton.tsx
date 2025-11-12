import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  target,
  rel
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const element = href ? anchorRef.current : buttonRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const strength = 0.3;
    setTransform({
      x: x * strength,
      y: y * strength
    });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
  };

  const baseClasses = `
    relative inline-flex items-center justify-center
    px-6 py-3 sm:px-8 sm:py-4
    bg-gradient-to-r from-blue-500 to-blue-600
    dark:from-cyan-500 dark:to-cyan-400
    text-white font-semibold
    rounded-full
    shadow-lg hover:shadow-xl
    dark:shadow-cyan-500/25
    transition-all duration-300 ease-out
    transform-gpu
    overflow-hidden
    group
    ${className}
  `;

  const ButtonContent = (
    <>
      {/* Magnetic button content */}
      <span className="relative z-10">{children}</span>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-cyan-400 dark:to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      </div>

      {/* Ripple effect container */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 rounded-full transition-transform duration-500"></div>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        ref={anchorRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px)`
        }}
      >
        {ButtonContent}
      </a>
    );
  }

  return (
    <button
      className={baseClasses}
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`
      }}
    >
      {ButtonContent}
    </button>
  );
};

export default MagneticButton;