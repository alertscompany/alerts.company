
"use client"

import { useState, useEffect, useRef } from "react"
import { TextScramble } from "@/utils/TextScramble"

const ScrambledTitle = () => {
  const elementRef = useRef<HTMLHeadingElement>(null)
  const scramblerRef = useRef<TextScramble | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (elementRef.current && !scramblerRef.current) {
      scramblerRef.current = new TextScramble(elementRef.current)
      setMounted(true)
    }
  }, [])

  useEffect(() => {
    if (mounted && scramblerRef.current) {
      const phrases = [
        "The Alerts Company",
        "Superhuman for Alerts",
        "Transform Your Inbox",
        "Streamline Your Workflow",
        "Intelligent Alert Management",
        "Join Our Waitlist Today",
      ]

      let counter = 0
      const next = () => {
        if (scramblerRef.current) {
          scramblerRef.current.setText(phrases[counter]).then(() => {
            setTimeout(next, 2000)
          })
          counter = (counter + 1) % phrases.length
        }
      }

      next()
    }
  }, [mounted])

  return (
    <h1
      ref={elementRef}
      className="text-white text-6xl font-bold tracking-wider text-center"
      style={{ fontFamily: "monospace" }}
    >
      The Alerts Company
    </h1>
  )
}

export default ScrambledTitle
