"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Clipboard, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { isValidFacebookUrl } from "@/lib/utils"

interface UrlInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isLoading?: boolean
}

export function UrlInput({ value, onChange, onSubmit, isLoading = false }: UrlInputProps) {
  const [isValidUrl, setIsValidUrl] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      onChange(text)
      validateUrl(text)
    } catch (error) {
      console.error("Failed to read clipboard:", error)
    }
  }

  const handleClear = () => {
    onChange("")
    setIsValidUrl(true)
    inputRef.current?.focus()
  }

  const validateUrl = (url: string) => {
    if (url.trim() === "") {
      setIsValidUrl(true)
      return
    }
    setIsValidUrl(isValidFacebookUrl(url))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
    validateUrl(newValue)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim() && isValidUrl && !isLoading) {
      onSubmit()
    }
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Paste Facebook video URL here..."
          value={value}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className={`pr-12 py-4 text-base h-14 ${!isValidUrl ? "border-destructive focus:ring-destructive" : ""}`}
          disabled={isLoading}
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {value.trim() ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-8 w-8 p-0 hover:bg-destructive/10"
              disabled={isLoading}
            >
              <X className="w-4 h-4 text-destructive" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handlePaste}
              className="h-8 w-8 p-0 hover:bg-accent/10"
              disabled={isLoading}
            >
              <Clipboard className="w-4 h-4 text-muted-foreground" />
            </Button>
          )}
        </div>
      </div>

      {!isValidUrl && value.trim() && (
        <p className="text-sm text-destructive font-medium">Please enter a valid Facebook URL</p>
      )}
    </div>
  )
}
