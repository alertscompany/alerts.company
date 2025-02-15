
"use client"

import { useState, useEffect, useCallback } from "react"
import ScrambledTitle from "./ScrambledTitle"

interface Character {
  char: string
  x: number
  y: number
  speed: number
}

interface RainingLettersProps {
  showForm?: boolean
}

const RainingLetters = ({ showForm = true }: RainingLettersProps) => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set())

  const createCharacters = useCallback(() => {
    const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
    const charCount = 300
    const newCharacters: Character[] = []

    for (let i = 0; i < charCount; i++) {
      newCharacters.push({
        char: allChars[Math.floor(Math.random() * allChars.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.1 + Math.random() * 0.3,
      })
    }

    return newCharacters
  }, [])

  useEffect(() => {
    setCharacters(createCharacters())
  }, [createCharacters])

  useEffect(() => {
    const updateActiveIndices = () => {
      const newActiveIndices = new Set<number>()
      const numActive = Math.floor(Math.random() * 3) + 3
      for (let i = 0; i < numActive; i++) {
        newActiveIndices.add(Math.floor(Math.random() * characters.length))
      }
      setActiveIndices(newActiveIndices)
    }

    const flickerInterval = setInterval(updateActiveIndices, 50)
    return () => clearInterval(flickerInterval)
  }, [characters.length])

  useEffect(() => {
    let animationFrameId: number

    const updatePositions = () => {
      setCharacters((prevChars) =>
        prevChars.map((char) => ({
          ...char,
          y: char.y + char.speed,
          ...(char.y >= 100 && {
            y: -5,
            x: Math.random() * 100,
            char: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"[
              Math.floor(Math.random() * "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?".length)
            ],
          }),
        })),
      )
      animationFrameId = requestAnimationFrame(updatePositions)
    }

    animationFrameId = requestAnimationFrame(updatePositions)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <div className="relative h-full bg-background overflow-hidden">
      {/* Radial Gradient Overlay */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80"
        style={{
          width: '1845px',
          height: '1230px',
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(92, 195, 250, 0.28) 0%, rgba(92, 195, 250, 0) 100%)',
        }}
      />

      {/* Title */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full px-4">
        <ScrambledTitle />
      </div>

      {/* Raining Characters */}
      {characters.map((char, index) => (
        <span
          key={index}
          className={`absolute text-xs transition-colors duration-100 ${
            activeIndices.has(index)
              ? "text-primary text-base scale-125 z-10 font-bold animate-pulse"
              : "text-slate-600 font-light"
          }`}
          style={{
            left: `${char.x}%`,
            top: `${char.y}%`,
            transform: `translate(-50%, -50%) ${activeIndices.has(index) ? "scale(1.25)" : "scale(1)"}`,
            textShadow: activeIndices.has(index)
              ? "0 0 8px rgba(255,255,255,0.8), 0 0 12px rgba(255,255,255,0.4)"
              : "none",
            opacity: activeIndices.has(index) ? 1 : 0.4,
            transition: "color 0.1s, transform 0.1s, text-shadow 0.1s",
            willChange: "transform, top",
            fontSize: activeIndices.has(index)
              ? "clamp(1rem, 4vw, 1.8rem)"
              : "clamp(0.75rem, 3vw, 1.5rem)",
          }}
        >
          {char.char}
        </span>
      ))}

      <style>
        {`
          .dud {
            color: #0EA5E9;
            opacity: 0.7;
          }
        `}
      </style>
    </div>
  )
}

export default RainingLetters
