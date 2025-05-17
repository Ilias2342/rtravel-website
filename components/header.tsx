"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { useMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/contexts/language-context"
import { ThemeAwareLogo } from "@/components/theme-aware-logo"

export function Header() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const { language } = useLanguage()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Multilingual routes
  const getRoutes = () => {
    if (language === "fr") {
      return [
        { href: "/", label: "Accueil", active: pathname === "/" },
        { href: "/transport", label: "Transport", active: pathname === "/transport" },
        { href: "/tourist", label: "Tourisme", active: pathname === "/tourist" },
        { href: "/contact", label: "Contact", active: pathname === "/contact" },
      ]
    } else if (language === "en") {
      return [
        { href: "/", label: "Home", active: pathname === "/" },
        { href: "/transport", label: "Transport", active: pathname === "/transport" },
        { href: "/tourist", label: "Tourism", active: pathname === "/tourist" },
        { href: "/contact", label: "Contact", active: pathname === "/contact" },
      ]
    } else if (language === "ar") {
      return [
        { href: "/", label: "الرئيسية", active: pathname === "/" },
        { href: "/transport", label: "النقل", active: pathname === "/transport" },
        { href: "/tourist", label: "السياحة", active: pathname === "/tourist" },
        { href: "/contact", label: "اتصل بنا", active: pathname === "/contact" },
      ]
    }

    // Default to French
    return [
      { href: "/", label: "Accueil", active: pathname === "/" },
      { href: "/transport", label: "Transport", active: pathname === "/transport" },
      { href: "/tourist", label: "Tourisme", active: pathname === "/tourist" },
      { href: "/contact", label: "Contact", active: pathname === "/contact" },
    ]
  }

  const routes = getRoutes()

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all duration-300",
        scrolled || isMobile || isMenuOpen
          ? "bg-background shadow-md"
          : "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative h-10 w-auto transition-transform duration-300 group-hover:scale-105">
              <ThemeAwareLogo width={180} height={40} />
            </div>
          </Link>
        </motion.div>

        {isMobile ? (
          <>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
                className="relative overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 top-16 z-50 bg-background"
                >
                  <nav className="container grid gap-6 p-6">
                    {routes.map((route, index) => (
                      <motion.div
                        key={route.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link
                          href={route.href}
                          onClick={closeMenu}
                          className={cn(
                            "flex items-center text-lg font-medium transition-colors hover:text-primary",
                            route.active ? "text-primary" : "text-muted-foreground",
                          )}
                        >
                          {route.label}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-6"
          >
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-primary",
                  route.active ? "text-primary" : "text-muted-foreground",
                )}
              >
                {route.label}
                {route.active && (
                  <motion.div
                    layoutId="activeRoute"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <div className="flex items-center gap-1">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  )
}
