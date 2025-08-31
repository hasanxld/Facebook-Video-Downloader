export interface FacebookMedia {
  url: string
  quality: string
  extension: string
  size: number
  formattedSize: string
  videoAvailable: boolean
  audioAvailable: boolean
  chunked: boolean
  cached: boolean
}

export interface FacebookVideoData {
  url: string
  title: string
  thumbnail: string
  duration: string
  source: string
  medias: FacebookMedia[]
  sid: string | null
}

interface ApiResponse {
  success: boolean
  data?: FacebookVideoData
  error?: string
  keyUsed?: string
}

export async function downloadFacebookVideo(url: string): Promise<FacebookVideoData> {
  try {
    const response = await fetch("/api/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })

    const result: ApiResponse = await response.json()

    if (!result.success) {
      throw new Error(result.error || "Failed to download Facebook video")
    }

    if (!result.data) {
      throw new Error("No Facebook video data received")
    }

    return result.data
  } catch (error) {
    console.error("Facebook API error:", error)
    throw error instanceof Error ? error : new Error("Unknown error occurred")
  }
}

export async function checkApiHealth(): Promise<{
  overall: "healthy" | "degraded" | "unhealthy"
  keys: Array<{
    key: string
    status: "healthy" | "unhealthy" | "unknown"
    responseTime?: number
    error?: string
  }>
}> {
  try {
    const response = await fetch("/api/health")
    const result = await response.json()
    return result
  } catch (error) {
    console.error("Health check error:", error)
    return {
      overall: "unhealthy",
      keys: [],
    }
  }
}
