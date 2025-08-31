"use client"

import { useEffect, useState } from "react"
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { checkApiHealth } from "@/lib/tiktok-api"

interface ApiHealthData {
  overall: "healthy" | "degraded" | "unhealthy"
  keys: Array<{
    key: string
    status: "healthy" | "unhealthy" | "unknown"
    responseTime?: number
    error?: string
  }>
}

export function ApiStatus() {
  const [healthData, setHealthData] = useState<ApiHealthData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const checkHealth = async () => {
    setIsLoading(true)
    try {
      const data = await checkApiHealth()
      setHealthData(data)
      setLastChecked(new Date())
    } catch (error) {
      console.error("Failed to check API health:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkHealth()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "unhealthy":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "unknown":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getOverallColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600 bg-green-50 border-green-200"
      case "degraded":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "unhealthy":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-display flex items-center justify-between">
          API Status
          <Button variant="outline" size="sm" onClick={checkHealth} disabled={isLoading}>
            {isLoading ? "Checking..." : "Refresh"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {healthData && (
          <>
            <div className={`p-3 border text-center font-medium ${getOverallColor(healthData.overall)}`}>
              Overall Status: {healthData.overall.toUpperCase()}
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">API Keys</h4>
              {healthData.keys.map((key) => (
                <div key={key.key} className="flex items-center justify-between p-2 bg-muted">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(key.status)}
                    <span className="font-mono text-sm">{key.key}</span>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    {key.responseTime && <div>{key.responseTime}ms</div>}
                    {key.error && <div className="text-red-500">{key.error}</div>}
                  </div>
                </div>
              ))}
            </div>

            {lastChecked && (
              <p className="text-xs text-muted-foreground text-center">
                Last checked: {lastChecked.toLocaleTimeString()}
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
