/* eslint-disable jsx-a11y/alt-text */

/**
 * @see https://codesandbox.io/s/scrollcontrols-with-minimap-yjhzv
 */

import {
  Image,
  Preload,
  Scroll,
  ScrollControls,
  useScroll,
} from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Suspense, useRef } from "react"
import styled from "styled-components"
import { Group } from "three"

const Title = styled.div`
  font-size: 15rem;
  font-weight: 400;
  letter-spacing: -0.05em;
  line-height: 0.7em;
  margin: 0;
  padding: 0;
  user-select: none;
`

const Images = () => {
  const { width: w, height: h } = useThree(state => state.viewport)
  const scroll = useScroll()
  const ref = useRef<Group>(null)

  useFrame(() => {
    if (!ref.current) return
    const mesh = ref.current.children as any[]
    mesh[0].material.zoom = 1 + scroll.range(0, 1 / 3) / 3
    mesh[1].material.zoom = 1 + scroll.range(0, 1 / 3) / 3
    mesh[2].material.zoom = 1 + scroll.range(1.15 / 3, 1 / 3) / 3
    mesh[3].material.zoom = 1 + scroll.range(1.15 / 3, 1 / 3) / 2
    mesh[4].material.zoom = 1 + scroll.range(1.25 / 3, 1 / 3) / 1
    mesh[5].material.zoom = 1 + scroll.range(1.8 / 3, 1 / 3) / 3
    mesh[5].material.grayscale = 1 - scroll.range(1.6 / 3, 1 / 3)
    mesh[6].material.zoom = 1 + (1 - scroll.range(2 / 3, 1 / 3)) / 3
  })

  return (
    <group ref={ref}>
      <Image
        position={[-2, 0, 0]}
        scale={[4, h]}
        url="/images/parallax-scroll/img1.jpg"
      />
      <Image
        position={[2, 0, 1]}
        scale={3}
        url="/images/parallax-scroll/img6.jpg"
      />
      <Image
        position={[-2.3, -h, 2]}
        scale={[1, 3]}
        url="/images/parallax-scroll/trip2.jpg"
      />
      <Image
        position={[-0.6, -h, 3]}
        scale={[1, 2]}
        url="/images/parallax-scroll/img8.jpg"
      />
      <Image
        position={[0.75, -h, 3.5]}
        scale={1.5}
        url="/images/parallax-scroll/trip4.jpg"
      />
      <Image
        position={[0, -h * 1.5, 2.5]}
        scale={[1.5, 3]}
        url="/images/parallax-scroll/img3.jpg"
      />
      <Image
        position={[0, -h * 2 - h / 4, 0]}
        scale={[w, h / 2]}
        url="/images/parallax-scroll/img7.jpg"
      />
    </group>
  )
}

export const ParallaxScroll = () => {
  return (
    <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ScrollControls damping={4} pages={3}>
          <Scroll>
            <Images />
          </Scroll>
          <Scroll html>
            <Title style={{ position: "absolute", top: "60vh", left: "0.5em" }}>
              to
            </Title>
            <Title style={{ position: "absolute", top: "120vh", left: "60vw" }}>
              be
            </Title>
            <Title
              style={{
                position: "absolute",
                top: "198.5vh",
                left: "0.5vw",
                fontSize: "40vw",
              }}
            >
              home
            </Title>
          </Scroll>
        </ScrollControls>
        <Preload />
      </Suspense>
    </Canvas>
  )
}
