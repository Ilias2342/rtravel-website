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
const bookings = [
  {
    id: 1,
    client: "KASBAH FILM",
    project: "CONVOY",
    vehicle: "CITROEN C-ELYSEE",
    matricule: "22976-T-1",
    dateStart: "05-02-2025",
    dateEnd: "12-02-2025",
    days: 8,
    priceDay: 250,
    priceTotal: 2000,
    status: "completed",
  },
  {
    id: 2,
    client: "KASBAH FILM",
    project: "CONVOY",
    vehicle: "FIAT 500",
    matricule: "36990-E-1",
    dateStart: "11-02-2025",
    dateEnd: "17-02-2025",
    days: 7,
    priceDay: 250,
    priceTotal: 1750,
    status: "completed",
  },
  {
    id: 3,
    client: "KASBAH FILM",
    project: "CONVOY",
    vehicle: "RENAULT EXPRESS",
    matricule: "916-A-73",
    dateStart: "13-02-2025",
    dateEnd: "",
    days: 23,
    priceDay: 300,
    priceTotal: 6900,
    status: "active",
  },
  {
    id: 4,
    client: "KASBAH FILM",
    project: "CONVOY",
    vehicle: "FIAT 500",
    matricule: "36990-E-1",
    dateStart: "18-02-2025",
    dateEnd: "",
    days: 18,
    priceDay: 250,
    priceTotal: 4500,
    status: "active",
  },
  {
    id: 5,
    client: "KASBAH FILM",
    project: "CONVOY",
    vehicle: "DACIA LOGAN",
    matricule: "19492-E-1",
    dateStart: "21-02-2025",
    dateEnd: "",
    days: 15,
    priceDay: 250,
    priceTotal: 3750,
    status: "active",
  },
  {
    id: 6,
    client: "KASBAH FILM",
    project: "CONVOY",
    vehicle: "GRAND HYNDAI I10",
    matricule: "524033 WW",
    dateStart: "22-02-2025",
    dateEnd: "26-02-2025",
    days: 5,
    priceDay: 250,
    priceTotal: 1250,
    status: "completed",
  },
  {
    id: 7,
    client: "EVA-NORA MYNGHEER",
    project: "",
    vehicle: "CLIO 5",
    matricule: "24860-T-1",
    dateStart: "07-03-2025",
    dateEnd: "05-04-2025",
    days: 30,
    priceDay: 250,
    priceTotal: 7500,
    status: "active",
  },
  {
    id: 8,
    client: "SANEKIL",
    project: "TRANSFERTS",
    vehicle: "",
    matricule: "",
    dateStart: "10-10-2024",
    dateEnd: "10-10-2024",
    days: 1,
    priceDay: 300,
    priceTotal: 300,
    status: "upcoming",
    notes: "Transfert aéroport",
  },
  {
    id: 9,
    client: "SANEKIL",
    project: "TRANSFERTS",
    vehicle: "",
    matricule: "",
    dateStart: "19-10-2024",
    dateEnd: "19-10-2024",
    days: 1,
    priceDay: 250,
    priceTotal: 250,
    status: "upcoming",
    notes: "Transfert hôtel",
  },
]

export function BookingManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.dateStart.includes(searchTerm),
  )

  const handleEdit = (booking: any) => {
    setSelectedBooking(booking)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (booking: any) => {
    setSelectedBooking(booking)
    setIsDeleteDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">En cours</Badge>
      case "completed":
        return <Badge className="bg-blue-500">Terminé</Badge>
      case "upcoming":
        return <Badge className="bg-yellow-500">À venir</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Annulé</Badge>
      default:
        return <Badge className="bg-gray-500">Inconnu</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestion des Réservations</h2>
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
                Ajouter une réservation
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Ajouter une nouvelle réservation</DialogTitle>
                <DialogDescription>Entrez les détails de la nouvelle réservation ci-dessous.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Input id="client" placeholder="ex: KASBAH FILM" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project">Projet</Label>
                    <Input id="project" placeholder="ex: CONVOY" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicle">Véhicule</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un véhicule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="citroen">CITROEN C-ELYSEE</SelectItem>
                        <SelectItem value="fiat">FIAT 500</SelectItem>
                        <SelectItem value="renault">RENAULT EXPRESS</SelectItem>
                        <SelectItem value="dacia">DACIA LOGAN</SelectItem>
                        <SelectItem value="hyundai">GRAND HYNDAI I10</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type de réservation</Label>
                    <Select defaultValue="rental">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rental">Location</SelectItem>
                        <SelectItem value="transfer">Transfert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priceDay">Prix par jour (MAD)</Label>
                    <Input id="priceDay" type="number" placeholder="ex: 250" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select defaultValue="upcoming">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">En cours</SelectItem>
                        <SelectItem value="completed">Terminé</SelectItem>
                        <SelectItem value="upcoming">À venir</SelectItem>
                        <SelectItem value="cancelled">Annulé</SelectItem>
                      </SelectContent>
                    </Select>
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
          <TabsTrigger value="calendar">Calendrier</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Projet</TableHead>
                  <TableHead>Véhicule</TableHead>
                  <TableHead>Date début</TableHead>
                  <TableHead>Date fin</TableHead>
                  <TableHead>Jours</TableHead>
                  <TableHead>Prix/Jour</TableHead>
                  <TableHead>Prix Total</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.client}</TableCell>
                    <TableCell>{booking.project || "-"}</TableCell>
                    <TableCell>{booking.vehicle || "-"}</TableCell>
                    <TableCell>{booking.dateStart}</TableCell>
                    <TableCell>{booking.dateEnd || "-"}</TableCell>
                    <TableCell>{booking.days}</TableCell>
                    <TableCell>{booking.priceDay} MAD</TableCell>
                    <TableCell>{booking.priceTotal} MAD</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(booking)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(booking)}>
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
        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-medium">Calendrier des réservations</h3>
              <div className="flex items-center justify-center h-64 bg-gray-100 rounded-md">
                <Calendar className="h-16 w-16 text-gray-400" />
                <span className="ml-2 text-gray-500">Calendrier des réservations</span>
              </div>
            </div>
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-medium">Réservations à venir</h3>
              <div className="space-y-2">
                {bookings
                  .filter((b) => b.status === "upcoming")
                  .map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{booking.dateStart}</p>
                        <p className="text-sm text-gray-500">
                          {booking.client} - {booking.notes || booking.vehicle}
                        </p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                  ))}
                {bookings
                  .filter((b) => b.status === "active")
                  .map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">
                          {booking.dateStart} - {booking.dateEnd || "En cours"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {booking.client} - {booking.vehicle}
                        </p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="clients" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-medium">Clients principaux</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">KASBAH FILM</p>
                    <p className="text-sm text-gray-500">7 réservations • 43 980,00 MAD</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Détails
                  </Button>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">EVA-NORA MYNGHEER</p>
                    <p className="text-sm text-gray-500">1 réservation • 7 500,00 MAD</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Détails
                  </Button>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">SANEKIL</p>
                    <p className="text-sm text-gray-500">15 transferts • 4 250,00 MAD</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Détails
                  </Button>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-medium">Ajouter un client</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client-name">Nom du client</Label>
                  <Input id="client-name" placeholder="ex: KASBAH FILM" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-contact">Contact</Label>
                  <Input id="client-contact" placeholder="ex: John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-email">Email</Label>
                  <Input id="client-email" type="email" placeholder="ex: contact@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-phone">Téléphone</Label>
                  <Input id="client-phone" placeholder="ex: 0661234567" />
                </div>
                <Button className="w-full">Ajouter client</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier la réservation</DialogTitle>
            <DialogDescription>Modifiez les détails de la réservation ci-dessous.</DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-client">Client</Label>
                  <Input id="edit-client" defaultValue={selectedBooking.client} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-project">Projet</Label>
                  <Input id="edit-project" defaultValue={selectedBooking.project} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-vehicle">Véhicule</Label>
                  <Input id="edit-vehicle" defaultValue={selectedBooking.vehicle} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-matricule">Matricule</Label>
                  <Input id="edit-matricule" defaultValue={selectedBooking.matricule} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-dateStart">Date de début</Label>
                  <Input id="edit-dateStart" defaultValue={selectedBooking.dateStart} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-dateEnd">Date de fin</Label>
                  <Input id="edit-dateEnd" defaultValue={selectedBooking.dateEnd} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-priceDay">Prix par jour (MAD)</Label>
                  <Input id="edit-priceDay" type="number" defaultValue={selectedBooking.priceDay} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Statut</Label>
                  <Select defaultValue={selectedBooking.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">En cours</SelectItem>
                      <SelectItem value="completed">Terminé</SelectItem>
                      <SelectItem value="upcoming">À venir</SelectItem>
                      <SelectItem value="cancelled">Annulé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Input id="edit-notes" defaultValue={selectedBooking.notes || ""} />
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
              Êtes-vous sûr de vouloir supprimer cette réservation ? Cette action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="py-4">
              <p>
                <strong>Client:</strong> {selectedBooking.client}
              </p>
              <p>
                <strong>Véhicule:</strong> {selectedBooking.vehicle || "Transfert"}
              </p>
              <p>
                <strong>Dates:</strong> {selectedBooking.dateStart} - {selectedBooking.dateEnd || "En cours"}
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
