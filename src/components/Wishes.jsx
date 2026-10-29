import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const KEY = 'wedding-wishes-v1'
const HKEY = 'wedding-hearts-v1'
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] } }
const loadH = () => { try { return Number(localStorage.getItem(HKEY)) || 0 } catch { return 0 } }

export default function Wishes() {
  const root = useRef(null)
  const prog = useRef(null)
  const btn = useRef(null)
  const layer = useRef(null)
  const holdTween = useRef(null)
  const completedHold = useRef(false)
  const [wishes, setWishes] = useState(load)
  const [hearts, setHearts] = useState(loadH)
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.wishes .head > *, .wish-form', {
        opacity: 0, y: 40, stagger: 0.14, duration: 1,
        scrollTrigger: { trigger: '.wishes', start: 'top 75%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const rain = () => {
    const L = layer.current
    for (let i = 0; i < 38; i++) {
      const s = document.createElement('span')
      s.textContent = '♥'
      s.className = 'rain-heart'
      s.style.left = Math.random() * 100 + 'vw'
      s.style.fontSize = 14 + Math.random() * 26 + 'px'
      s.style.color = ['#6E1524', '#A83A28', '#d98a97', '#C6A15B'][i % 4]
      L.appendChild(s)
      gsap.fromTo(s, { y: -40, opacity: 0, rotate: -20 }, {
        y: window.innerHeight + 60, x: (Math.random() - 0.5) * 160, rotate: 360 * (Math.random() > 0.5 ? 1 : -1) * 0.5,
        opacity: 1, duration: 2.6 + Math.random() * 2, delay: Math.random() * 0.9, ease: 'power1.in',
        onComplete: () => s.remove(),
      })
    }
  }

  const bless = () => {
    rain()
    setHearts((h) => {
      const n = h + 1
      try { localStorage.setItem(HKEY, String(n)) } catch {}
      return n
    })
    gsap.to(prog.current, { strokeDashoffset: 327, duration: 0.6 })
    gsap.fromTo(btn.current, { scale: 1.3 }, { scale: 1, duration: 0.8, ease: 'elastic.out(1,0.4)' })
  }
  const down = () => {
    completedHold.current = false
    holdTween.current?.kill()
    holdTween.current = gsap.to(prog.current, { strokeDashoffset: 0, duration: 1.3, ease: 'none', onComplete: bless })
    gsap.to(btn.current, { scale: 1.12, duration: 1.3, ease: 'power1.in' })
  }
  const up = () => {
    if (holdTween.current && holdTween.current.progress() >= 1) completedHold.current = true
    if (holdTween.current && holdTween.current.progress() < 1) {
      holdTween.current.kill()
      gsap.to(prog.current, { strokeDashoffset: 327, duration: 0.4 })
      gsap.to(btn.current, { scale: 1, duration: 0.4 })
    }
  }

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim() || !msg.trim()) return
    const next = [{ name: name.trim(), msg: msg.trim(), at: Date.now() }, ...wishes]
    setWishes(next)
    try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
    setName(''); setMsg('')
    requestAnimationFrame(() => gsap.from('.wish-item:first-child', { opacity: 0, y: -20, duration: 0.8, ease: 'power3.out' }))
  }

  return (
    <section className="wishes section" id="wishes" ref={root}>
      <div className="rain-layer" ref={layer} />
      <div className="head">
        <p className="eyebrow tamil">ஆசீர்வாதம்</p>
        <h2 className="h-display">Shower your blessings</h2>
        <p className="muted">Tap or hold the heart to shower the couple with love, then leave a wish.</p>
      </div>
      <div className="heart-wrap">
        <span className="heart-pulse" />
        <button
          ref={btn} className="heart-btn" type="button" aria-label="Hold to shower hearts"
          onPointerDown={down} onPointerUp={up} onPointerLeave={up} onPointerCancel={up}
          onClick={() => { if (!completedHold.current) bless(); completedHold.current = false }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <svg className="heart-ring" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#C6A15B" strokeOpacity=".25" strokeWidth="3" />
            <circle ref={prog} cx="60" cy="60" r="52" fill="none" stroke="#6E1524" strokeWidth="3.5" strokeLinecap="round"
              strokeDasharray="327" strokeDashoffset="327" transform="rotate(-90 60 60)" />
          </svg>
          <svg width="44" height="44" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M16 29 C4 20 1 13 1 9 C1 4 5 1 9 1 C12 1 15 3 16 6 C17 3 20 1 23 1 C27 1 31 4 31 9 C31 13 28 20 16 29 Z" fill="none" stroke="#6E1524" strokeWidth="2.4" />
          </svg>
        </button>
      </div>
      <p className="bless-line">
        {hearts === 0 ? 'Be the first to bless the couple' : `${hearts} ${hearts === 1 ? 'blessing' : 'blessings'} showered`}
      </p>

      {/* <form className="wish-form" onSubmit={submit}>
        <h3>Leave a wish</h3>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" maxLength={40} />
        <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Your wish for the couple …" rows={3} maxLength={220} />
        <button className="btn-maroon" type="submit">SEND A WISH ♥</button>
      </form> */}

      <div className="wish-list">
        {wishes.length === 0 && <p className="muted">Be the first to leave a wish for the couple.</p>}
        {wishes.map((w) => (
          <div className="wish-item" key={w.at}>
            <p>“{w.msg}”</p>
            <span>— {w.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
