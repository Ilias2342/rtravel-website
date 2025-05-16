import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, Users, Clock, Compass, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReservationForm } from "@/components/reservation-form"
import { PageHeader } from "@/components/page-header"
import { Star } from "lucide-react"

export default function TouristPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <PageHeader
        title="Services Touristiques"
        description="Découvrez le Maroc avec nos services de transport touristique personnalisés"
      />

      {/* Destinations Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Destinations Populaires</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explorez les plus beaux endroits du Maroc avec nos services de transport touristique
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <Image src="/placeholder.svg?height=400&width=600" alt="Marrakech" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Marrakech</h3>
                  <div className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">La ville rouge</span>
                  </div>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Découvrez la magie de Marrakech, avec ses souks animés, ses palais majestueux et sa célèbre place
                  Jemaa el-Fna.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="#reservation">Réserver un transport</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <Image src="/placeholder.svg?height=400&width=600" alt="Casablanca" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Casablanca</h3>
                  <div className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">La métropole économique</span>
                  </div>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Visitez la plus grande ville du Maroc, avec sa mosquée Hassan II impressionnante et son architecture
                  art déco.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="#reservation">Réserver un transport</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <Image src="/placeholder.svg?height=400&width=600" alt="Fès" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Fès</h3>
                  <div className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">La capitale culturelle</span>
                  </div>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Explorez la plus ancienne des villes impériales avec sa médina labyrinthique classée au patrimoine
                  mondial de l'UNESCO.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="#reservation">Réserver un transport</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <Image src="/placeholder.svg?height=400&width=600" alt="Chefchaouen" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Chefchaouen</h3>
                  <div className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">La ville bleue</span>
                  </div>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Admirez cette charmante ville aux ruelles peintes en bleu, nichée dans les montagnes du Rif.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="#reservation">Réserver un transport</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <Image src="/placeholder.svg?height=400&width=600" alt="Merzouga" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Merzouga</h3>
                  <div className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">Les dunes de l'Erg Chebbi</span>
                  </div>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Vivez une expérience inoubliable dans le désert du Sahara avec ses immenses dunes de sable doré.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="#reservation">Réserver un transport</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <Image src="/placeholder.svg?height=400&width=600" alt="Essaouira" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Essaouira</h3>
                  <div className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">La cité des alizés</span>
                  </div>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Détendez-vous dans cette charmante ville côtière connue pour ses remparts, son port de pêche et son
                  ambiance bohème.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="#reservation">Réserver un transport</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Tour Packages Section */}
      <section className="w-full py-12 md:py-24 bg-muted/50 dark:bg-muted/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Circuits Touristiques</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Découvrez nos circuits organisés avec transport et guide inclus
              </p>
            </div>
          </div>

          <Tabs defaultValue="imperial" className="w-full mt-12">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto">
              <TabsTrigger value="imperial" className="py-3">
                Villes Impériales
              </TabsTrigger>
              <TabsTrigger value="desert" className="py-3">
                Aventure Désert
              </TabsTrigger>
              <TabsTrigger value="coastal" className="py-3">
                Route Atlantique
              </TabsTrigger>
            </TabsList>

            <TabsContent value="imperial" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Circuit des Villes Impériales</h3>
                  <p className="text-muted-foreground">
                    Un voyage à travers l'histoire du Maroc en visitant ses quatre villes impériales : Rabat, Meknès,
                    Fès et Marrakech. Découvrez des palais majestueux, des médinas animées et l'héritage culturel riche
                    du royaume.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>Durée: 7 jours / 6 nuits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span>Taille du groupe: 4-12 personnes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>Départs: Tous les samedis</span>
                    </div>
                  </div>
                  <Button size="lg" asChild>
                    <Link href="#reservation">Réserver ce circuit</Link>
                  </Button>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Circuit des Villes Impériales"
                    width={800}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="mt-8 border rounded-lg p-6">
                <h4 className="text-xl font-semibold mb-4">Itinéraire</h4>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div>
                      <h5 className="font-medium">Jour 1: Arrivée à Rabat</h5>
                      <p className="text-sm text-muted-foreground">
                        Accueil à l'aéroport, transfert à l'hôtel et visite de la capitale.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div>
                      <h5 className="font-medium">Jour 2: Rabat - Meknès</h5>
                      <p className="text-sm text-muted-foreground">
                        Visite de la ville de Meknès et ses monuments historiques.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div>
                      <h5 className="font-medium">Jour 3-4: Fès</h5>
                      <p className="text-sm text-muted-foreground">
                        Exploration de la médina de Fès et ses artisans traditionnels.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      4
                    </div>
                    <div>
                      <h5 className="font-medium">Jour 5-7: Marrakech</h5>
                      <p className="text-sm text-muted-foreground">
                        Découverte de Marrakech, ses jardins et sa place emblématique.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </TabsContent>

            <TabsContent value="desert" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Aventure dans le Désert</h3>
                  <p className="text-muted-foreground">
                    Une expérience inoubliable à travers les paysages spectaculaires du sud marocain. Des montagnes de
                    l'Atlas aux dunes dorées du Sahara, en passant par les kasbahs et les oasis verdoyantes.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>Durée: 5 jours / 4 nuits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span>Taille du groupe: 4-8 personnes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Compass className="h-5 w-5 text-primary" />
                      <span>Activités: Randonnée, dromadaire, nuit sous les étoiles</span>
                    </div>
                  </div>
                  <Button size="lg" asChild>
                    <Link href="#reservation">Réserver ce circuit</Link>
                  </Button>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Aventure dans le Désert"
                    width={800}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="mt-8 border rounded-lg p-6">
                <h4 className="text-xl font-semibold mb-4">Itinéraire</h4>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div>
                      <h5 className="font-medium">Jour 1: Marrakech - Ouarzazate</h5>
                      <p className="text-sm text-muted-foreground">
                        Traversée du Haut Atlas et visite des studios de cinéma.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div>
                      <h5 className="font-medium">Jour 2: Ouarzazate - Vallée du Drâa - Zagora</h5>
                      <p className="text-sm text-muted-foreground">Exploration de la vallée et ses palmeraies.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div>
                      <h5 className="font-medium">Jour 3: Zagora - Merzouga</h5>
                      <p className="text-sm text-muted-foreground">
                        Arrivée aux dunes de l'Erg Chebbi et balade à dos de dromadaire.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      4
                    </div>
                    <div>
                      <h5 className="font-medium">Jour 4-5: Merzouga - Marrakech</h5>
                      <p className="text-sm text-muted-foreground">
                        Retour à Marrakech via les gorges du Todra et du Dadès.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </TabsContent>

            <TabsContent value="coastal" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Route Atlantique</h3>
                  <p className="text-muted-foreground">
                    Un voyage le long de la côte atlantique marocaine, de Casablanca à Agadir, en passant par des villes
                    côtières charmantes comme Essaouira et El Jadida. Profitez des plages, des fruits de mer frais et de
                    l'atmosphère détendue.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>Durée: 6 jours / 5 nuits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="h-5 w-5 text-primary" />
                      <span>Activités: Plages, sports nautiques, gastronomie</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>Meilleure période: Avril à Octobre</span>
                    </div>
                  </div>
                  <Button size="lg" asChild>
                    <Link href="#reservation">Réserver ce circuit</Link>
                  </Button>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Route Atlantique"
                    width={800}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="mt-8 border rounded-lg p-6">
                <h4 className="text-xl font-semibold mb-4">Itinéraire</h4>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div>
                      <h5 className="font-medium">Jour 1: Casablanca</h5>
                      <p className="text-sm text-muted-foreground">Visite de la mosquée Hassan II et de la corniche.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div>
                      <h5 className="font-medium">Jour 2: Casablanca - El Jadida</h5>
                      <p className="text-sm text-muted-foreground">
                        Découverte de la cité portugaise, patrimoine mondial de l'UNESCO.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div>
                      <h5 className="font-medium">Jour 3-4: Essaouira</h5>
                      <p className="text-sm text-muted-foreground">Exploration de la médina, du port et des plages.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      4
                    </div>
                    <div>
                      <h5 className="font-medium">Jour 5-6: Agadir</h5>
                      <p className="text-sm text-muted-foreground">
                        Détente sur les plages et découverte de la ville moderne.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Témoignages de Voyageurs</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Découvrez ce que nos clients disent de leurs expériences avec R'TRAVEL
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <Card className="bg-muted/50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Sophie et Pierre</CardTitle>
                    <CardDescription>France</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="italic">
                  "Notre circuit des villes impériales était parfaitement organisé. Le chauffeur était professionnel et
                  connaissait très bien le pays. Nous avons découvert le Maroc dans des conditions idéales!"
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>John Smith</CardTitle>
                    <CardDescription>États-Unis</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="italic">
                  "L'aventure dans le désert était incroyable! Dormir sous les étoiles dans le Sahara restera l'un de
                  mes meilleurs souvenirs. Le transport était confortable malgré les longues distances."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Maria et Carlos</CardTitle>
                    <CardDescription>Espagne</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <p className="italic">
                  "Nous avons loué une voiture pour explorer la côte atlantique à notre rythme. Le véhicule était en
                  parfait état et le service client très réactif. Une expérience à recommander!"
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline" asChild>
              <Link href="#review-form">Partagez votre expérience</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reservation Form Section */}
      <section id="reservation" className="w-full py-12 md:py-24 bg-muted/50 dark:bg-muted/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Réservez votre circuit touristique</h2>
              <p className="max-w-[700px] text-muted-foreground">
                Remplissez le formulaire ci-dessous pour réserver votre circuit ou demander un itinéraire personnalisé
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl mt-8">
            <ReservationForm touristic={true} />
          </div>
        </div>
      </section>
    </main>
  )
}
