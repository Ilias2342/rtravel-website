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
const drivers = [
  { id: 1, name: "KNIZI ZAKARIA", cin: "A729900", address: "RABAT", phone: "0661625891", status: "available" },
  { id: 2, name: "AMARA CHAKIR", cin: "AA17226 (B)", address: "RABAT", phone: "0661263006", status: "available" },
  { id: 3, name: "ROIBI ALI", cin: "JT34331", address: "SALE", phone: "0617163911", status: "on_trip" },
  { id: 4, name: "CHOUKRI FOUZI", cin: "AB18337", address: "SALE", phone: "0654324180", status: "available" },
  { id: 5, name: "BELASFAR ELMEHDI", cin: "GK148431 (B)", address: "RABAT", phone: "0648185811", status: "available" },
  { id: 6, name: "CHHALI ZAKARIA", cin: "A435094", address: "RABAT", phone: "0670779381", status: "on_trip" },
  { id: 7, name: "HARMATI MOHAMMED", cin: "A631012", address: "RABAT", phone: "0668539747", status: "available" },
  { id: 8, name: "BOUGAOUR YASSINE", cin: "GA236396 (B)", address: "SALE", phone: "0710366236", status: "on_trip" },
  { id: 9, name: "BRIJI DRISS", cin: "A429195 (B)", address: "KENITRA", phone: "0695565518", status: "available" },
  { id: 10, name: "ELBAHI BRAHIM", cin: "A356498 (B)", address: "RABAT", phone: "0668403694", status: "available" },
  { id: 11, name: "MAHFOUDI FAYCEL", cin: "AB332415", address: "SALE", phone: "0668436115", status: "on_trip" },
  { id: 12, name: "AIT ABALLA MOHAMMED", cin: "AE202002", address: "SALE", phone: "0622410097", status: "available" },
  { id: 13, name: "KARIM IMZILEN", cin: "AD97527 (B)", address: "TEMARA", phone: "0767606534", status: "on_trip" },
  { id: 14, name: "SAAD BENSALEM", cin: "AA21311 (B)", address: "RABAT", phone: "0661438598", status: "available" },
  { id: 15, name: "HAMZA ESTOURI", cin: "AE74247 (B)", address: "SALE", phone: "0649185371", status: "available" },
]

// Sample data for IAV prestations
const iavPrestations = [
  {
    id: 1,
    driver: "Yassine BERHICHE",
    cin: "AA51675",
    matricule: "01/352543",
    confirmation: "effectué",
    status: "OFF",
  },
  { id: 2, driver: "BRAHIM KHEBBAZ", cin: "A696639", matricule: "49/041325", confirmation: "effectué", status: "OFF" },
  {
    id: 3,
    driver: "Said Oumoma",
    cin: "AD155210",
    matricule: "49/043365",
    confirmation: "effectué",
    status: "OFF",
    replacement: "JAMAL SABI FAHIMI",
  },
  {
    id: 4,
    driver: "Mastapha SBAI FAHIM",
    cin: "AA14569",
    matricule: "01/262925",
    confirmation: "effectué",
    status: "OFF",
  },
  { id: 5, driver: "AHMED IKLANE", cin: "X250902", matricule: "47/051788", confirmation: "effectué", status: "OFF" },
]

export function DriverManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.cin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phone.includes(searchTerm),
  )

  const handleEdit = (driver: any) => {
    setSelectedDriver(driver)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (driver: any) => {
    setSelectedDriver(driver)
    setIsDeleteDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Disponible</Badge>
      case "on_trip":
        return <Badge className="bg-blue-500">En service</Badge>
      case "off_duty":
        return <Badge className="bg-yellow-500">Repos</Badge>
      case "vacation":
        return <Badge className="bg-purple-500">Congé</Badge>
      default:
        return <Badge className="bg-gray-500">Inconnu</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestion des Chauffeurs</h2>
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
                Ajouter un chauffeur
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau chauffeur</DialogTitle>
                <DialogDescription>Entrez les détails du nouveau chauffeur ci-dessous.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom et prénom</Label>
                    <Input id="name" placeholder="ex: KNIZI ZAKARIA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cin">CIN</Label>
                    <Input id="cin" placeholder="ex: A729900" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input id="address" placeholder="ex: RABAT" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Numéro de téléphone</Label>
                    <Input id="phone" placeholder="ex: 0661625891" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select defaultValue="available">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Disponible</SelectItem>
                      <SelectItem value="on_trip">En service</SelectItem>
                      <SelectItem value="off_duty">Repos</SelectItem>
                      <SelectItem value="vacation">Congé</SelectItem>
                    </SelectContent>
                  </Select>
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
          <TabsTrigger value="prestations">Prestations IAV</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nom et prénom</TableHead>
                  <TableHead>CIN</TableHead>
                  <TableHead>Adresse</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell>{driver.id}</TableCell>
                    <TableCell>{driver.name}</TableCell>
                    <TableCell>{driver.cin}</TableCell>
                    <TableCell>{driver.address}</TableCell>
                    <TableCell>{driver.phone}</TableCell>
                    <TableCell>{getStatusBadge(driver.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(driver)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(driver)}>
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
                  <Label htmlFor="driver">Chauffeur</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un chauffeur" />
                    </SelectTrigger>
                    <SelectContent>
                      {drivers.map((driver) => (
                        <SelectItem key={driver.id} value={driver.id.toString()}>
                          {driver.name}
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
                  <Label htmlFor="availabilityType">Type de disponibilité</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Disponible</SelectItem>
                      <SelectItem value="on_trip">En service</SelectItem>
                      <SelectItem value="off_duty">Repos</SelectItem>
                      <SelectItem value="vacation">Congé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Ajouter période</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="prestations" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom chauffeur</TableHead>
                  <TableHead>CIN</TableHead>
                  <TableHead>Matricule</TableHead>
                  <TableHead>Confirmation</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Remplacer par</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {iavPrestations.map((prestation) => (
                  <TableRow key={prestation.id}>
                    <TableCell>{prestation.driver}</TableCell>
                    <TableCell>{prestation.cin}</TableCell>
                    <TableCell>{prestation.matricule}</TableCell>
                    <TableCell>{prestation.confirmation}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{prestation.status}</Badge>
                    </TableCell>
                    <TableCell>{prestation.replacement || "-"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier le chauffeur</DialogTitle>
            <DialogDescription>Modifiez les détails du chauffeur ci-dessous.</DialogDescription>
          </DialogHeader>
          {selectedDriver && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nom et prénom</Label>
                  <Input id="edit-name" defaultValue={selectedDriver.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-cin">CIN</Label>
                  <Input id="edit-cin" defaultValue={selectedDriver.cin} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-address">Adresse</Label>
                  <Input id="edit-address" defaultValue={selectedDriver.address} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Numéro de téléphone</Label>
                  <Input id="edit-phone" defaultValue={selectedDriver.phone} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Statut</Label>
                <Select defaultValue={selectedDriver.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Disponible</SelectItem>
                    <SelectItem value="on_trip">En service</SelectItem>
                    <SelectItem value="off_duty">Repos</SelectItem>
                    <SelectItem value="vacation">Congé</SelectItem>
                  </SelectContent>
                </Select>
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
              Êtes-vous sûr de vouloir supprimer ce chauffeur ? Cette action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          {selectedDriver && (
            <div className="py-4">
              <p>
                <strong>Nom:</strong> {selectedDriver.name}
              </p>
              <p>
                <strong>CIN:</strong> {selectedDriver.cin}
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
