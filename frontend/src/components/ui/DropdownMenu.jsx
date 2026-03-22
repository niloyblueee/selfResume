import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const DropdownMenu = ({
  trigger,
  options = [],
  children,
  className = '',
  align = 'left',
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleOptionClick = (option) => {
    onSelect?.(option);
    option.onClick?.();
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`dropdown ${isOpen ? 'open' : ''} ${className}`} style={{ position: 'relative' }}>
      {/* Trigger */}
      <button
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          color: 'var(--text-primary)',
          fontSize: 'var(--text-sm)',
          fontWeight: 500,
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.25s ease',
        }}
      >
        {trigger || children || 'Menu'}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      {/* Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="dropdown-menu"
            initial={{ opacity: 0, y: -5, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -5, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 0.5rem)',
              [align]: 0,
              minWidth: '200px',
              padding: '0.5rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              zIndex: 'var(--z-dropdown)',
            }}
          >
            {options.map((option, index) => (
              <motion.button
                key={option.label || index}
                className="dropdown-item"
                onClick={() => handleOptionClick(option)}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                whileHover={{ backgroundColor: 'rgba(124, 58, 237, 0.15)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--text-secondary)',
                  fontSize: 'var(--text-sm)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'color 0.15s ease',
                }}
              >
                {option.icon && (
                  <span style={{ width: '16px', height: '16px' }}>
                    {option.icon}
                  </span>
                )}
                {option.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;
