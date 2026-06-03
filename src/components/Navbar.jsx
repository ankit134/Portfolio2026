import { navLinks } from '../data/content'
import { useNavScrolled } from '../hooks/useNavScrolled'

export default function Navbar() {
  const scrolled = useNavScrolled()

  return (
    <nav
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-500 ${
        scrolled
          ? 'border-white/[0.1] bg-[#0B0B0B]/95 shadow-lg shadow-black/20'
          : 'border-white/[0.06] bg-[#0B0B0B]/80'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[72px] md:px-8">
        <a
          href="#"
          className="font-sans text-lg font-bold tracking-tight text-white transition-transform duration-300 hover:scale-105 hover:opacity-90"
          aria-label="Home"
        >
          AS.
        </a>
        <ul className="flex items-center gap-6 md:gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link text-sm font-medium text-[#8A8A93] hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
