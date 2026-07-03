import { useEffect, useMemo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import {
  HiOutlineMagnifyingGlass,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineXMark,
  HiOutlineCheckCircle,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineDocumentText,
} from 'react-icons/hi2'
import Section from '../components/Section.jsx'
import { Tilt } from '../components/Motion.jsx'
import { projects } from '../data/portfolio.js'

const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]
const PER_PAGE = 6

const statusStyles = {
  Deployed: 'bg-emerald-400/15 text-emerald-400 border-emerald-400/30',
  'In Progress': 'bg-amber-400/15 text-amber-400 border-amber-400/30',
}

const difficultyStyles = {
  Advanced: 'bg-rose-400/15 text-rose-400',
  Intermediate: 'bg-sky-400/15 text-sky-400',
}

function AutoCarousel({ images, alt, autoPlay = true, interval = 2500 }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), interval)
    return () => clearInterval(t)
  }, [autoPlay, images.length, interval])

  return (
    <div className="relative aspect-[16/10] overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={idx}
          src={images[idx].src}
          alt={`${alt} — ${images[idx].label}`}
          loading="lazy"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />

      {/* Label */}
      <span className="absolute top-3 right-3 chip !bg-slate-950/60 !text-white !border-white/10 backdrop-blur-md">
        {images[idx].label}
      </span>

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setIdx(i) }}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? 'w-6 bg-brand-400' : 'w-1.5 bg-white/40'
              }`}
              aria-label={`View screenshot ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project, onOpen, index }) {
  return (
    <motion.button
      layout
      onClick={() => onOpen(project)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group text-left card overflow-hidden !p-0 hover:border-brand-400/40 hover:shadow-glow"
    >
      <Tilt max={6} className="h-full">
        <div className="relative">
          <AutoCarousel images={project.gallery} alt={project.title} />
          {project.featured && (
            <span className="absolute top-3 left-3 chip !bg-brand-400/90 !text-slate-900 !border-transparent">
              ★ Featured
            </span>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <motion.span
              initial={{ scale: 0.8 }}
              className="flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md"
            >
              <HiOutlineDocumentText /> View Case Study
            </motion.span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="chip">{project.category}</span>
            <span className={`chip !border ${statusStyles[project.status] || ''}`}>{project.status}</span>
          </div>
          <h3 className="mt-3 font-display text-lg font-bold text-balance">{project.title}</h3>
          <p className="mt-2 text-sm text-[rgb(var(--text-soft))] line-clamp-2 text-pretty">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((t) => (
              <span key={t} className="chip !py-0.5 !text-[11px]">{t}</span>
            ))}
            {project.tech.length > 3 && <span className="chip !py-0.5 !text-[11px]">+{project.tech.length - 3}</span>}
          </div>

          <div className="mt-4 flex items-center gap-3 text-xs text-[rgb(var(--text-soft))]">
            <span>⏱ {project.timeline}</span>
            <span className={`rounded-full px-2 py-0.5 ${difficultyStyles[project.difficulty] || ''}`}>{project.difficulty}</span>
          </div>
        </div>
      </Tilt>
    </motion.button>
  )
}

function GalleryModal({ project, onClose }) {
  const [idx, setIdx] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  const next = useCallback(() => setIdx((i) => (i + 1) % project.gallery.length), [project.gallery.length])
  const prev = useCallback(() => setIdx((i) => (i - 1 + project.gallery.length) % project.gallery.length), [project.gallery.length])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') fullscreen ? setFullscreen(false) : onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, onClose, fullscreen])

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/80 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl gradient-border"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full glass-soft hover:text-brand-400 hover:rotate-90 transition-all"
          >
            <HiOutlineXMark className="text-lg" />
          </button>

          {/* Main gallery image */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={idx}
                src={project.gallery[idx].src}
                alt={`${project.title} — ${project.gallery[idx].label}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />

            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full glass-soft hover:text-brand-400 transition"
            >
              <HiOutlineChevronLeft className="text-lg" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full glass-soft hover:text-brand-400 transition"
            >
              <HiOutlineChevronRight className="text-lg" />
            </button>

            <button
              onClick={() => setFullscreen(true)}
              className="absolute bottom-3 right-3 chip !bg-slate-950/60 !text-white !border-white/10 backdrop-blur-md hover:!bg-brand-400 hover:!text-slate-900 transition"
            >
              Expand
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 overflow-x-auto p-4 mask-fade-edges">
            {project.gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`relative h-16 w-28 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                  i === idx ? 'border-brand-400' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={g.src} alt={g.label} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip">{project.category}</span>
              <span className={`chip !border ${statusStyles[project.status] || ''}`}>{project.status}</span>
              <span className="chip">⏱ {project.timeline}</span>
              <span className={`chip ${difficultyStyles[project.difficulty] || ''}`}>{project.difficulty}</span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-extrabold">{project.title}</h3>
            <p className="mt-3 text-[rgb(var(--text-soft))] text-pretty">{project.description}</p>

            <h4 className="mt-6 text-sm font-semibold">Key Features</h4>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[rgb(var(--text-soft))]">
                  <HiOutlineCheckCircle className="mt-0.5 shrink-0 text-brand-400" /> {f}
                </li>
              ))}
            </ul>

            <h4 className="mt-6 text-sm font-semibold">Tech Stack</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={project.demo} target="_blank" rel="noreferrer" className="btn-primary">
                Live Demo <HiOutlineArrowTopRightOnSquare />
              </a>
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-ghost">
                <FaGithub /> Source Code
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Fullscreen viewer */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreen(false)}
            className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/95 p-4"
          >
            <button
              onClick={() => setFullscreen(false)}
              className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full glass-soft hover:text-brand-400 transition"
            >
              <HiOutlineXMark className="text-xl" />
            </button>
            <motion.img
              key={idx}
              src={project.gallery[idx].src}
              alt={project.gallery[idx].label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
            />
            <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-6 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full glass-soft hover:text-brand-400 transition">
              <HiOutlineChevronLeft className="text-xl" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-6 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full glass-soft hover:text-brand-400 transition">
              <HiOutlineChevronRight className="text-xl" />
            </button>
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-white/70">
              {project.gallery[idx].label} — {idx + 1} / {project.gallery.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function Projects() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [active, setActive] = useState(null)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCat = category === 'All' || p.category === category
      const q = query.toLowerCase()
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q))
      return matchesCat && matchesQuery
    })
  }, [query, category])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const current = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const resetPage = () => setPage(1)

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've built"
      subtitle="A selection of products, clones, and tools — each with a focus on UX and engineering."
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--text-soft))]" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); resetPage() }}
            placeholder="Search projects, tech..."
            className="input !pl-11 !pt-3.5 !pb-3.5"
            aria-label="Search projects"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => { setCategory(c); resetPage() }}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                category === c
                  ? 'text-slate-900'
                  : 'glass-soft text-[rgb(var(--text-soft))] hover:text-[rgb(var(--text))]'
              }`}
            >
              {category === c && (
                <motion.span
                  layoutId="project-cat"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-brand-400 to-accent-400 shadow-lg shadow-brand-500/20"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {c}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {current.map((p, i) => (
            <ProjectCard key={p.title} project={p} onOpen={setActive} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-[rgb(var(--text-soft))]">
          No projects match your search. Try a different keyword.
        </p>
      )}

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="grid h-10 w-10 place-items-center rounded-full glass-soft disabled:opacity-40 hover:border-brand-400/60 transition"
            aria-label="Previous page"
          >
            <HiOutlineChevronLeft />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`h-10 w-10 rounded-full text-sm font-semibold transition ${
                page === i + 1
                  ? 'bg-gradient-to-r from-brand-400 to-accent-400 text-slate-900'
                  : 'glass-soft text-[rgb(var(--text-soft))] hover:text-[rgb(var(--text))]'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="grid h-10 w-10 place-items-center rounded-full glass-soft disabled:opacity-40 hover:border-brand-400/60 transition"
            aria-label="Next page"
          >
            <HiOutlineChevronRight />
          </button>
        </div>
      )}

      <AnimatePresence>
        {active && <GalleryModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </Section>
  )
}
