"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { analytics } from "@/lib/analytics"

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the correct icon
  useEffect(() => {
    setMounted(true)
  }, [])

  // Get the current theme icon and label
  const getThemeDetails = () => {
    if (!mounted) return { icon: <Sun className="h-4 w-4" />, label: "Theme" }

    switch (resolvedTheme) {
      case "dark":
        return { icon: <Moon className="h-4 w-4" />, label: "Dark Mode" }
      case "light":
        return { icon: <Sun className="h-4 w-4" />, label: "Light Mode" }
      default:
        return { icon: <Monitor className="h-4 w-4" />, label: "System Theme" }
    }
  }

  const { icon, label } = getThemeDetails()

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <motion.div
                  animate={{ rotate: theme === "dark" ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-4 w-4"
                >
                  {icon}
                </motion.div>
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <DropdownMenuContent align="end" className="rounded-xl">
            <DropdownMenuItem
              onClick={() => {
                setTheme("light")
                analytics.changeTheme("light")
              }}
              className="cursor-pointer"
            >
              <Sun className="mr-2 h-4 w-4" />
              <span>Clair</span>
              {theme === "light" && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto h-2 w-2 rounded-full bg-primary"
                />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setTheme("dark")
                analytics.changeTheme("dark")
              }}
              className="cursor-pointer"
            >
              <Moon className="mr-2 h-4 w-4" />
              <span>Sombre</span>
              {theme === "dark" && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto h-2 w-2 rounded-full bg-primary"
                />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setTheme("system")
                analytics.changeTheme("system")
              }}
              className="cursor-pointer"
            >
              <Monitor className="mr-2 h-4 w-4" />
              <span>Système</span>
              {theme === "system" && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto h-2 w-2 rounded-full bg-primary"
                />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
