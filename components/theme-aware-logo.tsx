"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"

interface ThemeAwareLogoProps {
  width?: number
  height?: number
  className?: string
}

export function ThemeAwareLogo({ width = 180, height = 40, className = "" }: ThemeAwareLogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the logo based on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Before mounting, show a placeholder to avoid hydration mismatch
  if (!mounted) {
    return <div style={{ width, height }} className={className} />
  }

  const isDarkMode = resolvedTheme === "dark"

  return (
    <div className="relative" style={{ width, height }}>
      <Image
        src="/images/rtravel-logo.png"
        alt="R'Travel Logo"
        width={width}
        height={height}
        className={`
          object-contain 
          ${className}
          ${isDarkMode ? "brightness-125 contrast-110" : ""}
          transition-all duration-300
        `}
        style={{
          filter: isDarkMode ? "drop-shadow(0 0 1px rgba(255,255,255,0.5))" : "none",
        }}
        priority
      />
    </div>
  )
}
