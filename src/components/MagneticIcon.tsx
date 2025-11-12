import React, { useRef, useState } from 'react';

interface MagneticIconProps {
  icon: string;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

const MagneticIcon: React.FC<MagneticIconProps> = ({
  icon,
  href,
  size = 'md',
  className = '',
  target,
  rel,
  onClick
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg'
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) * 0.2;
    const y = (e.clientY - centerY) * 0.2;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else if (href) {
      window.open(href, target || '_blank');
    }
  };

  const content = (
    <div
      ref={ref}
      className={`
        ${sizeClasses[size]}
        rounded-full
        bg-gradient-to-r from-blue-500 to-blue-600
        text-white
        flex items-center justify-center
        cursor-pointer
        transition-all duration-300 ease-out
        hover:shadow-lg hover:scale-110
        ${className}
      `}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <i className={`${icon} animate-pulse`}></i>
    </div>
  );

  return content;
};

export default MagneticIcon;