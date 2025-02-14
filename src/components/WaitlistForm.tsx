
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

const WaitlistForm = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Successfully joined waitlist!",
      description: "We'll notify you when we launch.",
    })

    setEmail("")
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="w-full bg-white/10 text-white placeholder-white/50 border-white/20 text-center"
      />
      <Button
        type="submit"
        disabled={isLoading}
        className="bg-primary hover:bg-primary-hover text-white w-full sm:w-auto"
      >
        {isLoading ? "Joining..." : "Join Waitlist"}
      </Button>
    </form>
  )
}

export default WaitlistForm
