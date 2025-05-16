import Image from "next/image"
import Link from "next/link"
import { Car, Users, Calendar, Shield, Fuel, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReservationForm } from "@/components/reservation-form"
import { PageHeader } from "@/components/page-header"

export default function TransportPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <PageHeader
        title="Services de Transport"
        description="Découvrez notre gamme complète de services de transport adaptés à tous vos besoins"
      />

      <Tabs defaultValue="car-rental" className="w-full">
        <div className="container px-4 md:px-6 py-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 h-auto">
            <TabsTrigger value="car-rental" className="py-3">
              Location de Voitures
            </TabsTrigger>
            <TabsTrigger value="vip" className="py-3">
              Transport VIP
            </TabsTrigger>
            <TabsTrigger value="events" className="py-3">
              Événements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="car-rental" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Location de Voitures</h2>
                <p className="text-muted-foreground">
                  Notre service de location de voitures vous offre une flotte de véhicules neufs et bien entretenus pour
                  tous vos déplacements au Maroc. Que ce soit pour un court séjour ou un voyage prolongé, nous avons le
                  véhicule qui correspond à vos besoins.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Assurance complète</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="h-5 w-5 text-primary" />
                    <span>Véhicules économiques</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    <span>Entretien régulier</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Capacités variées</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Location de voitures"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card>
                <CardHeader>
                  <CardTitle>Économique</CardTitle>
                  <CardDescription>Idéal pour les déplacements urbains</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Voiture économique"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>4 passagers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-primary" />
                      <span>Faible consommation</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="#reservation">Réserver</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Familiale</CardTitle>
                  <CardDescription>Parfait pour les voyages en famille</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Voiture familiale"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>7 passagers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>Sécurité renforcée</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="#reservation">Réserver</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Premium</CardTitle>
                  <CardDescription>Pour un confort et un style supérieurs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Voiture premium"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>5 passagers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-primary" />
                      <span>Équipements haut de gamme</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="#reservation">Réserver</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vip" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Transport VIP</h2>
                <p className="text-muted-foreground">
                  Notre service de transport VIP offre une expérience de voyage exceptionnelle avec des véhicules de
                  luxe et des chauffeurs professionnels. Idéal pour les voyageurs d'affaires, les délégations et ceux
                  qui recherchent un service de première classe.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Chauffeurs expérimentés</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-primary" />
                    <span>Véhicules de luxe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    <span>Service personnalisé</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Confidentialité assurée</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Transport VIP"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <Card>
                <CardHeader>
                  <CardTitle>Berline de Luxe</CardTitle>
                  <CardDescription>Élégance et confort pour vos déplacements professionnels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Berline de luxe"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>3 passagers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>Chauffeur professionnel</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="#reservation">Réserver</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SUV Premium</CardTitle>
                  <CardDescription>Espace et prestige pour vos déplacements importants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="SUV Premium"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>6 passagers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-primary" />
                      <span>Équipements haut de gamme</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="#reservation">Réserver</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Transport pour Événements</h2>
                <p className="text-muted-foreground">
                  Nous proposons des solutions de transport sur mesure pour tous types d'événements : mariages,
                  conférences, séminaires d'entreprise, excursions de groupe et plus encore. Notre équipe s'occupe de
                  tous les aspects logistiques pour que vous puissiez vous concentrer sur votre événement.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Planification personnalisée</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Capacité pour grands groupes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Coordination professionnelle</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    <span>Solutions adaptables</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Transport pour événements"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card>
                <CardHeader>
                  <CardTitle>Mariages</CardTitle>
                  <CardDescription>Transport élégant pour votre jour spécial</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Transport pour mariage"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Véhicules décorés, chauffeurs en tenue formelle et coordination avec votre planning de mariage.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="#reservation">Demander un devis</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conférences</CardTitle>
                  <CardDescription>Transport professionnel pour vos délégués</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Transport pour conférence"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Navettes entre hôtels et lieux de conférence, transferts aéroport et coordination logistique
                    complète.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="#reservation">Demander un devis</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Excursions de Groupe</CardTitle>
                  <CardDescription>Transport confortable pour vos sorties de groupe</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Transport pour excursion"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Minibus et autocars confortables avec chauffeurs connaissant les meilleurs itinéraires touristiques.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="#reservation">Demander un devis</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Reservation Form Section */}
      <section id="reservation" className="w-full py-12 md:py-24 bg-muted/50 dark:bg-muted/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Réservez votre transport</h2>
              <p className="max-w-[700px] text-muted-foreground">
                Remplissez le formulaire ci-dessous pour réserver votre véhicule ou demander un devis personnalisé
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl mt-8">
            <ReservationForm />
          </div>
        </div>
      </section>
    </main>
  )
}
