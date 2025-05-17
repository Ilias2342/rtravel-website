"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VehiclesGrid } from "@/components/vehicles-grid"
import { motion } from "framer-motion"
import { SEO } from "@/components/seo"
import { FAQSection } from "@/components/faq-section"
import { Breadcrumb } from "@/components/breadcrumb"

const transportFAQs = [
  {
    question: "Quels types de véhicules proposez-vous à la location ?",
    answer:
      "Nous proposons une large gamme de véhicules premium incluant des berlines de luxe (Mercedes Classe E), des SUV (Toyota Land Cruiser), des minivans (Mercedes Vito, Hyundai H1) et des minibus pour les groupes. Tous nos véhicules sont récents et parfaitement entretenus.",
  },
  {
    question: "Les chauffeurs parlent-ils plusieurs langues ?",
    answer:
      "Oui, nos chauffeurs professionnels parlent français, arabe, et pour la plupart anglais. Certains parlent également espagnol ou allemand. Nous pouvons vous assigner un chauffeur selon vos préférences linguistiques.",
  },
  {
    question: "Comment puis-je réserver un véhicule ?",
    answer:
      "Vous pouvez réserver directement sur notre site en sélectionnant le véhicule de votre choix et en cliquant sur 'Réserver'. Vous pouvez également nous contacter par téléphone au 06 61 07 99 96 ou par email à rtravel.contact@gmail.com.",
  },
  {
    question: "Proposez-vous des transferts aéroport ?",
    answer:
      "Oui, nous proposons des services de transfert depuis et vers tous les aéroports du Maroc, avec un service d'accueil personnalisé et une prise en charge de vos bagages.",
  },
  {
    question: "Quels sont vos tarifs pour la location de véhicules ?",
    answer:
      "Nos tarifs varient selon le type de véhicule et la durée de location. Les prix commencent à partir de 800 MAD par jour pour un minivan standard et peuvent aller jusqu'à 2500 MAD pour nos services premium. Contactez-nous pour obtenir un devis personnalisé.",
  },
]

export default function TransportPage() {
  return (
    <>
      <SEO
        type="transport"
        title="Location de Voitures et Transport VIP au Maroc | R'TRAVEL"
        description="Découvrez notre flotte de véhicules premium pour tous vos besoins de transport au Maroc. Mercedes, minibus, 4x4 et services de chauffeur professionnel pour vos déplacements."
      />
      <main className="flex min-h-screen flex-col">
        <Breadcrumb />

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

        <FAQSection faqs={transportFAQs} />
      </main>
    </>
  )
}
