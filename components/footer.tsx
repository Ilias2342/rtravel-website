"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { ThemeAwareLogo } from "@/components/theme-aware-logo"

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/40">
      <div className="container px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="mb-4">
              <ThemeAwareLogo width={200} height={50} />
            </div>
            <p className="text-sm text-muted-foreground">
              Votre partenaire de confiance pour la location de voitures et le transport touristique au Maroc.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold">Services</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/transport#car-rental"
                  className="hover:text-primary transition-colors inline-flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                  Location de voitures
                </Link>
              </li>
              <li>
                <Link href="/transport#vip" className="hover:text-primary transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                  Transport VIP
                </Link>
              </li>
              <li>
                <Link
                  href="/transport#events"
                  className="hover:text-primary transition-colors inline-flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                  Événements spéciaux
                </Link>
              </li>
              <li>
                <Link href="/tourist" className="hover:text-primary transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                  Circuits touristiques
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold">Liens Rapides</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/transport" className="hover:text-primary transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                  Transport
                </Link>
              </li>
              <li>
                <Link href="/tourist" className="hover:text-primary transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                  Tourisme
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/contact#review" className="hover:text-primary transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                  Avis clients
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <span>Hay El Manzah, N° 1160, CYM - Rabat, Maroc</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <span>06 61 07 99 96</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <span>rtravel.contact@gmail.com</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground"
        >
          <p>&copy; {new Date().getFullYear()} R'Travel. Tous droits réservés.</p>
          <p className="mt-2 text-xs opacity-70">
            RC:131771 - Patente:27200034 - IF:26046881 - CNSS:5979680 - ICE:001982116000096
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
