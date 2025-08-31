"use client"

import { X, Facebook, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  if (!isOpen) return null

  const contactLinks = [
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://facebook.com/SWEETxFIRE",
      color: "text-blue-600 hover:text-blue-700",
    },
    {
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
        </svg>
      ),
      label: "TikTok",
      href: "https://tiktok.com/@hasan_x_fire",
      color: "text-black hover:text-gray-700",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/8801744298642",
      color: "text-green-600 hover:text-green-700",
    },
  ]

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Profile Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4 bg-card border border-border z-50 animate-slide-in-right">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-display font-semibold text-lg text-card-foreground">Profile</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Photo & Name */}
          <div className="text-center space-y-4">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage
                src="https://trickbd.com/wp-content/uploads/2025/08/03/cropped-ssstik.io_1754157026441-300x300.jpeg"
                alt="Hasan Islam"
              />
              <AvatarFallback className="text-2xl font-display font-bold bg-primary text-primary-foreground">
                H
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl text-card-foreground">Hasan Islam</h3>
              <p className="text-muted-foreground text-sm text-pretty">
                Full-stack developer passionate about creating beautiful and functional web applications. Specialized in
                React, Next.js, and modern web technologies. Always learning and building something new.
              </p>
            </div>
          </div>

          {/* Contact Links */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-base text-card-foreground">Connect with me</h4>
            <div className="grid gap-2">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-muted hover:bg-accent/10 transition-colors border border-border"
                >
                  <div className={`${link.color}`}>
                    <link.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-card-foreground">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="pt-4 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              Thanks for using our TikTok downloader! Feel free to reach out if you have any questions.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
