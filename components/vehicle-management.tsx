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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data based on the provided spreadsheets
const vehicles = [
  {
    id: 1,
    type: "CITROEN C-ELYSEE",
    matricule: "22976-T-1",
    status: "rented",
    client: "KASBAH FILM",
    dateStart: "05-02-2025",
    dateEnd: "12-02-2025",
    days: 8,
    priceDay: 250,
    priceTotal: 2000,
  },
  {
    id: 2,
    type: "FIAT 500",
    matricule: "36990-E-1",
    status: "rented",
    client: "KASBAH FILM",
    dateStart: "11-02-2025",
    dateEnd: "17-02-2025",
    days: 7,
    priceDay: 250,
    priceTotal: 1750,
  },
  {
    id: 3,
    type: "RENAULT EXPRESS",
    matricule: "916-A-73",
    status: "rented",
    client: "KASBAH FILM",
    dateStart: "13-02-2025",
    dateEnd: "",
    days: 23,
    priceDay: 300,
    priceTotal: 6900,
  },
  {
    id: 4,
    type: "FIAT 500",
    matricule: "36990-E-1",
    status: "rented",
    client: "KASBAH FILM",
    dateStart: "18-02-2025",
    dateEnd: "",
    days: 18,
    priceDay: 250,
    priceTotal: 4500,
  },
  {
    id: 5,
    type: "DACIA LOGAN",
    matricule: "19492-E-1",
    status: "rented",
    client: "KASBAH FILM",
    dateStart: "21-02-2025",
    dateEnd: "",
    days: 15,
    priceDay: 250,
    priceTotal: 3750,
  },
  {
    id: 6,
    type: "GRAND HYNDAI I10",
    matricule: "524033 WW",
    status: "rented",
    client: "KASBAH FILM",
    dateStart: "22-02-2025",
    dateEnd: "26-02-2025",
    days: 5,
    priceDay: 250,
    priceTotal: 1250,
  },
  {
    id: 7,
    type: "RENAULT EXPRESS",
    matricule: "36472-D-26",
    status: "rented",
    client: "KASBAH FILM",
    dateStart: "24-02-2025",
    dateEnd: "",
    days: 12,
    priceDay: 300,
    priceTotal: 3600,
  },
  {
    id: 8,
    type: "Duster automatique",
    matricule: "9431-T-1",
    status: "rented",
    client: "KASBAH FILM",
    dateStart: "02-03-2025",
    dateEnd: "",
    days: 6,
    priceDay: 350,
    priceTotal: 2100,
  },
  {
    id: 9,
    type: "GRAND HYNDAI I10",
    matricule: "524033 WW",
    status: "rented",
    client: "KASBAH FILM",
    dateStart: "03-03-2025",
    dateEnd: "",
    days: 5,
    priceDay: 250,
    priceTotal: 1250,
  },
  {
    id: 10,
    type: "CLIO 5",
    matricule: "26448-T-1",
    status: "rented",
    client: "KASBAH FILM",
    dateStart: "04-03-2025",
    dateEnd: "",
    days: 4,
    priceDay: 250,
    priceTotal: 1000,
  },
  {
    id: 11,
    type: "Duster automatique",
    matricule: "9430-T-1",
    status: "rented",
    client: "KASBAH FILM",
    dateStart: "06-03-2025",
    dateEnd: "",
    days: 2,
    priceDay: 350,
    priceTotal: 700,
  },
  {
    id: 12,
    type: "Duster automatique",
    matricule: "10632-T-1",
    status: "rented",
    client: "KASBAH FILM",
    dateStart: "07-03-2025",
    dateEnd: "",
    days: 1,
    priceDay: 350,
    priceTotal: 350,
  },
  {
    id: 13,
    type: "CLIO 5",
    matricule: "24860-T-1",
    status: "rented",
    client: "EVA-NORA MYNGHEER",
    dateStart: "07-03-2025",
    dateEnd: "05-04-2025",
    days: 30,
    priceDay: 250,
    priceTotal: 7500,
  },
  {
    id: 14,
    type: "Mercedesss Sprinter",
    matricule: "68775-B-26",
    status: "rented",
    client: "les fournisseures",
    dateStart: "24-02-2025",
    dateEnd: "",
    days: 12,
    priceDay: 700,
    priceTotal: 8400,
  },
  {
    id: 15,
    type: "Mercedesss Sprinter",
    matricule: "75627-B-26",
    status: "rented",
    client: "les fournisseures",
    dateStart: "25-02-2025",
    dateEnd: "",
    days: 11,
    priceDay: 700,
    priceTotal: 7700,
  },
]

export function VehicleManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.client.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (vehicle: any) => {
    setSelectedVehicle(vehicle)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (vehicle: any) => {
    setSelectedVehicle(vehicle)
    setIsDeleteDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Disponible</Badge>
      case "rented":
        return <Badge className="bg-blue-500">Loué</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-500">Maintenance</Badge>
      default:
        return <Badge className="bg-gray-500">Inconnu</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestion des Véhicules</h2>
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
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un véhicule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau véhicule</DialogTitle>
                <DialogDescription>Entrez les détails du nouveau véhicule ci-dessous.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type de véhicule</Label>
                    <Input id="type" placeholder="ex: CITROEN C-ELYSEE" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="matricule">Matricule</Label>
                    <Input id="matricule" placeholder="ex: 22976-T-1" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select defaultValue="available">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Disponible</SelectItem>
                        <SelectItem value="rented">Loué</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priceDay">Prix par jour (MAD)</Label>
                    <Input id="priceDay" type="number" placeholder="ex: 250" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input id="notes" placeholder="Notes supplémentaires" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Enregistrer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Liste</TabsTrigger>
          <TabsTrigger value="availability">Disponibilité</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Matricule</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date début</TableHead>
                  <TableHead>Date fin</TableHead>
                  <TableHead>Jours</TableHead>
                  <TableHead>Prix/Jour</TableHead>
                  <TableHead>Prix Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>{vehicle.id}</TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>{vehicle.matricule}</TableCell>
                    <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                    <TableCell>{vehicle.client}</TableCell>
                    <TableCell>{vehicle.dateStart}</TableCell>
                    <TableCell>{vehicle.dateEnd || "-"}</TableCell>
                    <TableCell>{vehicle.days}</TableCell>
                    <TableCell>{vehicle.priceDay} MAD</TableCell>
                    <TableCell>{vehicle.priceTotal} MAD</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(vehicle)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(vehicle)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="availability" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-medium">Calendrier de disponibilité</h3>
              <div className="flex items-center justify-center h-64 bg-gray-100 rounded-md">
                <Calendar className="h-16 w-16 text-gray-400" />
                <span className="ml-2 text-gray-500">Calendrier de disponibilité</span>
              </div>
            </div>
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-medium">Ajouter une période de disponibilité</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Véhicule</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un véhicule" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                          {vehicle.type} - {vehicle.matricule}
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
                <Button className="w-full">Ajouter période</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-medium">Maintenance planifiée</h3>
              <div className="space-y-2">
                {vehicles.slice(0, 3).map((vehicle) => (
                  <div key={vehicle.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{vehicle.type}</p>
                      <p className="text-sm text-gray-500">{vehicle.matricule}</p>
                    </div>
                    <Badge variant="outline">15-06-2025</Badge>
                  </div>
                ))}
              </div>
            </div>
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-medium">Planifier une maintenance</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="maintenanceVehicle">Véhicule</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un véhicule" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                          {vehicle.type} - {vehicle.matricule}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenanceDate">Date de maintenance</Label>
                  <Input id="maintenanceDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenanceType">Type de maintenance</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oil">Vidange</SelectItem>
                      <SelectItem value="tires">Pneus</SelectItem>
                      <SelectItem value="brakes">Freins</SelectItem>
                      <SelectItem value="general">Révision générale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Planifier</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier le véhicule</DialogTitle>
            <DialogDescription>Modifiez les détails du véhicule ci-dessous.</DialogDescription>
          </DialogHeader>
          {selectedVehicle && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Type de véhicule</Label>
                  <Input id="edit-type" defaultValue={selectedVehicle.type} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-matricule">Matricule</Label>
                  <Input id="edit-matricule" defaultValue={selectedVehicle.matricule} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Statut</Label>
                  <Select defaultValue={selectedVehicle.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Disponible</SelectItem>
                      <SelectItem value="rented">Loué</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-priceDay">Prix par jour (MAD)</Label>
                  <Input id="edit-priceDay" type="number" defaultValue={selectedVehicle.priceDay} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Input id="edit-notes" placeholder="Notes supplémentaires" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce véhicule ? Cette action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          {selectedVehicle && (
            <div className="py-4">
              <p>
                <strong>Type:</strong> {selectedVehicle.type}
              </p>
              <p>
                <strong>Matricule:</strong> {selectedVehicle.matricule}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
