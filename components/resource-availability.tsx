"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data for vehicles
const vehicles = [
  {
    id: 1,
    type: "CITROEN C-ELYSEE",
    matricule: "22976-T-1",
    status: "available",
    lastMaintenance: "2025-01-15",
    nextMaintenance: "2025-07-15",
  },
  {
    id: 2,
    type: "FIAT 500",
    matricule: "36990-E-1",
    status: "booked",
    lastMaintenance: "2025-02-10",
    nextMaintenance: "2025-08-10",
    bookedPeriods: [
      { start: "2025-05-11", end: "2025-05-17", client: "KASBAH FILM" },
      { start: "2025-05-18", end: "2025-06-05", client: "EVA-NORA MYNGHEER" },
    ],
  },
  {
    id: 3,
    type: "RENAULT EXPRESS",
    matricule: "916-A-73",
    status: "maintenance",
    lastMaintenance: "2025-04-20",
    nextMaintenance: "2025-10-20",
    maintenanceNote: "Changement des plaquettes de frein",
  },
  {
    id: 4,
    type: "DACIA LOGAN",
    matricule: "19492-E-1",
    status: "available",
    lastMaintenance: "2025-03-05",
    nextMaintenance: "2025-09-05",
  },
  {
    id: 5,
    type: "GRAND HYNDAI I10",
    matricule: "524033 WW",
    status: "booked",
    lastMaintenance: "2025-02-25",
    nextMaintenance: "2025-08-25",
    bookedPeriods: [{ start: "2025-05-22", end: "2025-05-26", client: "KASBAH FILM" }],
  },
]

// Sample data for drivers
const drivers = [
  {
    id: 1,
    name: "KNIZI ZAKARIA",
    cin: "A729900",
    status: "available",
    certifications: [
      { type: "Permis B", expiration: "2027-05-10" },
      { type: "Formation Sécurité", expiration: "2025-12-15" },
    ],
  },
  {
    id: 2,
    name: "AMARA CHAKIR",
    cin: "AA17226 (B)",
    status: "on_duty",
    certifications: [{ type: "Permis B", expiration: "2026-08-22" }],
    assignments: [{ start: "2025-05-15", end: "2025-05-20", client: "SANEKIL" }],
  },
  {
    id: 3,
    name: "ROIBI ALI",
    cin: "JT34331",
    status: "off_duty",
    certifications: [
      { type: "Permis B", expiration: "2028-01-30" },
      { type: "Permis C", expiration: "2026-11-05" },
    ],
    offDutyPeriods: [{ start: "2025-05-10", end: "2025-05-17", reason: "Congé annuel" }],
  },
  {
    id: 4,
    name: "CHOUKRI FOUZI",
    cin: "AB18337",
    status: "available",
    certifications: [{ type: "Permis B", expiration: "2027-09-18" }],
  },
  {
    id: 5,
    name: "BELASFAR ELMEHDI",
    cin: "GK148431 (B)",
    status: "on_duty",
    certifications: [{ type: "Permis B", expiration: "2026-04-25" }],
    assignments: [{ start: "2025-05-12", end: "2025-05-19", client: "KASBAH FILM" }],
  },
]

// Sample conflicts
const conflicts = [
  {
    id: 1,
    resourceType: "vehicle",
    resourceName: "FIAT 500 (36990-E-1)",
    conflictType: "double_booking",
    period1: { start: "2025-05-18", end: "2025-05-20", client: "KASBAH FILM" },
    period2: { start: "2025-05-18", end: "2025-06-05", client: "EVA-NORA MYNGHEER" },
    severity: "high",
  },
  {
    id: 2,
    resourceType: "driver",
    resourceName: "ROIBI ALI",
    conflictType: "availability",
    period1: { start: "2025-05-10", end: "2025-05-17", reason: "Congé annuel" },
    period2: { start: "2025-05-15", end: "2025-05-18", client: "SANEKIL" },
    severity: "medium",
  },
  {
    id: 3,
    resourceType: "vehicle",
    resourceName: "RENAULT EXPRESS (916-A-73)",
    conflictType: "maintenance",
    period1: { start: "2025-05-20", end: "2025-05-22", reason: "Maintenance programmée" },
    period2: { start: "2025-05-21", end: "2025-05-25", client: "KASBAH FILM" },
    severity: "high",
  },
]

export function ResourceAvailability() {
  const [activeTab, setActiveTab] = useState("calendar")
  const [resourceType, setResourceType] = useState("vehicles")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isAddAvailabilityOpen, setIsAddAvailabilityOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState<any>(null)
  const [isEditAvailabilityOpen, setIsEditAvailabilityOpen] = useState(false)

  const getStatusBadge = (status: string, type: string) => {
    if (type === "vehicles") {
      switch (status) {
        case "available":
          return <Badge className="bg-green-500">Disponible</Badge>
        case "booked":
          return <Badge className="bg-blue-500">Réservé</Badge>
        case "maintenance":
          return <Badge className="bg-yellow-500">Maintenance</Badge>
        default:
          return <Badge className="bg-gray-500">Inconnu</Badge>
      }
    } else {
      switch (status) {
        case "available":
          return <Badge className="bg-green-500">Disponible</Badge>
        case "on_duty":
          return <Badge className="bg-blue-500">En service</Badge>
        case "off_duty":
          return <Badge className="bg-yellow-500">Repos</Badge>
        default:
          return <Badge className="bg-gray-500">Inconnu</Badge>
      }
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-500">Élevé</Badge>
      case "medium":
        return <Badge className="bg-orange-500">Moyen</Badge>
      case "low":
        return <Badge className="bg-yellow-500">Faible</Badge>
      default:
        return <Badge className="bg-gray-500">Inconnu</Badge>
    }
  }

  const handleAddAvailability = () => {
    setIsAddAvailabilityOpen(false)
    // Logic to add availability would go here
  }

  const handleEditAvailability = (resource: any) => {
    setSelectedResource(resource)
    setIsEditAvailabilityOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestion des Disponibilités</h2>
        <div className="flex items-center gap-2">
          <Select value={resourceType} onValueChange={setResourceType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type de ressource" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vehicles">Véhicules</SelectItem>
              <SelectItem value="drivers">Chauffeurs</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isAddAvailabilityOpen} onOpenChange={setIsAddAvailabilityOpen}>
            <DialogTrigger asChild>
              <Button>Ajouter une disponibilité</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Ajouter une période de disponibilité</DialogTitle>
                <DialogDescription>
                  Définissez une nouvelle période de disponibilité pour un{" "}
                  {resourceType === "vehicles" ? "véhicule" : "chauffeur"}.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="resource">{resourceType === "vehicles" ? "Véhicule" : "Chauffeur"}</Label>
                  <Select>
                    <SelectTrigger id="resource">
                      <SelectValue
                        placeholder={`Sélectionner un ${resourceType === "vehicles" ? "véhicule" : "chauffeur"}`}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {resourceType === "vehicles"
                        ? vehicles.map((vehicle) => (
                            <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                              {vehicle.type} - {vehicle.matricule}
                            </SelectItem>
                          ))
                        : drivers.map((driver) => (
                            <SelectItem key={driver.id} value={driver.id.toString()}>
                              {driver.name} - {driver.cin}
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Date de début</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Date de fin</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      {resourceType === "vehicles" ? (
                        <>
                          <SelectItem value="available">Disponible</SelectItem>
                          <SelectItem value="booked">Réservé</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="available">Disponible</SelectItem>
                          <SelectItem value="on_duty">En service</SelectItem>
                          <SelectItem value="off_duty">Repos</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input id="notes" placeholder="Notes supplémentaires" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddAvailabilityOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddAvailability}>Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="calendar">Calendrier</TabsTrigger>
          <TabsTrigger value="management">Gestion</TabsTrigger>
          <TabsTrigger value="conflicts">Conflits</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <div className="md:col-span-5 border rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-medium">Calendrier de disponibilité</h3>
              <div className="flex items-center justify-center h-64 bg-gray-100 rounded-md">
                <Calendar className="h-16 w-16 text-gray-400" />
                <span className="ml-2 text-gray-500">Calendrier de disponibilité</span>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Disponible</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span>Réservé</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span>Maintenance / Repos</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span>Conflit</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 border rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-medium">Détails</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Date sélectionnée</Label>
                  <div className="font-medium">15 Mai 2025</div>
                </div>
                <div className="space-y-2">
                  <Label>Ressources disponibles</Label>
                  <div className="space-y-2">
                    {resourceType === "vehicles" ? (
                      <>
                        <div className="flex items-center justify-between">
                          <span>CITROEN C-ELYSEE</span>
                          <Badge className="bg-green-500">Disponible</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>DACIA LOGAN</span>
                          <Badge className="bg-green-500">Disponible</Badge>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <span>KNIZI ZAKARIA</span>
                          <Badge className="bg-green-500">Disponible</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>CHOUKRI FOUZI</span>
                          <Badge className="bg-green-500">Disponible</Badge>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Ressources non disponibles</Label>
                  <div className="space-y-2">
                    {resourceType === "vehicles" ? (
                      <>
                        <div className="flex items-center justify-between">
                          <span>FIAT 500</span>
                          <Badge className="bg-blue-500">Réservé</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>RENAULT EXPRESS</span>
                          <Badge className="bg-yellow-500">Maintenance</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>GRAND HYNDAI I10</span>
                          <Badge className="bg-blue-500">Réservé</Badge>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <span>AMARA CHAKIR</span>
                          <Badge className="bg-blue-500">En service</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>ROIBI ALI</span>
                          <Badge className="bg-yellow-500">Repos</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>BELASFAR ELMEHDI</span>
                          <Badge className="bg-blue-500">En service</Badge>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="management" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>{resourceType === "vehicles" ? "Véhicule" : "Nom"}</TableHead>
                  <TableHead>{resourceType === "vehicles" ? "Matricule" : "CIN"}</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>{resourceType === "vehicles" ? "Dernière maintenance" : "Certifications"}</TableHead>
                  <TableHead>{resourceType === "vehicles" ? "Prochaine maintenance" : "Expiration"}</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resourceType === "vehicles"
                  ? vehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell>{vehicle.id}</TableCell>
                        <TableCell>{vehicle.type}</TableCell>
                        <TableCell>{vehicle.matricule}</TableCell>
                        <TableCell>{getStatusBadge(vehicle.status, "vehicles")}</TableCell>
                        <TableCell>{vehicle.lastMaintenance}</TableCell>
                        <TableCell>{vehicle.nextMaintenance}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => handleEditAvailability(vehicle)}>
                            Modifier
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : drivers.map((driver) => (
                      <TableRow key={driver.id}>
                        <TableCell>{driver.id}</TableCell>
                        <TableCell>{driver.name}</TableCell>
                        <TableCell>{driver.cin}</TableCell>
                        <TableCell>{getStatusBadge(driver.status, "drivers")}</TableCell>
                        <TableCell>
                          {driver.certifications.map((cert, index) => (
                            <div key={index}>{cert.type}</div>
                          ))}
                        </TableCell>
                        <TableCell>
                          {driver.certifications.map((cert, index) => (
                            <div key={index}>{cert.expiration}</div>
                          ))}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => handleEditAvailability(driver)}>
                            Modifier
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="conflicts" className="space-y-4">
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Attention</AlertTitle>
            <AlertDescription>
              Il y a {conflicts.length} conflits de disponibilité qui nécessitent votre attention.
            </AlertDescription>
          </Alert>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Ressource</TableHead>
                  <TableHead>Type de conflit</TableHead>
                  <TableHead>Période 1</TableHead>
                  <TableHead>Période 2</TableHead>
                  <TableHead>Sévérité</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conflicts.map((conflict) => (
                  <TableRow key={conflict.id}>
                    <TableCell>{conflict.id}</TableCell>
                    <TableCell>{conflict.resourceName}</TableCell>
                    <TableCell>
                      {conflict.conflictType === "double_booking"
                        ? "Double réservation"
                        : conflict.conflictType === "availability"
                          ? "Disponibilité"
                          : "Maintenance"}
                    </TableCell>
                    <TableCell>
                      {conflict.period1.start} - {conflict.period1.end}
                      <br />
                      <span className="text-sm text-gray-500">
                        {conflict.period1.client || conflict.period1.reason}
                      </span>
                    </TableCell>
                    <TableCell>
                      {conflict.period2.start} - {conflict.period2.end}
                      <br />
                      <span className="text-sm text-gray-500">
                        {conflict.period2.client || conflict.period2.reason}
                      </span>
                    </TableCell>
                    <TableCell>{getSeverityBadge(conflict.severity)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Résoudre
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance des véhicules</CardTitle>
                <CardDescription>Planifiez et suivez la maintenance de votre flotte</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">
                          {vehicle.type} - {vehicle.matricule}
                        </p>
                        <p className="text-sm text-gray-500">
                          Dernière: {vehicle.lastMaintenance} • Prochaine: {vehicle.nextMaintenance}
                        </p>
                      </div>
                      {new Date(vehicle.nextMaintenance) < new Date("2025-06-01") ? (
                        <Badge className="bg-red-500">Urgent</Badge>
                      ) : new Date(vehicle.nextMaintenance) < new Date("2025-07-01") ? (
                        <Badge className="bg-yellow-500">Bientôt</Badge>
                      ) : (
                        <Badge className="bg-green-500">OK</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Planifier une maintenance</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Certifications des chauffeurs</CardTitle>
                <CardDescription>Suivez les certifications et leur expiration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {drivers.map((driver) =>
                    driver.certifications.map((cert, index) => (
                      <div key={`${driver.id}-${index}`} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">{driver.name}</p>
                          <p className="text-sm text-gray-500">
                            {cert.type} • Expiration: {cert.expiration}
                          </p>
                        </div>
                        {new Date(cert.expiration) < new Date("2025-07-01") ? (
                          <Badge className="bg-red-500">Urgent</Badge>
                        ) : new Date(cert.expiration) < new Date("2026-01-01") ? (
                          <Badge className="bg-yellow-500">Bientôt</Badge>
                        ) : (
                          <Badge className="bg-green-500">OK</Badge>
                        )}
                      </div>
                    )),
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Ajouter une certification</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Availability Dialog */}
      <Dialog open={isEditAvailabilityOpen} onOpenChange={setIsEditAvailabilityOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier la disponibilité</DialogTitle>
            <DialogDescription>
              Modifiez les détails de disponibilité pour{" "}
              {selectedResource &&
                (resourceType === "vehicles"
                  ? `${selectedResource.type} (${selectedResource.matricule})`
                  : selectedResource.name)}
              .
            </DialogDescription>
          </DialogHeader>
          {selectedResource && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-status">Statut</Label>
                <Select defaultValue={selectedResource.status}>
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    {resourceType === "vehicles" ? (
                      <>
                        <SelectItem value="available">Disponible</SelectItem>
                        <SelectItem value="booked">Réservé</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="available">Disponible</SelectItem>
                        <SelectItem value="on_duty">En service</SelectItem>
                        <SelectItem value="off_duty">Repos</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              {resourceType === "vehicles" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-lastMaintenance">Dernière maintenance</Label>
                    <Input id="edit-lastMaintenance" type="date" defaultValue={selectedResource.lastMaintenance} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-nextMaintenance">Prochaine maintenance</Label>
                    <Input id="edit-nextMaintenance" type="date" defaultValue={selectedResource.nextMaintenance} />
                  </div>
                </div>
              )}
              {selectedResource.status === "booked" && resourceType === "vehicles" && (
                <div className="space-y-2">
                  <Label>Périodes de réservation</Label>
                  {selectedResource.bookedPeriods?.map((period: any, index: number) => (
                    <div key={index} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p>
                          {period.start} - {period.end}
                        </p>
                        <p className="text-sm text-gray-500">{period.client}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              {selectedResource.status === "on_duty" && resourceType === "drivers" && (
                <div className="space-y-2">
                  <Label>Assignations</Label>
                  {selectedResource.assignments?.map((assignment: any, index: number) => (
                    <div key={index} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p>
                          {assignment.start} - {assignment.end}
                        </p>
                        <p className="text-sm text-gray-500">{assignment.client}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              {resourceType === "drivers" && (
                <div className="space-y-2">
                  <Label>Certifications</Label>
                  {selectedResource.certifications?.map((cert: any, index: number) => (
                    <div key={index} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p>{cert.type}</p>
                        <p className="text-sm text-gray-500">Expiration: {cert.expiration}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Input
                  id="edit-notes"
                  placeholder="Notes supplémentaires"
                  defaultValue={
                    selectedResource.maintenanceNote ||
                    (selectedResource.offDutyPeriods && selectedResource.offDutyPeriods[0]?.reason) ||
                    ""
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditAvailabilityOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => setIsEditAvailabilityOpen(false)}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
