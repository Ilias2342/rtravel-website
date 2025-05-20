"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Download, Printer, Eye } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data for document templates
const documentTemplates = [
  {
    id: 1,
    name: "Bon de Livraison",
    category: "vehicles",
    description: "Bon de livraison pour la location de véhicules",
    lastUsed: "13-02-2025",
  },
  {
    id: 2,
    name: "Ordre de Mission",
    category: "drivers",
    description: "Ordre de mission pour les chauffeurs",
    lastUsed: "28-02-2025",
  },
  {
    id: 3,
    name: "Facture Client",
    category: "clients",
    description: "Facture pour les clients",
    lastUsed: "05-03-2025",
  },
  {
    id: 4,
    name: "Contrat de Location",
    category: "vehicles",
    description: "Contrat pour la location de véhicules",
    lastUsed: "21-02-2025",
  },
  {
    id: 5,
    name: "Fiche Véhicule",
    category: "vehicles",
    description: "Fiche technique du véhicule",
    lastUsed: "15-02-2025",
  },
  {
    id: 6,
    name: "Attestation de Travail",
    category: "drivers",
    description: "Attestation de travail pour les chauffeurs",
    lastUsed: "10-03-2025",
  },
]

// Sample data for generated documents
const generatedDocuments = [
  {
    id: 1,
    name: "Bon de Livraison - KASBAH FILM - 13-02-2025",
    template: "Bon de Livraison",
    createdAt: "13-02-2025",
    createdBy: "Admin",
  },
  {
    id: 2,
    name: "Ordre de Mission - KNIZI ZAKARIA - 28-02-2025",
    template: "Ordre de Mission",
    createdAt: "28-02-2025",
    createdBy: "Admin",
  },
  {
    id: 3,
    name: "Facture - KASBAH FILM - 05-03-2025",
    template: "Facture Client",
    createdAt: "05-03-2025",
    createdBy: "Admin",
  },
  {
    id: 4,
    name: "Contrat - EVA-NORA MYNGHEER - 07-03-2025",
    template: "Contrat de Location",
    createdAt: "07-03-2025",
    createdBy: "Admin",
  },
]

export function DocumentGenerator() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)

  const filteredTemplates = documentTemplates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredDocuments = generatedDocuments.filter(
    (document) =>
      document.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.template.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.createdAt.includes(searchTerm),
  )

  const handleGenerate = (template: any) => {
    setSelectedTemplate(template)
    setIsGenerateDialogOpen(true)
  }

  const handlePreview = (document: any) => {
    setSelectedDocument(document)
    setIsPreviewDialogOpen(true)
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "vehicles":
        return <Badge className="bg-blue-500">Véhicules</Badge>
      case "drivers":
        return <Badge className="bg-green-500">Chauffeurs</Badge>
      case "clients":
        return <Badge className="bg-purple-500">Clients</Badge>
      default:
        return <Badge className="bg-gray-500">Autre</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Générateur de Documents</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="w-64 pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="templates">
        <TabsList>
          <TabsTrigger value="templates">Modèles</TabsTrigger>
          <TabsTrigger value="documents">Documents générés</TabsTrigger>
        </TabsList>
        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{template.name}</CardTitle>
                    {getCategoryBadge(template.category)}
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Dernière utilisation: {template.lastUsed}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => handleGenerate(template)}>
                    <FileText className="mr-2 h-4 w-4" />
                    Générer
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Modèle</TableHead>
                  <TableHead>Date de création</TableHead>
                  <TableHead>Créé par</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>{document.id}</TableCell>
                    <TableCell>{document.name}</TableCell>
                    <TableCell>{document.template}</TableCell>
                    <TableCell>{document.createdAt}</TableCell>
                    <TableCell>{document.createdBy}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handlePreview(document)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Generate Document Dialog */}
      <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Générer un document</DialogTitle>
            <DialogDescription>
              {selectedTemplate && `Remplissez les informations pour générer un ${selectedTemplate.name}.`}
            </DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <div className="grid gap-4 py-4">
              {selectedTemplate.category === "vehicles" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kasbah">KASBAH FILM</SelectItem>
                        <SelectItem value="eva">EVA-NORA MYNGHEER</SelectItem>
                        <SelectItem value="sanekil">SANEKIL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicle">Véhicule</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un véhicule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="citroen">CITROEN C-ELYSEE - 22976-T-1</SelectItem>
                        <SelectItem value="fiat">FIAT 500 - 36990-E-1</SelectItem>
                        <SelectItem value="renault">RENAULT EXPRESS - 916-A-73</SelectItem>
                        <SelectItem value="dacia">DACIA LOGAN - 19492-E-1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateStart">Date de début</Label>
                      <Input id="dateStart" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateEnd">Date de fin</Label>
                      <Input id="dateEnd" type="date" />
                    </div>
                  </div>
                </>
              )}
              {selectedTemplate.category === "drivers" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="driver">Chauffeur</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un chauffeur" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="knizi">KNIZI ZAKARIA</SelectItem>
                        <SelectItem value="amara">AMARA CHAKIR</SelectItem>
                        <SelectItem value="roibi">ROIBI ALI</SelectItem>
                        <SelectItem value="choukri">CHOUKRI FOUZI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mission">Mission</Label>
                    <Input id="mission" placeholder="ex: Transfert aéroport" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="missionDate">Date de mission</Label>
                      <Input id="missionDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="missionTime">Heure de mission</Label>
                      <Input id="missionTime" type="time" />
                    </div>
                  </div>
                </>
              )}
              {selectedTemplate.category === "clients" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kasbah">KASBAH FILM</SelectItem>
                        <SelectItem value="eva">EVA-NORA MYNGHEER</SelectItem>
                        <SelectItem value="sanekil">SANEKIL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="invoiceNumber">Numéro de facture</Label>
                    <Input id="invoiceNumber" placeholder="ex: 2025/03/001" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="invoiceDate">Date de facture</Label>
                      <Input id="invoiceDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Date d'échéance</Label>
                      <Input id="dueDate" type="date" />
                    </div>
                  </div>
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Input id="notes" placeholder="Notes supplémentaires" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGenerateDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => setIsGenerateDialogOpen(false)}>Générer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Document Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Aperçu du document</DialogTitle>
            <DialogDescription>{selectedDocument && selectedDocument.name}</DialogDescription>
          </DialogHeader>
          {selectedDocument && (
            <div className="py-4">
              <div className="border rounded-md p-4 bg-white min-h-[400px] flex flex-col items-center">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold">R-TRAVEL</h3>
                  <p className="text-sm">HAY EL MENZAH, N°1160, CYM, Rabat</p>
                  <p className="text-sm">Tél: 06 61 07 99 96 • Email: rtravel.contact@gmail.com</p>
                </div>

                {selectedDocument.template === "Bon de Livraison" && (
                  <div className="w-full">
                    <h4 className="text-lg font-bold text-center border-b-2 border-t-2 py-2 mb-4">BON DE LIVRAISON</h4>
                    <div className="mb-4">
                      <p>
                        <strong>Client:</strong> KASBAH FILM
                      </p>
                      <p>
                        <strong>Projet:</strong> CONVOY
                      </p>
                      <p>
                        <strong>Date:</strong> 13-02-2025
                      </p>
                    </div>
                    <table className="w-full border-collapse mb-4">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-2 text-left">Véhicule</th>
                          <th className="border p-2 text-left">Matricule</th>
                          <th className="border p-2 text-left">Date</th>
                          <th className="border p-2 text-left">Réception par</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border p-2">RENAULT EXPRESS</td>
                          <td className="border p-2">916-A-73</td>
                          <td className="border p-2">13-02-2025</td>
                          <td className="border p-2">MOUAD</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="flex justify-between mt-8">
                      <div>
                        <p className="mb-8">Signature client:</p>
                        <p>_________________</p>
                      </div>
                      <div>
                        <p className="mb-8">Signature R-TRAVEL:</p>
                        <p>_________________</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedDocument.template === "Ordre de Mission" && (
                  <div className="w-full">
                    <h4 className="text-lg font-bold text-center border-b-2 border-t-2 py-2 mb-4">ORDRE DE MISSION</h4>
                    <div className="mb-4">
                      <p>
                        <strong>Chauffeur:</strong> KNIZI ZAKARIA
                      </p>
                      <p>
                        <strong>CIN:</strong> A729900
                      </p>
                      <p>
                        <strong>Date:</strong> 28-02-2025
                      </p>
                    </div>
                    <div className="mb-4">
                      <p>
                        <strong>Mission:</strong> Transfert aéroport
                      </p>
                      <p>
                        <strong>Lieu de départ:</strong> Aéroport de Rabat
                      </p>
                      <p>
                        <strong>Destination:</strong> Gare de Rabat Agdal
                      </p>
                      <p>
                        <strong>Heure:</strong> 13h10
                      </p>
                    </div>
                    <div className="flex justify-between mt-8">
                      <div>
                        <p className="mb-8">Signature chauffeur:</p>
                        <p>_________________</p>
                      </div>
                      <div>
                        <p className="mb-8">Signature R-TRAVEL:</p>
                        <p>_________________</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewDialogOpen(false)}>
              Fermer
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Télécharger
            </Button>
            <Button>
              <Printer className="mr-2 h-4 w-4" />
              Imprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
