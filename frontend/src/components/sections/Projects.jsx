import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import DropdownMenu from '../ui/DropdownMenu';

const defaultProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce experience with real-time inventory and seamless checkout.',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=600&fit=crop',
    category: 'Web App',
    tags: ['React', 'Node.js', 'MongoDB'],
    size: 'large',
    link: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'Portfolio Generator',
    description: 'AI-powered portfolio builder for creatives.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop',
    category: 'SaaS',
    tags: ['Next.js', 'AI', 'Tailwind'],
    size: 'medium',
    link: '#',
  },
  {
    id: 3,
    title: 'Finance Dashboard',
    description: 'Real-time analytics and visualization platform.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    category: 'Dashboard',
    tags: ['React', 'D3.js', 'TypeScript'],
    size: 'medium',
    link: '#',
    github: '#',
  },
  {
    id: 4,
    title: '3D Product Viewer',
    description: 'Interactive 3D configurator for products.',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=600&fit=crop',
    category: 'Web App',
    tags: ['Three.js', 'WebGL', 'React'],
    size: 'small',
    link: '#',
  },
  {
    id: 5,
    title: 'Social Platform',
    description: 'Community-driven content sharing app.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop',
    category: 'Mobile',
    tags: ['React Native', 'Firebase'],
    size: 'small',
    link: '#',
  },
  {
    id: 6,
    title: 'Branscriber',
    description: 'A simple transcription app made for voice typing and meeting summary .',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    category: 'SaaS',
    tags: ['OpenAI', 'React','ElevenLabs'],
    size: 'small',
    link: 'https://branscriber.xyz',
    github: 'https://github.com/niloyblueee/BNG_transcriber_app',
  },
];

const categories = ['All', 'Web App', 'SaaS', 'Dashboard', 'Mobile'];

const ProjectCard = ({ project, index }) => {
  const gridStyles = {
    large: { gridColumn: 'span 8', gridRow: 'span 2' },
    medium: { gridColumn: 'span 4', gridRow: 'span 2' },
    small: { gridColumn: 'span 4', gridRow: 'span 1' },
  };

  return (
    <motion.article
      className={`project-card ${project.size}`}
      style={{
        ...gridStyles[project.size],
        position: 'relative',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        cursor: 'pointer',
        minHeight: project.size === 'small' ? '200px' : '350px',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      {/* Border Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '1px',
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(236, 72, 153, 0.2), rgba(6, 182, 212, 0.1))',
          borderRadius: 'inherit',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          opacity: 0.5,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Image */}
      <motion.img
        src={project.image}
        alt={project.title}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
      />

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(3, 0, 20, 0.95) 0%, rgba(3, 0, 20, 0.5) 50%, rgba(3, 0, 20, 0.2) 100%)',
          padding: 'var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        {/* Category */}
        <span
          style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            color: 'var(--cosmic-violet)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 'var(--space-2)',
          }}
        >
          {project.category}
        </span>

        {/* Title */}
        <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: 'var(--space-1) var(--space-2)',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* External Links */}
      <div
        style={{
          position: 'absolute',
          top: 'var(--space-4)',
          right: 'var(--space-4)',
          display: 'flex',
          gap: 'var(--space-2)',
        }}
      >
        {project.github && (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '50%',
              color: 'var(--text-primary)',
              opacity: 0,
            }}
            whileHover={{ background: 'var(--cosmic-purple)', borderColor: 'var(--cosmic-purple)' }}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={16} />
          </motion.a>
        )}
        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '50%',
            color: 'var(--text-primary)',
            opacity: 0,
          }}
          whileHover={{ background: 'var(--cosmic-purple)', borderColor: 'var(--cosmic-purple)' }}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink size={16} />
        </motion.a>
      </div>
    </motion.article>
  );
};

const Projects = ({ projects = defaultProjects }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="projects"
      style={{
        position: 'relative',
        padding: 'var(--section-padding) var(--space-6)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto' }}>
        <SectionTitle
          label="Portfolio"
          title="Featured Projects"
          description="A selection of my recent work showcasing creativity and technical expertise."
        />

        {/* Filters */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-12)',
            flexWrap: 'wrap',
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              style={{
                padding: 'var(--space-2) var(--space-4)',
                background: activeFilter === category ? 'var(--cosmic-purple)' : 'transparent',
                border: `1px solid ${activeFilter === category ? 'var(--cosmic-purple)' : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-sm)',
                color: activeFilter === category ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridAutoRows: 'minmax(180px, auto)',
            gap: 'var(--space-4)',
          }}
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .project-card.large { grid-column: span 12 !important; }
          .project-card.medium { grid-column: span 6 !important; }
          .project-card.small { grid-column: span 6 !important; }
        }
        @media (max-width: 640px) {
          .project-card.large,
          .project-card.medium,
          .project-card.small {
            grid-column: span 12 !important;
            grid-row: span 1 !important;
            min-height: 280px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
