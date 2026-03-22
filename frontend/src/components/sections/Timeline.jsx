import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

const defaultTimelineData = [
  {
    year: '2024',
    entries: [
      {
        title: 'Senior Creative Developer',
        subtitle: 'TechCorp Innovation Labs',
        description: 'Leading development of immersive web experiences using cutting-edge technologies. Architecting scalable solutions for enterprise clients.',
        achievements: [
          'Led team of 5 developers',
          'Shipped 12 major projects',
          'Increased performance by 40%',
        ],
      },
    ],
  },
  {
    year: '2022',
    entries: [
      {
        title: 'Full Stack Developer',
        subtitle: 'DigitalCraft Agency',
        description: 'Built and maintained web applications for diverse clients across industries. Focused on creating performant, accessible interfaces.',
        achievements: [
          'Developed 20+ client websites',
          'Implemented CI/CD pipelines',
          'Mentored junior developers',
        ],
      },
    ],
  },
  {
    year: '2020',
    entries: [
      {
        title: 'Frontend Developer',
        subtitle: 'StartupXYZ',
        description: 'Started my professional journey building React applications. Learned the fundamentals of modern web development.',
        achievements: [
          'Built core product features',
          'Learned React & Node.js',
          'First production deployment',
        ],
      },
    ],
  },
];

const Timeline = ({ data = defaultTimelineData }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="timeline"
      className="timeline"
      ref={containerRef}
      style={{
        position: 'relative',
        padding: 'var(--section-padding) var(--space-6)',
        background: 'var(--bg-deep)',
      }}
    >
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <SectionTitle
          label="Journey"
          title="My Professional Path"
          description="A timeline of key milestones and experiences that shaped my career."
        />

        {/* Timeline Track */}
        <div style={{ position: 'relative', paddingBottom: 'var(--space-20)' }}>
          {/* Static Line */}
          <div
            style={{
              position: 'absolute',
              left: '40px',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, transparent 0%, var(--border-subtle) 5%, var(--border-subtle) 95%, transparent 100%)',
            }}
          />

          {/* Animated Progress Line */}
          <motion.div
            style={{
              position: 'absolute',
              left: '40px',
              top: 0,
              width: '2px',
              background: 'var(--gradient-timeline)',
              borderRadius: 'var(--radius-full)',
              height: lineHeight,
            }}
          />

          {/* Timeline Items */}
          {data.map((yearGroup, groupIndex) => (
            <div
              key={yearGroup.year}
              style={{
                position: 'relative',
                display: 'flex',
                gap: 'var(--space-10)',
                paddingTop: groupIndex === 0 ? 0 : 'var(--space-16)',
              }}
            >
              {/* Year Marker */}
              <div
                style={{
                  position: 'sticky',
                  top: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  zIndex: 10,
                  alignSelf: 'flex-start',
                }}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--bg-void)',
                    border: '3px solid var(--cosmic-purple)',
                    boxShadow: '0 0 20px var(--glow-purple)',
                    zIndex: 2,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-4xl)',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    writingMode: 'vertical-lr',
                    transform: 'rotate(180deg)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {yearGroup.year}
                </span>
              </div>

              {/* Entries */}
              <div style={{ flex: 1, paddingLeft: 'var(--space-6)' }}>
                {yearGroup.entries.map((entry, entryIndex) => (
                  <motion.div
                    key={entryIndex}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: entryIndex * 0.1 }}
                    whileHover={{ borderColor: 'var(--cosmic-purple)' }}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-xl)',
                      padding: 'var(--space-6)',
                      marginBottom: 'var(--space-6)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                      {entry.title}
                    </h3>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--cosmic-violet)', marginBottom: 'var(--space-4)', display: 'block' }}>
                      {entry.subtitle}
                    </span>
                    <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
                      {entry.description}
                    </p>

                    {/* Achievements */}
                    {entry.achievements && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
                        {entry.achievements.map((achievement, i) => (
                          <div
                            key={i}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 'var(--space-2)',
                              fontSize: 'var(--text-sm)',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            <CheckCircle size={14} style={{ color: 'var(--cosmic-cyan)' }} />
                            {achievement}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline {
            padding: var(--section-padding-mobile) var(--space-4) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Timeline;
