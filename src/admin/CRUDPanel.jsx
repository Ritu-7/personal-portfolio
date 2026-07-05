import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineXMark, HiOutlineCheckCircle } from 'react-icons/hi2'
import { supabase } from '../context/SupabaseContext.jsx'

const schemas = {
  projects: {
    label: 'Project',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'category', label: 'Category', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea', required: true },
      { key: 'image', label: 'Image URL', type: 'text' },
      { key: 'github', label: 'GitHub URL', type: 'text' },
      { key: 'demo', label: 'Demo URL', type: 'text' },
      { key: 'featured', label: 'Featured', type: 'boolean' },
      { key: 'published', label: 'Published', type: 'boolean' },
      { key: 'sort_order', label: 'Sort Order', type: 'number' },
      { key: 'features', label: 'Features (comma-separated)', type: 'array' },
      { key: 'tech', label: 'Tech Stack (comma-separated)', type: 'array' },
    ],
  },
  skills: {
    label: 'Skill Group',
    fields: [
      { key: 'category', label: 'Category', type: 'text', required: true },
      { key: 'icon', label: 'Icon (cpu/layout/server/wrench/database)', type: 'text' },
      { key: 'color', label: 'Color (tailwind gradient)', type: 'text' },
      { key: 'published', label: 'Published', type: 'boolean' },
      { key: 'sort_order', label: 'Sort Order', type: 'number' },
      { key: 'items', label: 'Items (JSON: [{name,level}])', type: 'json' },
    ],
  },
  experience: {
    label: 'Experience',
    fields: [
      { key: 'role', label: 'Role', type: 'text', required: true },
      { key: 'company', label: 'Company', type: 'text', required: true },
      { key: 'period', label: 'Period', type: 'text', required: true },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea', required: true },
      { key: 'published', label: 'Published', type: 'boolean' },
      { key: 'sort_order', label: 'Sort Order', type: 'number' },
      { key: 'achievements', label: 'Achievements (comma-separated)', type: 'array' },
      { key: 'tags', label: 'Tags (comma-separated)', type: 'array' },
    ],
  },
  education: {
    label: 'Education',
    fields: [
      { key: 'degree', label: 'Degree', type: 'text', required: true },
      { key: 'institution', label: 'Institution', type: 'text', required: true },
      { key: 'period', label: 'Period', type: 'text', required: true },
      { key: 'cgpa', label: 'CGPA', type: 'text' },
      { key: 'published', label: 'Published', type: 'boolean' },
      { key: 'sort_order', label: 'Sort Order', type: 'number' },
      { key: 'coursework', label: 'Coursework (comma-separated)', type: 'array' },
    ],
  },
  certifications: {
    label: 'Certificate',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'org', label: 'Organization', type: 'text', required: true },
      { key: 'date', label: 'Date', type: 'text', required: true },
      { key: 'credential_id', label: 'Credential ID', type: 'text' },
      { key: 'verify_url', label: 'Verify URL', type: 'text' },
      { key: 'published', label: 'Published', type: 'boolean' },
      { key: 'sort_order', label: 'Sort Order', type: 'number' },
    ],
  },
  profile: {
    label: 'Profile',
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'email', label: 'Email', type: 'text', required: true },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'bio', label: 'Bio', type: 'textarea' },
      { key: 'image', label: 'Image URL', type: 'text' },
      { key: 'socials', label: 'Socials (JSON)', type: 'json' },
    ],
  },
}

function FieldInput({ field, value, onChange }) {
  const common = 'input peer'
  if (field.type === 'textarea') return <textarea value={value || ''} onChange={(e) => onChange(field.key, e.target.value)} placeholder=" " rows={3} className={`${common} resize-none`} />
  if (field.type === 'boolean') return (
    <label className="flex cursor-pointer items-center gap-2 text-sm">
      <button type="button" onClick={() => onChange(field.key, !value)} className={`relative h-5 w-9 rounded-full transition ${value ? 'bg-brand-400' : 'bg-[rgb(var(--border))]'}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${value ? 'left-4' : 'left-0.5'}`} />
      </button>
      {field.label}
    </label>
  )
  if (field.type === 'number') return <input type="number" value={value ?? 0} onChange={(e) => onChange(field.key, parseInt(e.target.value) || 0)} placeholder=" " className={common} />
  if (field.type === 'array') return <input type="text" value={Array.isArray(value) ? value.join(', ') : value || ''} onChange={(e) => onChange(field.key, e.target.value)} placeholder=" " className={common} />
  if (field.type === 'json') return <textarea value={typeof value === 'object' ? JSON.stringify(value, null, 2) : value || ''} onChange={(e) => onChange(field.key, e.target.value)} placeholder=" " rows={4} className={`${common} resize-none font-mono text-xs`} />
  return <input type={field.type || 'text'} value={value || ''} onChange={(e) => onChange(field.key, e.target.value)} placeholder=" " className={common} required={field.required} />
}

function Modal({ schema, item, onClose, onSave }) {
  const [form, setForm] = useState(item || {})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      const payload = { ...form }
      schema.fields.forEach((f) => {
        if (f.type === 'array' && typeof payload[f.key] === 'string') {
          payload[f.key] = payload[f.key].split(',').map((s) => s.trim()).filter(Boolean)
        }
        if (f.type === 'json' && typeof payload[f.key] === 'string') {
          try { payload[f.key] = JSON.parse(payload[f.key]) } catch { /* leave as string */ }
        }
      })

      let result
      if (form.id) {
        result = await supabase.from(schema._table).update(payload).eq('id', form.id).select().single()
      } else {
        result = await supabase.from(schema._table).insert(payload).select().single()
      }
      if (result.error) throw result.error
      onSave()
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/70 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl gradient-border p-6"
      >
        <button onClick={onClose} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full glass-soft hover:text-brand-400 hover:rotate-90 transition-all">
          <HiOutlineXMark className="text-lg" />
        </button>
        <h2 className="mb-6 font-display text-xl font-bold">{form.id ? `Edit ${schema.label}` : `Add ${schema.label}`}</h2>

        <div className="space-y-4">
          {schema.fields.map((f) => (
            <div key={f.key} className={f.type === 'boolean' ? '' : 'relative'}>
              {f.type !== 'boolean' && (
                <label className="mb-1 block text-xs font-medium text-[rgb(var(--text-soft))]">{f.label}</label>
              )}
              <FieldInput field={f} value={form[f.key]} onChange={setField} />
            </div>
          ))}
        </div>

        {error && <p className="mt-4 rounded-xl bg-rose-400/10 border border-rose-400/30 p-3 text-sm text-rose-400">{error}</p>}

        <div className="mt-6 flex gap-3">
          <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 disabled:opacity-60">
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button onClick={onClose} className="btn-ghost">Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function CRUDPanel({ entity }) {
  const schema = { ...schemas[entity], _table: entity === 'profile' ? 'admin_profile' : entity }
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalItem, setModalItem] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    let query = supabase.from(schema._table).select('*').order('sort_order', { ascending: true })
    if (entity !== 'profile') query = query.order('created_at', { ascending: false })
    const { data } = await query
    setItems(data || [])
    setLoading(false)
  }, [entity, schema._table])

  useEffect(() => { load() }, [load])

  const handleDelete = async (id) => {
    await supabase.from(schema._table).delete().eq('id', id)
    setConfirmDelete(null)
    load()
  }

  const displayValue = (item, key) => {
    const val = item[key]
    if (Array.isArray(val)) return val.slice(0, 2).join(', ') + (val.length > 2 ? '...' : '')
    if (typeof val === 'object' && val) return 'JSON'
    if (typeof val === 'boolean') return val ? 'Yes' : 'No'
    return String(val || '').slice(0, 60)
  }

  const primaryField = schema.fields[0]?.key

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold">{schema.label}s</h1>
          <p className="text-sm text-[rgb(var(--text-soft))]">Manage your {schema.label.toLowerCase()} entries.</p>
        </div>
        {entity !== 'profile' && (
          <button onClick={() => setModalItem({})} className="btn-primary !py-2.5">
            <HiOutlinePlus /> Add {schema.label}
          </button>
        )}
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="card animate-pulse h-20" />
        ) : items.length === 0 ? (
          <p className="card text-center text-[rgb(var(--text-soft))]">No entries yet. Click "Add" to create one.</p>
        ) : (
          items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="truncate font-semibold">{displayValue(item, primaryField) || 'Untitled'}</p>
                <p className="truncate text-sm text-[rgb(var(--text-soft))]">
                  {schema.fields.slice(1, 3).map((f) => displayValue(item, f.key)).filter(Boolean).join(' · ')}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => setModalItem(item)} className="chip hover:border-brand-400/60" title="Edit">
                  <HiOutlinePencil /> Edit
                </button>
                {entity !== 'profile' && (
                  <button onClick={() => setConfirmDelete(item)} className="chip hover:border-rose-400/60 hover:text-rose-400" title="Delete">
                    <HiOutlineTrash />
                  </button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {modalItem && <Modal schema={schema} item={modalItem} onClose={() => setModalItem(null)} onSave={load} />}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setConfirmDelete(null)}
            className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-3xl glass p-6 text-center"
            >
              <p className="font-display text-lg font-bold">Delete this entry?</p>
              <p className="mt-2 text-sm text-[rgb(var(--text-soft))]">This action cannot be undone.</p>
              <div className="mt-6 flex gap-3">
                <button onClick={() => handleDelete(confirmDelete.id)} className="btn-primary flex-1 !bg-rose-400 !from-rose-400 !to-rose-500">
                  Delete
                </button>
                <button onClick={() => setConfirmDelete(null)} className="btn-ghost">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
