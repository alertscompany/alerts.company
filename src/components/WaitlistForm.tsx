
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

const WaitlistForm = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }])

      if (error) {
        if (error.code === '23505') { // Unique violation error code
          throw new Error('This email is already on the waitlist!')
        }
        if (error.code === 'PGRST116') { // Policy violation error code
          throw new Error('Too many signup attempts. Please try again later.')
        }
        throw error
      }

      toast({
        title: "Successfully joined waitlist!",
        description: "We'll notify you when we launch.",
      })

      setEmail("")
    } catch (error: any) {
      toast({
        title: "Error joining waitlist",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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
