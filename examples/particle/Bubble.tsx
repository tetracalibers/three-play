import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import { Mesh } from "three"
import { random } from "../../utility/math"
import * as THREE from "three"

const BUBBLE_COUNT = 400
const BUBBLE_SCALE = 5
const DELTA = 5

const bubbleCounter = [...new Array(BUBBLE_COUNT)].map((_, i) => i)

const Bubble = () => {
  const { viewport } = useThree()
  const ref = useRef<Mesh>(null)

  const position = useMemo(() => {
    const x = viewport.width * (Math.random() - 0.5)
    const y = -1 * viewport.height * Math.random()
    const z = viewport.width * (Math.random() - 0.5)
    return new THREE.Vector3(x, y, z)
  }, [viewport])

  useFrame(() => {
    if (!ref.current) return
    // 下から上へ上がっていく
    ref.current.position.x += random(-1 * DELTA, DELTA) * 0.1
    ref.current.position.y += DELTA / 2
    ref.current.position.z += random(-1 * DELTA, DELTA) * 0.1
    // ウィンドウの上端に達したら初期位置に戻す
    if (ref.current.position.y > viewport.height) {
      const x = viewport.width * (Math.random() - 0.5)
      const y = -1 * viewport.height * Math.random()
      const z = viewport.width * (Math.random() - 0.5)
      ref.current.position.set(x, y, z)
    }
  })

  const opacity = useMemo(() => random(0.1, 0.6), [])

  const size = useMemo(() => random(BUBBLE_SCALE * 0.5, BUBBLE_SCALE), [])

  return (
    <mesh position={position} ref={ref}>
      <sphereGeometry args={[size, size * 5, size * 5]} />
      <meshLambertMaterial color="#bef0ff" opacity={opacity} transparent />
    </mesh>
  )
}

const Particle = () => {
  return (
    <>
      {bubbleCounter.map(i => (
        <Bubble key={i} />
      ))}
    </>
  )
}

export const BubbleParticle = () => {
  return (
    <Canvas
      camera={{ position: [0, 500, 1000], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{
        backgroundImage: "linear-gradient( 175deg, #52E5E7 30%, #2464ff 100%)",
      }}
    >
      <ambientLight color="#52E5E7" intensity={0.5} position={[0, 0, 1000]} />
      <pointLight position={[0, -500, 1000]} color="#ffffff" intensity={0.5} />
      <Particle />
    </Canvas>
  )
}
