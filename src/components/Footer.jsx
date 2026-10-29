import { config } from '../config.js'

export default function Footer() {
  return (
    <footer className="footer">
      <p className="foot-names">{config.groom} &amp; {config.bride}</p>
      <p className="tag">{config.hashtag}</p>
      <i className="foot-line" />
      <p className="foot-place">{config.footerPlace}</p>
    </footer>
  )
}
