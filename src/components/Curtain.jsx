import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { config } from '../config.js'
import { enc, motifSVG, sideSVG, bandSVG, valanceSVG, tasselSVG } from '../curtainArt.js'

gsap.registerPlugin(Draggable)

export default function Curtain({ onStart, onDone }) {
  const root = useRef(null)
  const left = useRef(null)
  const right = useRef(null)
  const tassel = useRef(null)
  const val = useRef(null)
  const opened = useRef(false)

  const vars = useMemo(
    () => ({
      '--motif': enc(motifSVG()),
      '--side': enc(sideSVG()),
      '--band': enc(bandSVG()),
    }),
    [],
  )
  const valance = useMemo(() => ({ __html: valanceSVG() }), [])
  const tasselHtml = useMemo(() => ({ __html: tasselSVG() }), [])

  const open = () => {
    if (opened.current) return
    opened.current = true
    onStart()
    const tl = gsap.timeline({ onComplete: onDone })
    tl.to(tassel.current, { y: 210, duration: 0.35, ease: 'power2.out' }, 0)
      .to('.c-fade', { opacity: 0, duration: 0.6 }, 0)
      // fabric gathers toward the walls…
      .to([left.current, right.current], { scaleX: 0.14, duration: 2.6, ease: 'power2.inOut' }, 0.25)
      .to('.panel .gather-shade', { opacity: 1, duration: 2, ease: 'power1.in' }, 0.25)
      // …then slides away
      .to(left.current, { xPercent: -130, duration: 1.1, ease: 'power2.in' }, 2.3)
      .to(right.current, { xPercent: 130, duration: 1.1, ease: 'power2.in' }, 2.3)
      .to(tassel.current, { yPercent: -130, duration: 1, ease: 'power2.in' }, 2.5)
      .to(val.current, { yPercent: -112, duration: 1.1, ease: 'power3.inOut' }, 2.6)
      .set(root.current, { autoAlpha: 0 })
  }

  useEffect(() => {
    gsap.set(left.current, { transformOrigin: '0% 50%' })
    gsap.set(right.current, { transformOrigin: '100% 50%' })
    gsap.from('.c-text > *', { y: 22, opacity: 0, stagger: 0.16, duration: 1.1, ease: 'power3.out', delay: 0.4 })
    gsap.from('.c-hint', { opacity: 0, y: 20, duration: 1, delay: 1.1 })
    gsap.fromTo(
      tassel.current,
      { rotation: -1.6, transformOrigin: '45px 280px' },
      { rotation: 1.6, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' },
    )

    const [d] = Draggable.create(tassel.current, {
      type: 'y',
      bounds: { minY: 0, maxY: 210 },
      onPress() { gsap.killTweensOf(tassel.current, 'rotation') },
      onDrag() {
        const p = Math.min(this.y / 210, 1)
        gsap.set([left.current, right.current], { scaleX: 1 - p * 0.06 })
      },
      onRelease() {
        if (this.y > 120) open()
        else {
          gsap.to(tassel.current, { y: 0, duration: 1, ease: 'elastic.out(1,0.35)' })
          gsap.to([left.current, right.current], { scaleX: 1, duration: 0.7 })
        }
      },
      onClick: open,
    })

    const onWheel = (e) => { if (e.deltaY > 30) open() }
    let ty = null
    const ts = (e) => { ty = e.touches[0].clientY }
    const tm = (e) => { if (ty !== null && ty - e.touches[0].clientY > 60) open() }
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', ts, { passive: true })
    window.addEventListener('touchmove', tm, { passive: true })
    return () => {
      d.kill()
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', ts)
      window.removeEventListener('touchmove', tm)
    }
  }, [])

  return (
    <div className="curtain" ref={root} style={vars}>
      {['l', 'r'].map((s) => (
        <div className={`panel panel-${s}`} ref={s === 'l' ? left : right} key={s}>
          <div className="velvet" />
          <div className="motifs" />
          <div className="band" />
          <div className="side" />
          <div className="shade" />
          <div className="gather-shade" />
        </div>
      ))}

      <div className="valance" ref={val} dangerouslySetInnerHTML={valance} />

      <div className="c-text c-fade">
        <span className="c-om">ௐ</span>
        <span className="c-eyebrow">THE WEDDING OF</span>
        <h1 className="c-names">{config.groom} <br /> <i>&amp;</i> <br /> {config.bride}
        </h1>
        <span className="c-sub">You are lovingly invited.</span>
      </div>

      <div className="c-hint c-hint-pos c-fade">PULL THE TASSEL TO DRAW THE CURTAINS</div>
      <button className="c-skip c-fade" onClick={open}>SKIP ➔</button>

      <div className="tassel" ref={tassel} dangerouslySetInnerHTML={tasselHtml} />
    </div>
  )
}
