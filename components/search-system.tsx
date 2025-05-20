"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample data for search
const searchData = [
  {
    id: 1,
    title: "CITROEN C-ELYSEE",
    category: "vehicles",
    content: "Véhicule de type CITROEN C-ELYSEE avec matricule 22976-T-1. Disponible pour location.",
    tags: ["véhicule", "disponible", "citroen"],
  },
  {
    id: 2,
    title: "KNIZI ZAKARIA",
    category: "drivers",
    content: "Chauffeur avec CIN A729900, basé à RABAT. Disponible pour missions.",
    tags: ["chauffeur", "disponible", "rabat"],
  },
  {
    id: 3,
    title: "Transfert Aéroport Rabat",
    category: "transfers",
    content: "Service de transfert entre l'aéroport de Rabat et la gare de Rabat Agdal. Prix: 300 MAD.",
    tags: ["transfert", "aéroport", "rabat", "gare"],
  },
  {
    id: 4,
    title: "KASBAH FILM",
    category: "clients",
    content: "Client régulier pour location de véhicules. Projet actuel: CONVOY.",
    tags: ["client", "location", "projet"],
  },
  {
    id: 5,
    title: "Bon de Livraison",
    category: "documents",
    content: "Modèle de document pour la livraison de véhicules aux clients.",
    tags: ["document", "modèle", "livraison"],
  },
  {
    id: 6,
    title: "Maintenance RENAULT EXPRESS",
    category: "maintenance",
    content: "Maintenance programmée pour RENAULT EXPRESS (916-A-73) le 20-04-2025.",
    tags: ["maintenance", "renault", "programmée"],
  },
  {
    id: 7,
    title: "Conflit de réservation FIAT 500",
    category: "conflicts",
    content: "Conflit de double réservation pour FIAT 500 (36990-E-1) entre le 18-05-2025 et le 20-05-2025.",
    tags: ["conflit", "réservation", "fiat"],
  },
  {
    id: 8,
    title: "Certification Permis B",
    category: "certifications",
    content: "Suivi des certifications de type Permis B pour les chauffeurs.",
    tags: ["certification", "permis", "chauffeur"],
  },
]

export function SearchSystem() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    if (!searchTerm.trim()) return

    setIsSearching(true)
    setHasSearched(true)

    // Simulate search delay
    setTimeout(() => {
      const results = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )

      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  const clearSearch = () => {
    setSearchTerm("")
    setSearchResults([])
    setHasSearched(false)
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "vehicles":
        return <Badge className="bg-blue-500">Véhicules</Badge>
      case "drivers":
        return <Badge className="bg-green-500">Chauffeurs</Badge>
      case "transfers":
        return <Badge className="bg-purple-500">Transferts</Badge>
      case "clients":
        return <Badge className="bg-orange-500">Clients</Badge>
      case "documents":
        return <Badge className="bg-gray-500">Documents</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-500">Maintenance</Badge>
      case "conflicts":
        return <Badge className="bg-red-500">Conflits</Badge>
      case "certifications":
        return <Badge className="bg-teal-500">Certifications</Badge>
      default:
        return <Badge>Autre</Badge>
    }
  }

  const highlightText = (text: string, term: string) => {
    if (!term.trim()) return text

    const regex = new RegExp(`(${term})`, "gi")
    return text.replace(regex, '<span class="bg-yellow-200">$1</span>')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher dans toutes les catégories..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          {searchTerm && (
            <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-9 w-9" onClick={clearSearch}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button onClick={handleSearch} disabled={isSearching || !searchTerm.trim()}>
          {isSearching ? "Recherche..." : "Rechercher"}
        </Button>
      </div>

      {hasSearched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">
              {isSearching
                ? "Recherche en cours..."
                : searchResults.length > 0
                  ? `${searchResults.length} résultats trouvés pour "${searchTerm}"`
                  : `Aucun résultat trouvé pour "${searchTerm}"`}
            </h3>
            {searchResults.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearSearch}>
                Effacer les résultats
              </Button>
            )}
          </div>

          {isSearching ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((result) => (
                <Card key={result.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: highlightText(result.title, searchTerm),
                            }}
                          />
                        </h4>
                        <div className="flex items-center gap-2 mt-1 mb-2">
                          {getCategoryBadge(result.category)}
                          <span className="text-sm text-gray-500">
                            {result.category === "vehicles"
                              ? "Véhicule"
                              : result.category === "drivers"
                                ? "Chauffeur"
                                : result.category === "transfers"
                                  ? "Transfert"
                                  : result.category === "clients"
                                    ? "Client"
                                    : result.category === "documents"
                                      ? "Document"
                                      : result.category === "maintenance"
                                        ? "Maintenance"
                                        : result.category === "conflicts"
                                          ? "Conflit"
                                          : "Certification"}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Voir en contexte
                      </Button>
                    </div>
                    <p
                      className="text-sm text-gray-700 mt-2"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(result.content, searchTerm),
                      }}
                    />
                    <div className="flex flex-wrap gap-2 mt-3">
                      {result.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            hasSearched && (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucun résultat ne correspond à votre recherche.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Essayez avec des termes différents ou vérifiez l'orthographe.
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
