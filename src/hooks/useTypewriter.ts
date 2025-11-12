import { useState, useEffect } from 'react';

export const useTypewriter = (texts: string[], speed: number = 100, deleteSpeed: number = 50, language?: string) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (charIndex < currentText.length) {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Finished typing, pause then start deleting
          setIsDeleting(true);
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          setDisplayText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, deleteSpeed, language]);

  return displayText;
};