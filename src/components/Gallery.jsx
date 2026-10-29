import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { config } from '../config.js'

gsap.registerPlugin(ScrollTrigger)

const tones = [
  ['#f4d9c6', '#e9b9a0'], ['#f6e7c8', '#e3c183'], ['#f3d4d8', '#dd9aa6'],
  ['#efe2cf', '#d4b98c'], ['#f5dcc9', '#e0a58a'], ['#f2e4d4', '#d6b48f'],
]
const tilt = [-2, 1.5, 2, -1.5, 1.8, -2]
const lift = [0, -24, 20, 0, -18, 14]
const ratio = ['3/4', '4/3', '3/4', '4/3', '3/4', '3/4']

export default function Gallery() {
  const root = useRef(null)
  const track = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const dist = () => Math.max(0, track.current.scrollWidth - window.innerWidth + 40)
      gsap.to(track.current, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: '.gallery-pin', start: 'top top', end: () => `+=${dist()}`,
          pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1,
        },
      })
      gsap.utils.toArray('.g-inner').forEach((img) => {
        gsap.fromTo(img, { xPercent: -6 }, {
          xPercent: 6, ease: 'none',
          scrollTrigger: { trigger: '.gallery-pin', start: 'top top', end: () => `+=${dist()}`, scrub: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="gallery" id="gallery" ref={root}>
      <div className="gallery-pin">
        <div className="g-head">
          <p className="eyebrow">MOMENTS</p>
          <h2 className="h-display">A life in pictures</h2>
        </div>
        <div className="g-track" ref={track}>
          {config.gallery.map((g, i) => (
            <figure
              className="g-frame"
              key={i}
              style={{ aspectRatio: ratio[i % 6], transform: `rotate(${tilt[i % 6]}deg) translateY(${lift[i % 6]}px)` }}
            >
              {g.src ? (
                <img className="g-inner" src={g.src} alt={g.caption} loading="lazy" />
              ) : (
                <div className="g-inner g-ph" style={{ background: `linear-gradient(150deg, ${tones[i % 6][0]}, ${tones[i % 6][1]})` }}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                </div>
              )}
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
