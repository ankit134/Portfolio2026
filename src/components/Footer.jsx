import { footerNav, socialLinks } from '../data/content'

function SocialIcon({ type }) {
  const paths = {
    linkedin: (
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.27h4.56V23.5H.22V8.27zm7.32 0h4.37v2.09h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v10.52h-4.56v-9.34c0-2.23-.04-5.09-3.1-5.09-3.1 0-3.58 2.42-3.58 4.92v9.51H7.54V8.27z"
      />
    ),
    twitter: (
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    ),
    dribbble: (
      <path
        fill="currentColor"
        d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm7.568 5.302c1.4 1.74 2.24 3.94 2.28 6.33-2.19-.47-4.17-.2-5.83.68-.58-1.06-1.22-2.05-1.92-2.96 2.05-1.19 3.6-2.74 4.47-4.05zM12 2.04c2.33 0 4.47.8 6.16 2.14-.75 1.12-2.2 2.5-4.1 3.58C12.9 5.4 11.5 3.78 10.04 2.3 10.68 2.12 11.33 2.04 12 2.04zM4.26 4.98C5.7 6.9 7.2 9.06 8.7 11.4 5.62 12.5 2.97 12.5 1.2 12.4c.5-2.2 1.7-4.2 3.06-5.42zm-1.1 9.72c.15 0 .3 0 .46-.01 2.28-.1 5.28-.75 8.28-2.2.5.9 1 1.85 1.44 2.84-3.5 1.35-6.5 1.35-8.5 1.2-.5-1.1-.9-2.3-1.18-3.63zm2.5 7.1c.9-1.5 2.1-3.1 3.5-4.7 1.1.35 2.3.55 3.6.6-1 3.5-2.8 6.2-4.5 7.8-1.5-.5-2.9-1.2-4.1-2.1 1.1-.9 2.3-1.7 3.5-2.6z"
      />
    ),
  }
  const icons = ['linkedin', 'twitter', 'dribbble']
  const idx = icons.indexOf(type)
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      {paths[icons[idx] || 'linkedin']}
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-5 pb-8 pt-20 md:px-8 md:pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-2xl font-bold tracking-tight text-white">MK.</p>
            <p className="mt-4 text-sm leading-relaxed text-[#8A8A93]">
              +977-9817381132
              <br />
              mkmanojkarki009@gmail.com
              <br />
              Kathmandu, Nepal
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Social</h3>
            <ul className="mt-4 space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#8A8A93] transition-colors hover:text-white"
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
                  <a
                    href={link.href}
                    className="text-sm text-[#8A8A93] transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <p className="mt-4 text-sm leading-relaxed text-[#8A8A93]">
              Open for product design collaborations, design systems, and UX direction for web
              and mobile products.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/[0.06] pt-8 md:flex-row">
          <p className="text-xs text-[#8A8A93]">
            © {new Date().getFullYear()} Manoj Karki · Crafted in Lalitpur, Nepal · Namaste 🙏
          </p>
          <div className="flex items-center gap-4">
            {['linkedin', 'twitter', 'dribbble'].map((type) => (
              <a
                key={type}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#8A8A93] transition-colors hover:border-white/20 hover:text-white"
                aria-label={type}
              >
                <SocialIcon type={type} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
