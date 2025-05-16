import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VehiclesGrid } from "@/components/vehicles-grid"

export default function TransportPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Notre Flotte de Véhicules</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Découvrez notre gamme complète de véhicules pour tous vos besoins de transport au Maroc
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-5xl mt-12">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="luxury">VIP & Luxe</TabsTrigger>
                <TabsTrigger value="groups">Groupes</TabsTrigger>
                <TabsTrigger value="tourism">Tourisme</TabsTrigger>
              </TabsList>
              <div className="mt-8">
                <TabsContent value="all">
                  <VehiclesGrid />
                </TabsContent>
                <TabsContent value="luxury">
                  <VehiclesGrid category="luxury" />
                </TabsContent>
                <TabsContent value="groups">
                  <VehiclesGrid category="groups" />
                </TabsContent>
                <TabsContent value="tourism">
                  <VehiclesGrid category="tourism" />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </section>
    </main>
  )
}
