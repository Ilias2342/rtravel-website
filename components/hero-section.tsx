"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mercedes-Benz-Class-E-3-qiaQc7g1zRuHxpIn5NMAO2p84fd7Fv.webp",
    title: "Location de Voitures",
    description: "Découvrez notre flotte de véhicules neufs pour tous vos déplacements au Maroc",
    link: "/transport#car-rental",
  },
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-12%20at%2013.55.11-J3jq66HgZmBfJuWOb6LqulcRHlNqV2.jpeg",
    title: "Transport VIP",
    description: "Voyagez avec style et confort dans nos véhicules de luxe avec chauffeur professionnel",
    link: "/transport#vip",
  },
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-CAR-min-1024x320.jpg-QWJAg6fdVDNLZ6qgcc6eLaa1HFhNYv.webp",
    title: "Événements Spéciaux",
    description: "Des solutions de transport sur mesure pour vos événements importants",
    link: "/transport#events",
  },
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Toyota-Land-Cruiser-4x4-4-sXERxatC9xwHJ8sC29o1xFl35Q2Ifl.webp",
    title: "Aventures Touristiques",
    description: "Explorez les paysages marocains avec nos véhicules tout-terrain",
    link: "/tourist",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full h-[70vh] min-h-[400px] max-h-[800px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={imageError ? "/placeholder.svg?height=800&width=1200" : slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            priority
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="container relative h-full flex flex-col justify-center px-4 md:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              {slides[currentSlide].title}
            </h1>
            <p className="mt-4 text-xl text-white/90 max-w-xl md:text-2xl">{slides[currentSlide].description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild className="btn-hover-effect text-lg px-6 py-6 h-auto">
                <Link href={slides[currentSlide].link}>En savoir plus</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-lg px-6 py-6 h-auto btn-hover-effect"
                asChild
              >
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
