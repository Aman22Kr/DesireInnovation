import { Link } from 'react-router-dom'
import { CONFIG } from '../config'
import { services } from '../data'
import { Logo } from './Header'
import { Container } from './ui'

export default function Footer() {
  const col = 'mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent'
  const link = 'link-underline block w-fit py-1 text-sm'
  return (
    <footer className="bg-ink text-paper">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="text-paper" />
          <p className="mt-4 max-w-xs text-sm opacity-75">{CONFIG.tagline}. This is a demo website: all projects, clients and reviews are sample content.</p>
        </div>
        <div>
          <h4 className={col}>Services</h4>
          {services.slice(0, 5).map((s) => <Link key={s.slug} to={`/services/${s.slug}`} className={link}>{s.title}</Link>)}
        </div>
        <div>
          <h4 className={col}>Studio</h4>
          <Link to="/about" className={link}>About</Link>
          <Link to="/portfolio" className={link}>Work</Link>
          <Link to="/blog" className={link}>Journal</Link>
          <Link to="/faq" className={link}>FAQ</Link>
          <Link to="/settings" className={link}>Settings and data</Link>
        </div>
        <div>
          <h4 className={col}>Say hello</h4>
          <p className="text-sm opacity-75">{CONFIG.email}</p>
          <p className="mt-1 text-sm opacity-75">{CONFIG.location}</p>
          <Link to="/contact" className="mt-4 inline-block border-2 border-paper px-5 py-2 text-sm font-semibold hover:bg-paper hover:text-ink">Start a project</Link>
        </div>
      </Container>
      <div className="border-t border-paper/20">
        <Container className="flex flex-col justify-between gap-2 py-5 text-xs opacity-70 sm:flex-row">
          <span>© {new Date().getFullYear()} {CONFIG.brandName}. Demo site, not a real business.</span>
          <span>Saved items live in your browser only (localStorage).</span>
        </Container>
      </div>
    </footer>
  )
}
