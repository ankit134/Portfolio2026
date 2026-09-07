import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteExperience, fetchExperienceRaw, upsertExperience } from '../../lib/queries'
import { experienceToRow } from '../../lib/mappers'

const emptyItem = {
  id: null,
  slug: '',
  company: '',
  role: '',
  period: '',
  location: '',
  highlights: '',
  grid_span: 'md:row-span-1',
  sort_order: 0,
}

export default function AdminExperience() {
  const queryClient = useQueryClient()
  const { data: items = [], isLoading } = useQuery({
    queryKey: ['admin-experience'],
    queryFn: fetchExperienceRaw,
  })
  const [form, setForm] = useState(emptyItem)
  const [message, setMessage] = useState('')

  function editItem(item) {
    setForm({
      ...item,
      highlights: (item.highlights ?? []).join('\n'),
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')
    try {
      const row = experienceToRow({
        slug: form.slug,
        company: form.company,
        role: form.role,
        period: form.period,
        location: form.location,
        highlights: form.highlights.split('\n').map((h) => h.trim()).filter(Boolean),
        span: form.grid_span,
        sortOrder: Number(form.sort_order) || 0,
      })
      await upsertExperience(row, form.id)
      await queryClient.invalidateQueries({ queryKey: ['portfolio'] })
      await queryClient.invalidateQueries({ queryKey: ['admin-experience'] })
      setMessage('Experience saved.')
      setForm(emptyItem)
    } catch (err) {
      setMessage(err.message)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this entry?')) return
    await deleteExperience(id)
    await queryClient.invalidateQueries({ queryKey: ['portfolio'] })
    await queryClient.invalidateQueries({ queryKey: ['admin-experience'] })
  }

  if (isLoading) return <p className="text-[#8A8A93]">Loading…</p>

  return (
    <div>
      <h1 className="text-2xl font-bold">Experience</h1>
      <ul className="mt-6 space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-[#111113] px-4 py-3"
          >
            <span>
              {item.role} · {item.company}
            </span>
            <div className="flex gap-2">
              <button type="button" onClick={() => editItem(item)} className="text-sm text-[#FF5733]">
                Edit
              </button>
              <button type="button" onClick={() => handleDelete(item.id)} className="text-sm text-red-400">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="mt-10 max-w-2xl space-y-4 border-t border-white/10 pt-10">
        <h2 className="text-lg font-semibold">{form.id ? 'Edit entry' : 'New entry'}</h2>
        {['slug', 'company', 'role', 'period', 'location', 'grid_span'].map((key) => (
          <div key={key}>
            <label className="mb-2 block text-sm capitalize">{key.replace('_', ' ')}</label>
            <input
              value={form[key] ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-[#161616] px-4 py-3 outline-none focus:border-[#FF5733]/50"
              required={['slug', 'company', 'role'].includes(key)}
            />
          </div>
        ))}
        <div>
          <label className="mb-2 block text-sm">Highlights (one per line)</label>
          <textarea
            rows={5}
            value={form.highlights ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, highlights: e.target.value }))}
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
        <button type="submit" className="rounded-lg bg-[#FF5733] px-6 py-2 text-sm font-semibold">
          Save experience
        </button>
        {message && <p className="text-sm text-[#8A8A93]">{message}</p>}
      </form>
    </div>
  )
}
