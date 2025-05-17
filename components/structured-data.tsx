export function generateStructuredData(pageType: "home" | "transport" | "tourist" | "contact" | "vehicle", data?: any) {
  // Base organization data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.rtravel.ma/#organization",
    name: "R'TRAVEL",
    alternateName: "R'Travel Transport Touristique",
    description:
      "Service premium de location de voitures et transport touristique au Maroc. Flotte de véhicules de luxe, chauffeurs professionnels et excursions personnalisées.",
    url: "https://www.rtravel.ma/",
    logo: "https://www.rtravel.ma/images/rtravel-logo.png",
    image: "https://www.rtravel.ma/images/rtravel-og-image.jpg",
    telephone: "+212661079996",
    email: "rtravel.contact@gmail.com",
    priceRange: "$$",
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
    sameAs: [
      "https://www.facebook.com/rtravel.ma",
      "https://www.instagram.com/rtravel.ma",
      "https://twitter.com/rtravelma",
    ],
  }

  // Page-specific structured data
  switch (pageType) {
    case "home":
      return JSON.stringify(organizationData)

    case "transport":
      return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "Service",
              name: "Location de Voitures de Luxe",
              description: "Service de location de voitures de luxe avec ou sans chauffeur au Maroc",
              provider: {
                "@id": "https://www.rtravel.ma/#organization",
              },
              serviceType: "Location de voitures",
              areaServed: {
                "@type": "Country",
                name: "Maroc",
              },
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "Service",
              name: "Transport VIP",
              description:
                "Service de transport VIP avec chauffeur professionnel pour événements et déplacements d'affaires",
              provider: {
                "@id": "https://www.rtravel.ma/#organization",
              },
              serviceType: "Transport VIP",
              areaServed: {
                "@type": "Country",
                name: "Maroc",
              },
            },
          },
        ],
      })

    case "vehicle":
      if (!data) return null

      return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: data.name,
        image: data.imageUrl,
        description: data.description,
        brand: {
          "@type": "Brand",
          name: data.name.split(" ")[0], // Extracts brand name (e.g., "Mercedes" from "Mercedes Classe E")
        },
        offers: {
          "@type": "Offer",
          price: data.pricePerDay,
          priceCurrency: "MAD",
          availability: "https://schema.org/InStock",
          seller: {
            "@id": "https://www.rtravel.ma/#organization",
          },
        },
      })

    case "tourist":
      return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TouristAttraction",
        name: "Circuits Touristiques R'TRAVEL",
        description: "Découvrez le Maroc avec nos circuits touristiques personnalisés et nos excursions guidées",
        image: "https://www.rtravel.ma/images/morocco-tourism.jpg",
        address: {
          "@type": "PostalAddress",
          addressCountry: "MA",
        },
        isAccessibleForFree: false,
        provider: {
          "@id": "https://www.rtravel.ma/#organization",
        },
      })

    case "contact":
      return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contactez R'TRAVEL",
        description: "Contactez-nous pour réserver un véhicule ou planifier votre transport au Maroc",
        mainEntity: {
          "@type": "Organization",
          "@id": "https://www.rtravel.ma/#organization",
        },
      })

    default:
      return JSON.stringify(organizationData)
  }
}
