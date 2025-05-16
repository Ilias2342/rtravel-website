"use server"

import { revalidatePath } from "next/cache"
import { checkAvailability, makeReservation } from "@/lib/redis"
import { z } from "zod"

const reservationSchema = z.object({
  vehicleId: z.string(),
  date: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  message: z.string().optional(),
})

export async function createReservation(formData: FormData) {
  try {
    // Extract and validate form data
    const data = {
      vehicleId: formData.get("vehicleId") as string,
      date: formData.get("date") as string,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    }

    const validated = reservationSchema.parse(data)

    // Check availability
    const isAvailable = await checkAvailability(validated.vehicleId, validated.date)
    if (!isAvailable) {
      return {
        success: false,
        message: "Ce véhicule n'est pas disponible à cette date. Veuillez choisir une autre date.",
      }
    }

    // Create temporary user ID (in a real app, this would be from auth)
    const tempUserId = `guest-${Date.now()}`

    // Make reservation
    const result = await makeReservation(validated.vehicleId, validated.date, tempUserId, {
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      message: validated.message,
    })

    if (result) {
      revalidatePath("/transport")
      return {
        success: true,
        message: "Votre réservation a été confirmée. Nous vous contacterons bientôt.",
      }
    } else {
      return {
        success: false,
        message: "Une erreur s'est produite lors de la réservation. Veuillez réessayer.",
      }
    }
  } catch (error) {
    console.error("Reservation error:", error)
    return {
      success: false,
      message: "Une erreur s'est produite. Veuillez vérifier vos informations et réessayer.",
    }
  }
}
