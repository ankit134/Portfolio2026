import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import CaseStudyEditor from '../../components/admin/CaseStudyEditor'
import { normalizeCaseStudy } from '../../lib/caseStudy'
import { defaultMetaRows, emptyCaseStudy, emptySectionBlock } from '../../lib/caseStudyDefaults'
import { deleteProject, fetchProjectsRaw, upsertProject } from '../../lib/queries'
import { projectToRow } from '../../lib/mappers'
import { uploadImage } from '../../lib/imageUrl'

const inputClass =
  'w-full rounded-lg border border-white/10 bg-[#161616] px-4 py-3 text-sm outline-none placeholder:text-[#6b6b75] focus:border-[#FF5733]/50'
const textareaClass = `${inputClass} min-h-[96px] resize-y`
const labelClass = 'mb-1.5 block text-sm font-medium text-[#c4c4cc]'
const hintClass = 'mt-1.5 text-xs leading-relaxed text-[#8A8A93]'

function AdminField({ label, hint, children }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
      {hint ? <p className={hintClass}>{hint}</p> : null}
    </div>
  )
}

const PROJECT_FIELDS = [
  {
    key: 'title',
    label: 'Project name',
    placeholder: 'e.g. Calilio',
    hint: 'The title shown on work cards and at the top of the case study page.',
    required: true,
  },
  {
    key: 'slug',
    label: 'Link name (for URL)',
    placeholder: 'e.g. calilio',
    hint: 'Creates the page link /projects/calilio — use lowercase letters, numbers, or hyphens only.',
    required: true,
  },
  {
    key: 'category',
    label: 'Category',
    placeholder: 'e.g. VoIP, Mobile App, SaaS',
    hint: 'Small orange label above the project name (e.g. VoIP).',
  },
  {
    key: 'image_path',
    label: 'Hero image file path',
    placeholder: 'Filled automatically after upload, or e.g. projects/calilio.svg',
    hint: 'Main image at the top of the case study. Upload below or paste a storage path.',
  },
  {
    key: 'image_alt',
    label: 'Hero image description',
    placeholder: 'e.g. Calilio call dashboard on desktop',
    hint: 'Short description for screen readers and SEO.',
  },
  {
    key: 'pad_color',
    label: 'Card background color',
    placeholder: '#111113',
    hint: 'Hex color behind the project thumbnail on the homepage stack.',
  },
]

function starterCaseStudy() {
  return {
    ...emptyCaseStudy(),
    meta: defaultMetaRows(),
    blocks: [emptySectionBlock()],
    credits: { heading: 'Credits', columns: [] },
  }
}

const emptyProject = {
  id: null,
  slug: '',
  category: '',
  title: '',
  description: '',
  tags: '',
  pad_color: '#111113',
  image_path: '',
  image_alt: '',
  sort_order: 0,
  caseStudy: starterCaseStudy(),
}

export default function AdminProjects() {
  const queryClient = useQueryClient()
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: fetchProjectsRaw,
  })
  const [form, setForm] = useState(emptyProject)
  const [message, setMessage] = useState('')

  function editProject(p) {
    setForm({
      ...p,
      tags: (p.tags ?? []).join(', '),
      caseStudy: normalizeCaseStudy(p.case_study ?? {}),
    })
  }

  function resetForm() {
    setForm(emptyProject)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')
    try {
      const row = projectToRow({
        slug: form.slug,
        category: form.category,
        title: form.title,
        description: form.description,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        padColor: form.pad_color,
        imagePath: form.image_path,
        imageAlt: form.image_alt,
        sortOrder: Number(form.sort_order) || 0,
        caseStudy: form.caseStudy,
      })

      await upsertProject(row, form.id)
      await queryClient.invalidateQueries({ queryKey: ['portfolio'] })
      await queryClient.invalidateQueries({ queryKey: ['admin-projects'] })
      await queryClient.invalidateQueries({ queryKey: ['project', form.slug] })
      setMessage('Project saved.')
      resetForm()
    } catch (err) {
      setMessage(err.message)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this project?')) return
    await deleteProject(id)
    await queryClient.invalidateQueries({ queryKey: ['portfolio'] })
    await queryClient.invalidateQueries({ queryKey: ['admin-projects'] })
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const path = await uploadImage(file, 'projects')
      setForm((f) => ({ ...f, image_path: path }))
      setMessage('Hero image uploaded — path filled in automatically.')
    } catch (err) {
      setMessage(err.message)
    }
  }

  if (isLoading) return <p className="text-[#8A8A93]">Loading…</p>

  return (
    <div>
      <h1 className="text-2xl font-bold">Projects</h1>
      <p className="mt-2 max-w-2xl text-sm text-[#8A8A93]">
        Add or edit projects and their case study pages. <strong className="font-medium text-[#c4c4cc]">Short description</strong>{' '}
        appears on the homepage; the <strong className="font-medium text-[#c4c4cc]">case study</strong> section below
        builds the full project page.
      </p>

      <ul className="mt-6 space-y-2">
        {projects.map((p) => (
          <li
            key={p.id}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-[#111113] px-4 py-3"
          >
            <span>{p.title}</span>
            <div className="flex gap-2">
              <button type="button" onClick={() => editProject(p)} className="text-sm text-[#FF5733]">
                Edit
              </button>
              <button type="button" onClick={() => handleDelete(p.id)} className="text-sm text-red-400">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="mt-10 max-w-3xl space-y-5 border-t border-white/10 pt-10">
        <h2 className="text-lg font-semibold">{form.id ? 'Edit project' : 'New project'}</h2>

        {PROJECT_FIELDS.map(({ key, label, placeholder, hint, required }) => (
          <AdminField key={key} label={label} hint={hint}>
            <input
              value={form[key] ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              placeholder={placeholder}
              className={inputClass}
              required={required}
            />
          </AdminField>
        ))}

        <AdminField
          label="Upload hero image"
          hint="Choose a PNG or JPG — the file path field above updates automatically after upload."
        >
          <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-[#8A8A93]" />
        </AdminField>

        <AdminField
          label="Short description"
          hint="One or two sentences on the homepage work card and on the /projects list."
        >
          <textarea
            rows={3}
            value={form.description ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="e.g. A cloud business phone platform with responsive marketing pages and a unified callbox UI."
            className={textareaClass}
          />
        </AdminField>

        <AdminField label="Tags" hint="Separate with commas — shown as pills on the project page.">
          <input
            value={form.tags ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
            placeholder="e.g. Web App, UI Design, Responsive Design, VoIP"
            className={inputClass}
          />
        </AdminField>

        <AdminField
          label="Display order"
          hint="Lower numbers appear first in Selected Work (0 = first)."
        >
          <input
            type="number"
            value={form.sort_order ?? 0}
            onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
            placeholder="0"
            className={inputClass}
          />
        </AdminField>

        <CaseStudyEditor
          value={form.caseStudy}
          onChange={(caseStudy) => setForm((f) => ({ ...f, caseStudy }))}
        />

        <div className="flex gap-3 pt-4">
          <button type="submit" className="rounded-lg bg-[#FF5733] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90">
            Save project
          </button>
          {form.id && (
            <button type="button" onClick={resetForm} className="text-sm text-[#8A8A93] hover:text-white">
              Cancel
            </button>
          )}
        </div>
        {message && <p className="text-sm text-[#8A8A93]">{message}</p>}
      </form>
    </div>
  )
}
