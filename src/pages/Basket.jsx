import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Info, Trash2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { services } from '../data'
import { usePageTitle } from '../hooks/usePageTitle'
import { Button, Container, EmptyState, PageHero } from '../components/ui'

export default function Basket() {
  usePageTitle('Project basket')
  const { basket, toggleBasket, setBasket, addSubmission } = useApp()
  const [done, setDone] = useState(false)
  const items = basket.map((slug) => services.find((s) => s.slug === slug)).filter(Boolean)
  const total = items.reduce((sum, s) => sum + s.price, 0)

  const prepare = () => {
    addSubmission({ name: 'Basket estimate', email: '', message: `Services: ${items.map((i) => i.title).join(', ')}. Sample total $${total}.` })
    setBasket([])
    setDone(true)
  }

  return (
    <>
      <PageHero eyebrow="Project basket" title="Plan your project.">A planning tool only. No payment is taken and nothing is booked.</PageHero>
      <section className="py-12 sm:py-16">
        <Container className="max-w-4xl">
          {done && <div role="status" className="mb-8 border-2 border-moss bg-sand p-4">Estimate saved in this browser. <strong>It was not sent to anyone</strong> and no booking was made. See it in <Link to="/settings" className="underline">Settings</Link>.</div>}
          {items.length === 0 ? (
            <EmptyState title="Your basket is empty" action={<Button to="/services">Browse services</Button>}>Add services to see a sample estimate.</EmptyState>
          ) : (
            <>
              <ul className="border-t-2 border-ink">
                {items.map((s) => (
                  <li key={s.slug} className="flex items-center gap-4 border-b-2 border-ink py-4">
                    <img src={s.image} alt="" className="h-16 w-20 border-2 border-ink object-cover" />
                    <div className="flex-1">
                      <Link to={`/services/${s.slug}`} className="link-underline font-display text-xl font-semibold">{s.title}</Link>
                      <p className="text-sm text-muted">{s.duration}</p>
                    </div>
                    <p className="font-display text-xl font-bold">${s.price.toLocaleString()}</p>
                    <button onClick={() => toggleBasket(s.slug)} aria-label={`Remove ${s.title}`} className="p-2 hover:text-accent"><Trash2 size={18} /></button>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm uppercase tracking-wider text-muted">Sample estimate</p>
                  <p className="font-display text-5xl font-bold">${total.toLocaleString()}</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setBasket([])}>Clear</Button>
                  <Button onClick={prepare}>Save demo estimate</Button>
                </div>
              </div>
              <p className="mt-6 flex gap-2 text-sm text-muted"><Info size={16} className="mt-0.5 shrink-0" /> Prices are fictional. Saving stores the estimate in this browser only.</p>
            </>
          )}
        </Container>
      </section>
    </>
  )
}
