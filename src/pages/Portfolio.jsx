import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { catalog } from '../data'
import { usePageTitle } from '../hooks/usePageTitle'
import { Container, EmptyState, ItemCard, PageHero } from '../components/ui'

const items = catalog.filter((c) => c.type === 'project')
const cats = ['All', ...new Set(items.map((i) => i.category))]

export function FilterBar({ cats, cat, onCat, sort, onSort, sortOptions }) {
  return (
    <div className="mb-10 flex flex-col gap-4 border-b-2 border-ink pb-6 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {cats.map((c) => (
          <button key={c} onClick={() => onCat(c)} aria-pressed={cat === c} className={`border-2 border-ink px-4 py-2 text-sm font-semibold transition-colors ${cat === c ? 'bg-ink text-paper' : 'hover:bg-sand'}`}>{c}</button>
        ))}
      </div>
      <label className="flex items-center gap-2 text-sm font-semibold">
        Sort
        <select value={sort} onChange={(e) => onSort(e.target.value)} className="border-2 border-ink bg-paper px-3 py-2">
          {sortOptions.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </label>
    </div>
  )
}

export default function Portfolio() {
  usePageTitle('Work')
  const [params, setParams] = useSearchParams()
  const cat = params.get('category') || 'All'
  const sort = params.get('sort') || 'newest'
  const shown = useMemo(() => {
    let list = cat === 'All' ? items : items.filter((i) => i.category === cat)
    list = [...list].sort((a, b) => (sort === 'az' ? a.title.localeCompare(b.title) : b.sortDate - a.sortDate))
    return list
  }, [cat, sort])
  const set = (k, v) => setParams((p) => { const n = new URLSearchParams(p); v === 'All' || v === 'newest' ? n.delete(k) : n.set(k, v); return n }, { replace: true })

  return (
    <>
      <PageHero eyebrow="Work" title="Projects we are proud of.">All clients and results shown are fictional sample content.</PageHero>
      <section className="py-12 sm:py-16">
        <Container>
          <FilterBar cats={cats} cat={cat} onCat={(v) => set('category', v)} sort={sort} onSort={(v) => set('sort', v)} sortOptions={[['newest', 'Newest'], ['az', 'A to Z']]} />
          {shown.length === 0 ? <EmptyState title="No projects in this category">Pick another filter.</EmptyState> : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{shown.map((p, i) => <ItemCard key={p.id} item={p} index={i} />)}</div>
          )}
        </Container>
      </section>
    </>
  )
}
