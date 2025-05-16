import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, MapPin, FileText, BarChart } from "lucide-react"

export default function AdminDashboard() {
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Tableau de bord administrateur</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Gestion des véhicules
            </CardTitle>
            <CardDescription>Ajoutez, modifiez ou supprimez des véhicules</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Gérez votre flotte de véhicules, leurs caractéristiques et leurs disponibilités.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/vehicles">Gérer les véhicules</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Destinations touristiques
            </CardTitle>
            <CardDescription>Gérez les destinations et circuits</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Ajoutez ou modifiez les destinations touristiques et leurs informations.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/destinations">Gérer les destinations</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documents
            </CardTitle>
            <CardDescription>Gérez les brochures et documents</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Téléchargez des brochures, conditions générales et autres documents.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/documents">Gérer les documents</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Statistiques
            </CardTitle>
            <CardDescription>Consultez les statistiques du site</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Visualisez les statistiques de visites et de réservations.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/stats">Voir les statistiques</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
