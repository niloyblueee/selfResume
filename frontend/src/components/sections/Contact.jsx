import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Github, Linkedin } from 'lucide-react';
import { AnimatedButton, Button } from '../ui/Button';
import GlowOrb from '../effects/GlowOrb';

const WhatsAppIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.04 2C6.54 2 2.08 6.37 2.08 11.77c0 2.12.72 4.08 1.94 5.65L2 22l4.69-1.91c1.53.82 3.29 1.29 5.35 1.29 5.5 0 9.96-4.37 9.96-9.77S17.54 2 12.04 2zm0 17.6c-1.84 0-3.53-.54-4.95-1.46l-.35-.22-2.78 1.13 1.15-2.66-.25-.35c-1.1-1.45-1.75-3.22-1.75-5.27 0-4.78 3.97-8.67 8.93-8.67 4.96 0 8.93 3.89 8.93 8.67 0 4.78-3.97 8.66-8.93 8.66zm4.92-6.47c-.27-.13-1.6-.77-1.85-.86-.25-.09-.43-.13-.6.13-.18.27-.69.86-.85 1.03-.16.18-.31.2-.58.07-.27-.13-1.12-.4-2.13-1.28-.79-.69-1.32-1.53-1.47-1.8-.16-.27-.02-.42.12-.55.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.33-.02-.47-.07-.13-.6-1.45-.82-1.99-.22-.53-.44-.46-.6-.47h-.52c-.18 0-.47.07-.71.33-.25.27-.93.9-.93 2.19s.95 2.54 1.08 2.72c.13.18 1.86 2.87 4.51 4.03.63.27 1.12.44 1.5.56.63.2 1.2.17 1.65.1.5-.07 1.6-.64 1.82-1.27.22-.63.22-1.17.16-1.27-.07-.1-.25-.16-.52-.29z" />
  </svg>
);

const Contact = ({
  title = "Let's Create Something",
  titleHighlight = 'Amazing Together',
  description = "Have a project in mind? I'd love to hear about it. Let's discuss how we can work together to bring your vision to life.",
  whatsappNumber = '15551234567',
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    comments: '',
  });

  const buildWhatsAppLink = (message) => {
    const sanitizedNumber = `${whatsappNumber}`.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${sanitizedNumber}?text=${encodedMessage}`;
  };

  const defaultWhatsAppMessage =
    "Hi Niloy, I saw your portfolio and want to discuss a project.";

  const whatsappHref = buildWhatsAppLink(defaultWhatsAppMessage);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = [
      "Hi Niloy, I want to collaborate.",
      `Name: ${formData.name || 'N/A'}`,
      `Email: ${formData.email || 'N/A'}`,
      `WhatsApp: ${formData.whatsapp || 'N/A'}`,
      `Comments: ${formData.comments || 'N/A'}`,
    ].join('\n');

    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/niloyblueee', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/niloy-blueee-30787b294', label: 'LinkedIn' },
    { icon: WhatsAppIcon, href: whatsappHref, label: 'WhatsApp' },
  ];
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
          <MessageCircle size={14} />
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
        {!showForm && (
          <motion.div
            className="contact-cta"
            variants={itemVariants}
          >
            <AnimatedButton type="button" onClick={handleShowForm}>
              Let's Collaborate
            </AnimatedButton>
            <Button
              variant="secondary"
              type="button"
              onClick={() => window.open('/cv%20updated.pdf', '_blank')}
            >
              View Resume
            </Button>
          </motion.div>
        )}

        {/* Contact Form */}
        {showForm && (
          <motion.form
            className="contact-form"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            onSubmit={handleSubmit}
          >
            <div className="contact-form-grid">
              <label className="contact-field">
                <span>Name</span>
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="contact-field">
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="contact-field">
                <span>WhatsApp Number</span>
                <input
                  name="whatsapp"
                  type="tel"
                  placeholder="WhatsApp number (optional)"
                  value={formData.whatsapp}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label className="contact-field">
              <span>Project Details</span>
              <textarea
                name="comments"
                rows={4}
                placeholder="Share scope, timeline, budget, and any key requirements."
                value={formData.comments}
                onChange={handleChange}
              />
            </label>

            <div className="contact-form-actions">
              <AnimatedButton type="submit">Send via WhatsApp</AnimatedButton>
              <Button
                variant="secondary"
                type="button"
                onClick={() => window.open('/cv%20updated.pdf', '_blank')}
              >
                View Resume
              </Button>
            </div>
          </motion.form>
        )}

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
          {socialLinks.map(({ icon: Icon, href, label }) => {
            const isExternalLink = /^https?:\/\//i.test(href);
            return (
            <motion.a
              key={label}
              href={href}
              {...(isExternalLink && { target: '_blank', rel: 'noopener noreferrer' })}
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
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
