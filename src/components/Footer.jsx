import { Link } from 'react-router-dom'
import { footerNav } from '../data/content'
import { usePortfolio } from '../hooks/usePortfolio'
import Reveal from './Reveal'

function SocialIcon({ type }) {
  if (type === 'github') {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A8.34 8.34 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    )
  }

  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 7h-7V6c0-1.1-.9-2-2-2H9.5C8.1 4 7 5.1 7 6.5v.5H0v14h22V7zM7 6.5C7 5.67 7.67 5 8.5 5H13c.83 0 1.5.67 1.5 1.5V7H7V6.5zm15 13H2V9h20v10.5z" />
    </svg>
  )
}

export default function Footer() {
  const { profile, socialLinks, footerSocialIcons } = usePortfolio()

  return (
    <footer className="border-t border-white/[0.06] px-5 pb-8 pt-20 md:px-8 md:pt-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-2xl font-bold tracking-tight text-white transition-transform duration-300 hover:scale-105">
                {profile.initials}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#8A8A93]">
                <a
                  href={`tel:${profile.phone.replace(/\s/g, '')}`}
                  className="transition-colors hover:text-white"
                >
                  {profile.phone}
                </a>
                <br />
                <a
                  href={`mailto:${profile.email}`}
                  className="transition-colors hover:text-white"
                >
                  {profile.email}
                </a>
                <br />
                {profile.location}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Portfolio</h3>
              <ul className="mt-4 space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-link text-sm text-[#8A8A93] hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Navigation</h3>
              <ul className="mt-4 space-y-3">
                {footerNav.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="nav-link text-sm text-[#8A8A93] hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Contact</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#8A8A93]">
                Open for UX/UI design roles, internships, and collaborations on web and mobile
                products across Nepal.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/[0.06] pt-8 md:flex-row">
            <p className="text-xs text-[#8A8A93]">
              © {new Date().getFullYear()} {profile.name} · Crafted in {profile.copyrightLocation}{' '}
              · Namaste 🙏
            </p>
            <div className="flex items-center gap-4">
              {footerSocialIcons.map((type, i) => (
                <a
                  key={type}
                  href={socialLinks[i]?.href ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-lift flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#8A8A93] hover:border-[#FF5733]/40 hover:text-white hover:shadow-[0_0_20px_rgba(255,87,51,0.2)]"
                  aria-label={type}
                >
                  <SocialIcon type={type} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
