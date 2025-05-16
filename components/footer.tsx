import Link from "next/link"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react"
import { BrandText } from "@/components/brand-text"

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/40">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="mb-2">
              <BrandText withTagline />
            </div>
            <p className="text-sm text-muted-foreground">
              Votre partenaire de confiance pour la location de voitures et le transport touristique au Maroc.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/transport#car-rental" className="hover:text-primary">
                  Location de voitures
                </Link>
              </li>
              <li>
                <Link href="/transport#vip" className="hover:text-primary">
                  Transport VIP
                </Link>
              </li>
              <li>
                <Link href="/transport#events" className="hover:text-primary">
                  Événements spéciaux
                </Link>
              </li>
              <li>
                <Link href="/tourist" className="hover:text-primary">
                  Circuits touristiques
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Liens Rapides</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/transport" className="hover:text-primary">
                  Transport
                </Link>
              </li>
              <li>
                <Link href="/tourist" className="hover:text-primary">
                  Tourisme
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/contact#review" className="hover:text-primary">
                  Avis clients
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>Hay El Manzah, N° 1160, CYM - Rabat, Maroc</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <span>06 61 07 99 96</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <span>rtravel.contact@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} <BrandText className="inline-block" size="sm" />. Tous droits réservés.
          </p>
          <p className="mt-1">RC:131771 - Patente:27200034 - IF:26046881 - CNSS:5979680 - ICE:001982116000096</p>
        </div>
      </div>
    </footer>
  )
}
