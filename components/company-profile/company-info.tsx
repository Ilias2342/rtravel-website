"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { t } from "@/lib/i18n"
import { Building, MapPin, User, Briefcase, Edit, Save, X } from "lucide-react"

export function CompanyInfo() {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <Building className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <CardTitle>R'TRAVEL</CardTitle>
            <CardDescription>SARL AU</CardDescription>
          </div>
          <Badge className="ml-2 bg-green-500">Active</Badge>
        </div>
        <Button variant="outline" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            <>
              <X className="mr-2 h-4 w-4" /> {t("cancel")}
            </>
          ) : (
            <>
              <Edit className="mr-2 h-4 w-4" /> {t("edit")}
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="general">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="general">
              <Building className="mr-2 h-4 w-4" /> {t("general")}
            </TabsTrigger>
            <TabsTrigger value="contact">
              <MapPin className="mr-2 h-4 w-4" /> {t("contact")}
            </TabsTrigger>
            <TabsTrigger value="management">
              <User className="mr-2 h-4 w-4" /> {t("management")}
            </TabsTrigger>
            <TabsTrigger value="activity">
              <Briefcase className="mr-2 h-4 w-4" /> {t("activity")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("company.name")}</Label>
                {isEditing ? <Input defaultValue="R'TRAVEL" /> : <div className="p-2 border rounded-md">R'TRAVEL</div>}
              </div>
              <div className="space-y-2">
                <Label>{t("company.legalForm")}</Label>
                {isEditing ? <Input defaultValue="SARL AU" /> : <div className="p-2 border rounded-md">SARL AU</div>}
              </div>
              <div className="space-y-2">
                <Label>{t("company.taxId")}</Label>
                {isEditing ? <Input defaultValue="26046881" /> : <div className="p-2 border rounded-md">26046881</div>}
              </div>
              <div className="space-y-2">
                <Label>{t("company.ice")}</Label>
                {isEditing ? (
                  <Input defaultValue="001982116000096" />
                ) : (
                  <div className="p-2 border rounded-md">001982116000096</div>
                )}
              </div>
              <div className="space-y-2">
                <Label>{t("company.rc")}</Label>
                {isEditing ? <Input defaultValue="131771" /> : <div className="p-2 border rounded-md">131771</div>}
              </div>
              <div className="space-y-2">
                <Label>{t("company.taxProfessional")}</Label>
                {isEditing ? <Input defaultValue="27200034" /> : <div className="p-2 border rounded-md">27200034</div>}
              </div>
              <div className="space-y-2">
                <Label>{t("company.creationDate")}</Label>
                {isEditing ? (
                  <Input defaultValue="26/06/2018" />
                ) : (
                  <div className="p-2 border rounded-md">26/06/2018</div>
                )}
              </div>
              <div className="space-y-2">
                <Label>{t("company.capital")}</Label>
                {isEditing ? (
                  <Input defaultValue="100 000,00 MAD" />
                ) : (
                  <div className="p-2 border rounded-md">100 000,00 MAD</div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("company.address")}</Label>
                {isEditing ? (
                  <Input defaultValue="HAY EL MENZAH, N°1160, CYM, Rabat" />
                ) : (
                  <div className="p-2 border rounded-md">HAY EL MENZAH, N°1160, CYM, Rabat</div>
                )}
              </div>
              <div className="space-y-2">
                <Label>{t("company.city")}</Label>
                {isEditing ? <Input defaultValue="Rabat" /> : <div className="p-2 border rounded-md">Rabat</div>}
              </div>
              <div className="space-y-2">
                <Label>{t("company.phone")}</Label>
                {isEditing ? (
                  <Input defaultValue="+212 5XX XX XX XX" />
                ) : (
                  <div className="p-2 border rounded-md">+212 5XX XX XX XX</div>
                )}
              </div>
              <div className="space-y-2">
                <Label>{t("company.email")}</Label>
                {isEditing ? (
                  <Input defaultValue="contact@rtravel.ma" />
                ) : (
                  <div className="p-2 border rounded-md">contact@rtravel.ma</div>
                )}
              </div>
              <div className="space-y-2">
                <Label>{t("company.website")}</Label>
                {isEditing ? (
                  <Input defaultValue="www.rtravel.ma" />
                ) : (
                  <div className="p-2 border rounded-md">www.rtravel.ma</div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="management" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("company.manager")}</Label>
                {isEditing ? (
                  <Input defaultValue="NANAI Younes" />
                ) : (
                  <div className="p-2 border rounded-md">NANAI Younes</div>
                )}
              </div>
              <div className="space-y-2">
                <Label>{t("company.managerTitle")}</Label>
                {isEditing ? <Input defaultValue="Gérant" /> : <div className="p-2 border rounded-md">Gérant</div>}
              </div>
              <div className="space-y-2">
                <Label>{t("company.managerID")}</Label>
                {isEditing ? <Input defaultValue="A787783" /> : <div className="p-2 border rounded-md">A787783</div>}
              </div>
              <div className="space-y-2">
                <Label>{t("company.managerBirthDate")}</Label>
                {isEditing ? (
                  <Input defaultValue="23/12/1981" />
                ) : (
                  <div className="p-2 border rounded-md">23/12/1981</div>
                )}
              </div>
              <div className="space-y-2">
                <Label>{t("company.managerNationality")}</Label>
                {isEditing ? (
                  <Input defaultValue="Marocaine" />
                ) : (
                  <div className="p-2 border rounded-md">Marocaine</div>
                )}
              </div>
              <div className="space-y-2">
                <Label>{t("company.managerAddress")}</Label>
                {isEditing ? (
                  <Input defaultValue="HAY EL MENZAH, N°1160, CYM, Rabat" />
                ) : (
                  <div className="p-2 border rounded-md">HAY EL MENZAH, N°1160, CYM, Rabat</div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label>{t("company.mainActivity")}</Label>
                {isEditing ? (
                  <Input defaultValue="ENTREPRENEUR DE TRANSPORT (TRANSPORT TOURISTIQUE)" />
                ) : (
                  <div className="p-2 border rounded-md">ENTREPRENEUR DE TRANSPORT (TRANSPORT TOURISTIQUE)</div>
                )}
              </div>
              <div className="space-y-2">
                <Label>{t("company.secondaryActivities")}</Label>
                {isEditing ? <Input defaultValue="N/A" /> : <div className="p-2 border rounded-md">N/A</div>}
              </div>
              <div className="space-y-2">
                <Label>{t("company.fiscalYear")}</Label>
                {isEditing ? (
                  <Input defaultValue="1 janvier - 31 décembre" />
                ) : (
                  <div className="p-2 border rounded-md">1 janvier - 31 décembre</div>
                )}
              </div>
              <div className="space-y-2">
                <Label>{t("company.taxCommune")}</Label>
                {isEditing ? (
                  <Input defaultValue="YACOUB EL MANSOUR" />
                ) : (
                  <div className="p-2 border rounded-md">YACOUB EL MANSOUR</div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      {isEditing && (
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={toggleEdit}>
            <X className="mr-2 h-4 w-4" /> {t("cancel")}
          </Button>
          <Button onClick={toggleEdit}>
            <Save className="mr-2 h-4 w-4" /> {t("save")}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
