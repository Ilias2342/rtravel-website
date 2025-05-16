import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { PageHeader } from "@/components/page-header"
import { ReviewForm } from "@/components/review-form"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <PageHeader
        title="Contactez-nous"
        description="Nous sommes à votre disposition pour répondre à toutes vos questions"
      />

      <Tabs defaultValue="contact" className="w-full">
        <div className="container px-4 md:px-6 py-6">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="contact" className="py-3">
              Contact
            </TabsTrigger>
            <TabsTrigger value="review" className="py-3">
              Avis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Nos Coordonnées</h2>
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h3 className="font-medium">Adresse</h3>
                            <p className="text-sm text-muted-foreground">Hay El Manzah, N° 1160, CYM - Rabat, Maroc</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h3 className="font-medium">Téléphone</h3>
                            <p className="text-sm text-muted-foreground">06 61 07 99 96</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Mail className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h3 className="font-medium">Email</h3>
                            <p className="text-sm text-muted-foreground">rtravel.contact@gmail.com</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h3 className="font-medium">Horaires d'ouverture</h3>
                            <p className="text-sm text-muted-foreground">Lundi - Vendredi: 9h00 - 18h00</p>
                            <p className="text-sm text-muted-foreground">Samedi: 9h00 - 13h00</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Informations Légales</h2>
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>RC: 131771</p>
                        <p>Patente: 27200034</p>
                        <p>IF: 26046881</p>
                        <p>CNSS: 5979680</p>
                        <p>ICE: 001982116000096</p>
                        <p>N° Compte bancaire: 021810000014503006942992</p>
                        <p>CDM CREDIT DU MAROC (Agence de Rabat)</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Envoyez-nous un message</h2>
                <ContactForm />
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Notre Emplacement</h2>
              <div className="aspect-video w-full rounded-lg overflow-hidden border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.72691566402!2d-6.8782901!3d34.0209889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76b871f50c5c1%3A0x7ac946ed7408076b!2sRabat%2C%20Morocco!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="review" className="pt-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Partagez votre expérience</h2>
              <p className="text-muted-foreground mb-6">
                Nous apprécions vos commentaires! Partagez votre expérience avec R'TRAVEL pour nous aider à améliorer
                nos services et informer les futurs clients.
              </p>
              <ReviewForm />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </main>
  )
}
