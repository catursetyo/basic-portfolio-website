export const projects = [
  {
    id: 'pokezoo',
    year: '2024',
    name: 'PokeZOO Management System',
    category: 'Full stack / Database',
    img: '/pokezoo.png',
    description:
      'Zoo management system with MySQL, MongoDB, role-based access, health tracking, incident reports, and behavioral logs.',
    longDescription:
      'A complete zoo operations app built around relational records and unstructured logs. It handles admins, keepers, and visitors while keeping animal health and incident data readable.',
    techStack: ['Python', 'FastAPI', 'MySQL', 'MongoDB', 'Jinja2', 'Tailwind'],
    githubUrl: 'https://github.com/catursetyo/pokezoo-dbs',
    featured: true,
  },
  {
    id: 'una-project',
    year: '2024',
    name: 'UNA Project',
    category: 'Product catalog / Next.js',
    img: '/una-project.png',
    description:
      'Digital display product catalog with product highlights, tutorials, consultation flow, and admin-managed catalog content.',
    longDescription:
      'A product website for prayer time clocks, running text LED, digital clocks, and custom display products. The focus is clear browsing and fast WhatsApp consultation.',
    techStack: ['Next.js', 'TypeScript', 'Go', 'PostgreSQL', 'Tailwind', 'React'],
    externalUrl: 'https://unaproject.my.id/',
    status: 'Under development',
  },
  {
    id: 'el-lotus',
    year: '2024',
    name: 'El Lotus IMK',
    category: 'React / UI-UX',
    img: '/el-lotus.png',
    description:
      'Interactive cafe ordering app with order flow, outlet selection, QRIS payment, activity tracking, and animated profiles.',
    longDescription:
      'A Human-Computer Interaction final project exploring practical ordering flows and mobile-first cafe interactions.',
    techStack: ['React', 'Vite', 'JavaScript', 'CSS', 'Responsive'],
    externalUrl: 'https://el-lotus.netlify.app',
    status: 'Under development',
  },
];

export const featuredProject = projects.find((project) => project.featured) ?? projects[0];
