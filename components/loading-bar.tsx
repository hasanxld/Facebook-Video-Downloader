"use client"

import { useEffect, useState } from "react"

interface LoadingBarProps {
  isLoading: boolean
  className?: string
}

export function LoadingBar({ isLoading, className = "" }: LoadingBarProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true)
      setProgress(0)

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev + Math.random() * 2
          if (prev >= 70) return prev + Math.random() * 5
          if (prev >= 30) return prev + Math.random() * 8
          return prev + Math.random() * 15
        })
      }, 150)

      return () => clearInterval(interval)
    } else {
      setProgress(100)
      setTimeout(() => {
        setIsVisible(false)
        setProgress(0)
      }, 500)
    }
  }, [isLoading])

  if (!isVisible) return null

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div className="h-1 bg-muted/30 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-300 ease-out relative overflow-hidden"
          style={{ width: `${Math.min(progress, 100)}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  )
}
