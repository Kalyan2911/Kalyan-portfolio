import { useRef } from 'react'

export default function useCardTilt() {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-6px)`
    ref.current.style.transition = 'transform .15s ease'
  }
  const onMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = ''
    ref.current.style.transition = 'transform .5s cubic-bezier(0.34,1.56,0.64,1)'
  }

  return [ref, { onMouseMove, onMouseLeave }]
}
