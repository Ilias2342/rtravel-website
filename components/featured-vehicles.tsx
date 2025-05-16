"use client"

import { VehiclesGrid } from "@/components/vehicles-grid"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FeaturedVehicles() {
  return (
    <section className="w-full py-20 md:py-28 lg:py-36">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Notre Flotte <span className="text-primary">Premium</span>
            </h2>
            <p className="text-xl text-muted-foreground md:text-2xl font-light">
              Découvrez l'excellence automobile pour vos déplacements au Maroc
            </p>
          </div>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <VehiclesGrid limit={3} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <Button asChild size="lg" variant="outline" className="group rounded-full px-8">
            <Link href="/transport">
              <span>Voir toute notre flotte</span>
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
