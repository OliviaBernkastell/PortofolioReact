import React, { useEffect, useState, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if desktop
    setIsDesktop(window.innerWidth >= 768);

    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.matches('button, a, input, textarea, [role="button"]') ||
        target.closest('button, a, input, textarea, [role="button"]')
      ) {
        setIsHovering(true);
      }
    };
        const handleMouseOut = () => setIsVisible(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseEnter);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseEnter);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${position.x - 10}px, ${position.y - 10}px) scale(${isClicking ? 0.8 : isHovering ? 1.5 : 1})`;
    }
    if (followerRef.current) {
      followerRef.current.style.transform = `translate(${position.x - 20}px, ${position.y - 20}px) scale(${isHovering ? 0.8 : 1})`;
    }
  }, [position, isHovering, isClicking]);

  // Hide custom cursor on mobile
  if (!isDesktop) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className={`
          fixed w-5 h-5 bg-blue-500 rounded-full pointer-events-none z-50
          transition-transform duration-150 ease-out
          ${isVisible ? 'opacity-100' : 'opacity-0'}
          ${isHovering ? 'bg-cyan-500' : 'bg-blue-500'}
        `}
        style={{
          mixBlendMode: 'difference',
        }}
      />

      {/* Follower circle */}
      <div
        ref={followerRef}
        className={`
          fixed w-10 h-10 border-2 border-blue-500/30 rounded-full pointer-events-none z-40
          transition-all duration-300 ease-out
          ${isVisible ? 'opacity-100' : 'opacity-0'}
          ${isHovering ? 'border-cyan-500/50 scale-150' : 'border-blue-500/30'}
        `}
      />

      {/* Click ripple effect */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-30"
          style={{
            left: position.x - 20,
            top: position.y - 20,
          }}
        >
          <div className="w-10 h-10 border-2 border-blue-400 rounded-full animate-ping"></div>
        </div>
      )}

      {/* Trail effect */}
      <div className="fixed inset-0 pointer-events-none z-20">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-300/20 rounded-full animate-fade-out"
            style={{
              left: position.x - 4,
              top: position.y - 4,
              animationDelay: `${i * 50}ms`,
              animationDuration: '500ms',
            }}
          ></div>
        ))}
      </div>

        </>
  );
};

export default CustomCursor;