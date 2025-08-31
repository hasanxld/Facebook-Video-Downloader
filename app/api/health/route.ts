import { NextResponse } from "next/server"
import { API_KEYS } from "@/lib/api-keys"

interface HealthCheck {
  key: string
  status: "healthy" | "unhealthy" | "unknown"
  responseTime?: number
  error?: string
}

interface HealthResponse {
  overall: "healthy" | "degraded" | "unhealthy"
  keys: HealthCheck[]
  timestamp: string
}

export async function GET(): Promise<NextResponse<HealthResponse>> {
  const healthChecks: HealthCheck[] = []
  const testUrl = "https://www.tiktok.com/@test/video/1234567890"

  for (const [keyName, apiKey] of Object.entries(API_KEYS)) {
    if (!apiKey) {
      healthChecks.push({
        key: keyName,
        status: "unknown",
        error: "API key not configured",
      })
      continue
    }

    try {
      const startTime = Date.now()

      const response = await fetch("https://snap-video3.p.rapidapi.com/download", {
        method: "POST",
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "snap-video3.p.rapidapi.com",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ url: testUrl }),
      })

      const responseTime = Date.now() - startTime

      if (response.status === 200 || response.status === 400) {
        // 400 is expected for invalid URL, but means API key works
        healthChecks.push({
          key: keyName,
          status: "healthy",
          responseTime,
        })
      } else if (response.status === 429) {
        healthChecks.push({
          key: keyName,
          status: "degraded",
          responseTime,
          error: "Rate limited",
        })
      } else if (response.status === 403) {
        healthChecks.push({
          key: keyName,
          status: "unhealthy",
          responseTime,
          error: "Forbidden - Invalid API key",
        })
      } else {
        healthChecks.push({
          key: keyName,
          status: "unhealthy",
          responseTime,
          error: `HTTP ${response.status}`,
        })
      }
    } catch (error) {
      healthChecks.push({
        key: keyName,
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  // Determine overall health
  const healthyCount = healthChecks.filter((check) => check.status === "healthy").length
  const totalConfigured = healthChecks.filter((check) => check.status !== "unknown").length

  let overall: "healthy" | "degraded" | "unhealthy"
  if (healthyCount === 0) {
    overall = "unhealthy"
  } else if (healthyCount < totalConfigured) {
    overall = "degraded"
  } else {
    overall = "healthy"
  }

  return NextResponse.json({
    overall,
    keys: healthChecks,
    timestamp: new Date().toISOString(),
  })
}
