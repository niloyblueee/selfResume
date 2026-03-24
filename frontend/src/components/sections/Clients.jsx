import { useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';

const defaultLogos = [
  { id: 1, name: 'React', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { id: 2, name: 'Node.js', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { id: 3, name: 'Figma', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { id: 4, name: 'MongoDB', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { id: 5, name: 'MySQL', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { id: 6, name: 'Meta', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg' },
  { id: 7, name: 'Docker', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { id: 8, name: 'Git', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { id: 9, name: 'Railway', image: 'https://railway.app/brand/logo-light.svg' },
];

const LogoCarousel = ({ logos }) => {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true },
    [AutoScroll({ playOnInit: true, speed: 1 })]
  );

  return (
    <div className="clients-carousel" style={{ position: 'relative', marginTop: 'var(--space-10)' }}>
      {/* Carousel */}
      <div ref={emblaRef} style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 'var(--space-8)' }}>
          {[...logos, ...logos].map((logo, index) => (
            <motion.div
              key={`${logo.id}-${index}`}
              style={{
                flex: '0 0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--space-4) var(--space-8)',
                opacity: 0.5,
                filter: 'grayscale(100%)',
                transition: 'all 0.3s ease',
              }}
              whileHover={{
                opacity: 1,
                filter: 'grayscale(0%)',
              }}
            >
              <img
                src={logo.image}
                alt={logo.name}
                style={{
                  height: '40px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gradient Fades */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '100px',
          background: 'linear-gradient(to right, var(--bg-void) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: '100px',
          background: 'linear-gradient(to left, var(--bg-void) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
    </div>
  );
};

const LogoGrid = ({ logos }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
      gap: 'var(--space-6)',
      justifyItems: 'center',
      alignItems: 'center',
      marginTop: 'var(--space-10)',
    }}
  >
    {logos.map((logo) => (
      <motion.div
        key={logo.id}
        style={{
          padding: 'var(--space-2)',
          opacity: 0.5,
          filter: 'grayscale(100%)',
          transition: 'all 0.3s ease',
        }}
        whileHover={{
          opacity: 1,
          filter: 'grayscale(0%)',
        }}
      >
        <img
          src={logo.image}
          alt={logo.name}
          style={{
            height: '32px',
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </motion.div>
    ))}
  </div>
);

const Clients = ({
  title = 'Technologies I Work With',
  subtitle = 'From design to deployment, these are the tools that power my projects.',
  logos = defaultLogos,
}) => {
  return (
    <section
      id="clients"
      className="clients"
      style={{
        position: 'relative',
        padding: 'var(--space-24) 0',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--space-6)', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(var(--text-2xl), 4vw, var(--text-4xl))',
            marginBottom: 'var(--space-4)',
          }}
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--text-muted)',
            marginBottom: 'var(--space-12)',
          }}
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Desktop: Carousel / Mobile: Grid */}
      <div className="clients-carousel-wrapper">
        <LogoCarousel logos={logos} />
      </div>
      <div className="clients-grid-wrapper" style={{ display: 'none', padding: '0 var(--space-6)' }}>
        <LogoGrid logos={logos} />
      </div>

      <style>{`
        @media (max-width: 640px) {
          .clients-carousel-wrapper {
            display: none !important;
          }
          .clients-grid-wrapper {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Clients;
