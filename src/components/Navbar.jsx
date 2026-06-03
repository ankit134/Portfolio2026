import { navLinks } from '../data/content'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0B0B0B]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[72px] md:px-8">
        <a
          href="#"
          className="font-sans text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-80"
          aria-label="Home"
        >
        AS.
        </a>
        <ul className="flex items-center gap-6 md:gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-[#8A8A93] transition-colors hover:text-white"
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
