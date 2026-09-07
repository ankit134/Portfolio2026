import { resolveImageUrl } from './imageUrl'

export function mapSiteSettings(row) {
  if (!row) return null

  return {
    name: row.name,
    initials: row.initials,
    photo: resolveImageUrl(row.photo_path),
    role: row.role,
    location: row.location,
    address: row.address,
    email: row.email,
    phone: row.phone,
    heroSummary: row.hero_summary,
    aboutSummary: row.about_summary,
    aboutSecondary: row.about_secondary,
    education: row.education,
    certification: row.certification,
    copyrightLocation: row.copyright_location,
  }
}

export function mapProject(row) {
  return {
    id: row.slug,
    slug: row.slug,
    dbId: row.id,
    category: row.category,
    title: row.title,
    description: row.description,
    tags: row.tags ?? [],
    padColor: row.pad_color,
    image: resolveImageUrl(row.image_path),
    imagePath: row.image_path,
    imageAlt: row.image_alt,
    sortOrder: row.sort_order,
    caseStudy: row.case_study ?? {},
  }
}

export function mapExperience(row) {
  return {
    id: row.slug,
    slug: row.slug,
    dbId: row.id,
    company: row.company,
    role: row.role,
    period: row.period,
    location: row.location,
    highlights: row.highlights ?? [],
    span: row.grid_span,
    sortOrder: row.sort_order,
  }
}

export function mapSocialLink(row) {
  return {
    id: row.id,
    label: row.label,
    href: row.href,
    icon: row.icon,
    sortOrder: row.sort_order,
  }
}

export function siteSettingsToRow(profile) {
  return {
    name: profile.name,
    initials: profile.initials,
    photo_path: profile.photoPath ?? profile.photo_path,
    role: profile.role,
    location: profile.location,
    address: profile.address,
    email: profile.email,
    phone: profile.phone,
    hero_summary: profile.heroSummary ?? profile.hero_summary,
    about_summary: profile.aboutSummary ?? profile.about_summary,
    about_secondary: profile.aboutSecondary ?? profile.about_secondary,
    education: profile.education,
    certification: profile.certification,
    copyright_location: profile.copyrightLocation ?? profile.copyright_location,
  }
}

export function projectToRow(project) {
  return {
    slug: project.slug ?? project.id,
    category: project.category,
    title: project.title,
    description: project.description,
    tags: project.tags,
    pad_color: project.padColor ?? project.pad_color,
    image_path: project.imagePath ?? project.image_path,
    image_alt: project.imageAlt ?? project.image_alt,
    sort_order: project.sortOrder ?? project.sort_order ?? 0,
    case_study: project.caseStudy ?? project.case_study ?? {},
  }
}

export function experienceToRow(item) {
  return {
    slug: item.slug ?? item.id,
    company: item.company,
    role: item.role,
    period: item.period,
    location: item.location,
    highlights: item.highlights,
    grid_span: item.span ?? item.grid_span ?? 'md:row-span-1',
    sort_order: item.sortOrder ?? item.sort_order ?? 0,
  }
}
