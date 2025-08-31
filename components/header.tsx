"use client"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface HeaderProps {
  onMenuClick: () => void
  onProfileClick: () => void
  onNavigate?: (page: string) => void
}

export function Header({ onMenuClick, onProfileClick, onNavigate }: HeaderProps) {
  return (
    <>
      {/* Mobile Header - Fixed */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-glow flex-shrink-0">
              <span className="text-primary-foreground font-display font-bold text-sm">FB</span>
            </div>
            <h1 className="font-display font-bold text-lg text-primary truncate">Facebook Downloader</h1>
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={onProfileClick}
              className="flex items-center space-x-2 px-3 hover-lift"
            >
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src="https://trickbd.com/wp-content/uploads/2025/08/03/cropped-ssstik.io_1754157026441-300x300.jpeg"
                  alt="Profile"
                />
                <AvatarFallback className="text-xs">H</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Profile</span>
            </Button>

            <Button variant="ghost" size="sm" onClick={onMenuClick} className="hover-lift">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Desktop Header - Not Fixed */}
      <header className="hidden md:block bg-background border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-glow flex-shrink-0">
                <span className="text-primary-foreground font-display font-bold text-lg">FB</span>
              </div>
              <h1 className="font-display font-bold text-2xl text-primary truncate">Facebook Video Downloader</h1>
            </div>

            <nav className="flex items-center space-x-6">
              <Button
                variant="ghost"
                onClick={() => onNavigate?.("home")}
                className="font-medium text-foreground hover:text-primary transition-colors hover-lift"
              >
                Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => onNavigate?.("help")}
                className="font-medium text-muted-foreground hover:text-primary transition-colors hover-lift"
              >
                Help
              </Button>
              <Button
                variant="ghost"
                onClick={() => onNavigate?.("about")}
                className="font-medium text-muted-foreground hover:text-primary transition-colors hover-lift"
              >
                About
              </Button>
              <Button
                variant="ghost"
                onClick={() => onNavigate?.("contact")}
                className="font-medium text-muted-foreground hover:text-primary transition-colors hover-lift"
              >
                Contact
              </Button>

              <Button variant="ghost" onClick={onProfileClick} className="flex items-center space-x-2 px-4 hover-lift">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src="https://trickbd.com/wp-content/uploads/2025/08/03/cropped-ssstik.io_1754157026441-300x300.jpeg"
                    alt="Profile"
                  />
                  <AvatarFallback>H</AvatarFallback>
                </Avatar>
                <span className="font-medium">Profile</span>
              </Button>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
