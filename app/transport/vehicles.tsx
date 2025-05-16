import { redis } from "@/lib/redis"
import { VehicleCard } from "@/components/vehicle-card"

async function getVehicles() {
  // Get all vehicle IDs
  const vehicleIds = await redis.smembers("vehicles")

  // Fetch each vehicle's data
  const vehicles = await Promise.all(
    vehicleIds.map(async (id) => {
      const vehicle = await redis.hgetall(id)
      return {
        id,
        ...vehicle,
        pricePerDay: Number(vehicle.pricePerDay),
        features: JSON.parse(vehicle.features || "[]"),
      }
    }),
  )

  return vehicles
}

export async function Vehicles() {
  const vehicles = await getVehicles()

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">Aucun véhicule disponible pour le moment</h3>
        <p className="text-muted-foreground mt-2">Veuillez revenir plus tard.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
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
