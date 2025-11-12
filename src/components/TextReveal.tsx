import React, { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
}

const TextRevealSimple: React.FC<TextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 800,
  direction = 'up',
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [delay, once]);

  const getTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(100px)';
      case 'down': return 'translateY(-100px)';
      case 'left': return 'translateX(100px)';
      case 'right': return 'translateX(-100px)';
      default: return 'translateY(100px)';
    }
  };

  return (
    <div ref={textRef} className={`inline-block ${className}`}>
      <span
        style={{
          display: 'inline-block',
          transform: isVisible ? 'none' : getTransform(),
          opacity: isVisible ? 1 : 0,
          transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          transitionDelay: `${delay}ms`,
        }}
      >
        {text}
      </span>
    </div>
  );
};

// Enhanced version with typing animation
export const TypewriterTextSimple: React.FC<{
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
}> = ({ text, className = '', speed = 100, delay = 0, cursor = true }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return (
    <span className={`${className}`}>
      {displayedText}
      {cursor && (
        <span
          className={`
            inline-block w-0.5 h-5 bg-blue-500 ml-1
            ${isTyping ? 'animate-pulse' : ''}
            ${isComplete ? 'animate-pulse' : ''}
          `}
        ></span>
      )}
    </span>
  );
};

// Gradient animated text
export const GradientTextSimple: React.FC<{
  text: string;
  className?: string;
  colors?: string[];
  duration?: number;
}> = ({
  text,
  className = '',
  colors = ['#3B82F6', '#06B6D4', '#8B5CF6'],
  duration = 3
}) => {
  return (
    <span
      className={`inline-block ${className}`}
      style={{
        background: `linear-gradient(90deg, ${colors.join(', ')}, ${colors[0]})`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: `gradient-shift ${duration}s ease infinite`,
      }}
    >
      {text}
    </span>
  );
};

export { TextRevealSimple };
export default TextRevealSimple;