// ═══════════════════════════════════════════════════════════════
// PORTFOLIO CONTENT DATA
// Edit this file to customize your portfolio content
// ═══════════════════════════════════════════════════════════════

import momentsImage from '../assets/MOMENTSS.png';
import aabitaAgroImage from '../assets/aabitaagro.png';
import fun370Image from '../assets/fun370.png';
import blueeeLogo from '../assets/BlueeeLogo.ico';
import branscriberLogo from '../assets/BranscriberLogo.png';
import nirvhoyImage from '../assets/Nirvhoy.png';
import civicImage from '../assets/civic.png';
import reactLogo from '../assets/clients/react.svg';
import nodejsLogo from '../assets/clients/nodejs.svg';
import figmaLogo from '../assets/clients/figma.svg';
import mongodbLogo from '../assets/clients/mongodb.svg';
import mysqlLogo from '../assets/clients/mysql.svg';
import metaLogo from '../assets/clients/meta.svg';
import dockerLogo from '../assets/clients/docker.svg';
import gitLogo from '../assets/clients/git.svg';
import railwayLogo from '../assets/clients/railway.svg';

export const siteConfig = {
  name: 'Niloy Blueee',
  title: 'Entrepreneur',
  email: 'niloynilblue@gmail.com',
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
  },
};

export const heroContent = {
  badge: 'Entrepreneur - Creative Devloper',
  title: 'Stitching Digital',
  titleHighlight: 'Experiences',
  typingTexts: [
    'Building immersive web apps',
    'Help Brands with their identity',
    'Creating memorable journeys',
    'Transforming ideas to reality',
  ],
  description:
    'Transforming ideas into exceptional digital experiences through innovative design and state of the art technology.',
};

export const aboutContent = {
  title: 'Passionate about crafting exceptional digital experiences',
  description: `I'm Niloy, a Computer Science student at BRAC University and the founder & CEO of https://theluminos.org, a digital solutions firm focused on helping businesses grow through technology and creative strategy.

  I specialize in building custom software tailored to real business needs. As the CEO of TheLumiNos, I lead end-to-end solution development, from strategy and planning to execution and delivery. I focus on solving business problems at their core, aligning technology, operations, and branding to create systems that scale. In parallel, I direct content and digital identity strategies to help businesses stand out in competitive markets.
  
  I enjoy solving real-world problems by combining technical expertise with practical business understanding, delivering solutions that are both efficient and impactful.`,
  imageUrl:
    `${import.meta.env.BASE_URL}DP.jpg`,
  skills: [
    'Python',
    'React',
    'JavaScript',
    'Content Strategy',
    'Brand Identity Development',
    'Client Communication',
    'Project Management',
    'Database Design',
    'Backend Systems',
    'CSS/SCSS',
    'Node.js',
    'Flask',
    'System Design',
    'Business Workflow Optimization',
    'Debugging & Performance Tuning',
    'Next.js',
    'Git',
    'REST APIs',
  ],
  stats: [
    { value: '5+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' },
    { value: '30+', label: 'Happy Clients' },
  ],
};

export const projectsContent = [
  {
    id: 1,
    title: 'MOMENT E-Commerce Platform',
    description:
      'A modern e-commerce experience with real-time inventory, seamless checkout, and beautiful product showcases.',
    image:
      momentsImage,
    category: 'Web App',
    tags: ['React', 'Node.js', 'MySQL'],
    size: 'large',
    link: 'https://momentshop.com.bd',
    github: '#',
  },
  
  {
    id: 2,
    title: 'AabitaAgroFarms',
    description: 'A modern e-commerce experience for OrganicShop  with real-time inventory, seamless checkout, and beautiful product showcases.',
    image:
      aabitaAgroImage,
    category: 'Web App',
    tags: ['React', 'Node.js', 'MySQL'],
    size: 'medium',
    link: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'Fun370',
    description: 'A quiz app built on MYSQL queries to help university students to Pass their DBMS course',
    image:
      fun370Image,
    category: 'Web App',
    tags: ['Express', 'MySQL', 'React'],
    size: 'small',
    link: 'https://tinyurl.com/CSE370labbuddy',
    github: "https://github.com/niloyblueee/Fun370_QueryBuddy"
  },
  {
    id: 4,
    title: 'Blueee',
    description: 'A simple Voice Assistant running locally on your pc.',
    image:
      blueeeLogo,
    category: 'SaaS',
    tags: ['Python', 'Pyttsx', 'Tkinter'],
    size: 'small',
    github: 'https://github.com/niloyblueee/Blue_Assistant_app',
  },
  {
    id: 5,
    title: 'Branscriber',
    description: 'A simple transcription app made for voice typing and meeting summary .',
    image: branscriberLogo,
    category: 'SaaS',
    tags: ['OpenAI', 'React','ElevenLabs'],
    size: 'small',
    link: 'https://branscriber.xyz',
    github: 'https://github.com/niloyblueee/BNG_transcriber_app',
  },
  {
    id: 6,
    title: 'Nirvhoy',
    description: 'FirstRunnerUp Project — This project was developed for the Technology-Related Gender-Based Violence Hackathon hosted by United International University on 28th February 2026. TheLumiNos was the only team selected from Brac University to represent the institution, building a tech-driven solution to combat online gender-based violence.',
    image: nirvhoyImage,
    category: 'SaaS',
    tags: ['React','Express','Mysql','NodeJs','Figma'],
    size: 'small',
    link: 'https://tinyurl.com/nirvhoy/recovery',
    github: 'https://github.com/niloyblueee/TFGBV-Hackathon',
  },
  {
    id: 7,
    title: 'Civic Ai',
    description: 'Finalist project of the National Innovation Challenge 2025, built to deliver a cutting-edge, citizen-centric civic reporting and validation system.',
    image: civicImage,
    category: 'SaaS',
    tags: ['React','Express','Mysql','NodeJs','Figma'],
    size: 'small',
    link: 'https://tinyurl.com/civicaivisionx',
    github: 'https://github.com/niloyblueee/Civic-Ai-Connecting-Citizen-and-Govt.',
  },
];

export const timelineContent = [
  {
    year: '2026',
    entries: [
      {
        title: 'Social Media Moderator',
        subtitle: 'Project Tonoya, Sunbeam Force Limited',
        description:
          'Duration: Feb 22, 2026 - Present. Managing social media presence with a focus on audience engagement, content coordination, and brand consistency.',
        achievements: [
          'Managed day-to-day social media interactions and audience responses',
          'Ensured consistent brand tone and communication',
          'Supported content strategy and posting workflows',
          'Strengthened audience engagement and online presence',
        ],
      },
      {
        title: 'First Runner-Up',
        subtitle: 'Technology Facilitated Gender-Based Violence Hackathon',
        description:
          'Duration: Feb 2026. Developed a technology-driven solution addressing gender-based violence issues in a competitive hackathon environment.',
        achievements: [
          'Built a functional solution under time pressure',
          'Focused on social impact through technology',
          'Recognized for innovation and execution',
        ],
      },
    ],
  },
  {
    year: '2025',
    entries: [
      {
        title: 'Founder & CEO',
        subtitle: 'TheLumiNos - Building digital solutions for modern businesses',
        description:
          'Duration: Dec 2025 - Present. Founded TheLumiNos to help businesses stand out through high-impact digital solutions. Leading strategy, client communication, and execution across web development, e-commerce platforms, custom software systems, and content creation.',
        achievements: [
          'Founded and scaled a digital solutions startup with a core team',
          'Defined service offerings across web, POS, software solutions, and content creation',
          'Led client acquisition, branding, and project delivery',
          'Positioned TheLumiNos as a modern, results-driven tech brand',
        ],
      },
      {
        title: 'National Finalist',
        subtitle: 'University of Dhaka - CIVIC AI showcase',
        description:
          'Duration: Nov 2025. Selected as a national finalist for presenting CIVIC AI, an AI-powered solution, at a prestigious showcase hosted by the University of Dhaka.',
        achievements: [
          'Ranked among top national-level AI projects',
          'Designed and presented an AI-based system',
          'Demonstrated real-world application of AI solutions',
        ],
      },
      {
        title: 'Full-Stack Developer',
        subtitle: 'Aabita Agro Farms - End-to-end website development',
        description:
          'Duration: Feb 2025. Designed and developed a complete website from scratch, handling both frontend and backend, with a clean, modern interface aligned to business goals.',
        achievements: [
          'Delivered a fully responsive, production-ready website',
          'Independently handled full-stack development',
          'Transformed offline business presence into digital',
          'Enhanced credibility through professional design',
        ],
      },
    ],
  },
  {
    year: '2024',
    entries: [
      {
        title: 'Web Developer',
        subtitle: 'Sunbeam Force Limited Tonoya - Business website project',
        description:
          'Duration: Apr 2024. Built the official website for the Tonoya sanitary napkin vending machine, focusing on usability, structure, and brand alignment.',
        achievements: [
          'Delivered project within deadline and requirements',
          'Created structured UX for better user engagement',
          'Strengthened the company online presence',
        ],
      },
    ],
  },
];

export const clientsContent = {
  title: 'Technologies I Work With',
  subtitle:
    'From design to deployment, these are the tools that power my projects.',
  logos: [
    { id: 1, name: 'React', image: reactLogo },
    { id: 2, name: 'Node.js', image: nodejsLogo },
    { id: 3, name: 'Figma', image: figmaLogo },
    { id: 4, name: 'MongoDB', image: mongodbLogo },
    { id: 5, name: 'MySQL', image: mysqlLogo },
    { id: 6, name: 'Meta', image: metaLogo },
    { id: 7, name: 'Docker', image: dockerLogo },
    { id: 8, name: 'Git', image: gitLogo },
    { id: 9, name: 'Railway', image: railwayLogo },
  ],
};

export const contactContent = {
  title: "Let's Create Something",
  titleHighlight: 'Amazing Together',
  description:
    "Have a project in mind? I'd love to hear about it. Let's discuss how we can work together to bring your vision to life.",
  whatsappNumber: '01799937774',
};
