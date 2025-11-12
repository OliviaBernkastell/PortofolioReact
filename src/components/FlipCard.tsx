import React, { useState } from 'react';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ front, back, className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`relative w-full h-full cursor-pointer ${className}`}
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-all duration-700 transform-gpu`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          {front}
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {back}
        </div>
      </div>

      <style jsx>{`
        .backface-hidden {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default FlipCard;