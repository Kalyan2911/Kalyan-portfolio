const entries = [
  {
    date: 'Sep 2025 – Present',
    role: 'Senior Digital Solution Designer', company: 'Divami Design Labs',
    logo: '/logos/divami.png',
    desc: 'Built and shipped AI-powered enterprise workflows — from ML-validated invoice evaluation to TPRM automation — integrating Claude Code and Figma Make to cut prototype-to-handoff time by 40%.',
    chips: ['Enterprise Design', 'AI Workflows', 'Design Systems'],
  },
  {
    date: 'Jul 2024 – Dec 2024',
    role: 'UI/UX Designer & QA Tester', company: 'IT Tree Ltd', freelance: true,
    logo: '/logos/it-tree.png',
    desc: "Owned manual QA for online betting and door manufacturing platforms — wrote and executed test cases, ran regression cycles, and brought a designer's lens to surface usability and accessibility gaps.",
    chips: ['QA Testing', 'Usability Audits'],
  },
  {
    date: 'Jul 2023 – Mar 2024',
    role: 'UI/UX Designer', company: 'Krishnaag Business Enterprise (IT Tree Limited)',
    logo: '/logos/it-tree.png',
    desc: 'Designed an e-commerce and healthcare platform grounded in 10+ user interviews and stakeholder discussions, iterating through multiple usability testing rounds with 8–10 users per cycle.',
    chips: ['Stakeholder Interviews', 'Usability Testing', 'B2B SaaS'],
  },
  {
    date: 'Dec 2019 – Oct 2021',
    role: 'UX Designer', company: 'Zemoso Technologies',
    logo: '/logos/zemoso.png',
    desc: 'Created and maintained 10+ design systems across 3 enterprise products — fintech, AI call monitoring, and home renovation — while mentoring 4 interns and authoring 5+ design playbooks.',
    chips: ['Design Systems', 'Fintech', 'AI Products'],
  },
  {
    date: 'Feb 2018 – Sep 2019',
    role: 'Visual Designer', company: 'Teestory.in', freelance: true,
    logo: '/logos/teestory.png',
    desc: 'Designed website & app interfaces across 12+ core screens, analysed sales patterns, and aligned apparel collections to top-performing styles — boosting sales by 27% over the campaign period.',
    chips: ['E-Commerce', 'Web Design', '+27% Sales 🚀'],
  },
  {
    date: 'Jun 2017 – Aug 2017',
    role: 'UI/UX Designer', company: 'YuppTV',
    logo: '/logos/yupptv.png',
    desc: "Designed user interfaces aligned with brand guidelines across 2 product modules for India's leading OTT platform, recognised for innovative solutions and fast iteration on stakeholder feedback.",
    chips: ['Brand Design', 'OTT Platform'],
  },
]

export default function Timeline() {
  return (
    <section className="section section-alt" id="journey" aria-labelledby="journey-title">
      <div className="eyebrow" aria-hidden="true">Experience</div>
      <h2 className="sec-title rw" id="journey-title">
        <span className="w"><span className="wi">The</span></span>
        <span className="w"><span className="wi">Roadmap</span></span>
        <span className="w"><span className="wi">of</span></span>
        <span className="w"><span className="wi">My</span></span>
        <span className="w"><span className="wi">Journey</span></span>
      </h2>
      <ol className="exp-list" role="list">
        {entries.map((e, i) => {
          const isNow = i === 0
          return (
            <li className="exp-item" role="listitem" key={i}>
              <div className="exp-meta">
                {e.logo && (
                  <img
                    src={e.logo}
                    alt={`${e.company} logo`}
                    className="exp-logo"
                    loading="lazy"
                    onError={(ev) => { ev.currentTarget.style.display = 'none' }}
                  />
                )}
              </div>
              <div className="exp-body">
                <div className="exp-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
                <div className="exp-header">
                  <span className="exp-date">{e.date}</span>
                  {isNow && (
                    <span className="exp-now">
                      <span className="exp-now-dot" aria-hidden="true" />
                      Now
                    </span>
                  )}
                </div>
                <h3 className="exp-role">{e.role}</h3>
                <div className="exp-company">
                  <span className="exp-company-name">{e.company}</span>
                  {e.freelance && <span className="exp-freelance">Freelance</span>}
                </div>
                <p className="exp-desc">{e.desc}</p>
                <div className="exp-chips">
                  {e.chips.map((chip) => (
                    <span className="exp-chip" key={chip}>{chip}</span>
                  ))}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
