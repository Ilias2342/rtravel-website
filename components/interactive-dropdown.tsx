"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Company information data
const companyInfo = {
  about: {
    title: "À propos de R'TRAVEL",
    sections: [
      {
        title: "Pourquoi choisir R'TRAVEL ?",
        content: [
          {
            title: "Véhicules de qualité",
            description:
              "Notre flotte comprend des véhicules neufs de grandes marques, vous assurant confort et sécurité.",
          },
          {
            title: "Service professionnel",
            description: "Découvrez le Maroc en toute sérénité grâce à notre équipe expérimentée et dévouée.",
          },
          {
            title: "Flexibilité",
            description:
              "Que ce soit pour une location avec ou sans chauffeur, nos services sont conçus pour s'adapter à vos besoins spécifiques.",
          },
          {
            title: "Expérience",
            description:
              "Avec de nombreuses années d'expérience, nous avons atteint des standards élevés de professionnalisme et d'efficacité.",
          },
          {
            title: "Rapport qualité/prix",
            description:
              "Nous nous engageons à vous offrir les meilleurs tarifs du marché tout en maintenant une qualité de service irréprochable.",
          },
        ],
      },
      {
        title: "Notre engagement",
        content: [
          {
            description:
              "Nous nous efforçons d'améliorer constamment nos services pour répondre au mieux à vos attentes et rendre vos déplacements aussi agréables que possible.",
          },
          {
            description:
              "R'TRAVEL - Votre partenaire de confiance pour la location de voitures et le transport touristique au Maroc.",
          },
        ],
      },
    ],
  },
  services: {
    title: "Nos Services",
    sections: [
      {
        title: "Location de voitures",
        content: [
          {
            title: "Location courte durée",
            description: "Location de véhicules pour quelques jours à quelques semaines.",
            badge: "À partir de 250 MAD/jour",
          },
          {
            title: "Location longue durée",
            description: "Location de véhicules pour plusieurs semaines à plusieurs mois.",
            badge: "Tarifs dégressifs",
          },
          {
            title: "Véhicules disponibles",
            description:
              "CITROEN C-ELYSEE, FIAT 500, RENAULT EXPRESS, DACIA LOGAN, GRAND HYNDAI I10, CLIO 5, Duster automatique",
          },
        ],
      },
      {
        title: "Transport touristique",
        content: [
          {
            title: "Transferts aéroport",
            description: "Service de transfert entre les aéroports et votre hébergement.",
            badge: "À partir de 300 MAD",
          },
          {
            title: "Transferts hôtel",
            description: "Service de transfert entre votre hôtel et différentes destinations.",
            badge: "À partir de 250 MAD",
          },
          {
            title: "Excursions guidées",
            description: "Découvrez les plus beaux sites du Maroc avec nos excursions guidées.",
            badge: "Tarifs sur demande",
          },
        ],
      },
      {
        title: "Solutions pour événements",
        content: [
          {
            title: "Transport pour événements d'entreprise",
            description: "Solutions de transport pour séminaires, conférences et événements d'entreprise.",
          },
          {
            title: "Transport pour productions cinématographiques",
            description: "Services spécialisés pour les équipes de tournage et productions cinématographiques.",
            badge: "Référence: KASBAH FILM",
          },
          {
            title: "Transport pour mariages et cérémonies",
            description: "Services de transport élégants pour vos événements spéciaux.",
          },
        ],
      },
    ],
  },
  contact: {
    title: "Contact",
    sections: [
      {
        title: "Coordonnées",
        content: [
          {
            title: "Adresse",
            description: "Hay El Manzah, N° 1160, CYM - Rabat, Maroc",
            icon: "map",
          },
          {
            title: "Téléphone",
            description: "06 61 07 99 96",
            icon: "phone",
          },
          {
            title: "Email",
            description: "rtravel.contact@gmail.com",
            icon: "mail",
          },
          {
            title: "Site web",
            description: "www.r-travel.com",
            icon: "globe",
          },
        ],
      },
      {
        title: "Horaires",
        content: [
          {
            title: "Lundi - Vendredi",
            description: "8h30 - 18h30",
          },
          {
            title: "Samedi",
            description: "9h00 - 16h00",
          },
          {
            title: "Dimanche",
            description: "Fermé (Urgences uniquement)",
          },
        ],
      },
    ],
  },
  applications: {
    title: "Applications",
    sections: [
      {
        title: "Système de Gestion (Web)",
        content: [
          {
            title: "Description",
            description:
              "Interface d'administration principale pour la gestion des véhicules, chauffeurs, réservations et documents.",
          },
          {
            title: "Déploiement",
            description: "Vercel",
            badge: "Production",
          },
          {
            title: "Accès",
            description: "Navigateur web (Chrome, Firefox, Safari, Edge)",
          },
        ],
      },
      {
        title: "Application Client (iOS, Android, Web)",
        content: [
          {
            title: "Description",
            description:
              "Application destinée aux clients pour la réservation de véhicules et de services de transport.",
          },
          {
            title: "Déploiement",
            description: "App Store, Google Play, AWS",
            badge: "Production",
          },
          {
            title: "Versions",
            description: "iOS 14+, Android 8+, Web",
          },
        ],
      },
      {
        title: "Application Chauffeur (iOS, Android)",
        content: [
          {
            title: "Description",
            description: "Application pour les chauffeurs avec navigation GPS et gestion des missions.",
          },
          {
            title: "Déploiement",
            description: "App Store, Google Play, Google Cloud",
            badge: "Production",
          },
          {
            title: "Versions",
            description: "iOS 14+, Android 8+",
          },
        ],
      },
      {
        title: "Système de Maintenance (Web)",
        content: [
          {
            title: "Description",
            description: "Système de gestion de la maintenance des véhicules.",
          },
          {
            title: "Déploiement",
            description: "Vercel",
            badge: "Production",
          },
          {
            title: "Accès",
            description: "Navigateur web (Chrome, Firefox, Safari, Edge)",
          },
        ],
      },
      {
        title: "Portail Partenaires (Web)",
        content: [
          {
            title: "Description",
            description: "Interface pour les agences partenaires.",
          },
          {
            title: "Déploiement",
            description: "Netlify",
            badge: "Beta",
          },
          {
            title: "Accès",
            description: "Navigateur web (Chrome, Firefox, Safari, Edge)",
          },
        ],
      },
    ],
  },
  legal: {
    title: "Informations Légales",
    sections: [
      {
        title: "Informations de l'entreprise",
        content: [
          {
            title: "Raison sociale",
            description: "R'travel (SARL AU)",
          },
          {
            title: "Identifiant fiscal",
            description: "26046881",
          },
          {
            title: "RC",
            description: "131771",
          },
          {
            title: "Patente",
            description: "27200034",
          },
          {
            title: "CNSS",
            description: "5979680",
          },
          {
            title: "ICE",
            description: "001982116000096",
          },
        ],
      },
      {
        title: "Informations bancaires",
        content: [
          {
            title: "Banque",
            description: "CDM CREDIT DU MAROC (Agence de Rabat)",
          },
          {
            title: "N° Compte bancaire",
            description: "021810000014503006942992",
          },
        ],
      },
    ],
  },
}

export function InteractiveDropdown() {
  const [activeCategory, setActiveCategory] = useState("about")
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    // Expand the first section by default when changing category
    const firstSectionId = `${category}-section-0`
    setExpandedSections([firstSectionId])
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const isSectionExpanded = (sectionId: string) => {
    return expandedSections.includes(sectionId)
  }

  const renderContent = (content: any[], sectionId: string) => {
    return (
      <div className="space-y-4 pl-4 border-l-2 border-gray-200">
        {content.map((item, idx) => (
          <div key={`${sectionId}-item-${idx}`} className="space-y-1">
            {item.title && <h4 className="font-medium">{item.title}</h4>}
            <p className="text-gray-700">{item.description}</p>
            {item.badge && (
              <Badge className="mt-1" variant="outline">
                {item.badge}
              </Badge>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {Object.keys(companyInfo).map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => handleCategoryClick(category)}
          >
            {companyInfo[category as keyof typeof companyInfo].title}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{companyInfo[activeCategory as keyof typeof companyInfo].title}</CardTitle>
          <CardDescription>
            Informations détaillées sur {companyInfo[activeCategory as keyof typeof companyInfo].title.toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" value={expandedSections} className="space-y-4">
            {companyInfo[activeCategory as keyof typeof companyInfo].sections.map((section, sectionIdx) => {
              const sectionId = `${activeCategory}-section-${sectionIdx}`
              return (
                <AccordionItem key={sectionId} value={sectionId} className="border rounded-lg p-2">
                  <AccordionTrigger className="px-4">
                    <span className="text-left font-medium">{section.title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2 pb-4">
                    {renderContent(section.content, sectionId)}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
