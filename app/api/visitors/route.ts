import { type NextRequest, NextResponse } from "next/server"
import { getVisitorCount } from "@/lib/redis"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get("page") || "/"

  const count = await getVisitorCount(page)

  return NextResponse.json({ count })
}
