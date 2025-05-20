import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VehicleManagement } from "@/components/vehicle-management"
import { DriverManagement } from "@/components/driver-management"
import { TransferManagement } from "@/components/transfer-management"
import { BookingManagement } from "@/components/booking-management"
import { DocumentGenerator } from "@/components/document-generator"
import { DashboardHeader } from "@/components/dashboard-header"
import { ThemeCustomizer } from "@/components/theme-customizer"
import { t } from "@/lib/i18n"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{t("app.title")}</h1>
          <ThemeCustomizer />
        </div>
        <Tabs defaultValue="vehicles" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="vehicles">{t("nav.vehicles")}</TabsTrigger>
            <TabsTrigger value="drivers">{t("nav.drivers")}</TabsTrigger>
            <TabsTrigger value="transfers">{t("nav.transfers")}</TabsTrigger>
            <TabsTrigger value="bookings">{t("nav.bookings")}</TabsTrigger>
            <TabsTrigger value="documents">{t("nav.documents")}</TabsTrigger>
          </TabsList>
          <TabsContent value="vehicles" className="space-y-4">
            <VehicleManagement />
          </TabsContent>
          <TabsContent value="drivers" className="space-y-4">
            <DriverManagement />
          </TabsContent>
          <TabsContent value="transfers" className="space-y-4">
            <TransferManagement />
          </TabsContent>
          <TabsContent value="bookings" className="space-y-4">
            <BookingManagement />
          </TabsContent>
          <TabsContent value="documents" className="space-y-4">
            <DocumentGenerator />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
