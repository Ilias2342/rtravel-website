"use client"

import Head from "next/head"
import { usePathname } from "next/navigation"
import { generateStructuredData } from "./structured-data"

interface SEOProps {
  title?: string
  description?: string
  type?: "home" | "transport" | "tourist" | "contact" | "vehicle"
  data?: any
  noIndex?: boolean
}

export function SEO({
  title = "R'TRAVEL - Location de Voitures et Transport Touristique au Maroc | Service VIP",
  description = "Service premium de location de voitures et transport touristique au Maroc. Flotte de véhicules de luxe, chauffeurs professionnels, excursions personnalisées et transferts aéroport VIP à Rabat et dans tout le Maroc.",
  type = "home",
  data,
  noIndex = false,
}: SEOProps) {
  const pathname = usePathname()
  const siteUrl = "https://www.rtravel.ma"
  const currentUrl = `${siteUrl}${pathname}`
  const structuredData = generateStructuredData(type, data)

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Structured Data */}
      {structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />}
    </Head>
  )
}
