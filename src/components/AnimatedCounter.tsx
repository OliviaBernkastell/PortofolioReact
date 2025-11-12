import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  suffix = '',
  duration = 2000,
  className = ''
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      if (progress >= 1) {
        clearInterval(timer);
        setCount(end);
      }
    }, 16); // 60fps

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className={className}>
      <span className="inline-block">{count}{suffix}</span>
    </div>
  );
};

export default AnimatedCounter;