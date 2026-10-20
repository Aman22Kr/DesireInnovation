import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check, ShoppingBag } from 'lucide-react'
import { catalog, projects, services } from '../data'
import { useApp } from '../context/AppContext'
import { usePageTitle } from '../hooks/usePageTitle'
import Reveal from '../components/Reveal'
import { Button, Container, FavouriteButton, ItemCard, PageHero } from '../components/ui'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)
  const { basket, toggleBasket, addRecent } = useApp()
  usePageTitle(service?.title)
  useEffect(() => { if (service) addRecent(`service:${service.slug}`) }, [service, addRecent])
  if (!service) return <NotFound what="service" />

  const inBasket = basket.includes(service.slug)
  const related = projects.filter((p) => p.services.includes(service.slug)).map((p) => catalog.find((c) => c.id === `project:${p.slug}`))

  return (
    <>
      <PageHero eyebrow={`Service · ${service.category}`} title={service.title}>{service.summary}</PageHero>
      <section className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <img src={service.image} alt="" className="mb-8 aspect-[16/9] w-full border-2 border-ink object-cover" />
            <h2 className="font-display text-3xl font-semibold">What this involves</h2>
            <p className="mt-4 text-lg text-muted">{service.description}</p>
            <h3 className="mt-10 font-display text-2xl font-semibold">Deliverables</h3>
            <ul className="mt-4 space-y-3">
              {service.deliverables.map((d) => <li key={d} className="flex items-center gap-3"><Check className="text-accent" size={18} /> {d}</li>)}
            </ul>
          </Reveal>
          <Reveal index={1} className="lg:col-span-5">
            <aside className="sticky top-28 border-2 border-ink p-6 shadow-[8px_8px_0_var(--accent)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Sample starting price</p>
              <p className="mt-1 font-display text-5xl font-bold">${service.price.toLocaleString()}</p>
              <p className="mt-1 text-sm text-muted">Typical timeline: {service.duration}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => toggleBasket(service.slug)} variant={inBasket ? 'outline' : 'solid'}><ShoppingBag size={16} /> {inBasket ? 'Remove from basket' : 'Add to project basket'}</Button>
                <FavouriteButton id={`service:${service.slug}`} />
              </div>
              <p className="mt-4 text-xs text-muted">The basket is a planning tool saved in this browser. No payment is taken.</p>
              {inBasket && <Link to="/basket" className="link-underline mt-4 inline-block text-sm font-semibold">View basket →</Link>}
            </aside>
          </Reveal>
        </Container>
      </section>
      {related.length > 0 && (
        <section className="border-t-2 border-ink bg-sand py-14 sm:py-20">
          <Container>
            <h2 className="mb-8 font-display text-3xl font-semibold">Related work</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{related.map((r, i) => <ItemCard key={r.id} item={r} index={i} />)}</div>
          </Container>
        </section>
      )}
    </>
  )
}
