import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Curtain from './components/Curtain.jsx'
import Hero from './components/Hero.jsx'
import CustomInvitationSections from './components/CustomInvitationSections.jsx'
import Story from './components/Story.jsx'
import Events from './components/Events.jsx'
import Countdown from './components/Countdown.jsx'
import Marquee from './components/Marquee.jsx'
import Gallery from './components/Gallery.jsx'
import Wishes from './components/Wishes.jsx'
import MemoryGame from './components/MemoryGame.jsx'
import Footer from './components/Footer.jsx'
import Music from './components/Music.jsx'
import Cursor from './components/Cursor.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [started, setStarted] = useState(false)
  const [gone, setGone] = useState(false)
  const lenis = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    const l = new Lenis({ duration: 1.25, smoothWheel: true })
    lenis.current = l
    l.stop() // locked until the curtains are pulled
    l.on('scroll', ScrollTrigger.update)
    const tick = (t) => l.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const bar = gsap.to('#progress', {
      scaleX: 1, ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    })
    return () => {
      bar.scrollTrigger?.kill()
      bar.kill()
      gsap.ticker.remove(tick)
      l.destroy()
    }
  }, [])

  const startWeddingMusic = async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      audio.volume = 0
      await audio.play()
      let volume = 0
      const fade = window.setInterval(() => {
        volume = Math.min(1, volume + 0.025)
        audio.volume = volume
        if (volume >= 1) window.clearInterval(fade)
      }, 150)
    } catch {
      // Browsers may block playback; the floating music button lets guests start it.
    }
  }

  useEffect(() => {
    if (started) {
      lenis.current?.start()
      setTimeout(() => ScrollTrigger.refresh(), 150)
    }
  }, [started])

  return (
    <>
      <Cursor />
      <div id="progress" />
      <audio ref={audioRef} src="/assets/wedding-song.mp3" preload="auto" loop />
      {!gone && <Curtain onStart={() => { setStarted(true); startWeddingMusic() }} onDone={() => setGone(true)} />}
      <Music visible={started} audioRef={audioRef} />
      <main className="site">
        <Hero ready={started} />
        <CustomInvitationSections />
        {/* <Story />
        <Events />
        <Countdown />
        <Marquee />
        <Gallery /> */}
        <MemoryGame />
        <Wishes />
        <Footer />
      </main>
    </>
  )
}
