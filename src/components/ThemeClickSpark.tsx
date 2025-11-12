import React, { useState, useEffect } from 'react';
import ClickSpark from './ClickSpark';

interface ThemeClickSparkProps {
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  extraScale?: number;
  children?: React.ReactNode;
}

const ThemeClickSpark: React.FC<ThemeClickSparkProps> = ({
  sparkSize = 15,
  sparkRadius = 25,
  sparkCount = 12,
  duration = 600,
  easing = 'ease-out',
  extraScale = 1.5,
  children
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check dark mode status
    const checkDarkMode = () => {
      const hasDarkClass = document.documentElement.classList.contains('dark');
      setIsDarkMode(hasDarkClass);
    };

    // Initial check
    checkDarkMode();

    // Listen for changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Cyan untuk darkmode, biru untuk lightmode
  const sparkColor = isDarkMode ? '#06b6d4' : '#3b82f6';

  return (
    <ClickSpark
      sparkColor={sparkColor}
      sparkSize={sparkSize}
      sparkRadius={sparkRadius}
      sparkCount={sparkCount}
      duration={duration}
      easing={easing}
      extraScale={extraScale}
    >
      {children}
    </ClickSpark>
  );
};

export default ThemeClickSpark;