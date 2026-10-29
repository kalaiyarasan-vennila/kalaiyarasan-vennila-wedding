import { useMemo, useState } from 'react'

const SYMBOLS = ['💍', '🌸', '🪷', '💛', '🪔', '💐']

function shuffledCards() {
  return [...SYMBOLS, ...SYMBOLS]
    .map((symbol, index) => ({ id: `${index}-${Math.random().toString(36).slice(2, 7)}`, symbol }))
    .sort(() => Math.random() - 0.5)
}

export default function MemoryGame() {
  const [cards, setCards] = useState(shuffledCards)
  const [picked, setPicked] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [locked, setLocked] = useState(false)
  const pairs = useMemo(() => matched.length / 2, [matched])

  function flip(card) {
    if (locked || picked.includes(card.id) || matched.includes(card.id)) return
    const next = [...picked, card.id]
    setPicked(next)
    if (next.length === 2) {
      setMoves((m) => m + 1)
      const first = cards.find((c) => c.id === next[0])
      const second = cards.find((c) => c.id === next[1])
      if (first.symbol === second.symbol) {
        setMatched((m) => [...m, ...next])
        setPicked([])
      } else {
        setLocked(true)
        window.setTimeout(() => { setPicked([]); setLocked(false) }, 750)
      }
    }
  }

  function restart() {
    setCards(shuffledCards())
    setPicked([])
    setMatched([])
    setMoves(0)
    setLocked(false)
  }

  return (
    <section className="memory-game section" id="memory-game">
      <div className="head">
        {/* <p className="eyebrow tamil">சிறிய விளையாட்டு</p> */}
        <p className="eyebrow tamil">While you wait</p>
        <h2 className="h-display">A little fun</h2>
        <p className="muted">Find all the matching wedding symbols while you wait.</p>
      </div>
      <div className="memory-panel">
        <div className="memory-stats">
          <span><strong>{pairs}</strong> / 6 pairs found</span>
          <span><strong>{moves}</strong> moves</span>
        </div>
        <div className="memory-grid">
          {cards.map((card) => {
            const open = picked.includes(card.id) || matched.includes(card.id)
            return <button
              className={`memory-card ${open ? 'is-open' : ''} ${matched.includes(card.id) ? 'is-matched' : ''}`}
              key={card.id}
              type="button"
              onClick={() => flip(card)}
              aria-label={open ? card.symbol : 'Reveal card'}
              aria-pressed={open}
            >{open ? card.symbol : <span>✦</span>}</button>
          })}
        </div>
        {pairs === 6 ? <p className="memory-win">Beautiful! You found every pair. 💛</p> : null}
        <button className="btn-outline memory-restart" onClick={restart} type="button">PLAY AGAIN ↻</button>
      </div>
    </section>
  )
}
