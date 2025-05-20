"use client"

import { Bell, Settings, User, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LanguageSwitcher } from "@/components/language-switcher"
import { t } from "@/lib/i18n"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2 font-bold text-xl text-green-600">
        <span className="hidden md:inline">R-TRAVEL</span>
        <span className="hidden md:inline text-blue-600">{t("app.title")}</span>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <LanguageSwitcher />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("nav.notifications")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Nouvelle réservation: Kasbah Film</DropdownMenuItem>
            <DropdownMenuItem>Maintenance prévue: CITROEN C-ELYSEE</DropdownMenuItem>
            <DropdownMenuItem>Transfert à confirmer: Aéroport Rabat</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("nav.settings")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{t("nav.profile")}</DropdownMenuItem>
            <DropdownMenuItem>{t("nav.preferences")}</DropdownMenuItem>
            <DropdownMenuItem>{t("nav.users")}</DropdownMenuItem>
            <DropdownMenuItem>
              <a href="/company-profile" className="flex items-center">
                <Building className="mr-2 h-4 w-4" />
                {t("nav.companyProfile")}
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("nav.my_account")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{t("nav.profile")}</DropdownMenuItem>
            <DropdownMenuItem>{t("nav.logout")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
