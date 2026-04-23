import './index.css';
import { Route, Routes } from 'react-router-dom';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Section Components
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Timeline from './components/sections/Timeline';
import Clients from './components/sections/Clients';
import Contact from './components/sections/Contact';

// Effects
import StarField from './components/effects/StarField';

// Content Data
import {
  heroContent,
  aboutContent,
  projectsContent,
  timelineContent,
  clientsContent,
  contactContent,
} from './data/content';

function getPublicAssetPath(assetPath) {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedAsset = assetPath.startsWith('/')
    ? assetPath.slice(1)
    : assetPath;

  return `${normalizedBase}${normalizedAsset}`;
}

function StaticPageRedirect({ targetPath }) {
  const url = getPublicAssetPath(targetPath);

  if (typeof window !== 'undefined') {
    window.location.replace(url);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#0f172a',
        color: '#e2e8f0',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      Opening mockup...
    </div>
  );
}

function PortfolioPage() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Global Star Background */}
      <StarField starCount={150} speed={0.3} />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          badge={heroContent.badge}
          title={heroContent.title}
          titleHighlight={heroContent.titleHighlight}
          typingTexts={heroContent.typingTexts}
          description={heroContent.description}
          onContactClick={() => scrollToSection('contact')}
          onProjectsClick={() => scrollToSection('projects')}
        />

        {/* About Section */}
        <About
          title={aboutContent.title}
          description={aboutContent.description}
          imageUrl={aboutContent.imageUrl}
        />

        {/* Projects Section */}
        <Projects projects={projectsContent} />

        {/* Timeline Section */}
        <Timeline data={timelineContent} />

        {/* Clients/Tech Stack Section */}
        <Clients
          title={clientsContent.title}
          subtitle={clientsContent.subtitle}
          logos={clientsContent.logos}
        />

        {/* Contact Section */}
        <Contact
          title={contactContent.title}
          titleHighlight={contactContent.titleHighlight}
          description={contactContent.description}
          whatsappNumber={contactContent.whatsappNumber}
        />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route
        path="/wholesale"
        element={<StaticPageRedirect targetPath="wholesale/index.html" />}
      />
      <Route
        path="/boutique"
        element={<StaticPageRedirect targetPath="boutique/index.html" />}
      />
      <Route path="*" element={<PortfolioPage />} />
    </Routes>
  );
}

export default App;
