import Link from "next/link"

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/demo/basic-box">BasicBox</Link>
      </li>
      <li>
        <Link href="/demo/holographic-interactions">
          HolographicInteractions
        </Link>
      </li>
    </ul>
  )
}
