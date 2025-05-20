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
const transfers = [
  {
    id: 1,
    date: "10/10/2024",
    time: "13h10min",
    from: "l'aéroport de Rabat",
    to: "la gare de Rabat Agdal",
    client: "SANEKIL",
    status: "confirmed",
    price: 300,
  },
  {
    id: 2,
    date: "10/10/2024",
    time: "16h10min",
    from: "l'aéroport de Rabat",
    to: "la gare de Rabat Agdal",
    client: "SANEKIL",
    status: "confirmed",
    price: 300,
  },
  {
    id: 3,
    date: "19/10/2024",
    time: "11h00min",
    from: "Hotel de Rabat",
    to: "la gare de Rabat Agdal",
    client: "SANEKIL",
    status: "confirmed",
    price: 250,
  },
  {
    id: 4,
    date: "22/10/2024",
    time: "09h20min",
    from: "Hotel de Rabat",
    to: "la gare de Rabat Agdal",
    client: "SANEKIL",
    status: "confirmed",
    price: 250,
  },
  {
    id: 5,
    date: "28/10/2024",
    time: "",
    from: "l'aéroport de Rabat",
    to: "la gare de Rabat Agdal",
    client: "SANEKIL",
    status: "pending",
    price: 300,
  },
  {
    id: 6,
    date: "29/10/2024",
    time: "13h50min",
    from: "Hôtel Malak",
    to: "Gare ONCF Rabat Agdal",
    client: "SANEKIL",
    status: "confirmed",
    price: 250,
  },
  {
    id: 7,
    date: "03/11/2024",
    time: "11h00min",
    from: "la gare de Rabat Agdal",
    to: "Riad Zyo",
    client: "SANEKIL",
    status: "pending",
    price: 250,
  },
  {
    id: 8,
    date: "13/11/2024",
    time: "12h38",
    from: "Gare ONCF Rabat Agdal",
    to: "Riad Zyo",
    client: "SANEKIL",
    status: "pending",
    price: 250,
    notes: "heure d'arrivée prévu de train",
  },
  {
    id: 9,
    date: "15/11/2024",
    time: "",
    from: "Riad Zyo",
    to: "Gare ONCF Rabat Agdal",
    client: "SANEKIL",
    status: "pending",
    price: 250,
    notes: "départ de train prévu à 10h25",
  },
  {
    id: 10,
    date: "29/12/2024",
    time: "",
    from: "Bouznika",
    to: "Golf Rabat",
    client: "SANEKIL",
    status: "pending",
    price: 400,
    notes: "Aller et Retour",
  },
  {
    id: 11,
    date: "30/12/2024",
    time: "",
    from: "Bouznika",
    to: "Aeroport Rabat",
    client: "SANEKIL",
    status: "pending",
    price: 400,
    notes: "départ de Bouznika",
  },
  {
    id: 12,
    date: "22/01/2025",
    time: "22h35min",
    from: "l'aéroport de Rabat",
    to: "Htl FOUR SEASONS HOTEL RABAT AT KSAR BAHR",
    client: "SANEKIL",
    status: "pending",
    price: 350,
  },
]

export function TransferManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedTransfer, setSelectedTransfer] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const filteredTransfers = transfers.filter(
    (transfer) =>
      transfer.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.date.includes(searchTerm),
  )

  const handleEdit = (transfer: any) => {
    setSelectedTransfer(transfer)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (transfer: any) => {
    setSelectedTransfer(transfer)
    setIsDeleteDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmé</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">En attente</Badge>
      case "completed":
        return <Badge className="bg-blue-500">Terminé</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Annulé</Badge>
      default:
        return <Badge className="bg-gray-500">Inconnu</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestion des Transferts</h2>
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
                Ajouter un transfert
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau transfert</DialogTitle>
                <DialogDescription>Entrez les détails du nouveau transfert ci-dessous.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Heure</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from">Lieu de départ</Label>
                    <Input id="from" placeholder="ex: Aéroport de Rabat" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to">Destination</Label>
                    <Input id="to" placeholder="ex: Gare de Rabat Agdal" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Input id="client" placeholder="ex: SANEKIL" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix (MAD)</Label>
                    <Input id="price" type="number" placeholder="ex: 300" />
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
          <TabsTrigger value="routes">Itinéraires</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Heure</TableHead>
                  <TableHead>Départ</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransfers.map((transfer) => (
                  <TableRow key={transfer.id}>
                    <TableCell>{transfer.id}</TableCell>
                    <TableCell>{transfer.date}</TableCell>
                    <TableCell>{transfer.time || "-"}</TableCell>
                    <TableCell>{transfer.from}</TableCell>
                    <TableCell>{transfer.to}</TableCell>
                    <TableCell>{transfer.client}</TableCell>
                    <TableCell>{getStatusBadge(transfer.status)}</TableCell>
                    <TableCell>{transfer.price} MAD</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(transfer)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(transfer)}>
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
              <h3 className="text-lg font-medium">Calendrier des transferts</h3>
              <div className="flex items-center justify-center h-64 bg-gray-100 rounded-md">
                <Calendar className="h-16 w-16 text-gray-400" />
                <span className="ml-2 text-gray-500">Calendrier des transferts</span>
              </div>
            </div>
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-medium">Transferts à venir</h3>
              <div className="space-y-2">
                {transfers.slice(0, 5).map((transfer) => (
                  <div key={transfer.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">
                        {transfer.date} {transfer.time}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transfer.from} → {transfer.to}
                      </p>
                    </div>
                    {getStatusBadge(transfer.status)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="routes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-medium">Itinéraires populaires</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Aéroport de Rabat → Gare de Rabat Agdal</p>
                    <p className="text-sm text-gray-500">Distance: 12 km • Durée: 25 min</p>
                  </div>
                  <Badge className="bg-blue-500">300 MAD</Badge>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Gare de Rabat Agdal → Riad Zyo</p>
                    <p className="text-sm text-gray-500">Distance: 8 km • Durée: 15 min</p>
                  </div>
                  <Badge className="bg-blue-500">250 MAD</Badge>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Bouznika → Golf Rabat</p>
                    <p className="text-sm text-gray-500">Distance: 35 km • Durée: 45 min</p>
                  </div>
                  <Badge className="bg-blue-500">400 MAD</Badge>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-medium">Ajouter un itinéraire</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="route-from">Lieu de départ</Label>
                    <Input id="route-from" placeholder="ex: Aéroport de Rabat" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="route-to">Destination</Label>
                    <Input id="route-to" placeholder="ex: Gare de Rabat Agdal" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="route-distance">Distance (km)</Label>
                    <Input id="route-distance" type="number" placeholder="ex: 12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="route-duration">Durée (min)</Label>
                    <Input id="route-duration" type="number" placeholder="ex: 25" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="route-price">Prix standard (MAD)</Label>
                  <Input id="route-price" type="number" placeholder="ex: 300" />
                </div>
                <Button className="w-full">Ajouter itinéraire</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier le transfert</DialogTitle>
            <DialogDescription>Modifiez les détails du transfert ci-dessous.</DialogDescription>
          </DialogHeader>
          {selectedTransfer && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Date</Label>
                  <Input id="edit-date" defaultValue={selectedTransfer.date} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-time">Heure</Label>
                  <Input id="edit-time" defaultValue={selectedTransfer.time} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-from">Lieu de départ</Label>
                  <Input id="edit-from" defaultValue={selectedTransfer.from} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-to">Destination</Label>
                  <Input id="edit-to" defaultValue={selectedTransfer.to} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-client">Client</Label>
                  <Input id="edit-client" defaultValue={selectedTransfer.client} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Prix (MAD)</Label>
                  <Input id="edit-price" type="number" defaultValue={selectedTransfer.price} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Statut</Label>
                <Select defaultValue={selectedTransfer.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">Confirmé</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="completed">Terminé</SelectItem>
                    <SelectItem value="cancelled">Annulé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Input id="edit-notes" defaultValue={selectedTransfer.notes || ""} />
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
              Êtes-vous sûr de vouloir supprimer ce transfert ? Cette action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          {selectedTransfer && (
            <div className="py-4">
              <p>
                <strong>Date:</strong> {selectedTransfer.date} {selectedTransfer.time}
              </p>
              <p>
                <strong>Trajet:</strong> {selectedTransfer.from} → {selectedTransfer.to}
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
