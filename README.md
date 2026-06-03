# Ankit Shrestha — Portfolio

A single-page portfolio for **Ankit Shrestha**, UX/UI Designer based in Nepal. Built with React and Tailwind CSS, inspired by a minimal dark editorial layout with scroll-driven motion and a stacked Selected Work section.

## Live preview

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Features

- **Hero** — Introduction, live Kathmandu clock (UTC+5:45), and scroll animations
- **About** — Portrait, education, certification, skills marquee
- **Selected Work** — Sticky card-stack scroll effect with project visuals (Drop, TradiesHome, Leadhead, Calilio)
- **Experience** — Work history from CV in a bento-style grid
- **Footer** — Contact, navigation, and social links
- Respects `prefers-reduced-motion` for accessibility

## Tech stack

| Layer | Tools |
|--------|--------|
| Framework | React 19 |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 |
| Font | Plus Jakarta Sans (Google Fonts) |

## Project structure

```
src/
├── App.jsx                 # Page layout
├── data/content.js         # Profile, projects, experience, nav (edit copy here)
├── components/             # UI sections
│   ├── selected-work/      # Stacked work cards + visuals
│   └── ...
├── hooks/                  # Parallax, scroll stack, nav state
└── styles/
    └── selected-work.css   # Selected Work stack layout
public/
├── ankit-portrait.png      # Hero & About photo
└── projects/               # Project preview images (SVG)
```

## Getting started

### Prerequisites

- Node.js 18+ (20+ recommended)
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Customization

1. **Copy & contact** — Edit `src/data/content.js` (`profile`, `projects`, `experience`, `socialLinks`).
2. **Portrait** — Replace `public/ankit-portrait.png` and keep `profile.photo` in sync.
3. **Project screenshots** — Add images under `public/projects/` and set each project's `image` path in `content.js`.
4. **Social URLs** — Update `socialLinks` in `content.js` with your Behance and GitHub profiles.

## Design tokens

- Background: `#0B0B0B`
- Surface cards: `#111113` / `#161616`
- Accent: `#FF5733`
- Muted text: `#8A8A93`

## License

Private portfolio project. All rights reserved.
