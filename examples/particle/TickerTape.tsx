import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useMemo, useRef } from "react"
import { Mesh } from "three"
import randomColor from "randomcolor"

const PAPER_COUNT = 600
const PAPER_SCALE = 6

const paperCounter = [...new Array(PAPER_COUNT)].map((_, i) => i)

interface PaperProps {
  color: string
}

const Paper = ({ color }: PaperProps) => {
  const { viewport } = useThree()
  const ref = useRef<Mesh>(null)

  const position = useMemo(() => {
    const x = viewport.width * (Math.random() - 0.5)
    const y = viewport.height * (Math.random() - 0.5)
    const z = viewport.width * (Math.random() - 0.5)
    return new THREE.Vector3(x, y, z)
  }, [viewport])

  useFrame(() => {
    if (!ref.current) return
    ref.current.rotation.x += Math.random() * 0.1
    ref.current.rotation.y += Math.random() * 0.1
    ref.current.rotation.z += Math.random() * 0.1
  })

  return (
    <mesh position={position} ref={ref}>
      <planeGeometry args={[PAPER_SCALE, PAPER_SCALE]} />
      <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent />
    </mesh>
  )
}

const Particle = () => {
  const colors = useMemo(() => {
    return randomColor({ luminosity: "light", count: PAPER_COUNT })
  }, [])

  return (
    <>
      {paperCounter.map(i => (
        <Paper key={i} color={colors[i]} />
      ))}
    </>
  )
}

const CameraRotation = () => {
  const angle = useRef<number>(0)

  useFrame(({ camera }) => {
    angle.current += 0.2
    const radian = THREE.MathUtils.degToRad(angle.current)
    const x = 1000 * Math.sin(radian)
    const z = 1000 * Math.cos(radian)
    camera.position.set(x, 0, z)
    camera.lookAt(0, 0, 0)
  })

  return null
}

export const TickerTape = () => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 1000],
        fov: 45,
      }}
    >
      <directionalLight color="white" intensity={1} position={[0, 0, 1000]} />
      <color attach="background" args={["#CDFCF6"]} />
      <Particle />
      <CameraRotation />
    </Canvas>
  )
}
