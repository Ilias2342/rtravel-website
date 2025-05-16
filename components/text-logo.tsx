import { cn } from "@/lib/utils"

interface TextLogoProps {
  className?: string
}

export function TextLogo({ className }: TextLogoProps) {
  return (
    <div className={cn("font-bold text-2xl", className)}>
      <span className="text-blue-700 dark:text-blue-500">R'</span>
      <span className="text-green-700 dark:text-green-500">Travel</span>
    </div>
  )
}
