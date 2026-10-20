import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'
import { useReducedMotion } from 'framer-motion'
import { CONFIG } from '../config'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getMotion, isValidMotion } from '../utils/motion'
import { clearStore } from '../utils/storage'

const AppContext = createContext(null)
const isArray = Array.isArray
const isString = (v) => typeof v === 'string'

export function AppProvider({ children }) {
  const prefersDark = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useLocalStorage('theme', prefersDark ? 'dark' : 'light', (v) => v === 'light' || v === 'dark')
  const [motionSettings, setMotionSettings] = useLocalStorage('motion', CONFIG.defaultMotion, isValidMotion)
  const [favourites, setFavourites] = useLocalStorage('favourites', [], isArray)
  const [basket, setBasket] = useLocalStorage('basket', [], isArray)
  const [recent, setRecent] = useLocalStorage('recent', [], isArray)
  const [searchHistory, setSearchHistory] = useLocalStorage('searchHistory', [], isArray)
  const [contactDraft, setContactDraft] = useLocalStorage('contactDraft', { name: '', email: '', message: '' }, (v) => v && isString(v.name) && isString(v.email) && isString(v.message))
  const [submissions, setSubmissions] = useLocalStorage('demoSubmissions', [], isArray)

  const reduced = useReducedMotion()
  const motion = useMemo(() => getMotion(motionSettings, reduced), [motionSettings, reduced])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.dataset.motion = motion.enabled ? 'on' : 'off'
    document.documentElement.style.setProperty('--dur', motion.css)
  }, [theme, motion])

  const toggleFavourite = useCallback((id) => setFavourites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [id, ...f])), [setFavourites])
  const toggleBasket = useCallback((slug) => setBasket((b) => (b.includes(slug) ? b.filter((x) => x !== slug) : [...b, slug])), [setBasket])
  const addRecent = useCallback((id) => setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 8)), [setRecent])
  const addSearch = useCallback((q) => {
    const term = q.trim()
    if (term.length < 2) return
    setSearchHistory((h) => [term, ...h.filter((x) => x.toLowerCase() !== term.toLowerCase())].slice(0, 6))
  }, [setSearchHistory])
  const addSubmission = useCallback((entry) => setSubmissions((s) => [{ ...entry, savedAt: new Date().toISOString() }, ...s].slice(0, 20)), [setSubmissions])

  const resetAll = useCallback(() => {
    clearStore()
    setFavourites([]); setBasket([]); setRecent([]); setSearchHistory([]); setSubmissions([])
    setContactDraft({ name: '', email: '', message: '' })
    setMotionSettings(CONFIG.defaultMotion)
  }, [setFavourites, setBasket, setRecent, setSearchHistory, setSubmissions, setContactDraft, setMotionSettings])

  const value = {
    theme, setTheme, motionSettings, setMotionSettings, motion,
    favourites, toggleFavourite, basket, toggleBasket, setBasket,
    recent, addRecent, searchHistory, addSearch, setSearchHistory,
    contactDraft, setContactDraft, submissions, addSubmission, resetAll,
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
