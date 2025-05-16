"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createReservation } from "@/app/actions/reservation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

interface ReservationFormProps {
  vehicleId: string
  vehicleName: string
}

export function ReservationForm({ vehicleId, vehicleName }: ReservationFormProps) {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!date) {
      toast({
        title: "Date requise",
        description: "Veuillez sélectionner une date pour votre réservation.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    formData.set("vehicleId", vehicleId)
    formData.set("date", date.toISOString().split("T")[0])

    const result = await createReservation(formData)

    setIsSubmitting(false)

    if (result.success) {
      toast({
        title: "Réservation confirmée",
        description: result.message,
      })
      router.refresh()
    } else {
      toast({
        title: "Erreur de réservation",
        description: result.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Réserver {vehicleName}</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date de réservation</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: fr }) : "Sélectionner une date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nom complet</Label>
          <Input id="name" name="name" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" name="phone" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message (optionnel)</Label>
          <Textarea id="message" name="message" rows={3} />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Traitement en cours..." : "Réserver maintenant"}
        </Button>
      </form>
    </div>
  )
}
