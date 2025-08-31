import { type NextRequest, NextResponse } from "next/server"
import { isValidFacebookUrl } from "@/lib/utils"

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

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await request.json()
    const { url } = body

    // Validate input
    if (!url || typeof url !== "string") {
      return NextResponse.json({ success: false, error: "URL is required" }, { status: 400 })
    }

    if (!isValidFacebookUrl(url)) {
      return NextResponse.json({ success: false, error: "Invalid Facebook URL format" }, { status: 400 })
    }

    const apiUrl = `https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php?url=${encodeURIComponent(url)}`
    let attempts = 0
    const maxAttempts = 4

    while (attempts < maxAttempts) {
      try {
        const apiKey = "e03c50a35amsh2b7c814e0502e9ep1a653ejsn6e4ad838eb55"

        console.log(`[API] Attempt ${attempts + 1} using Facebook API`)

        const options = {
          method: "GET",
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": "facebook-reel-and-video-downloader.p.rapidapi.com",
          },
        }

        const response = await fetch(apiUrl, options)

        if (response.ok) {
          const result = await response.json()

          if (!result.success || !result.title || !result.links) {
            throw new Error("Invalid response format from Facebook API")
          }

          const transformedData: FacebookVideoData = {
            url: url,
            title: result.title,
            thumbnail: result.thumbnail || "",
            duration: "Unknown", // Facebook API doesn't provide duration
            source: "Facebook",
            medias: [
              {
                url: result.links["Download High Quality"] || result.links["Download Low Quality"],
                quality: result.links["Download High Quality"] ? "High Quality" : "Low Quality",
                extension: "mp4",
                size: 0, // Size not provided by Facebook API
                formattedSize: "Unknown",
                videoAvailable: true,
                audioAvailable: true,
                chunked: false,
                cached: false,
              },
              ...(result.links["Download Low Quality"] && result.links["Download High Quality"]
                ? [
                    {
                      url: result.links["Download Low Quality"],
                      quality: "Low Quality",
                      extension: "mp4",
                      size: 0,
                      formattedSize: "Unknown",
                      videoAvailable: true,
                      audioAvailable: true,
                      chunked: false,
                      cached: false,
                    },
                  ]
                : []),
            ],
            sid: null,
          }

          console.log(`[API] Success with Facebook API`)

          return NextResponse.json({
            success: true,
            data: transformedData,
            keyUsed: "Facebook API",
          })
        } else if (response.status === 429) {
          console.log(`[API] Rate limit hit, retrying...`)
          attempts++
          await new Promise((resolve) => setTimeout(resolve, 1000))
          continue
        } else if (response.status === 403) {
          console.log(`[API] Forbidden, retrying...`)
          attempts++
          continue
        } else {
          const errorText = await response.text()
          throw new Error(`API request failed with status: ${response.status} - ${errorText}`)
        }
      } catch (error) {
        console.error(`[API] Error:`, error)
        attempts++

        if (attempts >= maxAttempts) {
          return NextResponse.json(
            {
              success: false,
              error: "Facebook API failed. Please try again later.",
            },
            { status: 503 },
          )
        }

        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to download video after all attempts",
      },
      { status: 503 },
    )
  } catch (error) {
    console.error("[API] Unexpected error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
