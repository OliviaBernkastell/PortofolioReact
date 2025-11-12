import React, { useState, useEffect } from 'react';

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = (currentScroll / totalHeight) * 100;

      setScrollProgress(Math.min(progress, 100));
      setIsVisible(currentScroll > 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Progress Bar at Top */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Circular Progress Indicator */}
      <div
        className={`
          fixed bottom-8 right-8 z-40 transition-all duration-300
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
        `}
      >
        {/* Progress Circle */}
        <div className="relative group">
          {/* SVG Progress Ring */}
          <svg className="w-14 h-14 transform -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-blue-500 transition-all duration-150"
              style={{
                strokeDasharray: `${2 * Math.PI * 24}`,
                strokeDashoffset: `${2 * Math.PI * 24 * (1 - scrollProgress / 100)}`
              }}
            />
          </svg>

          {/* Center Button */}
          <button
            onClick={scrollToTop}
            className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110"
            aria-label="Scroll to top"
          >
            <svg
              className="w-6 h-6 text-gray-600 dark:text-gray-300 transform transition-transform duration-300 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Back to top ({Math.round(scrollProgress)}%)
          </div>
        </div>
      </div>

      {/* Side Progress Dots */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
        <div className="flex flex-col space-y-4">
          {['home', 'about', 'skills', 'portfolio', 'contact'].map((section, index) => (
            <a
              key={section}
              href={`#${section}`}
              className={`
                relative w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full
                transition-all duration-300 hover:scale-150 hover:bg-blue-500
                ${scrollProgress > (index * 20) ? 'bg-blue-500 scale-125' : ''}
              `}
            >
              <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2
                bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded
                opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap
                capitalize">
                {section}
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default ScrollProgress;