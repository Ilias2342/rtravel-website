"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  serviceType: z.string({
    required_error: "Veuillez sélectionner un type de service.",
  }),
  rating: z.string({
    required_error: "Veuillez attribuer une note.",
  }),
  review: z.string().min(10, {
    message: "L'avis doit contenir au moins 10 caractères.",
  }),
})

export function ReviewForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      serviceType: "",
      rating: "",
      review: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)

    toast({
      title: "Avis envoyé!",
      description: "Merci d'avoir partagé votre expérience avec nous.",
    })

    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom complet</FormLabel>
              <FormControl>
                <Input placeholder="Votre nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="votre@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service utilisé</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="car-rental">Location de voiture</SelectItem>
                  <SelectItem value="vip-transport">Transport VIP</SelectItem>
                  <SelectItem value="event-transport">Transport pour événement</SelectItem>
                  <SelectItem value="tourist-circuit">Circuit touristique</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Attribuez une note" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="5">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary mr-1" />
                      ))}
                      <span className="ml-2">Excellent</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="4">
                    <div className="flex items-center">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary mr-1" />
                      ))}
                      <Star className="h-4 w-4 text-primary mr-1" />
                      <span className="ml-2">Très bien</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="3">
                    <div className="flex items-center">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary mr-1" />
                      ))}
                      {[...Array(2)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-primary mr-1" />
                      ))}
                      <span className="ml-2">Bien</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="2">
                    <div className="flex items-center">
                      {[...Array(2)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary mr-1" />
                      ))}
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-primary mr-1" />
                      ))}
                      <span className="ml-2">Moyen</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="1">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-primary mr-1" />
                      ))}
                      <span className="ml-2">Décevant</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Votre avis</FormLabel>
              <FormControl>
                <Textarea placeholder="Partagez votre expérience avec R'TRAVEL" className="min-h-[150px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours..." : "Soumettre l'avis"}
        </Button>
      </form>
    </Form>
  )
}
