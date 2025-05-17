"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const localFAQs = [
  {
    question: "Où est situé le siège de R'TRAVEL?",
    answer:
      "Le siège principal de R'TRAVEL est situé à Hay El Manzah, N° 1160, CYM - Rabat, Maroc. Nous disposons également de points de service dans les principales villes du Maroc comme Casablanca, Marrakech, Fès, Tanger et Agadir.",
  },
  {
    question: "Quelles villes sont couvertes par vos services de transport?",
    answer:
      "R'TRAVEL couvre toutes les principales villes du Maroc, notamment Rabat, Casablanca, Marrakech, Fès, Tanger, Agadir, ainsi que leurs régions environnantes. Nous proposons également des services de transport interurbain entre ces villes.",
  },
  {
    question: "Proposez-vous des transferts depuis l'aéroport de Rabat-Salé?",
    answer:
      "Oui, nous proposons des services de transfert depuis et vers l'aéroport de Rabat-Salé, ainsi que depuis tous les principaux aéroports du Maroc. Notre service comprend l'accueil à l'aéroport, la prise en charge des bagages et un transport confortable jusqu'à votre destination.",
  },
  {
    question: "Quels sont vos horaires d'ouverture à Rabat?",
    answer:
      "Notre bureau de Rabat est ouvert du lundi au vendredi de 8h00 à 20h00, et le week-end (samedi et dimanche) de 9h00 à 18h00. Cependant, notre service de réservation téléphonique est disponible 24h/24 et 7j/7 pour les urgences et les réservations de dernière minute.",
  },
  {
    question: "Peut-on louer un véhicule dans une ville et le rendre dans une autre?",
    answer:
      "Oui, R'TRAVEL propose un service de location one-way qui vous permet de prendre un véhicule dans une ville et de le rendre dans une autre. Ce service est disponible entre toutes nos agences dans les principales villes du Maroc, moyennant des frais supplémentaires qui varient selon les villes concernées.",
  },
]

export function LocalBusinessFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Generate structured data for FAQs
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: localFAQs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <section className="w-full py-12 md:py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />

        <h2 className="text-3xl font-bold text-center mb-8">Informations Locales</h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {localFAQs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full p-4 text-left bg-background hover:bg-muted/50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${openIndex === index ? "transform rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 border-t">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
