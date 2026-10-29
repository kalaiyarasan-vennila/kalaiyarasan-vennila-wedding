import { useEffect } from 'react'
import gsap from 'gsap'

export default function Nav({ lenis, visible }) {
  useEffect(() => {
    gsap.to('.nav', { autoAlpha: visible ? 1 : 0, y: visible ? 0 : -16, duration: 0.9, delay: visible ? 1.6 : 0 })
  }, [visible])

  const go = (id) => (e) => {
    e.preventDefault()
    lenis.current?.scrollTo(id, { duration: 1.8 })
  }

  return (
    <nav className="nav" style={{ opacity: 0, visibility: 'hidden' }}>
      <a href="#top" className="nav-mono" onClick={go('#top')}>
        <b>K</b><i>&amp;</i><b>V</b>
      </a>
      <div className="nav-links">
        <a href="#events" onClick={go('#events')}>EVENTS</a>
        <a href="#gallery" onClick={go('#gallery')}>GALLERY</a>
        <a href="#wishes" onClick={go('#wishes')}>WISHES</a>
      </div>
    </nav>
  )
}
