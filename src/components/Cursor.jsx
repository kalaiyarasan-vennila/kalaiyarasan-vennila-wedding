import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const d = dot.current, r = ring.current
    gsap.set([d, r], { xPercent: -50, yPercent: -50 })
    const dx = gsap.quickTo(d, 'x', { duration: 0.08 })
    const dy = gsap.quickTo(d, 'y', { duration: 0.08 })
    const rx = gsap.quickTo(r, 'x', { duration: 0.4, ease: 'power3' })
    const ry = gsap.quickTo(r, 'y', { duration: 0.4, ease: 'power3' })
    const move = (e) => {
      d.style.opacity = r.style.opacity = 1
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY)
    }
    const over = (e) => {
      const hot = e.target.closest('a,button,input,textarea,.tassel')
      gsap.to(r, { scale: hot ? 1.9 : 1, duration: 0.3 })
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [])

  return (
    <>
      <div className="cur-dot" ref={dot} />
      <div className="cur-ring" ref={ring} />
    </>
  )
}
