"use client"

import { useState } from "react"
import { Upload, FileText, Car, User, Calendar, CheckCircle, AlertCircle, FileUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Document categories
const documentCategories = [
  { id: "vehicle", name: "Documents Véhicule", icon: Car },
  { id: "driver", name: "Documents Chauffeur", icon: User },
  { id: "client", name: "Documents Client", icon: FileText },
  { id: "trip", name: "Documents Voyage", icon: Calendar },
  { id: "company", name: "Documents Entreprise", icon: FileText },
]

// Document templates
const documentTemplates = [
  {
    id: 1,
    name: "Carte Grise",
    category: "vehicle",
    description: "Document officiel d'immatriculation du véhicule",
    fields: [
      { name: "matricule", label: "Numéro d'immatriculation", type: "text", required: true },
      { name: "marque", label: "Marque du véhicule", type: "text", required: true },
      { name: "modele", label: "Modèle du véhicule", type: "text", required: true },
      { name: "dateCirculation", label: "Date de mise en circulation", type: "date", required: true },
      { name: "proprietaire", label: "Nom du propriétaire", type: "text", required: true },
    ],
  },
  {
    id: 2,
    name: "Assurance Véhicule",
    category: "vehicle",
    description: "Police d'assurance du véhicule",
    fields: [
      { name: "matricule", label: "Numéro d'immatriculation", type: "text", required: true },
      { name: "numeroPolice", label: "Numéro de police", type: "text", required: true },
      { name: "assureur", label: "Compagnie d'assurance", type: "text", required: true },
      { name: "dateDebut", label: "Date de début", type: "date", required: true },
      { name: "dateFin", label: "Date d'expiration", type: "date", required: true },
    ],
  },
  {
    id: 3,
    name: "Visite Technique",
    category: "vehicle",
    description: "Certificat de contrôle technique du véhicule",
    fields: [
      { name: "matricule", label: "Numéro d'immatriculation", type: "text", required: true },
      { name: "centre", label: "Centre de contrôle", type: "text", required: true },
      { name: "dateVisite", label: "Date de visite", type: "date", required: true },
      { name: "dateExpiration", label: "Date d'expiration", type: "date", required: true },
      { name: "resultat", label: "Résultat", type: "select", options: ["Favorable", "Défavorable"], required: true },
    ],
  },
  {
    id: 4,
    name: "Permis de Conduire",
    category: "driver",
    description: "Permis de conduire du chauffeur",
    fields: [
      { name: "nomChauffeur", label: "Nom du chauffeur", type: "text", required: true },
      { name: "numeroPermis", label: "Numéro de permis", type: "text", required: true },
      {
        name: "categorie",
        label: "Catégorie",
        type: "select",
        options: ["A", "B", "C", "D", "BE", "CE", "DE"],
        required: true,
      },
      { name: "dateDelivrance", label: "Date de délivrance", type: "date", required: true },
      { name: "dateExpiration", label: "Date d'expiration", type: "date", required: true },
    ],
  },
  {
    id: 5,
    name: "Carte d'Identité",
    category: "driver",
    description: "Carte d'identité nationale du chauffeur",
    fields: [
      { name: "nomChauffeur", label: "Nom du chauffeur", type: "text", required: true },
      { name: "numeroCIN", label: "Numéro de CIN", type: "text", required: true },
      { name: "dateDelivrance", label: "Date de délivrance", type: "date", required: true },
      { name: "dateExpiration", label: "Date d'expiration", type: "date", required: true },
    ],
  },
  {
    id: 6,
    name: "Contrat de Location",
    category: "client",
    description: "Contrat de location de véhicule",
    fields: [
      { name: "numeroContrat", label: "Numéro de contrat", type: "text", required: true },
      { name: "client", label: "Nom du client", type: "text", required: true },
      { name: "matricule", label: "Numéro d'immatriculation", type: "text", required: true },
      { name: "dateDebut", label: "Date de début", type: "date", required: true },
      { name: "dateFin", label: "Date de fin", type: "date", required: true },
      { name: "montant", label: "Montant (MAD)", type: "number", required: true },
    ],
  },
  {
    id: 7,
    name: "Bon de Commande",
    category: "client",
    description: "Bon de commande client",
    fields: [
      { name: "numeroBon", label: "Numéro de bon", type: "text", required: true },
      { name: "client", label: "Nom du client", type: "text", required: true },
      { name: "dateCommande", label: "Date de commande", type: "date", required: true },
      {
        name: "service",
        label: "Service commandé",
        type: "select",
        options: ["Location véhicule", "Transport touristique", "Transfert aéroport"],
        required: true,
      },
      { name: "montant", label: "Montant (MAD)", type: "number", required: true },
    ],
  },
  {
    id: 8,
    name: "Ordre de Mission",
    category: "trip",
    description: "Ordre de mission pour un chauffeur",
    fields: [
      { name: "numeroOrdre", label: "Numéro d'ordre", type: "text", required: true },
      { name: "chauffeur", label: "Nom du chauffeur", type: "text", required: true },
      { name: "matricule", label: "Numéro d'immatriculation", type: "text", required: true },
      { name: "destination", label: "Destination", type: "text", required: true },
      { name: "dateDepart", label: "Date de départ", type: "date", required: true },
      { name: "dateRetour", label: "Date de retour", type: "date", required: true },
      { name: "client", label: "Client", type: "text", required: false },
    ],
  },
  {
    id: 9,
    name: "Fiche d'Entretien",
    category: "vehicle",
    description: "Fiche d'entretien du véhicule",
    fields: [
      { name: "matricule", label: "Numéro d'immatriculation", type: "text", required: true },
      { name: "dateEntretien", label: "Date d'entretien", type: "date", required: true },
      {
        name: "typeEntretien",
        label: "Type d'entretien",
        type: "select",
        options: ["Vidange", "Freins", "Pneus", "Révision complète", "Autre"],
        required: true,
      },
      { name: "kilometrage", label: "Kilométrage", type: "number", required: true },
      { name: "technicien", label: "Technicien", type: "text", required: true },
      { name: "coutEntretien", label: "Coût (MAD)", type: "number", required: true },
      { name: "notes", label: "Notes", type: "textarea", required: false },
    ],
  },
  {
    id: 10,
    name: "Facture",
    category: "client",
    description: "Facture client",
    fields: [
      { name: "numeroFacture", label: "Numéro de facture", type: "text", required: true },
      { name: "client", label: "Nom du client", type: "text", required: true },
      { name: "dateFacture", label: "Date de facturation", type: "date", required: true },
      { name: "montantHT", label: "Montant HT (MAD)", type: "number", required: true },
      { name: "tva", label: "TVA (%)", type: "number", required: true },
      { name: "montantTTC", label: "Montant TTC (MAD)", type: "number", required: true },
      { name: "echeance", label: "Date d'échéance", type: "date", required: true },
    ],
  },
]

// Sample uploaded documents
const uploadedDocuments = [
  {
    id: 1,
    name: "Carte Grise - CITROEN C-ELYSEE.pdf",
    category: "vehicle",
    template: "Carte Grise",
    uploadDate: "2025-03-15",
    size: "1.2 MB",
    status: "valid",
    expiryDate: "2030-03-15",
    metadata: {
      matricule: "22976-T-1",
      marque: "CITROEN",
      modele: "C-ELYSEE",
    },
  },
  {
    id: 2,
    name: "Assurance - FIAT 500.pdf",
    category: "vehicle",
    template: "Assurance Véhicule",
    uploadDate: "2025-02-10",
    size: "0.8 MB",
    status: "expiring",
    expiryDate: "2025-08-10",
    metadata: {
      matricule: "36990-E-1",
      numeroPolice: "ASS-2025-12345",
      assureur: "Wafa Assurance",
    },
  },
  {
    id: 3,
    name: "Permis - KNIZI ZAKARIA.pdf",
    category: "driver",
    template: "Permis de Conduire",
    uploadDate: "2025-01-20",
    size: "0.5 MB",
    status: "valid",
    expiryDate: "2028-01-20",
    metadata: {
      nomChauffeur: "KNIZI ZAKARIA",
      numeroPermis: "P-123456",
      categorie: "B",
    },
  },
  {
    id: 4,
    name: "Contrat - KASBAH FILM.pdf",
    category: "client",
    template: "Contrat de Location",
    uploadDate: "2025-02-05",
    size: "1.5 MB",
    status: "valid",
    expiryDate: "2025-06-05",
    metadata: {
      numeroContrat: "CTR-2025-001",
      client: "KASBAH FILM",
      matricule: "22976-T-1",
    },
  },
  {
    id: 5,
    name: "Visite Technique - RENAULT EXPRESS.pdf",
    category: "vehicle",
    template: "Visite Technique",
    uploadDate: "2024-12-15",
    size: "0.7 MB",
    status: "expired",
    expiryDate: "2025-04-15",
    metadata: {
      matricule: "916-A-73",
      centre: "Centre Technique Auto Rabat",
      resultat: "Favorable",
    },
  },
]

export function DocumentUploadSystem() {
  const [activeTab, setActiveTab] = useState("upload")
  const [selectedCategory, setSelectedCategory] = useState("vehicle")
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const filteredTemplates = documentTemplates.filter((template) => template.category === selectedCategory)

  const filteredDocuments = uploadedDocuments.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.template.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.metadata &&
        Object.values(doc.metadata).some(
          (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
        )),
  )

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template)
    setIsUploadDialogOpen(true)
  }

  const handleUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadSuccess(true)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleViewDocument = (document: any) => {
    setSelectedDocument(document)
    setIsViewDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valid":
        return <Badge className="bg-green-500">Valide</Badge>
      case "expiring":
        return <Badge className="bg-yellow-500">Expire bientôt</Badge>
      case "expired":
        return <Badge className="bg-red-500">Expiré</Badge>
      default:
        return <Badge className="bg-gray-500">Inconnu</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Système de Gestion Documentaire</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              type="search"
              placeholder="Rechercher des documents..."
              className="w-64 pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FileText className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upload">Télécharger un document</TabsTrigger>
          <TabsTrigger value="documents">Documents existants</TabsTrigger>
          <TabsTrigger value="templates">Modèles de documents</TabsTrigger>
          <TabsTrigger value="expiring">Documents expirants</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {documentCategories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all hover:border-primary ${
                  selectedCategory === category.id ? "border-primary border-2" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {category.id === "vehicle" && "Documents liés aux véhicules (carte grise, assurance, etc.)"}
                    {category.id === "driver" && "Documents liés aux chauffeurs (permis, CIN, etc.)"}
                    {category.id === "client" && "Documents liés aux clients (contrats, factures, etc.)"}
                    {category.id === "trip" && "Documents liés aux voyages (ordres de mission, etc.)"}
                    {category.id === "company" && "Documents administratifs de l'entreprise"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">
              Modèles disponibles pour {documentCategories.find((c) => c.id === selectedCategory)?.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="cursor-pointer hover:border-primary"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">{template.fields.length} champs à remplir</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => handleTemplateSelect(template)}>
                      <Upload className="mr-2 h-4 w-4" />
                      Utiliser ce modèle
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((document) => (
                <Card key={document.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-muted p-4 flex items-center justify-center md:w-1/6">
                      <FileText className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="font-medium">{document.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {document.template} • {document.size} • Téléchargé le {document.uploadDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-2 md:mt-0">
                          {getStatusBadge(document.status)}
                          <Button variant="outline" size="sm" onClick={() => handleViewDocument(document)}>
                            Voir
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm">
                          <span className="font-medium">Expire le:</span> {document.expiryDate}
                        </p>
                        {document.metadata && (
                          <div className="mt-1 flex flex-wrap gap-2">
                            {Object.entries(document.metadata).map(([key, value]) => (
                              <Badge key={key} variant="outline" className="text-xs">
                                {key}: {value as string}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <h3 className="font-medium text-lg">Aucun document trouvé</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "Essayez avec d'autres termes de recherche" : "Commencez par télécharger des documents"}
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documentTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                    <Badge>{documentCategories.find((c) => c.id === template.category)?.name}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Champs requis:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {template.fields
                        .filter((f) => f.required)
                        .map((field, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{field.label}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => handleTemplateSelect(template)}>
                    <Upload className="mr-2 h-4 w-4" />
                    Utiliser ce modèle
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="expiring" className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Documents à renouveler</AlertTitle>
            <AlertDescription>
              Les documents suivants expirent dans les 30 prochains jours ou sont déjà expirés.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 gap-4">
            {uploadedDocuments
              .filter((doc) => doc.status === "expiring" || doc.status === "expired")
              .map((document) => (
                <Card
                  key={document.id}
                  className={`overflow-hidden ${document.status === "expired" ? "border-red-500" : "border-yellow-500"}`}
                >
                  <div className="flex flex-col md:flex-row">
                    <div
                      className={`p-4 flex items-center justify-center md:w-1/6 ${document.status === "expired" ? "bg-red-50" : "bg-yellow-50"}`}
                    >
                      <AlertCircle
                        className={`h-12 w-12 ${document.status === "expired" ? "text-red-500" : "text-yellow-500"}`}
                      />
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="font-medium">{document.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {document.template} • Expire le {document.expiryDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-2 md:mt-0">
                          {getStatusBadge(document.status)}
                          <Button variant="outline" size="sm" onClick={() => handleViewDocument(document)}>
                            Voir
                          </Button>
                          <Button size="sm">Renouveler</Button>
                        </div>
                      </div>
                      {document.metadata && (
                        <div className="mt-2">
                          <div className="mt-1 flex flex-wrap gap-2">
                            {Object.entries(document.metadata).map(([key, value]) => (
                              <Badge key={key} variant="outline" className="text-xs">
                                {key}: {value as string}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileUp className="h-5 w-5" />
              {selectedTemplate?.name}
            </DialogTitle>
            <DialogDescription>Remplissez les informations et téléchargez le document</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-md bg-muted">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <div className="mt-4">
                  <Button>Sélectionner un fichier</Button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">PDF, JPG, PNG jusqu'à 10MB</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Informations du document</h4>

              {selectedTemplate?.fields.map((field: any, idx: number) => (
                <div key={idx} className="space-y-2">
                  <Label htmlFor={field.name}>
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </Label>

                  {field.type === "text" && (
                    <Input id={field.name} placeholder={`Entrez ${field.label.toLowerCase()}`} />
                  )}

                  {field.type === "number" && (
                    <Input id={field.name} type="number" placeholder={`Entrez ${field.label.toLowerCase()}`} />
                  )}

                  {field.type === "date" && <Input id={field.name} type="date" />}

                  {field.type === "select" && (
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={`Sélectionnez ${field.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option: string) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {field.type === "textarea" && (
                    <Textarea id={field.name} placeholder={`Entrez ${field.label.toLowerCase()}`} />
                  )}
                </div>
              ))}

              <div className="space-y-2">
                <Label htmlFor="expiry">Date d'expiration</Label>
                <Input id="expiry" type="date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Notes supplémentaires" />
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Téléchargement en cours...</span>
                  <span className="text-sm font-medium">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            {uploadSuccess && (
              <Alert className="bg-green-50 border-green-500">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertTitle>Téléchargement réussi</AlertTitle>
                <AlertDescription>Le document a été téléchargé avec succès.</AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? "Téléchargement..." : "Télécharger"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Document Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.name}</DialogTitle>
            <DialogDescription>
              {selectedDocument?.template} • {selectedDocument?.size} • Téléchargé le {selectedDocument?.uploadDate}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Statut:</span>
              {selectedDocument && getStatusBadge(selectedDocument.status)}
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">Date d'expiration:</span>
              <span>{selectedDocument?.expiryDate}</span>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">Métadonnées</h4>

              {selectedDocument?.metadata && (
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedDocument.metadata).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <Label className="text-muted-foreground">{key}</Label>
                      <div className="font-medium">{value as string}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="h-64 bg-muted rounded-md flex items-center justify-center">
              <FileText className="h-16 w-16 text-muted-foreground" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Fermer
            </Button>
            <Button>Télécharger</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
