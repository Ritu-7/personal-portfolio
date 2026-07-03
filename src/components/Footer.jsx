import { motion } from 'framer-motion'
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { HiArrowUp } from 'react-icons/hi2'
import { navLinks, profile } from '../data/portfolio.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative z-10 border-t border-[rgb(var(--border))]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <a href="#home" className="font-display text-xl font-extrabold">
              <span className="gradient-text">{profile.firstName}</span>
              <span className="text-[rgb(var(--text-soft))]">.dev</span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-[rgb(var(--text-soft))] text-pretty">
              {profile.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[rgb(var(--text))]">Quick Links</h4>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="link-underline text-sm text-[rgb(var(--text-soft))] hover:text-brand-400 transition"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[rgb(var(--text))]">Connect</h4>
            <p className="mt-4 text-sm text-[rgb(var(--text-soft))]">{profile.email}</p>
            <p className="text-sm text-[rgb(var(--text-soft))]">{profile.phone}</p>
            <div className="mt-4 flex gap-3">
              {[
                { href: profile.socials.github, icon: <FaGithub />, label: 'GitHub' },
                { href: profile.socials.linkedin, icon: <FaLinkedinIn />, label: 'LinkedIn' },
                { href: profile.socials.whatsapp, icon: <FaWhatsapp />, label: 'WhatsApp' },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  className="grid h-10 w-10 place-items-center rounded-full glass-soft text-[rgb(var(--text-soft))] hover:text-brand-400 hover:shadow-glow transition"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[rgb(var(--border))] pt-6 sm:flex-row">
          <p className="text-xs text-[rgb(var(--text-soft))]">
            © {year} {profile.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-[rgb(var(--text-soft))]">
              Built with React, Tailwind & Framer Motion.
            </p>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Back to top"
              className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-accent-400 text-slate-900 shadow-soft"
            >
              <HiArrowUp />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
