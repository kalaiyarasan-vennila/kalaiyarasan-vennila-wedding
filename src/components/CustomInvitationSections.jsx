import { useEffect, useState } from 'react'

const WEDDING_TIME = new Date('2026-11-12T10:00:00+05:30').getTime()

function useCountdown() {
  const calculate = () => {
    const diff = Math.max(0, WEDDING_TIME - Date.now())
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      complete: diff <= 0,
    }
  }
  const [time, setTime] = useState(calculate)
  useEffect(() => {
    const timer = window.setInterval(() => setTime(calculate()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  return time
}

function FallingPetals() {
  return <div className="custom-petals" aria-hidden="true">
    {Array.from({ length: 18 }, (_, i) => <span key={i} style={{ '--left': `${(i * 37 + 8) % 100}%`, '--delay': `${(i % 9) * -1.7}s`, '--duration': `${9 + (i % 6) * 1.8}s`, '--size': `${8 + (i % 4) * 3}px` }} />)}
  </div>
}

export default function CustomInvitationSections() {
  const time = useCountdown()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const nodes = document.querySelectorAll('.custom-reveal')
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('custom-visible'))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('custom-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    nodes.forEach((node) => observer.observe(node))
    setVisible(true)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="custom-wedding-sections" data-ready={visible ? 'true' : 'false'}>
      <section className="custom-invitation" aria-label="Wedding invitation message">
        <div className="custom-vignette" aria-hidden="true" />
        <FallingPetals />
        <div className="custom-invitation-copy">
          <div className="custom-ornament" aria-hidden="true"><span /><b>❦</b><span /></div>
          <p className="custom-invitation-text">
            <span>With hearts full of joy and the grace of the Almighty,</span>
            <span>our families invite you to witness</span>
            <span className="custom-couple-line">Kalaiyarasan and Vennila tie the knot —</span>
            <span>and begin their forever.</span>
          </p>
          <div className="custom-tamil-copy">
            {/* <p lang="ta">இரு இதயங்கள்... ஒரு இனிய பயணம்...</p> */}
            <p lang="ta">உங்கள் வருகையே எங்கள் பாக்கியம்</p>
            <span>YOUR PRESENCE IS OUR BLESSING</span>
            {/* <span>TWO SOULS. ONE BEAUTIFUL JOURNEY</span> */}
          </div>
          <div className="custom-bottom-star" aria-hidden="true">✧</div>
        </div>
      </section>

      <section className="custom-festivities" id="custom-festivities" aria-labelledby="custom-festivities-title">
        <div className="custom-paper-texture" aria-hidden="true" />
        <img className="custom-floral custom-floral-left" src="/assets/floral-left.webp" alt="" aria-hidden="true" />
        <img className="custom-floral custom-floral-right" src="/assets/floral-right.webp" alt="" aria-hidden="true" />
        <header className="custom-section-heading custom-reveal">
          <p>JOIN US FOR</p>
          <h2 id="custom-festivities-title">The Festivities</h2>
          <div className="custom-heading-divider" aria-hidden="true"><span /><b>❀</b><span /></div>
        </header>
        <div className="custom-event-grid">
          <article className="custom-event-card custom-reveal">
            <a href="https://www.google.com/maps/search/?api=1&query=Sri+Hariswar+Mahal+Malappadi+Bargur" target="_blank" rel="noopener noreferrer" aria-label="Open Wedding Ceremony location in Google Maps">
              <img src="/assets/wedding-ceremony-card.png" alt="Wedding Invite — Friday 13 November 2026, 6.30 AM, Sri Hariswar Mahal, Malappadi Bargur" />
              <span className="custom-location-label">Open location ↗</span>
            </a>
          </article>
          <article className="custom-event-card custom-reveal">
            <a href="https://www.google.com/maps/search/?api=1&query=Sri+Hariswar+Mahal+Malappadi+Bargur" target="_blank" rel="noopener noreferrer" aria-label="Open Reception location in Google Maps">
              <img src="/assets/reception-card.png" alt="Reception — Thursday 12 November 2026, 6.30 PM, Sri Hariswar Mahal, Malappadi Bargur" />
              <span className="custom-location-label">Open location ↗</span>
            </a>
          </article>
        </div>
        <p className="custom-closing-note custom-reveal">Your presence will make our celebration complete</p>
        <div className="custom-festivities-star" aria-hidden="true">✧</div>
      </section>

      <section className="custom-countdown" aria-labelledby="custom-countdown-title">
        <div className="custom-countdown-shade" aria-hidden="true" />
        <div className="custom-countdown-content custom-reveal">
          <p className="custom-countdown-eyebrow"><span /> THE BIG DAY IS <span /></p>
          <h2 id="custom-countdown-title" className="custom-sr-only">Countdown to the wedding</h2>
          <div className="custom-timer" role="timer" aria-live="off" aria-label="Countdown to 12 November 2026 at 10 AM">
            {[
              ['days', 'DAYS', time.days],
              ['hours', 'HOURS', time.hours],
              ['minutes', 'MINUTES', time.minutes],
              ['seconds', 'SECONDS', time.seconds],
            ].map(([key, label, value], index) => (
              <div className="custom-time-unit" key={key}>
                <span className="custom-time-number">{String(value).padStart(2, '0')}</span>
                <span className="custom-time-label">{label}</span>
              </div>
            )).reduce((acc, item, index) => index ? [...acc, <span className="custom-time-divider" aria-hidden="true" key={`divider-${index}`} />, item] : [item], [])}
          </div>
          <p className="custom-countdown-note">{time.complete ? 'Today is the beautiful day!' : 'Until Kalaiyarasan & Vennila’s beautiful day'}</p>
        </div>
      </section>
    </div>
  )
}
