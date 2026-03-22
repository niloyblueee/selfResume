import { motion } from 'framer-motion';
import { Sparkles, Github, Linkedin, Twitter, Instagram, Mail, ExternalLink } from 'lucide-react';

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Projects', href: '#projects' },
      { label: 'Journey', href: '#timeline' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Contact', href: '#contact' },
      { label: 'Email', href: 'mailto:hello@example.com' },
      { label: 'Resume', href: '#', external: true },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'GitHub', href: 'https://github.com', icon: Github, external: true },
      { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin, external: true },
      { label: 'Twitter', href: 'https://twitter.com', icon: Twitter, external: true },
      { label: 'Instagram', href: 'https://instagram.com', icon: Instagram, external: true },
    ],
  },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="footer"
      style={{
        position: 'relative',
        padding: 'var(--space-16) var(--space-6)',
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--border-subtle)',
        overflow: 'hidden',
      }}
    >
      {/* Top glow line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--cosmic-purple), var(--cosmic-pink), transparent)',
          opacity: 0.5,
        }}
      />

      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-50%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(circle, var(--glow-purple) 0%, transparent 70%)',
          opacity: 0.1,
          pointerEvents: 'none',
        }}
      />

      <motion.div
        className="footer-container"
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Main Grid */}
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr repeat(3, 1fr)',
            gap: 'var(--space-8)',
            marginBottom: 'var(--space-12)',
          }}
        >
          {/* Brand Column */}
          <motion.div className="footer-brand" variants={itemVariants}>
            <a
              href="#home"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                marginBottom: 'var(--space-4)',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'var(--gradient-hero)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={18} color="white" />
              </div>
              Portfolio
            </a>
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-muted)',
                maxWidth: '280px',
                lineHeight: 1.6,
              }}
            >
              Crafting immersive digital experiences through innovative design and cutting-edge technology.
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '50%',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  whileHover={{
                    background: 'rgba(124, 58, 237, 0.2)',
                    borderColor: 'var(--cosmic-purple)',
                    color: 'var(--cosmic-violet)',
                    y: -2,
                  }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {footerLinks.map((column, index) => (
            <motion.div
              key={column.title}
              className="footer-column"
              variants={itemVariants}
              custom={index}
            >
              <h4
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {column.title}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {column.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.label}>
                      <motion.a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-muted)',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                        }}
                        whileHover={{
                          color: 'var(--cosmic-violet)',
                          x: 4,
                        }}
                      >
                        {Icon && <Icon size={14} />}
                        {link.label}
                        {link.external && <ExternalLink size={12} style={{ opacity: 0.5 }} />}
                      </motion.a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="footer-bottom"
          variants={itemVariants}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 'var(--space-8)',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
            © {currentYear} Your Name. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
            <a
              href="#"
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
            >
              Terms of Service
            </a>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 968px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-brand {
            grid-column: span 2;
            margin-bottom: var(--space-4);
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-brand {
            grid-column: span 1;
          }
          .footer-bottom {
            flex-direction: column !important;
            gap: var(--space-4) !important;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
