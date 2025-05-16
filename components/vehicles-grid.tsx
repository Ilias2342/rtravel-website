import { VehicleCard } from "@/components/vehicle-card"
import { vehicles } from "@/data/vehicles"

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredVehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          id={vehicle.id}
          name={vehicle.name}
          type={vehicle.type}
          description={vehicle.description}
          pricePerDay={vehicle.pricePerDay}
          imageUrl={vehicle.imageUrl}
          features={vehicle.features}
        />
      ))}
    </div>
  )
}
