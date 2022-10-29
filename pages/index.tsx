import styled from "styled-components"
import { BasicDemo } from "../examples/react-three-fiber/basic/BasicDemo"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`

export default function Home() {
  return (
    <Container>
      <BasicDemo />
    </Container>
  )
}
