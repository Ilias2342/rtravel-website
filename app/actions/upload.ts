"use server"

import { revalidatePath } from "next/cache"
import { uploadImage, isImageFile, isPdfFile } from "@/lib/blob"
import { redis } from "@/lib/redis"
import { z } from "zod"

// Schema for vehicle data
const vehicleSchema = z.object({
  name: z.string().min(2),
  type: z.string(),
  description: z.string(),
  pricePerDay: z.number().positive(),
  features: z.array(z.string()),
})

// Schema for destination data
const destinationSchema = z.object({
  name: z.string().min(2),
  location: z.string(),
  description: z.string(),
  highlights: z.array(z.string()),
})

export async function uploadVehicleImage(formData: FormData) {
  try {
    const file = formData.get("file") as File

    if (!file || !isImageFile(file)) {
      return { success: false, message: "Veuillez télécharger une image valide." }
    }

    // Upload image to Blob storage
    const blob = await uploadImage(file, "vehicles")

    // Extract and validate vehicle data
    const vehicleData = {
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      description: formData.get("description") as string,
      pricePerDay: Number(formData.get("pricePerDay")),
      features: (formData.get("features") as string).split(",").map((f) => f.trim()),
    }

    const validated = vehicleSchema.parse(vehicleData)

    // Store vehicle data in Redis
    const vehicleId = `vehicle:${Date.now()}`
    await redis.hset(vehicleId, {
      ...validated,
      imageUrl: blob.url,
      features: JSON.stringify(validated.features),
      createdAt: new Date().toISOString(),
    })

    // Add to vehicles set
    await redis.sadd("vehicles", vehicleId)

    revalidatePath("/transport")
    return { success: true, message: "Véhicule ajouté avec succès.", url: blob.url }
  } catch (error) {
    console.error("Upload error:", error)
    return { success: false, message: "Une erreur s'est produite lors du téléchargement." }
  }
}

export async function uploadDestinationImage(formData: FormData) {
  try {
    const file = formData.get("file") as File

    if (!file || !isImageFile(file)) {
      return { success: false, message: "Veuillez télécharger une image valide." }
    }

    // Upload image to Blob storage
    const blob = await uploadImage(file, "destinations")

    // Extract and validate destination data
    const destinationData = {
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      description: formData.get("description") as string,
      highlights: (formData.get("highlights") as string).split(",").map((h) => h.trim()),
    }

    const validated = destinationSchema.parse(destinationData)

    // Store destination data in Redis
    const destinationId = `destination:${Date.now()}`
    await redis.hset(destinationId, {
      ...validated,
      imageUrl: blob.url,
      highlights: JSON.stringify(validated.highlights),
      createdAt: new Date().toISOString(),
    })

    // Add to destinations set
    await redis.sadd("destinations", destinationId)

    revalidatePath("/tourist")
    return { success: true, message: "Destination ajoutée avec succès.", url: blob.url }
  } catch (error) {
    console.error("Upload error:", error)
    return { success: false, message: "Une erreur s'est produite lors du téléchargement." }
  }
}

export async function uploadDocument(formData: FormData) {
  try {
    const file = formData.get("file") as File

    if (!file || !isPdfFile(file)) {
      return { success: false, message: "Veuillez télécharger un document PDF valide." }
    }

    // Upload document to Blob storage
    const blob = await uploadImage(file, "documents")

    // Store document data in Redis
    const documentId = `document:${Date.now()}`
    await redis.hset(documentId, {
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      description: (formData.get("description") as string) || "",
      fileUrl: blob.url,
      createdAt: new Date().toISOString(),
    })

    // Add to documents set
    await redis.sadd("documents", documentId)

    revalidatePath("/admin/documents")
    return { success: true, message: "Document ajouté avec succès.", url: blob.url }
  } catch (error) {
    console.error("Upload error:", error)
    return { success: false, message: "Une erreur s'est produite lors du téléchargement." }
  }
}
