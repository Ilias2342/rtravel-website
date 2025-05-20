"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Download, Printer, Save, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Import the R'Travel logo
import Image from "next/image"

// Document types
const documentTypes = [
  { id: "contract", name: "Contrat de Location" },
  { id: "invoice", name: "Facture" },
  { id: "delivery", name: "Bon de Livraison" },
  { id: "mission", name: "Ordre de Mission" },
  { id: "maintenance", name: "Fiche d'Entretien" },
]

export function DocumentFormTemplate({ type = "contract" }) {
  const [documentType, setDocumentType] = useState(type)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [formData, setFormData] = useState({
    documentNumber: "",
    date: new Date().toISOString().split("T")[0],
    client: "",
    vehicle: "",
    driver: "",
    startDate: "",
    endDate: "",
    amount: "",
    notes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsSaving(true)
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    }, 1500)
  }

  const renderFormFields = () => {
    switch (documentType) {
      case "contract":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="documentNumber">Numéro de contrat</Label>
                <Input
                  id="documentNumber"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleInputChange}
                  placeholder="ex: CTR-2025-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Select value={formData.client} onValueChange={(value) => handleSelectChange("client", value)}>
                <SelectTrigger id="client">
                  <SelectValue placeholder="Sélectionner un client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KASBAH FILM">KASBAH FILM</SelectItem>
                  <SelectItem value="EVA-NORA MYNGHEER">EVA-NORA MYNGHEER</SelectItem>
                  <SelectItem value="SANEKIL">SANEKIL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle">Véhicule</Label>
              <Select value={formData.vehicle} onValueChange={(value) => handleSelectChange("vehicle", value)}>
                <SelectTrigger id="vehicle">
                  <SelectValue placeholder="Sélectionner un véhicule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CITROEN C-ELYSEE - 22976-T-1">CITROEN C-ELYSEE - 22976-T-1</SelectItem>
                  <SelectItem value="FIAT 500 - 36990-E-1">FIAT 500 - 36990-E-1</SelectItem>
                  <SelectItem value="RENAULT EXPRESS - 916-A-73">RENAULT EXPRESS - 916-A-73</SelectItem>
                  <SelectItem value="DACIA LOGAN - 19492-E-1">DACIA LOGAN - 19492-E-1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Date de début</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Date de fin</Label>
                <Input id="endDate" name="endDate" type="date" value={formData.endDate} onChange={handleInputChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Montant (MAD)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="ex: 2500"
              />
            </div>
          </>
        )
      case "invoice":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="documentNumber">Numéro de facture</Label>
                <Input
                  id="documentNumber"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleInputChange}
                  placeholder="ex: FAC-2025-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Select value={formData.client} onValueChange={(value) => handleSelectChange("client", value)}>
                <SelectTrigger id="client">
                  <SelectValue placeholder="Sélectionner un client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KASBAH FILM">KASBAH FILM</SelectItem>
                  <SelectItem value="EVA-NORA MYNGHEER">EVA-NORA MYNGHEER</SelectItem>
                  <SelectItem value="SANEKIL">SANEKIL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Montant HT (MAD)</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="ex: 2500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tva">TVA (%)</Label>
                <Input id="tva" name="tva" type="number" placeholder="ex: 20" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentDue">Date d'échéance</Label>
              <Input id="paymentDue" name="paymentDue" type="date" />
            </div>
          </>
        )
      case "delivery":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="documentNumber">Numéro de bon</Label>
                <Input
                  id="documentNumber"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleInputChange}
                  placeholder="ex: BL-2025-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Select value={formData.client} onValueChange={(value) => handleSelectChange("client", value)}>
                <SelectTrigger id="client">
                  <SelectValue placeholder="Sélectionner un client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KASBAH FILM">KASBAH FILM</SelectItem>
                  <SelectItem value="EVA-NORA MYNGHEER">EVA-NORA MYNGHEER</SelectItem>
                  <SelectItem value="SANEKIL">SANEKIL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle">Véhicule</Label>
              <Select value={formData.vehicle} onValueChange={(value) => handleSelectChange("vehicle", value)}>
                <SelectTrigger id="vehicle">
                  <SelectValue placeholder="Sélectionner un véhicule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CITROEN C-ELYSEE - 22976-T-1">CITROEN C-ELYSEE - 22976-T-1</SelectItem>
                  <SelectItem value="FIAT 500 - 36990-E-1">FIAT 500 - 36990-E-1</SelectItem>
                  <SelectItem value="RENAULT EXPRESS - 916-A-73">RENAULT EXPRESS - 916-A-73</SelectItem>
                  <SelectItem value="DACIA LOGAN - 19492-E-1">DACIA LOGAN - 19492-E-1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="receivedBy">Reçu par</Label>
              <Input id="receivedBy" name="receivedBy" placeholder="Nom de la personne qui reçoit" />
            </div>
          </>
        )
      case "mission":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="documentNumber">Numéro d'ordre</Label>
                <Input
                  id="documentNumber"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleInputChange}
                  placeholder="ex: OM-2025-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="driver">Chauffeur</Label>
              <Select value={formData.driver} onValueChange={(value) => handleSelectChange("driver", value)}>
                <SelectTrigger id="driver">
                  <SelectValue placeholder="Sélectionner un chauffeur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KNIZI ZAKARIA">KNIZI ZAKARIA</SelectItem>
                  <SelectItem value="AMARA CHAKIR">AMARA CHAKIR</SelectItem>
                  <SelectItem value="ROIBI ALI">ROIBI ALI</SelectItem>
                  <SelectItem value="CHOUKRI FOUZI">CHOUKRI FOUZI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle">Véhicule</Label>
              <Select value={formData.vehicle} onValueChange={(value) => handleSelectChange("vehicle", value)}>
                <SelectTrigger id="vehicle">
                  <SelectValue placeholder="Sélectionner un véhicule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CITROEN C-ELYSEE - 22976-T-1">CITROEN C-ELYSEE - 22976-T-1</SelectItem>
                  <SelectItem value="FIAT 500 - 36990-E-1">FIAT 500 - 36990-E-1</SelectItem>
                  <SelectItem value="RENAULT EXPRESS - 916-A-73">RENAULT EXPRESS - 916-A-73</SelectItem>
                  <SelectItem value="DACIA LOGAN - 19492-E-1">DACIA LOGAN - 19492-E-1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input id="destination" name="destination" placeholder="ex: Aéroport de Rabat" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Date de départ</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Date de retour</Label>
                <Input id="endDate" name="endDate" type="date" value={formData.endDate} onChange={handleInputChange} />
              </div>
            </div>
          </>
        )
      case "maintenance":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="documentNumber">Numéro de fiche</Label>
                <Input
                  id="documentNumber"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleInputChange}
                  placeholder="ex: ENT-2025-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle">Véhicule</Label>
              <Select value={formData.vehicle} onValueChange={(value) => handleSelectChange("vehicle", value)}>
                <SelectTrigger id="vehicle">
                  <SelectValue placeholder="Sélectionner un véhicule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CITROEN C-ELYSEE - 22976-T-1">CITROEN C-ELYSEE - 22976-T-1</SelectItem>
                  <SelectItem value="FIAT 500 - 36990-E-1">FIAT 500 - 36990-E-1</SelectItem>
                  <SelectItem value="RENAULT EXPRESS - 916-A-73">RENAULT EXPRESS - 916-A-73</SelectItem>
                  <SelectItem value="DACIA LOGAN - 19492-E-1">DACIA LOGAN - 19492-E-1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maintenanceType">Type d'entretien</Label>
              <Select onValueChange={(value) => handleSelectChange("maintenanceType", value)}>
                <SelectTrigger id="maintenanceType">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vidange">Vidange</SelectItem>
                  <SelectItem value="Freins">Freins</SelectItem>
                  <SelectItem value="Pneus">Pneus</SelectItem>
                  <SelectItem value="Révision complète">Révision complète</SelectItem>
                  <SelectItem value="Autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mileage">Kilométrage</Label>
                <Input id="mileage" name="mileage" type="number" placeholder="ex: 45000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Coût (MAD)</Label>
                <Input id="cost" name="cost" type="number" placeholder="ex: 850" />
              </div>
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Formulaire de Document</CardTitle>
              <CardDescription>Créez et téléchargez des documents officiels</CardDescription>
            </div>
            <div className="h-16 w-32 relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assets_task_01jvjqfby8erdbjwje6eswxth5_1747606603_img_1-H3HHOPUSEksA4uDrYWIAsGX6lG1yLJ.webp"
                alt="R'Travel Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="documentType">Type de document</Label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger id="documentType">
                <SelectValue placeholder="Sélectionner un type de document" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {renderFormFields()}

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Notes supplémentaires"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Pièce jointe (optionnel)</Label>
            <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-md bg-muted">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <div className="mt-2">
                  <Button variant="outline" size="sm">
                    Sélectionner un fichier
                  </Button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">PDF, JPG, PNG jusqu'à 10MB</p>
              </div>
            </div>
          </div>

          {isSaved && (
            <Alert className="bg-green-50 border-green-500">
              <Check className="h-4 w-4 text-green-500" />
              <AlertTitle>Document enregistré</AlertTitle>
              <AlertDescription>Le document a été enregistré avec succès.</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <X className="mr-2 h-4 w-4" />
              Annuler
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Imprimer
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Télécharger
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Aperçu du document</CardTitle>
          <CardDescription>Prévisualisation du document généré</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md p-6 bg-white min-h-[500px]">
            <div className="flex justify-between items-start mb-8">
              <div className="h-20 w-40 relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assets_task_01jvjqfby8erdbjwje6eswxth5_1747606603_img_1-H3HHOPUSEksA4uDrYWIAsGX6lG1yLJ.webp"
                  alt="R'Travel Logo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="text-right">
                <h3 className="text-xl font-bold">{documentTypes.find((d) => d.id === documentType)?.name}</h3>
                <p className="text-sm">N° {formData.documentNumber || "___________"}</p>
                <p className="text-sm">Date: {formData.date || "___________"}</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-bold border-b pb-1 mb-2">Informations</h4>
              <div className="grid grid-cols-2 gap-4">
                {formData.client && (
                  <div>
                    <p className="text-sm font-medium">Client:</p>
                    <p>{formData.client}</p>
                  </div>
                )}
                {formData.vehicle && (
                  <div>
                    <p className="text-sm font-medium">Véhicule:</p>
                    <p>{formData.vehicle}</p>
                  </div>
                )}
                {formData.driver && (
                  <div>
                    <p className="text-sm font-medium">Chauffeur:</p>
                    <p>{formData.driver}</p>
                  </div>
                )}
                {(formData.startDate || formData.endDate) && (
                  <div>
                    <p className="text-sm font-medium">Période:</p>
                    <p>
                      {formData.startDate || "___"} - {formData.endDate || "___"}
                    </p>
                  </div>
                )}
                {formData.amount && (
                  <div>
                    <p className="text-sm font-medium">Montant:</p>
                    <p>{formData.amount} MAD</p>
                  </div>
                )}
              </div>
            </div>

            {formData.notes && (
              <div className="mb-6">
                <h4 className="font-bold border-b pb-1 mb-2">Notes</h4>
                <p className="text-sm">{formData.notes}</p>
              </div>
            )}

            <div className="mt-12 flex justify-between">
              <div>
                <p className="mb-8 text-sm">Signature client:</p>
                <p className="border-t border-gray-400 pt-1 w-32">_________________</p>
              </div>
              <div>
                <p className="mb-8 text-sm">Signature R'TRAVEL:</p>
                <p className="border-t border-gray-400 pt-1 w-32">_________________</p>
              </div>
            </div>

            <div className="mt-12 pt-4 border-t text-xs text-center text-gray-500">
              <p>R'TRAVEL - HAY EL MENZAH, N°1160, CYM, Rabat</p>
              <p>Tél: 06 61 07 99 96 • Email: rtravel.contact@gmail.com</p>
              <p>ICE: 001982116000096 • RC: 131771 • Patente: 27200034</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
