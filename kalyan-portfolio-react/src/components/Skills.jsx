const skills = [
  { num: '01', icon: '🔍', name: 'UX Research', desc: 'Interviews · Usability Testing · Journey Mapping · Affinity Diagrams' },
  { num: '02', icon: '🎨', name: 'Visual Design', desc: 'Figma · Component Libraries · Style Guides · Design Systems' },
  { num: '03', icon: '⚡', name: 'Micro-interactions', desc: 'Prototyping · Lottie · Motion Design · State Transitions' },
  { num: '04', icon: '📊', name: 'Dashboard UX', desc: 'B2B Dashboards · Data Viz · Complex Workflows · Analytics' },
  { num: '05', icon: '🤖', name: 'AI Interfaces', desc: 'Conversation UX · AI Onboarding · ML-driven Products' },
  { num: '06', icon: '💳', name: 'Fintech UX', desc: 'Trust Signals · Security UX · Financial Flows · Onboarding' },
]

export default function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="eyebrow" aria-hidden="true">Capabilities</div>
      <h2 className="sec-title rw" id="skills-title">
        <span className="w"><span className="wi">What</span></span>
        <span className="w"><span className="wi">I</span></span>
        <span className="w"><span className="wi">Bring</span></span>
        <span className="w"><span className="wi">to</span></span>
        <span className="w"><span className="wi">the</span></span>
        <span className="w"><span className="wi">Table</span></span>
      </h2>
      <div className="sk-grid">
        {skills.map((s, i) => (
          <div
            className="sk-card rev"
            style={{ transitionDelay: `${i * 0.08}s` }}
            key={s.num}
          >
            <div className="sk-num">{s.num}</div>
            <span className="sk-icon" aria-hidden="true">{s.icon}</span>
            <h3 className="sk-name">{s.name}</h3>
            <p className="sk-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
