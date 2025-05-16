import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"

interface DocumentCardProps {
  name: string
  type: string
  description?: string
  fileUrl: string
}

export function DocumentCard({ name, type, description, fileUrl }: DocumentCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm font-medium text-muted-foreground">{type}</p>
        {description && <p className="text-sm mt-2">{description}</p>}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <a href={fileUrl} target="_blank" rel="noopener noreferrer" download>
            <Download className="mr-2 h-4 w-4" />
            Télécharger
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
