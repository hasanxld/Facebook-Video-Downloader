export interface TikTokMedia {
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

export interface TikTokVideoData {
  url: string
  title: string
  thumbnail: string
  duration: string
  source: string
  medias: TikTokMedia[]
  sid: string | null
}

interface ApiResponse {
  success: boolean
  data?: TikTokVideoData
  error?: string
  keyUsed?: string
}

export async function downloadTikTokVideo(url: string): Promise<TikTokVideoData> {
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
      throw new Error(result.error || "Failed to download video")
    }

    if (!result.data) {
      throw new Error("No video data received")
    }

    return result.data
  } catch (error) {
    console.error("Client API error:", error)
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
