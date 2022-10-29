import { Text, TrackballControls } from "@react-three/drei"
import { Canvas, MeshProps, ThreeEvent, useFrame } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { BufferGeometry, Material, Mesh } from "three"
import randomWord from "random-words"

interface WordProps extends MeshProps {
  children: string
}

const Word = ({ children, ...props }: WordProps) => {
  const color = new THREE.Color()
  const fontProps = {
    font: "/Mogra-Regular.ttf",
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  }
  const ref = useRef<Mesh<BufferGeometry, Material | Material[]>>(null)
  const [hovered, setHovered] = useState(false)
  const onHover = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setHovered(true)
  }
  const onHoverOut = () => setHovered(false)

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = "pointer"
    }
    return () => {
      document.body.style.cursor = "auto"
    }
  }, [hovered])

  useFrame(({ camera }) => {
    if (!ref.current) return
    ref.current.quaternion.copy(camera.quaternion)
  })

  return (
    <Text
      {...props}
      ref={ref}
      onPointerOver={onHover}
      onPointerOut={onHoverOut}
      color={color.lerp(color.set(hovered ? "#ECC5FB" : "#CDF0EA"), 0.1)}
      {...fontProps}
    >
      {children}
    </Text>
  )
}

const Cloud = ({ count = 4, radius = 20 }) => {
  const words = useMemo(() => {
    const spherical = new THREE.Spherical()
    const phiSpan = Math.PI / (count + 1)
    const thetaSpan = (Math.PI * 2) / count
    const counter = [...new Array(count)].map((_, i) => i)
    const state = counter.map(i => {
      return counter.map(j => {
        const posVector = new THREE.Vector3().setFromSpherical(
          spherical.set(radius, phiSpan * (i + 1), thetaSpan * j),
        )
        const [word] = randomWord(1)
        return [posVector, word] as const
      })
    })
    return state.flat()
  }, [count, radius])

  return (
    <>
      {words.map(([pos, word], index) => (
        <Word key={index} position={pos}>
          {word}
        </Word>
      ))}
    </>
  )
}

export const SphericalWordCloud = () => {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
      <fog attach="fog" args={["#F9F9F9", 0, 80]} />
      <Cloud count={8} radius={20} />
      <TrackballControls />
    </Canvas>
  )
}
