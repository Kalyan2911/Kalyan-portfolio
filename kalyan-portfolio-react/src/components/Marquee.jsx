const items = [
  'UX Research', 'Visual Design', 'Micro Interactions', 'Design Systems',
  'Prototyping', 'Dashboard UX', 'AI Interfaces', 'Fintech UX',
  'Wireframing', 'User Testing',
  'UX Research', 'Visual Design', 'Micro Interactions', 'Design Systems',
  'Prototyping', 'Dashboard UX', 'AI Interfaces', 'Fintech UX',
]

export default function Marquee() {
  return (
    <div className="mq-wrap" aria-hidden="true">
      <div className="mq-inner">
        {items.map((item, i) => (
          <span className="mq-item" key={i}>
            {item} <span className="mq-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
