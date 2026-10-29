import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { config } from '../config.js'

gsap.registerPlugin(ScrollTrigger)

export default function Story() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const len = 200
      gsap.fromTo('.flourish path', { strokeDasharray: len, strokeDashoffset: len }, {
        strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut',
        scrollTrigger: { trigger: '.story', start: 'top 70%' },
      })
      gsap.fromTo('.story .w', { opacity: 0.14, filter: 'blur(3px)' }, {
        opacity: 1, filter: 'blur(0px)', stagger: 0.08, ease: 'none',
        scrollTrigger: { trigger: '.story-text', start: 'top 80%', end: 'bottom 50%', scrub: true },
      })
      gsap.from('.story .fade', {
        opacity: 0, y: 36, duration: 1.2, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.story-tamil', start: 'top 90%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="story section" id="story" ref={root}>
      <div className="story-om">ௐ</div>
      <svg className="flourish" width="180" height="26" viewBox="0 0 180 26" aria-hidden="true">
        <path d="M4,13 C34,2 56,24 90,13 C124,2 146,24 176,13" fill="none" stroke="#C6A15B" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="90" cy="13" r="2.6" fill="#C6A15B" />
      </svg>
      <p className="story-text">
        {config.intro.split(' ').map((w, i) => (
          <span className="w" key={i}>{w} </span>
        ))}
      </p>
      <p className="story-tamil tamil fade">{config.tamilLine}</p>
      <p className="eyebrow fade">{config.tamilSub}</p>
    </section>
  )
}
