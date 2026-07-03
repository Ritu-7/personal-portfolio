export const profile = {
  name: 'Ritika Marotha',
  firstName: 'Ritika',
  roles: ['Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'UI/UX Enthusiast'],
  tagline: 'Crafting modern, performant web experiences with design-led thinking.',
  bio: "I'm a Full Stack Developer from Sirsa, India, focused on building delightful, accessible web applications. I blend clean engineering with thoughtful design to ship products that feel fast and look sharp.",
  location: 'Sirsa, Haryana, India',
  email: 'ritikamarotha9@gmail.com',
  phone: '+91 80039 45643',
  resumeUrl: '/resume.txt',
  image: '/portfolio ritika/rituimage.png',
  socials: {
    github: 'https://github.com/Ritu-7',
    linkedin: 'https://www.linkedin.com/in/ritika-marotha-891b6426a',
    whatsapp: 'https://wa.me/918003945643?text=Hello%20Ritika%2C%20I%20saw%20your%20portfolio!',
  },
}

export const about = {
  objectives: 'Aspiring Software Engineer aiming to build scalable, user-centric products while continuously learning modern web and cloud technologies. I want to work on teams that value craft, performance, and accessibility.',
  interests: ['Open Source', 'Design Systems', 'Developer Tooling', 'Cloud Native', 'Mentorship', 'Photography'],
  technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'TypeScript', 'Docker', 'Git', 'Figma'],
}

export const skills = [
  {
    category: 'Frontend',
    icon: 'layout',
    color: 'from-brand-400 to-cyan-500',
    items: [
      { name: 'HTML5', level: 90 },
      { name: 'CSS3 / Tailwind', level: 88 },
      { name: 'JavaScript', level: 85 },
      { name: 'React', level: 82 },
    ],
  },
  {
    category: 'Backend',
    icon: 'server',
    color: 'from-accent-400 to-violet-500',
    items: [
      { name: 'Node.js', level: 80 },
      { name: 'Express', level: 78 },
      { name: 'REST APIs', level: 82 },
      { name: 'JWT Auth', level: 75 },
    ],
  },
  {
    category: 'Database',
    icon: 'database',
    color: 'from-emerald-400 to-teal-500',
    items: [
      { name: 'MongoDB', level: 78 },
      { name: 'PostgreSQL', level: 72 },
      { name: 'Supabase', level: 75 },
      { name: 'Mongoose', level: 76 },
    ],
  },
  {
    category: 'AI / ML',
    icon: 'cpu',
    color: 'from-rose-400 to-pink-500',
    items: [
      { name: 'Python', level: 65 },
      { name: 'Pandas', level: 60 },
      { name: 'NumPy', level: 58 },
      { name: 'OpenAI APIs', level: 62 },
    ],
  },
  {
    category: 'Tools',
    icon: 'wrench',
    color: 'from-amber-400 to-orange-500',
    items: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'Docker', level: 60 },
      { name: 'VS Code', level: 92 },
      { name: 'Figma', level: 70 },
    ],
  },
]

export const experience = [
  {
    role: 'Full Stack Developer Intern',
    company: 'Tech Startup',
    period: '2024 — Present',
    location: 'Remote',
    description: 'Building and maintaining React + Node.js features end-to-end, improving performance and shipping accessible UI.',
    achievements: [
      'Reduced page load time by 35% via code splitting and image optimization',
      'Implemented JWT auth flow and role-based access control',
      'Built reusable component library adopted across 3 products',
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'Web Agency',
    period: '2023 — 2024',
    location: 'Sirsa, India',
    description: 'Translated Figma designs into responsive, pixel-perfect interfaces for client websites.',
    achievements: [
      'Delivered 12+ client landing pages with 95+ Lighthouse scores',
      'Introduced a shared Tailwind config cutting dev time by 20%',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Figma'],
  },
  {
    role: 'Open Source Contributor',
    company: 'Community',
    period: '2023 — Present',
    location: 'Remote',
    description: 'Contributing fixes and docs to developer-tooling projects on GitHub.',
    achievements: [
      'Merged 8 PRs across 4 repositories',
      'Mentored 3 first-time contributors',
    ],
    tags: ['Git', 'Open Source', 'Docs'],
  },
]

export const projects = [
  {
    title: 'Entertainment Platform (OTT Clone)',
    category: 'Full Stack',
    image: '/portfolio ritika/Netflix.png',
    description: 'A subscription-based OTT streaming platform for movies, TV shows, and original content on-demand across devices.',
    features: ['Auth & profiles', 'Adaptive streaming', 'Search & recommendations', 'Subscription billing'],
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com/Ritu-7',
    demo: '#',
    featured: true,
  },
  {
    title: 'Portfolio Website',
    category: 'Frontend',
    image: '/portfolio ritika/portfolio.png',
    description: 'A responsive personal portfolio showcasing skills, projects, and experience with a modern glassmorphism design.',
    features: ['Dark/Light mode', 'Framer Motion animations', 'Supabase backend', 'Admin dashboard'],
    tech: ['React', 'Vite', 'Tailwind', 'Supabase'],
    github: 'https://github.com/Ritu-7',
    demo: '#',
    featured: true,
  },
  {
    title: 'Task Tracker App',
    category: 'Full Stack',
    image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'A web application to track daily tasks, set priorities, and manage time efficiently with reminders.',
    features: ['Drag & drop kanban', 'Due date reminders', 'Tags & filters', 'Dark mode'],
    tech: ['React', 'Express', 'MongoDB', 'JWT'],
    github: 'https://github.com/Ritu-7',
    demo: '#',
    featured: false,
  },
  {
    title: 'Learning Management System',
    category: 'Full Stack',
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'An LMS for instructors to publish courses and students to track progress with quizzes and certificates.',
    features: ['Course builder', 'Video lessons', 'Quizzes & grading', 'Progress tracking'],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    github: 'https://github.com/Ritu-7',
    demo: '#',
    featured: false,
  },
]

export const certifications = [
  {
    title: 'Full Stack Web Development',
    org: 'freeCodeCamp',
    date: '2024',
    credentialId: 'FCC-FS-2024',
    verifyUrl: 'https://www.freecodecamp.org/',
  },
  {
    title: 'JavaScript Algorithms & Data Structures',
    org: 'freeCodeCamp',
    date: '2023',
    credentialId: 'FCC-JS-2023',
    verifyUrl: 'https://www.freecodecamp.org/',
  },
  {
    title: 'Responsive Web Design',
    org: 'freeCodeCamp',
    date: '2023',
    credentialId: 'FCC-RWD-2023',
    verifyUrl: 'https://www.freecodecamp.org/',
  },
  {
    title: 'Node.js & Express Bootcamp',
    org: 'Udemy',
    date: '2024',
    credentialId: 'UC-NODE-2024',
    verifyUrl: 'https://www.udemy.com/',
  },
]

export const achievements = {
  codingProfiles: [
    { name: 'LeetCode', handle: 'ritika_dev', url: 'https://leetcode.com/', solved: 120, icon: 'code' },
    { name: 'GeeksforGeeks', handle: 'ritikamarotha', url: 'https://geeksforgeeks.org/', solved: 85, icon: 'globe' },
    { name: 'GitHub', handle: 'Ritu-7', url: 'https://github.com/Ritu-7', solved: 48, icon: 'github' },
    { name: 'HackerRank', handle: 'ritika_m', url: 'https://hackerrank.com/', solved: 60, icon: 'award' },
  ],
  awards: [
    { title: 'Hackathon Winner', org: 'College Tech Fest', year: '2024', desc: '1st place for best full-stack solution among 40+ teams.' },
    { title: 'Best Frontend Project', org: 'Web Dev Club', year: '2023', desc: 'Recognized for design and accessibility.' },
    { title: 'Top Contributor', org: 'Open Source Community', year: '2023', desc: 'Among the top 10 contributors of the quarter.' },
  ],
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]
