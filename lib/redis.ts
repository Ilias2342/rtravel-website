import { Redis } from "@upstash/redis"

// Initialize Redis client using environment variables
export const redis = Redis.fromEnv()

// Helper functions for common Redis operations
export async function incrementVisitorCount(page: string): Promise<number> {
  return await redis.incr(`visitors:${page}`)
}

export async function getVisitorCount(page: string): Promise<number> {
  return (await redis.get(`visitors:${page}`)) || 0
}

// Reservation system helpers
export async function checkAvailability(vehicleId: string, date: string): Promise<boolean> {
  const isBooked = await redis.sismember(`booked:${date}`, vehicleId)
  return !isBooked
}

export async function makeReservation(vehicleId: string, date: string, userId: string, details: any): Promise<boolean> {
  // Check if already booked
  const isAvailable = await checkAvailability(vehicleId, date)
  if (!isAvailable) return false

  // Add to booked set
  await redis.sadd(`booked:${date}`, vehicleId)

  // Store reservation details
  const reservationId = `reservation:${Date.now()}`
  await redis.hset(reservationId, {
    vehicleId,
    date,
    userId,
    ...details,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  })

  // Add to user's reservations
  await redis.sadd(`user:${userId}:reservations`, reservationId)

  return true
}

// Session management
export async function createSession(userId: string, sessionData: any): Promise<string> {
  const sessionId = `session:${Date.now()}-${Math.random().toString(36).substring(2, 10)}`
  await redis.hset(sessionId, {
    userId,
    ...sessionData,
    createdAt: new Date().toISOString(),
  })

  // Set expiration (24 hours)
  await redis.expire(sessionId, 60 * 60 * 24)

  return sessionId
}

export async function getSession(sessionId: string): Promise<any> {
  return await redis.hgetall(sessionId)
}

// Cache helpers
export async function cacheData(key: string, data: any, expirationInSeconds = 3600): Promise<void> {
  await redis.set(key, JSON.stringify(data), { ex: expirationInSeconds })
}

export async function getCachedData<T>(key: string): Promise<T | null> {
  const data = await redis.get(key)
  if (!data) return null
  return JSON.parse(data as string) as T
}

// Rate limiting
export async function checkRateLimit(identifier: string, limit: number, windowInSeconds: number): Promise<boolean> {
  const key = `ratelimit:${identifier}`
  const count = await redis.incr(key)

  // Set expiration on first request
  if (count === 1) {
    await redis.expire(key, windowInSeconds)
  }

  return count <= limit
}
