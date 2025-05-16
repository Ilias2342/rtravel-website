import { redis } from "@/lib/redis"
import { DocumentCard } from "@/components/document-card"

async function getDocuments() {
  // Get all document IDs
  const documentIds = await redis.smembers("documents")

  // Fetch each document's data
  const documents = await Promise.all(
    documentIds.map(async (id) => {
      const document = await redis.hgetall(id)
      return {
        id,
        ...document,
      }
    }),
  )

  return documents
}

export default async function DocumentsPage() {
  const documents = await getDocuments()

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Documents</h1>

      {documents.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">Aucun document disponible pour le moment</h3>
          <p className="text-muted-foreground mt-2">Veuillez revenir plus tard.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((document) => (
            <DocumentCard
              key={document.id}
              name={document.name}
              type={document.type}
              description={document.description}
              fileUrl={document.fileUrl}
            />
          ))}
        </div>
      )}
    </main>
  )
}
