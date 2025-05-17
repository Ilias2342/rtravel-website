import { Breadcrumb } from "@/components/breadcrumb"
import { SEO } from "@/components/seo"
import Link from "next/link"

const blogPosts = [
  {
    id: "meilleurs-circuits-touristiques-maroc",
    title: "Les 10 meilleurs circuits touristiques au Maroc en 2025",
    excerpt:
      "Découvrez les itinéraires incontournables pour explorer le Maroc, des médinas historiques aux dunes du Sahara.",
    date: "2025-05-10",
    imageUrl: "/images/blog/morocco-tours.jpg",
    author: "Mohammed Alami",
  },
  {
    id: "choisir-vehicule-location-maroc",
    title: "Comment choisir le véhicule idéal pour votre séjour au Maroc",
    excerpt:
      "Guide complet pour sélectionner le véhicule parfait selon votre itinéraire et vos besoins lors de votre voyage au Maroc.",
    date: "2025-04-25",
    imageUrl: "/images/blog/choosing-vehicle.jpg",
    author: "Sophia Benali",
  },
  {
    id: "transport-vip-evenements-maroc",
    title: "Transport VIP pour événements professionnels : Guide complet",
    excerpt:
      "Organisez le transport de vos invités avec élégance et professionnalisme pour vos événements d'entreprise au Maroc.",
    date: "2025-04-15",
    imageUrl: "/images/blog/vip-transport.jpg",
    author: "Karim Idrissi",
  },
]

export default function BlogPage() {
  // Generate structured data for the blog
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    headline: "Blog R'TRAVEL - Conseils de voyage et transport au Maroc",
    description: "Découvrez nos articles sur le tourisme, la location de voitures et le transport au Maroc.",
    publisher: {
      "@type": "Organization",
      "@id": "https://www.rtravel.ma/#organization",
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: post.author,
      },
      publisher: {
        "@type": "Organization",
        "@id": "https://www.rtravel.ma/#organization",
      },
      image: `https://www.rtravel.ma${post.imageUrl}`,
      url: `https://www.rtravel.ma/blog/${post.id}`,
    })),
  }

  return (
    <>
      <SEO
        title="Blog R'TRAVEL - Conseils de voyage et transport au Maroc"
        description="Découvrez nos articles sur le tourisme, la location de voitures et le transport au Maroc. Conseils d'experts pour votre séjour."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }} />

      <main className="flex min-h-screen flex-col">
        <Breadcrumb />

        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Blog R'TRAVEL</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Découvrez nos articles sur le tourisme, la location de voitures et le transport au Maroc
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group flex flex-col h-full overflow-hidden rounded-lg border bg-card transition-colors hover:border-primary"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10" />
                    <div className="h-full w-full bg-muted">
                      {/* Replace with actual images when available */}
                      <div className="flex h-full items-center justify-center bg-muted">
                        <span className="text-muted-foreground">Image: {post.title}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
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

                    <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>

                    <p className="text-muted-foreground flex-1">{post.excerpt}</p>

                    <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                      Lire l'article
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
