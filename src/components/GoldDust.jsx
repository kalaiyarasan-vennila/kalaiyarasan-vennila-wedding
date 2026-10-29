import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Light-theme particle layer: soft gold dust + faint bokeh + 3D curved rose petals (lit, tumbling).
function glowTexture(inner, outer) {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grd.addColorStop(0, inner)
  grd.addColorStop(0.4, outer)
  grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(c)
}

function petalTexture(a, b) {
  const c = document.createElement('canvas')
  c.width = 128; c.height = 192
  const g = c.getContext('2d')
  const grd = g.createLinearGradient(0, 0, 128, 192)
  grd.addColorStop(0, a)
  grd.addColorStop(1, b)
  g.fillStyle = grd
  g.beginPath()
  g.moveTo(64, 4)
  g.bezierCurveTo(140, 56, 126, 160, 64, 188)
  g.bezierCurveTo(2, 160, -12, 56, 64, 4)
  g.fill()
  g.strokeStyle = 'rgba(255,255,255,.35)'
  g.lineWidth = 1.5
  for (let i = -2; i <= 2; i++) {
    g.beginPath(); g.moveTo(64, 14); g.quadraticCurveTo(64 + i * 18, 100, 64 + i * 8, 178); g.stroke()
  }
  return new THREE.CanvasTexture(c)
}

export default function GoldDust() {
  const mount = useRef(null)

  useEffect(() => {
    const el = mount.current
    const w = () => el.clientWidth
    const h = () => el.clientHeight
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w(), h())
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, w() / h(), 0.1, 100)
    camera.position.z = 14
    scene.add(new THREE.AmbientLight(0xffffff, 1.7))
    const sun = new THREE.DirectionalLight(0xfff1d6, 0.6)
    sun.position.set(3, 5, 7)
    scene.add(sun)

    const mk = (count, size, tex, opacity, spreadZ, color) => {
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(count * 3)
      const seed = new Float32Array(count)
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 34
        pos[i * 3 + 1] = (Math.random() - 0.5) * 22
        pos[i * 3 + 2] = (Math.random() - 0.5) * spreadZ
        seed[i] = Math.random() * 100
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const mat = new THREE.PointsMaterial({
        size, map: tex, transparent: true, opacity, depthWrite: false, color, sizeAttenuation: true,
      })
      const pts = new THREE.Points(geo, mat)
      scene.add(pts)
      return { pts, pos, seed, count }
    }

    const dust = mk(170, 0.2, glowTexture('rgba(214,170,80,1)', 'rgba(214,170,80,.45)'), 0.75, 16, 0xffffff)
    const bokeh = mk(16, 1.5, glowTexture('rgba(240,190,120,.35)', 'rgba(240,190,120,.1)'), 0.55, 10, 0xffffff)

    const texA = petalTexture('#fbd3da', '#e8869a')
    const texB = petalTexture('#fff0e6', '#f0b3a0')
    const geo = new THREE.PlaneGeometry(0.42, 0.62, 5, 7)
    const gp = geo.attributes.position
    for (let i = 0; i < gp.count; i++) {
      const x = gp.getX(i), y = gp.getY(i)
      gp.setZ(i, x * x * 2.4 - Math.abs(y) * 0.05) // cup the petal
    }
    geo.computeVertexNormals()

    const petals = []
    for (let i = 0; i < 24; i++) {
      const m = new THREE.MeshLambertMaterial({
        map: i % 3 ? texA : texB, transparent: true, side: THREE.DoubleSide, opacity: 0.95, depthWrite: false,
        emissive: new THREE.Color(0xff9fb0), emissiveIntensity: 0.28,
      })
      const mesh = new THREE.Mesh(geo, m)
      mesh.position.set((Math.random() - 0.5) * 30, Math.random() * 22 - 11, (Math.random() - 0.5) * 10)
      mesh.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6)
      mesh.userData = {
        v: 0.4 + Math.random() * 0.6, sway: Math.random() * 6,
        r: [(Math.random() - 0.3) * 0.02, 0.012 + Math.random() * 0.014, (Math.random() - 0.5) * 0.015],
      }
      mesh.scale.setScalar(0.8 + Math.random() * 0.9)
      scene.add(mesh)
      petals.push(mesh)
    }

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove)
    const onResize = () => {
      renderer.setSize(w(), h())
      camera.aspect = w() / h()
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    const clock = new THREE.Clock()
    let raf
    const loop = () => {
      const t = clock.getElapsedTime()
      mouse.x += (mouse.tx - mouse.x) * 0.04
      mouse.y += (mouse.ty - mouse.y) * 0.04
      camera.position.x = mouse.x * 1.1
      camera.position.y = -mouse.y * 0.7
      camera.lookAt(0, 0, 0)

      for (const L of [dust, bokeh]) {
        const sp = L === dust ? 0.5 : 0.22
        for (let i = 0; i < L.count; i++) {
          const k = i * 3
          L.pos[k + 1] += sp * 0.012 * (0.4 + (L.seed[i] % 1))
          L.pos[k] += Math.sin(t * 0.4 + L.seed[i]) * 0.003
          if (L.pos[k + 1] > 11) L.pos[k + 1] = -11
        }
        L.pts.geometry.attributes.position.needsUpdate = true
      }
      dust.pts.material.opacity = 0.6 + Math.sin(t * 1.3) * 0.15

      for (const p of petals) {
        const u = p.userData
        p.position.y -= u.v * 0.012
        p.position.x += Math.sin(t * 0.7 + u.sway) * 0.012
        p.rotation.x += u.r[0]
        p.rotation.y += u.r[1]
        p.rotation.z += u.r[2]
        if (p.position.y < -11.5) {
          p.position.y = 11.5
          p.position.x = (Math.random() - 0.5) * 30
        }
      }
      renderer.render(scene, camera)
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      el.removeChild(renderer.domElement)
    }
  }, [])

  return <div className="gold-dust" ref={mount} aria-hidden="true" />
}
