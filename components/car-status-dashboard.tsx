"use client"

import { useState } from "react"
import { Car, PenToolIcon as Tool, MapPin, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Sample car data with comprehensive status information
const cars = [
  {
    id: 1,
    type: "CITROEN C-ELYSEE",
    matricule: "22976-T-1",
    status: "available",
    location: "Garage principal",
    lastMaintenance: "2025-01-15",
    nextMaintenance: "2025-07-15",
    maintenanceStatus: "ok",
    fuelLevel: 85,
    mileage: 45280,
    documents: {
      carteGrise: { status: "valid", expiry: "2030-03-15" },
      assurance: { status: "valid", expiry: "2026-01-15" },
      visiteTechnique: { status: "valid", expiry: "2025-12-10" },
    },
    history: [
      { date: "2025-03-15", event: "Retour de location", client: "KASBAH FILM", duration: "8 jours" },
      { date: "2025-01-15", event: "Maintenance", details: "Vidange et filtres", cost: "850 MAD" },
      { date: "2025-01-02", event: "Retour de location", client: "SANEKIL", duration: "3 jours" },
    ],
    notes: "Véhicule en excellent état",
  },
  {
    id: 2,
    type: "FIAT 500",
    matricule: "36990-E-1",
    status: "rented",
    client: "EVA-NORA MYNGHEER",
    rentalStart: "2025-03-07",
    rentalEnd: "2025-04-05",
    location: "Avec client",
    lastMaintenance: "2025-02-10",
    nextMaintenance: "2025-08-10",
    maintenanceStatus: "ok",
    fuelLevel: 60,
    mileage: 32150,
    documents: {
      carteGrise: { status: "valid", expiry: "2029-05-20" },
      assurance: { status: "expiring", expiry: "2025-08-10" },
      visiteTechnique: { status: "valid", expiry: "2025-11-25" },
    },
    history: [
      { date: "2025-03-07", event: "Début de location", client: "EVA-NORA MYNGHEER", duration: "30 jours" },
      { date: "2025-02-10", event: "Maintenance", details: "Révision complète", cost: "1200 MAD" },
      { date: "2025-02-01", event: "Retour de location", client: "KASBAH FILM", duration: "7 jours" },
    ],
    notes: "Client régulier, prend soin du véhicule",
  },
  {
    id: 3,
    type: "RENAULT EXPRESS",
    matricule: "916-A-73",
    status: "maintenance",
    maintenanceType: "Révision complète",
    maintenanceStart: "2025-04-20",
    maintenanceEnd: "2025-04-22",
    location: "Garage Auto Express",
    lastMaintenance: "2024-10-20",
    nextMaintenance: "2025-10-20",
    maintenanceStatus: "in_progress",
    fuelLevel: 30,
    mileage: 78450,
    documents: {
      carteGrise: { status: "valid", expiry: "2028-07-12" },
      assurance: { status: "valid", expiry: "2025-09-30" },
      visiteTechnique: { status: "expired", expiry: "2025-04-15" },
    },
    history: [
      { date: "2025-04-20", event: "Début maintenance", details: "Révision complète", estimatedCost: "2500 MAD" },
      { date: "2025-03-15", event: "Retour de location", client: "KASBAH FILM", duration: "23 jours" },
      { date: "2025-02-15", event: "Réparation", details: "Remplacement batterie", cost: "950 MAD" },
    ],
    notes: "Problème de démarrage à froid à surveiller",
  },
  {
    id: 4,
    type: "DACIA LOGAN",
    matricule: "19492-E-1",
    status: "available",
    location: "Garage principal",
    lastMaintenance: "2025-03-05",
    nextMaintenance: "2025-09-05",
    maintenanceStatus: "ok",
    fuelLevel: 100,
    mileage: 28760,
    documents: {
      carteGrise: { status: "valid", expiry: "2031-01-05" },
      assurance: { status: "valid", expiry: "2026-03-05" },
      visiteTechnique: { status: "valid", expiry: "2026-02-15" },
    },
    history: [
      { date: "2025-03-25", event: "Préparation", details: "Nettoyage complet" },
      { date: "2025-03-05", event: "Maintenance", details: "Vidange et filtres", cost: "850 MAD" },
      { date: "2025-02-28", event: "Retour de location", client: "KASBAH FILM", duration: "15 jours" },
    ],
    notes: "Véhicule récent en très bon état",
  },
  {
    id: 5,
    type: "GRAND HYNDAI I10",
    matricule: "524033 WW",
    status: "rented",
    client: "KASBAH FILM",
    rentalStart: "2025-03-03",
    rentalEnd: "",
    location: "Avec client",
    lastMaintenance: "2025-02-25",
    nextMaintenance: "2025-08-25",
    maintenanceStatus: "warning",
    fuelLevel: 45,
    mileage: 52340,
    documents: {
      carteGrise: { status: "valid", expiry: "2029-11-20" },
      assurance: { status: "valid", expiry: "2025-12-15" },
      visiteTechnique: { status: "valid", expiry: "2025-10-05" },
    },
    history: [
      { date: "2025-03-03", event: "Début de location", client: "KASBAH FILM", duration: "Indéterminée" },
      { date: "2025-02-25", event: "Maintenance", details: "Vidange et filtres", cost: "850 MAD" },
      { date: "2025-02-22", event: "Retour de location", client: "KASBAH FILM", duration: "5 jours" },
    ],
    notes: "Pneus à remplacer au prochain entretien",
  },
]

export function CarStatusDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCar, setSelectedCar] = useState<any>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  const filteredCars = cars.filter(
    (car) =>
      (statusFilter === "all" || car.status === statusFilter) &&
      (car.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.matricule.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleViewDetails = (car: any) => {
    setSelectedCar(car)
    setIsDetailsDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Disponible</Badge>
      case "rented":
        return <Badge className="bg-blue-500">Loué</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-500">Maintenance</Badge>
      case "reserved":
        return <Badge className="bg-purple-500">Réservé</Badge>
      default:
        return <Badge className="bg-gray-500">Inconnu</Badge>
    }
  }

  const getDocumentStatusBadge = (status: string) => {
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

  const getMaintenanceStatusBadge = (status: string) => {
    switch (status) {
      case "ok":
        return <Badge className="bg-green-500">OK</Badge>
      case "warning":
        return <Badge className="bg-yellow-500">À surveiller</Badge>
      case "due":
        return <Badge className="bg-orange-500">À faire</Badge>
      case "overdue":
        return <Badge className="bg-red-500">En retard</Badge>
      case "in_progress":
        return <Badge className="bg-blue-500">En cours</Badge>
      default:
        return <Badge className="bg-gray-500">Inconnu</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Statut des Véhicules</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un véhicule..."
              className="w-64 pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="available">Disponible</SelectItem>
              <SelectItem value="rented">Loué</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="reserved">Réservé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total des véhicules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{cars.length}</div>
                <p className="text-xs text-muted-foreground">Flotte complète</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {cars.filter((car) => car.status === "available").length}
                </div>
                <p className="text-xs text-muted-foreground">Prêts à être loués</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">En location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {cars.filter((car) => car.status === "rented").length}
                </div>
                <p className="text-xs text-muted-foreground">Actuellement avec des clients</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">En maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {cars.filter((car) => car.status === "maintenance").length}
                </div>
                <p className="text-xs text-muted-foreground">En réparation ou entretien</p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Véhicule</TableHead>
                  <TableHead>Matricule</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Kilométrage</TableHead>
                  <TableHead>Carburant</TableHead>
                  <TableHead>Maintenance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCars.map((car) => (
                  <TableRow key={car.id}>
                    <TableCell className="font-medium">{car.type}</TableCell>
                    <TableCell>{car.matricule}</TableCell>
                    <TableCell>{getStatusBadge(car.status)}</TableCell>
                    <TableCell>{car.location}</TableCell>
                    <TableCell>{car.mileage} km</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={car.fuelLevel} className="h-2 w-20" />
                        <span className="text-xs">{car.fuelLevel}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{getMaintenanceStatusBadge(car.maintenanceStatus)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(car)}>
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Maintenance à jour</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {cars.filter((car) => car.maintenanceStatus === "ok").length}
                </div>
                <p className="text-xs text-muted-foreground">Véhicules avec maintenance à jour</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">À surveiller</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {cars.filter((car) => car.maintenanceStatus === "warning").length}
                </div>
                <p className="text-xs text-muted-foreground">Maintenance à prévoir prochainement</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">En cours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {cars.filter((car) => car.maintenanceStatus === "in_progress").length}
                </div>
                <p className="text-xs text-muted-foreground">Véhicules en maintenance</p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Véhicule</TableHead>
                  <TableHead>Matricule</TableHead>
                  <TableHead>Dernière maintenance</TableHead>
                  <TableHead>Prochaine maintenance</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Kilométrage</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCars.map((car) => (
                  <TableRow key={car.id}>
                    <TableCell className="font-medium">{car.type}</TableCell>
                    <TableCell>{car.matricule}</TableCell>
                    <TableCell>{car.lastMaintenance}</TableCell>
                    <TableCell>{car.nextMaintenance}</TableCell>
                    <TableCell>{getMaintenanceStatusBadge(car.maintenanceStatus)}</TableCell>
                    <TableCell>{car.mileage} km</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(car)}>
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Documents valides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {
                    cars.filter(
                      (car) =>
                        car.documents.carteGrise.status === "valid" &&
                        car.documents.assurance.status === "valid" &&
                        car.documents.visiteTechnique.status === "valid",
                    ).length
                  }
                </div>
                <p className="text-xs text-muted-foreground">Véhicules avec tous les documents à jour</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Documents expirants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {
                    cars.filter(
                      (car) =>
                        car.documents.carteGrise.status === "expiring" ||
                        car.documents.assurance.status === "expiring" ||
                        car.documents.visiteTechnique.status === "expiring",
                    ).length
                  }
                </div>
                <p className="text-xs text-muted-foreground">Véhicules avec documents à renouveler bientôt</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Documents expirés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {
                    cars.filter(
                      (car) =>
                        car.documents.carteGrise.status === "expired" ||
                        car.documents.assurance.status === "expired" ||
                        car.documents.visiteTechnique.status === "expired",
                    ).length
                  }
                </div>
                <p className="text-xs text-muted-foreground">Véhicules avec documents expirés</p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Véhicule</TableHead>
                  <TableHead>Matricule</TableHead>
                  <TableHead>Carte Grise</TableHead>
                  <TableHead>Assurance</TableHead>
                  <TableHead>Visite Technique</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCars.map((car) => (
                  <TableRow key={car.id}>
                    <TableCell className="font-medium">{car.type}</TableCell>
                    <TableCell>{car.matricule}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        {getDocumentStatusBadge(car.documents.carteGrise.status)}
                        <span className="text-xs mt-1">Exp: {car.documents.carteGrise.expiry}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        {getDocumentStatusBadge(car.documents.assurance.status)}
                        <span className="text-xs mt-1">Exp: {car.documents.assurance.expiry}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        {getDocumentStatusBadge(car.documents.visiteTechnique.status)}
                        <span className="text-xs mt-1">Exp: {car.documents.visiteTechnique.expiry}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(car)}>
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Véhicule</TableHead>
                  <TableHead>Matricule</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Événement</TableHead>
                  <TableHead>Détails</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCars.flatMap((car) =>
                  car.history.map((event, idx) => (
                    <TableRow key={`${car.id}-${idx}`}>
                      <TableCell className="font-medium">{car.type}</TableCell>
                      <TableCell>{car.matricule}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>{event.event}</TableCell>
                      <TableCell>
                        {event.client && <span>Client: {event.client}</span>}
                        {event.duration && <span> • Durée: {event.duration}</span>}
                        {event.details && <span> • {event.details}</span>}
                        {event.cost && <span> • Coût: {event.cost}</span>}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(car)}>
                          Détails
                        </Button>
                      </TableCell>
                    </TableRow>
                  )),
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Car Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              {selectedCar?.type} - {selectedCar?.matricule}
            </DialogTitle>
            <DialogDescription>Informations détaillées sur le véhicule</DialogDescription>
          </DialogHeader>

          {selectedCar && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Statut:</span>
                  {getStatusBadge(selectedCar.status)}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedCar.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Kilométrage</Label>
                  <div className="font-medium">{selectedCar.mileage} km</div>
                </div>
                <div className="space-y-2">
                  <Label>Niveau de carburant</Label>
                  <div className="flex items-center gap-2">
                    <Progress value={selectedCar.fuelLevel} className="h-2 flex-1" />
                    <span>{selectedCar.fuelLevel}%</span>
                  </div>
                </div>
              </div>

              {selectedCar.status === "rented" && (
                <div className="rounded-md border p-4 bg-blue-50">
                  <h4 className="font-medium flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Informations de location
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-muted-foreground">Client</Label>
                      <div className="font-medium">{selectedCar.client}</div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Période</Label>
                      <div className="font-medium">
                        {selectedCar.rentalStart} - {selectedCar.rentalEnd || "En cours"}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedCar.status === "maintenance" && (
                <div className="rounded-md border p-4 bg-yellow-50">
                  <h4 className="font-medium flex items-center gap-2">
                    <Tool className="h-4 w-4" />
                    Informations de maintenance
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-muted-foreground">Type</Label>
                      <div className="font-medium">{selectedCar.maintenanceType}</div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Période</Label>
                      <div className="font-medium">
                        {selectedCar.maintenanceStart} - {selectedCar.maintenanceEnd}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Documents</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <span className="text-sm">Carte Grise</span>
                      {getDocumentStatusBadge(selectedCar.documents.carteGrise.status)}
                    </div>
                    <p className="text-xs mt-2">Expire le: {selectedCar.documents.carteGrise.expiry}</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <span className="text-sm">Assurance</span>
                      {getDocumentStatusBadge(selectedCar.documents.assurance.status)}
                    </div>
                    <p className="text-xs mt-2">Expire le: {selectedCar.documents.assurance.expiry}</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <span className="text-sm">Visite Technique</span>
                      {getDocumentStatusBadge(selectedCar.documents.visiteTechnique.status)}
                    </div>
                    <p className="text-xs mt-2">Expire le: {selectedCar.documents.visiteTechnique.expiry}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Maintenance</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-md p-3">
                    <Label className="text-muted-foreground">Dernière maintenance</Label>
                    <div className="font-medium">{selectedCar.lastMaintenance}</div>
                  </div>
                  <div className="border rounded-md p-3">
                    <Label className="text-muted-foreground">Prochaine maintenance</Label>
                    <div className="font-medium">{selectedCar.nextMaintenance}</div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Historique récent</h4>
                <div className="space-y-2">
                  {selectedCar.history.map((event: any, idx: number) => (
                    <div key={idx} className="border-b pb-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{event.event}</span>
                        <span className="text-sm text-muted-foreground">{event.date}</span>
                      </div>
                      <p className="text-sm">
                        {event.client && <span>Client: {event.client}</span>}
                        {event.duration && <span> • Durée: {event.duration}</span>}
                        {event.details && <span> • {event.details}</span>}
                        {event.cost && <span> • Coût: {event.cost}</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {selectedCar.notes && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Notes</h4>
                    <p className="text-sm">{selectedCar.notes}</p>
                  </div>
                </>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
              Fermer
            </Button>
            <Button>Modifier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
