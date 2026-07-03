import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'
import { HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2'
import { useTheme } from '../context/ThemeContext.jsx'
import { navLinks, profile } from '../data/portfolio.js'

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-black/5' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 py-4">
        <a href="#home" className="font-display text-lg font-extrabold tracking-tight">
          <span className="gradient-text">{profile.firstName}</span>
          <span className="text-[rgb(var(--text-soft))]">.dev</span>
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === l.href
                    ? 'text-[rgb(var(--text))]'
                    : 'text-[rgb(var(--text-soft))] hover:text-[rgb(var(--text))]'
                }`}
              >
                {active === l.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-brand-400/15 border border-brand-400/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-10 w-10 place-items-center rounded-full glass-soft transition hover:-translate-y-0.5 hover:border-brand-400/60"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-lg text-[rgb(var(--text))]"
              >
                {theme === 'dark' ? <HiOutlineSun /> : <HiOutlineMoon />}
              </motion.span>
            </AnimatePresence>
          </button>

          <a href="#contact" className="hidden sm:inline-flex btn-primary !px-5 !py-2.5">
            Hire Me
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full glass-soft text-xl text-[rgb(var(--text))]"
          >
            {open ? <HiOutlineXMark /> : <HiOutlineBars3 />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden glass border-t border-[rgb(var(--border))]"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                      active === l.href
                        ? 'bg-brand-400/15 text-[rgb(var(--text))]'
                        : 'text-[rgb(var(--text-soft))] hover:bg-[rgb(var(--bg-soft))]'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
