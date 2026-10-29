import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { config } from '../config.js'

export default function Marquee() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.marquee-inner', { xPercent: -50, duration: 40, ease: 'none', repeat: -1 })
    }, root)
    return () => ctx.revert()
  }, [])

  const unit = `${config.groom} ♥ ${config.bride} ✦ `
  return (
    <div className="marquee" ref={root} aria-hidden="true">
      <div className="marquee-inner">
        <span>{unit.repeat(8)}</span>
        <span>{unit.repeat(8)}</span>
      </div>
    </div>
  )
}
