import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Car, Bus, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { HeroSection } from "@/components/hero-section"
import { FeaturedVehicles } from "@/components/featured-vehicles"
import { SEO } from "@/components/seo"
import { LocalBusinessFAQ } from "@/components/local-business-faq"

export default function Home() {
  return (
    <>
      <SEO
        type="home"
        title="R'TRAVEL - Location de Voitures et Transport Touristique au Maroc | Service VIP"
        description="Service premium de location de voitures et transport touristique au Maroc. Flotte de véhicules de luxe, chauffeurs professionnels, excursions personnalisées et transferts aéroport VIP à Rabat et dans tout le Maroc."
      />
      <main className="flex min-h-screen flex-col">
        <HeroSection />

        {/* Services Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 dark:bg-muted/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nos Services</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez notre gamme complète de services de transport adaptés à tous vos besoins
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              <Card className="service-card flex flex-col items-center text-center shadow-lg transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Car className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>Location de Voitures</CardTitle>
                  <CardDescription>Véhicules neufs de grandes marques pour courts et longs séjours</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mercedes-Benz-Class-E-3-qiaQc7g1zRuHxpIn5NMAO2p84fd7Fv.webp"
                      alt="Location de voitures"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p>
                    Notre flotte comprend des véhicules de qualité vous assurant confort et sécurité pendant vos
                    déplacements.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/transport#car-rental">
                    <Button variant="outline" className="group">
                      En savoir plus{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="service-card flex flex-col items-center text-center shadow-lg transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Bus className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>Transport VIP</CardTitle>
                  <CardDescription>Services de transport avec chauffeur expérimenté</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-12%20at%2013.55.11-J3jq66HgZmBfJuWOb6LqulcRHlNqV2.jpeg"
                      alt="Transport VIP"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p>Découvrez le Maroc en toute sérénité grâce à notre équipe professionnelle et dévouée.</p>
                </CardContent>
                <CardFooter>
                  <Link href="/transport#vip">
                    <Button variant="outline" className="group">
                      En savoir plus{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="service-card flex flex-col items-center text-center shadow-lg transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Calendar className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>Événements Spéciaux</CardTitle>
                  <CardDescription>Solutions de transport sur mesure pour vos événements</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-CAR-min-1024x320.jpg-QWJAg6fdVDNLZ6qgcc6eLaa1HFhNYv.webp"
                      alt="Transport pour événements"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p>Services personnalisés pour mariages, conférences et autres occasions spéciales.</p>
                </CardContent>
                <CardFooter>
                  <Link href="/transport#events">
                    <Button variant="outline" className="group">
                      En savoir plus{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Vehicles */}
        <FeaturedVehicles />

        {/* Local Business FAQ Section */}
        <LocalBusinessFAQ />

        {/* Why Choose Us Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 dark:bg-muted/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pourquoi Choisir R'TRAVEL?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Votre partenaire de confiance pour la location de voitures et le transport touristique au Maroc
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 transition-all hover:border-primary">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">1</div>
                <h3 className="text-xl font-bold">Véhicules de qualité</h3>
                <p className="text-center text-muted-foreground">
                  Notre flotte comprend des véhicules neufs de grandes marques, vous assurant confort et sécurité.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 transition-all hover:border-primary">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">2</div>
                <h3 className="text-xl font-bold">Service professionnel</h3>
                <p className="text-center text-muted-foreground">
                  Découvrez le Maroc en toute sérénité grâce à notre équipe expérimentée et dévouée.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 transition-all hover:border-primary">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">3</div>
                <h3 className="text-xl font-bold">Flexibilité</h3>
                <p className="text-center text-muted-foreground">
                  Nos services sont conçus pour s'adapter à vos besoins spécifiques.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 transition-all hover:border-primary">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">4</div>
                <h3 className="text-xl font-bold">Expérience</h3>
                <p className="text-center text-muted-foreground">
                  Avec de nombreuses années d'expérience, nous avons atteint des standards élevés de professionnalisme.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 transition-all hover:border-primary">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">5</div>
                <h3 className="text-xl font-bold">Rapport qualité/prix</h3>
                <p className="text-center text-muted-foreground">
                  Nous nous engageons à vous offrir les meilleurs tarifs du marché tout en maintenant une qualité de
                  service irréprochable.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 transition-all hover:border-primary">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Couverture nationale</h3>
                <p className="text-center text-muted-foreground">
                  Nos services sont disponibles à travers tout le territoire marocain.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ce que disent nos clients</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez les témoignages de nos clients satisfaits
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl mt-12">
              <TestimonialCarousel />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Prêt à voyager avec nous?</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Contactez-nous dès aujourd'hui pour réserver un véhicule ou planifier votre transport
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/contact">
                  <Button size="lg" variant="secondary">
                    Nous contacter
                  </Button>
                </Link>
                <Link href="/locations">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    Nos zones de service
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
