import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  delayBetweenTexts?: number;
  className?: string;
  showCursor?: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  texts,
  speed = 100,
  deleteSpeed = 50,
  delayBetweenTexts = 2000,
  className = '',
  showCursor = true
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];

    const handleTyping = () => {
      if (isPaused) {
        return;
      }

      if (isDeleting) {
        setCurrentText(currentFullText.substring(0, currentText.length - 1));

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setCurrentText(currentFullText.substring(0, currentText.length + 1));

        if (currentText === currentFullText) {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, delayBetweenTexts);
        }
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentTextIndex,
    isDeleting,
    isPaused,
    texts,
    speed,
    deleteSpeed,
    delayBetweenTexts
  ]);

  return (
    <span className={className}>
      {currentText}
      {showCursor && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

export default TypewriterText;