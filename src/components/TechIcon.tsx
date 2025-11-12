import React, { useState } from 'react';

interface TechIconProps {
  icon?: string;
  image?: string;
  name: string;
  color?: string;
  delay?: number;
}

const TechIcon: React.FC<TechIconProps> = ({
  icon,
  image,
  name,
  color = 'text-blue-500',
  delay = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative"
      style={{
        animationDelay: `${delay}ms`,
        animation: 'fadeInUp 0.8s ease-out forwards',
        opacity: 0
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-20 h-20 flex items-center justify-center
          bg-white dark:bg-gray-800 rounded-xl
          shadow-lg hover:shadow-xl
          border border-gray-200 dark:border-gray-700
          transition-all duration-300 ease-out
          ${isHovered ? 'transform -translate-y-2 scale-110' : ''}
        `}
      >
        <div className={`relative transition-all duration-300 ${isHovered ? 'scale-125' : 'scale-100'}`}>
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-10 h-10 object-contain"
              style={{
                filter: isHovered ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))' : 'none'
              }}
            />
          ) : (
            <i
              className={`${icon} text-3xl ${color}`}
              style={{
                filter: isHovered ? 'drop-shadow(0 0 8px currentColor)' : 'none'
              }}
            />
          )}
        </div>

        {/* Animated border on hover */}
        <div
          className={`
            absolute inset-0 rounded-xl border-2
            transition-all duration-300
            ${isHovered
              ? 'border-blue-500 scale-105 opacity-100'
              : 'border-transparent opacity-0'
            }
          `}
        />
      </div>

      {/* Enhanced tooltip */}
      <div
        className={`
          absolute -bottom-10 left-1/2 transform -translate-x-1/2
          bg-gray-900 dark:bg-gray-800 text-white px-3 py-2
          rounded-lg text-sm font-medium
          whitespace-nowrap z-50
          transition-all duration-200
          ${isHovered
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2 pointer-events-none'
          }
        `}
      >
        {name}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45"></div>
      </div>

      </div>
  );
};

export default TechIcon;