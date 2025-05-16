"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

interface VisitorCounterProps {
  initialCount: number
  page: string
}

export function VisitorCounter({ initialCount, page }: VisitorCounterProps) {
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    // Update count every 10 seconds
    const interval = setInterval(async () => {
      const response = await fetch(`/api/visitors?page=${encodeURIComponent(page)}`)
      const data = await response.json()
      setCount(data.count)
    }, 10000)

    return () => clearInterval(interval)
  }, [page])

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Visiteurs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{count}</div>
          <Users className="h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground mt-1">Visiteurs sur cette page</p>
      </CardContent>
    </Card>
  )
}
