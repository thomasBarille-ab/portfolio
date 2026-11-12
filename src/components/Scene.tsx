import { Canvas } from "@react-three/fiber"
import { Stars } from "@react-three/drei"

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      className="stars-canvas"
      gl={{ alpha: true }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: "none" }}
    >
      <Stars radius={120} depth={60} count={4000} factor={4} saturation={0} fade speed={0.6} />
    </Canvas>
  )
}
