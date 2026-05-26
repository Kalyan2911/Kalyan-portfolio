import { useEffect, useRef, useState } from 'react'
import '../CaseStudyPage.css'
import useMagnetic from '../hooks/useMagnetic'

/* ─── TOC definition ─── */
const TOC = [
  { id: 'hw-problem',   label: 'The Problem' },
  { id: 'hw-phase1',    label: 'Phase 1' },
  { id: 'hw-phase2',    label: 'Phase 2' },
  { id: 'hw-phase3',    label: 'Phase 3 & 4' },
  { id: 'hw-phase5',    label: 'Phase 5' },
  { id: 'hw-designs',   label: 'Visual Designs' },
  { id: 'hw-outcome',   label: 'Outcome' },
]

/* ─── Research questions sticky board data ─── */
const RESEARCH_COLS = [
  {
    label: 'Value Proposition', color: '#7c3aed',
    notes: [
      'What issues does this solution address for users?',
      'Which problems are most critical to solve?',
      'What gap will this tool cover in the existing process?',
    ],
  },
  {
    label: 'Product', color: '#16a34a',
    notes: [
      'How should this product make the user take action?',
      'How to describe an important problem?',
      'What are the compliance requirements?',
      'How long has it been ongoing?',
      "How to determine the project's success?",
    ],
  },
  {
    label: 'User Goals', color: '#d97706',
    notes: [
      'What does success mean to the users?',
      'What would users wish for if they had a magic wand to improve the process?',
    ],
  },
  {
    label: 'Obstacles', color: '#dc2626',
    notes: [
      'What are the technological limitations?',
      "Is there any reason we wouldn't be able to get the dream outcome?",
    ],
  },
]

/* ─── Feature showcase cards data ─── */
const FEATURES = [
  {
    num: '01', icon: '🤖',
    title: 'Chatbot-guided wellness plan',
    body: 'A friendly chat figures out what you need and builds a personalised plan. No forms, no overwhelm — right care at the right time.',
    color: '#a78bfa', bg: 'rgba(124,58,237,.1)', border: 'rgba(124,58,237,.2)', bar: 'linear-gradient(90deg,#7c3aed,#a78bfa)',
  },
  {
    num: '02', icon: '📅',
    title: 'Mental health check + appointment nudge',
    body: "After the check-in, the app guides you toward booking the right expert — not just whoever is free. The right match, every time.",
    color: '#2dd4bf', bg: 'rgba(13,148,136,.1)', border: 'rgba(13,148,136,.2)', bar: 'linear-gradient(90deg,#0d9488,#2dd4bf)',
  },
  {
    num: '03', icon: '🔥',
    title: 'Daily check-ins that build streaks',
    body: 'Log your mood and earn wellness points. Like Snapchat streaks — once started, hard to break. Emotional connection builds healthy habits.',
    color: '#fcd34d', bg: 'rgba(245,158,11,.1)', border: 'rgba(245,158,11,.2)', bar: 'linear-gradient(90deg,#f59e0b,#fcd34d)',
  },
  {
    num: '04', icon: '📚',
    title: "Short courses you'll actually finish",
    body: 'Bite-sized health content with a visible progress bar. The closer you get to completion, the stronger the motivation to finish.',
    color: '#60a5fa', bg: 'rgba(37,99,235,.1)', border: 'rgba(37,99,235,.2)', bar: 'linear-gradient(90deg,#2563eb,#60a5fa)',
  },
  {
    num: '05', icon: '⌚',
    title: 'Smart device tracking',
    body: 'Connect your Fitbit or Apple Watch in a few taps. Sleep reports, step counts, and fitness summaries — all in one place.',
    color: '#4ade80', bg: 'rgba(22,163,74,.1)', border: 'rgba(22,163,74,.2)', bar: 'linear-gradient(90deg,#16a34a,#4ade80)',
  },
]

/* ─── Pain point cards data ─── */
const PAIN_POINTS = [
  { emoji: '🙍‍♀️', title: 'Multiple questionnaires', body: 'Users face multiple questionnaires and receive numerous recommendations on which doctor to consult.' },
  { emoji: '🔖',    title: 'Always saving for later', body: 'Redirecting to articles can be helpful, but users frequently save them for later rather than completing.' },
  { emoji: '📊',    title: 'Users like to track progress', body: 'Users often desire to track their progress for articles or courses — existing platforms rarely reward this.' },
  { emoji: '😑',    title: 'Lack of delightfulness', body: 'Many health experiences feel robotic and clinical — killing motivation for consistent, long-term use.' },
]

/* ─── Reusable image block ─── */
function HwImage({ src, alt, caption }) {
  return (
    <figure className="hw-img-block hw-reveal">
      {caption && <figcaption className="hw-img-caption">{caption}</figcaption>}
      <img src={src} alt={alt} loading="lazy" />
    </figure>
  )
}

/* ─── Main component ─── */
export default function CaseStudyPage({ onBack }) {
  const progRef  = useRef(null)
  const pageRef  = useRef(null)
  const tocRefs  = useRef([])
  const [activeId, setActiveId] = useState('hw-problem')
  const [backRef, backHandlers] = useMagnetic()
  const [btnRef,  btnHandlers]  = useMagnetic()

  /* Scroll to top + focus */
  useEffect(() => {
    window.scrollTo(0, 0)
    setTimeout(() => pageRef.current?.focus(), 100)
  }, [])

  /* Reading progress */
  useEffect(() => {
    const handler = () => {
      const el = progRef.current; if (!el) return
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      el.style.transform = `scaleX(${Math.min(pct, 1)})`
      el.setAttribute('aria-valuenow', Math.round(pct * 100))
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  /* Active TOC section */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id) }),
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    TOC.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  /* Scroll reveal for .hw-reveal elements */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('vis') }),
      { threshold: 0.1 }
    )
    const id = setTimeout(() => {
      document.querySelectorAll('.hw-reveal, .hw-reveal-l').forEach((el) => obs.observe(el))
    }, 100)
    return () => { clearTimeout(id); obs.disconnect() }
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div ref={pageRef} tabIndex="-1" style={{ outline: 'none' }}>

      {/* ── Top bar ── */}
      <div className="hw-topbar" role="banner">
        <button className="hw-back" onClick={onBack} aria-label="Back to portfolio" ref={backRef} {...backHandlers}>
          <span className="hw-back-arr" aria-hidden="true">←</span> Portfolio
        </button>
        <span className="hw-topbar-label" aria-hidden="true">Hive Wellness</span>
        <span className="hw-topbar-logo" aria-hidden="true">K<span>.</span></span>
      </div>

      {/* Reading progress */}
      <div className="hw-progress" ref={progRef} role="progressbar"
        aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" aria-label="Reading progress" />

      {/* ── Hero ── */}
      <header className="hw-hero">
        <div className="hw-hero-orb1" aria-hidden="true" />
        <div className="hw-hero-orb2" aria-hidden="true" />
        <div className="hw-hero-inner">
          <div className="hw-tags" aria-label="Project tags">
            {['HealthTech', 'Mobile App', 'Proof of Concept', 'UX Design', 'Design Sprint'].map((t) => (
              <span className="hw-tag" key={t}>{t}</span>
            ))}
          </div>
          <h1 className="hw-hero-title">HIVE<br />WELLNESS</h1>
          <p className="hw-hero-summary">
            A <strong>health app prototype</strong> that puts your doctor, trainer, and nutritionist
            under one roof — so you stop Googling symptoms and start actually owning your health.
          </p>
          <div className="hw-meta" role="list" aria-label="Project details">
            <div className="hw-mi" role="listitem">
              <div className="hw-mi-label">My Role</div>
              <div className="hw-mi-val">Visual Design · UX Design · User Research · Prototyping</div>
            </div>
            <div className="hw-mi" role="listitem">
              <div className="hw-mi-label">Team</div>
              <div className="hw-mi-val">Me 🙂 · Akanksha Biswas (UX) · Naveen Chevuri (PM)</div>
            </div>
            <div className="hw-mi" role="listitem">
              <div className="hw-mi-label">Duration</div>
              <div className="hw-mi-val">6 Weeks — Design Sprint &amp; Concept Testing</div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Sticky tab bar ── */}
      <nav className="hw-tabbar" aria-label="Jump to section">
        {TOC.map((item, i) => (
          <button
            key={item.id}
            className={`hw-tab${activeId === item.id ? ' active' : ''}`}
            ref={(el) => { tocRefs.current[i] = el }}
            onClick={() => scrollTo(item.id)}
            aria-current={activeId === item.id ? 'true' : undefined}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* ══════════════════════════════
          MAIN CONTENT
      ══════════════════════════════ */}
      <main id="main-content">

        {/* ── 01  THE PROBLEM ── */}
        <section className="hw-section" id="hw-problem" data-phase="problem" aria-labelledby="h-problem">
          <div className="hw-bg-num" aria-hidden="true">01</div>
          <div className="hw-phase hw-reveal">Problem</div>
          <div className="hw-eyebrow hw-reveal">The Problem</div>
          <h2 className="hw-h2 hw-reveal" id="h-problem">Chronic stress is draining people — and costing companies billions</h2>
          <p className="hw-p hw-reveal">
            Chronic stress is a large and pervasive problem impacting employees' health and productivity,
            costing employers <strong>billions of dollars every year.</strong> Yet most solutions treat
            the symptom, not the whole person.
          </p>
          <p className="hw-p hw-reveal">
            There is a real need for a <strong>whole-person approach</strong> — one that brings
            healthcare, fitness, and mental wellness together in a single place people actually want to use.
          </p>
          <div className="hw-hmw hw-reveal">
            <p className="hw-hmw-text">
              <em>"How Might We enable patients to have a platform that encourages them to be responsible
              for their own health — where everything is under one roof?"</em>
            </p>
          </div>
        </section>

        {/* ── 02  PHASE 1 — DISCOVERY ── */}
        <section className="hw-section" id="hw-phase1" data-phase="phase1" aria-labelledby="h-phase1">
          <div className="hw-bg-num" aria-hidden="true">02</div>
          <div className="hw-phase hw-reveal">Phase 1</div>
          <div className="hw-eyebrow hw-reveal">Discovery</div>
          <h2 className="hw-h2 hw-reveal" id="h-phase1">We used lightning talks to understand the business</h2>
          <p className="hw-p hw-reveal">
            Before designing anything, we aligned with the client through <strong>lightning talks</strong> —
            short, focused sessions where each stakeholder shares what they know, fast. This gave us a
            clear head start on drafting our How Might We's.
          </p>

          {/* Research goals sticky board */}
          <div className="hw-h3 hw-reveal">Clarifying the research goals</div>
          <p className="hw-p hw-reveal">
            We brainstormed questions across four pillars to uncover business objectives, product
            purpose, user needs, and blockers — before touching Figma.
          </p>
          <div className="hw-sticky-board hw-reveal" role="region" aria-label="Research questions board">
            <div className="hw-sticky-cols">
              {RESEARCH_COLS.map((col) => (
                <div key={col.label}>
                  <div className="hw-sticky-head" style={{ background: col.color }}>{col.label}</div>
                  <div className="hw-sticky-notes">
                    {col.notes.map((note) => <div className="hw-sticky-note" key={note}>{note}</div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business goals */}
          <div className="hw-h3 hw-reveal">Aligning with business goals</div>
          <p className="hw-p hw-reveal">Three core themes emerged from the stakeholder sessions:</p>
          <div className="hw-cards hw-reveal" role="list">
            {[
              { icon: '🎯', title: 'Make users stick', body: 'Focus on UX that promotes high value and simplicity — earning daily habits, not just downloads.' },
              { icon: '🧪', title: 'Validate before building', body: 'Experiment and validate with the market first. Avoid spending budget on unproven assumptions.' },
              { icon: '💰', title: 'Be mindful of budget', body: 'Address development and marketing constraints — build lean, learn fast, prove the concept.' },
            ].map((c) => (
              <div className="hw-card" role="listitem" key={c.title}>
                <span className="hw-card-icon" aria-hidden="true">{c.icon}</span>
                <div className="hw-card-title">{c.title}</div>
                <p className="hw-card-body">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 03  PHASE 2 — USER RESEARCH ── */}
        <section className="hw-section" id="hw-phase2" data-phase="phase2" aria-labelledby="h-phase2">
          <div className="hw-bg-num" aria-hidden="true">03</div>
          <div className="hw-phase hw-reveal">Phase 2</div>
          <div className="hw-eyebrow hw-reveal">User Research</div>
          <h2 className="hw-h2 hw-reveal" id="h-phase2">Building a picture of our user</h2>

          {/* Stakeholder pain mapping */}
          <div className="hw-h3 hw-reveal">Torturing the stakeholders with bad designs</div>
          <p className="hw-p hw-reveal">
            To find real gaps in existing health apps, we asked stakeholders to share their worst
            experiences — which apps they avoid and why. Four patterns emerged:
          </p>
          <div className="hw-pain-cards hw-reveal" role="list" aria-label="User pain points">
            {PAIN_POINTS.map((p) => (
              <div className="hw-pain-card" role="listitem" key={p.title}>
                <span className="hw-pain-illo" aria-hidden="true">{p.emoji}</span>
                <div className="hw-pain-title">{p.title}</div>
                <p className="hw-pain-body">{p.body}</p>
              </div>
            ))}
          </div>

          {/* Persona */}
          <div className="hw-h3 hw-reveal">Meet Trey — Employee suffering from chronic stress</div>
          <p className="hw-p hw-reveal">
            Using the information provided by our client, we created Trey to represent the primary
            user group — someone who cares about their health but keeps hitting walls.
          </p>
          <HwImage
            src="/hive-wellness/Untitled.png"
            alt="Trey Lewis persona card — Sales employee at a financial services company suffering from chronic stress"
            caption="Primary user persona — Trey Lewis"
          />

          {/* Journey map */}
          <div className="hw-h3 hw-reveal">What path is he taking?</div>
          <p className="hw-p hw-reveal">
            We mapped the initial journey — how Trey navigates from first landing to actually
            managing his health. Four entry points (CTAs) led to very different experiences.
          </p>
          <HwImage
            src="/hive-wellness/Untitled%201.png"
            alt="User journey map showing four CTA paths from the landing page to health actions"
            caption="Initial user journey map"
          />
        </section>

        {/* ── 04  PHASE 3 & 4 — PROCESS ── */}
        <section className="hw-section" id="hw-phase3" data-phase="phase3" aria-labelledby="h-phase3">
          <div className="hw-bg-num" aria-hidden="true">04</div>
          <div className="hw-phase hw-reveal">Phase 3 &amp; 4</div>
          <div className="hw-eyebrow hw-reveal">Jobs To Be Done &amp; User Stories</div>
          <h2 className="hw-h2 hw-reveal" id="h-phase3">From post-its to user flows</h2>
          <p className="hw-p hw-reveal">
            We listed every job Trey might need to complete — then mapped them into a flow the
            entire team could see and align on before committing to screens.
          </p>
          <HwImage
            src="/hive-wellness/Untitled.jpeg"
            alt="JTBD board mapping all tasks a user might take — Define, Locate, Prepare, Confirm, Monitor, Execute, Modify, Conclude"
            caption="Jobs to be done — every task mapped across 8 action stages"
          />

          {/* User stories */}
          <div className="hw-h3 hw-reveal">Using user stories to think like a user</div>
          <p className="hw-p hw-reveal">
            Together with the PM, we framed bite-sized user stories — keeping every design
            decision grounded in what Trey is actually trying to get done.
          </p>
          <ul className="hw-stories hw-reveal" role="list">
            {[
              'As a user, I want to book an appointment for a consultation',
              'As a user, I want to connect with someone who can guide me about my health issues',
              'As a user, I want to track my own wellness',
              'As a user, I want to monitor my wellness plan and courses',
            ].map((s) => <li className="hw-story" key={s}>{s}</li>)}
          </ul>

          {/* Brainstorming */}
          <div className="hw-h3 hw-reveal">Sticky notes to the rescue</div>
          <p className="hw-p hw-reveal">
            We visualised different use cases on Miro — user logged in, plan selected, branching
            into courses, products, wellness tracker, and back to dashboard.
          </p>
          <HwImage
            src="/hive-wellness/Untitled%202.png"
            alt="Miro board showing yellow sticky note flows for user logged in, plan selected, and branching paths to Course, Products, Wellness tracker"
            caption="Brainstormed user flow — post-login pathways"
          />
        </section>

        {/* ── 05  PHASE 5 — ITERATIONS ── */}
        <section className="hw-section" id="hw-phase5" data-phase="phase5" aria-labelledby="h-phase5">
          <div className="hw-bg-num" aria-hidden="true">05</div>
          <div className="hw-phase hw-reveal">Phase 5</div>
          <div className="hw-eyebrow hw-reveal">Design &amp; Iterations</div>
          <h2 className="hw-h2 hw-reveal" id="h-phase5">Designing through uncertainty</h2>
          <p className="hw-p hw-reveal">
            With significant ambiguity in the brief, we went through many iterations — each round
            passing through feedback loops before arriving at a solution worth building.
          </p>
          <HwImage
            src="/hive-wellness/Untitled%203.png"
            alt="Initial iterations showing four phone mockups: Video list, Landing page, Chat UI, and Course detail — all labelled Initial iterations"
            caption="Initial iterations — Video list · Landing page · Chat UI · Course detail"
          />
          <div className="hw-insight hw-reveal">
            <p>
              These iterations weren't finalised because they weren't capturing the user experience
              in its whole essence yet. Each feedback loop pushed the design closer to something
              that <strong>actually matched Trey's mental model.</strong>
            </p>
          </div>

          {/* Before / After */}
          <div className="hw-h3 hw-reveal">What we changed — and why</div>
          <p className="hw-p hw-reveal">
            User testing surfaced real problems. Here are two key changes we made.
          </p>
          <div className="hw-ba hw-reveal" role="list">
            <div className="hw-ba-card before" role="listitem">
              <div className="hw-ba-label">✗ Before — Landing Screen</div>
              <div className="hw-ba-title">"Better health starts here."</div>
              <p className="hw-ba-body">Sounded nice but told users nothing about what the app does or how to start. Vague headline, single button.</p>
            </div>
            <div className="hw-ba-card after" role="listitem">
              <div className="hw-ba-label">✓ After — Improved</div>
              <div className="hw-ba-title">"All things about your wellness"</div>
              <p className="hw-ba-body">Clear categories, immediate clarity on what Hive offers. Users could self-select their path right away.</p>
            </div>
          </div>
          <div className="hw-ba hw-reveal" style={{ marginTop: '14px' }} role="list">
            <div className="hw-ba-card before" role="listitem">
              <div className="hw-ba-label">✗ Before — Chatbot</div>
              <div className="hw-ba-title">Tips shown between questions</div>
              <p className="hw-ba-body">Well-intentioned but distracted users during the assessment — increased cognitive load at the worst moment.</p>
            </div>
            <div className="hw-ba-card after" role="listitem">
              <div className="hw-ba-label">✓ After — Simplified</div>
              <div className="hw-ba-title">One thing at a time</div>
              <p className="hw-ba-body">Removed tips entirely. Focus on the question in front of you. Completion rates improved noticeably.</p>
            </div>
          </div>
        </section>

        {/* ── 06  VISUAL DESIGNS ── */}
        <section className="hw-section" id="hw-designs" data-phase="designs" aria-labelledby="h-designs">
          <div className="hw-bg-num" aria-hidden="true">06</div>
          <div className="hw-phase hw-reveal">Final Solution</div>
          <div className="hw-eyebrow hw-reveal">Visual Designs</div>
          <h2 className="hw-h2 hw-reveal" id="h-designs">Holistic health control — guided at every step</h2>
          <p className="hw-p hw-reveal">
            The purpose of the final flow: <strong>connect the user with the right guidance</strong> and
            walk them towards a wellness plan — allowing Trey to take holistic care of his own health
            at the end of the survey.
          </p>

          <HwImage
            src="/hive-wellness/Untitled%204.png"
            alt="All final app screens showing the complete Hive Wellness design — survey, wellness plan, appointments, courses, dashboard, and tracker"
            caption="All screens — complete design system"
          />

          {/* Five core features — showcase cards */}
          <div className="hw-h3 hw-reveal">Five features that define Hive</div>
          <div className="hw-feat-cards hw-reveal" role="list" aria-label="Core app features">
            {FEATURES.map((f) => (
              <div
                className={`hw-feat-card${f.num === '05' ? ' full' : ''}`}
                role="listitem"
                key={f.num}
              >
                <div className="hw-feat-card-header">
                  <div className="hw-feat-card-icon" style={{ background: f.bg }} aria-hidden="true">{f.icon}</div>
                  <span className="hw-feat-card-num" style={{ color: f.color, borderColor: f.border }}>{f.num}</span>
                </div>
                <div className="hw-feat-card-title">{f.title}</div>
                <p className="hw-feat-card-body">{f.body}</p>
              </div>
            ))}
          </div>

          {/* Suggesting plans */}
          <HwImage
            src="/hive-wellness/Untitled%205.png"
            alt="Suggesting personalised wellness plans that suit the user after they complete the survey"
            caption="Suggesting plans that suit the user after the survey"
          />

          {/* Survey flow */}
          <div className="hw-h3 hw-reveal">Guided survey &amp; appointment booking</div>
          <p className="hw-p hw-reveal">
            No more than 7–9 questions — so as to not overload the user's mind.
            The chat guides Trey step by step and nudges him to book once he has clarity.
          </p>
          <div className="hw-img-grid">
            <HwImage
              src="/hive-wellness/Untitled%206.png"
              alt="User taking a health survey through a friendly conversational chat interface"
              caption="User taking a survey"
            />
            <HwImage
              src="/hive-wellness/Untitled%207.png"
              alt="User books an appointment with a healthcare provider based on survey results"
              caption="User books appointment"
            />
          </div>

          {/* Wellness course */}
          <div className="hw-h3 hw-reveal">Wellness course — earn points while you learn</div>
          <p className="hw-p hw-reveal">
            Personalised courses with progress tracking. Wellness points gamify engagement and
            motivate course completion. We included this to motivate users towards learning
            more about their health.
          </p>
          <HwImage
            src="/hive-wellness/Untitled%208.png"
            alt="Course details screen showing wellness course content, progress bar, and completion tracking"
            caption="Course details — track progress &amp; earn points"
          />

          {/* Dashboard */}
          <div className="hw-h3 hw-reveal">One dashboard to view progress, track and take action</div>
          <p className="hw-p hw-reveal">
            The key touchpoint after sign-up. Designed to keep Trey aware of his course progress,
            upcoming appointments, sleep and step tracking — without hunting through separate screens.
          </p>
          <HwImage
            src="/hive-wellness/Untitled%209.png"
            alt="Main dashboard screen showing course progress, upcoming appointments, wellness tracking summary"
            caption="One dashboard to view progress, track and take action"
          />

          {/* Wellness tracker */}
          <div className="hw-h3 hw-reveal">Wellness tracker — simple, visual, actionable</div>
          <p className="hw-p hw-reveal">
            Sleep and steps tracked with a simple toggle. Graphical representation makes data
            easy to read. Typography creates a clear focal hierarchy.
          </p>
          <HwImage
            src="/hive-wellness/Untitled%2010.png"
            alt="Wellness tracker screen with graphical sleep and steps data, toggle controls, and visual hierarchy"
            caption="Suggesting plans that suit the user after the survey"
          />
        </section>

        {/* ── 07  OUTCOME ── */}
        <section className="hw-section" id="hw-outcome" data-phase="outcome" aria-labelledby="h-outcome">
          <div className="hw-bg-num" aria-hidden="true">07</div>
          <div className="hw-phase hw-reveal">Results</div>
          <div className="hw-eyebrow hw-reveal">Outcome</div>
          <h2 className="hw-h2 hw-reveal" id="h-outcome">The prototype opened real doors</h2>

          <div className="hw-outcome hw-reveal">
            <p>
              The show-and-tell prototype and designs helped the client take a proposal to{' '}
              <strong>potential investors</strong> — telling a compelling story about how their solution
              might reduce time to market. This is yet to be pushed to production. 🎯
            </p>
          </div>

          <div className="hw-stats hw-reveal" role="list">
            <div className="hw-stat" role="listitem"><div className="hw-stat-n">6</div><div className="hw-stat-l">Week Sprint</div></div>
            <div className="hw-stat" role="listitem"><div className="hw-stat-n">5</div><div className="hw-stat-l">Core Flows</div></div>
            <div className="hw-stat" role="listitem"><div className="hw-stat-n">POC</div><div className="hw-stat-l">Investor Ready</div></div>
          </div>

          <div className="hw-h3 hw-reveal">What I took away</div>
          <div className="hw-insight hw-reveal">
            <p>✨ The domain was fascinating — it helped me understand a different aspect of healthcare and its gaps, and how one can design by <strong>keeping the end patient front and centre.</strong></p>
          </div>
          <div className="hw-reflection hw-reveal">
            <div className="hw-ref-title">Takeaway 1 — How to deal with ambiguity</div>
            <p className="hw-ref-body">This was an MVP idea and there was a lot of ambiguity involved. I had to stay close to the client's needs while advocating for the user — a balancing act that sharpened every design decision.</p>
          </div>
          <div className="hw-reflection hw-reveal">
            <div className="hw-ref-title">Takeaway 2 — Change is inevitable</div>
            <p className="hw-ref-body">Constant changes made convergence hard. I learned to commit to one direction per sprint, use feedback to improve, and keep the team moving rather than cycling indefinitely.</p>
          </div>

          <div className="hw-end hw-reveal">
            <p>Thanks for reading! If you want to talk through this project, I'd love to connect.</p>
            <button className="btn btn-lime" onClick={onBack} ref={btnRef} {...btnHandlers} style={{ padding: '14px 40px', fontSize: '15px' }}>
              ← Back to Portfolio
            </button>
          </div>
        </section>

      </main>
    </div>
  )
}
