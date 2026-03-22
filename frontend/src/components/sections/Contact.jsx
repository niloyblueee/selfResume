import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { AnimatedButton, Button } from '../ui/Button';
import GlowOrb from '../effects/GlowOrb';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
];

const Contact = ({
  title = "Let's Create Something",
  titleHighlight = 'Amazing Together',
  description = "Have a project in mind? I'd love to hear about it. Let's discuss how we can work together to bring your vision to life.",
  email = 'hello@example.com',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
    },
  };

  return (
    <section
      id="contact"
      className="contact"
      style={{
        position: 'relative',
        padding: 'var(--space-32) var(--space-6)',
        overflow: 'hidden',
      }}
    >
      {/* Background Decorations */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <GlowOrb size={400} color="purple" position={{ top: '-20%', left: '-10%' }} blur={100} opacity={0.25} />
        <GlowOrb size={300} color="pink" position={{ bottom: '-10%', right: '-5%' }} blur={80} opacity={0.2} />
        <GlowOrb size={200} color="cyan" position={{ top: '50%', left: '60%' }} blur={60} opacity={0.15} />
      </div>

      <motion.div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Label */}
        <motion.span
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
            marginBottom: 'var(--space-8)',
          }}
        >
          <Mail size={14} />
          Get in Touch
        </motion.span>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          style={{
            fontSize: 'clamp(var(--text-4xl), 8vw, var(--text-7xl))',
            lineHeight: 1.1,
            marginBottom: 'var(--space-6)',
          }}
        >
          <span style={{ display: 'block' }}>{title}</span>
          <span
            style={{
              display: 'block',
              background: 'var(--gradient-text)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {titleHighlight}
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--text-secondary)',
            maxWidth: '500px',
            margin: '0 auto var(--space-10)',
            lineHeight: 1.7,
          }}
        >
          {description}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-12)',
          }}
        >
          <AnimatedButton onClick={() => window.location.href = `mailto:${email}`}>
            Let's Collaborate
          </AnimatedButton>
          <Button
            variant="secondary"
            onClick={() => window.open('/resume.pdf', '_blank')}
          >
            View Resume
          </Button>
        </motion.div>

        {/* Email Link */}
        <motion.a
          variants={itemVariants}
          href={`mailto:${email}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            color: 'var(--text-secondary)',
            fontSize: 'var(--text-base)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          whileHover={{ color: 'var(--cosmic-violet)' }}
        >
          <Mail size={20} />
          {email}
        </motion.a>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-4)',
            marginTop: 'var(--space-8)',
          }}
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '50%',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
              }}
              whileHover={{
                background: 'var(--cosmic-purple)',
                borderColor: 'var(--cosmic-purple)',
                color: 'var(--text-primary)',
                y: -4,
                boxShadow: '0 10px 30px var(--glow-purple)',
              }}
              transition={{ duration: 0.2 }}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
