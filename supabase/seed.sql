-- Seed data from src/data/content.js
-- HOW TO RUN: Copy ALL text from this file and paste into Supabase SQL Editor.
-- Run ONLY after schema.sql succeeds. Do NOT paste the file path.

insert into public.site_settings (
  id,
  name,
  initials,
  photo_path,
  role,
  location,
  address,
  email,
  phone,
  hero_summary,
  about_summary,
  about_secondary,
  education,
  certification,
  copyright_location
) values (
  1,
  'Ankit Shrestha',
  'AS.',
  'ankit-portrait.png',
  'UX/UI Designer',
  'Kupondol, Lalitpur, Nepal',
  'Jwagal, Kupondol, Bagmati Province',
  'ankitshrestha543@gmail.com',
  '+977 9863198492',
  'Computer Engineering graduate specializing in meaningful user experiences and polished interfaces. I design flows, wireframes, and high-fidelity UI for web and mobile products—from event apps to VoIP platforms.',
  'With a Bachelor''s in Computer Engineering from NCIT, I bridge design craft with technical understanding. I focus on clear user flows, prototypes in Figma, and interfaces that feel intuitive on both web and mobile.',
  'Certified through the UX/UI bootcamp at Broadway Infosys. When I''m not designing, you''ll find me with a guitar, a good book, or exploring spirituality and creativity.',
  'Bachelor''s in Computer Engineering · NCIT, Balkumari (2017–2023)',
  'UX/UI Bootcamp · Broadway Infosys',
  'Lalitpur, Nepal'
)
on conflict (id) do update set
  name = excluded.name,
  initials = excluded.initials,
  photo_path = excluded.photo_path,
  role = excluded.role,
  location = excluded.location,
  address = excluded.address,
  email = excluded.email,
  phone = excluded.phone,
  hero_summary = excluded.hero_summary,
  about_summary = excluded.about_summary,
  about_secondary = excluded.about_secondary,
  education = excluded.education,
  certification = excluded.certification,
  copyright_location = excluded.copyright_location;

insert into public.skills (label, sort_order) values
  ('Figma', 1),
  ('Prototyping', 2),
  ('User Flows', 3),
  ('Wireframing', 4),
  ('Mobile UI', 5),
  ('Web UI', 6),
  ('Design Audits', 7),
  ('HTML & CSS', 8)
on conflict (label) do nothing;

insert into public.projects (slug, category, title, description, tags, pad_color, image_path, image_alt, sort_order, case_study) values
  (
    'drop',
    'Mobile App',
    'Drop',
    'An event-journey mobile application focused on events and planning—helping users organize timelines and storage needs across different types of events with a clear, stage-by-stage flow.',
    array['Mobile App', 'User Flows', 'UI Design', 'Prototyping'],
    '#1a1220',
    'projects/drop.svg',
    'Drop event journey mobile app UI',
    1,
    '{"overview":"Event planning mobile app with stage-by-stage user journeys.","role":"UX/UI Designer","tools":["Figma"],"sections":[{"heading":"Challenge","body":"Users needed a clear way to plan events across multiple stages without losing context."},{"heading":"Solution","body":"Designed a linear flow with visual progress indicators and contextual storage recommendations."}],"gallery":[]}'::jsonb
  ),
  (
    'tradieshome',
    'Job Portal',
    'TradiesHome',
    'A dual-sided job portal connecting Tradies (professionals seeking work) with Homeowners (clients posting jobs). Designed flows and interfaces that make discovery, matching, and communication straightforward on mobile.',
    array['Mobile App', 'User Flows', 'Wireframes', 'UI & UX design'],
    '#0f1a14',
    'projects/tradieshome.svg',
    'TradiesHome job portal mobile interface',
    2,
    '{"overview":"Dual-sided marketplace for tradespeople and homeowners.","role":"UX/UI Designer","tools":["Figma"],"sections":[{"heading":"Challenge","body":"Two distinct user types with different goals needed intuitive onboarding and job flows."},{"heading":"Solution","body":"Separate but connected flows for Tradies and Homeowners with shared design language."}],"gallery":[]}'::jsonb
  ),
  (
    'leadhead',
    'SaaS / CRM',
    'Leadhead',
    'A business software system for keeping customer contacts up to date and tracking every customer account—structured dashboards and detail views to support sales and relationship management.',
    array['Web App', 'Dashboard UI', 'Information Architecture', 'Prototyping'],
    '#0c1218',
    'projects/leadhead.svg',
    'Leadhead CRM sales pipeline dashboard',
    3,
    '{"overview":"CRM dashboard for sales pipeline and account tracking.","role":"UX/UI Designer","tools":["Figma"],"sections":[{"heading":"Challenge","body":"Sales teams needed dense data presented without overwhelming the interface."},{"heading":"Solution","body":"Structured dashboard with clear hierarchy, filters, and detail drill-down views."}],"gallery":[]}'::jsonb
  ),
  (
    'calilio',
    'VoIP',
    'Calilio',
    'Calilio is a cloud-based business phone system built on VoIP—streamlining business communications. Contributed to web experiences with emphasis on clarity, responsive layouts, and intuitive navigation.',
    array['Web App', 'UI & UX design', 'Responsive Design', 'VoIP'],
    '#1a140c',
    'projects/calilio.svg',
    'Calilio unified callbox web interface',
    4,
    '{"overview":"Cloud VoIP platform web interface.","role":"UX/UI Designer","tools":["Figma"],"sections":[{"heading":"Challenge","body":"Complex telephony features needed to feel approachable for non-technical users."},{"heading":"Solution","body":"Responsive layouts with clear call management UI and intuitive navigation patterns."}],"gallery":[]}'::jsonb
  )
on conflict (slug) do nothing;

insert into public.experience (slug, company, role, period, location, highlights, grid_span, sort_order) values
  (
    'ganesh',
    'Ganesh Computing Pvt. Ltd.',
    'Associate UX/UI Designer',
    'Aug 2025 — Present',
    'Kalanki, Kathmandu',
    array[
      'Designed user flows with seamless transitions across product stages.',
      'Built clean, visually appealing interfaces for mobile applications.',
      'Ran design reviews and identified areas for UX improvement.'
    ],
    'md:row-span-2',
    1
  ),
  (
    'varosa',
    'Varosa Technology',
    'Associate UX/UI Designer',
    'May 2024 — Jan 2025',
    'Jhamsikhel, Lalitpur',
    array[
      'Designed flows and UI for web and mobile products.',
      'Created wireframes and prototypes for stakeholders and engineering.',
      'Conducted design audits on ongoing projects.'
    ],
    'md:row-span-1',
    2
  ),
  (
    'ekbana',
    'EKBANA',
    'Intern Frontend Developer',
    'Nov 2022 — Feb 2023',
    'Kupondol, Lalitpur',
    array[
      'Built static pages with HTML, CSS, and Bootstrap.',
      'Applied design principles, color theory, and typography.',
      'Used Git and GitHub for version control and deployment.'
    ],
    'md:row-span-1',
    3
  ),
  (
    'rumsan',
    'Rumsan Technology',
    'Intern Frontend Developer',
    'Aug 2021 — Oct 2021',
    'Jhamsikhel, Lalitpur',
    array[
      'Strengthened fundamentals in HTML, CSS, and Git workflows.',
      'Reviewed operations and suggested front-end improvements.'
    ],
    'md:row-span-1',
    4
  ),
  (
    'batti',
    'Batti Baliyo',
    'Sales & Marketing',
    'Jul 2019 — Sep 2021',
    'Remote',
    array[
      'Boosted brand visibility through field and digital marketing.',
      'Created SEO-friendly content using client and team feedback.'
    ],
    'md:row-span-1',
    5
  )
on conflict (slug) do nothing;

insert into public.social_links (label, href, icon, sort_order) values
  ('Behance', 'https://www.behance.net/', 'behance', 1),
  ('GitHub', 'https://github.com/', 'github', 2)
on conflict (label) do nothing;
