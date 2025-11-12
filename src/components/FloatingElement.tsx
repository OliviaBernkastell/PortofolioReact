import React, { useState, useEffect } from 'react';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className = '',
  duration = 3000,
  delay = 0,
  direction = 'up'
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationClass = () => {
    if (!shouldAnimate) return '';

    switch (direction) {
      case 'up':
        return 'animate-bounce';
      case 'down':
        return 'animate-pulse';
      case 'left':
      case 'right':
        return 'animate-pulse';
      default:
        return 'animate-bounce';
    }
  };

  return (
    <div className={`relative ${getAnimationClass()} ${className}`}>
      {/* Animated background glow */}
      <div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-50"
        style={{
          animation: shouldAnimate ? `float-${direction} ${duration}ms ease-in-out infinite` : 'none'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default FloatingElement;