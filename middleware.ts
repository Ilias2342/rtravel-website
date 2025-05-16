import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { incrementVisitorCount, checkRateLimit } from "@/lib/redis"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Increment visitor count for the page
  await incrementVisitorCount(pathname)

  // Rate limiting for API routes
  if (pathname.startsWith("/api/")) {
    const ip = request.ip || "unknown"
    const identifier = `${ip}:${pathname}`

    // Allow 60 requests per minute
    const isAllowed = await checkRateLimit(identifier, 60, 60)

    if (!isAllowed) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|.*\\.svg).*)"],
}
