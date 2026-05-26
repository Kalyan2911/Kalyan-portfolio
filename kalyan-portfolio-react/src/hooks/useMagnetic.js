import { useRef } from 'react'

export default function useMagnetic() {
  const ref = useRef(null)

  const onMouseEnter = () => {
    if (ref.current) ref.current.style.transition = 'transform .2s ease'
  }
  const onMouseMove = (e) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * 0.3
    const y = (e.clientY - r.top - r.height / 2) * 0.3
    ref.current.style.transform = `translate(${x}px,${y}px)`
  }
  const onMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transition = 'transform .5s cubic-bezier(0.34,1.56,0.64,1)'
    ref.current.style.transform = ''
  }

  return [ref, { onMouseEnter, onMouseMove, onMouseLeave }]
}
