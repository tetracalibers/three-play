import { Canvas } from "@react-three/fiber"
import * as THREE from "three"
import { useSprings, a } from "@react-spring/three"
import { useEffect } from "react"

const COUNT = 40

const COLORS = [
  "#A2CCB6",
  "#FCEEB5",
  "#EE786E",
  "#e0feff",
  "lightpink",
  "lightblue",
]

const SCALE_FACTOR = 10
const SIZE_FACTOR = 8
const POSITION_FACTOR = 200

const random = (i: number) => {
  const r = Math.random()
  return {
    position: [
      100 - Math.random() * POSITION_FACTOR,
      100 - Math.random() * POSITION_FACTOR,
      i * 1.5,
    ],
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
    scale: [1 + r * SCALE_FACTOR, 1 + r * SCALE_FACTOR, 1],
    rotation: [0, 0, THREE.MathUtils.degToRad(Math.round(Math.random()) * 45)],
  }
}

const boxData = new Array(COUNT).fill(0).map(() => {
  return {
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
    args: [
      0.1 + Math.random() * SIZE_FACTOR,
      0.1 + Math.random() * SIZE_FACTOR,
      10,
    ],
  }
})

const Boxes = () => {
  const [springs, api] = useSprings(COUNT, i => ({
    from: random(i),
    ...random(i),
    config: { mass: 20, tension: 150, friction: 50 },
  }))
  useEffect(() => {
    setInterval(() => api.start(i => ({ ...random(i), delay: i * 40 })), 2000)
  }, [api])
  return (
    <>
      {boxData.map((d, idx) => (
        <a.mesh key={idx} {...springs[idx]} castShadow receiveShadow>
          <boxGeometry attach="geometry" args={d.args} />
          <a.meshStandardMaterial
            attach="material"
            color={springs[idx].color}
            roughness={0.75}
            metalness={0.5}
          />
        </a.mesh>
      ))}
    </>
  )
}

export const SpringyBoxes = () => {
  return (
    <Canvas flat shadows camera={{ position: [0, 0, 100], fov: 100 }}>
      <pointLight intensity={0.3} />
      <ambientLight intensity={2} />
      <spotLight
        castShadow
        intensity={0.2}
        angle={Math.PI / 7}
        position={[150, 150, 250]}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Boxes />
    </Canvas>
  )
}
