import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchSiteSettingsRaw, updateSiteSettings } from '../../lib/queries'

const fields = [
  { key: 'name', label: 'Name' },
  { key: 'initials', label: 'Initials' },
  { key: 'photo_path', label: 'Photo path', hint: 'e.g. ankit-portrait.png or storage/uploads/...' },
  { key: 'role', label: 'Role' },
  { key: 'location', label: 'Location' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'hero_summary', label: 'Hero summary', textarea: true },
  { key: 'about_summary', label: 'About summary', textarea: true },
  { key: 'about_secondary', label: 'About secondary', textarea: true },
  { key: 'education', label: 'Education' },
  { key: 'certification', label: 'Certification' },
  { key: 'copyright_location', label: 'Copyright location' },
]

export default function AdminProfile() {
  const queryClient = useQueryClient()
  const { data: settings, isLoading } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: fetchSiteSettingsRaw,
  })
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const activeForm = form ?? settings ?? {}

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      await updateSiteSettings(activeForm)
      await queryClient.invalidateQueries({ queryKey: ['portfolio'] })
      await queryClient.invalidateQueries({ queryKey: ['admin-settings'] })
      setForm(null)
      setMessage('Profile saved.')
    } catch (err) {
      setMessage(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) return <p className="text-[#8A8A93]">Loading…</p>

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-4">
        {fields.map(({ key, label, textarea, hint }) => (
          <div key={key}>
            <label htmlFor={key} className="mb-2 block text-sm font-medium">
              {label}
            </label>
            {textarea ? (
              <textarea
                id={key}
                rows={4}
                value={activeForm[key] ?? ''}
                onChange={(e) => setForm((f) => ({ ...(f ?? settings), [key]: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-[#161616] px-4 py-3 outline-none focus:border-[#FF5733]/50"
              />
            ) : (
              <input
                id={key}
                type="text"
                value={activeForm[key] ?? ''}
                onChange={(e) => setForm((f) => ({ ...(f ?? settings), [key]: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-[#161616] px-4 py-3 outline-none focus:border-[#FF5733]/50"
              />
            )}
            {hint && <p className="mt-1 text-xs text-[#8A8A93]">{hint}</p>}
          </div>
        ))}
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-[#FF5733] px-6 py-2 text-sm font-semibold disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save profile'}
        </button>
        {message && <p className="text-sm text-[#8A8A93]">{message}</p>}
      </form>
    </div>
  )
}
