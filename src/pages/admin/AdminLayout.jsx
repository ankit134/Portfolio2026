import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const navItems = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/profile', label: 'Profile' },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/experience', label: 'Experience' },
  { to: '/admin/skills', label: 'Skills' },
  { to: '/admin/messages', label: 'Messages' },
]

export default function AdminLayout() {
  const navigate = useNavigate()

  async function handleSignOut() {
    if (supabase) await supabase.auth.signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-8 md:flex-row md:px-8">
        <aside className="md:w-56 md:shrink-0">
          <Link to="/" className="text-lg font-bold">
            AS. Admin
          </Link>
          <nav className="mt-8 flex flex-row flex-wrap gap-2 md:flex-col md:gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'bg-[#FF5733]/20 text-[#FF5733]' : 'text-[#8A8A93] hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-6 text-sm text-[#8A8A93] hover:text-white"
          >
            Sign out
          </button>
        </aside>
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
