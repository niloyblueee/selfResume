/**
 * FloatingShapes.jsx
 *
 * Decorative floating capsule/pill shapes for hero background.
 * Creates an animated, ethereal atmosphere with gradient-filled shapes.
 *
 * Features:
 * - Multiple animated shapes with varying sizes and rotations
 * - Entrance animation (fall from top with fade)
 * - Continuous floating animation
 * - Glass morphism effect with subtle borders
 *
 * Note: Hidden on mobile via CSS (.hero-floating-shapes)
 * to reduce visual clutter and improve performance.
 *
 * @author Portfolio Project
 */

import { motion } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   SHAPE CONFIGURATION
   Each shape has position, size, rotation, and color
   ═══════════════════════════════════════════════════════════════ */
const shapes = [
  {
    id: 1,
    width: 600,
    height: 140,
    rotate: 12,
    gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
    position: { left: '-10%', top: '15%' },
    delay: 0.3,
  },
  {
    id: 2,
    width: 500,
    height: 120,
    rotate: -15,
    gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
    position: { right: '-5%', top: '70%' },
    delay: 0.5,
  },
  {
    id: 3,
    width: 300,
    height: 80,
    rotate: -8,
    gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
    position: { left: '5%', bottom: '10%' },
    delay: 0.4,
  },
  {
    id: 4,
    width: 200,
    height: 60,
    rotate: 20,
    gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
    position: { right: '15%', top: '10%' },
    delay: 0.6,
  },
  {
    id: 5,
    width: 150,
    height: 40,
    rotate: -25,
    gradient: 'linear-gradient(135deg, rgba(124, 58, 237, 0.25) 0%, transparent 70%)',
    position: { left: '20%', top: '5%' },
    delay: 0.7,
  },
];

/* ═══════════════════════════════════════════════════════════════
   FLOATING SHAPE COMPONENT
   Individual animated shape with entrance and float animations
   ═══════════════════════════════════════════════════════════════ */
const FloatingShape = ({ width, height, rotate, gradient, position, delay }) => {
  return (
    <motion.div
      /* Entrance animation - fall from top with rotation */
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      style={{
        position: 'absolute',
        ...position,
      }}
    >
      {/* Continuous floating animation */}
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          width,
          height,
          position: 'relative',
        }}
      >
        {/* Shape body with gradient and glass effect */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '9999px',  /* Pill/capsule shape */
            background: gradient,
            backdropFilter: 'blur(2px)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px 0 rgba(255, 255, 255, 0.05)',
          }}
        >
          {/* Inner glow highlight */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '9999px',
              background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15), transparent 70%)',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   FLOATING SHAPES CONTAINER
   Renders all shapes within an absolute positioned container
   ═══════════════════════════════════════════════════════════════ */
const FloatingShapes = ({ className = '' }) => {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',  /* Allow clicks to pass through */
      }}
    >
      {shapes.map((shape) => (
        <FloatingShape key={shape.id} {...shape} />
      ))}
    </div>
  );
};

export default FloatingShapes;
