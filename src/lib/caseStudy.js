import { resolveImageUrl } from './imageUrl'

/** @typedef {{ label: string, value: string }} CaseStudyMeta */
/** @typedef {{ type: 'paragraph', text: string }} ParagraphItem */
/** @typedef {{ type: 'subheading', text: string }} SubheadingItem */
/** @typedef {{ type: 'list', items: string[] }} ListItem */
/** @typedef {{ type: 'callout', text: string }} CalloutItem */
/** @typedef {{ type: 'section', heading: string, items: Array<ParagraphItem|SubheadingItem|ListItem|CalloutItem> }} SectionBlock */
/** @typedef {{ path?: string, src?: string, alt?: string, caption?: string }} CaseStudyImage */
/** @typedef {{ type: 'media', images: CaseStudyImage[] }} MediaBlock */

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function hasSectionContent(section) {
  if (!section?.items?.length) {
    return isNonEmptyString(section?.heading)
  }

  return section.items.some((item) => {
    if (item.type === 'list') return item.items?.some(isNonEmptyString)
    return isNonEmptyString(item.text)
  })
}

/** Convert legacy case study shape into block-based layout. */
export function normalizeCaseStudy(raw = {}) {
  if (!raw || typeof raw !== 'object') {
    return { tagline: '', meta: [], blocks: [], credits: null }
  }

  if (Array.isArray(raw.blocks) && raw.blocks.length > 0) {
    return {
      tagline: raw.tagline ?? '',
      meta: Array.isArray(raw.meta) ? raw.meta : [],
      blocks: raw.blocks,
      credits: raw.credits ?? null,
    }
  }

  const blocks = []

  if (isNonEmptyString(raw.overview)) {
    blocks.push({
      type: 'section',
      heading: 'Overview',
      items: [{ type: 'paragraph', text: raw.overview.trim() }],
    })
  }

  if (isNonEmptyString(raw.role)) {
    blocks.push({
      type: 'section',
      heading: 'Role',
      items: [{ type: 'paragraph', text: raw.role.trim() }],
    })
  }

  if (Array.isArray(raw.tools) && raw.tools.length > 0) {
    blocks.push({
      type: 'section',
      heading: 'Tools',
      items: [{ type: 'paragraph', text: raw.tools.join(', ') }],
    })
  }

  if (Array.isArray(raw.sections)) {
    raw.sections.forEach((section) => {
      if (!isNonEmptyString(section?.heading) && !isNonEmptyString(section?.body)) return

      blocks.push({
        type: 'section',
        heading: section.heading ?? '',
        items: isNonEmptyString(section.body)
          ? [{ type: 'paragraph', text: section.body.trim() }]
          : [],
      })
    })
  }

  if (Array.isArray(raw.gallery) && raw.gallery.length > 0) {
    blocks.push({
      type: 'media',
      images: raw.gallery.map((item) =>
        typeof item === 'string'
          ? { path: item, alt: '' }
          : { path: item.path ?? item.src, alt: item.alt ?? '', caption: item.caption ?? '' },
      ),
    })
  }

  return {
    tagline: raw.tagline ?? '',
    meta: Array.isArray(raw.meta) ? raw.meta : [],
    blocks,
    credits: raw.credits ?? null,
  }
}

/** Resolve image paths inside case study blocks. */
export function resolveCaseStudy(caseStudy) {
  const normalized = normalizeCaseStudy(caseStudy)

  return {
    ...normalized,
    blocks: normalized.blocks.map((block) => {
      if (block.type !== 'media' || !Array.isArray(block.images)) return block

      return {
        ...block,
        images: block.images.map((image) => ({
          ...image,
          src: resolveImageUrl(image.path ?? image.src),
          alt: image.alt ?? '',
          caption: image.caption ?? '',
        })),
      }
    }),
  }
}

/** True when admin has added case study content worth linking to. */
export function hasCaseStudy(caseStudy) {
  const normalized = normalizeCaseStudy(caseStudy)

  if (isNonEmptyString(normalized.tagline)) return true
  if (normalized.meta?.some((item) => isNonEmptyString(item.label) || isNonEmptyString(item.value))) {
    return true
  }

  if (
    normalized.blocks.some((block) => {
      if (block.type === 'media') return block.images?.some((img) => isNonEmptyString(img.path ?? img.src))
      if (block.type === 'section') return hasSectionContent(block)
      return false
    })
  ) {
    return true
  }

  if (normalized.credits?.columns?.length) return true

  return false
}
