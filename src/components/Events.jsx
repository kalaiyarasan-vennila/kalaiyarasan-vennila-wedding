import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { config } from '../config.js'

gsap.registerPlugin(ScrollTrigger)

const petalRot = [0, 45, 90, 135, 180, 225, 270, 315]

function Icon({ kind }) {
  if (kind === 'sparkles')
    return (
      <svg viewBox="0 0 100 100" className="ev-svg" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M50 8 L58 42 L92 50 L58 58 L50 92 L42 58 L8 50 L42 42Z" />
          <path d="M50 22 L54 46 L78 50 L54 54 L50 78 L46 54 L22 50 L46 46Z" opacity=".6" />
          <path d="M80 14 L82 22 L90 24 L82 26 L80 34 L78 26 L70 24 L78 22Z" fill="currentColor" />
          <path d="M20 70 L22 77 L29 79 L22 81 L20 88 L18 81 L11 79 L18 77Z" fill="currentColor" />
        </g>
      </svg>
    )
  return (
    <svg viewBox="0 0 100 100" className="ev-svg" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" transform="translate(50 46)">
        <circle r="30" /><circle r="26" strokeDasharray="1 3.4" />
        {petalRot.map((r) => <ellipse key={r} cx="0" cy="-12" rx="5" ry="12" transform={`rotate(${r})`} />)}
        <circle r="4" fill="currentColor" />
        <path d="M-9 30 Q0 54 9 30" /><circle cy="48" r="3.4" fill="currentColor" />
      </g>
    </svg>
  )
}

export default function Events() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.events .head > *', {
        opacity: 0, y: 30, stagger: 0.14, duration: 1,
        scrollTrigger: { trigger: '.events .head', start: 'top 85%' },
      })
      gsap.utils.toArray('.event-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0, y: 80, rotateX: -10, duration: 1.3, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        })
        gsap.from(card.querySelectorAll('.ev-icon, .ev-body > *'), {
          opacity: 0, y: 20, stagger: 0.08, duration: 0.9, delay: 0.3,
          scrollTrigger: { trigger: card, start: 'top 85%' },
        })
        const rx = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3' })
        const ry = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3' })
        card.addEventListener('pointermove', (e) => {
          const r = card.getBoundingClientRect()
          const px = (e.clientX - r.left) / r.width - 0.5
          const py = (e.clientY - r.top) / r.height - 0.5
          ry(px * 7); rx(-py * 7)
          card.style.setProperty('--mx', `${(px + 0.5) * 100}%`)
          card.style.setProperty('--my', `${(py + 0.5) * 100}%`)
        })
        card.addEventListener('pointerleave', () => { rx(0); ry(0) })
      })
      gsap.fromTo('.ev-thread', { scaleY: 0 }, {
        scaleY: 1, ease: 'none', transformOrigin: 'top',
        scrollTrigger: { trigger: '.event-list', start: 'top 70%', end: 'bottom 60%', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="events section" id="events" ref={root}>
      <div className="head">
        <div className="emblem">
          <svg width="40" height="40" viewBox="0 0 100 100"><path d="M50,10 C72,35 85,52 85,68 C85,86 69,94 50,94 C31,94 15,86 15,68 C15,52 28,35 50,10 Z" fill="none" stroke="#9A7729" strokeWidth="4" strokeLinejoin="round" /></svg>
        </div>
        <p className="eyebrow">{config.events.length} CELEBRATIONS</p>
        <h2 className="h-display">The festivities</h2>
      </div>
      <div className="event-list">
        <span className="ev-thread" />
        {config.events.map((ev, i) => (
          <article className={`event-card ${i % 2 ? 'flip' : ''}`} key={ev.title}>
            <div className="sheen" />
            <div className="ev-icon"><Icon kind={ev.icon} /></div>
            <div className="ev-body">
              <div className="ev-orn">✦ ─ ✦</div>
              <h3>{ev.title}</h3>
              <p className="ev-date">{ev.date}</p>
              <p className="ev-time">{ev.time}</p>
              <p className="ev-venue">{ev.venue}</p>
              <a className="btn-outline" href={ev.map} target="_blank" rel="noreferrer">◎ MAP</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
