"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { t } from "@/lib/i18n"
import { FileText, Search, Download, Eye, Upload, FileCheck, FileClock, FileWarning, Filter } from "lucide-react"

// Mock data for documents
const documents = [
  {
    id: 1,
    name: "Attestation d'Inscription à la Taxe Professionnelle",
    reference: "27200034",
    issueDate: "19/06/2018",
    expiryDate: "",
    issuer: "Direction Générale des Impôts",
    status: "valid",
    type: "fiscal",
    file: "/documents/attestation-taxe-professionnelle.pdf",
  },
  {
    id: 2,
    name: "Registre de Commerce",
    reference: "131771",
    issueDate: "26/06/2018",
    expiryDate: "",
    issuer: "Tribunal de Commerce de Rabat",
    status: "valid",
    type: "legal",
    file: "/documents/registre-commerce.pdf",
  },
  {
    id: 3,
    name: "Statuts de la société",
    reference: "RE 2974",
    issueDate: "15/05/2018",
    expiryDate: "",
    issuer: "CRI Rabat",
    status: "valid",
    type: "legal",
    file: "/documents/statuts.pdf",
  },
  {
    id: 4,
    name: "Attestation d'identification fiscale",
    reference: "26046881",
    issueDate: "20/06/2018",
    expiryDate: "",
    issuer: "Direction Générale des Impôts",
    status: "valid",
    type: "fiscal",
    file: "/documents/attestation-fiscale.pdf",
  },
  {
    id: 5,
    name: "Autorisation de Transport Touristique",
    reference: "RT/2018/456",
    issueDate: "01/07/2018",
    expiryDate: "01/07/2023",
    issuer: "Ministère du Transport",
    status: "expiring",
    type: "administrative",
    file: "/documents/autorisation-transport.pdf",
  },
  {
    id: 6,
    name: "Assurance Responsabilité Civile",
    reference: "RC/2022/789",
    issueDate: "01/01/2022",
    expiryDate: "31/12/2022",
    issuer: "Compagnie d'Assurance",
    status: "expired",
    type: "administrative",
    file: "/documents/assurance-rc.pdf",
  },
]

export function LegalDocuments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.reference.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || doc.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "valid":
        return (
          <Badge className="bg-green-500">
            <FileCheck className="mr-1 h-3 w-3" /> {t("valid")}
          </Badge>
        )
      case "expiring":
        return (
          <Badge className="bg-yellow-500">
            <FileClock className="mr-1 h-3 w-3" /> {t("expiring")}
          </Badge>
        )
      case "expired":
        return (
          <Badge className="bg-red-500">
            <FileWarning className="mr-1 h-3 w-3" /> {t("expired")}
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t("legalDocuments")}</CardTitle>
        <CardDescription>{t("legalDocumentsDescription")}</CardDescription>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("searchDocuments")}
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder={t("filterByStatus")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allDocuments")}</SelectItem>
                <SelectItem value="valid">{t("validDocuments")}</SelectItem>
                <SelectItem value="expiring">{t("expiringDocuments")}</SelectItem>
                <SelectItem value="expired">{t("expiredDocuments")}</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Upload className="mr-2 h-4 w-4" /> {t("uploadDocument")}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="all">{t("allDocuments")}</TabsTrigger>
            <TabsTrigger value="fiscal">{t("fiscalDocuments")}</TabsTrigger>
            <TabsTrigger value="legal">{t("legalDocuments")}</TabsTrigger>
            <TabsTrigger value="administrative">{t("administrativeDocuments")}</TabsTrigger>
          </TabsList>

          {["all", "fiscal", "legal", "administrative"].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 gap-4">
                {filteredDocuments
                  .filter((doc) => tabValue === "all" || doc.type === tabValue)
                  .map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <div className="text-sm text-muted-foreground">
                            {t("reference")}: {doc.reference} | {t("issuedOn")}: {doc.issueDate} | {t("issuedBy")}:{" "}
                            {doc.issuer}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(doc.status)}
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1 h-4 w-4" /> {t("view")}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-1 h-4 w-4" /> {t("download")}
                        </Button>
                      </div>
                    </div>
                  ))}

                {filteredDocuments.filter((doc) => tabValue === "all" || doc.type === tabValue).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">{t("noDocumentsFound")}</div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
