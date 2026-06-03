/** Resolve a public/ asset path for the current Vite base (GitHub Pages subpath or /). */
export function assetUrl(path) {
  const clean = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${clean}`
}
