"use client"

import { useState } from "react"
import { Folder, FolderPlus, Edit, Trash2, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Types for data organization
interface DataCategory {
  id: string
  name: string
  description?: string
  parentId?: string
  children?: DataCategory[]
  tags?: string[]
  createdAt: string
  updatedAt: string
}

// Sample data categories
const sampleCategories: DataCategory[] = [
  {
    id: "vehicles",
    name: "Véhicules",
    description: "Toutes les données relatives aux véhicules",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    children: [
      {
        id: "vehicles-sedan",
        name: "Berlines",
        parentId: "vehicles",
        tags: ["CITROEN", "FIAT", "DACIA"],
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      },
      {
        id: "vehicles-suv",
        name: "SUV",
        parentId: "vehicles",
        tags: ["DUSTER"],
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      },
      {
        id: "vehicles-van",
        name: "Utilitaires",
        parentId: "vehicles",
        tags: ["EXPRESS", "SPRINTER"],
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      },
    ],
  },
  {
    id: "drivers",
    name: "Chauffeurs",
    description: "Toutes les données relatives aux chauffeurs",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    children: [
      {
        id: "drivers-permanent",
        name: "Permanents",
        parentId: "drivers",
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      },
      {
        id: "drivers-temporary",
        name: "Temporaires",
        parentId: "drivers",
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      },
    ],
  },
  {
    id: "clients",
    name: "Clients",
    description: "Toutes les données relatives aux clients",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    children: [
      {
        id: "clients-corporate",
        name: "Entreprises",
        parentId: "clients",
        tags: ["KASBAH FILM"],
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      },
      {
        id: "clients-individual",
        name: "Particuliers",
        parentId: "clients",
        tags: ["EVA-NORA MYNGHEER"],
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      },
    ],
  },
  {
    id: "documents",
    name: "Documents",
    description: "Toutes les données relatives aux documents",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    children: [
      {
        id: "documents-contracts",
        name: "Contrats",
        parentId: "documents",
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      },
      {
        id: "documents-invoices",
        name: "Factures",
        parentId: "documents",
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      },
      {
        id: "documents-maintenance",
        name: "Maintenance",
        parentId: "documents",
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      },
    ],
  },
]

export function DataCategoryManager() {
  const [categories, setCategories] = useState<DataCategory[]>(sampleCategories)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["vehicles"])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<DataCategory | null>(null)
  const [newCategory, setNewCategory] = useState<Partial<DataCategory>>({
    name: "",
    description: "",
    parentId: "",
    tags: [],
  })

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleAddCategory = () => {
    const now = new Date().toISOString()
    const newCat: DataCategory = {
      id: `category-${Date.now()}`,
      name: newCategory.name || "Nouvelle catégorie",
      description: newCategory.description,
      parentId: newCategory.parentId,
      tags: newCategory.tags,
      createdAt: now,
      updatedAt: now,
    }

    if (newCategory.parentId) {
      // Add as child to parent category
      setCategories((prev) =>
        prev.map((cat) => {
          if (cat.id === newCategory.parentId) {
            return {
              ...cat,
              children: [...(cat.children || []), newCat],
            }
          } else if (cat.children) {
            // Check in children
            const updatedChildren = addToChildren(cat.children, newCategory.parentId!, newCat)
            if (updatedChildren !== cat.children) {
              return { ...cat, children: updatedChildren }
            }
          }
          return cat
        }),
      )
    } else {
      // Add as top-level category
      setCategories((prev) => [...prev, newCat])
    }

    setIsAddDialogOpen(false)
    setNewCategory({
      name: "",
      description: "",
      parentId: "",
      tags: [],
    })
  }

  const addToChildren = (children: DataCategory[], parentId: string, newCategory: DataCategory): DataCategory[] => {
    return children.map((child) => {
      if (child.id === parentId) {
        return {
          ...child,
          children: [...(child.children || []), newCategory],
        }
      } else if (child.children) {
        const updatedChildren = addToChildren(child.children, parentId, newCategory)
        if (updatedChildren !== child.children) {
          return { ...child, children: updatedChildren }
        }
      }
      return child
    })
  }

  const handleEditCategory = () => {
    if (!selectedCategory) return

    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === selectedCategory.id) {
          return {
            ...cat,
            name: selectedCategory.name,
            description: selectedCategory.description,
            tags: selectedCategory.tags,
            updatedAt: new Date().toISOString(),
          }
        } else if (cat.children) {
          // Check in children
          const updatedChildren = updateInChildren(cat.children, selectedCategory)
          if (updatedChildren !== cat.children) {
            return { ...cat, children: updatedChildren }
          }
        }
        return cat
      }),
    )

    setIsEditDialogOpen(false)
    setSelectedCategory(null)
  }

  const updateInChildren = (children: DataCategory[], updatedCategory: DataCategory): DataCategory[] => {
    return children.map((child) => {
      if (child.id === updatedCategory.id) {
        return {
          ...child,
          name: updatedCategory.name,
          description: updatedCategory.description,
          tags: updatedCategory.tags,
          updatedAt: new Date().toISOString(),
        }
      } else if (child.children) {
        const updatedChildren = updateInChildren(child.children, updatedCategory)
        if (updatedChildren !== child.children) {
          return { ...child, children: updatedChildren }
        }
      }
      return child
    })
  }

  const handleDeleteCategory = (categoryId: string, parentId?: string) => {
    if (parentId) {
      // Delete from parent's children
      setCategories((prev) =>
        prev.map((cat) => {
          if (cat.id === parentId) {
            return {
              ...cat,
              children: cat.children?.filter((child) => child.id !== categoryId),
            }
          } else if (cat.children) {
            // Check in children
            const updatedChildren = deleteFromChildren(cat.children, categoryId, parentId)
            if (updatedChildren !== cat.children) {
              return { ...cat, children: updatedChildren }
            }
          }
          return cat
        }),
      )
    } else {
      // Delete top-level category
      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId))
    }
  }

  const deleteFromChildren = (children: DataCategory[], categoryId: string, parentId: string): DataCategory[] => {
    return children.map((child) => {
      if (child.id === parentId) {
        return {
          ...child,
          children: child.children?.filter((c) => c.id !== categoryId),
        }
      } else if (child.children) {
        const updatedChildren = deleteFromChildren(child.children, categoryId, parentId)
        if (updatedChildren !== child.children) {
          return { ...child, children: updatedChildren }
        }
      }
      return child
    })
  }

  const renderCategoryTree = (categories: DataCategory[], level = 0) => {
    return categories.map((category) => (
      <div key={category.id} className="mb-2">
        <div
          className={`flex items-center justify-between p-2 rounded-md ${level === 0 ? "bg-muted" : "bg-background border"}`}
          style={{ marginLeft: `${level * 20}px` }}
        >
          <div className="flex items-center gap-2">
            {category.children && category.children.length > 0 ? (
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleCategory(category.id)}>
                {expandedCategories.includes(category.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            ) : (
              <Folder className="h-4 w-4 ml-1 mr-1" />
            )}
            <span className="font-medium">{category.name}</span>
            {category.tags && category.tags.length > 0 && (
              <div className="flex gap-1 ml-2">
                {category.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => {
                setSelectedCategory(category)
                setIsEditDialogOpen(true)
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-red-500"
              onClick={() => handleDeleteCategory(category.id, category.parentId)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setNewCategory({
                      name: "",
                      description: "",
                      parentId: category.id,
                      tags: [],
                    })
                    setIsAddDialogOpen(true)
                  }}
                >
                  Ajouter une sous-catégorie
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedCategory(category)
                    setIsEditDialogOpen(true)
                  }}
                >
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() => handleDeleteCategory(category.id, category.parentId)}
                >
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {category.children &&
          expandedCategories.includes(category.id) &&
          renderCategoryTree(category.children, level + 1)}
      </div>
    ))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestionnaire de Catégories de Données</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <FolderPlus className="mr-2 h-4 w-4" />
              Ajouter une catégorie
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle catégorie</DialogTitle>
              <DialogDescription>Créez une nouvelle catégorie pour organiser vos données.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name">Nom</label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Nom de la catégorie"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description">Description</label>
                <Textarea
                  id="description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Description de la catégorie"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="parent">Catégorie parente</label>
                <select
                  id="parent"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newCategory.parentId}
                  onChange={(e) => setNewCategory({ ...newCategory, parentId: e.target.value })}
                >
                  <option value="">Aucune (catégorie principale)</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="tags">Tags (séparés par des virgules)</label>
                <Input
                  id="tags"
                  placeholder="tag1, tag2, tag3"
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      tags: e.target.value.split(",").map((tag) => tag.trim()),
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddCategory}>Ajouter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Structure des catégories</CardTitle>
          <CardDescription>
            Organisez vos données en catégories et sous-catégories pour faciliter la gestion.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">{renderCategoryTree(categories)}</CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            {categories.length} catégories principales,{" "}
            {categories.reduce((acc, cat) => acc + (cat.children?.length || 0), 0)} sous-catégories
          </p>
        </CardFooter>
      </Card>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier la catégorie</DialogTitle>
            <DialogDescription>Modifiez les détails de la catégorie sélectionnée.</DialogDescription>
          </DialogHeader>
          {selectedCategory && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="edit-name">Nom</label>
                <Input
                  id="edit-name"
                  value={selectedCategory.name}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-description">Description</label>
                <Textarea
                  id="edit-description"
                  value={selectedCategory.description || ""}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-tags">Tags (séparés par des virgules)</label>
                <Input
                  id="edit-tags"
                  value={(selectedCategory.tags || []).join(", ")}
                  onChange={(e) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      tags: e.target.value.split(",").map((tag) => tag.trim()),
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditCategory}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
