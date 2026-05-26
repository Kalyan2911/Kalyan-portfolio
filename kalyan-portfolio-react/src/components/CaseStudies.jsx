import useCardTilt from '../hooks/useCardTilt'

/* ── Mockup widgets ── */

// Desktop dashboard (Cacheflow / Textractive)
function MockChart({ heights }) {
  return (
    <>
      <div className="cml m" />
      <div className="cml s" />
      <div className="cbars">
        {heights.map((h, i) => <div className="cbar" key={i} style={{ height: `${h}%` }} />)}
      </div>
    </>
  )
}

// Mobile app layout (Hive Wellness)
function MockMobile() {
  return (
    <>
      {/* Notch */}
      <div style={{ height: '5px', width: '38%', margin: '0 auto 10px', background: 'rgba(255,255,255,.25)', borderRadius: '10px' }} />
      {/* App title bar */}
      <div className="cml m" />
      {/* Two stat tiles */}
      <div style={{ display: 'flex', gap: '5px', marginTop: '8px' }}>
        <div style={{ flex: 1, height: '30px', background: 'rgba(255,255,255,.18)', borderRadius: '8px' }} />
        <div style={{ flex: 1, height: '30px', background: 'rgba(255,255,255,.12)', borderRadius: '8px' }} />
      </div>
      {/* Progress bar */}
      <div style={{ marginTop: '8px', height: '5px', background: 'rgba(255,255,255,.12)', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ width: '68%', height: '100%', background: 'rgba(255,255,255,.45)', borderRadius: '10px' }} />
      </div>
    </>
  )
}

// Product grid (I2O Retail)
function MockGrid() {
  return (
    <>
      <div className="cml m" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', marginTop: '8px' }}>
        {[1, 2, 3, 4].map(n => (
          <div key={n} style={{ height: '26px', background: 'rgba(255,255,255,.18)', borderRadius: '5px' }} />
        ))}
      </div>
    </>
  )
}

/* ── Four cards ── */

function CacheflowCard({ delay }) {
  const [tiltRef, tiltHandlers] = useCardTilt()
  return (
    <article
      className="case-card rev"
      style={{ transitionDelay: delay }}
      ref={tiltRef}
      {...tiltHandlers}
      aria-label="Cacheflow — coming soon"
    >
      <div className="cci cg1">
        <div className="cmock" aria-hidden="true">
          <MockChart heights={[40, 80, 55, 100, 65]} />
        </div>
        <div className="ctags"><span className="ctag">SaaS</span><span className="ctag">B2B</span></div>
        <h3 className="cname">CACHEFLOW</h3>
        <p className="cdesc">Redesigning a SaaS sales experience as smooth as a Netflix subscription.</p>
        <span className="clink" style={{ opacity: .45, pointerEvents: 'none' }} aria-label="Coming soon">
          Coming Soon <span className="la" aria-hidden="true">→</span>
        </span>
      </div>
    </article>
  )
}

function TextractiveCard({ onOpen, delay }) {
  const [tiltRef, tiltHandlers] = useCardTilt()
  return (
    <article className="case-card rev" style={{ transitionDelay: delay }} ref={tiltRef} {...tiltHandlers} aria-label="Textractive case study">
      <div className="cci cg2">
        <div className="cmock" aria-hidden="true">
          <MockChart heights={[60, 100, 45, 75, 88]} />
        </div>
        <div className="ctags"><span className="ctag">AI</span><span className="ctag">B2B</span></div>
        <h3 className="cname">TEXTRACTIVE</h3>
        <p className="cdesc">AI-Powered Debt Collection UX — as smooth as ordering your morning coffee.</p>
        <button className="clink" onClick={onOpen} aria-label="View Textractive case study">
          View Case Study <span className="la" aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  )
}

function HiveCard({ onOpen, delay }) {
  const [tiltRef, tiltHandlers] = useCardTilt()
  return (
    <article
      className="case-card rev"
      style={{ transitionDelay: delay }}
      ref={tiltRef}
      {...tiltHandlers}
      aria-label="Hive Wellness case study"
    >
      <div className="cci cg3">
        <div className="cmock" aria-hidden="true">
          <MockMobile />
        </div>
        <div className="ctags"><span className="ctag">HealthTech</span><span className="ctag">Mobile</span></div>
        <h3 className="cname">HIVE WELLNESS</h3>
        <p className="cdesc">Personal Trainer, Nutritionist &amp; Doctor — all under one roof.</p>
        <button className="clink" onClick={onOpen} aria-label="View Hive Wellness case study">
          View Case Study <span className="la" aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  )
}

function I2OCard({ delay }) {
  const [tiltRef, tiltHandlers] = useCardTilt()
  return (
    <article
      className="case-card rev"
      style={{ transitionDelay: delay }}
      ref={tiltRef}
      {...tiltHandlers}
      aria-label="I2O Retail — coming soon"
    >
      <div className="cci cg4">
        <div className="cmock" aria-hidden="true">
          <MockGrid />
        </div>
        <div className="ctags"><span className="ctag">Retail</span><span className="ctag">E-Commerce</span></div>
        <h3 className="cname">I2O RETAIL</h3>
        <p className="cdesc">Amazon brand promotion as easy as setting a smart home alarm.</p>
        <span className="clink" style={{ opacity: .45, pointerEvents: 'none' }} aria-label="Coming soon">
          Coming Soon <span className="la" aria-hidden="true">→</span>
        </span>
      </div>
    </article>
  )
}

export default function CaseStudies({ onOpenHive, onOpenTextractive }) {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="eyebrow" aria-hidden="true">Case Studies</div>
      <h2 className="sec-title rw" id="work-title">
        <span className="w"><span className="wi">Work</span></span>
        <span className="w"><span className="wi">that</span></span>
        <span className="w"><span className="wi">started</span></span>
        <span className="w"><span className="wi">with</span></span>
        <span className="w"><span className="wi">'Can</span></span>
        <span className="w"><span className="wi">I</span></span>
        <span className="w"><span className="wi">do</span></span>
        <span className="w"><span className="wi">this?'</span></span>
      </h2>
      <div className="cases-grid">
        <TextractiveCard onOpen={onOpenTextractive} delay="0s" />
        <HiveCard onOpen={onOpenHive} delay=".12s" />
        <CacheflowCard delay=".24s" />
        <I2OCard delay=".36s" />
      </div>
    </section>
  )
}
