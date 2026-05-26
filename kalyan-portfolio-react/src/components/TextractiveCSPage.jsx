import { useEffect, useRef, useState } from 'react'
import '../CaseStudyPage.css'
import './TextractiveCSPage.css'
import useMagnetic from '../hooks/useMagnetic'

/* ─── TOC ─── */
const TOC = [
  { id: 'tx-phase1',     label: 'Phase 1' },
  { id: 'tx-phase2',     label: 'Phase 2' },
  { id: 'tx-howitworks', label: 'How it works' },
  { id: 'tx-phase3',     label: 'Phase 3' },
  { id: 'tx-outcome',    label: 'Results' },
]

/* ─── Bare image — shown directly, no figure/caption container ─── */
function TxImg({ src, alt }) {
  return <img className="tx-img-bare hw-reveal" src={src} alt={alt} loading="lazy" />
}

/* ─── Platform concepts (used in "How it works") ─── */
const PLATFORM_CONCEPTS = [
  { term: 'Workspace', body: 'A folder for your AI project. Everything you build lives in here.' },
  { term: 'Conversation model', body: 'The AI you are teaching. You can have one or more — each focused on a different part of the business.' },
  { term: 'Signals', body: "The specific things you want the AI to spot in a conversation — for example, 'promise to pay', 'dispute', or 'request to delay'. Each signal has its own setup." },
  { term: 'Phrases', body: 'Example sentences that train each signal. The more variety, the better the AI gets at spotting it.' },
  { term: 'AI Suggestions', body: 'Instead of typing every phrase yourself, the AI suggests them based on real conversations it has already seen. You keep what works, drop what does not.' },
  { term: 'Test model', body: 'A built-in chat box where you paste a sample conversation and see what the AI does with it. No real customers involved.' },
  { term: 'Sandbox', body: 'The whole safe area where you can try things, break things and fix things without affecting live calls.' },
  { term: 'Test cases', body: 'Saved example conversations you can re-run anytime — like a checklist for your AI. Handy for checking that a new change did not break anything.' },
  { term: 'Executions', body: 'A history of every test run. Open any past run and see exactly what the AI saw and what it picked up.' },
  { term: 'Deployments', body: 'When the AI is ready, you push it live so it starts working on real calls. Every push is saved as a version — roll back in seconds if anything goes wrong.' },
  { term: 'Insights', body: 'The dashboard. Shows how accurate the AI is, where it is working well, and where it needs more training.' },
]

/* ─── IA node component ─── */
function IANode({ label, sub, accent }) {
  return (
    <div className="tx-ia-node" style={{ borderColor: accent || undefined }}>
      <div className="tx-ia-label" style={{ color: accent || undefined }}>{label}</div>
      {sub && sub.map((s) => <div className="tx-ia-sub" key={s}>{s}</div>)}
    </div>
  )
}

/* ─── Main component ─── */
export default function TextractiveCSPage({ onBack }) {
  const progRef = useRef(null)
  const pageRef = useRef(null)
  const [activeId, setActiveId] = useState('tx-phase1')
  const [backRef, backHandlers] = useMagnetic()
  const [btnRef,  btnHandlers]  = useMagnetic()

  useEffect(() => { window.scrollTo(0, 0); setTimeout(() => pageRef.current?.focus(), 100) }, [])

  /* Reading progress */
  useEffect(() => {
    const handler = () => {
      const el = progRef.current; if (!el) return
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      el.style.transform = `scaleX(${Math.min(pct, 1)})`
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  /* Active TOC */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id) }),
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    TOC.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  /* Scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('vis') }),
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
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
      <div className="hw-topbar tx-topbar" role="banner">
        <button className="hw-back" onClick={onBack} aria-label="Back to portfolio" ref={backRef} {...backHandlers}>
          <span className="hw-back-arr" aria-hidden="true">←</span> Portfolio
        </button>
        <span className="hw-topbar-label" aria-hidden="true">Textractive</span>
        <span className="hw-topbar-logo" aria-hidden="true">K<span>.</span></span>
      </div>

      {/* Reading progress */}
      <div className="hw-progress tx-progress" ref={progRef} role="progressbar"
        aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" aria-label="Reading progress" />

      {/* ── Hero ── */}
      <header className="hw-hero tx-hero">
        <div className="tx-hero-orb1" aria-hidden="true" />
        <div className="tx-hero-orb2" aria-hidden="true" />
        <div className="hw-hero-inner">
          <div className="hw-tags" aria-label="Project tags">
            {['AI · SaaS', 'B2B Enterprise', 'Client Project', 'UX Design', '6-Week Sprint'].map((t) => (
              <span className="hw-tag tx-tag" key={t}>{t}</span>
            ))}
          </div>
          <h1 className="hw-hero-title tx-hero-title">TEXTRACTIVE</h1>
          <p className="hw-hero-summary">
            An <strong>AI assistant</strong> for customer-collection teams. It listens to calls,
            pulls out the key details — names, dates, amounts, what the customer agreed to — and
            writes a clean summary. <strong>Saves agents about 25 minutes a day.</strong>
          </p>
          <div className="hw-meta" role="list" aria-label="Project details">
            <div className="hw-mi" role="listitem">
              <div className="hw-mi-label">My Role</div>
              <div className="hw-mi-val">UX Research · UI Design · Prototype</div>
            </div>
            <div className="hw-mi" role="listitem">
              <div className="hw-mi-label">Team</div>
              <div className="hw-mi-val">Me + one UX designer</div>
            </div>
            <div className="hw-mi" role="listitem">
              <div className="hw-mi-label">Duration</div>
              <div className="hw-mi-val">6 weeks · 100+ screens</div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Sticky tab bar ── */}
      <nav className="hw-tabbar tx-tabbar" aria-label="Jump to section">
        {TOC.map((item) => (
          <button
            key={item.id}
            className={`hw-tab${activeId === item.id ? ' active' : ''}`}
            onClick={() => scrollTo(item.id)}
            aria-current={activeId === item.id ? 'true' : undefined}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main id="main-content">

        {/* ── 01  PHASE 1 — Problem + Design Process + Understanding ── */}
        <section className="hw-section" id="tx-phase1" data-phase="phase1" aria-labelledby="h-tx-phase1">
          <div className="hw-bg-num" aria-hidden="true">01</div>
          <div className="hw-phase hw-reveal">Phase 1</div>
          <div className="hw-eyebrow hw-reveal">Setting the scene</div>
          <h2 className="hw-h2 hw-reveal" id="h-tx-phase1">The problem, the plan, and the system we were designing for</h2>

          {/* Problem Statement */}
          <div className="hw-h3 hw-reveal">Problem Statement</div>
          <p className="hw-p hw-reveal">
            Our FinTech client's collection team talked to <strong>hundreds of customers every day</strong>.
            After every call, agents had to write down what was said — what the customer agreed to pay,
            by when, and the next steps. It was slow, easy to miss details, and every agent wrote things
            up in a slightly different way.
          </p>
          <p className="hw-p hw-reveal">
            The company wanted AI to do this work — listen to the call, pick out the important details,
            and write a clean summary. But there was a catch: every small update to the AI needed an
            engineer, so product managers were stuck waiting weeks for any change.
          </p>
          <div className="hw-hmw hw-reveal">
            <p className="hw-hmw-text">
              <em>"How might we let an AI listen to these calls, pull out the important details, and
              let product managers update it themselves — without needing engineers every time?"</em>
            </p>
          </div>

          {/* Design Process */}
          <div className="hw-h3 hw-reveal">Design Process</div>
          <p className="hw-p hw-reveal">
            We followed a five-step process so we never jumped into design before we truly understood
            the user and the problem.
          </p>
          <TxImg
            src="/textractive/design-process.png"
            alt="Five-step design process: 1. Understanding the system, 2. Research/Ideation, 3. Define, 4. Design, 5. Testing"
          />

          {/* Understanding the System */}
          <div className="hw-h3 hw-reveal">Understanding the System</div>
          <p className="hw-p hw-reveal">
            Before sketching anything, we sat with the engineering team to understand how the AI
            actually read conversations — what it could do well, what it struggled with, and what
            data-privacy rules we had to follow. Three things had to be true for the product to succeed:
          </p>
          <ul className="hw-stories hw-reveal" role="list">
            <li className="hw-story"><strong>Usage flexibility</strong> — Product managers and other experts should be able to set up, test and launch the AI on their own.</li>
            <li className="hw-story"><strong>Unique value proposition</strong> — Turn raw customer conversations into useful business summaries, without needing AI engineers in the loop.</li>
            <li className="hw-story"><strong>Clear milestones</strong> — Add more languages, improve accuracy over time, and let users teach the AI brand new things.</li>
          </ul>
          <TxImg
            src="/textractive/understanding-system.png"
            alt="Business goals card: Usage flexibility, Unique value proposition, and the three milestones — multi-language support, accuracy improvement, and the ability to create new intents"
          />
        </section>

        {/* ── 02  PHASE 2 — RESEARCH ── */}
        <section className="hw-section" id="tx-phase2" data-phase="phase2" aria-labelledby="h-tx-phase2">
          <div className="hw-bg-num" aria-hidden="true">02</div>
          <div className="hw-phase hw-reveal">Phase 2</div>
          <div className="hw-eyebrow hw-reveal">Research</div>
          <h2 className="hw-h2 hw-reveal" id="h-tx-phase2">Who we were designing for, and how they would move through the app</h2>

          {/* Persona */}
          <div className="hw-h3 hw-reveal">Persona</div>
          <p className="hw-p hw-reveal">
            Our user is a software product manager at a FinTech company that uses AI to automate parts
            of accounts receivable and treasury work. He knows exactly what the AI should do — but he
            can't make any changes himself. Every update means a ticket to the engineering team and
            another long wait.
          </p>
          <TxImg
            src="/textractive/persona.png"
            alt="Persona board for Pratyush Sunandan, Product Manager — name and designation, goals, activities, pain points, and what we must give him"
          />

          {/* Golden Path */}
          <div className="hw-h3 hw-reveal">Golden Path</div>
          <p className="hw-p hw-reveal">
            The golden path is the one route Pratyush will walk most often through the app. We picked
            it carefully — every other screen had to support this path, not compete with it.
            Login → look at his models → pick one → check the signals → add or edit sample phrases →
            test it → launch it.
          </p>
          <TxImg
            src="/textractive/golden-path.png"
            alt="Golden path flow diagram: Login → View models → Select model → View signals → Select signal → View/edit sample phrases → Test the model → Deploy the model"
          />

          {/* Service Blueprint */}
          <div className="hw-h3 hw-reveal">Service Blueprint</div>
          <p className="hw-p hw-reveal">
            To make sure nothing slipped, we mapped every step of the journey end-to-end — what
            Pratyush does, what the app does in response, what he is probably thinking and feeling at
            each step, and the moments where we could make things easier. This turned vague problems
            into specific, fixable design opportunities.
          </p>
          <TxImg
            src="/textractive/service-blueprint.png"
            alt="Service blueprint mapping tasks, doing, physical evidence, thinking, feeling, frontstage, system, and opportunities across every step of the user journey"
          />

          {/* Information Architecture */}
          <div className="hw-h3 hw-reveal">Information Architecture</div>
          <p className="hw-p hw-reveal">
            We organised the app around how Pratyush thinks, not how engineers think. <strong>One
            workspace, one conversation model, five clear sections.</strong> The first four sections
            live in a Sandbox — a safe practice area. Once everything is ready, the model moves into
            Deployed — live for real calls.
          </p>
          <TxImg
            src="/textractive/information-architecture.png"
            alt="Information architecture diagram: Workspace → Conversation model branching into Signals, API, Test cases, Deployments (all inside Sandbox) and Insights (Deployed)"
          />
        </section>

        {/* ── 03  HOW IT WORKS — Platform concepts explained ── */}
        <section className="hw-section" id="tx-howitworks" data-phase="howitworks" aria-labelledby="h-tx-howitworks">
          <div className="hw-bg-num" aria-hidden="true">03</div>
          <div className="hw-phase hw-reveal">How it works</div>
          <div className="hw-eyebrow hw-reveal">The platform in plain English</div>
          <h2 className="hw-h2 hw-reveal" id="h-tx-howitworks">What every part of the platform does</h2>
          <p className="hw-p hw-reveal">
            Textractive has a few terms you will see again and again. Here is what each one means —
            in plain language.
          </p>
          <dl className="hw-stories hw-reveal" role="list" style={{ listStyle: 'none' }}>
            {PLATFORM_CONCEPTS.map((c) => (
              <li className="hw-story" key={c.term}>
                <strong>{c.term}</strong> — {c.body}
              </li>
            ))}
          </dl>
          <div className="hw-insight hw-reveal">
            <p>
              <strong>How a typical day looks for Pratyush:</strong> he opens his Workspace, picks a
              Conversation model, adds or tweaks a Signal, reviews the AI's suggested Phrases, opens
              the Test model to try a sample call, saves it as a Test case, runs his Executions to
              make sure nothing broke, then Deploys the new version. If something looks off in the
              Insights dashboard a day later, he rolls back to the previous Deployment in seconds.
            </p>
          </div>
        </section>

        {/* ── 04  PHASE 3 — DESIGN ── */}
        <section className="hw-section" id="tx-phase3" data-phase="phase3" aria-labelledby="h-tx-phase3">
          <div className="hw-bg-num" aria-hidden="true">04</div>
          <div className="hw-phase hw-reveal">Phase 3</div>
          <div className="hw-eyebrow hw-reveal">Design</div>
          <h2 className="hw-h2 hw-reveal" id="h-tx-phase3">From paper sketches to 100+ polished screens</h2>

          {/* Paper Sketches */}
          <div className="hw-h3 hw-reveal">Paper Sketches</div>
          <p className="hw-p hw-reveal">
            We ideated based on the research information collected and created a list of "why"
            questions to know what all to be implemented on the interface screens.
          </p>
          <p className="hw-p hw-reveal">
            From the output of many discussions and iterations, we have a starting point of our
            interface screens — a rough sketch of how the primary application screen might look. We
            have identified some of the key takeaways from each iteration and started to implement
            them in the final high-fidelity mockups.
          </p>
          <TxImg
            src="/textractive/paper-sketches.png"
            alt="Paper sketches with pink why-question sticky notes and hand-drawn wireframes for the main app screens, annotated with yellow takeaway notes"
          />

          {/* Final UI Mockups */}
          <div className="hw-h3 hw-reveal">Final UI Mockups</div>
          <p className="hw-p hw-reveal">
            From all the iterations we have evolved the final interface design — Models list (grid
            view), Signals list (grid view), Create model, Empty signal, Adding summary template,
            Archive signal, Phrases added, Test model, Model deployment, Signal deployed, Test cases
            list and Executions. Over 100 screens covering the full product flow.
          </p>
          <TxImg
            src="/textractive/final-mockups.png"
            alt="Final high-fidelity UI mockups for every screen in the product — models list, signals list, create model, summary template, test model with results, deployment, insights dashboard, test cases and executions"
          />
        </section>

        {/* ── 05  RESULTS ── */}
        <section className="hw-section" id="tx-outcome" data-phase="outcome" aria-labelledby="h-tx-outcome">
          <div className="hw-bg-num" aria-hidden="true">05</div>
          <div className="hw-phase hw-reveal">Results</div>
          <div className="hw-eyebrow hw-reveal">Outcome</div>
          <h2 className="hw-h2 hw-reveal" id="h-tx-outcome">Faster calls, fewer notes, happier agents</h2>

          <div className="hw-outcome hw-reveal">
            <p>
              Textractive shipped as a working AI assistant for the FinTech client's collections team.
              Agents stopped writing call notes by hand, and product managers could finally update the
              AI themselves — no engineers needed.
            </p>
          </div>

          <div className="hw-stats hw-reveal" role="list">
            <div className="hw-stat" role="listitem"><div className="hw-stat-n">25 min</div><div className="hw-stat-l">Saved per agent, per day</div></div>
            <div className="hw-stat" role="listitem"><div className="hw-stat-n">5</div><div className="hw-stat-l">Languages supported</div></div>
            <div className="hw-stat" role="listitem"><div className="hw-stat-n">100+</div><div className="hw-stat-l">Screens delivered</div></div>
            <div className="hw-stat" role="listitem"><div className="hw-stat-n">6</div><div className="hw-stat-l">Weeks, start to finish</div></div>
          </div>

          <div className="hw-insight hw-reveal">
            <p>✨ My biggest takeaway: <strong>designing for AI isn't about making the AI look smart — it's about making the person using it feel in charge.</strong></p>
          </div>

          <div className="hw-end hw-reveal">
            <p>Thanks for reading. If you want to dig into any part of this project, I'd love to walk you through it.</p>
            <button className="btn btn-lime" onClick={onBack} ref={btnRef} {...btnHandlers} style={{ padding: '14px 40px', fontSize: '15px' }}>
              ← Back to Portfolio
            </button>
          </div>
        </section>

      </main>
    </div>
  )
}
