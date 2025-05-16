"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VehiclesGrid } from "@/components/vehicles-grid"
import { motion } from "framer-motion"

export default function TransportPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          >
            <div className="space-y-2 max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Notre <span className="text-primary">Flotte</span> d'Exception
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl font-light mt-4">
                Découvrez notre collection de véhicules premium pour tous vos besoins de mobilité au Maroc
              </p>
            </div>
          </motion.div>

          <div className="mx-auto max-w-6xl mt-16">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 rounded-full p-1 mb-12">
                <TabsTrigger value="all" className="rounded-full">
                  Tous
                </TabsTrigger>
                <TabsTrigger value="luxury" className="rounded-full">
                  VIP & Luxe
                </TabsTrigger>
                <TabsTrigger value="groups" className="rounded-full">
                  Groupes
                </TabsTrigger>
                <TabsTrigger value="tourism" className="rounded-full">
                  Tourisme
                </TabsTrigger>
              </TabsList>
              <div>
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
