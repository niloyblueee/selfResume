import { motion } from 'framer-motion';
import { Sparkles, Github, Linkedin, Instagram, MessageCircle, ExternalLink } from 'lucide-react';

const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
const isTouchMac = typeof navigator !== 'undefined' && /Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1;
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || isTouchMac;
const encodeMailtoParam = (value) => encodeURIComponent(value ?? '').replace(/\+/g, '%20');

const buildEmailLink = (email, subject, body) => {
  if (isMobile) {
    return `mailto:${email}?subject=${encodeMailtoParam(subject)}&body=${encodeMailtoParam(body)}`;
  } else {
    const baseUrl = 'https://mail.google.com/mail/';
    const params = new URLSearchParams({
      view: 'cm',
      fs: '1',
      to: email,
      su: subject,
      body,
    });
    return `${baseUrl}?${params.toString()}`;
  }
};

const buildWhatsAppLink = (phoneNumber, message) => {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message ?? '');
  if (isMobile) {
    return `whatsapp://send?phone=${cleanNumber}&text=${encodedMessage}`;
  } else {
    return `https://web.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`;
  }
};

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
      {
        label: 'WhatsApp',
        href: buildWhatsAppLink(
          '01799937774',
          'Hi Niloy, I want to discuss a project.',
        ),
        external: !isMobile,
      },
      {
        label: 'Email',
        href: buildEmailLink(
          'niloynilblue@gmail.com',
          'Project inquiry',
          'Hi Niloy,\n\nI saw your portfolio and want to connect.\n\nProject summary:\nTimeline:\nBudget:\n\nThanks!',
        ),
        external: !isMobile,
      },
      { label: 'Resume', href: '/cv%20updated.pdf', external: true },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'GitHub', href: 'https://github.com/niloyblueee', icon: Github, external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/niloy-blueee-30787b294', icon: Linkedin, external: true },
      {
        label: 'WhatsApp',
        href: buildWhatsAppLink(
          '+8801799937774',
          'Hi Niloy, I want to discuss a project.',
        ),
        icon: MessageCircle,
        external: !isMobile,
      },
      { label: 'Instagram', href: 'https://www.instagram.com/nil_and_blueee?igsh=NXp0aW8wOG04ZThw&utm_source=qr', icon: Instagram, external: true },
    ],
  },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/niloyblueee', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/niloy-blueee-30787b294', label: 'LinkedIn' },
  {
    icon: MessageCircle,
    href: buildWhatsAppLink(
      '+8801799937774',
      'Hi Niloy, I want to discuss a project.',
    ),
    label: 'WhatsApp',
  },
  { icon: Instagram, href: 'https://www.instagram.com/nil_and_blueee?igsh=NXp0aW8wOG04ZThw&utm_source=qr', label: 'Instagram' },
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
              Stitching immersive digital experiences through innovative design and State of the art technology.
            </p>

            {/* Social Links */}
            <div className="footer-socials" style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
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
              className={`footer-column footer-column-${column.title.toLowerCase()}`}
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
              <ul className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
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
            © {currentYear} Niloy Blueee . All rights reserved.
          </p>
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
