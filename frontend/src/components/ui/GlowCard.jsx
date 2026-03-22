import { forwardRef, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const GlowCard = forwardRef(({
  children,
  className = '',
  hoverEffect = true,
  glowColor = 'purple',
  ...props
}, ref) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current || !hoverEffect) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  const glowColors = {
    purple: 'rgba(124, 58, 237, 0.15)',
    pink: 'rgba(236, 72, 153, 0.15)',
    cyan: 'rgba(6, 182, 212, 0.15)',
    mixed: 'rgba(124, 58, 237, 0.1)',
  };

  return (
    <motion.div
      ref={(node) => {
        cardRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={`glow-card ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.3 } } : undefined}
      style={{
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`,
        position: 'relative',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        overflow: 'hidden',
      }}
      {...props}
    >
      {/* Gradient Border */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '1px',
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.5), rgba(236, 72, 153, 0.3), rgba(6, 182, 212, 0.2))',
          borderRadius: 'inherit',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          opacity: hoverEffect ? 0.5 : 0.3,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Mouse-following glow */}
      {hoverEffect && (
        <div
          style={{
            position: 'absolute',
            inset: '-50%',
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${glowColors[glowColor]}, transparent 50%)`,
            opacity: 0.5,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </motion.div>
  );
});

GlowCard.displayName = 'GlowCard';

export default GlowCard;
