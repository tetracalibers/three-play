import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import Simplex from "perlin-simplex"
import { useRef } from "react"
import { Group } from "three"

const simplex = new Simplex()

const LINE_COUNT = 50
const LINE_LENGTH = 10
const SEGMENT_COUNT = 100
const AMPLITUDE = 5

const lineLoop = [...new Array(LINE_COUNT)].map((_, i) => i)
const segmentLoop = [...new Array(SEGMENT_COUNT)].map((_, j) => j)

const points = lineLoop.map(i =>
  segmentLoop.map(j => {
    const x = (LINE_LENGTH / SEGMENT_COUNT) * j - LINE_LENGTH / 2
    const y = 0
    const z = i * 0.3 - (LINE_COUNT * 0.3) / 2
    return new THREE.Vector3(x, y, z)
  }),
)

const colors = lineLoop.map(i => {
  const h = Math.round((i / LINE_COUNT) * 360)
  const s = 100
  const l = Math.round((i / LINE_COUNT) * 100)
  const color = new THREE.Color(`hsl(${h},${s}%,${l}%)`)
  return color
})

const geometies = lineLoop.map(i =>
  new THREE.BufferGeometry().setFromPoints(points[i]),
)

const Particles = () => {
  const ref = useRef<Group>(null)

  useFrame(_ => {
    for (const i of lineLoop) {
      const time = Date.now() / 4000
      const positions = geometies[i].getAttribute("position")

      for (const j of segmentLoop) {
        const x = (LINE_LENGTH / SEGMENT_COUNT) * j - LINE_LENGTH / 2
        const y = AMPLITUDE * simplex.noise(i / (50 + i), i / 50 + time)
        const z = i * 0.3 - (LINE_COUNT * 0.3) / 2
        positions.setX(j, x)
        positions.setY(j, y)
        positions.setZ(j, z)
      }
    }
  })

  return (
    <group ref={ref}>
      {geometies.map((line, i) => (
        <line key={i} geometry={line}>
          {/* <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={points[i].length / 3}
              itemSize={3}
              array={points[i]}
            />
          </bufferGeometry> */}
          <lineBasicMaterial
            attach="material"
            color={colors[i]}
            linewidth={0.1}
          />
        </line>
      ))}
    </group>
  )
}

export const PerlinLineAnimation = () => {
  return (
    <Canvas dpr={2}>
      <OrbitControls />
      <Particles />
    </Canvas>
  )
}
