import React, { useEffect, useRef, useState } from 'react';

interface AnimatedGradientTextProps {
  text: string;
  className?: string;
  colors?: string[];
  animationDuration?: number;
}

const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
  text,
  className = '',
  colors = ['#3B82F6', '#06B6D4', '#8B5CF6', '#EC4899'],
  animationDuration = 3
}) => {
  const [gradientPosition, setGradientPosition] = useState(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      setGradientPosition((prev) => (prev + 1) % 360);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const gradientStyle: React.CSSProperties = {
    background: `linear-gradient(${gradientPosition}deg, ${colors.join(', ')})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    backgroundSize: '200% 200%',
    transition: `background ${animationDuration}s ease`
  };

  return (
    <span
      className={`inline-block ${className}`}
      style={gradientStyle}
    >
      {text}
    </span>
  );
};

export default AnimatedGradientText;