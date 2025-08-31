import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidTikTokUrl(url: string): boolean {
  const tikTokPatterns = [
    /^https?:\/\/(www\.)?tiktok\.com\/@[\w.-]+\/video\/\d+/,
    /^https?:\/\/vm\.tiktok\.com\/[\w]+/,
    /^https?:\/\/vt\.tiktok\.com\/[\w]+/,
    /^https?:\/\/m\.tiktok\.com\/v\/\d+/,
  ]

  return tikTokPatterns.some((pattern) => pattern.test(url))
}

export function isValidFacebookUrl(url: string): boolean {
  return url.toLowerCase().includes("facebook")
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function formatDuration(duration: string): string {
  // Convert duration from "00:44" format to readable format
  const parts = duration.split(":")
  const minutes = Number.parseInt(parts[0])
  const seconds = Number.parseInt(parts[1])

  if (minutes === 0) {
    return `${seconds}s`
  }

  return `${minutes}m ${seconds}s`
}
