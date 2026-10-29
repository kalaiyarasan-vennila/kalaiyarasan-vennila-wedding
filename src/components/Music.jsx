import { useEffect, useState } from 'react'

export default function Music({ visible, audioRef }) {
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef?.current
    if (!audio) return
    const sync = () => setPlaying(!audio.paused)
    audio.addEventListener('play', sync)
    audio.addEventListener('pause', sync)
    return () => {
      audio.removeEventListener('play', sync)
      audio.removeEventListener('pause', sync)
    }
  }, [audioRef])

  if (!visible) return null

  const toggle = async () => {
    const audio = audioRef?.current
    if (!audio) return
    if (audio.paused) {
      try {
        audio.volume = 0
        await audio.play()
        let volume = 0
        const fade = window.setInterval(() => {
          volume = Math.min(1, volume + 0.035)
          audio.volume = volume
          if (volume >= 1) window.clearInterval(fade)
        }, 120)
      } catch {
        setPlaying(false)
      }
    } else {
      audio.pause()
    }
  }

  return (
    <button
      className={`music ${playing ? 'on' : ''}`}
      onClick={toggle}
      aria-label={playing ? 'Pause wedding music' : 'Play wedding music'}
      title={playing ? 'Pause wedding music' : 'Play wedding music'}
    >
      <i /><i /><i /><i />
      <span className="music-label">{playing ? 'MUSIC ON' : 'MUSIC OFF'}</span>
    </button>
  )
}
