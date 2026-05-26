import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cur = document.getElementById('cursor')
    const cur2 = document.getElementById('cur2')
    let mx = 0, my = 0, tx = 0, ty = 0
    let rafId

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      cur.style.left = mx + 'px'
      cur.style.top = my + 'px'

      // Cursor big: check element under pointer
      const el = document.elementFromPoint(mx, my)
      if (el && el.closest('a, button, .case-card, .sk-card, .soc-btn, .hive-btn, .clink')) {
        cur.classList.add('big')
      } else {
        cur.classList.remove('big')
      }
    }

    function loopCur() {
      tx += (mx - tx) * 0.13
      ty += (my - ty) * 0.13
      cur2.style.left = tx + 'px'
      cur2.style.top = ty + 'px'
      rafId = requestAnimationFrame(loopCur)
    }
    rafId = requestAnimationFrame(loopCur)

    const onDown = () => cur.classList.add('click')
    const onUp = () => cur.classList.remove('click')

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div id="cursor" aria-hidden="true" />
      <div id="cur2" aria-hidden="true" />
    </>
  )
}
