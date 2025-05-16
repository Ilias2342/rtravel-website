"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Car, Check } from "lucide-react"

interface VehicleCardProps {
  id: string
  name: string
  type: string
  description: string
  pricePerDay: number
  imageUrl: string
  features: string[]
}

export function VehicleCard({ id, name, type, description, pricePerDay, imageUrl, features }: VehicleCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={imageError ? "/placeholder.svg?height=300&width=400" : imageUrl}
          alt={name}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{type}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/10">
            {pricePerDay} MAD/jour
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              <Check className="h-3 w-3" />
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Car className="mr-2 h-4 w-4" />
              Réserver
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <div className="text-center p-4">
              <h3 className="text-lg font-semibold mb-2">Réservation</h3>
              <p className="mb-4">Pour réserver ce véhicule, veuillez nous contacter:</p>
              <Button asChild className="w-full">
                <a href="tel:+212661079996">Appeler: 06 61 07 99 96</a>
              </Button>
              <div className="mt-2">
                <Button asChild variant="outline" className="w-full">
                  <a href="mailto:rtravel.contact@gmail.com">Email: rtravel.contact@gmail.com</a>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
