
"use client"

import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"

const WaitlistData = () => {
  const { data: waitlistData, isLoading } = useQuery({
    queryKey: ['waitlist'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching waitlist:', error)
        throw error
      }

      return data
    }
  })

  if (isLoading) {
    return <div className="text-center">Loading waitlist data...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Waitlist Subscribers</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Signup Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {waitlistData?.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.email}</TableCell>
              <TableCell>
                {format(new Date(entry.created_at), 'MMM d, yyyy HH:mm')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="mt-4 text-sm text-muted-foreground">
        Total subscribers: {waitlistData?.length || 0}
      </p>
    </div>
  )
}

export default WaitlistData
