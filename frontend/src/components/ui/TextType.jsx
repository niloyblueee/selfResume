import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';

const TextType = ({
  texts = ['Hello World'],
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseDuration = 2000,
  initialDelay = 0,
  loop = true,
  showCursor = true,
  cursorCharacter = '|',
  cursorClassName = '',
  className = '',
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  const textArray = useMemo(
    () => (Array.isArray(texts) ? texts : [texts]),
    [texts]
  );

  // Cursor blink animation
  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });
    }
  }, [showCursor]);

  // Initial delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarted(true);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [initialDelay]);

  // Typing logic
  useEffect(() => {
    if (!isStarted) return;

    const currentText = textArray[currentIndex];
    let timeout;

    if (isDeleting) {
      if (displayedText === '') {
        setIsDeleting(false);

        // Move to next text
        const nextIndex = (currentIndex + 1) % textArray.length;

        if (nextIndex === 0 && !loop) {
          onComplete?.();
          return;
        }

        setCurrentIndex(nextIndex);
        timeout = setTimeout(() => {}, pauseDuration / 2);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (displayedText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing current text
        if (textArray.length > 1) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        } else if (!loop) {
          onComplete?.();
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [
    isStarted,
    displayedText,
    currentIndex,
    isDeleting,
    textArray,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    loop,
    onComplete,
  ]);

  return (
    <span ref={containerRef} className={`text-type ${className}`}>
      <span className="text-type-content">{displayedText}</span>
      {showCursor && (
        <span
          ref={cursorRef}
          className={`text-type-cursor ${cursorClassName}`}
          style={{
            marginLeft: '2px',
            color: 'var(--cosmic-violet)',
          }}
        >
          {cursorCharacter}
        </span>
      )}
    </span>
  );
};

export default TextType;
