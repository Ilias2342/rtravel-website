"use client"

import { useState } from "react"
import { Upload, Download, FileSpreadsheet, FileText, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function DataImportExport() {
  const [activeTab, setActiveTab] = useState("import")
  const [importFormat, setImportFormat] = useState("excel")
  const [exportFormat, setExportFormat] = useState("excel")
  const [importProgress, setImportProgress] = useState(0)
  const [exportProgress, setExportProgress] = useState(0)
  const [isImporting, setIsImporting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [importSuccess, setImportSuccess] = useState(false)
  const [exportSuccess, setExportSuccess] = useState(false)
  const [importError, setImportError] = useState<string | null>(null)
  const [exportError, setExportError] = useState<string | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "vehicles",
    "drivers",
    "clients",
    "documents",
  ])

  const handleImport = () => {
    setIsImporting(true)
    setImportProgress(0)
    setImportSuccess(false)
    setImportError(null)

    // Simulate import process
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsImporting(false)
          setImportSuccess(true)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleExport = () => {
    setIsExporting(true)
    setExportProgress(0)
    setExportSuccess(false)
    setExportError(null)

    // Simulate export process
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(false)
          setExportSuccess(true)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Importation et Exportation de Données</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="import">Importer des données</TabsTrigger>
          <TabsTrigger value="export">Exporter des données</TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Importer des données</CardTitle>
              <CardDescription>Importez des données depuis un fichier Excel, CSV ou JSON.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Format du fichier</Label>
                <Select value={importFormat} onValueChange={setImportFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                    <SelectItem value="csv">CSV (.csv)</SelectItem>
                    <SelectItem value="json">JSON (.json)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-md bg-muted">
                <div className="text-center">
                  {importFormat === "excel" && <FileSpreadsheet className="mx-auto h-12 w-12 text-muted-foreground" />}
                  {importFormat === "csv" && <FileText className="mx-auto h-12 w-12 text-muted-foreground" />}
                  {importFormat === "json" && <FileText className="mx-auto h-12 w-12 text-muted-foreground" />}
                  <div className="mt-4">
                    <Button>Sélectionner un fichier</Button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {importFormat === "excel" && "Fichier Excel (.xlsx) jusqu'à 10MB"}
                    {importFormat === "csv" && "Fichier CSV (.csv) jusqu'à 10MB"}
                    {importFormat === "json" && "Fichier JSON (.json) jusqu'à 10MB"}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Options d'importation</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="replace" />
                    <Label htmlFor="replace">Remplacer les données existantes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="validate" defaultChecked />
                    <Label htmlFor="validate">Valider les données avant l'importation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="backup" defaultChecked />
                    <Label htmlFor="backup">Créer une sauvegarde avant l'importation</Label>
                  </div>
                </div>
              </div>

              {isImporting && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Importation en cours...</span>
                    <span className="text-sm font-medium">{importProgress}%</span>
                  </div>
                  <Progress value={importProgress} />
                </div>
              )}

              {importSuccess && (
                <Alert className="bg-green-50 border-green-500">
                  <Check className="h-4 w-4 text-green-500" />
                  <AlertTitle>Importation réussie</AlertTitle>
                  <AlertDescription>Les données ont été importées avec succès.</AlertDescription>
                </Alert>
              )}

              {importError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Erreur d'importation</AlertTitle>
                  <AlertDescription>{importError}</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleImport} disabled={isImporting}>
                <Upload className="mr-2 h-4 w-4" />
                {isImporting ? "Importation en cours..." : "Importer"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exporter des données</CardTitle>
              <CardDescription>Exportez vos données vers un fichier Excel, CSV ou JSON.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Format d'exportation</Label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                    <SelectItem value="csv">CSV (.csv)</SelectItem>
                    <SelectItem value="json">JSON (.json)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Catégories à exporter</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="vehicles"
                      checked={selectedCategories.includes("vehicles")}
                      onCheckedChange={() => toggleCategory("vehicles")}
                    />
                    <Label htmlFor="vehicles">Véhicules</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="drivers"
                      checked={selectedCategories.includes("drivers")}
                      onCheckedChange={() => toggleCategory("drivers")}
                    />
                    <Label htmlFor="drivers">Chauffeurs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="clients"
                      checked={selectedCategories.includes("clients")}
                      onCheckedChange={() => toggleCategory("clients")}
                    />
                    <Label htmlFor="clients">Clients</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="documents"
                      checked={selectedCategories.includes("documents")}
                      onCheckedChange={() => toggleCategory("documents")}
                    />
                    <Label htmlFor="documents">Documents</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Options d'exportation</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-metadata" defaultChecked />
                    <Label htmlFor="include-metadata">Inclure les métadonnées</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-history" />
                    <Label htmlFor="include-history">Inclure l'historique</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-deleted" />
                    <Label htmlFor="include-deleted">Inclure les éléments supprimés</Label>
                  </div>
                </div>
              </div>

              {isExporting && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Exportation en cours...</span>
                    <span className="text-sm font-medium">{exportProgress}%</span>
                  </div>
                  <Progress value={exportProgress} />
                </div>
              )}

              {exportSuccess && (
                <Alert className="bg-green-50 border-green-500">
                  <Check className="h-4 w-4 text-green-500" />
                  <AlertTitle>Exportation réussie</AlertTitle>
                  <AlertDescription>Les données ont été exportées avec succès.</AlertDescription>
                </Alert>
              )}

              {exportError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Erreur d'exportation</AlertTitle>
                  <AlertDescription>{exportError}</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleExport} disabled={isExporting || selectedCategories.length === 0}>
                <Download className="mr-2 h-4 w-4" />
                {isExporting ? "Exportation en cours..." : "Exporter"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
