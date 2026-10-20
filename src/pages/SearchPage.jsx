import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { SORTS, searchCatalog } from '../utils/search'
import { usePageTitle } from '../hooks/usePageTitle'
import { Container, EmptyState, ItemCard, PageHero } from '../components/ui'

const TYPES = [['all', 'Everything'], ['service', 'Services'], ['project', 'Projects'], ['post', 'Articles']]

export default function SearchPage() {
  usePageTitle('Search')
  const [params, setParams] = useSearchParams()
  const { searchHistory, addSearch, setSearchHistory } = useApp()
  const q = params.get('q') || ''
  const type = params.get('type') || 'all'
  const sort = params.get('sort') || 'relevance'
  const results = useMemo(() => searchCatalog(q, { type, sort }), [q, type, sort])

  // Record a search only after the visitor pauses typing
  useEffect(() => {
    const t = setTimeout(() => addSearch(q), 800)
    return () => clearTimeout(t)
  }, [q, addSearch])

  const set = (k, v) => setParams((p) => { const n = new URLSearchParams(p); v ? n.set(k, v) : n.delete(k); return n }, { replace: true })

  return (
    <>
      <PageHero eyebrow="Search" title={q ? `Results for “${q}”` : 'Search the site'} />
      <section className="py-12 sm:py-16">
        <Container>
          <label className="mb-6 flex items-center gap-3 border-2 border-ink px-4">
            <Search size={20} aria-hidden />
            <input autoFocus value={q} onChange={(e) => set('q', e.target.value)} placeholder="Try “brand”, “react” or “sprint”" aria-label="Search" className="h-14 flex-1 bg-transparent text-lg outline-none" />
          </label>
          <div className="mb-8 flex flex-col gap-4 border-b-2 border-ink pb-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {TYPES.map(([v, l]) => <button key={v} onClick={() => set('type', v === 'all' ? '' : v)} aria-pressed={type === v} className={`border-2 border-ink px-4 py-2 text-sm font-semibold ${type === v ? 'bg-ink text-paper' : 'hover:bg-sand'}`}>{l}</button>)}
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold">
              Sort
              <select value={sort} onChange={(e) => set('sort', e.target.value === 'relevance' ? '' : e.target.value)} className="border-2 border-ink bg-paper px-3 py-2">
                {Object.entries(SORTS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </label>
          </div>
          {!q && searchHistory.length > 0 && (
            <div className="mb-8">
              <div className="mb-2 flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-wider text-muted">Recent searches</p><button onClick={() => setSearchHistory([])} className="text-sm underline">Clear</button></div>
              <div className="flex flex-wrap gap-2">{searchHistory.map((h) => <button key={h} onClick={() => set('q', h)} className="border border-ink px-3 py-1 text-sm hover:bg-sand">{h}</button>)}</div>
            </div>
          )}
          <p className="mb-6 text-sm text-muted" aria-live="polite">{results.length} {results.length === 1 ? 'result' : 'results'}</p>
          {results.length === 0 ? <EmptyState title="Nothing matched">Check the spelling or try a broader word such as “design” or “web”.</EmptyState> : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{results.map((r, i) => <ItemCard key={r.id} item={r} index={i} />)}</div>
          )}
        </Container>
      </section>
    </>
  )
}
