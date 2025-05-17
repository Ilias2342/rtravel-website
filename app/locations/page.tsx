import { Breadcrumb } from "@/components/breadcrumb"
import { SEO } from "@/components/seo"
import { LocationCard } from "@/components/location-card"
import { ServiceAreaMap } from "@/components/service-area-map"
import { locations } from "@/data/locations"

export default function LocationsPage() {
  return (
    <>
      <SEO
        title="Nos Zones de Service au Maroc | R'TRAVEL - Transport et Location"
        description="R'TRAVEL offre des services de transport et location de voitures dans toutes les principales villes du Maroc: Rabat, Casablanca, Marrakech, Fès, Tanger et plus encore."
      />

      <main className="flex min-h-screen flex-col">
        <Breadcrumb />

        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nos Zones de Service</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                R'TRAVEL offre des services de transport et location de voitures dans toutes les principales villes du
                Maroc
              </p>
            </div>

            <ServiceAreaMap />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {locations.map((location) => (
                <LocationCard
                  key={location.id}
                  id={location.id}
                  name={location.name}
                  description={location.description}
                  imageUrl={location.imageUrl}
                  services={location.services}
                  coordinates={location.coordinates}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
