import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { HiOutlineMagnifyingGlass, HiOutlineArrowTopRightOnSquare, HiOutlineXMark, HiOutlineCheckCircle, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2'
import Section from '../components/Section.jsx'
import { Tilt } from '../components/Motion.jsx'
import { projects } from '../data/portfolio.js'

const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]
const PER_PAGE = 6

function ProjectCard({ project, onOpen, index }) {
  return (
    <motion.button
      layout
      onClick={() => onOpen(project)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group text-left card overflow-hidden !p-0 hover:border-brand-400/40"
    >
      <Tilt max={8} className="h-full">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
          {project.featured && (
            <span className="absolute top-3 left-3 chip !bg-brand-400/90 !text-slate-900 !border-transparent">
              ★ Featured
            </span>
          )}
          <div className="absolute bottom-3 left-3 right-3">
            <span className="chip">{project.category}</span>
            <h3 className="mt-2 font-display text-lg font-bold text-white">{project.title}</h3>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
              View Details
            </span>
          </div>
        </div>
        <div className="p-5">
          <p className="text-sm text-[rgb(var(--text-soft))] line-clamp-2 text-pretty">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((t) => (
              <span key={t} className="chip !py-0.5 !text-[11px]">{t}</span>
            ))}
            {project.tech.length > 3 && <span className="chip !py-0.5 !text-[11px]">+{project.tech.length - 3}</span>}
          </div>
        </div>
      </Tilt>
    </motion.button>
  )
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/70 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glass"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full glass-soft hover:text-brand-400 hover:rotate-90 transition-all"
        >
          <HiOutlineXMark className="text-lg" />
        </button>
        <div className="aspect-[16/9] overflow-hidden rounded-t-3xl">
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
        </div>
        <div className="p-6 sm:p-8">
          <span className="chip mb-3">{project.category}</span>
          <h3 className="font-display text-2xl font-extrabold">{project.title}</h3>
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
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </Section>
  )
}
