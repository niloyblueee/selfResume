import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import TextType from '../ui/TextType';
import { AnimatedButton, Button } from '../ui/Button';
import LightPillar from '../effects/LightPillar';
import { contactContent } from '../../data/content';

const Hero = ({
  badge = 'Creative Developer',
  title = 'Crafting Digital',
  titleHighlight = 'Experiences',
  typingTexts = [
    'Building immersive web apps',
    'Designing cosmic interfaces',
    'Creating memorable journeys',
  ],
  description = 'Transforming ideas into exceptional digital experiences through innovative design and cutting-edge technology.',
  onContactClick,
  onProjectsClick,
}) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const buildEmailLink = (subject, body) => {
    if (isMobile) {
      // Mobile → use mailto (best UX)
      const params = new URLSearchParams({ subject, body });
      return `mailto:${contactContent.email}?${params.toString()}`;
    } else {
      // Desktop → Gmail web is fine
      const baseUrl = 'https://mail.google.com/mail/';
      const params = new URLSearchParams({
        view: 'cm',
        fs: '1',
        to: contactContent.email,
        su: subject,
        body,
      });
      return `${baseUrl}?${params.toString()}`;
    }
  };

  const emailHref = buildEmailLink(
    "Let's collaborate",
    "Hi Niloy,\n\nI saw your portfolio and want to discuss a project.\n\nProject summary:\nTimeline:\nBudget:\n\nThanks!",
  );
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        delay: 0.3 + i * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <section id="home" className="hero">
      {/* Background Effects */}
      <div className="hero-background">
        {/* Light Pillar Effect */}
        <div className="hero-pillar">
          <LightPillar
            topColor="#5227FF"
            bottomColor="#FF9FFC"
            intensity={0.9}
            rotationSpeed={0.3}
            glowAmount={0.002}
            pillarWidth={3}
            pillarHeight={0.7}
            noiseIntensity={0.5}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="screen"
            quality="high"
          />
        </div>

        <div className="hero-pillar-glow" />
        <div className="hero-light-streaks" />
        <div className="hero-base-bloom" />
        <div className="hero-noise" />
        <div className="hero-vignette" />

        {/* Gradient Overlays */}
        <div className="hero-gradient-overlay" />
      </div>

      {/* Bottom Fade */}
      <div className="hero-bottom-fade" />

      {/* Content */}
      <div className="hero-content">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="hero-badge"
        >
          <span className="hero-badge-dot" />
          <span className="hero-badge-text">
            {badge}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="hero-title"
        >
          <span className="hero-title-line">{title}</span>
          <span className="hero-title-line hero-title-gradient">
            {titleHighlight}
          </span>
        </motion.h1>

        {/* Typing Text */}
        <motion.div
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="hero-typing"
        >
          <TextType
            texts={typingTexts}
            typingSpeed={60}
            deletingSpeed={40}
            pauseDuration={2500}
            cursorCharacter="_"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="hero-description"
        >
          {description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={4}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="hero-cta"
        >
          <AnimatedButton onClick={() => window.open(emailHref, isMobile ? '_self' : '_blank', 'noopener,noreferrer')}>
            Let's Collaborate
          </AnimatedButton>
          <Button variant="secondary" onClick={onProjectsClick}>
            View Projects
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="hero-scroll"
      >
        <span>Scroll to explore</span>
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;
