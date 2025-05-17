"use client"

import Head from "next/head"
import { useRouter } from "next/router"

interface SEOProps {
  title?: string
  description?: string
  canonicalUrl?: string
  ogType?: string
  ogImage?: string
  twitterCard?: string
  twitterHandle?: string
  noIndex?: boolean
  keywords?: string[]
  structuredData?: Record<string, any>
}

export function SEOMeta({
  title = "R'TRAVEL - Transport Touristique et Location de Voitures au Maroc",
  description = "R'TRAVEL est votre partenaire de confiance pour la location de voitures et le transport touristique au Maroc. Découvrez nos services de qualité et nos offres personnalisées.",
  canonicalUrl,
  ogType = "website",
  ogImage = "/images/rtravel-og-image.jpg",
  twitterCard = "summary_large_image",
  twitterHandle = "@rtravel",
  noIndex = false,
  keywords = [
    "location voiture maroc",
    "transport touristique maroc",
    "location voiture rabat",
    "transport vip maroc",
    "excursion désert maroc",
    "location minibus maroc",
    "chauffeur privé maroc",
    "transport événements maroc",
  ],
  structuredData,
}: SEOProps) {
  const router = useRouter()
  const siteUrl = "https://www.rtravel.ma" // Replace with your actual domain
  const currentUrl = canonicalUrl || `${siteUrl}${router.asPath}`
  const fullOgImageUrl = ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`

  // Default structured data for local business
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "R'TRAVEL",
    description: description,
    url: siteUrl,
    logo: `${siteUrl}/images/rtravel-logo.png`,
    image: fullOgImageUrl,
    telephone: "+212661079996",
    email: "rtravel.contact@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hay El Manzah, N° 1160, CYM",
      addressLocality: "Rabat",
      addressRegion: "Rabat-Salé-Kénitra",
      postalCode: "10000",
      addressCountry: "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "34.0132",
      longitude: "-6.8326",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "20:00",
    },
    priceRange: "$$",
  }

  const finalStructuredData = structuredData || defaultStructuredData

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <link rel="canonical" href={currentUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={fullOgImageUrl} />
      <meta property="og:site_name" content="R'TRAVEL" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="ar_MA" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImageUrl} />

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(finalStructuredData) }} />
    </Head>
  )
}
