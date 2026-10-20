import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Heart, Menu, Moon, Search, Settings as Cog, ShoppingBag, Sun, X } from 'lucide-react'
import { CONFIG } from '../config'
import { services } from '../data'
import { useApp } from '../context/AppContext'
import SearchOverlay from './SearchOverlay'
import { Container } from './ui'

const links = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services', dropdown: true },
  { to: '/portfolio', label: 'Work' },
  { to: '/blog', label: 'Journal' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export function Logo({ className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2 font-display text-2xl font-bold ${className}`} aria-label={`${CONFIG.brandName} home`}>
      <span className="grid h-8 w-8 place-items-center bg-accent text-lg text-paper">D</span>
      {CONFIG.brandName}
    </Link>
  )
}

export default function Header() {
  const { theme, setTheme, favourites, basket } = useApp()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const dropRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => { setMobileOpen(false); setDropOpen(false) }, [pathname])
  useEffect(() => {
    const onClick = (e) => dropRef.current && !dropRef.current.contains(e.target) && setDropOpen(false)
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])
  useEffect(() => {
    const onKey = (e) => { if (e.key === '/' && !/input|textarea/i.test(e.target.tagName)) { e.preventDefault(); setSearchOpen(true) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const navCls = ({ isActive }) => `link-underline py-1 text-sm font-semibold ${isActive ? 'text-accent' : ''}`
  const iconBtn = 'relative h-10 w-10 place-items-center hover:text-accent'
  const badge = (n) => n > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center bg-accent px-1 text-[10px] font-bold text-paper">{n}</span>

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {links.map((l) =>
            l.dropdown ? (
              <div key={l.to} ref={dropRef} className="relative">
                <button onClick={() => setDropOpen((o) => !o)} aria-expanded={dropOpen} className="flex items-center gap-1 py-1 text-sm font-semibold hover:text-accent">
                  {l.label} <ChevronDown size={14} className={`transition-transform ${dropOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropOpen && (
                  <div className="absolute left-0 top-full mt-3 w-72 border-2 border-ink bg-paper p-2 shadow-[6px_6px_0_var(--ink)]">
                    <Link to="/services" className="block px-3 py-2 text-sm font-semibold text-accent hover:bg-sand">All services →</Link>
                    {services.map((s) => <Link key={s.slug} to={`/services/${s.slug}`} className="block px-3 py-2 text-sm hover:bg-sand">{s.title}</Link>)}
                  </div>
                )}
              </div>
            ) : (
              <NavLink key={l.to} to={l.to} className={navCls}>{l.label}</NavLink>
            ),
          )}
        </nav>
        <div className="flex items-center">
          <button onClick={() => setSearchOpen(true)} className={`${iconBtn} grid`} aria-label="Open search (press /)"><Search size={20} /></button>
          <Link to="/saved" className={`${iconBtn} hidden xs:grid`} aria-label={`Saved items (${favourites.length})`}><Heart size={20} />{badge(favourites.length)}</Link>
          <Link to="/basket" className={`${iconBtn} grid`} aria-label={`Project basket (${basket.length})`}><ShoppingBag size={20} />{badge(basket.length)}</Link>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`${iconBtn} hidden sm:grid`} aria-label="Toggle dark mode">{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}</button>
          <Link to="/settings" className={`${iconBtn} hidden sm:grid`} aria-label="Settings"><Cog size={20} /></Link>
          <button onClick={() => setMobileOpen((o) => !o)} className={`${iconBtn} grid lg:hidden`} aria-label="Toggle menu" aria-expanded={mobileOpen}>{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </Container>

      {mobileOpen && (
        <nav className="border-t-2 border-ink bg-paper lg:hidden" aria-label="Mobile">
          <Container className="flex flex-col py-4">
            {[...links, { to: '/saved', label: 'Saved' }, { to: '/settings', label: 'Settings' }].map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => `border-b border-line py-3 font-display text-2xl ${isActive ? 'text-accent' : ''}`}>{l.label}</NavLink>
            ))}
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="flex items-center gap-2 py-3 text-left font-semibold">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />} {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
          </Container>
        </nav>
      )}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
