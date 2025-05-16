"use client"

import { VehicleCard } from "@/components/vehicle-card"
import { vehicles } from "@/data/vehicles"
import { motion } from "framer-motion"

interface VehiclesGridProps {
  category?: string
  limit?: number
}

export function VehiclesGrid({ category, limit }: VehiclesGridProps) {
  let filteredVehicles = vehicles

  if (category) {
    filteredVehicles = vehicles.filter((vehicle) => {
      if (category === "luxury") {
        return vehicle.type.toLowerCase().includes("luxe") || vehicle.type.toLowerCase().includes("premium")
      }
      if (category === "groups") {
        return vehicle.type.toLowerCase().includes("minibus") || vehicle.type.toLowerCase().includes("groupe")
      }
      if (category === "tourism") {
        return vehicle.type.toLowerCase().includes("tour") || vehicle.id.includes("desert")
      }
      return true
    })
  }

  if (limit) {
    filteredVehicles = filteredVehicles.slice(0, limit)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {filteredVehicles.map((vehicle, index) => (
        <motion.div
          key={vehicle.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <VehicleCard
            id={vehicle.id}
            name={vehicle.name}
            type={vehicle.type}
            description={vehicle.description}
            pricePerDay={vehicle.pricePerDay}
            imageUrl={vehicle.imageUrl}
            features={vehicle.features}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
