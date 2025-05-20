"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Paintbrush } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const colorOptions = [
  { name: "Slate", value: "bg-slate-50" },
  { name: "Gray", value: "bg-gray-50" },
  { name: "Zinc", value: "bg-zinc-50" },
  { name: "Neutral", value: "bg-neutral-50" },
  { name: "Stone", value: "bg-stone-50" },
  { name: "Red", value: "bg-red-50" },
  { name: "Orange", value: "bg-orange-50" },
  { name: "Amber", value: "bg-amber-50" },
  { name: "Yellow", value: "bg-yellow-50" },
  { name: "Lime", value: "bg-lime-50" },
  { name: "Green", value: "bg-green-50" },
  { name: "Emerald", value: "bg-emerald-50" },
  { name: "Teal", value: "bg-teal-50" },
  { name: "Cyan", value: "bg-cyan-50" },
  { name: "Sky", value: "bg-sky-50" },
  { name: "Blue", value: "bg-blue-50" },
  { name: "Indigo", value: "bg-indigo-50" },
  { name: "Violet", value: "bg-violet-50" },
  { name: "Purple", value: "bg-purple-50" },
  { name: "Fuchsia", value: "bg-fuchsia-50" },
  { name: "Pink", value: "bg-pink-50" },
  { name: "Rose", value: "bg-rose-50" },
]

export function ThemeCustomizer() {
  const [background, setBackground] = useState("bg-white")
  const [customColor, setCustomColor] = useState("#ffffff")

  useEffect(() => {
    // Load saved background from localStorage
    const savedBackground = localStorage.getItem("r-travel-background")
    if (savedBackground) {
      setBackground(savedBackground)
      document.body.className = savedBackground
    }
  }, [])

  const handleBackgroundChange = (bgClass: string) => {
    setBackground(bgClass)
    document.body.className = bgClass
    localStorage.setItem("r-travel-background", bgClass)
  }

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value)
  }

  const applyCustomColor = () => {
    document.body.style.backgroundColor = customColor
    localStorage.setItem("r-travel-background", "custom")
    localStorage.setItem("r-travel-custom-color", customColor)
  }

  const resetBackground = () => {
    setBackground("bg-white")
    document.body.className = "bg-white"
    document.body.style.backgroundColor = ""
    localStorage.removeItem("r-travel-background")
    localStorage.removeItem("r-travel-custom-color")
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Paintbrush className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium">Personnaliser l'arrière-plan</h4>
          <div className="grid grid-cols-5 gap-2">
            {colorOptions.map((color) => (
              <div
                key={color.value}
                className={cn(
                  "h-8 w-8 cursor-pointer rounded-full border",
                  color.value,
                  background === color.value && "ring-2 ring-primary",
                )}
                onClick={() => handleBackgroundChange(color.value)}
                title={color.name}
              />
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customColor}
                onChange={handleCustomColorChange}
                className="h-8 w-8 cursor-pointer rounded-md border"
              />
              <span className="text-sm">Couleur personnalisée</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={applyCustomColor}>
                Appliquer
              </Button>
              <Button size="sm" variant="outline" onClick={resetBackground}>
                Réinitialiser
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
