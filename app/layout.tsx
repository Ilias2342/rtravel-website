import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { GoogleAnalytics } from "@/components/google-analytics"
import { AnalyticsPageView } from "@/components/analytics-page-view"
import { Suspense } from "react"
import { ConsentBanner } from "@/components/consent-banner"
import { LocalBusinessSEO } from "@/components/local-business-seo"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "R'TRAVEL - Location de Voitures et Transport Touristique au Maroc | Service VIP",
  description:
    "Service premium de location de voitures et transport touristique au Maroc. Flotte de véhicules de luxe, chauffeurs professionnels, excursions personnalisées et transferts aéroport VIP à Rabat et dans tout le Maroc.",
  keywords: [
    "location voiture maroc",
    "transport touristique maroc",
    "location voiture rabat",
    "transport vip maroc",
    "excursion désert maroc",
    "location minibus maroc",
    "chauffeur privé maroc",
    "transport événements maroc",
    "transfert aéroport rabat",
    "location mercedes maroc",
    "location voiture luxe maroc",
    "circuit touristique maroc",
    "transport mariage maroc",
    "location 4x4 maroc",
  ],
  authors: [{ name: "R'TRAVEL" }],
  creator: "R'TRAVEL",
  publisher: "R'TRAVEL",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.rtravel.ma"),
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/fr",
      "en-US": "/en",
      "ar-MA": "/ar",
    },
  },
  openGraph: {
    title: "R'TRAVEL - Location de Voitures et Transport Touristique au Maroc | Service VIP",
    description:
      "Service premium de location de voitures et transport touristique au Maroc. Flotte de véhicules de luxe, chauffeurs professionnels, excursions personnalisées et transferts aéroport VIP à Rabat et dans tout le Maroc.",
    url: "https://www.rtravel.ma",
    siteName: "R'TRAVEL",
    images: [
      {
        url: "/images/rtravel-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "R'TRAVEL - Location de Voitures et Transport Touristique au Maroc | Service VIP",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "R'TRAVEL - Location de Voitures et Transport Touristique au Maroc | Service VIP",
    description:
      "Service premium de location de voitures et transport touristique au Maroc. Flotte de véhicules de luxe, chauffeurs professionnels, excursions personnalisées et transferts aéroport VIP à Rabat et dans tout le Maroc.",
    creator: "@rtravel",
    images: ["/images/rtravel-og-image.jpg"],
  },
  icons: {
    icon: "/images/rtravel-logo.png",
    shortcut: "/images/rtravel-logo.png",
    apple: "/images/rtravel-logo.png",
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <Suspense fallback={null}>
              <div className="relative min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 w-full">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </Suspense>
            <ConsentBanner />
            <LocalBusinessSEO />
          </LanguageProvider>
        </ThemeProvider>
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <AnalyticsPageView />
        </Suspense>
      </body>
    </html>
  )
}
