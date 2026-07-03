import { useEffect, useState } from 'react'

export default function TypingText({ words, className = '' }) {
  const [index, setIndex] = useState(0)
  const [sub, setSub] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]
    let timeout

    if (!deleting && sub === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1400)
    } else if (deleting && sub === 0) {
      setDeleting(false)
      setIndex((i) => i + 1)
    } else {
      timeout = setTimeout(
        () => setSub((s) => s + (deleting ? -1 : 1)),
        deleting ? 45 : 90,
      )
    }
    return () => clearTimeout(timeout)
  }, [sub, deleting, index, words])

  return (
    <span className={className}>
      {words[index % words.length].substring(0, sub)}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle h-[1em] -translate-y-0.5" />
    </span>
  )
}
