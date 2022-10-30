import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import Simplex from "perlin-simplex"
import { useRef } from "react"

const simplex = new Simplex()

const LINE_COUNT = 50
const LINE_LENGTH = 100
const SEGMENT_COUNT = 500
const AMPLITUDE = 5

const lineLoop = [...new Array(LINE_COUNT)].map((_, i) => i)
const segmentLoop = [...new Array(SEGMENT_COUNT)].map((_, j) => j)

const colors = lineLoop.map(i => {
  const h = Math.round((i / LINE_COUNT) * 360)
  const s = 100
  const l = Math.round((i / LINE_COUNT) * 100)
  const color = new THREE.Color(`hsl(${h},${s}%,${l}%)`)
  return color
})

interface PerlinLineProps {
  color: THREE.Color
  lineIdx: number
}

const PerlinLine = ({ color, lineIdx: i }: PerlinLineProps) => {
  const ref = useRef<SVGLineElement>(null)

  useFrame(() => {
    const time = Date.now() / 4000
    if (!ref.current) return
    const newPoints = segmentLoop.map(j => {
      const x = (LINE_LENGTH / SEGMENT_COUNT) * j - LINE_LENGTH / 2
      const y = AMPLITUDE * simplex.noise(j / (50 + i), i / 50 + time)
      const z = i * 0.1 - (LINE_COUNT * 0.1) / 2
      return new THREE.Vector3(x, y, z)
    })
    ref.current.geometry.setFromPoints(newPoints)
  })

  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial attach="material" color={color} linewidth={0.1} />
    </line>
  )
}

const Particles = () => {
  return (
    <group>
      {colors.map((color, i) => (
        <PerlinLine color={color} lineIdx={i} key={i} />
      ))}
    </group>
  )
}

export const PerlinLineAnimation = () => {
  return (
    <Canvas dpr={2} linear>
      <color attach="background" args={["#525E75"]} />
      <OrbitControls />
      <Particles />
    </Canvas>
  )
}
