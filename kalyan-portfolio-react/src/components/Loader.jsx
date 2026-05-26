import { useEffect, useState } from 'react'

export default function Loader() {
  const [cls, setCls] = useState('')

  useEffect(() => {
    const t1 = setTimeout(() => setCls('fill'), 100)
    const t2 = setTimeout(() => setCls('fill done'), 1600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div id="loader" className={cls} aria-hidden="true">
      <div className="loader-text">
        K<span className="loader-fill">ALYAN</span>
      </div>
    </div>
  )
}
