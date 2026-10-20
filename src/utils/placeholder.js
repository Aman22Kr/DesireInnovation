// Self-contained placeholder artwork (inline SVG data URIs).
// No network requests, so images can never break. Swap for real photos in src/assets
// or public/ and point `image` fields in src/data/index.js at them.
const PALETTES = [
  ['#d9532b', '#f6f1e8', '#1b1a17'],
  ['#2f4a3a', '#e8dfcf', '#d9532b'],
  ['#1b1a17', '#d9532b', '#f6f1e8'],
  ['#e8b04a', '#1b1a17', '#f6f1e8'],
  ['#4a6a8a', '#f6f1e8', '#e8b04a'],
  ['#8a3b2a', '#f1d9b8', '#1b1a17'],
]

export function art(seed = 0, label = '', w = 800, h = 600) {
  const [bg, fg, ink] = PALETTES[Math.abs(seed) % PALETTES.length]
  const variant = Math.abs(seed) % 3
  const shapes = [
    `<circle cx="${w * 0.68}" cy="${h * 0.42}" r="${h * 0.3}" fill="${fg}"/><rect x="${w * 0.1}" y="${h * 0.58}" width="${w * 0.5}" height="${h * 0.14}" fill="${ink}"/>`,
    `<rect x="${w * 0.12}" y="${h * 0.14}" width="${w * 0.36}" height="${h * 0.62}" fill="${fg}"/><circle cx="${w * 0.66}" cy="${h * 0.62}" r="${h * 0.18}" fill="${ink}"/>`,
    `<path d="M0 ${h * 0.8} L${w * 0.45} ${h * 0.2} L${w * 0.9} ${h * 0.8} Z" fill="${fg}"/><rect x="${w * 0.55}" y="${h * 0.12}" width="${w * 0.3}" height="${h * 0.14}" fill="${ink}"/>`,
  ]
  const text = label
    ? `<text x="${w * 0.06}" y="${h * 0.93}" font-family="Georgia,serif" font-size="${h * 0.05}" fill="${ink === bg ? fg : ink}" opacity=".85">${label.replace(/[<>&"]/g, '')}</text>`
    : ''
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="${bg}"/>${shapes[variant]}${text}</svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
