import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { catalog } from '../data'
import { usePageTitle } from '../hooks/usePageTitle'
import { Container, EmptyState, ItemCard, PageHero } from '../components/ui'

const items = catalog.filter((c) => c.type === 'post')
const cats = ['All', ...new Set(items.map((i) => i.category))]

export default function Blog() {
  usePageTitle('Journal')
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const shown = useMemo(() => items.filter((i) => (cat === 'All' || i.category === cat) && `${i.title} ${i.summary} ${i.tags.join(' ')}`.toLowerCase().includes(q.toLowerCase())), [cat, q])
  return (
    <>
      <PageHero eyebrow="Journal" title="Notes on design, strategy and building.">Short essays from the studio. All articles are sample content.</PageHero>
      <section className="py-12 sm:py-16">
        <Container>
          <div className="mb-10 flex flex-col gap-4 border-b-2 border-ink pb-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`border-2 border-ink px-4 py-2 text-sm font-semibold ${cat === c ? 'bg-ink text-paper' : 'hover:bg-sand'}`}>{c}</button>)}
            </div>
            <label className="flex items-center gap-2 border-2 border-ink px-3">
              <Search size={16} aria-hidden />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter articles" aria-label="Filter articles" className="h-10 bg-transparent outline-none" />
            </label>
          </div>
          {shown.length === 0 ? <EmptyState title="No articles found">Try a different word or category.</EmptyState> : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{shown.map((p, i) => <ItemCard key={p.id} item={p} index={i} aspect="aspect-[16/9]" />)}</div>
          )}
        </Container>
      </section>
    </>
  )
}
