import { motion } from 'framer-motion'
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { HiOutlineDocumentArrowDown, HiOutlineArrowDown } from 'react-icons/hi2'
import TypingText from '../components/TypingText.jsx'
import { supabase } from '../context/SupabaseContext.jsx'
import { profile } from '../data/portfolio.js'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen scroll-mt-20 pt-28 pb-16">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span variants={item} className="chip mb-5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to opportunities
          </motion.span>

          <motion.h1 variants={item} className="font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl text-balance">
            Hi, I'm <span className="gradient-text">{profile.name}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-4 font-mono text-lg text-[rgb(var(--text-soft))] sm:text-xl">
            <span className="text-[rgb(var(--text))]">&gt; </span>
            <TypingText words={profile.roles} className="text-brand-400" />
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl text-base text-[rgb(var(--text-soft))] text-pretty sm:text-lg">
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary">
              View Projects <HiOutlineArrowDown />
            </a>
            <a href={profile.resumeUrl} download onClick={() => supabase.from('analytics').insert({ event_type: 'resume_download', path: '/resume' })} className="btn-ghost">
              <HiOutlineDocumentArrowDown /> Download Resume
            </a>
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
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full glass-soft text-lg text-[rgb(var(--text-soft))] transition hover:text-brand-400 hover:-translate-y-1 hover:border-brand-400/60"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand-400/30 via-accent-400/20 to-transparent blur-2xl" />
          <div className="relative aspect-square overflow-hidden rounded-[2rem] glass p-2">
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}
