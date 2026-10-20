import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, Search } from 'lucide-react'
import { faqs } from '../data'
import { usePageTitle } from '../hooks/usePageTitle'
import { Container, EmptyState, PageHero } from '../components/ui'

export default function FAQ() {
  usePageTitle('FAQ')
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(0)
  const shown = useMemo(() => faqs.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q.toLowerCase())), [q])
  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions, answered.">Including honest notes about how this demo site handles your data.</PageHero>
      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <label className="mb-8 flex items-center gap-3 border-2 border-ink px-4">
            <Search size={18} aria-hidden />
            <input value={q} onChange={(e) => { setQ(e.target.value); setOpen(null) }} placeholder="Search questions" aria-label="Search questions" className="h-12 flex-1 bg-transparent outline-none" />
          </label>
          {shown.length === 0 ? <EmptyState title="No matching questions" action={<Link to="/contact" className="link-underline font-semibold">Ask us directly →</Link>}>Try fewer words.</EmptyState> : (
            <ul className="border-t-2 border-ink">
              {shown.map((f, i) => {
                const isOpen = open === i || (q && shown.length === 1)
                return (
                  <li key={f.q} className="border-b-2 border-ink">
                    <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-xl font-semibold hover:text-accent">
                      {f.q} {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </button>
                    {isOpen && <p className="pb-6 text-lg text-muted">{f.a}</p>}
                  </li>
                )
              })}
            </ul>
          )}
        </Container>
      </section>
    </>
  )
}
