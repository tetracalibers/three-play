/* eslint-disable jsx-a11y/alt-text */

/**
 * @see https://codesandbox.io/s/useintersect-and-scrollcontrols-gsm1y
 */

import { Image, Scroll, ScrollControls, useIntersect } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef, useState } from "react"
import styled from "styled-components"
import * as THREE from "three"

interface ItemProps {
  url: string
  scale: [number, number]
  position: [number, number, number]
}

const Item = ({ url, scale, position }: ItemProps) => {
  const visible = useRef(false)
  const ref = useIntersect<any>(isVisible => (visible.current = isVisible))
  const [hovered, hover] = useState(false)
  const { height: h } = useThree(state => state.viewport)

  useFrame((_, delta) => {
    ref.current.position.y = THREE.MathUtils.damp(
      ref.current.position.y,
      visible.current ? 0 : -h / 2 + 1,
      4,
      delta,
    )
    ref.current.material.zoom = THREE.MathUtils.damp(
      ref.current.material.zoom,
      visible.current ? 1 : 1.5,
      4,
      delta,
    )
    ref.current.material.grayscale = THREE.MathUtils.damp(
      ref.current.material.grayscale,
      hovered ? 0 : 1,
      4,
      delta,
    )
  })

  return (
    <group position={position}>
      <Image
        ref={ref}
        url={url}
        scale={scale}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      />
    </group>
  )
}

const ParallaxItems = () => {
  const { width: w, height: h } = useThree(state => state.viewport)

  return (
    <Scroll>
      <Item
        url="/images/interior1.jpg"
        scale={[w / 3, w / 3]}
        position={[-w / 6, 0, 0]}
      />
      <Item
        url="/images/interior2.jpg"
        scale={[2, w / 3]}
        position={[w / 30, -h, 0]}
      />
      <Item
        url="/images/interior3.jpg"
        scale={[w / 3, w / 5]}
        position={[-w / 4, -h * 1, 0]}
      />
      <Item
        url="/images/interior4.jpg"
        scale={[w / 5, w / 5]}
        position={[w / 4, -h * 1.2, 0]}
      />
      <Item
        url="/images/interior5.jpg"
        scale={[w / 5, w / 5]}
        position={[w / 10, -h * 1.75, 0]}
      />
      <Item
        url="/images/interior6.jpg"
        scale={[w / 3, w / 3]}
        position={[-w / 4, -h * 2, 0]}
      />
      <Item
        url="/images/interior7.jpg"
        scale={[w / 3, w / 5]}
        position={[-w / 4, -h * 2.6, 0]}
      />
      <Item
        url="/images/interior8.jpg"
        scale={[w / 2, w / 2]}
        position={[w / 4, -h * 3.1, 0]}
      />
      <Item
        url="/images/trip4.jpg"
        scale={[w / 2.5, w / 2]}
        position={[-w / 6, -h * 4.1, 0]}
      />
    </Scroll>
  )
}

const Text = styled.div`
  font-size: min(15vw, 50vh);
  font-weight: 400;
  letter-spacing: -0.05em;
  line-height: 0.7em;
  margin: 0;
  padding: 0;
  user-select: none;
  color: #4a5368;
`

const PositionRelative = styled.div`
  width: 100vw;
  position: relative;
`

const Content = () => {
  return (
    <Scroll html>
      <PositionRelative>
        <Text
          style={{
            position: "absolute",
            top: `100vh`,
            right: "20vw",
            fontSize: "25em",
            transform: `translate3d(0,-100%,0)`,
            lineHeight: "1em",
          }}
        >
          all
        </Text>
        <Text style={{ position: "absolute", top: "180vh", left: "10vw" }}>
          hail
        </Text>
        <Text style={{ position: "absolute", top: "260vh", right: "10vw" }}>
          thee,
        </Text>
        <Text style={{ position: "absolute", top: "350vh", left: "10vw" }}>
          thoth
        </Text>
        <Text style={{ position: "absolute", top: "450vh", right: "10vw" }}>
          her
          <br />
          mes.
        </Text>
      </PositionRelative>
    </Scroll>
  )
}

export const SimpleParallax = () => {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 80 }}
      gl={{ alpha: false, antialias: false, stencil: false, depth: false }}
      dpr={[1, 1.5]}
    >
      <color attach="background" args={["#f0f0f0"]} />
      <ScrollControls damping={6} pages={5}>
        <ParallaxItems />
        <Content />
      </ScrollControls>
    </Canvas>
  )
}
