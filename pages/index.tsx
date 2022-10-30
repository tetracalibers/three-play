import Link from "next/link"

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/demo/basic-box">BasicBox</Link>
      </li>
      <li>
        <Link href="/demo/spherical-word-cloud">SphericalWordCloud</Link>
      </li>
      <li>
        <Link href="/demo/springy-boxes">SpringyBoxes</Link>
      </li>
      <li>
        <Link href="/demo/ballpit">Ballpit</Link>
      </li>
      <li>
        <Link href="/demo/confetti">Confetti</Link>
      </li>
      <li>
        <Link href="/demo/holographic-interactions">
          HolographicInteractions
        </Link>
      </li>
    </ul>
  )
}
