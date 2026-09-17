/** Default empty case study shape for admin + new projects. */
export function emptyCaseStudy() {
  return {
    tagline: '',
    meta: [],
    blocks: [],
    credits: {
      heading: 'Credits',
      columns: [],
    },
  }
}

export function emptyMetaRow() {
  return { label: '', value: '' }
}

export function emptySectionBlock() {
  return {
    type: 'section',
    heading: '',
    items: [emptyParagraphItem()],
  }
}

export function emptyMediaBlock() {
  return {
    type: 'media',
    images: [emptyMediaImage()],
  }
}

export function emptyParagraphItem() {
  return { type: 'paragraph', text: '' }
}

export function emptyListItem() {
  return { type: 'list', items: [''] }
}

export function emptySubheadingItem() {
  return { type: 'subheading', text: '' }
}

export function emptyCalloutItem() {
  return { type: 'callout', text: '' }
}

export function emptyMediaImage() {
  return { path: '', alt: '', caption: '' }
}

export function emptyCreditsColumn() {
  return { label: '', items: [''], groups: [] }
}

export function emptyCreditsGroup() {
  return { label: '', members: [''] }
}

export const SECTION_ITEM_TYPES = [
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'list', label: 'Bullet list' },
  { value: 'subheading', label: 'Subheading' },
  { value: 'callout', label: 'Callout' },
]

export const BLOCK_TYPES = [
  { value: 'section', label: 'Section' },
  { value: 'media', label: 'Images' },
]

export const DEFAULT_META_LABELS = ['Deliverables', 'Teams', 'Timeline']

/** Starter meta rows for new projects. */
export function defaultMetaRows() {
  return DEFAULT_META_LABELS.map((label) => ({ label, value: '' }))
}
