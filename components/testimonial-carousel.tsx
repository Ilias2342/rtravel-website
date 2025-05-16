"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    name: "Sophie et Pierre",
    location: "France",
    rating: 5,
    text: "Notre circuit des villes impériales était parfaitement organisé. Le chauffeur était professionnel et connaissait très bien le pays. Nous avons découvert le Maroc dans des conditions idéales!",
  },
  {
    name: "John Smith",
    location: "États-Unis",
    rating: 5,
    text: "L'aventure dans le désert était incroyable! Dormir sous les étoiles dans le Sahara restera l'un de mes meilleurs souvenirs. Le transport était confortable malgré les longues distances.",
  },
  {
    name: "Maria et Carlos",
    location: "Espagne",
    rating: 4,
    text: "Nous avons loué une voiture pour explorer la côte atlantique à notre rythme. Le véhicule était en parfait état et le service client très réactif. Une expérience à recommander!",
  },
  {
    name: "Ahmed",
    location: "Maroc",
    rating: 5,
    text: "En tant que local, j'ai fait appel à R'TRAVEL pour organiser un événement d'entreprise. Le service était impeccable et tous mes collègues étaient satisfaits. Je recommande vivement!",
  },
]

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      next()
    }, 5000)

    return () => clearInterval(interval)
  }, [current, autoplay])

  return (
    <div className="relative">
      <div className="overflow-hidden py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <Card className="max-w-xl bg-muted/50">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{testimonials[current].name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonials[current].location}</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonials[current].rating ? "fill-primary text-primary" : "text-muted"}`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic">"{testimonials[current].text}"</p>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm pointer-events-auto"
          onClick={prev}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous testimonial</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm pointer-events-auto"
          onClick={next}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next testimonial</span>
        </Button>
      </div>

      <div className="flex justify-center gap-1 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? "bg-primary scale-125" : "bg-muted-foreground/30"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
