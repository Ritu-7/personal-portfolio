import { createContext, useCallback, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineInformationCircle, HiOutlineXMark } from 'react-icons/hi2'

const ToastContext = createContext(() => {})

const icons = {
  success: <HiOutlineCheckCircle className="text-emerald-400" />,
  error: <HiOutlineExclamationCircle className="text-rose-400" />,
  info: <HiOutlineInformationCircle className="text-brand-400" />,
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), duration)
  }, [])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 flex flex-col items-center gap-2 px-4 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="pointer-events-auto flex w-full items-center gap-3 rounded-2xl glass px-4 py-3 shadow-soft"
            >
              <span className="text-xl">{icons[t.type]}</span>
              <p className="flex-1 text-sm font-medium">{t.message}</p>
              <button
                onClick={() => setToasts((arr) => arr.filter((x) => x.id !== t.id))}
                className="text-[rgb(var(--text-soft))] hover:text-[rgb(var(--text))]"
                aria-label="Dismiss"
              >
                <HiOutlineXMark />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
