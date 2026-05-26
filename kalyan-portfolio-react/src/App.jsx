import { useState, useEffect } from 'react'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import ProgressBar from './components/ProgressBar'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import CaseStudies from './components/CaseStudies'
import Philosophy from './components/Philosophy'
import Timeline from './components/Timeline'
import Skills from './components/Skills'
import CTA from './components/CTA'
import Footer from './components/Footer'
import CaseStudyPage from './components/CaseStudyPage'
import TextractiveCSPage from './components/TextractiveCSPage'

export default function App() {
  const [isDark, setIsDark] = useState(true)
  const [view, setView] = useState('home') // 'home' | 'hive' | 'textractive'

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev
      document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
      return next
    })
  }

  const openHive = () => { setView('hive'); window.scrollTo(0, 0) }
  const closeHive = () => {
    setView('home')
    requestAnimationFrame(() => { document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) })
  }

  const openTextractive = () => { setView('textractive'); window.scrollTo(0, 0) }
  const closeTextractive = () => {
    setView('home')
    requestAnimationFrame(() => { document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) })
  }

  // Global scroll reveal (.rev and .rw elements) — only for portfolio view
  useEffect(() => {
    if (view !== 'home') return
    const revObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('vis') }),
      { threshold: 0.12 }
    )
    // Small timeout so React finishes painting before we query
    const id = setTimeout(() => {
      document.querySelectorAll('.rev, .rw').forEach((el) => revObs.observe(el))
    }, 50)
    return () => { clearTimeout(id); revObs.disconnect() }
  }, [view])

  // Timeline stagger reveal
  useEffect(() => {
    if (view !== 'home') return
    const tlObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('vis') }),
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    )
    const id = setTimeout(() => {
      document.querySelectorAll('.tl-row').forEach((el, i) => {
        el.style.transitionDelay = (i * 0.12) + 's'
        tlObs.observe(el)
      })
    }, 50)
    return () => { clearTimeout(id); tlObs.disconnect() }
  }, [view])

  // Hero parallax
  useEffect(() => {
    if (view !== 'home') return
    const onScroll = () => {
      const y = window.scrollY
      const g = document.querySelector('.hero-grid')
      if (g) g.style.transform = `translateY(${y * 0.3}px)`
      document.querySelectorAll('.hero-orb').forEach((o, i) => {
        o.style.transform = `translateY(${y * (i === 0 ? 0.15 : -0.1)}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [view])

  if (view === 'hive') {
    return (
      <>
        <Cursor />
        <CaseStudyPage onBack={closeHive} />
      </>
    )
  }

  if (view === 'textractive') {
    return (
      <>
        <Cursor />
        <TextractiveCSPage onBack={closeTextractive} />
      </>
    )
  }

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Loader />
      <Cursor />
      <ProgressBar />
      <Nav isDark={isDark} onToggleTheme={toggleTheme} />
      <main id="main-content">
        <Hero />
        <Marquee />
        <CaseStudies onOpenHive={openHive} onOpenTextractive={openTextractive} />
        <Philosophy />
        <Timeline />
        <Skills />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
