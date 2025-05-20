import { CompanyInfo } from "@/components/company-profile/company-info"
import { LegalDocuments } from "@/components/company-profile/legal-documents"
import { DashboardHeader } from "@/components/dashboard-header"
import { t } from "@/lib/i18n"

export default function CompanyProfilePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">{t("companyProfile")}</h1>
        </div>
        <div className="space-y-6">
          <CompanyInfo />
          <LegalDocuments />
        </div>
      </main>
    </div>
  )
}
