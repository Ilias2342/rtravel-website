import { cn } from "@/lib/utils"

interface BrandTextProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  withTagline?: boolean
}

export function BrandText({ className, size = "md", withTagline = false }: BrandTextProps) {
  const sizeClasses = {
    sm: "text-lg md:text-xl",
    md: "text-xl md:text-2xl",
    lg: "text-2xl md:text-3xl",
    xl: "text-3xl md:text-4xl",
  }

  return (
    <div className={cn("font-bold leading-tight", className)}>
      <span className={cn("inline-block", sizeClasses[size])}>
        <span className="text-[#2a4b8d] dark:text-[#3a6bbd]">R'</span>
        <span className="text-[#3e7b3e] dark:text-[#4e9b4e]">Travel</span>
      </span>
      {withTagline && <div className="text-xs md:text-sm text-muted-foreground mt-1">Transport Touristique</div>}
    </div>
  )
}
