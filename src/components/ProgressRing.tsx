import React, { useEffect, useRef, useState } from 'react';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  colors?: string[];
  animated?: boolean;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  className = '',
  colors = ['#3B82F6', '#60A5FA'],
  animated = true
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (animated) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = percentage / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setAnimatedPercentage(Math.min(increment * currentStep, percentage));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    } else {
      setAnimatedPercentage(percentage);
    }
  }, [percentage, animated]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="100%" stopColor={colors[1]} />
          </linearGradient>
        </defs>
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-800 dark:text-white">
          {Math.round(animatedPercentage)}%
        </span>
      </div>
    </div>
  );
};

export default ProgressRing;