import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname ?? '/admin'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!supabase) {
      setError('Supabase is not configured.')
      setLoading(false)
      return
    }

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (authError) {
      setError(authError.message)
      return
    }

    navigate(from, { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] px-5">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111113] p-8">
        <Link to="/" className="text-sm text-[#8A8A93] hover:text-white">
          ← Back to site
        </Link>
        <h1 className="mt-6 text-2xl font-bold text-white">Admin login</h1>
        <p className="mt-2 text-sm text-[#8A8A93]">Sign in to manage portfolio content.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="admin-email" className="mb-2 block text-sm text-white">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none focus:border-[#FF5733]/50"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="mb-2 block text-sm text-white">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none focus:border-[#FF5733]/50"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#FF5733] py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
