import { motion } from 'framer-motion';

const GlowOrb = ({
  size = 300,
  color = 'purple',
  position = { top: '0%', left: '0%' },
  blur = 80,
  opacity = 0.3,
  animate = true,
  className = '',
}) => {
  const colors = {
    purple: 'var(--cosmic-purple)',
    pink: 'var(--cosmic-pink)',
    cyan: 'var(--cosmic-cyan)',
    violet: 'var(--cosmic-violet)',
    blue: 'var(--cosmic-blue)',
  };

  const orbColor = colors[color] || color;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={animate ? {
        opacity: [opacity * 0.5, opacity, opacity * 0.7],
        scale: [0.9, 1.1, 0.95],
        x: [0, 30, -20, 0],
        y: [0, -20, 30, 0],
      } : { opacity, scale: 1 }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: orbColor,
        filter: `blur(${blur}px)`,
        pointerEvents: 'none',
        ...position,
      }}
    />
  );
};

export default GlowOrb;
