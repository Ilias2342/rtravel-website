import { VehicleUploadForm } from "@/components/admin/vehicle-upload"
import { Vehicles } from "@/app/transport/vehicles"

export default function AdminVehiclesPage() {
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Gestion des véhicules</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <VehicleUploadForm />
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Véhicules existants</h2>
          <Vehicles />
        </div>
      </div>
    </main>
  )
}
