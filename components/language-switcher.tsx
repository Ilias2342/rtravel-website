"use client"

import { useState, useEffect } from "react"
import { Check, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Language = {
  code: string
  name: string
  nativeName: string
  direction: "ltr" | "rtl"
}

const languages: Language[] = [
  { code: "fr", name: "French", nativeName: "Français", direction: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", direction: "rtl" },
  { code: "en", name: "English", nativeName: "English", direction: "ltr" },
]

export function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])

  useEffect(() => {
    // Get language from localStorage or use browser language or default to French
    const savedLang = localStorage.getItem("r-travel-language")
    if (savedLang) {
      const lang = languages.find((l) => l.code === savedLang)
      if (lang) {
        setCurrentLanguage(lang)
        document.documentElement.lang = lang.code
        document.documentElement.dir = lang.direction
      }
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0]
      const lang = languages.find((l) => l.code === browserLang)
      if (lang) {
        setCurrentLanguage(lang)
        document.documentElement.lang = lang.code
        document.documentElement.dir = lang.direction
      }
    }
  }, [])

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language)
    localStorage.setItem("r-travel-language", language.code)
    document.documentElement.lang = language.code
    document.documentElement.dir = language.direction

    // Reload the page to apply language changes
    // In a real app, you would use a proper i18n library instead
    window.location.reload()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Changer de langue</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language)}
            className="flex items-center justify-between"
          >
            <span>{language.nativeName}</span>
            {currentLanguage.code === language.code && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
