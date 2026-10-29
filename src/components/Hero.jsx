import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GoldDust from './GoldDust.jsx'
import { config } from '../config.js'

gsap.registerPlugin(ScrollTrigger)

function Mandala() {
  return (
    <svg className="mandala" viewBox="-200 -200 400 400" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="0.6">
        {Array.from({ length: 24 }).map((_, i) => (
          <ellipse key={i} cx="0" cy="-92" rx="17" ry="92" transform={`rotate(${i * 15})`} />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse key={`b${i}`} cx="0" cy="-150" rx="10" ry="34" transform={`rotate(${i * 30 + 15})`} />
        ))}
        <circle r="190" /><circle r="120" /><circle r="56" /><circle r="196" strokeDasharray="1 5" />
      </g>
    </svg>
  )
}

function ArchOrnament() {
  return (
    <svg viewBox="-50 -60 100 120" className="arch-orn" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="0.8">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
          <ellipse key={r} cx="0" cy="-17" rx="7" ry="17" transform={`rotate(${r})`} />
        ))}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((r) => (
          <ellipse key={r} cx="0" cy="-11" rx="4.4" ry="10" transform={`rotate(${r})`} />
        ))}
        <circle r="6" /><circle r="2" fill="currentColor" />
        <path d="M-44 46 Q0 20 44 46" /><path d="M-30 52 Q0 34 30 52" />
      </g>
    </svg>
  )
}

export default function Hero({ ready }) {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero .rev', { opacity: 0, y: 40 })
      gsap.set('.hero .ch', { yPercent: 115 })
      gsap.set('.mandala', { opacity: 0, scale: 0.85 })
      gsap.to('.mandala', { rotate: 360, duration: 180, repeat: -1, ease: 'none' })
      gsap.to('.hero-inner', {
        yPercent: 14, opacity: 0.15, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to('.mandala', { opacity: 0.55, scale: 1, duration: 2.6, ease: 'power2.out' }, 0)
        .to('.hero .rev', { opacity: 1, y: 0, duration: 1.4, stagger: 0.18 }, 0.4)
        .to('.hero .ch', { yPercent: 0, stagger: 0.035, duration: 1.2 }, 0.9)
    }, root)
    return () => ctx.revert()
  }, [ready])

  const split = (s) =>
    s.split('').map((c, i) => (
      <span className="ch-wrap" key={i}>
        <span className="ch">{c === ' ' ? ' ' : c}</span>
      </span>
    ))

  return (
    <section className="hero" id="top" ref={root}>
      <Mandala />
      <GoldDust />
      <div className="hero-inner">
        <p className="eyebrow rev">WITH THE BLESSINGS OF OUR FAMILIES</p>
        <div className="arch rev">
          {config.heroImage ? (
            <img src={config.heroImage} alt={`${config.groom} and ${config.bride}`} />
          ) : (
            <div className="arch-ph">
              <ArchOrnament />
              <span className="arch-mono">{config.monogram}</span>
            </div>
          )}
        </div>
        <h2 className="hero-names" aria-label={`${config.groom} & ${config.bride}`}>
          <span className="line">{split(config.groom)}</span>
          <span className="amp rev">&amp;</span>
          <span className="line">{split(config.bride)}</span>
        </h2>
        <p className="tagline rev">{config.tagline}</p>
        <div className="datechip rev">
          <i /><span>{config.headline}</span><i />
        </div>
      </div>
      <div className="scroll-hint rev"><span>SCROLL</span><i /></div>
    </section>
  )
}
