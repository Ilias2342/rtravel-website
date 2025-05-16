import { put, list, del, type PutBlobResult } from "@vercel/blob"
import { nanoid } from "nanoid"

// Helper function to upload an image
export async function uploadImage(
  file: File,
  folder: "vehicles" | "destinations" | "documents" | "content",
): Promise<PutBlobResult> {
  const filename = `${folder}/${nanoid()}-${file.name}`
  return await put(filename, file, {
    access: "public",
  })
}

// Helper function to list images in a folder
export async function listImages(folder: "vehicles" | "destinations" | "documents" | "content", prefix?: string) {
  const folderPath = prefix ? `${folder}/${prefix}` : folder
  return await list({ prefix: folderPath })
}

// Helper function to delete an image
export async function deleteImage(url: string) {
  return await del(url)
}

// Helper to get file extension
export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
}

// Helper to check if file is an image
export function isImageFile(file: File): boolean {
  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
  return validTypes.includes(file.type)
}

// Helper to check if file is a PDF
export function isPdfFile(file: File): boolean {
  return file.type === "application/pdf"
}
