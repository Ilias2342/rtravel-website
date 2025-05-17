import { Breadcrumb } from "@/components/breadcrumb"
import { SEO } from "@/components/seo"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Car, Bus, Calendar } from "lucide-react"
import { locations } from "@/data/locations"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function LocationDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const location = locations.find((loc) => loc.id === id)

  if (!location) {
    notFound()
  }

  // Generate structured data for this location
  const locationStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://www.rtravel.ma/locations/${id}#location`,
    name: `R'TRAVEL ${location.name}`,
    image: location.imageUrl,
    description: location.description,
    url: `https://www.rtravel.ma/locations/${id}`,
    telephone: location.phone || "06 61 07 99 96",
    email: location.email || "rtravel.contact@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address || "Hay El Manzah, N° 1160, CYM",
      addressLocality: location.name,
      addressRegion: location.name,
      addressCountry: "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
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
      name: location.name,
    },
  }

  return (
    <>
      <SEO
        title={`Services de Transport et Location à ${location.name} | R'TRAVEL`}
        description={`R'TRAVEL offre des services de transport et location de voitures à ${location.name}: ${location.services.join(", ")}. Réservez dès maintenant!`}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(locationStructuredData) }} />

      <main className="flex min-h-screen flex-col">
        <Breadcrumb
          items={[
            { label: "Zones de Service", href: "/locations" },
            { label: location.name, href: `/locations/${id}` },
          ]}
        />

        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                  Services R'TRAVEL à {location.name}
                </h1>

                <div className="flex flex-wrap gap-2 mb-6">
                  {location.services.map((service, index) => (
                    <Badge key={index} variant="secondary" className="bg-secondary/50 text-sm">
                      {service}
                    </Badge>
                  ))}
                </div>

                <div className="prose max-w-none mb-8">
                  <p className="text-lg text-muted-foreground">{location.description}</p>
                </div>

                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Informations de contact</h2>

                    <div className="space-y-4">
                      {location.address && (
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                          <span>{location.address}</span>
                        </div>
                      )}

                      {location.phone && (
                        <div className="flex items-start gap-3">
                          <Phone className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                          <span>{location.phone}</span>
                        </div>
                      )}

                      {location.email && (
                        <div className="flex items-start gap-3">
                          <Mail className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                          <span>{location.email}</span>
                        </div>
                      )}

                      {location.openingHours && (
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                          <span>{location.openingHours}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="flex-1">
                    <Link href="/contact">Nous contacter</Link>
                  </Button>

                  <Button asChild size="lg" variant="outline" className="flex-1">
                    <Link href="/transport">Voir notre flotte</Link>
                  </Button>
                </div>
              </div>

              <div className="space-y-8">
                <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                  <Image
                    src={location.imageUrl || "/placeholder.svg"}
                    alt={`R'TRAVEL services à ${location.name}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="relative h-[400px] w-full overflow-hidden rounded-lg border">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${location.name},Morocco&center=${location.coordinates.lat},${location.coordinates.lng}&zoom=13`}
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Nos services à {location.name}</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="flex flex-col items-center text-center p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Car className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Location de Voitures</h3>
                  <p className="text-muted-foreground">
                    Large gamme de véhicules disponibles à {location.name}, des berlines économiques aux SUV de luxe.
                  </p>
                </Card>

                <Card className="flex flex-col items-center text-center p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Bus className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Transport VIP</h3>
                  <p className="text-muted-foreground">
                    Services de chauffeur privé et transport VIP pour vos déplacements professionnels à {location.name}.
                  </p>
                </Card>

                <Card className="flex flex-col items-center text-center p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Excursions Touristiques</h3>
                  <p className="text-muted-foreground">
                    Découvrez {location.name} et ses environs avec nos excursions guidées personnalisées.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
