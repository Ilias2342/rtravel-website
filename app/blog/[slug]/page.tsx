import { Breadcrumb } from "@/components/breadcrumb"
import { SEO } from "@/components/seo"
import Link from "next/link"
import { notFound } from "next/navigation"

// This would ideally come from a CMS or database
const blogPosts = {
  "meilleurs-circuits-touristiques-maroc": {
    title: "Les 10 meilleurs circuits touristiques au Maroc en 2025",
    excerpt:
      "Découvrez les itinéraires incontournables pour explorer le Maroc, des médinas historiques aux dunes du Sahara.",
    content: `
      <p>Le Maroc est une destination qui offre une diversité incroyable de paysages, de cultures et d'expériences. Des montagnes de l'Atlas aux plages de la côte atlantique, en passant par les médinas historiques et le désert du Sahara, ce pays regorge de merveilles à découvrir.</p>
      
      <h2>1. Le circuit des villes impériales</h2>
      <p>Ce circuit classique vous emmène à travers les quatre villes impériales du Maroc : Rabat, Fès, Meknès et Marrakech. Chacune de ces villes possède un riche patrimoine historique et culturel, avec des médinas labyrinthiques, des palais somptueux et des souks animés.</p>
      
      <h2>2. Le grand tour du Sud</h2>
      <p>Ce circuit vous fait découvrir les paysages spectaculaires du sud marocain, en passant par les kasbahs de la vallée du Dadès, les gorges du Todra, et bien sûr, les dunes de Merzouga où vous pourrez passer une nuit inoubliable dans un campement berbère.</p>
      
      <h2>3. La côte atlantique</h2>
      <p>De Tanger à Agadir, en passant par Rabat, Casablanca et Essaouira, ce circuit côtier vous permet de découvrir les villes portuaires du Maroc, avec leurs plages, leurs ports de pêche et leur ambiance unique.</p>
    `,
    date: "2025-05-10",
    imageUrl: "/images/blog/morocco-tours.jpg",
    author: "Mohammed Alami",
    tags: ["tourisme", "circuits", "maroc", "voyage", "désert", "médina"],
  },
  "choisir-vehicule-location-maroc": {
    title: "Comment choisir le véhicule idéal pour votre séjour au Maroc",
    excerpt:
      "Guide complet pour sélectionner le véhicule parfait selon votre itinéraire et vos besoins lors de votre voyage au Maroc.",
    content: `
      <p>Choisir le bon véhicule pour votre séjour au Maroc peut faire toute la différence dans votre expérience de voyage. Selon votre itinéraire, le nombre de personnes et vos préférences, certains types de véhicules seront plus adaptés que d'autres.</p>
      
      <h2>Pour les circuits urbains</h2>
      <p>Si vous prévoyez de rester principalement dans les grandes villes comme Rabat, Casablanca ou Marrakech, une berline confortable comme la Mercedes Classe E est idéale. Elle offre un excellent confort pour les déplacements urbains et les transferts entre villes sur routes goudronnées.</p>
      
      <h2>Pour les familles et petits groupes</h2>
      <p>Les minivans comme le Mercedes Vito ou le Hyundai H1 sont parfaits pour les familles ou les petits groupes jusqu'à 8 personnes. Ils offrent suffisamment d'espace pour les passagers et les bagages, tout en restant confortables pour les longs trajets.</p>
      
      <h2>Pour les aventures désertiques et montagneuses</h2>
      <p>Si votre itinéraire inclut des régions désertiques comme Merzouga ou des routes de montagne dans l'Atlas, un 4x4 comme le Toyota Land Cruiser est indispensable. Ces véhicules robustes peuvent affronter les terrains difficiles tout en offrant confort et sécurité.</p>
    `,
    date: "2025-04-25",
    imageUrl: "/images/blog/choosing-vehicle.jpg",
    author: "Sophia Benali",
    tags: ["location", "voiture", "4x4", "minivan", "berline", "transport"],
  },
  "transport-vip-evenements-maroc": {
    title: "Transport VIP pour événements professionnels : Guide complet",
    excerpt:
      "Organisez le transport de vos invités avec élégance et professionnalisme pour vos événements d'entreprise au Maroc.",
    content: `
      <p>L'organisation d'un événement professionnel réussi passe par une attention particulière à tous les détails, y compris le transport des participants. Un service de transport VIP bien organisé reflète le professionnalisme de votre entreprise et contribue à l'expérience globale de vos invités.</p>
      
      <h2>Planification du transport pour conférences</h2>
      <p>Pour les conférences et séminaires, il est essentiel de coordonner les transferts depuis l'aéroport vers les hôtels, puis vers le lieu de l'événement. Des véhicules comme la Mercedes Classe V ou des minibus pour les plus grands groupes permettent d'assurer ces transferts avec élégance.</p>
      
      <h2>Transport pour événements corporate</h2>
      <p>Les événements corporate nécessitent souvent un service de navette entre différents sites. Une flotte cohérente de véhicules premium, avec chauffeurs en tenue professionnelle, contribue à l'image de marque de votre entreprise.</p>
      
      <h2>Services personnalisés pour VIP</h2>
      <p>Pour les invités de marque, un service sur mesure avec voiture dédiée et chauffeur personnel est recommandé. Des véhicules comme la Mercedes Classe E ou S offrent le niveau de luxe et de confort attendu par ces invités spéciaux.</p>
    `,
    date: "2025-04-15",
    imageUrl: "/images/blog/vip-transport.jpg",
    author: "Karim Idrissi",
    tags: ["événements", "corporate", "transport vip", "conférence", "business", "chauffeur"],
  },
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = blogPosts[slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  // Generate article structured data
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `https://www.rtravel.ma${post.imageUrl}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.rtravel.ma/#organization",
      name: "R'TRAVEL",
      logo: {
        "@type": "ImageObject",
        url: "https://www.rtravel.ma/images/rtravel-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.rtravel.ma/blog/${slug}`,
    },
    keywords: post.tags.join(", "),
  }

  return (
    <>
      <SEO title={`${post.title} | Blog R'TRAVEL`} description={post.excerpt} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }} />

      <main className="flex min-h-screen flex-col">
        <Breadcrumb
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${slug}` },
          ]}
        />

        <article className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">{post.title}</h1>

                <div className="flex items-center text-sm text-muted-foreground mb-6">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </div>

                <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-lg mb-8">
                  <div className="h-full w-full bg-muted">
                    {/* Replace with actual images when available */}
                    <div className="flex h-full items-center justify-center bg-muted">
                      <span className="text-muted-foreground">Image: {post.title}</span>
                    </div>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

                <div className="mt-8 pt-8 border-t">
                  <h2 className="text-lg font-semibold mb-4">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${tag}`}
                        className="px-3 py-1 bg-muted rounded-full text-sm hover:bg-primary/10 transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  )
}
