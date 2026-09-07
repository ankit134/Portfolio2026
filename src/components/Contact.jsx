import { useState } from 'react'
import { submitContactMessage } from '../lib/queries'
import { isSupabaseConfigured } from '../lib/supabase'
import Reveal from './Reveal'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setStatus('submitting')

    try {
      await submitContactMessage(form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('error')
      setError(err.message ?? 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5733]">Get in touch</p>
          <h2 className="mt-4 font-sans text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Contact
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#8A8A93]">
            Open for UX/UI design roles, internships, and collaborations on web and mobile products.
          </p>

          {!isSupabaseConfigured && (
            <p className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
              Contact form requires Supabase env vars. Add them to `.env.local` to enable submissions.
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-white">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none transition-colors focus:border-[#FF5733]/50"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-white">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none transition-colors focus:border-[#FF5733]/50"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-white">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full resize-y rounded-lg border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none transition-colors focus:border-[#FF5733]/50"
              />
            </div>
            <button
              type="submit"
              disabled={!isSupabaseConfigured || status === 'submitting'}
              className="rounded-lg bg-[#FF5733] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'submitting' ? 'Sending…' : 'Send message'}
            </button>
            {status === 'success' && (
              <p className="text-sm text-emerald-400">Message sent. I&apos;ll get back to you soon.</p>
            )}
            {status === 'error' && <p className="text-sm text-red-400">{error}</p>}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
