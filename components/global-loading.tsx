"use client"

import { useEffect, useState } from "react"

interface GlobalLoadingProps {
  isLoading: boolean
  message?: string
}

export function GlobalLoading({ isLoading, message = "Loading..." }: GlobalLoadingProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      setProgress(0)
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return prev
          return prev + Math.random() * 10
        })
      }, 200)

      return () => clearInterval(interval)
    } else {
      setProgress(100)
    }
  }, [isLoading])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        {/* Animated logo/spinner */}
        <div className="relative mx-auto w-16 h-16">
          <div className="absolute inset-0 border-4 border-primary/20"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent animate-spin"></div>
          <div className="absolute inset-2 border-4 border-accent/30 border-b-transparent animate-spin-reverse"></div>
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <h3 className="font-display font-semibold text-xl text-foreground">{message}</h3>
          <div className="w-64 h-2 bg-muted mx-auto">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">{Math.round(progress)}% complete</p>
        </div>
      </div>
    </div>
  )
}
