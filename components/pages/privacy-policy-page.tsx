"use client"
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PrivacyPolicyPageProps {
  onBack: () => void
}

export function PrivacyPolicyPage({ onBack }: PrivacyPolicyPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4 hover-lift">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center animate-pulse-glow">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display font-bold text-4xl text-primary mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground text-lg">Your privacy is our priority</p>
            <p className="text-sm text-muted-foreground mt-2">Last updated: January 2025</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-card border border-border p-6 hover-lift">
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-primary mr-3" />
              <h2 className="font-display font-bold text-2xl text-foreground">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>We collect minimal information to provide our TikTok video downloading service:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>TikTok video URLs you submit for downloading</li>
                <li>Basic usage analytics (anonymous)</li>
                <li>Technical information like IP address and browser type</li>
                <li>No personal information or account data is stored</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border p-6 hover-lift">
            <div className="flex items-center mb-4">
              <Database className="w-6 h-6 text-primary mr-3" />
              <h2 className="font-display font-bold text-2xl text-foreground">How We Use Your Information</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>Your information is used solely for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Processing video download requests</li>
                <li>Improving our service quality</li>
                <li>Preventing abuse and ensuring security</li>
                <li>Analyzing usage patterns (anonymously)</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border p-6 hover-lift">
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-primary mr-3" />
              <h2 className="font-display font-bold text-2xl text-foreground">Data Security</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>We implement industry-standard security measures:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>HTTPS encryption for all data transmission</li>
                <li>Secure API key management</li>
                <li>Regular security audits and updates</li>
                <li>No long-term storage of user data</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border p-6 hover-lift">
            <div className="flex items-center mb-4">
              <UserCheck className="w-6 h-6 text-primary mr-3" />
              <h2 className="font-display font-bold text-2xl text-foreground">Your Rights</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use our service without creating an account</li>
                <li>Request information about data we collect</li>
                <li>Contact us about privacy concerns</li>
                <li>Stop using our service at any time</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border p-6 hover-lift">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-primary mr-3" />
              <h2 className="font-display font-bold text-2xl text-foreground">Third-Party Services</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our service uses third-party APIs for video processing. These services may have their own privacy
                policies:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>RapidAPI for TikTok video processing</li>
                <li>We do not share your data with unnecessary third parties</li>
                <li>All API communications are encrypted</li>
              </ul>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 p-6 text-center">
            <h3 className="font-display font-bold text-xl text-primary mb-2">Questions About Privacy?</h3>
            <p className="text-muted-foreground mb-4">
              Contact us if you have any privacy-related questions or concerns.
            </p>
            <Button onClick={onBack} className="hover-lift">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
