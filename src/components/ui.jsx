import { Link } from 'react-router-dom'
import { ArrowUpRight, Heart } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { typeLabel } from '../data'
import Reveal from './Reveal'

export function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
}

export function Button({ to, onClick, children, variant = 'solid', className = '', type = 'button', ...rest }) {
  const base = 'inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold border-2 border-ink transition-colors'
  const styles = variant === 'solid' ? 'bg-ink text-paper hover:bg-accent hover:border-accent' : 'bg-transparent text-ink hover:bg-ink hover:text-paper'
  const cls = `${base} ${styles} ${className}`
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  return <button type={type} onClick={onClick} className={cls} {...rest}>{children}</button>
}

export function SectionHeading({ eyebrow, title, children, className = '' }) {
  return (
    <Reveal className={`mb-10 max-w-3xl ${className}`}>
      {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
      <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-lg text-muted">{children}</p>}
    </Reveal>
  )
}

export function PageHero({ eyebrow, title, children }) {
  return (
    <section className="border-b border-line bg-sand">
      <Container className="py-14 sm:py-20 lg:py-24">
        <Reveal>
          {eyebrow && <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">{title}</h1>
          {children && <p className="mt-6 max-w-2xl text-lg text-muted">{children}</p>}
        </Reveal>
      </Container>
    </section>
  )
}

export function FavouriteButton({ id, className = '' }) {
  const { favourites, toggleFavourite } = useApp()
  const on = favourites.includes(id)
  return (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavourite(id) }}
      aria-pressed={on}
      aria-label={on ? 'Remove from saved' : 'Save for later'}
      className={`grid h-10 w-10 place-items-center border-2 border-ink bg-paper text-ink transition-colors hover:bg-accent hover:text-paper ${className}`}
    >
      <Heart size={18} fill={on ? 'currentColor' : 'none'} />
    </button>
  )
}

// Card used for services, projects and articles
export function ItemCard({ item, index = 0, aspect = 'aspect-[4/3]' }) {
  return (
    <Reveal index={index} className="group relative">
      <Link to={item.path} className="hover-lift block border-2 border-ink bg-paper">
        <div className={`img-zoom relative overflow-hidden border-b-2 border-ink ${aspect}`}>
          <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="p-5">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted">
            <span>{typeLabel[item.type]} · {item.category}</span>
            <ArrowUpRight size={16} className="text-accent" />
          </div>
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted">{item.summary}</p>
        </div>
      </Link>
      <FavouriteButton id={item.id} className="absolute right-3 top-3" />
    </Reveal>
  )
}

export function EmptyState({ title, children, action }) {
  return (
    <div className="border-2 border-dashed border-line p-10 text-center">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-muted">{children}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

// Blank square where a video or YouTube thumbnail would go
export function VideoPlaceholder({ label = 'Video placeholder', className = '' }) {
  return <div role="img" aria-label={label} className={`aspect-square w-full border-2 border-ink bg-sand ${className}`} />
}
