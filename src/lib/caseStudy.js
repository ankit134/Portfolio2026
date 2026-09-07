/** True when admin has added case study content worth linking to. */
export function hasCaseStudy(caseStudy) {
  if (!caseStudy || typeof caseStudy !== 'object') return false

  if (typeof caseStudy.overview === 'string' && caseStudy.overview.trim()) return true

  if (Array.isArray(caseStudy.sections) && caseStudy.sections.length > 0) {
    return caseStudy.sections.some(
      (section) =>
        (typeof section?.heading === 'string' && section.heading.trim()) ||
        (typeof section?.body === 'string' && section.body.trim()),
    )
  }

  if (Array.isArray(caseStudy.gallery) && caseStudy.gallery.length > 0) return true

  return false
}
