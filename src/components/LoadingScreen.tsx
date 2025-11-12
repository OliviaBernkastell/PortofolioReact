import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsLoading(false);
              onComplete?.();
            }, 500);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 100);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="relative w-full max-w-md mx-auto p-8">
        {/* Logo Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl animate-pulse">
              AA
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-blue-400 rounded-2xl animate-ping opacity-30"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2 animate-pulse">
            Albert Assidiq
          </h2>
          <p className="text-gray-300 text-sm animate-pulse">
            Web Developer & AI Engineer
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-20 animate-shimmer"></div>
            </div>
          </div>
          <div className="mt-2 text-center text-sm text-gray-400">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 bg-blue-500 rounded-full opacity-5 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

        </div>
  );
};

export default LoadingScreen;