import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion as m } from 'framer-motion'
import { useApp } from '../context/AppContext'
import Header from './Header'
import Footer from './Footer'
import AdStrip from './AdStrip'

export default function Layout() {
  const { pathname } = useLocation()
  const { motion } = useApp()

  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  const page = motion.enabled
    ? { initial: { opacity: 0, y: Math.min(motion.distance, 24) }, animate: { opacity: 1, y: 0 }, transition: { duration: motion.duration * 0.7, ease: motion.ease } }
    : {}

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-accent focus:p-3 focus:text-paper">Skip to content</a>
      <Header />
      <m.main id="main" key={pathname} className="flex-1" {...page}>
        <Outlet />
      </m.main>
      <AdStrip />
      <Footer />
    </div>
  )
}
