
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
      className="text-white font-bold tracking-wider text-center px-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl break-words"
      style={{ fontFamily: "monospace", maxWidth: "100vw", wordWrap: "break-word" }}
    >
      The Alerts Company
    </h1>
  )
}

export default ScrambledTitle
