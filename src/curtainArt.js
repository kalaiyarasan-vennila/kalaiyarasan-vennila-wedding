// All curtain artwork is drawn here as SVG strings (original artwork — no external images).
const EDGE = '#5b3606'
const GOLD = `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff2c2"/><stop offset=".3" stop-color="#e6b756"/><stop offset=".65" stop-color="#b97f25"/><stop offset="1" stop-color="#f3d584"/></linearGradient>`

const petal = (rot, cy, rx, ry, fill = 'url(#g)') =>
  `<ellipse cx="0" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot})" fill="${fill}" stroke="${EDGE}" stroke-width=".6"/>`

const lotus = (id) =>
  `<g id="${id}">${[0, 45, 90, 135, 180, 225, 270, 315].map((r) => petal(r, -14, 5.6, 13)).join('')}${[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5]
    .map((r) => petal(r, -8, 3.6, 8, '#f6dc9a'))
    .join('')}<circle r="5.5" fill="url(#g)" stroke="${EDGE}" stroke-width=".7"/><circle r="2" fill="#7a1424"/></g>`

const fleur = `<g id="fleur">
<path d="M20 1 C27 11 27 22 20 31 C13 22 13 11 20 1Z" fill="url(#g)" stroke="${EDGE}" stroke-width=".7"/>
<path d="M20 31 C29 27 37 20 39 9 C40 23 31 33 20 35Z" fill="url(#g)" stroke="${EDGE}" stroke-width=".7"/>
<path d="M20 31 C11 27 3 20 1 9 C0 23 9 33 20 35Z" fill="url(#g)" stroke="${EDGE}" stroke-width=".7"/>
<path d="M20 35 L25 44 L20 50 L15 44Z" fill="url(#g)" stroke="${EDGE}" stroke-width=".7"/>
<path d="M12 38 C8 40 7 44 10 47 M28 38 C32 40 33 44 30 47" fill="none" stroke="url(#g)" stroke-width="1.6" stroke-linecap="round"/>
</g>`

const spark = `<g id="spark" fill="url(#g)" stroke="${EDGE}" stroke-width=".4">
<path d="M0 -9 L3 0 L0 9 L-3 0Z"/><path d="M-9 0 L0 -3 L9 0 L0 3Z"/>
<path d="M12 -15 L14 -12 L12 -9 L10 -12Z"/><path d="M-12 -15 L-10 -12 L-12 -9 L-14 -12Z"/>
<path d="M12 9 L14 12 L12 15 L10 12Z"/><path d="M-12 9 L-10 12 L-12 15 L-14 12Z"/>
</g>`

export const enc = (svg) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`

// repeating embroidered motif for the velvet
export const motifSVG = () => `<svg xmlns="http://www.w3.org/2000/svg" width="170" height="150" viewBox="0 0 170 150"><defs>${GOLD}${fleur}${spark}</defs>
<use href="#fleur" transform="translate(22 6) scale(.95)"/>
<use href="#spark" transform="translate(120 30)"/>
<use href="#fleur" transform="translate(107 78) scale(.95)"/>
<use href="#spark" transform="translate(42 112)"/></svg>`

// vertical gold border strip
export const sideSVG = () => `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="70" viewBox="0 0 60 70"><defs>${GOLD}</defs>
<rect width="60" height="70" fill="#4d0912"/>
<rect x="0" width="4" height="70" fill="url(#g)"/><rect x="56" width="4" height="70" fill="url(#g)"/>
<rect x="6" width="1.5" height="70" fill="#c99a3f"/><rect x="52.5" width="1.5" height="70" fill="#c99a3f"/>
<path d="M30 3 C41 15 41 25 30 36 C19 25 19 15 30 3Z" fill="url(#g)" stroke="${EDGE}" stroke-width=".7"/>
<path d="M30 36 C41 47 41 57 30 69 C19 57 19 47 30 36Z" fill="url(#g)" stroke="${EDGE}" stroke-width=".7" opacity=".9"/>
<circle cx="30" cy="20" r="3" fill="#7a1424"/><circle cx="30" cy="52" r="3" fill="#7a1424"/>
<circle cx="14" cy="35" r="2.2" fill="url(#g)"/><circle cx="46" cy="35" r="2.2" fill="url(#g)"/></svg>`

// bottom embroidered band tile
export const bandSVG = () => `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"><defs>${GOLD}${lotus('lt')}${spark}
<linearGradient id="bb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a0d1c"/><stop offset="1" stop-color="#3d0610"/></linearGradient></defs>
<rect width="150" height="150" fill="url(#bb)"/>
<rect y="10" width="150" height="3" fill="url(#g)"/><rect y="16" width="150" height="1.5" fill="#c99a3f"/>
<rect y="137" width="150" height="3" fill="url(#g)"/><rect y="133" width="150" height="1.5" fill="#c99a3f"/>
<path d="M0 78 Q37 20 75 78 T150 78" fill="none" stroke="#c99a3f" stroke-width="1" opacity=".7"/>
<use href="#lt" transform="translate(75 78) scale(1.55)"/>
<use href="#spark" transform="translate(0 78) scale(.8)"/><use href="#spark" transform="translate(150 78) scale(.8)"/>
<use href="#spark" transform="translate(75 30) scale(.6)"/><use href="#spark" transform="translate(75 126) scale(.6)"/></svg>`

// scalloped valance with beaded fringe
export const valanceSVG = () => {
  const W = 1600, N = 5, sw = W / N, base = 150, ctrl = 250
  let body = `M0 0 H${W} V${base}`
  for (let i = N - 1; i >= 0; i--) body += ` Q${i * sw + sw / 2} ${ctrl} ${i * sw} ${base}`
  body += ' Z'
  let edge = `M0 ${base}`
  for (let i = 0; i < N; i++) edge += ` Q${i * sw + sw / 2} ${ctrl} ${(i + 1) * sw} ${base}`

  let beads = '', meds = ''
  for (let i = 0; i < N; i++) {
    const x0 = i * sw, cx = x0 + sw / 2, x1 = x0 + sw
    for (let k = 1; k < 20; k++) {
      const t = k / 20, u = 1 - t
      const x = u * u * x0 + 2 * u * t * cx + t * t * x1
      const y = u * u * base + 2 * u * t * ctrl + t * t * base
      beads += `<circle cx="${x.toFixed(1)}" cy="${(y + 8).toFixed(1)}" r="4.8" fill="url(#g)" stroke="${EDGE}" stroke-width=".5"/>`
      if (k % 2 === 0)
        beads += `<line x1="${x.toFixed(1)}" y1="${(y + 12).toFixed(1)}" x2="${x.toFixed(1)}" y2="${(y + 22).toFixed(1)}" stroke="#c99a3f" stroke-width="1"/><circle cx="${x.toFixed(1)}" cy="${(y + 26).toFixed(1)}" r="3.6" fill="url(#g)" stroke="${EDGE}" stroke-width=".5"/>`
    }
    meds += `<use href="#vl" transform="translate(${cx} 108) scale(1.45)"/><use href="#spark" transform="translate(${cx - 95} 112) scale(.9)"/><use href="#spark" transform="translate(${cx + 95} 112) scale(.9)"/>`
    meds += `<ellipse cx="${cx}" cy="150" rx="150" ry="52" fill="rgba(255,120,130,.10)"/>`
  }
  for (let i = 0; i <= N; i++)
    beads += `<circle cx="${i * sw}" cy="${base + 8}" r="8" fill="url(#g)" stroke="${EDGE}" stroke-width=".7"/><line x1="${i * sw}" y1="${base + 16}" x2="${i * sw}" y2="${base + 44}" stroke="#c99a3f" stroke-width="1.4"/><circle cx="${i * sw}" cy="${base + 50}" r="6" fill="url(#g)" stroke="${EDGE}" stroke-width=".6"/>`

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} 230" preserveAspectRatio="xMidYMin slice" width="100%" height="100%"><defs>${GOLD}${lotus('vl')}${spark}
<linearGradient id="vfg" x1="0" x2="1"><stop offset="0" stop-color="#2c040b"/><stop offset=".45" stop-color="#b5283a" stop-opacity=".75"/><stop offset="1" stop-color="#2c040b"/></linearGradient>
<pattern id="vfold" width="78" height="10" patternUnits="userSpaceOnUse"><rect width="78" height="10" fill="url(#vfg)" opacity=".55"/></pattern>
<linearGradient id="vsh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".5"/><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
<pattern id="vdia" width="40" height="20" patternUnits="userSpaceOnUse"><rect width="40" height="20" fill="url(#g)"/><path d="M20 3 L27 10 L20 17 L13 10Z" fill="#7a1424"/></pattern>
<clipPath id="vclip"><path d="${body}"/></clipPath></defs>
<path d="${body}" fill="#74101f"/><path d="${body}" fill="url(#vfold)"/>
<g clip-path="url(#vclip)">${meds}</g>
<path d="${body}" fill="url(#vsh)"/>
<rect width="${W}" height="20" fill="url(#vdia)"/><rect y="20" width="${W}" height="3" fill="${EDGE}"/>
<path d="${edge}" fill="none" stroke="${EDGE}" stroke-width="11"/><path d="${edge}" fill="none" stroke="url(#g)" stroke-width="7"/>
<g transform="translate(0 -11)"><path d="${edge}" fill="none" stroke="#c99a3f" stroke-width="2" opacity=".85"/></g>
${beads}</svg>`
}

// hanging tassel (cord runs up past the top of the screen)
export const tasselSVG = () => {
  let threads = ''
  for (let i = 0; i < 17; i++) {
    const f = i / 16
    const x1 = 32 + f * 26, x2 = 15 + f * 60
    threads += `<line x1="${x1.toFixed(1)}" y1="256" x2="${x2.toFixed(1)}" y2="446" stroke="${i % 2 ? '#e8808c' : '#4f0814'}" stroke-width="1" opacity=".55"/>`
  }
  let fray = ''
  for (let i = 0; i < 22; i++) {
    const x = 15 + i * 2.9
    fray += `<line x1="${x.toFixed(1)}" y1="440" x2="${(x + (i % 3) - 1).toFixed(1)}" y2="${452 + (i % 4) * 2}" stroke="${i % 2 ? '#b02a3c' : '#7d1223'}" stroke-width="1.6"/>`
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 560" width="90" height="560"><defs>${GOLD}
<pattern id="tc" width="4" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-58)"><rect width="4" height="7" fill="#d4a54a"/><rect width="4" height="3" fill="#8e6016"/></pattern>
<linearGradient id="red" x1="0" x2="1"><stop offset="0" stop-color="#5a0a16"/><stop offset=".45" stop-color="#b8283a"/><stop offset="1" stop-color="#4f0814"/></linearGradient></defs>
<rect x="43" y="0" width="4" height="210" fill="url(#tc)"/>
<ellipse cx="45" cy="224" rx="15" ry="19" fill="url(#g)" stroke="${EDGE}" stroke-width=".8"/>
<path d="M31 214 Q45 221 59 214 M30 224 Q45 231 60 224 M32 234 Q45 240 58 234" fill="none" stroke="${EDGE}" stroke-width=".8"/>
<rect x="36" y="241" width="18" height="12" rx="3" fill="url(#g)" stroke="${EDGE}" stroke-width=".7"/>
<ellipse cx="45" cy="254" rx="21" ry="5" fill="url(#g)" stroke="${EDGE}" stroke-width=".7"/>
<path d="M30 256 C20 300 12 350 14 442 L76 442 C78 350 70 300 60 256 Z" fill="url(#red)"/>${threads}
<path d="M22 300 Q45 312 68 300" fill="none" stroke="url(#g)" stroke-width="5"/>
<path d="M17 350 Q45 364 73 350" fill="none" stroke="url(#g)" stroke-width="5"/>
<path d="M14 425 Q45 439 76 425" fill="none" stroke="url(#g)" stroke-width="5"/>${fray}</svg>`
}
