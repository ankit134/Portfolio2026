import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteProject, fetchProjectsRaw, upsertProject } from '../../lib/queries'
import { projectToRow } from '../../lib/mappers'
import { uploadImage } from '../../lib/imageUrl'

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
  case_study: '{}',
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
      case_study: JSON.stringify(p.case_study ?? {}, null, 2),
    })
  }

  function resetForm() {
    setForm(emptyProject)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')
    try {
      let caseStudy = {}
      try {
        caseStudy = JSON.parse(form.case_study || '{}')
      } catch {
        setMessage('Case study must be valid JSON.')
        return
      }

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
        caseStudy,
      })

      await upsertProject(row, form.id)
      await queryClient.invalidateQueries({ queryKey: ['portfolio'] })
      await queryClient.invalidateQueries({ queryKey: ['admin-projects'] })
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
      setMessage('Image uploaded.')
    } catch (err) {
      setMessage(err.message)
    }
  }

  if (isLoading) return <p className="text-[#8A8A93]">Loading…</p>

  return (
    <div>
      <h1 className="text-2xl font-bold">Projects</h1>

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

      <form onSubmit={handleSubmit} className="mt-10 max-w-2xl space-y-4 border-t border-white/10 pt-10">
        <h2 className="text-lg font-semibold">{form.id ? 'Edit project' : 'New project'}</h2>
        {['slug', 'category', 'title', 'image_path', 'image_alt', 'pad_color'].map((key) => (
          <div key={key}>
            <label className="mb-2 block text-sm capitalize">{key.replace('_', ' ')}</label>
            <input
              value={form[key] ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-[#161616] px-4 py-3 outline-none focus:border-[#FF5733]/50"
              required={key === 'slug' || key === 'title'}
            />
          </div>
        ))}
        <div>
          <label className="mb-2 block text-sm">Upload image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-[#8A8A93]" />
        </div>
        <div>
          <label className="mb-2 block text-sm">Description</label>
          <textarea
            rows={4}
            value={form.description ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full rounded-lg border border-white/10 bg-[#161616] px-4 py-3 outline-none focus:border-[#FF5733]/50"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm">Tags (comma-separated)</label>
          <input
            value={form.tags ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
            className="w-full rounded-lg border border-white/10 bg-[#161616] px-4 py-3 outline-none focus:border-[#FF5733]/50"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm">Sort order</label>
          <input
            type="number"
            value={form.sort_order ?? 0}
            onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
            className="w-full rounded-lg border border-white/10 bg-[#161616] px-4 py-3 outline-none focus:border-[#FF5733]/50"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm">Case study (JSON)</label>
          <textarea
            rows={8}
            value={form.case_study ?? '{}'}
            onChange={(e) => setForm((f) => ({ ...f, case_study: e.target.value }))}
            className="w-full rounded-lg border border-white/10 bg-[#161616] px-4 py-3 font-mono text-sm outline-none focus:border-[#FF5733]/50"
          />
        </div>
        <div className="flex gap-3">
          <button type="submit" className="rounded-lg bg-[#FF5733] px-6 py-2 text-sm font-semibold">
            Save project
          </button>
          {form.id && (
            <button type="button" onClick={resetForm} className="text-sm text-[#8A8A93]">
              Cancel edit
            </button>
          )}
        </div>
        {message && <p className="text-sm text-[#8A8A93]">{message}</p>}
      </form>
    </div>
  )
}
