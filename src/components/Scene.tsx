import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import * as THREE from "three"

const SECTIONS = [
  { x: 0,    y: 0,    z: 0,    color: "#3b82f6", s: 1.4 },
  { x: -2.0, y: 0.4,  z: -0.5, color: "#8b5cf6", s: 1.0 },
  { x: 2.2,  y: -0.3, z: -0.5, color: "#f472b6", s: 0.9 },
  { x: -1.5, y: 0.2,  z: -0.5, color: "#34d399", s: 0.85 },
  { x: 0,    y: 0,    z: 0,    color: "#c4b5fd", s: 1.2 },
]

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

function Orb({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const mesh = useRef<THREE.Mesh>(null)
  const mat  = useRef<THREE.MeshBasicMaterial>(null)
  const ca   = useRef(new THREE.Color())
  const cb   = useRef(new THREE.Color())

  useFrame(({ clock }) => {
    if (!mesh.current || !mat.current) return
    const t   = clock.getElapsedTime()
    mesh.current.rotation.x = t * 0.11
    mesh.current.rotation.y = t * 0.17

    const max  = SECTIONS.length - 1
    const raw  = Math.max(0, Math.min(scrollRef.current * max, max))
    const i    = Math.min(Math.floor(raw), max - 1)
    const frac = raw - i
    const a = SECTIONS[i], b = SECTIONS[i + 1]

    mesh.current.position.set(lerp(a.x, b.x, frac), lerp(a.y, b.y, frac), lerp(a.z, b.z, frac))
    mesh.current.scale.setScalar(lerp(a.s, b.s, frac))
    ca.current.set(a.color)
    cb.current.set(b.color)
    mat.current.color.copy(ca.current.lerp(cb.current, frac))
  })

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial ref={mat} color="#3b82f6" wireframe />
    </mesh>
  )
}

export function Scene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: "none" }}
      onCreated={({ gl }) => gl.setClearColor(new THREE.Color("#030303"), 1)}
    >
      <Stars radius={120} depth={60} count={4000} factor={4} saturation={0} fade speed={0.6} />
      <Orb scrollRef={scrollRef} />
    </Canvas>
  )
}
