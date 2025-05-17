"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface LocationCardProps {
  id: string
  name: string
  description: string
  imageUrl: string
  services: string[]
  coordinates: {
    lat: number
    lng: number
  }
  address?: string
  phone?: string
  email?: string
  openingHours?: string
}

export function LocationCard({
  id,
  name,
  description,
  imageUrl,
  services,
  coordinates,
  address,
  phone,
  email,
  openingHours,
}: LocationCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Generate structured data for this location
  const locationStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://www.rtravel.ma/locations/${id}#location`,
    name: `R'TRAVEL ${name}`,
    image: imageUrl,
    description: description,
    url: `https://www.rtravel.ma/locations/${id}`,
    telephone: phone || "06 61 07 99 96",
    email: email || "rtravel.contact@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: address || "Hay El Manzah, N° 1160, CYM",
      addressLocality: name,
      addressRegion: name,
      addressCountry: "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "20:00",
    },
    priceRange: "$$",
    areaServed: {
      "@type": "City",
      name: name,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(locationStructuredData) }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
      >
        <Card
          className="h-full flex flex-col overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={imageError ? "/placeholder.svg?height=300&width=400" : imageUrl}
              alt={`R'TRAVEL services à ${name}`}
              fill
              className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <CardHeader className="pb-2">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold">{name}</CardTitle>
              <CardDescription className="text-sm font-medium">Zone de service R'TRAVEL</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="flex-1 pt-0">
            <p className="text-sm text-muted-foreground mb-4">{description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {services.slice(0, 3).map((service, index) => (
                <Badge key={index} variant="secondary" className="bg-secondary/50">
                  {service}
                </Badge>
              ))}
              {services.length > 3 && <Badge variant="outline">+{services.length - 3}</Badge>}
            </div>

            {address && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{address}</span>
              </div>
            )}

            {phone && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{phone}</span>
              </div>
            )}

            {openingHours && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{openingHours}</span>
              </div>
            )}
          </CardContent>

          <CardFooter>
            <Link href={`/locations/${id}`} className="w-full">
              <Button className="w-full group">
                <span>Voir les détails</span>
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </>
  )
}
