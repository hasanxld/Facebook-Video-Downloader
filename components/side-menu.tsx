"use client"

import { X, Home, HelpCircle, Info, Mail, Settings, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (page: string) => void
}

export function SideMenu({ isOpen, onClose, onNavigate }: SideMenuProps) {
  const mainMenuItems = [
    { icon: Home, label: "Home", page: "home", description: "Main downloader page" },
    { icon: Download, label: "Downloads", page: "downloads", description: "Your download history" },
  ]

  const supportMenuItems = [
    { icon: HelpCircle, label: "Help", page: "help", description: "Get help and tutorials" },
    { icon: Info, label: "About", page: "about", description: "About this application" },
    { icon: Mail, label: "Contact", page: "contact", description: "Get in touch with us" },
  ]

  const settingsMenuItems = [{ icon: Settings, label: "Settings", page: "settings", description: "App preferences" }]

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={onClose} />

      {/* Side Menu */}
      <div className="fixed top-0 right-0 h-full w-80 bg-card border-l border-border z-50 animate-slide-in-right md:hidden overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-border bg-card sticky top-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent flex items-center justify-center rounded">
              <span className="text-primary-foreground font-display font-bold text-sm">FB</span>
            </div>
            <h2 className="font-display font-semibold text-lg text-card-foreground">Menu</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Main Navigation */}
          <div className="space-y-2">
            <h3 className="font-display font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Navigation
            </h3>
            <nav className="space-y-1">
              {mainMenuItems.map((item) => (
                <Button
                  key={item.page}
                  variant="ghost"
                  className="w-full justify-start space-x-3 py-3 px-4 text-left h-auto"
                  onClick={() => {
                    onNavigate(item.page)
                    onClose()
                  }}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                </Button>
              ))}
            </nav>
          </div>

          <Separator />

          {/* Support Section */}
          <div className="space-y-2">
            <h3 className="font-display font-medium text-sm text-muted-foreground uppercase tracking-wide">Support</h3>
            <nav className="space-y-1">
              {supportMenuItems.map((item) => (
                <Button
                  key={item.page}
                  variant="ghost"
                  className="w-full justify-start space-x-3 py-3 px-4 text-left h-auto"
                  onClick={() => {
                    onNavigate(item.page)
                    onClose()
                  }}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                </Button>
              ))}
            </nav>
          </div>

          <Separator />

          {/* Settings Section */}
          <div className="space-y-2">
            <h3 className="font-display font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Preferences
            </h3>
            <nav className="space-y-1">
              {settingsMenuItems.map((item) => (
                <Button
                  key={item.page}
                  variant="ghost"
                  className="w-full justify-start space-x-3 py-3 px-4 text-left h-auto"
                  onClick={() => {
                    onNavigate(item.page)
                    onClose()
                  }}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                </Button>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-border">
            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground">Facebook Video Downloader</p>
              <p className="text-xs text-muted-foreground">Version 1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
