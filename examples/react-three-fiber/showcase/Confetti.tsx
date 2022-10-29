import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { BufferGeometry, DirectionalLight, Mesh } from "three"

interface FatlineProps {
  curve: number[]
  width: number
  color: string
  speed: number
}

const geometry = new THREE.BufferGeometry()

const Fatline = ({ curve, width, color, speed }: FatlineProps) => {
  useEffect(() => {
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(curve, 3),
    )
  }, [curve])

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          usage={THREE.DynamicDrawUsage}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          usage={THREE.DynamicDrawUsage}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        vertexColors
        size={10}
        sizeAttenuation={false}
      />
    </points>
  )
}

interface LinesProps {
  count: number
  colors: string[]
}

const Lines = ({ count, colors }: LinesProps) => {
  const lines = useMemo(() => {
    const lineCounter = new Array(count).fill(0)
    const pointCounter = new Array(30).fill(0)
    const lineProps = lineCounter.map(() => {
      const pos = new THREE.Vector3(
        10 - Math.random() * 20,
        10 - Math.random() * 20,
        10 - Math.random() * 20,
      )
      const points = pointCounter.map(() => {
        const coords = pos
          .add(
            new THREE.Vector3(
              4 - Math.random() * 8,
              4 - Math.random() * 8,
              2 - Math.random() * 4,
            ),
          )
          .clone()
        return coords
      })
      const curve = new THREE.CatmullRomCurve3(points).getPoints(1000)

      return {
        color:
          colors[Math.floor((colors.length * Math.random()) % colors.length)],
        width: 5 * Math.random(),
        speed: Math.max(0.0001, 0.0005 * Math.random()),
        curve: curve.flatMap(v => v.toArray()),
      }
    })
    return lineProps
  }, [colors, count])

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={lines.length / 3}
          array={lines.map(line => line.curve).flat()}
          itemSize={3}
          usage={THREE.DynamicDrawUsage}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          usage={THREE.DynamicDrawUsage}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        vertexColors
        size={10}
        sizeAttenuation={false}
      />
    </points>
  )
}

const CameraControl = () => {
  const { camera, viewport } = useThree()

  useFrame(state => {
    camera.position.x +=
      (state.mouse.x * viewport.width - camera.position.x) * 0.05
    camera.position.y +=
      (-state.mouse.y * viewport.height - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })

  return null
}

export const Confetti = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Lines
        count={100}
        colors={[
          "#A2CCB6",
          "#FCEEB5",
          "#EE786E",
          "#e0feff",
          "lightpink",
          "lightblue",
        ]}
      />
      <CameraControl />
    </Canvas>
  )
}
