/**
 * About.jsx
 *
 * About Me section component with profile photo and bio.
 * Features:
 * - Desktop: Two-column grid layout (photo | content)
 * - Mobile: Floating photo with text wrapping around it
 * - Animated entrance with Framer Motion
 * - Skills tags and stats display
 *
 * @author Portfolio Project
 */

import { motion } from 'framer-motion';
import { Code } from 'lucide-react';
import GlowOrb from '../effects/GlowOrb';

/* ═══════════════════════════════════════════════════════════════
   SKILLS AND STATS DATA
   ═══════════════════════════════════════════════════════════════ */
const skills = [
    'Python',
    'React',
    'JavaScript',
    'Content Strategy',
    'Brand Identity Development',
    'Client Communication',
    'Project Management',
    'Database Design',
    'Backend Systems',
    'CSS',
    'Node.js',
    'Flask',
    'System Design',
    'Business Workflow Optimization',
    'Debugging & Performance Tuning',
    'Next.js',
    'Git',
    'REST APIs',
  ];

const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '5+', label: 'Projects Completed' },
  { value: '5+', label: 'Happy Clients' },
];

const About = ({
  title = 'Passionate about crafting exceptional digital experiences',
  description = `I'm Niloy, a Computer Science student at BRAC University and the founder of
  (https://theluminos.org), a digital solutions firm focused on helping businesses grow through
  technology and creative strategy.

  I specialize in building custom software tailored to real business needs, from automation systems
  to full-scale applications. As the founder of TheLumiNos, I lead end-to-end solution development,
  from strategy and planning to execution and delivery. I focus on solving business problems at
  their core, aligning technology, operations, and branding to create systems that scale. In
  parallel, I direct content and digital identity strategies to help businesses stand out in
  competitive markets.

  I enjoy solving real-world problems by combining technical expertise with practical business
  understanding, delivering solutions that are both efficient and impactful.`,
  imageUrl = '/DP.jpg',
}) => {

  /* ═══════════════════════════════════════════════════════════════
     ANIMATION VARIANTS
     Staggered fade-up animation for content elements
     ═══════════════════════════════════════════════════════════════ */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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

  const renderDescription = (text) => {
    const splitRegex = /(https?:\/\/[^\s)]+)/g;
    const urlRegex = /^https?:\/\/[^\s)]+$/;

    return text.split(splitRegex).map((part, index) => {
      if (urlRegex.test(part)) {
        const linkLabel = part.includes('theluminos.org') ? 'TheLumiNos' : part;

        return (
          <a
            key={`about-link-${index}`}
            href={part}
            target="_blank"
            rel="noreferrer"
          >
            {linkLabel}
          </a>
        );
      }

      return part;
    });
  };

  return (
    <section id="about" className="about">
      <div className="about-container">
        <motion.div
          className="about-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* ═══════════════════════════════════════════════════════════════
              DESKTOP LAYOUT - Two column grid
              ═══════════════════════════════════════════════════════════════ */}
          <div className="about-grid about-desktop">
            {/* Image Side */}
            <motion.div className="about-visual" variants={itemVariants}>
              {/* Decorative glow orbs */}
              <GlowOrb size={200} color="purple" position={{ top: '-40px', right: '-40px' }} blur={60} opacity={0.3} />
              <GlowOrb size={250} color="cyan" position={{ bottom: '-60px', left: '-60px' }} blur={80} opacity={0.2} />

              <div className="about-image-wrapper">
                {/* Glow border effect */}
                <div className="about-image-glow" />
                <img src={imageUrl} alt="Profile" className="about-image" />
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div className="about-content" variants={containerVariants}>
              {/* Section Label */}
              <motion.span className="about-label" variants={itemVariants}>
                <Code size={14} />
                About Me
              </motion.span>

              {/* Title */}
              <motion.h2 className="about-title" variants={itemVariants}>
                {title}
              </motion.h2>

              {/* Description */}
              <motion.p className="about-description" variants={itemVariants}>
                {renderDescription(description)}
              </motion.p>

              {/* Skills Section */}
              <motion.div className="about-skills" variants={itemVariants}>
                <h4 className="about-skills-title">Technologies & Skills</h4>
                <div className="about-skills-list">
                  {skills.map((skill) => (
                    <motion.span
                      key={skill}
                      className="about-skill"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Stats Section */}
              <motion.div className="about-stats" variants={itemVariants}>
                {stats.map((stat) => (
                  <div key={stat.label} className="about-stat">
                    <div className="about-stat-value">{stat.value}</div>
                    <div className="about-stat-label">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              MOBILE LAYOUT - Floating image with text wrap
              ═══════════════════════════════════════════════════════════════ */}
          <div className="about-mobile">
            <motion.div className="about-content-mobile" variants={containerVariants}>
              {/* Section Label */}
              <motion.span className="about-label" variants={itemVariants}>
                <Code size={14} />
                About Me
              </motion.span>

              {/* Title */}
              <motion.h2 className="about-title" variants={itemVariants}>
                {title}
              </motion.h2>

              {/* Floating Image - Text wraps around it */}
              <motion.div className="about-image-float" variants={itemVariants}>
                <img src={imageUrl} alt="Profile" className="about-image-small" />
              </motion.div>

              {/* Description - Wraps around the image */}
              <motion.p className="about-description" variants={itemVariants}>
                {renderDescription(description)}
              </motion.p>

              {/* Clear float before skills */}
              <div className="about-clearfix" />

              {/* Skills Section */}
              <motion.div className="about-skills" variants={itemVariants}>
                <h4 className="about-skills-title">Technologies & Skills</h4>
                <div className="about-skills-list">
                  {skills.map((skill) => (
                    <span key={skill} className="about-skill">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Stats Section */}
              <motion.div className="about-stats" variants={itemVariants}>
                {stats.map((stat) => (
                  <div key={stat.label} className="about-stat">
                    <div className="about-stat-value">{stat.value}</div>
                    <div className="about-stat-label">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
