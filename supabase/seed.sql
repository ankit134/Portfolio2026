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
    '{"tagline":"Plan every event stage with clarity and confidence.","meta":[{"label":"Deliverables","value":"Mobile App, User Flows, UI Design, Prototyping"},{"label":"Teams","value":"1 Designer + 3 Developers"},{"label":"Timeline","value":"12 weeks"}],"blocks":[{"type":"section","heading":"Context","items":[{"type":"paragraph","text":"Drop is an event-journey mobile application focused on events and planning—helping users organize timelines and storage needs across different types of events with a clear, stage-by-stage flow."},{"type":"paragraph","text":"The product needed to guide users through complex planning tasks without overwhelming them, while keeping progress visible at every step."}]},{"type":"media","images":[{"path":"projects/drop.svg","alt":"Drop event journey mobile app UI"}]},{"type":"section","heading":"Scope","items":[{"type":"list","items":["End-to-end event planning flows with stage-by-stage progression.","Visual progress indicators and contextual storage recommendations.","Mobile-first UI patterns for quick scanning and task completion.","Prototype-ready screens for stakeholder review and developer handoff."]}]},{"type":"section","heading":"My Roles","items":[{"type":"subheading","text":"UX/UI Designer"},{"type":"list","items":["Mapped user journeys for multiple event types and planning stages.","Designed wireframes and high-fidelity mobile screens in Figma.","Collaborated with developers to validate flow feasibility and edge cases."]}]},{"type":"section","heading":"Tools","items":[{"type":"paragraph","text":"Figma, FigJam, Notion"}]},{"type":"section","heading":"Challenges","items":[{"type":"paragraph","text":"Event planning apps often fail when users lose context between stages:"},{"type":"list","items":["Users needed a clear way to plan events across multiple stages without losing context.","Storage and checklist tasks had to feel connected to the overall event timeline.","Onboarding had to explain the stage model quickly on small screens."]}]},{"type":"section","heading":"Goals/Features","items":[{"type":"list","items":["Stage-by-stage event journey with visible progress.","Contextual storage recommendations tied to event type.","Clean mobile UI with scannable cards and minimal friction.","Reusable components for future event categories."]}]},{"type":"section","heading":"Solution","items":[{"type":"paragraph","text":"Designed a linear flow with visual progress indicators and contextual storage recommendations so users always know where they are and what comes next."},{"type":"callout","text":"Impact: Improved task completion clarity across multi-stage event planning flows."}]}],"credits":{"heading":"Credits","columns":[{"label":"Services","items":["User Research","User Interface Design","User Experience Design"]},{"label":"Tools","items":["Figma","FigJam"]},{"label":"Teams","groups":[{"label":"Product Designer","members":["Ankit Shrestha"]},{"label":"Developers","members":["Mobile team"]}]}]}}'::jsonb
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
    '{"tagline":"Connect Tradies and Homeowners through clear, mobile-first job flows.","meta":[{"label":"Deliverables","value":"Mobile App, User Flows, Wireframes, UI & UX design"},{"label":"Teams","value":"2 Designers + 6 Developers"},{"label":"Timeline","value":"16 weeks"}],"blocks":[{"type":"section","heading":"Context","items":[{"type":"paragraph","text":"TradiesHome is a dual-sided job portal connecting Tradies (professionals seeking work) with Homeowners (clients posting jobs). The platform needed discovery, matching, and communication to feel straightforward on mobile."},{"type":"list","items":["Tradies browse and apply to relevant jobs with clear requirements and location context.","Homeowners post jobs, review applicants, and manage communication in one place.","Both sides share a consistent design language while keeping role-specific flows distinct."]}]},{"type":"media","images":[{"path":"projects/tradieshome.svg","alt":"TradiesHome job portal mobile interface"}]},{"type":"section","heading":"Scope","items":[{"type":"list","items":["Separate onboarding and home experiences for Tradies vs Homeowners.","Job posting, discovery, and application flows.","Profile, messaging, and status tracking patterns.","Responsive mobile UI with reusable components."]}]},{"type":"section","heading":"My Roles","items":[{"type":"subheading","text":"UX/UI Designer"},{"type":"list","items":["Designed dual-sided user flows from wireframes to high-fidelity UI.","Ran design reviews to align Tradies and Homeowner experiences.","Partnered with developers on handoff and interaction details."]}]},{"type":"section","heading":"Tools","items":[{"type":"paragraph","text":"Figma, Miro, Slack"}]},{"type":"section","heading":"Challenges","items":[{"type":"paragraph","text":"Marketplace products with two user types introduce unique UX friction:"},{"type":"list","items":["Two distinct user types with different goals needed intuitive onboarding and job flows.","Job discovery had to surface the right opportunities without overwhelming Tradies.","Homeowners needed confidence that posted jobs would attract qualified applicants."]}]},{"type":"section","heading":"Goals/Features","items":[{"type":"list","items":["Role-based onboarding with clear first actions.","Searchable job feed with filters for trade, location, and urgency.","Structured job detail pages with apply CTA and status visibility.","Shared component library for cards, tags, and messaging entry points."]}]},{"type":"section","heading":"Solution","items":[{"type":"paragraph","text":"Separate but connected flows for Tradies and Homeowners with a shared design language—each role gets tailored screens while navigation and visual patterns stay consistent."}]}],"credits":{"heading":"Credits","columns":[{"label":"Services","items":["User Interface Design","User Experience Design","Wireframing"]},{"label":"Tools","items":["Figma","Miro"]},{"label":"Teams","groups":[{"label":"Product Designer","members":["Ankit Shrestha"]}]}]}}'::jsonb
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
    '{"tagline":"Keep customer relationships organized with a clear sales dashboard.","meta":[{"label":"Deliverables","value":"Web App, Dashboard UI, Information Architecture, Prototyping"},{"label":"Teams","value":"1 Designer + 4 Developers"},{"label":"Timeline","value":"10 weeks"}],"blocks":[{"type":"section","heading":"Context","items":[{"type":"paragraph","text":"Leadhead is a business software system for keeping customer contacts up to date and tracking every customer account—structured dashboards and detail views to support sales and relationship management."},{"type":"paragraph","text":"Sales teams needed dense CRM data presented with hierarchy, filters, and drill-down views that stay usable during daily workflow."}]},{"type":"media","images":[{"path":"projects/leadhead.svg","alt":"Leadhead CRM sales pipeline dashboard"}]},{"type":"section","heading":"Scope","items":[{"type":"list","items":["Pipeline dashboard with account and contact overview.","Detail views for individual customer records and activity.","Filtering, sorting, and search across high-density tables.","Design system patterns for cards, tables, and status indicators."]}]},{"type":"section","heading":"My Roles","items":[{"type":"subheading","text":"UX/UI Designer"},{"type":"list","items":["Defined information architecture for accounts, contacts, and pipeline stages.","Designed dashboard layouts and detail screens in Figma.","Validated hierarchy and density with stakeholder feedback."]}]},{"type":"section","heading":"Tools","items":[{"type":"paragraph","text":"Figma, Notion, Slack"}]},{"type":"section","heading":"Challenges","items":[{"type":"paragraph","text":"CRM interfaces often overwhelm users when every metric competes for attention:"},{"type":"list","items":["Sales teams needed dense data presented without overwhelming the interface.","Multiple account states and contact histories had to remain scannable.","Power users wanted quick access to filters while newcomers needed clarity."]}]},{"type":"section","heading":"Goals/Features","items":[{"type":"list","items":["Pipeline overview with stage-based organization.","Account detail pages with contact history and next actions.","Global search and filter controls for large datasets.","Consistent status colors and typography for at-a-glance reading."]}]},{"type":"section","heading":"Solution","items":[{"type":"paragraph","text":"Structured dashboard with clear hierarchy, filters, and detail drill-down views—balancing information density with readable spacing and predictable navigation."}]}],"credits":{"heading":"Credits","columns":[{"label":"Services","items":["Information Architecture","User Interface Design","Prototyping"]},{"label":"Tools","items":["Figma"]},{"label":"Teams","groups":[{"label":"Product Designer","members":["Ankit Shrestha"]}]}]}}'::jsonb
  ),
  (
    'calilio',
    'VoIP',
    'Calilio',
    'Experience the future of Business Phone System with Calilio.',
    array['Web App', 'UI & UX design', 'Responsive Design', 'VoIP'],
    '#1a140c',
    'projects/calilio.svg',
    'Calilio unified callbox web interface',
    4,
    '{"tagline":"Experience the future of Business Phone System with Calilio.","meta":[{"label":"Deliverables","value":"Mobile + Web app, Design System, redesign, Interface design, Company: Yoddha Lab"},{"label":"Teams","value":"5 Designer + 10+ Developers"},{"label":"Timeline","value":"Ongoing"}],"blocks":[{"type":"section","heading":"Context","items":[{"type":"paragraph","text":"Calilio is an AI-powered cloud business phone platform built on VoIP technology, designed for remote teams, sales operations, and support centers. The platform unifies business administrators, sales representatives, and customer support teams in a single workspace to manage multi-channel communications across 100+ countries."},{"type":"paragraph","text":"The goal of the web application and landing page design was to modernize marketing and onboarding flows, establish content clarity across core pages, and introduce a scalable design system that boosts conversions and user engagement across desktop and mobile."},{"type":"list","items":["Sales and support teams make/receive VoIP calls, manage unified text/MMS messages, and use AI-driven call insights.","Admins and managers manage phone numbers, route call queues, set IVR flows, and monitor real-time agent performance.","Prospects and buyers evaluate features (Affiliate, Pricing, Blog, Country Code) through clear, responsive UI/UX conversion points."]},{"type":"paragraph","text":"This product ecosystem supports both web applications and responsive landing pages, enabling seamless global business communication, transparent call analytics, and lower bounce rates."}]},{"type":"media","images":[{"path":"projects/calilio.svg","alt":"Calilio marketing and product interface overview"}]},{"type":"section","heading":"Scope","items":[{"type":"paragraph","text":"The project focused on redesigning key marketing and web application touchpoints for Calilio, improving visual hierarchy, content organization, and overall conversion performance."},{"type":"list","items":["Redesigning key web conversion pages: Pricing, Affiliate, Country Code, and Blog layouts.","Interactive feature UI design: showcasing IVR menus, AI call transcription/sentiment analysis, power dialers, and unified callboxes.","Design system & layout architecture: building a flexible, mobile-first responsive layout to support high-content density.","Optimization for performance: restructuring page flows alongside SEO and content teams to reduce user friction and elevate retention metrics."]}]},{"type":"media","images":[{"path":"projects/calilio.svg","alt":"Calilio scope and conversion page layouts"}]},{"type":"section","heading":"My Roles","items":[{"type":"subheading","text":"UX & Product Designer"},{"type":"list","items":["Analyzed high-friction user paths and web navigation structures to improve conversion flows.","Redesigned key high-intent pages (Pricing, Affiliate, Country Code, and Blog) under senior design guidance.","Collaborated closely with cross-functional teams, including developers, SEO specialists, and content marketers.","Applied scalable UI components and responsive layout systems to maintain platform-wide design consistency."]}]},{"type":"section","heading":"Tools","items":[{"type":"paragraph","text":"Figma, Miro, Slack, Google Meet, Notion"}]},{"type":"section","heading":"Responsibilities","items":[{"type":"list","items":["UX Audit & Content Mapping: Evaluated drop-off points on key landing pages to streamline user navigation.","Design System Integration: Implemented consistent typography, spacing, and reusable components across responsive breakpoints.","Wireframing & High-Fidelity UI: Designed clean, structured layouts to clearly display complex VoIP plans and country-code availability.","Cross-Team Collaboration: Partnered with SEO and marketing leads to ensure layouts supported content strategy without sacrificing user experience."]}]},{"type":"media","images":[{"path":"projects/calilio.svg","alt":"Calilio responsibilities and design system work"}]},{"type":"section","heading":"Challenges","items":[{"type":"paragraph","text":"Designing for cloud telecommunications and SaaS platforms presented specific UX and conversion challenges:"},{"type":"list","items":["Web visitors dropped off due to complex, text-heavy layouts on core conversion pages like Pricing and Country Code listings.","Existing navigation required too many steps to find global number availability and plan specifics.","Marketing pages lacked clear visual hierarchy and conversion-focused UX patterns to drive trial signups.","Enterprise buyers and remote teams needed instant clarity on AI-powered features (IVR, call transcripts, call routing) without feeling overwhelmed by technical jargon.","A major challenge was balancing detailed technical specs with fast, intuitive onboarding for global users."]}]},{"type":"section","heading":"Goals/Features","items":[{"type":"list","items":["Streamlined Pricing & Plan Selector: Users can seamlessly compare features, billing frequencies, and regional tiers without layout clutter.","Interactive Country Code Directory: A fast, searchable database allowing prospects to instantly locate and request virtual numbers across 100+ countries.","High-Conversion Blog & Content Architecture: Redesigned layout systems featuring sticky CTAs, improved readability, and clear related-topic navigation to drive organic lead conversion.","Unified Design System: A cohesive component library across web and mobile layouts that ensures brand consistency and reduces front-end implementation time.","Feature Showcase Modules: Visual, interactive UI cards demonstrating complex AI phone features (power dialer, call queues, sentiment analysis) directly on high-intent landing pages.","Optimized Onboarding Flow: Frictionless call-to-action paths designed to capture user interest and lower bounce rates across key entry pages."]}]},{"type":"media","images":[{"path":"projects/calilio.svg","alt":"Calilio goals and feature modules"},{"path":"projects/calilio.svg","alt":"Calilio feature showcase UI"}]},{"type":"section","heading":"Feature Scope / Aligned by MVP","items":[{"type":"paragraph","text":"The redesigned marketing site and web app pages focused on clarity, conversion, and global accessibility, emphasizing seamless navigation for prospects while maintaining comprehensive product details for decision-makers."},{"type":"subheading","text":"Core Web Pages & Navigation:"},{"type":"list","items":["Pricing Page: Clear tier comparisons, interactive feature matrices, and regional rate breakdowns","Country Code Directory: Searchable virtual number availability across 100+ countries with instant request CTAs","Affiliate Program Page: Streamlined sign-up paths, payout structure visuals, and partner benefit guides","Blog & Resources Hub: Topic-filtered layouts, sticky reading progress bars, and strategically placed trial CTAs"]},{"type":"subheading","text":"Web App:"},{"type":"list","items":["Virtual Number Management: Centralized dashboard for acquiring, assigning, and routing business numbers","Call & SMS Analytics: Real-time visibility into active calls, usage metrics, and team performance","IVR & Call Flow Builder: Intuitive setup controls for automated call routing and business hours","AI Insights Dashboard: Integrated call summaries, sentiment tracking, and transcript histories"]},{"type":"callout","text":"Impact: Increased user engagement by 25% and reduced bounce rates by 15% across targeted conversion pages."}]},{"type":"section","heading":"Constraints","items":[{"type":"paragraph","text":"The cloud telecom and SaaS marketing landscape presented unique structural and compliance constraints:"},{"type":"subheading","text":"High Content Density:"},{"type":"paragraph","text":"Presenting complex VoIP features, pricing tiers, and international coverage without cluttering the screen required strict layout hierarchy and clean component systems."},{"type":"subheading","text":"Global Regulatory & Privacy Standards:"},{"type":"paragraph","text":"Layouts and copy needed to accommodate compliance requirements, international dial code standards, and data security disclosures (e.g., GDPR, telecommunication regulations)."},{"type":"subheading","text":"Diverse Target Audience:"},{"type":"paragraph","text":"The pages had to cater to both tech-savvy enterprise IT buyers seeking advanced AI call features and small business owners needing simple, immediate business phone setups."}]},{"type":"section","heading":"Gathering Req. / Research & Analysis","items":[{"type":"paragraph","text":"Understand how global business teams and remote organizations interact with cloud phone systems and what causes friction in high-intent conversion journeys."},{"type":"list","items":["Heuristic Evaluations & Heatmaps: Analyzed existing Calilio marketing pages, identifying steep drop-off points on text-heavy Pricing and Country Code pages.","Competitor Benchmarking: Evaluated top VoIP and unified communications solutions (KrispCall, Dialpad, JustCall, Quo/OpenPhone) to identify industry design standards and navigation trends.","Task Analysis of Core Conversion Flows: Analyzed user actions across international virtual number lookup, plan comparison, and affiliate sign-ups.","User & Stakeholder Insights: Gathered input from cross-functional teams (SEO, content, and sales) to balance keyword-dense marketing layouts with clean UI patterns."]},{"type":"list","items":["65% of Web Visitors Struggled with Number Selection: Testing showed users had difficulty finding region-specific phone numbers due to unorganized directory tables.","B2B Buyers Preferred Scannable Layouts: Enterprise decision-makers prioritized visual feature breakdowns (IVR flows, AI transcripts, call routing) over lengthy copy blocks."]}]},{"type":"media","images":[{"path":"projects/calilio.svg","alt":"Calilio research and analysis artifacts"}]}],"credits":{"heading":"Credits","columns":[{"label":"Services","items":["Research","User Interface Design","User Experience Design","System Design"]},{"label":"Tools","items":["Figma","Slack","Google Meet"]},{"label":"Teams","groups":[{"label":"Product Manager","members":["Bibek A."]},{"label":"Product Designer","members":["Sunil K.","Brishan B.","Abishek A.","Aashmita S.","Manoj K."]},{"label":"Developers","members":["Lokesh B. (FE)","Laxmi M. (FE)","Rojit D. (FE)","Kamal A. (BE)","Prithivi P. (BE)","Shirish J. (Flutter)","Prakash A. (QA)","Sijan T. (QA)"]}]}]}}'::jsonb
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
