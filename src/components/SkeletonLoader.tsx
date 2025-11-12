import React from 'react';

interface SkeletonLoaderProps {
  lines?: number;
  className?: string;
  avatar?: boolean;
  width?: string;
  height?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  lines = 1,
  className = '',
  avatar = false,
  width = '100%',
  height = '1rem'
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {avatar && (
        <div className="w-16 h-16 bg-gray-200 dark:bg-blue-900/30 rounded-full mb-4"></div>
      )}

      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 dark:bg-blue-900/30 rounded"
          style={{
            width: index === lines - 1 ? '80%' : width,
            height: height,
            marginBottom: lines > 1 ? '0.5rem' : '0'
          }}
        ></div>
      ))}
    </div>
  );
};

export default SkeletonLoader;