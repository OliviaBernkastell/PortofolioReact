import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchOnHover?: boolean;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = '',
  glitchOnHover = true
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!glitchOnHover) {
      const interval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [glitchOnHover]);

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={glitchOnHover ? () => setIsGlitching(true) : undefined}
      onMouseLeave={glitchOnHover ? () => setIsGlitching(false) : undefined}
    >
      {/* Main text */}
      <span className={isGlitching ? 'animate-pulse' : ''}>
        {text}
      </span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 text-blue-400 opacity-70"
            style={{
              transform: 'translate(-1px, 1px)',
              animation: 'glitch-1 0.2s infinite'
            }}
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 text-white opacity-70"
            style={{
              transform: 'translate(1px, -1px)',
              animation: 'glitch-2 0.2s infinite'
            }}
          >
            {text}
          </span>
        </>
      )}

      <style jsx>{`
        @keyframes glitch-1 {
          0%, 100% { transform: translate(-1px, 1px); }
          50% { transform: translate(1px, -1px); }
        }
        @keyframes glitch-2 {
          0%, 100% { transform: translate(1px, -1px); }
          50% { transform: translate(-1px, 1px); }
        }
      `}</style>
    </span>
  );
};

export default GlitchText;