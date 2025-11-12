import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
}

const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled = false
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: Ripple = {
      x,
      y,
      id: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleClick}
        disabled={disabled}
        className={`relative overflow-hidden transition-all duration-300 ${className}`}
      >
        {children}

        {/* Ripples */}
        {ripples.map(ripple => (
          <RippleEffect
            key={ripple.id}
            x={ripple.x}
            y={ripple.y}
          />
        ))}
      </button>
    </>
  );
};

interface RippleEffectProps {
  x: number;
  y: number;
}

const RippleEffect: React.FC<RippleEffectProps> = ({ x, y }) => {
  return (
    <span
      className="absolute bg-blue-400/20 dark:bg-blue-300/20 rounded-full animate-ripple pointer-events-none"
      style={{
        left: x,
        top: y,
        width: '20px',
        height: '20px',
        marginLeft: '-10px',
        marginTop: '-10px',
      }}
    />
  );
};

export default RippleButton;