import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { catalog } from '../data'
import { usePageTitle } from '../hooks/usePageTitle'
import { Container, EmptyState, ItemCard, PageHero } from '../components/ui'
import { FilterBar } from './Portfolio'

const items = catalog.filter((c) => c.type === 'service')
const cats = ['All', ...new Set(items.map((i) => i.category))]

export default function Services() {
  usePageTitle('Services')
  const [params, setParams] = useSearchParams()
  const cat = params.get('category') || 'All'
  const sort = params.get('sort') || 'default'
  const shown = useMemo(() => {
    let list = cat === 'All' ? items : items.filter((i) => i.category === cat)
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [cat, sort])
  const set = (k, v) => setParams((p) => { const n = new URLSearchParams(p); v === 'All' || v === 'default' ? n.delete(k) : n.set(k, v); return n }, { replace: true })

  return (
    <>
      <PageHero eyebrow="Services" title="Design, build and launch with one team.">Each service can be booked alone or combined. Prices are sample figures for the demo.</PageHero>
      <section className="py-12 sm:py-16">
        <Container>
          <FilterBar cats={cats} cat={cat} onCat={(v) => set('category', v)} sort={sort} onSort={(v) => set('sort', v)} sortOptions={[['default', 'Featured'], ['price-asc', 'Price: low to high'], ['price-desc', 'Price: high to low']]} />
          {shown.length === 0 ? <EmptyState title="No services here yet">Try another category.</EmptyState> : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{shown.map((s, i) => <ItemCard key={s.id} item={s} index={i} />)}</div>
          )}
        </Container>
      </section>
    </>
  )
}
