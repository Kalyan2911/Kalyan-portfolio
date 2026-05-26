import { useEffect, useState } from 'react'
import useMagnetic from '../hooks/useMagnetic'

export default function Nav({ isDark, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [ctaRef, ctaHandlers] = useMagnetic()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''} role="navigation" aria-label="Main navigation">
      <div className="nav-left">
        <a href="#" className="nav-logo" aria-label="Kalyan — Home">
          K<span className="dot">.</span>
        </a>
        <span className="nav-pill" aria-label="Status: Available for work">
          <span className="ndot" aria-hidden="true" />
          Available
        </span>
      </div>

      <ul className="nav-links" role="list">
        <li><a href="#work">Work</a></li>
        <li><a href="#journey">Journey</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#cta">Contact</a></li>
      </ul>

      <div className="nav-right">
        <button
          className="theme-toggle"
          aria-label="Toggle dark/light mode"
          aria-pressed={isDark}
          onClick={onToggleTheme}
        >
          <span className="ti ti-moon" aria-hidden="true">🌙</span>
          <span className="ti ti-sun" aria-hidden="true">☀️</span>
        </button>
        <a
          href="/Kalyan_Reddy_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta btn"
          aria-label="Open Kalyan Reddy resume PDF in a new tab"
          ref={ctaRef}
          {...ctaHandlers}
        >
          Resume <span className="barr" aria-hidden="true">↗</span>
        </a>
      </div>
    </nav>
  )
}
