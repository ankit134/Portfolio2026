import { assetUrl } from '../lib/assetUrl'

export const profile = {
  name: 'Ankit Shrestha',
  initials: 'AS.',
  photo: assetUrl('ankit-portrait.png'),
  role: 'UX/UI Designer',
  location: 'Kupondol, Lalitpur, Nepal',
  address: 'Jwagal, Kupondol, Bagmati Province',
  email: 'ankitshrestha543@gmail.com',
  phone: '+977 9863198492',
  heroSummary:
    'Computer Engineering graduate specializing in meaningful user experiences and polished interfaces. I design flows, wireframes, and high-fidelity UI for web and mobile products—from event apps to VoIP platforms.',
  aboutSummary:
    'With a Bachelor’s in Computer Engineering from NCIT, I bridge design craft with technical understanding. I focus on clear user flows, prototypes in Figma, and interfaces that feel intuitive on both web and mobile.',
  aboutSecondary:
    'Certified through the UX/UI bootcamp at Broadway Infosys. When I’m not designing, you’ll find me with a guitar, a good book, or exploring spirituality and creativity.',
  education: 'Bachelor’s in Computer Engineering · NCIT, Balkumari (2017–2023)',
  certification: 'UX/UI Bootcamp · Broadway Infosys',
  copyrightLocation: 'Lalitpur, Nepal',
}

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Selected Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
]

export const skillTags = [
  'Figma',
  'Prototyping',
  'User Flows',
  'Wireframing',
  'Mobile UI',
  'Web UI',
  'Design Audits',
  'HTML & CSS',
]

export const projects = [
  {
    id: 'drop',
    category: 'Mobile App',
    title: 'Drop',
    description:
      'An event-journey mobile application focused on events and planning—helping users organize timelines and storage needs across different types of events with a clear, stage-by-stage flow.',
    tags: ['Mobile App', 'User Flows', 'UI Design', 'Prototyping'],
    padColor: '#1a1220',
    image: assetUrl('projects/drop.svg'),
    imageAlt: 'Drop event journey mobile app UI',
  },
  {
    id: 'tradieshome',
    category: 'Job Portal',
    title: 'TradiesHome',
    description:
      'A dual-sided job portal connecting Tradies (professionals seeking work) with Homeowners (clients posting jobs). Designed flows and interfaces that make discovery, matching, and communication straightforward on mobile.',
    tags: ['Mobile App', 'User Flows', 'Wireframes', 'UI & UX design'],
    padColor: '#0f1a14',
    image: assetUrl('projects/tradieshome.svg'),
    imageAlt: 'TradiesHome job portal mobile interface',
  },
  {
    id: 'leadhead',
    category: 'SaaS / CRM',
    title: 'Leadhead',
    description:
      'A business software system for keeping customer contacts up to date and tracking every customer account—structured dashboards and detail views to support sales and relationship management.',
    tags: ['Web App', 'Dashboard UI', 'Information Architecture', 'Prototyping'],
    padColor: '#0c1218',
    image: assetUrl('projects/leadhead.svg'),
    imageAlt: 'Leadhead CRM sales pipeline dashboard',
  },
  {
    id: 'calilio',
    category: 'VoIP',
    title: 'Calilio',
    description:
      'Calilio is a cloud-based business phone system built on VoIP—streamlining business communications. Contributed to web experiences with emphasis on clarity, responsive layouts, and intuitive navigation.',
    tags: ['Web App', 'UI & UX design', 'Responsive Design', 'VoIP'],
    padColor: '#1a140c',
    image: assetUrl('projects/calilio.svg'),
    imageAlt: 'Calilio unified callbox web interface',
  },
]

export const experience = [
  {
    id: 'ganesh',
    company: 'Ganesh Computing Pvt. Ltd.',
    role: 'Associate UX/UI Designer',
    period: 'Aug 2025 — Present',
    location: 'Kalanki, Kathmandu',
    highlights: [
      'Designed user flows with seamless transitions across product stages.',
      'Built clean, visually appealing interfaces for mobile applications.',
      'Ran design reviews and identified areas for UX improvement.',
    ],
    span: 'md:row-span-2',
  },
  {
    id: 'varosa',
    company: 'Varosa Technology',
    role: 'Associate UX/UI Designer',
    period: 'May 2024 — Jan 2025',
    location: 'Jhamsikhel, Lalitpur',
    highlights: [
      'Designed flows and UI for web and mobile products.',
      'Created wireframes and prototypes for stakeholders and engineering.',
      'Conducted design audits on ongoing projects.',
    ],
    span: 'md:row-span-1',
  },
  {
    id: 'ekbana',
    company: 'EKBANA',
    role: 'Intern Frontend Developer',
    period: 'Nov 2022 — Feb 2023',
    location: 'Kupondol, Lalitpur',
    highlights: [
      'Built static pages with HTML, CSS, and Bootstrap.',
      'Applied design principles, color theory, and typography.',
      'Used Git and GitHub for version control and deployment.',
    ],
    span: 'md:row-span-1',
  },
  {
    id: 'rumsan',
    company: 'Rumsan Technology',
    role: 'Intern Frontend Developer',
    period: 'Aug 2021 — Oct 2021',
    location: 'Jhamsikhel, Lalitpur',
    highlights: [
      'Strengthened fundamentals in HTML, CSS, and Git workflows.',
      'Reviewed operations and suggested front-end improvements.',
    ],
    span: 'md:row-span-1',
  },
  {
    id: 'batti',
    company: 'Batti Baliyo',
    role: 'Sales & Marketing',
    period: 'Jul 2019 — Sep 2021',
    location: 'Remote',
    highlights: [
      'Boosted brand visibility through field and digital marketing.',
      'Created SEO-friendly content using client and team feedback.',
    ],
    span: 'md:row-span-1',
  },
]

export const footerNav = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
]

export const socialLinks = [
  { label: 'Behance', href: 'https://www.behance.net/' },
  { label: 'GitHub', href: 'https://github.com/' },
]

export const footerSocialIcons = ['behance', 'github']
