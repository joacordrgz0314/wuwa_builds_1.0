import { useState } from 'react'

// Lluvia ascendente del inicio: estelas finas con valores repartidos de forma fija (sin aleatoriedad en cada render).
const AMBIENT_PARTICLES = Array.from({ length: 48 }, (_, i) => {
  const r = (k) => {
    const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453
    return v - Math.floor(v)
  }
  return {
    '--x': `${(r(1) * 100).toFixed(1)}%`,
    '--s': `${(1 + r(2) * 1.5).toFixed(1)}px`,
    '--h': `${Math.round(14 + r(3) * 30)}px`,
    '--d': `${(3 + r(4) * 4).toFixed(1)}s`,
    '--w': `${(-r(5) * 7).toFixed(1)}s`,
  }
})

// Gota vista de frente: destello que estalla y 4 anillos escalonados que se expanden; al cerrar el ciclo reaparece en otro punto al azar.
const randomSpot = () => ({ x: 6 + Math.random() * 88, y: 14 + Math.random() * 76 })
function Drop({ delay }) {
  const [spot, setSpot] = useState(randomSpot)
  return (
    <span
      className="drop"
      style={{ left: `${spot.x}%`, top: `${spot.y}%`, '--dl': delay }}
      onAnimationIteration={(e) => { if (e.target === e.currentTarget) setSpot(randomSpot()) }}
    >
      <i className="drop-ring" />
      <i className="drop-ring" />
      <i className="drop-ring" />
      <i className="drop-ring" />
      <i className="drop-splash" />
    </span>
  )
}

// Fondo animado compartido: lluvia ascendente y gotas. En el inicio es turquesa; en la página de personaje toma el color del elemento (--elem-rgb).
export default function Ambient() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-particles">
        {AMBIENT_PARTICLES.map((p, i) => <span key={i} style={p} />)}
      </div>
      {['0s', '1.4s', '2.8s', '4.2s', '5.6s'].map((d) => <Drop key={d} delay={d} />)}
    </div>
  )
}
