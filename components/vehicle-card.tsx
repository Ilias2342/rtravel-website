"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

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
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card
        className="h-full flex flex-col overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={imageError ? "/placeholder.svg?height=300&width=400" : imageUrl}
            alt={name}
            fill
            className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <Badge variant="outline" className="absolute top-3 right-3 bg-black/50 text-white border-0 backdrop-blur-sm">
            {pricePerDay} MAD/jour
          </Badge>
        </div>
        <CardHeader className="pb-2">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold">{name}</CardTitle>
            <CardDescription className="text-sm font-medium">{type}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-1 pt-0">
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{description}</p>
          <div className="flex flex-wrap gap-2">
            {features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1 bg-secondary/50">
                <Check className="h-3 w-3" />
                {feature}
              </Badge>
            ))}
            {features.length > 3 && (
              <Badge variant="outline" className="flex items-center gap-1">
                +{features.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full group">
                <span>Réserver</span>
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
    </motion.div>
  )
}
