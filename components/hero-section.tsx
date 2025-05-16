"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"

const slides = [
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mercedes-Benz-Class-E-3-qiaQc7g1zRuHxpIn5NMAO2p84fd7Fv.webp",
    title: "Élégance & Confort",
    description: "Découvrez notre flotte premium pour une expérience de conduite incomparable",
    link: "/transport#car-rental",
  },
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-12%20at%2013.55.11-J3jq66HgZmBfJuWOb6LqulcRHlNqV2.jpeg",
    title: "Service VIP",
    description: "Voyagez avec distinction dans nos véhicules de luxe avec chauffeur dédié",
    link: "/transport#vip",
  },
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-CAR-min-1024x320.jpg-QWJAg6fdVDNLZ6qgcc6eLaa1HFhNYv.webp",
    title: "Moments Exceptionnels",
    description: "Solutions de transport sur mesure pour vos événements les plus prestigieux",
    link: "/transport#events",
  },
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Toyota-Land-Cruiser-4x4-4-sXERxatC9xwHJ8sC29o1xFl35Q2Ifl.webp",
    title: "Aventures Marocaines",
    description: "Explorez les paysages spectaculaires du Maroc avec nos véhicules tout-terrain",
    link: "/tourist",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full h-[85vh] min-h-[500px] max-h-[900px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={imageError ? "/placeholder.svg?height=900&width=1600" : slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className={`object-cover transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            priority
            onError={() => setImageError(true)}
            onLoad={() => setIsLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="container relative h-full flex flex-col justify-center px-4 md:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-3xl text-white"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                {slides[currentSlide].title}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="mt-6 text-xl text-white/90 max-w-xl md:text-2xl font-light">
                {slides[currentSlide].description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                asChild
                className="group text-lg px-8 py-7 h-auto rounded-full transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg"
              >
                <Link href={slides[currentSlide].link}>
                  Découvrir
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-lg px-8 py-7 h-auto rounded-full transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg"
                asChild
              >
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="group relative"
              aria-label={`Go to slide ${index + 1}`}
            >
              <span
                className={`block w-12 h-1 rounded-full transition-all duration-500 ${
                  index === currentSlide ? "bg-white" : "bg-white/30 group-hover:bg-white/50"
                }`}
              />
              {index === currentSlide && (
                <motion.span
                  layoutId="slideIndicator"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
