import { RoundedBox } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { radians } from "./calc"

export const HolographicInteractions = () => {
  return (
    <Canvas>
      <RoundedBox args={[0.5, 0.5, 0.5]} radius={0.25} rotation={[0, 0, 0]} />
      <coneBufferGeometry
        args={[0.3, 0.5, 32]}
        rotation={[0, 0, radians(-180)]}
      />
    </Canvas>
  )
}
