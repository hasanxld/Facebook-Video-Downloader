"use client"

import { useState, useEffect } from "react"

interface DownloadLoadingProps {
  message?: string
}

export function DownloadLoading({ message = "Processing your request..." }: DownloadLoadingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [dots, setDots] = useState("")

  const steps = [
    "Analyzing TikTok URL...",
    "Fetching video data...",
    "Processing media files...",
    "Preparing download...",
  ]

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 2000)

    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return ""
        return prev + "."
      })
    }, 500)

    return () => {
      clearInterval(stepInterval)
      clearInterval(dotsInterval)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-muted/30"></div>
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-primary border-t-transparent animate-spin"></div>
        <div className="absolute top-2 left-2 w-16 h-16 border-4 border-accent/50 border-b-transparent animate-spin-reverse"></div>
        <div
          className="absolute top-4 left-4 w-12 h-12 border-4 border-secondary/30 border-r-transparent animate-spin"
          style={{ animationDuration: "3s" }}
        ></div>
      </div>

      <div className="text-center space-y-3">
        <p className="font-display font-medium text-lg text-foreground">{message}</p>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground min-h-[20px]">
            {steps[currentStep]}
            {dots}
          </p>

          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 transition-all duration-300 ${
                  index === currentStep ? "bg-primary scale-125" : index < currentStep ? "bg-accent" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="w-2 h-2 bg-primary animate-bounce"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 animate-pulse pointer-events-none" />
    </div>
  )
}
