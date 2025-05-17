"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

export function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("analytics-consent")
    if (!hasConsented) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem("analytics-consent", "true")
    setShowBanner(false)
    // You could initialize analytics here if you had disabled it by default
  }

  const rejectAll = () => {
    localStorage.setItem("analytics-consent", "false")
    setShowBanner(false)
    // You would disable analytics here
  }

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t shadow-lg"
          >
            <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium">Nous respectons votre vie privée</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic de notre site.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowDetails(true)}>
                  Préférences
                </Button>
                <Button variant="outline" size="sm" onClick={rejectAll}>
                  Refuser
                </Button>
                <Button size="sm" onClick={acceptAll}>
                  Accepter
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Préférences de confidentialité</DialogTitle>
            <DialogDescription>
              Personnalisez vos préférences concernant la façon dont nous collectons et utilisons vos données.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div>
                  <h4 className="text-sm font-medium">Cookies essentiels</h4>
                  <p className="text-sm text-muted-foreground">
                    Toujours actifs et nécessaires au fonctionnement du site.
                  </p>
                </div>
                <div className="ml-auto pt-1">
                  <div className="h-4 w-8 rounded-full bg-primary opacity-50"></div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div>
                  <h4 className="text-sm font-medium">Cookies analytiques</h4>
                  <p className="text-sm text-muted-foreground">
                    Nous aident à comprendre comment vous utilisez notre site.
                  </p>
                </div>
                <div className="ml-auto pt-1">
                  <div className="h-4 w-8 rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={rejectAll}>
              Refuser tout
            </Button>
            <Button onClick={acceptAll}>Accepter tout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
