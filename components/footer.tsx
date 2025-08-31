"use client"

import { Heart, Download, Shield, Zap, Github, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FooterProps {
  onNavigate?: (page: string) => void
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const features = [
    { icon: Download, text: "High Quality Downloads" },
    { icon: Zap, text: "Lightning Fast" },
    { icon: Shield, text: "Safe & Secure" },
  ]

  const links = [
    { label: "Home", action: () => onNavigate?.("home") },
    { label: "Help", action: () => onNavigate?.("help") },
    { label: "About", action: () => onNavigate?.("about") },
    { label: "Contact", action: () => onNavigate?.("contact") },
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    {
      icon: () => (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: "https://facebook.com/kinghasanbd1",
      label: "Facebook",
    },
    { icon: Mail, href: "mailto:kinghasanbd1@gmail.com", label: "Email" },
  ]

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-glow">
                <span className="text-primary-foreground font-display font-bold text-lg">FB</span>
              </div>
              <h3 className="font-display font-bold text-xl text-card-foreground">Facebook Downloader</h3>
            </div>
            <p className="text-muted-foreground text-sm text-pretty">
              The most advanced and stylish Facebook video downloader. Download your favorite videos in high quality,
              fast and secure.
            </p>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>by Hasan Islam</span>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg text-card-foreground">Features</h4>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-card-foreground transition-colors"
                >
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg text-card-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {links.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2 group"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg text-card-foreground">Connect</h4>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Follow us for updates and support</p>
              <div className="flex space-x-2">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    onClick={() => window.open(social.href, "_blank")}
                  >
                    <social.icon className="w-4 h-4" />
                    <span className="sr-only">{social.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Animated Divider */}
        <div className="my-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-card px-4">
              <div className="flex space-x-2">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className="w-2 h-2 bg-primary animate-bounce"
                    style={{ animationDelay: `${index * 0.2}s`, animationDuration: "2s" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p>&copy; {currentYear} Facebook Video Downloader. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
            <button
              onClick={() => onNavigate?.("privacy")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate?.("terms")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onNavigate?.("disclaimer")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Disclaimer
            </button>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 animate-pulse" />
          <div
            className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-accent/10 to-primary/10 animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>
    </footer>
  )
}
