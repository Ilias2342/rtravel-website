"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa"

const testimonials = [
  {
    name: "Sophie Dubois",
    title: "Directrice Marketing",
    avatar:
      "https://images.unsplash.com/photo-1570295999680-0b1e7b092788?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&q=60",
    text: "R'TRAVEL a été un partenaire exceptionnel pour nos événements d'entreprise. Leur professionnalisme et leur flotte de véhicules de luxe ont dépassé nos attentes.",
  },
  {
    name: "Ahmed El Amrani",
    title: "Propriétaire de Restaurant",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd8a72fbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&q=60",
    text: "Grâce à R'TRAVEL, nos clients peuvent profiter d'un service de transport VIP fiable et confortable. Nous recommandons vivement leurs services.",
  },
  {
    name: "Isabelle Lefevre",
    title: "Wedding Planner",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60",
    text: "R'TRAVEL a contribué à rendre les mariages que j'organise encore plus spéciaux. Leurs voitures de luxe et leur service impeccable sont un atout précieux.",
  },
]

export function TestimonialCarousel() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  const testimonial = testimonials[currentTestimonial]

  return (
    <div className="relative">
      <div className="bg-muted rounded-lg p-8 shadow-md">
        <div className="flex items-center mb-4">
          <Avatar className="mr-4 h-12 w-12">
            <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
          </div>
        </div>
        <div className="relative">
          <FaQuoteLeft className="absolute left-0 top-0 text-gray-400" size={20} />
          <p className="text-muted-foreground italic pl-6">{testimonial.text}</p>
          <FaQuoteRight className="absolute right-0 bottom-0 text-gray-400" size={20} />
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentTestimonial ? "bg-primary scale-125" : "bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
