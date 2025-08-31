"use client"

import { useEffect, useState } from "react"
import { CheckCircle, XCircle, AlertCircle, X, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export type NotificationType = "success" | "error" | "warning" | "info"

interface NotificationProps {
  type: NotificationType
  title: string
  message: string
  isVisible: boolean
  onClose: () => void
  autoClose?: boolean
  duration?: number
}

export function Notification({
  type,
  title,
  message,
  isVisible,
  onClose,
  autoClose = true,
  duration = 5000,
}: NotificationProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
      setProgress(100)

      if (autoClose) {
        const progressInterval = setInterval(() => {
          setProgress((prev) => Math.max(0, prev - 100 / (duration / 100)))
        }, 100)

        const timer = setTimeout(() => {
          setIsAnimating(false)
          setTimeout(onClose, 300)
        }, duration)

        return () => {
          clearInterval(progressInterval)
          clearTimeout(timer)
        }
      }
    }
  }, [isVisible, autoClose, duration, onClose])

  if (!isVisible) return null

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  }

  const colors = {
    success: "bg-green-50 border-green-200 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-100",
    error: "bg-red-50 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-100",
    warning:
      "bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-100",
    info: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100",
  }

  const iconColors = {
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
  }

  const progressColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  }

  const Icon = icons[type]

  return (
    <div className="fixed top-20 md:top-4 right-4 z-50">
      <div
        className={`max-w-sm w-full border shadow-lg transition-all duration-300 ${
          isAnimating ? "animate-slide-in-right" : "animate-slide-out-right"
        } ${colors[type]}`}
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="relative">
              <Icon
                className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColors[type]} transition-transform duration-200 hover:scale-110`}
              />
              {type === "success" && <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-display font-semibold text-sm">{title}</h4>
              <p className="text-sm mt-1 text-pretty opacity-90">{message}</p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsAnimating(false)
                setTimeout(onClose, 300)
              }}
              className="h-6 w-6 p-0 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {autoClose && (
          <div className="h-1 bg-black/10 dark:bg-white/10">
            <div
              className={`h-full transition-all duration-100 ease-linear ${progressColors[type]}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
