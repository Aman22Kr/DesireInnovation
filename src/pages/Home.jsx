import { Link } from 'react-router-dom'
import { ArrowRight, Quote } from 'lucide-react'
import { CONFIG } from '../config'
import { catalog, processSteps, projects, services, testimonials } from '../data'
import { art } from '../utils/placeholder'
import { usePageTitle } from '../hooks/usePageTitle'
import Reveal from '../components/Reveal'
import { Button, Container, ItemCard, SectionHeading, VideoPlaceholder } from '../components/ui'

const MARQUEE = ['Product design', 'Brand identity', 'Web development', 'Innovation sprints', 'Motion', 'Design systems']

export default function Home() {
  usePageTitle('')
  const featured = catalog.filter((c) => c.type === 'project').slice(0, 4)
  const latest = catalog.filter((c) => c.type === 'post').slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden border-b-2 border-ink">
        <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:py-28">
          <Reveal className="lg:col-span-7">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{CONFIG.tagline}</p>
            <h1 className="text-5xl font-bold leading-[0.98] sm:text-7xl xl:text-8xl">
              We design what<br />people <em className="text-accent not-italic underline decoration-4 underline-offset-8">desire</em> next.
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted">{CONFIG.brandName} blends strategy, design and engineering to turn rough ideas into products and brands that people choose.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/portfolio">See our work <ArrowRight size={16} /></Button>
              <Button to="/contact" variant="outline">Start a project</Button>
            </div>
          </Reveal>
          <Reveal index={2} className="relative lg:col-span-5">
            <div className="border-2 border-ink shadow-[10px_10px_0_var(--accent)]">
              <img src={art(0, '', 800, 900)} alt="Abstract studio artwork" className="aspect-[8/9] w-full object-cover" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-b-2 border-ink bg-ink py-4 text-paper" aria-hidden>
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap font-display text-2xl">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => <span key={i} className="flex items-center gap-12">{t} <span className="text-accent">✦</span></span>)}
        </div>
      </div>

      {/* Services list */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="What we do" title="Six ways we help teams make better things.">Pick one, or combine them into a programme that fits your stage.</SectionHeading>
          <ul className="border-t-2 border-ink">
            {services.map((s, i) => (
              <Reveal as="li" index={i} key={s.slug} className="border-b-2 border-ink">
                <Link to={`/services/${s.slug}`} className="group grid items-center gap-2 py-6 transition-colors hover:bg-sand sm:grid-cols-12 sm:px-4">
                  <span className="font-display text-xl text-accent sm:col-span-1">0{i + 1}</span>
                  <h3 className="text-2xl font-semibold sm:col-span-4 sm:text-3xl">{s.title}</h3>
                  <p className="text-muted sm:col-span-6">{s.summary}</p>
                  <ArrowRight className="transition-transform group-hover:translate-x-2 sm:col-span-1 sm:justify-self-end" />
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Selected work, asymmetric grid */}
      <section className="border-y-2 border-ink bg-sand py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Selected work" title="Recent projects" />
            <Link to="/portfolio" className="link-underline mb-10 font-semibold">View all work →</Link>
          </div>
          <div className="grid gap-8 md:grid-cols-12">
            {featured.map((item, i) => (
              <div key={item.id} className={i === 0 ? 'md:col-span-7' : i === 1 ? 'md:col-span-5 md:mt-16' : i === 2 ? 'md:col-span-5' : 'md:col-span-7 md:mt-16'}>
                <ItemCard item={item} index={i} aspect={i % 3 === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Reel */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Studio reel</p>
            <h2 className="text-3xl font-semibold sm:text-5xl">A minute inside the studio.</h2>
            <p className="mt-4 max-w-md text-lg text-muted">Our reel will live here. For now this blank square stands in for the video thumbnail.</p>
          </Reveal>
          <Reveal index={1}><VideoPlaceholder label="Studio reel placeholder" className="max-w-md md:ml-auto" /></Reveal>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-ink py-20 text-paper sm:py-28">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">How we work</p>
            <h2 className="text-3xl font-semibold sm:text-5xl">Four steps, no surprises.</h2>
          </Reveal>
          <div className="grid gap-px bg-paper/20 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <Reveal key={s.title} index={i} className="bg-ink p-6 sm:p-8">
                <span className="font-display text-5xl text-accent">{i + 1}</span>
                <h3 className="mt-4 text-2xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm opacity-75">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Kind words" title="What clients say">These are sample reviews written for the demo, not real testimonials.</SectionHeading>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={i} index={i} className="border-2 border-ink p-6">
                <Quote className="text-accent" />
                <p className="mt-4 font-display text-xl leading-snug">{t.quote}</p>
                <p className="mt-6 text-sm text-muted">{t.name} · {t.role}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Latest posts */}
      <section className="border-t-2 border-ink bg-sand py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Journal" title="Latest thinking" />
            <Link to="/blog" className="link-underline mb-10 font-semibold">All articles →</Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {latest.map((p, i) => <ItemCard key={p.id} item={p} index={i} aspect="aspect-[16/9]" />)}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-accent py-20 text-paper">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 className="max-w-2xl text-4xl font-bold sm:text-6xl">Have something worth building?</h2>
          <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-paper bg-paper px-8 py-4 font-semibold text-ink hover:bg-transparent hover:text-paper">Tell us about it <ArrowRight size={18} /></Link>
        </Container>
      </section>
    </>
  )
}
