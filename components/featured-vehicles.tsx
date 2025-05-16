import { VehiclesGrid } from "@/components/vehicles-grid"

export function FeaturedVehicles() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Notre Flotte Premium</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Découvrez nos véhicules les plus populaires pour vos déplacements au Maroc
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl mt-12">
          <VehiclesGrid limit={3} />
        </div>
      </div>
    </section>
  )
}
