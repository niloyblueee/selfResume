import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';

const LogoCarousel = ({ logos }) => {
  const baseVelocity = 5;
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5]);
  const directionRef = useRef(1);

  const wrap = (min, max, value) => {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
  };

  const x = useTransform(baseX, (value) => `${wrap(-50, 0, value)}%`);

  useAnimationFrame((_, delta) => {
    let moveBy = directionRef.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();

    if (vf < 0) {
      directionRef.current = -1;
    } else if (vf > 0) {
      directionRef.current = 1;
    }

    moveBy += directionRef.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="clients-carousel" style={{ position: 'relative', marginTop: 'var(--space-10)' }}>
      {/* Carousel */}
      <div className="clients-carousel-viewport">
        <motion.div className="clients-carousel-track" style={{ x }}>
          {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
            <div key={`${logo.id}-${index}`} className="clients-logo">
              <img
                src={logo.image}
                alt={logo.name}
                className="clients-logo-image"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gradient Fades */}
      <div className="clients-fade clients-fade-left" />
      <div className="clients-fade clients-fade-right" />
    </div>
  );
};

const LogoGrid = ({ logos }) => (
  <div className="clients-grid">
    {logos.map((logo) => (
      <div key={logo.id} className="clients-logo">
        <img
          src={logo.image}
          alt={logo.name}
          className="clients-logo-image"
        />
      </div>
    ))}
  </div>
);

const Clients = ({
  title = 'Technologies I Work With',
  subtitle = 'From design to deployment, these are the tools that power my projects.',
  logos = [],
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
          .clients-grid-wrapper {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Clients;
