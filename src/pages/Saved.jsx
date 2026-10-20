import { useApp } from '../context/AppContext'
import { findItem } from '../data'
import { usePageTitle } from '../hooks/usePageTitle'
import { Button, Container, EmptyState, ItemCard, PageHero } from '../components/ui'

export default function Saved() {
  usePageTitle('Saved')
  const { favourites, recent } = useApp()
  const saved = favourites.map(findItem).filter(Boolean)
  const viewed = recent.map(findItem).filter(Boolean)
  return (
    <>
      <PageHero eyebrow="Saved" title="Your shortlist.">Saved items and recently viewed pages are stored in this browser only. They do not sync to other devices.</PageHero>
      <section className="py-12 sm:py-16">
        <Container>
          {saved.length === 0 ? (
            <EmptyState title="Nothing saved yet" action={<Button to="/portfolio">Browse work</Button>}>Tap the heart on any card to keep it here.</EmptyState>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{saved.map((s, i) => <ItemCard key={s.id} item={s} index={i} />)}</div>
          )}
          {viewed.length > 0 && (
            <div className="mt-20">
              <h2 className="mb-8 font-display text-3xl font-semibold">Recently viewed</h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{viewed.slice(0, 4).map((s, i) => <ItemCard key={s.id} item={s} index={i} aspect="aspect-[16/10]" />)}</div>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
