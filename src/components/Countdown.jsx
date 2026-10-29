import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { config } from '../config.js'

gsap.registerPlugin(ScrollTrigger)

const calc = () => {
  const d = Math.max(0, new Date(config.countdownTo).getTime() - Date.now())
  return {
    DAYS: Math.floor(d / 864e5),
    HOURS: Math.floor((d / 36e5) % 24),
    MINUTES: Math.floor((d / 6e4) % 60),
    SECONDS: Math.floor((d / 1e3) % 60),
  }
}

export default function Countdown() {
  const root = useRef(null)
  const [t, setT] = useState(calc)
  const prev = useRef(t)

  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    Object.keys(t).forEach((k) => {
      if (prev.current[k] !== t[k])
        gsap.fromTo(`.cd-${k} .num`, { yPercent: -30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
    })
    prev.current = t
  }, [t])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cd-box', {
        opacity: 0, y: 40, scale: 0.9, stagger: 0.12, duration: 1, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.cd-row', start: 'top 88%' },
      })
      gsap.from('.cd-date', {
        opacity: 0, letterSpacing: '0.4em', duration: 1.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.cd-date', start: 'top 90%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const dt = new Date(config.countdownTo)
  const pad = (n) => String(n).padStart(2, '0')

  return (
    <section className="countdown section" ref={root}>
      <p className="eyebrow">COUNTING DOWN TO THE BIG DAY</p>
      <p className="cd-date">{pad(dt.getDate())} · {pad(dt.getMonth() + 1)} · {dt.getFullYear()}</p>
      <div className="cd-row">
        {Object.entries(t).map(([k, v]) => (
          <div className={`cd-box cd-${k}`} key={k}>
            <span className="num">{pad(v)}</span>
            <span className="lbl">{k}</span>
          </div>
        ))}
      </div>
      <p className="venue-line">{config.events[0].venue}</p>
    </section>
  )
}
