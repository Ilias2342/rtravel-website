"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface BreadcrumbProps {
  homeLabel?: string
  items?: { label: string; href: string }[]
}

export function Breadcrumb({ homeLabel, items }: BreadcrumbProps) {
  const pathname = usePathname()
  const { language } = useLanguage()

  // Generate breadcrumb items based on pathname if not provided
  const breadcrumbItems = items || generateBreadcrumbItems(pathname, language)

  // Generate structured data for breadcrumbs
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel || "Accueil",
        item: "https://www.rtravel.ma",
      },
      ...breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: `https://www.rtravel.ma${item.href}`,
      })),
    ],
  }

  return (
    <nav aria-label="Breadcrumb" className="w-full py-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      <div className="container px-4 md:px-6">
        <ol className="flex items-center flex-wrap text-sm">
          <li className="flex items-center">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
              <Home className="h-4 w-4 mr-1" />
              <span>{homeLabel || "Accueil"}</span>
            </Link>
          </li>

          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
              {index === breadcrumbItems.length - 1 ? (
                <span className="font-medium">{item.label}</span>
              ) : (
                <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

// Helper function to generate breadcrumb items based on pathname
function generateBreadcrumbItems(pathname: string, language: string) {
  const segments = pathname.split("/").filter(Boolean)
  const items: { label: string; href: string }[] = []

  let currentPath = ""

  segments.forEach((segment) => {
    currentPath += `/${segment}`

    let label = segment.charAt(0).toUpperCase() + segment.slice(1)

    // Translate common segments based on language
    if (language === "fr") {
      if (segment === "transport") label = "Transport"
      if (segment === "tourist") label = "Tourisme"
      if (segment === "contact") label = "Contact"
    } else if (language === "en") {
      if (segment === "transport") label = "Transport"
      if (segment === "tourist") label = "Tourism"
      if (segment === "contact") label = "Contact"
    } else if (language === "ar") {
      if (segment === "transport") label = "النقل"
      if (segment === "tourist") label = "السياحة"
      if (segment === "contact") label = "اتصل بنا"
    }

    items.push({
      label,
      href: currentPath,
    })
  })

  return items
}
