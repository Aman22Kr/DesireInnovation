import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Clock, Search, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { searchCatalog } from '../utils/search'
import { typeLabel } from '../data'

export default function SearchOverlay({ open, onClose }) {
  const { searchHistory, addSearch } = useApp()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const results = useMemo(() => (query.trim() ? searchCatalog(query).slice(0, 6) : []), [query])

  useEffect(() => {
    if (!open) return
    setQuery('')
    const t = setTimeout(() => inputRef.current?.focus(), 30)
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => { clearTimeout(t); window.removeEventListener('keydown', onKey) }
  }, [open, onClose])

  if (!open) return null
  const submit = (e, term = query) => {
    e?.preventDefault()
    if (!term.trim()) return
    addSearch(term)
    onClose()
    navigate(`/search?q=${encodeURIComponent(term.trim())}`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink/60 p-4 pt-20" onMouseDown={(e) => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true" aria-label="Search">
      <div className="w-full max-w-2xl border-2 border-ink bg-paper shadow-[8px_8px_0_var(--accent)]">
        <form onSubmit={submit} className="flex items-center gap-3 border-b-2 border-ink px-4">
          <Search size={20} aria-hidden />
          <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search services, projects, articles" className="h-14 flex-1 bg-transparent text-lg outline-none placeholder:text-muted" aria-label="Search the site" />
          <button type="button" onClick={onClose} aria-label="Close search" className="p-2 hover:text-accent"><X size={20} /></button>
        </form>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim() === '' && searchHistory.length > 0 && (
            <div className="p-2">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Recent searches</p>
              {searchHistory.map((h) => (
                <button key={h} onClick={() => submit(null, h)} className="flex w-full items-center gap-3 px-2 py-2 text-left hover:bg-sand">
                  <Clock size={16} className="text-muted" /> {h}
                </button>
              ))}
            </div>
          )}
          {query.trim() === '' && searchHistory.length === 0 && <p className="p-4 text-muted">Start typing to search. Your recent searches are kept in this browser.</p>}
          {query.trim() !== '' && results.length === 0 && <p className="p-4 text-muted">No matches for “{query}”. Try “brand”, “web” or “sprint”.</p>}
          {results.map((r) => (
            <Link key={r.id} to={r.path} onClick={() => { addSearch(query); onClose() }} className="flex items-center gap-4 px-2 py-3 hover:bg-sand">
              <img src={r.image} alt="" className="h-12 w-16 border border-ink object-cover" />
              <span className="flex-1">
                <span className="block font-semibold">{r.title}</span>
                <span className="text-xs uppercase tracking-wider text-muted">{typeLabel[r.type]} · {r.category}</span>
              </span>
            </Link>
          ))}
          {results.length > 0 && (
            <button onClick={submit} className="mt-1 w-full p-3 text-left text-sm font-semibold text-accent hover:bg-sand">See all results for “{query}” →</button>
          )}
        </div>
      </div>
    </div>
  )
}
