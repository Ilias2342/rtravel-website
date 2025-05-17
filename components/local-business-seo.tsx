"use client"

import Head from "next/head"

export function LocalBusinessSEO() {
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.rtravel.ma/#localbusiness",
    name: "R'TRAVEL",
    alternateName: "R'Travel Transport Touristique",
    image: [
      "https://www.rtravel.ma/images/rtravel-og-image.jpg",
      "https://www.rtravel.ma/images/rtravel-logo.png",
      "https://www.rtravel.ma/images/fleet-image.jpg",
    ],
    logo: "https://www.rtravel.ma/images/rtravel-logo.png",
    url: "https://www.rtravel.ma",
    telephone: "+212661079996",
    email: "rtravel.contact@gmail.com",
    description:
      "Service premium de location de voitures et transport touristique au Maroc. Flotte de véhicules de luxe, chauffeurs professionnels et excursions personnalisées.",
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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    paymentAccepted: "Cash, Credit Card",
    currenciesAccepted: "MAD, EUR",
    areaServed: [
      {
        "@type": "City",
        name: "Rabat",
      },
      {
        "@type": "City",
        name: "Casablanca",
      },
      {
        "@type": "City",
        name: "Marrakech",
      },
      {
        "@type": "City",
        name: "Fès",
      },
      {
        "@type": "City",
        name: "Tanger",
      },
      {
        "@type": "City",
        name: "Agadir",
      },
    ],
    hasMap: "https://www.google.com/maps?q=Hay+El+Manzah,+N°+1160,+CYM,+Rabat,+Maroc",
    sameAs: [
      "https://www.facebook.com/rtravel.ma",
      "https://www.instagram.com/rtravel.ma",
      "https://twitter.com/rtravelma",
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "34.0209",
        longitude: "-6.8416",
      },
      geoRadius: "300000",
    },
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Location de voitures de luxe",
          description: "Service de location de voitures de luxe avec ou sans chauffeur",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Transport VIP",
          description: "Service de transport VIP avec chauffeur professionnel",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Excursions touristiques",
          description: "Excursions guidées dans les sites touristiques du Maroc",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Transferts aéroport",
          description: "Service de transfert depuis et vers les aéroports du Maroc",
        },
      },
    ],
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Sophie Dubois",
        },
        datePublished: "2025-03-15",
        reviewBody:
          "R'TRAVEL a été un partenaire exceptionnel pour nos événements d'entreprise. Leur professionnalisme et leur flotte de véhicules de luxe ont dépassé nos attentes.",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Ahmed El Amrani",
        },
        datePublished: "2025-02-20",
        reviewBody:
          "Grâce à R'TRAVEL, nos clients peuvent profiter d'un service de transport VIP fiable et confortable. Nous recommandons vivement leurs services.",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "124",
    },
  }

  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }} />
    </Head>
  )
}
