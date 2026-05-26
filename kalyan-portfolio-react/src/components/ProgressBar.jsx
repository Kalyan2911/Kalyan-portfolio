import { useEffect, useRef } from 'react'

export default function ProgressBar() {
  const ref = useRef(null)

  useEffect(() => {
    const handler = () => {
      const el = ref.current
      if (!el) return
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      el.style.transform = `scaleX(${pct})`
      el.setAttribute('aria-valuenow', Math.round(pct * 100))
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div
      id="prog"
      ref={ref}
      aria-hidden="true"
      role="progressbar"
      aria-valuenow="0"
      aria-valuemin="0"
      aria-valuemax="100"
    />
  )
}
