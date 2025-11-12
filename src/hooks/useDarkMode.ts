import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check saved preference or system preference
    const savedDarkMode = localStorage.getItem('darkMode');
    const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedDarkMode === 'true' || (!savedDarkMode && systemDarkMode);
  });

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDark.toString());
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return { isDark, toggleDarkMode };
};