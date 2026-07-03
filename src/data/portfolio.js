export const profile = {
  name: 'Ritika Marotha',
  firstName: 'Ritika',
  roles: [
    'Software Engineering Intern',
    'Full Stack Developer',
    'Gen AI Developer',
    'MERN Stack Developer',
  ],
  tagline:
    'Aspiring Software Engineer building production-grade Gen AI & MERN stack applications, deployed on Azure and IBM Cloud.',
  bio: "I'm Ritika Marotha — an aspiring Software Engineer from Sirsa, Haryana with a strong foundation in DSA (350+ problems) and hands-on experience building scalable MERN stack solutions with secure authentication, payment integrations, and Gen AI features.",
  location: 'Sirsa, Haryana, India',
  email: 'ritikamarotha9@gmail.com',
  phone: '+91 80039 45643',
  resumeUrl: '/Ritika_Marotha_(2).pdf',
  image: '/portfolio ritika/rituimage.png',
  socials: {
    github: 'https://github.com/Ritu-7',
    linkedin: 'https://www.linkedin.com/in/ritika-marotha-891b6426a',
    whatsapp: 'https://wa.me/918003945643?text=Hello%20Ritika%2C%20I%20saw%20your%20portfolio!',
  },
}

export const about = {
  objectives:
    'Aspiring Software Engineer with a strong foundation in Data Structures & Algorithms (350+ problems solved) and hands-on experience building production-grade Gen AI applications. Experienced in developing scalable MERN stack solutions with secure authentication and payment integrations. Proven track record of deploying cloud-native applications on Azure and IBM Cloud. Eager to contribute to intelligent, scalable software as a Software Engineering Intern.',
  interests: [
    'Gen AI Applications',
    'Cloud Native',
    'DSA & Competitive Programming',
    'Open Source',
    'MERN Stack',
    'System Design',
  ],
  technologies: [
    'C++', 'JavaScript (ES6+)', 'Python', 'SQL', 'HTML5/CSS3',
    'React.js', 'Tailwind CSS', 'Redux',
    'Node.js', 'Express.js', 'MongoDB', 'RESTful APIs',
    'Microsoft Azure', 'IBM Cloud', 'Vercel',
    'Google Gemini API', 'OpenAI Codex',
    'Clerk', 'Stripe', 'Razorpay',
    'Git/GitHub', 'VS Code', 'CI/CD',
  ],
}

export const education = [
  {
    degree: 'B.Tech — Computer Science & Engineering',
    institution: 'DCRUST, Murthal',
    period: '2023 — 2027 (Expected)',
    cgpa: '8.16',
    coursework: ['DSA', 'OS', 'DBMS', 'Computer Networks', 'Discrete Mathematics'],
  },
]

export const skills = [
  {
    category: 'Languages',
    icon: 'cpu',
    color: 'from-brand-400 to-cyan-500',
    items: [
      { name: 'C++', level: 85 },
      { name: 'JavaScript (ES6+)', level: 88 },
      { name: 'Python', level: 72 },
      { name: 'SQL / HTML5 / CSS3', level: 90 },
    ],
  },
  {
    category: 'Frontend',
    icon: 'layout',
    color: 'from-accent-400 to-violet-500',
    items: [
      { name: 'React.js', level: 85 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'Redux', level: 75 },
      { name: 'Responsive Design', level: 90 },
    ],
  },
  {
    category: 'Backend & Cloud',
    icon: 'server',
    color: 'from-emerald-400 to-teal-500',
    items: [
      { name: 'Node.js / Express.js', level: 82 },
      { name: 'MongoDB', level: 80 },
      { name: 'RESTful APIs', level: 85 },
      { name: 'Microsoft Azure', level: 70 },
      { name: 'IBM Cloud / Vercel', level: 68 },
    ],
  },
  {
    category: 'Gen AI & Tools',
    icon: 'wrench',
    color: 'from-rose-400 to-pink-500',
    items: [
      { name: 'Google Gemini API', level: 78 },
      { name: 'OpenAI Codex', level: 72 },
      { name: 'Clerk Auth', level: 80 },
      { name: 'Stripe / Razorpay', level: 75 },
    ],
  },
  {
    category: 'DSA & Tools',
    icon: 'database',
    color: 'from-amber-400 to-orange-500',
    items: [
      { name: 'LeetCode (350+ DSA)', level: 88 },
      { name: 'Git / GitHub / CI-CD', level: 85 },
      { name: 'VS Code', level: 92 },
      { name: 'GFG (DSA)', level: 82 },
    ],
  },
]

export const experience = [
  {
    role: 'AI Azure Intern',
    company: 'Edunet Foundation (Microsoft initiative)',
    period: 'May 2025 — Jun 2025',
    location: 'Remote',
    description:
      'Gained hands-on experience in Azure Cloud services, focusing on cloud-native application deployment and architecture. Leveraged AI services within the Azure ecosystem to solve real-world industry problem simulations.',
    achievements: [
      'Gained hands-on experience in Azure Cloud services, focusing on cloud-native application deployment and architecture',
      'Leveraged AI services within the Azure ecosystem to solve real-world industry problem simulations',
    ],
    tags: ['Microsoft Azure', 'Cloud Native', 'AI Services', 'AICTE'],
  },
  {
    role: 'AI & Cloud Intern',
    company: 'Edunet Foundation (IBM SkillsBuild)',
    period: 'Jul 2025 — Aug 2025',
    location: 'Remote',
    description:
      'Completed intensive training on cloud computing architectures and AI model integration. Simulated end-to-end cloud deployment pipelines and AI model lifecycle management using IBM Cloud tools.',
    achievements: [
      'Completed intensive training on cloud computing architectures and AI model integration',
      'Simulated end-to-end cloud deployment pipelines and AI model lifecycle management using IBM Cloud tools',
    ],
    tags: ['IBM Cloud', 'AI Model Integration', 'Cloud Architecture'],
  },
  {
    role: 'Web Development Intern',
    company: 'ApexPlanet Software Pvt. Ltd.',
    period: 'Apr 2025 — May 2025',
    location: 'Remote',
    description:
      'Built responsive web pages using HTML, CSS, and JavaScript. Focused on mobile-first design and UI responsiveness.',
    achievements: [
      'Built responsive web pages using HTML, CSS, and JavaScript',
      'Focused on mobile-first design and UI responsiveness',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
  },
]

const px = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`

export const projects = [
  {
    title: 'LMS Platform',
    category: 'Full Stack',
    status: 'Deployed',
    timeline: '3 weeks',
    difficulty: 'Advanced',
    image: px(5212345),
    gallery: [
      { label: 'Dashboard', src: px(5212345) },
      { label: 'Course View', src: px(5212703) },
      { label: 'Login', src: px(5212659) },
      { label: 'Mobile', src: px(4144923) },
      { label: 'Analytics', src: px(7681098) },
      { label: 'Admin Panel', src: px(3184292) },
    ],
    description:
      'A multi-role Learning Management System with secure authentication (Clerk), role-based access control, Google Gemini AI-powered Q&A, and Razorpay payment webhooks. Deployed on Vercel.',
    features: [
      'Multi-role auth with Clerk & RBAC',
      'Google Gemini API for course Q&A',
      'Razorpay webhooks for payment verification',
      'Deployed on Vercel with optimized builds',
    ],
    tech: ['MERN', 'Clerk', 'Razorpay', 'Google Gemini API', 'Vercel'],
    github: 'https://github.com/Ritu-7/lms',
    demo: '#',
    featured: true,
  },
  {
    title: 'Blueprint.ai — AI Website Builder',
    category: 'Gen AI',
    status: 'In Progress',
    timeline: '4 weeks',
    difficulty: 'Advanced',
    image: px(3861969),
    gallery: [
      { label: 'Prompt Input', src: px(3861969) },
      { label: 'Generated UI', src: px(1966444) },
      { label: 'Preview', src: px(3184465) },
      { label: 'Code Refinement', src: px(270557) },
      { label: 'Mobile Output', src: px(4144923) },
    ],
    description:
      'An AI-driven platform that generates functional website structures and layouts from natural language prompts. Features a dynamic UI generation engine and a real-time preview dashboard.',
    features: [
      'Natural language to website structure generation',
      'Dynamic UI generation engine (70% faster landing pages)',
      'Real-time preview dashboard for code refinement',
      'AI-assisted responsive layout workflows',
    ],
    tech: ['React', 'Node.js', 'Google Gemini API', 'OpenAI Codex'],
    github: 'https://github.com/Ritu-7/Blueprint.ai',
    demo: '#',
    featured: true,
  },
  {
    title: 'Entertainment Platform (OTT Clone)',
    category: 'Full Stack',
    status: 'Deployed',
    timeline: '2 weeks',
    difficulty: 'Intermediate',
    image: '/portfolio ritika/Netflix.png',
    gallery: [
      { label: 'Home', src: '/portfolio ritika/Netflix.png' },
      { label: 'Browse', src: px(2873490) },
      { label: 'Player', src: px(2873488) },
      { label: 'Mobile', src: px(4144923) },
    ],
    description:
      'A subscription-based OTT streaming platform for movies, TV shows, and original content on-demand across devices, with secure auth and payment integration.',
    features: [
      'Auth & user profiles',
      'Subscription billing with Stripe/Razorpay',
      'Search & recommendations',
      'Responsive multi-device UI',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com/Ritu-7',
    demo: '#',
    featured: false,
  },
  {
    title: 'Portfolio Website',
    category: 'Frontend',
    status: 'Deployed',
    timeline: '1 week',
    difficulty: 'Intermediate',
    image: '/portfolio ritika/portfolio.png',
    gallery: [
      { label: 'Hero', src: '/portfolio ritika/portfolio.png' },
      { label: 'Projects', src: px(1966444) },
      { label: 'Admin', src: px(3184292) },
      { label: 'Mobile', src: px(4144923) },
    ],
    description:
      'A premium personal portfolio showcasing skills, projects, and experience with glassmorphism design, Framer Motion animations, Supabase backend, and admin dashboard.',
    features: [
      'Dark/Light mode',
      'Framer Motion animations',
      'Supabase backend + admin dashboard',
      'Responsive & accessible',
    ],
    tech: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'Framer Motion'],
    github: 'https://github.com/Ritu-7/portfolio-ritika',
    demo: '#',
    featured: false,
  },
]

export const certifications = [
  {
    title: 'Certificate of Completion — AI Azure Internship',
    org: 'Edunet Foundation + AICTE',
    date: 'May–Jun 2025',
    credentialId: 'AICTE-AI-AZURE-2025',
    verifyUrl: 'https://edunetfoundation.org/',
  },
]

export const achievements = {
  codingProfiles: [
    {
      name: 'LeetCode',
      handle: 'Ritika',
      url: 'https://leetcode.com/',
      solved: 350,
      icon: 'code',
    },
    {
      name: 'GeeksforGeeks',
      handle: 'ritikamarotha',
      url: 'https://geeksforgeeks.org/',
      solved: 350,
      icon: 'globe',
    },
    {
      name: 'GitHub',
      handle: 'Ritu-7',
      url: 'https://github.com/Ritu-7',
      solved: 4,
      icon: 'github',
    },
  ],
  awards: [
    {
      title: 'Technical Problem Solving',
      org: 'LeetCode & GeeksforGeeks',
      year: '2025',
      desc: 'Solved 350+ complex DSA problems on LeetCode and GeeksforGeeks, maintaining consistent proficiency in Data Structures & Algorithms.',
    },
    {
      title: 'Smart India Hackathon 2024',
      org: 'Government of India',
      year: '2024',
      desc: 'Participated in Smart India Hackathon 2024, demonstrating Team Collaboration & Rapid Prototyping skills.',
    },
    {
      title: 'Tata Crucible Campus Quiz 2025',
      org: 'Tata Crucible',
      year: '2025',
      desc: 'National-level prelims participant, showcasing competitive knowledge and analytical thinking.',
    },
  ],
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]
