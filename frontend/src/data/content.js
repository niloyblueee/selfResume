// ═══════════════════════════════════════════════════════════════
// PORTFOLIO CONTENT DATA
// Edit this file to customize your portfolio content
// ═══════════════════════════════════════════════════════════════

export const siteConfig = {
  name: 'Niloy Nil',
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
  badge: 'Creative Developer',
  title: 'Crafting Digital',
  titleHighlight: 'Experiences',
  typingTexts: [
    'Building immersive web apps',
    'Designing cosmic interfaces',
    'Creating memorable journeys',
    'Transforming ideas to reality',
  ],
  description:
    'Transforming ideas into exceptional digital experiences through innovative design and cutting-edge technology.',
};

export const aboutContent = {
  title: 'Passionate about crafting exceptional digital experiences',
  description: `I'm Niloy, a Computer Science student at BRAC University and the founder & CEO of https://theluminos.org, a digital solutions firm focused on helping businesses grow through technology and creative strategy.

  I specialize in building custom software tailored to real business needs. As the CEO of TheLumiNos, I lead end-to-end solution development, from strategy and planning to execution and delivery. I focus on solving business problems at their core, aligning technology, operations, and branding to create systems that scale. In parallel, I direct content and digital identity strategies to help businesses stand out in competitive markets.
  
  I enjoy solving real-world problems by combining technical expertise with practical business understanding, delivering solutions that are both efficient and impactful.`,
  imageUrl:
    '/DP.jpg',
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
      '/src/assets/MOMENTSS.png',
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
      '/src/assets/aabitaagro.png',
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
      '/src/assets/fun370.png',
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
      '/src/assets/BlueeeLogo.ico',
    category: 'SaaS',
    tags: ['Python', 'Pyttsx', 'Tkinter'],
    size: 'small',
    github: 'https://github.com/niloyblueee/Blue_Assistant_app',
  },
  {
    id: 5,
    title: 'Branscriber',
    description: 'A simple transcription app made for voice typing and meeting summary .',
    image: '/src/assets/BranscriberLogo.png',
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
    image: '/src/assets/Nirvhoy.png', 
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
    image: '/src/assets/civic.png', 
    category: 'SaaS',
    tags: ['React','Express','Mysql','NodeJs','Figma'],
    size: 'small',
    link: 'https://tinyurl.com/civicaivisionx',
    github: 'https://github.com/niloyblueee/Civic-Ai-Connecting-Citizen-and-Govt.',
  },
];

export const timelineContent = [
  {
    year: '2024',
    entries: [
      {
        title: 'Senior Creative Developer',
        subtitle: 'TechCorp Innovation Labs',
        description:
          'Leading development of immersive web experiences using cutting-edge technologies. Architecting scalable solutions for enterprise clients.',
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
        description:
          'Built and maintained web applications for diverse clients across industries. Focused on creating performant, accessible interfaces.',
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
        description:
          'Started my professional journey building React applications. Learned the fundamentals of modern web development.',
        achievements: [
          'Built core product features',
          'Learned React & Node.js',
          'First production deployment',
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
    {
      id: 1,
      name: 'React',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    },
    {
      id: 2,
      name: 'Next.js',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    },
    {
      id: 3,
      name: 'TypeScript',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    },
    {
      id: 4,
      name: 'Node.js',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    },
    {
      id: 5,
      name: 'Figma',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    },
    {
      id: 6,
      name: 'MongoDB',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    },
    {
      id: 7,
      name: 'PostgreSQL',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    },
    {
      id: 8,
      name: 'Docker',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    },
    {
      id: 9,
      name: 'Git',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    },
    {
      id: 10,
      name: 'VS Code',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    },
  ],
};

export const contactContent = {
  title: "Let's Create Something",
  titleHighlight: 'Amazing Together',
  description:
    "Have a project in mind? I'd love to hear about it. Let's discuss how we can work together to bring your vision to life.",
  email: 'hello@example.com',
};
