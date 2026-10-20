import { CONFIG } from '../config'
import { processSteps, team } from '../data'
import { art } from '../utils/placeholder'
import { usePageTitle } from '../hooks/usePageTitle'
import Reveal from '../components/Reveal'
import { Button, Container, PageHero, SectionHeading } from '../components/ui'

const values = [
  ['Clarity over cleverness', 'If it needs explaining, we keep working on it.'],
  ['Small, senior teams', 'Everyone you meet in the pitch is in the room doing the work.'],
  ['Prototype early', 'We would rather be wrong in a week than in a year.'],
  ['Accessible by default', 'Good design works for everyone, on every device.'],
]
const stats = [['120+', 'Sample projects shipped'], ['9', 'Years of practice'], ['14', 'Countries (fictional)'], ['4.9', 'Average sample rating']]

export default function About() {
  usePageTitle('About')
  return (
    <>
      <PageHero eyebrow="About us" title={`${CONFIG.brandName} is a small studio with big appetite for good ideas.`}>
        We are a demo studio of designers, engineers and strategists. The story below is fictional, written to show how an about page can work.
      </PageHero>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <Reveal><img src={art(2, '', 900, 700)} alt="Abstract studio artwork" loading="lazy" className="w-full border-2 border-ink shadow-[10px_10px_0_var(--accent)]" /></Reveal>
          <Reveal index={1} className="space-y-5 text-lg text-muted">
            <h2 className="font-display text-4xl font-semibold text-ink">Our story</h2>
            <p>The studio started as two friends sketching product ideas after work. Within a year, those sketches turned into client projects, then a team.</p>
            <p>We still work the same way: talk to real users, sketch fast, build the smallest thing that can teach us something, and repeat.</p>
            <p>Every project, client and figure on this site is sample content created for the demo.</p>
          </Reveal>
        </Container>
      </section>

      <section className="border-y-2 border-ink bg-ink text-paper">
        <Container className="grid grid-cols-2 gap-px lg:grid-cols-4">
          {stats.map(([n, l], i) => (
            <Reveal key={l} index={i} className="py-10 text-center">
              <p className="font-display text-5xl font-bold text-accent sm:text-6xl">{n}</p>
              <p className="mt-2 text-sm opacity-75">{l}</p>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Principles" title="What we believe" />
          <div className="grid gap-px border-2 border-ink bg-ink sm:grid-cols-2">
            {values.map(([t, d], i) => (
              <Reveal key={t} index={i} className="bg-paper p-8">
                <h3 className="text-2xl font-semibold">{t}</h3>
                <p className="mt-2 text-muted">{d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t-2 border-ink bg-sand py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="The team" title="People behind the work">Sample team members with placeholder portraits.</SectionHeading>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {team.map((p, i) => (
              <Reveal key={p.name} index={i}>
                <img src={p.image} alt="" loading="lazy" className="aspect-square w-full border-2 border-ink object-cover" />
                <h3 className="mt-3 text-xl font-semibold">{p.name}</h3>
                <p className="text-sm text-muted">{p.role}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Process" title="How a project runs" />
          <ol className="grid gap-6 md:grid-cols-4">
            {processSteps.map((s, i) => (
              <Reveal as="li" key={s.title} index={i} className="border-t-4 border-accent pt-4">
                <p className="font-display text-sm text-muted">Step {i + 1}</p>
                <h3 className="text-2xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-12"><Button to="/contact">Work with us</Button></div>
        </Container>
      </section>
    </>
  )
}
