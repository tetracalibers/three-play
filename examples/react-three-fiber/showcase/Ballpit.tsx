/**
 * @see https://codesandbox.io/s/ballpit-mvkqs
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Physics, usePlane, useSphere } from "@react-three/cannon"
import { EffectComposer, SSAO } from "@react-three/postprocessing"

const FOG_COLOR = "#D2DAFF"
const BALL_COLOR = "#ffffff"
const BG_COLOR = "#FFDEFA"

const Balls = ({ count = 200 }) => {
  const { viewport } = useThree()

  const [ref] = useSphere(index => ({
    mass: 100,
    position: [4 - Math.random() * 8, viewport.height, 0],
    args: [1.2],
  }))

  return (
    <instancedMesh ref={ref} castShadow receiveShadow args={[, , count]}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshLambertMaterial color={BALL_COLOR} />
    </instancedMesh>
  )
}

interface PlaneProps {
  position: [number, number, number]
  rotation: [number, number, number]
}

const Plane = ({ ...props }: PlaneProps) => {
  usePlane(() => ({ ...props }))
  return null
}

const Walls = () => {
  const { viewport } = useThree()

  return (
    <>
      {/** 底面 */}
      <Plane
        position={[0, -viewport.height / 2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      {/** 左の壁 */}
      <Plane
        position={[-viewport.width / 2 - 1, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      {/** 右の壁 */}
      <Plane
        position={[viewport.width / 2 + 1, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      {/** 奥の壁 */}
      <Plane position={[0, 0, -1]} rotation={[0, 0, 0]} />
      {/** 手前の壁 */}
      <Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
    </>
  )
}

const Mouse = () => {
  const { viewport } = useThree()
  const [, api] = useSphere(() => ({ type: "Kinematic", args: [6] }))
  useFrame(state =>
    api.position.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      7,
    ),
  )
  return null
}

export const Ballpit = () => {
  return (
    <Canvas
      shadows
      gl={{ stencil: false, antialias: false }}
      camera={{ position: [0, 0, 20], fov: 50, near: 17, far: 40 }}
    >
      <fog attach="fog" args={[FOG_COLOR, 25, 35]} />
      <color attach="background" args={[BG_COLOR]} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <directionalLight
        castShadow
        intensity={4}
        position={[50, 50, 25]}
        shadow-mapSize={[256, 256]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <hemisphereLight
        args={[FOG_COLOR, "#ffffff", 1]}
        position={[50, 50, 100]}
      />
      <Physics
        gravity={[0, -50, 0]}
        defaultContactMaterial={{ restitution: 0.5 }}
      >
        <group position={[0, 0, -10]}>
          <Mouse />
          <Walls />
          <Balls />
        </group>
      </Physics>
      <EffectComposer>
        <SSAO
          radius={0.4}
          intensity={40}
          luminanceInfluence={0.4}
          color={FOG_COLOR}
        />
      </EffectComposer>
    </Canvas>
  )
}
