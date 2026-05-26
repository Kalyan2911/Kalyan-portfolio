import { useEffect, useRef } from 'react'
import useMagnetic from '../hooks/useMagnetic'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/-+&'
const ROLES = ['UI/UX Designer', 'Product Designer', 'AI Augmented Designer']

/* ── Minimal starfield backdrop (theme-aware) ── */
const SKY = {
  dark:  { top: '#06101e', mid: '#0b1729', bot: '#0d0d0d', dot: '255,255,255' },
  light: { top: '#f6f3ec', mid: '#efece4', bot: '#e8e4d9', dot: '60,50,40'    },
}

function ScenicBackdrop() {
  const canvasRef = useRef(null)
  const themeRef = useRef(typeof document !== 'undefined'
    ? document.documentElement.getAttribute('data-theme') || 'dark'
    : 'dark')

  // Watch theme attribute
  useEffect(() => {
    const html = document.documentElement
    const sync = () => { themeRef.current = html.getAttribute('data-theme') || 'dark' }
    sync()
    const obs = new MutationObserver(sync)
    obs.observe(html, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animId, t = 0
    let themeAlpha = themeRef.current === 'dark' ? 0 : 1 // 0 = dark, 1 = light
    let W = 0, H = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const lerp = (a, b, t) => a + (b - a) * t
    const hex = (h) => { const v = parseInt(h.slice(1), 16); return [(v>>16)&255,(v>>8)&255,v&255] }
    const mixHex = (c1, c2, t) => {
      const [r1,g1,b1] = hex(c1), [r2,g2,b2] = hex(c2)
      return `rgb(${Math.round(lerp(r1,r2,t))},${Math.round(lerp(g1,g2,t))},${Math.round(lerp(b1,b2,t))})`
    }
    const mixRgb = (s1, s2, t) => {
      const [r1,g1,b1] = s1.split(',').map(Number)
      const [r2,g2,b2] = s2.split(',').map(Number)
      return `${Math.round(lerp(r1,r2,t))},${Math.round(lerp(g1,g2,t))},${Math.round(lerp(b1,b2,t))}`
    }

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width  = Math.floor(W * dpr)
      canvas.height = Math.floor(H * dpr)
      canvas.style.width  = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // Twinkling particles (work in both modes — color tweens with theme)
    const stars = Array.from({ length: 260 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.4 + 0.2,
      base: Math.random() * 0.65 + 0.25,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.01 + 0.0035,
    }))

    // Slow drifting dust (subtle, both modes)
    const dust = Array.from({ length: 35 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 0.55 + 0.15,
      vx: (Math.random() - 0.5) * 0.00018,
      vy: -(Math.random() * 0.00022 + 0.00006),
      opacity: Math.random() * 0.35 + 0.12,
    }))

    // Occasional shooting streaks
    const meteors = []
    const spawnMeteor = () => {
      const angle = (Math.random() * 28 + 22) * (Math.PI / 180)
      meteors.push({
        x: Math.random() * W * 0.75, y: Math.random() * H * 0.35,
        vx: Math.cos(angle) * (5 + Math.random() * 4),
        vy: Math.sin(angle) * (5 + Math.random() * 4),
        len: 100 + Math.random() * 120, life: 1.0,
        decay: 0.02 + Math.random() * 0.012,
      })
    }
    const meteorTimer = setInterval(() => {
      if (Math.random() < 0.6) spawnMeteor()
    }, 3200)

    function draw() {
      // Smooth theme tween
      const target = themeRef.current === 'dark' ? 0 : 1
      themeAlpha += (target - themeAlpha) * 0.07
      const tA = themeAlpha
      const dotRgb = mixRgb(SKY.dark.dot, SKY.light.dot, tA)

      ctx.clearRect(0, 0, W, H)

      // Sky gradient (theme-tweened)
      const sky = ctx.createLinearGradient(0, 0, 0, H)
      sky.addColorStop(0,   mixHex(SKY.dark.top, SKY.light.top, tA))
      sky.addColorStop(0.55, mixHex(SKY.dark.mid, SKY.light.mid, tA))
      sky.addColorStop(1,   mixHex(SKY.dark.bot, SKY.light.bot, tA))
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H)

      // Drifting dust
      dust.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.y < -0.01) { d.y = 1.01; d.x = Math.random() }
        ctx.beginPath()
        ctx.arc(d.x * W, d.y * H, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${dotRgb},${d.opacity})`
        ctx.fill()
      })

      // Twinkling stars
      stars.forEach(s => {
        const tw = Math.sin(t * s.speed + s.phase) * 0.4 + 0.6
        const a = s.base * tw
        const x = s.x * W, y = s.y * H
        if (s.r > 0.85) {
          const g = ctx.createRadialGradient(x, y, 0, x, y, s.r * 4)
          g.addColorStop(0, `rgba(${dotRgb},${a * 0.22})`)
          g.addColorStop(1, `rgba(${dotRgb},0)`)
          ctx.fillStyle = g
          ctx.beginPath(); ctx.arc(x, y, s.r * 4, 0, Math.PI * 2); ctx.fill()
        }
        ctx.beginPath()
        ctx.arc(x, y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${dotRgb},${a})`
        ctx.fill()
      })

      // Shooting streaks
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i]
        m.x += m.vx; m.y += m.vy; m.life -= m.decay
        if (m.life <= 0 || m.x > W * 1.1 || m.y > H * 1.1) { meteors.splice(i, 1); continue }
        const mag = Math.hypot(m.vx, m.vy)
        const nx = m.vx / mag, ny = m.vy / mag
        const tail = ctx.createLinearGradient(m.x, m.y, m.x - nx * m.len, m.y - ny * m.len)
        tail.addColorStop(0, `rgba(${dotRgb},${m.life * 0.85})`)
        tail.addColorStop(1, `rgba(${dotRgb},0)`)
        ctx.strokeStyle = tail
        ctx.lineWidth = 1.4 * m.life
        ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x - nx * m.len, m.y - ny * m.len); ctx.stroke()
      }

      t += reduceMotion ? 0.3 : 1
      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(meteorTimer)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', width: '100%', height: '100%' }}
    />
  )
}

/* ── Hero component ── */
export default function Hero() {
  const cntYRef      = useRef(null)
  const cntPRef      = useRef(null)
  const scrambleRef  = useRef(null)
  const heroStatsRef = useRef(null)
  const [btnLimeRef,  btnLimeHandlers]  = useMagnetic()
  const [btnGhostRef, btnGhostHandlers] = useMagnetic()

  // Animated counter
  useEffect(() => {
    function animCount(el, target, suffix = '') {
      let v = 0
      const step = Math.ceil(target / 40)
      const id = setInterval(() => {
        v = Math.min(v + step, target)
        if (el) el.textContent = v + suffix
        if (v >= target) clearInterval(id)
      }, 38)
      return id
    }

    let counted = false
    const intervals = []
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !counted) {
          counted = true
          intervals.push(animCount(cntYRef.current, 4, '+'))
          intervals.push(animCount(cntPRef.current, 20, '+'))
        }
      })
    }, { threshold: 0.5 })

    if (heroStatsRef.current) obs.observe(heroStatsRef.current)
    return () => { obs.disconnect(); intervals.forEach(clearInterval) }
  }, [])

  // Scramble text — cycles through ROLES
  useEffect(() => {
    let wi = 0, outerInterval = null, innerInterval = null

    function scramble(el, target) {
      let f = 0; const N = 30
      if (innerInterval) clearInterval(innerInterval)
      innerInterval = setInterval(() => {
        let r = ''
        for (let i = 0; i < target.length; i++) {
          const ch = target[i]
          if (ch === ' ' || ch === '/' || ch === '-') {
            r += ch
          } else {
            r += f > N * ((i + 1) / target.length)
              ? ch
              : CHARS[Math.floor(Math.random() * CHARS.length)]
          }
        }
        if (el) el.textContent = r
        if (++f > N) { clearInterval(innerInterval); if (el) el.textContent = target }
      }, 28)
    }

    const t = setTimeout(() => {
      outerInterval = setInterval(() => {
        wi = (wi + 1) % ROLES.length
        if (scrambleRef.current) scramble(scrambleRef.current, ROLES[wi])
      }, 2800)
    }, 2200)

    return () => {
      clearTimeout(t)
      if (outerInterval) clearInterval(outerInterval)
      if (innerInterval) clearInterval(innerInterval)
    }
  }, [])

  return (
    <section className="hero hero-scene" aria-labelledby="hero-title">
      <ScenicBackdrop />

      <div className="hero-inner hero-inner-center">
        <div className="hero-badge" aria-label="Available for new projects, based in Hyderabad">
          <span className="hbdot" aria-hidden="true" />
          Available — <span>Hyderabad, India</span> · 4+ Years
        </div>

        <div className="hero-greeting">Hi, I&rsquo;m</div>

        <h1 className="hero-name" id="hero-title">
          <span className="hl">KALYAN REDDY</span>
        </h1>

        <div className="hero-role-line" aria-live="polite">
          <span className="hero-role-prefix">A&nbsp;</span>
          <span className="hero-role" ref={scrambleRef}>UI/UX Designer</span>
        </div>

        <p className="hero-sub hero-sub-c">
          <strong>4+ years</strong> and <strong>20+ projects</strong> shipping enterprise and AI
          products end-to-end. I plug AI tools <strong>(Claude Code, Codex, Figma Make)</strong>
          into research, design and handoff — focused on measurable outcomes and design systems that scale.
        </p>

        <div className="hero-stats hero-stats-c" ref={heroStatsRef} aria-label="Key stats">
          <div className="stat">
            <div className="snum" ref={cntYRef}>0</div>
            <div className="slabel">Years Exp.</div>
          </div>
          <div className="stat">
            <div className="snum" ref={cntPRef}>0</div>
            <div className="slabel">Projects</div>
          </div>
          <div className="stat">
            <div className="snum">B2B</div>
            <div className="slabel">SaaS · AI</div>
          </div>
        </div>

        <div className="hero-actions hero-actions-c">
          <a href="#work" className="btn btn-lime" ref={btnLimeRef} {...btnLimeHandlers}>
            View Work <span className="barr" aria-hidden="true">→</span>
          </a>
          <a
            href="/Kalyan_Reddy_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            aria-label="Open Kalyan Reddy resume PDF in a new tab"
            ref={btnGhostRef}
            {...btnGhostHandlers}
          >
            Resume <span className="barr" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
