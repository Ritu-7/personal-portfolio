import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { HiOutlineDocumentArrowDown, HiOutlineArrowDown } from 'react-icons/hi2'
import TypingText from '../components/TypingText.jsx'
import { Magnetic, Counter } from '../components/Motion.jsx'
import { supabase } from '../context/SupabaseContext.jsx'
import { profile } from '../data/portfolio.js'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const stats = [
  { value: 15, suffix: '+', label: 'Projects' },
  { value: 3, suffix: '+', label: 'Years Coding' },
  { value: 20, suffix: '+', label: 'Technologies' },
]

function Particles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 18 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 4,
        dur: Math.random() * 6 + 6,
      })),
    [],
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-brand-400/30"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen scroll-mt-20 pt-28 pb-16">
      <Particles />
      {/* Floating geometric shapes */}
      <motion.div
        className="pointer-events-none absolute top-32 right-[8%] h-24 w-24 rounded-3xl border border-brand-400/20"
        animate={{ rotate: [0, 180, 360], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-40 left-[6%] h-16 w-16 rounded-full border border-accent-400/20"
        animate={{ y: [0, 25, 0], x: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/2 left-[40%] h-3 w-3 rounded-full bg-accent-400/40"
        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span variants={item} className="chip mb-5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to opportunities
          </motion.span>

          <motion.h1 variants={item} className="font-display font-extrabold leading-[1.05] tracking-tight text-balance">
            Hi, I'm <span className="gradient-text animate-gradient-x">{profile.name}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-4 font-mono text-lg text-[rgb(var(--text-soft))] sm:text-xl">
            <span className="text-[rgb(var(--text))]">&gt; </span>
            <TypingText words={profile.roles} className="text-brand-400" />
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl text-base text-[rgb(var(--text-soft))] text-pretty sm:text-lg">
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic strength={0.3}>
              <a href="#projects" className="btn-primary">
                View Projects <HiOutlineArrowDown />
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href={profile.resumeUrl}
                download
                onClick={() => supabase.from('analytics').insert({ event_type: 'resume_download', path: '/resume' })}
                className="btn-ghost"
              >
                <HiOutlineDocumentArrowDown /> Download Resume
              </a>
            </Magnetic>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-3">
            <span className="text-sm text-[rgb(var(--text-soft))]">Find me on</span>
            <div className="h-px w-8 bg-[rgb(var(--border))]" />
            <div className="flex gap-3">
              {[
                { href: profile.socials.github, icon: <FaGithub />, label: 'GitHub' },
                { href: profile.socials.linkedin, icon: <FaLinkedinIn />, label: 'LinkedIn' },
                { href: profile.socials.whatsapp, icon: <FaWhatsapp />, label: 'WhatsApp' },
              ].map((s) => (
                <Magnetic key={s.label} strength={0.5}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full glass-soft text-lg text-[rgb(var(--text-soft))] transition hover:text-brand-400 hover:-translate-y-1 hover:border-brand-400/60 hover:shadow-glow active:scale-90"
                  >
                    {s.icon}
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-extrabold gradient-text">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs text-[rgb(var(--text-soft))]">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm"
        >
          <motion.div
            className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-brand-400/30 via-accent-400/20 to-transparent blur-2xl"
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="relative aspect-square overflow-hidden rounded-[2rem] glass p-2 shadow-glow"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src={profile.image}
              alt={profile.name}
              loading="eager"
              className="h-full w-full rounded-[1.6rem] object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800'
              }}
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl glass px-4 py-3">
              <div>
                <p className="text-xs text-[rgb(var(--text-soft))]">Based in</p>
                <p className="text-sm font-semibold">{profile.location}</p>
              </div>
              <div className="flex -space-x-2">
                {['React', 'Node', 'UI'].map((t) => (
                  <span key={t} className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-accent-400 text-[10px] font-bold text-slate-900 ring-2 ring-[rgb(var(--surface))]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[rgb(var(--text-soft))]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-[rgb(var(--border))]">
          <motion.span
            className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-400"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  )
}
