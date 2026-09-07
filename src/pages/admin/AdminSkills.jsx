import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteSkill, fetchSkillsRaw, upsertSkill } from '../../lib/queries'

export default function AdminSkills() {
  const queryClient = useQueryClient()
  const { data: skills = [] } = useQuery({
    queryKey: ['admin-skills'],
    queryFn: fetchSkillsRaw,
  })
  const [label, setLabel] = useState('')
  const [sortOrder, setSortOrder] = useState(0)
  const [editId, setEditId] = useState(null)
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')
    try {
      await upsertSkill(label, Number(sortOrder) || 0, editId)
      await queryClient.invalidateQueries({ queryKey: ['portfolio'] })
      await queryClient.invalidateQueries({ queryKey: ['admin-skills'] })
      setLabel('')
      setSortOrder(0)
      setEditId(null)
      setMessage('Skill saved.')
    } catch (err) {
      setMessage(err.message)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this skill?')) return
    await deleteSkill(id)
    await queryClient.invalidateQueries({ queryKey: ['portfolio'] })
    await queryClient.invalidateQueries({ queryKey: ['admin-skills'] })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Skills</h1>
      <ul className="mt-6 space-y-2">
        {skills.map((s) => (
          <li
            key={s.id}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-[#111113] px-4 py-3"
          >
            <span>{s.label}</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditId(s.id)
                  setLabel(s.label)
                  setSortOrder(s.sort_order)
                }}
                className="text-sm text-[#FF5733]"
              >
                Edit
              </button>
              <button type="button" onClick={() => handleDelete(s.id)} className="text-sm text-red-400">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="mt-10 max-w-md space-y-4 border-t border-white/10 pt-10">
        <h2 className="text-lg font-semibold">{editId ? 'Edit skill' : 'Add skill'}</h2>
        <input
          placeholder="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
          className="w-full rounded-lg border border-white/10 bg-[#161616] px-4 py-3 outline-none focus:border-[#FF5733]/50"
        />
        <input
          type="number"
          placeholder="Sort order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-[#161616] px-4 py-3 outline-none focus:border-[#FF5733]/50"
        />
        <button type="submit" className="rounded-lg bg-[#FF5733] px-6 py-2 text-sm font-semibold">
          Save skill
        </button>
        {message && <p className="text-sm text-[#8A8A93]">{message}</p>}
      </form>
    </div>
  )
}
