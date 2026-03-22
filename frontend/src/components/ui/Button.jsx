/**
 * Button.jsx
 *
 * Reusable button components with Framer Motion animations.
 * Includes base Button and AnimatedButton for CTA sections.
 *
 * @author Portfolio Project
 */

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   BASE BUTTON COMPONENT
   Flexible button with multiple variants (primary, secondary, ghost)
   and sizes (small, default, large)
   ═══════════════════════════════════════════════════════════════ */
const Button = forwardRef(({
  children,
  variant = 'primary',   // Button style variant
  size = 'default',      // Button size
  icon,                  // Optional icon element
  iconPosition = 'right', // Icon position (left/right)
  disabled = false,
  className = '',
  onClick,
  ...props
}, ref) => {

  /* Base styles applied to all button variants */
  const baseStyles = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    lineHeight: 1,
    border: 'none',
    borderRadius: 'var(--radius-full)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    overflow: 'hidden',
    transition: 'all var(--transition-base)',
    opacity: disabled ? 0.5 : 1,
  };

  /* Variant-specific styles */
  const variants = {
    // Primary: Gradient background button
    primary: {
      background: 'var(--gradient-hero)',
      color: 'var(--text-primary)',
    },
    // Secondary: Transparent with border
    secondary: {
      background: 'transparent',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-light)',
      backdropFilter: 'blur(10px)',
    },
    // Ghost: Subtle glass background
    ghost: {
      background: 'var(--bg-glass)',
      color: 'var(--text-secondary)',
      border: '1px solid var(--border-subtle)',
    },
  };

  /* Size-specific styles */
  const sizes = {
    small: {
      padding: '0.5rem 1rem',
      fontSize: 'var(--text-xs)',
    },
    default: {
      padding: '0.75rem 1.5rem',
      fontSize: 'var(--text-sm)',
    },
    large: {
      padding: '1rem 2rem',
      fontSize: 'var(--text-base)',
    },
  };

  /* Merge all styles */
  const style = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size],
  };

  return (
    <motion.button
      ref={ref}
      style={style}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      /* Hover animation: lift up slightly */
      whileHover={{ y: -2 }}
      /* Tap animation: scale down for feedback */
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {/* Render icon on left if specified */}
      {iconPosition === 'left' && icon}
      {children}
      {/* Render icon on right if specified */}
      {iconPosition === 'right' && icon}
    </motion.button>
  );
});

/* ═══════════════════════════════════════════════════════════════
   ANIMATED BUTTON COMPONENT
   Primary CTA button with bluish gradient and glow effect on hover.
   Used for "Let's Collaborate" and "Let's Talk" buttons.
   ═══════════════════════════════════════════════════════════════ */
const AnimatedButton = forwardRef(({
  children,
  icon = <ArrowUpRight size={16} />,  // Default arrow icon
  className = '',
  onClick,
  ...props
}, ref) => {
  return (
    <motion.button
      ref={ref}
      className={`btn btn-primary ${className}`}
      onClick={onClick}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        height: '48px',
        padding: '0 1.5rem',
        /* Bluish gradient background */
        background: 'var(--gradient-button-blue)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        fontWeight: 600,
        border: 'none',
        borderRadius: 'var(--radius-full)',
        cursor: 'pointer',
      }}
      /* Hover: lift up and add blue glow */
      whileHover={{
        y: -2,
        boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)'
      }}
      /* Tap: scale down for click feedback */
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <span>{children}</span>
      {icon}
    </motion.button>
  );
});

/* Set display names for React DevTools */
Button.displayName = 'Button';
AnimatedButton.displayName = 'AnimatedButton';

export { Button, AnimatedButton };
export default Button;
