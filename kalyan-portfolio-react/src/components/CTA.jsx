import useMagnetic from '../hooks/useMagnetic'

const LINKEDIN_URL = 'https://www.linkedin.com/in/kalyan-reddy-b116a9168/'

export default function CTA() {
  const [helloRef, helloHandlers] = useMagnetic()
  const [linkedinRef, linkedinHandlers] = useMagnetic()

  return (
    <section className="cta-sec" id="cta" aria-labelledby="cta-title">
      <div className="cta-glow" aria-hidden="true" />
      <div className="cta-kicker" aria-hidden="true">Let's Connect</div>
      <h2 className="cta-head" id="cta-title">
        <span className="cta-dim">WAIT,</span><br />
        YOU'RE STILL<br />
        <span className="cta-bright">HERE?</span>
      </h2>
      <p className="cta-sub">
        That's some serious commitment 🏆 — let's turn this scroll session into something epic.
      </p>
      <div className="cta-btns">
        <a
          href="mailto:kalyan@email.com"
          className="btn btn-lime"
          style={{ fontSize: '15px', padding: '15px 36px' }}
          ref={helloRef}
          {...helloHandlers}
        >
          Say Hello 👋
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
          style={{ fontSize: '15px', padding: '15px 36px' }}
          aria-label="Open Kalyan Reddy LinkedIn profile in a new tab"
          ref={linkedinRef}
          {...linkedinHandlers}
        >
          LinkedIn <span className="barr" aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  )
}
