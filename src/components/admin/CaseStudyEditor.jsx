import ImageUploadField from './ImageUploadField'
import {
  SECTION_ITEM_TYPES,
  emptyCalloutItem,
  emptyCreditsColumn,
  emptyCreditsGroup,
  emptyListItem,
  emptyMediaBlock,
  emptyMediaImage,
  emptyMetaRow,
  emptyParagraphItem,
  emptySectionBlock,
  emptySubheadingItem,
} from '../../lib/caseStudyDefaults'

const inputClass =
  'w-full rounded-lg border border-white/10 bg-[#161616] px-4 py-3 text-sm outline-none placeholder:text-[#6b6b75] focus:border-[#FF5733]/50'
const textareaClass = `${inputClass} min-h-[88px] resize-y`
const labelClass = 'mb-2 block text-sm text-[#c4c4cc]'
const addBtnClass = 'text-sm font-medium text-[#FF5733] hover:opacity-90'
const removeBtnClass = 'text-sm text-red-400 hover:opacity-90'

function FieldLabel({ children }) {
  return <label className={labelClass}>{children}</label>
}

function StringListEditor({ label, items = [], onChange, placeholder = 'Type an item…', addLabel = 'Add another' }) {
  const list = items.length ? items : ['']

  return (
    <div className="space-y-2">
      <FieldLabel>{label}</FieldLabel>
      {list.map((item, index) => (
        <div key={`${label}-${index}`} className="flex gap-2">
          <input
            value={item}
            placeholder={placeholder}
            onChange={(e) => {
              const next = [...list]
              next[index] = e.target.value
              onChange(next)
            }}
            className={inputClass}
          />
          <button
            type="button"
            className={removeBtnClass}
            onClick={() => onChange(list.filter((_, i) => i !== index))}
          >
            Delete
          </button>
        </div>
      ))}
      <button type="button" className={addBtnClass} onClick={() => onChange([...list, ''])}>
        + {addLabel}
      </button>
    </div>
  )
}

function SectionItemEditor({ item, onChange, onRemove }) {
  return (
    <div className="space-y-3 rounded-lg border border-white/10 bg-[#111113] p-4">
      <div className="flex items-center justify-between gap-3">
        <select
          value={item.type}
          onChange={(e) => {
            const type = e.target.value
            if (type === 'paragraph') onChange(emptyParagraphItem())
            else if (type === 'list') onChange(emptyListItem())
            else if (type === 'subheading') onChange(emptySubheadingItem())
            else if (type === 'callout') onChange(emptyCalloutItem())
          }}
          className={inputClass}
        >
          {SECTION_ITEM_TYPES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button type="button" className={removeBtnClass} onClick={onRemove}>
          Delete item
        </button>
      </div>

      {item.type === 'list' ? (
        <StringListEditor
          label="Bullet points"
          items={item.items}
          onChange={(items) => onChange({ ...item, items })}
          placeholder="e.g. Redesigned pricing page to reduce drop-off"
          addLabel="Add bullet"
        />
      ) : (
        <div>
          <FieldLabel>{item.type === 'callout' ? 'Highlight box text' : 'Text'}</FieldLabel>
          <textarea
            value={item.text ?? ''}
            onChange={(e) => onChange({ ...item, text: e.target.value })}
            placeholder={
              item.type === 'callout'
                ? 'e.g. Impact: Increased engagement by 25% on key pages.'
                : item.type === 'subheading'
                  ? 'e.g. Core web pages'
                  : 'Write a paragraph for this section…'
            }
            className={textareaClass}
          />
        </div>
      )}
    </div>
  )
}

function MediaBlockEditor({ block, onChange, onRemove, onStatus }) {
  const images = block.images?.length ? block.images : [emptyMediaImage()]

  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-[#111113] p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">Image gallery</p>
        <button type="button" className={removeBtnClass} onClick={onRemove}>
          Delete gallery
        </button>
      </div>

      {images.map((image, index) => (
        <div key={`media-${index}`} className="space-y-3 rounded-lg border border-white/5 p-4">
          <ImageUploadField
            label={`Image ${index + 1}`}
            value={image.path ?? ''}
            onChange={(path) => {
              const next = [...images]
              next[index] = { ...next[index], path }
              onChange({ ...block, images: next })
            }}
            onStatus={onStatus}
            folder="projects"
          />
          <FieldLabel>Image description (accessibility)</FieldLabel>
          <input
            value={image.alt ?? ''}
            onChange={(e) => {
              const next = [...images]
              next[index] = { ...next[index], alt: e.target.value }
              onChange({ ...block, images: next })
            }}
            placeholder="e.g. Pricing page redesign on desktop"
            className={inputClass}
          />
          <FieldLabel>Caption (optional)</FieldLabel>
          <input
            value={image.caption ?? ''}
            onChange={(e) => {
              const next = [...images]
              next[index] = { ...next[index], caption: e.target.value }
              onChange({ ...block, images: next })
            }}
            placeholder="Optional text shown under the image"
            className={inputClass}
          />
          <button
            type="button"
            className={removeBtnClass}
            onClick={() => onChange({ ...block, images: images.filter((_, i) => i !== index) })}
          >
            Delete this image
          </button>
        </div>
      ))}

      <button
        type="button"
        className={addBtnClass}
        onClick={() => onChange({ ...block, images: [...images, emptyMediaImage()] })}
      >
        + Add another image
      </button>
    </div>
  )
}

function SectionBlockEditor({ block, onChange, onRemove }) {
  const items = block.items?.length ? block.items : [emptyParagraphItem()]

  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-[#111113] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-white">Text section</p>
        <button type="button" className={removeBtnClass} onClick={onRemove}>
          Delete section
        </button>
      </div>

      <div>
        <FieldLabel>Section heading</FieldLabel>
        <input
          value={block.heading ?? ''}
          onChange={(e) => onChange({ ...block, heading: e.target.value })}
          placeholder="Context, Scope, Challenges…"
          className={inputClass}
        />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#8A8A93]">Section content</p>
        {items.map((item, index) => (
          <SectionItemEditor
            key={`item-${index}`}
            item={item}
            onChange={(nextItem) => {
              const nextItems = [...items]
              nextItems[index] = nextItem
              onChange({ ...block, items: nextItems })
            }}
            onRemove={() => onChange({ ...block, items: items.filter((_, i) => i !== index) })}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className={addBtnClass}
          onClick={() => onChange({ ...block, items: [...items, emptyParagraphItem()] })}
        >
          Add paragraph
        </button>
        <button
          type="button"
          className={addBtnClass}
          onClick={() => onChange({ ...block, items: [...items, emptyListItem()] })}
        >
          Add bullet list
        </button>
        <button
          type="button"
          className={addBtnClass}
          onClick={() => onChange({ ...block, items: [...items, emptySubheadingItem()] })}
        >
          Add subheading
        </button>
        <button
          type="button"
          className={addBtnClass}
          onClick={() => onChange({ ...block, items: [...items, emptyCalloutItem()] })}
        >
          Add highlight box
        </button>
      </div>
    </div>
  )
}

function CreditsEditor({ credits, onChange }) {
  const columns = credits?.columns?.length ? credits.columns : []

  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-[#111113] p-4">
      <p className="text-sm font-semibold text-white">Credits</p>

      <div>
        <FieldLabel>Credits section title</FieldLabel>
        <input
          value={credits?.heading ?? 'Credits'}
          onChange={(e) => onChange({ ...credits, heading: e.target.value })}
          placeholder="Credits"
          className={inputClass}
        />
      </div>

      {columns.map((column, columnIndex) => (
        <div key={`col-${columnIndex}`} className="space-y-3 rounded-lg border border-white/5 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white">Credits group {columnIndex + 1}</p>
            <button
              type="button"
              className={removeBtnClass}
              onClick={() =>
                onChange({
                  ...credits,
                  columns: columns.filter((_, i) => i !== columnIndex),
                })
              }
            >
              Delete group
            </button>
          </div>

          <FieldLabel>Column label</FieldLabel>
          <input
            value={column.label ?? ''}
            onChange={(e) => {
              const next = [...columns]
              next[columnIndex] = { ...next[columnIndex], label: e.target.value }
              onChange({ ...credits, columns: next })
            }}
            placeholder="Services, Tools, Teams…"
            className={inputClass}
          />

          {column.groups?.length ? (
            <div className="space-y-3">
              {column.groups.map((group, groupIndex) => (
                <div key={`group-${groupIndex}`} className="space-y-2 rounded-lg border border-white/5 p-3">
                  <FieldLabel>Team name</FieldLabel>
                  <input
                    value={group.label ?? ''}
                    onChange={(e) => {
                      const next = [...columns]
                      const groups = [...next[columnIndex].groups]
                      groups[groupIndex] = { ...groups[groupIndex], label: e.target.value }
                      next[columnIndex] = { ...next[columnIndex], groups }
                      onChange({ ...credits, columns: next })
                    }}
                    placeholder="e.g. Product designers"
                    className={inputClass}
                  />
                  <StringListEditor
                    label="Team members"
                    items={group.members}
                    onChange={(members) => {
                      const next = [...columns]
                      const groups = [...next[columnIndex].groups]
                      groups[groupIndex] = { ...groups[groupIndex], members }
                      next[columnIndex] = { ...next[columnIndex], groups }
                      onChange({ ...credits, columns: next })
                    }}
                    placeholder="e.g. Ankit Shrestha"
                    addLabel="Add team member"
                  />
                  <button
                    type="button"
                    className={removeBtnClass}
                    onClick={() => {
                      const next = [...columns]
                      next[columnIndex] = {
                        ...next[columnIndex],
                        groups: next[columnIndex].groups.filter((_, i) => i !== groupIndex),
                      }
                      onChange({ ...credits, columns: next })
                    }}
                  >
                    Delete team
                  </button>
                </div>
              ))}
              <button
                type="button"
                className={addBtnClass}
                onClick={() => {
                  const next = [...columns]
                  next[columnIndex] = {
                    ...next[columnIndex],
                    groups: [...(next[columnIndex].groups ?? []), emptyCreditsGroup()],
                  }
                  onChange({ ...credits, columns: next })
                }}
              >
                + Add another team
              </button>
            </div>
          ) : (
            <StringListEditor
              label="List items"
              items={column.items}
              onChange={(items) => {
                const next = [...columns]
                next[columnIndex] = { ...next[columnIndex], items }
                onChange({ ...credits, columns: next })
              }}
              placeholder="e.g. User interface design"
              addLabel="Add list item"
            />
          )}

          {!column.groups?.length && (
            <button
              type="button"
              className={addBtnClass}
              onClick={() => {
                const next = [...columns]
                next[columnIndex] = {
                  label: next[columnIndex].label,
                  groups: [emptyCreditsGroup()],
                  items: [],
                }
                onChange({ ...credits, columns: next })
              }}
            >
              Use teams list instead
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        className={addBtnClass}
        onClick={() =>
          onChange({
            ...credits,
            heading: credits?.heading ?? 'Credits',
            columns: [...columns, emptyCreditsColumn()],
          })
        }
      >
        + Add credits group
      </button>
    </div>
  )
}

export default function CaseStudyEditor({ value, onChange, onStatus }) {
  const caseStudy = value ?? { tagline: '', meta: [], blocks: [], credits: { heading: 'Credits', columns: [] } }
  const meta = caseStudy.meta?.length ? caseStudy.meta : []
  const blocks = caseStudy.blocks ?? []

  function updateCaseStudy(patch) {
    onChange({ ...caseStudy, ...patch })
  }

  function updateBlock(index, block) {
    const next = [...blocks]
    next[index] = block
    updateCaseStudy({ blocks: next })
  }

  return (
    <div className="space-y-6 border-t border-white/10 pt-8">
      <div>
        <h3 className="text-lg font-semibold text-white">Case study page</h3>
        <p className="mt-1 text-sm text-[#8A8A93]">
          Full project write-up at /projects/your-link-name — tagline, quick facts, sections, images, and credits.
        </p>
      </div>

      <div>
        <FieldLabel>Tagline</FieldLabel>
        <input
          value={caseStudy.tagline ?? ''}
          onChange={(e) => updateCaseStudy({ tagline: e.target.value })}
          placeholder="e.g. Experience the future of business phone systems with Calilio."
          className={inputClass}
        />
        <p className="mt-1.5 text-xs text-[#8A8A93]">One line under the project name on the case study page.</p>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#8A8A93]">Quick facts</p>
        <p className="text-xs text-[#8A8A93]">Three columns under the tagline — e.g. Deliverables, Teams, Timeline.</p>
        {meta.map((row, index) => (
          <div key={`meta-${index}`} className="grid gap-3 rounded-lg border border-white/10 p-4 md:grid-cols-2">
            <div>
              <FieldLabel>Fact title</FieldLabel>
              <input
                value={row.label ?? ''}
                onChange={(e) => {
                  const next = [...meta]
                  next[index] = { ...next[index], label: e.target.value }
                  updateCaseStudy({ meta: next })
                }}
                placeholder="e.g. Deliverables"
                className={inputClass}
              />
            </div>
            <div>
              <FieldLabel>Fact detail</FieldLabel>
              <input
                value={row.value ?? ''}
                onChange={(e) => {
                  const next = [...meta]
                  next[index] = { ...next[index], value: e.target.value }
                  updateCaseStudy({ meta: next })
                }}
                placeholder="e.g. Mobile app, design system, 5 designers + 10 developers"
                className={inputClass}
              />
            </div>
            <button
              type="button"
              className={`${removeBtnClass} md:col-span-2`}
              onClick={() => updateCaseStudy({ meta: meta.filter((_, i) => i !== index) })}
            >
              Delete this fact
            </button>
          </div>
        ))}
        <button
          type="button"
          className={addBtnClass}
          onClick={() => updateCaseStudy({ meta: [...meta, emptyMetaRow()] })}
        >
          + Add quick fact
        </button>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#8A8A93]">Page sections</p>
        <p className="text-xs text-[#8A8A93]">Add text sections and image galleries in the order they should appear.</p>
        {blocks.map((block, index) =>
          block.type === 'media' ? (
            <MediaBlockEditor
              key={`block-${index}`}
              block={block}
              onChange={(next) => updateBlock(index, next)}
              onRemove={() => updateCaseStudy({ blocks: blocks.filter((_, i) => i !== index) })}
              onStatus={onStatus}
            />
          ) : (
            <SectionBlockEditor
              key={`block-${index}`}
              block={block}
              onChange={(next) => updateBlock(index, next)}
              onRemove={() => updateCaseStudy({ blocks: blocks.filter((_, i) => i !== index) })}
            />
          ),
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className={addBtnClass}
            onClick={() => updateCaseStudy({ blocks: [...blocks, emptySectionBlock()] })}
          >
            + Add text section
          </button>
          <button
            type="button"
            className={addBtnClass}
            onClick={() => updateCaseStudy({ blocks: [...blocks, emptyMediaBlock()] })}
          >
            + Add image gallery
          </button>
        </div>
      </div>

      <CreditsEditor
        credits={caseStudy.credits ?? { heading: 'Credits', columns: [] }}
        onChange={(credits) => updateCaseStudy({ credits })}
      />
    </div>
  )
}
