import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Clock, Mail, Menu, X } from 'lucide-react';
import { AnimatedButton } from '../ui/Button';

const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
const isTouchMac = typeof navigator !== 'undefined' && /Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1;
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || isTouchMac;

const buildWhatsAppLink = (phoneNumber, message) => {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message ?? '');

  if (isMobile) {
    return `whatsapp://send?phone=${cleanNumber}&text=${encodedMessage}`;
  }

  return `https://web.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`;
};

const navItems = [
  { label: 'Home', href: '#home', icon: Home, gradient: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', iconColor: 'var(--cosmic-blue)' },
  { label: 'About', href: '#about', icon: User, gradient: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', iconColor: 'var(--cosmic-violet)' },
  { label: 'Projects', href: '#projects', icon: Briefcase, gradient: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)', iconColor: 'var(--cosmic-pink)' },
  { label: 'Journey', href: '#timeline', icon: Clock, gradient: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)', iconColor: 'var(--cosmic-cyan)' },
  { label: 'Contact', href: '#contact', icon: Mail, gradient: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', iconColor: 'var(--cosmic-purple)' },
];

const NavLink = ({ item, isActive, onClick }) => {
  const Icon = item.icon;

  return (
    <motion.a
      href={item.href}
      onClick={onClick}
      className={`navbar-link ${isActive ? 'active' : ''}`}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
        fontSize: 'var(--text-sm)',
        fontWeight: 500,
        borderRadius: 'var(--radius-xl)',
        textDecoration: 'none',
        perspective: '600px',
        overflow: 'hidden',
      }}
      whileHover="hover"
      initial="initial"
    >
      {/* Glow background */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-2px',
          background: item.gradient,
          borderRadius: 'inherit',
          opacity: isActive ? 1 : 0,
          zIndex: -1,
        }}
        variants={{
          initial: { opacity: 0, scale: 0.8 },
          hover: { opacity: 1, scale: 1.5 },
        }}
        transition={{ duration: 0.3 }}
      />

      {/* 3D Flip Container */}
      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transformStyle: 'preserve-3d',
          transformOrigin: 'center bottom',
        }}
        variants={{
          initial: { rotateX: 0 },
          hover: { rotateX: -90 },
        }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <Icon size={18} style={{ color: isActive ? item.iconColor : 'inherit' }} />
        <span>{item.label}</span>
      </motion.div>

      {/* Back face (visible on hover) */}
      <motion.div
        style={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transformStyle: 'preserve-3d',
          transformOrigin: 'center top',
          rotateX: 90,
        }}
        variants={{
          initial: { rotateX: 90, opacity: 0 },
          hover: { rotateX: 0, opacity: 1 },
        }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <Icon size={18} style={{ color: item.iconColor }} />
        <span style={{ color: 'var(--text-primary)' }}>{item.label}</span>
      </motion.div>
    </motion.a>
  );
};

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const whatsappHref = buildWhatsAppLink(
    '01799937774',
    'Hi Niloy, I want to discuss a project.',
  );

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.replace('#', ''));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 'var(--z-navbar)',
        padding: '1rem 1.5rem',
        background: isScrolled ? 'linear-gradient(180deg, rgba(3, 0, 20, 0.95) 0%, rgba(3, 0, 20, 0.7) 100%)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-subtle)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        className="navbar-inner"
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          className="navbar-logo"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0',
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            textDecoration: 'none',
          }}
        >
          <img
            src="/logo.svg"
            alt="Main logo"
            className="navbar-logo-image"
          />
          
        </a>

        {/* Desktop Navigation */}
        <motion.div
          className="navbar-menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.5rem',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-2xl)',
            backdropFilter: 'blur(10px)',
          }}
          initial="initial"
          whileHover="hover"
        >
          {/* Nav glow effect */}
          <motion.div
            style={{
              position: 'absolute',
              inset: '-2px',
              background: 'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.1), transparent 70%)',
              borderRadius: 'inherit',
              zIndex: -1,
            }}
            variants={{
              initial: { opacity: 0 },
              hover: { opacity: 1 },
            }}
            transition={{ duration: 0.3 }}
          />

          {navItems.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              isActive={activeSection === item.href.replace('#', '')}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
            />
          ))}
        </motion.div>

        {/* CTA Button */}
        <div className="navbar-cta" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AnimatedButton onClick={() => window.open(whatsappHref, '_blank', 'noopener,noreferrer')}>
            Let's Talk
          </AnimatedButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            width: '40px',
            height: '40px',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            color: 'var(--text-primary)',
          }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="navbar-mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '80px',
              left: '1rem',
              right: '1rem',
              padding: '1rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    color: activeSection === item.href.replace('#', '') ? 'var(--text-primary)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    borderRadius: 'var(--radius-lg)',
                    background: activeSection === item.href.replace('#', '') ? 'rgba(124, 58, 237, 0.15)' : 'transparent',
                  }}
                >
                  <Icon size={18} style={{ color: item.iconColor }} />
                  {item.label}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .navbar-menu {
            display: none !important;
          }
          .navbar-cta {
            display: none !important;
          }
          .navbar-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
