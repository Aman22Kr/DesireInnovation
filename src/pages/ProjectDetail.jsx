import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { art } from '../utils/placeholder'
import { catalog, projects, services } from '../data'
import { useApp } from '../context/AppContext'
import { usePageTitle } from '../hooks/usePageTitle'
import Reveal from '../components/Reveal'
import { Container, FavouriteButton, ItemCard, PageHero, VideoPlaceholder } from '../components/ui'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  const { addRecent } = useApp()
  usePageTitle(project?.title)
  useEffect(() => { if (project) addRecent(`project:${project.slug}`) }, [project, addRecent])
  if (!project) return <NotFound what="project" />

  const next = projects[(index + 1) % projects.length]
  const more = catalog.filter((c) => c.type === 'project' && c.slug !== project.slug).slice(0, 3)

  return (
    <>
      <PageHero eyebrow={`${project.category} · ${project.year}`} title={project.title}>{project.summary}</PageHero>
      <section className="py-14 sm:py-20">
        <Container>
          <div className="mb-10 flex items-center justify-between">
            <Link to="/portfolio" className="link-underline inline-flex items-center gap-2 font-semibold"><ArrowLeft size={16} /> All work</Link>
            <FavouriteButton id={`project:${project.slug}`} />
          </div>
          <Reveal><img src={project.image} alt="" className="aspect-[16/8] w-full border-2 border-ink object-cover" /></Reveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <Reveal className="space-y-5 text-lg text-muted lg:col-span-7">
              <h2 className="font-display text-3xl font-semibold text-ink">The challenge and the outcome</h2>
              {project.body.map((para, i) => <p key={i}>{para}</p>)}
              <p className="text-sm">Client: {project.client}. Figures are sample data.</p>
            </Reveal>
            <Reveal index={1} className="lg:col-span-5">
              <dl className="border-2 border-ink">
                {project.metrics.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between border-b-2 border-ink p-5 last:border-b-0">
                    <dt className="text-sm font-semibold uppercase tracking-wider text-muted">{k}</dt>
                    <dd className="font-display text-3xl font-bold text-accent">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted">Services used</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.services.map((s) => <Link key={s} to={`/services/${s}`} className="border-2 border-ink px-3 py-1 text-sm font-semibold hover:bg-ink hover:text-paper">{services.find((x) => x.slug === s)?.title}</Link>)}
              </div>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[3, 4, 5].map((n, i) => <Reveal key={n} index={i}><img src={art(n + index, '', 600, 600)} alt="" loading="lazy" className="aspect-square w-full border-2 border-ink object-cover" /></Reveal>)}
          </div>
          <div className="mt-14 max-w-sm"><VideoPlaceholder label="Project video placeholder" /></div>
        </Container>
      </section>
      <section className="border-t-2 border-ink bg-sand py-14 sm:py-20">
        <Container>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-3xl font-semibold">More work</h2>
            <Link to={`/portfolio/${next.slug}`} className="link-underline font-semibold">Next: {next.title} →</Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{more.map((m, i) => <ItemCard key={m.id} item={m} index={i} />)}</div>
        </Container>
      </section>
    </>
  )
}
