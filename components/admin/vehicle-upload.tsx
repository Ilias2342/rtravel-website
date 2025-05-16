"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { uploadVehicleImage } from "@/app/actions/upload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { UploadIcon } from "lucide-react"

export function VehicleUploadForm() {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsUploading(true)

    const formData = new FormData(event.currentTarget)
    const result = await uploadVehicleImage(formData)

    setIsUploading(false)

    if (result.success) {
      toast({
        title: "Véhicule ajouté",
        description: result.message,
      })
      router.refresh()
      // Reset form
      event.currentTarget.reset()
      setPreview(null)
    } else {
      toast({
        title: "Erreur",
        description: result.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Ajouter un véhicule</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file">Image du véhicule</Label>
          <div className="flex items-center gap-4">
            <Input
              id="file"
              name="file"
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="flex-1"
            />
          </div>
          {preview && (
            <div className="mt-2">
              <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full max-w-md h-auto rounded-md" />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nom du véhicule</Label>
          <Input id="name" name="name" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type de véhicule</Label>
          <Input id="type" name="type" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pricePerDay">Prix par jour (MAD)</Label>
          <Input id="pricePerDay" name="pricePerDay" type="number" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="features">Caractéristiques (séparées par des virgules)</Label>
          <Input id="features" name="features" required placeholder="Climatisation, GPS, 5 places, etc." />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" rows={4} required />
        </div>

        <Button type="submit" className="w-full" disabled={isUploading}>
          {isUploading ? (
            <>
              <UploadIcon className="mr-2 h-4 w-4 animate-spin" />
              Téléchargement...
            </>
          ) : (
            "Ajouter le véhicule"
          )}
        </Button>
      </form>
    </div>
  )
}
