import { motion } from 'framer-motion';

const SectionTitle = ({
  label,
  title,
  description,
  align = 'center',
  className = '',
}) => {
  const alignStyles = {
    center: { textAlign: 'center', alignItems: 'center' },
    left: { textAlign: 'left', alignItems: 'flex-start' },
    right: { textAlign: 'right', alignItems: 'flex-end' },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      className={`section-title ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 'var(--space-16)',
        ...alignStyles[align],
      }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {label && (
        <motion.span
          className="section-title-label"
          variants={itemVariants}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--text-sm)',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-4)',
          }}
        >
          {label}
        </motion.span>
      )}

      {title && (
        <motion.h2
          className="section-title-heading"
          variants={itemVariants}
          style={{
            fontSize: 'clamp(var(--text-3xl), 5vw, var(--text-5xl))',
            fontWeight: 700,
            marginBottom: description ? 'var(--space-4)' : 0,
            lineHeight: 1.1,
          }}
        >
          {title}
        </motion.h2>
      )}

      {description && (
        <motion.p
          className="section-title-description"
          variants={itemVariants}
          style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--text-muted)',
            maxWidth: '600px',
            margin: align === 'center' ? '0 auto' : 0,
            lineHeight: 1.6,
          }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
