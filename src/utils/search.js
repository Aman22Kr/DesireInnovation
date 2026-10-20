import { catalog } from '../data'

export const SORTS = {
  relevance: 'Best match',
  newest: 'Newest',
  az: 'A to Z',
}

export function searchCatalog(query = '', { type = 'all', sort = 'relevance' } = {}) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  let results = catalog
    .filter((item) => type === 'all' || item.type === type)
    .map((item) => {
      if (terms.length === 0) return { item, score: 0 }
      const title = item.title.toLowerCase()
      const hay = `${title} ${item.summary} ${item.category} ${item.tags.join(' ')}`.toLowerCase()
      if (!terms.every((t) => hay.includes(t))) return null
      const score = terms.reduce((s, t) => s + (title.includes(t) ? 3 : 0) + (item.tags.some((g) => g.includes(t)) ? 2 : 1), 0)
      return { item, score }
    })
    .filter(Boolean)

  if (sort === 'newest') results.sort((a, b) => b.item.sortDate - a.item.sortDate)
  else if (sort === 'az') results.sort((a, b) => a.item.title.localeCompare(b.item.title))
  else results.sort((a, b) => b.score - a.score)
  return results.map((r) => r.item)
}
