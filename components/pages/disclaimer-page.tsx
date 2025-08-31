"use client"
import { ArrowLeft, AlertTriangle, Shield, Info, ExternalLink, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DisclaimerPageProps {
  onBack: () => void
}

export function DisclaimerPage({ onBack }: DisclaimerPageProps) {
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
              <AlertTriangle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display font-bold text-4xl text-primary mb-2">Disclaimer</h1>
            <p className="text-muted-foreground text-lg">Important information about our service</p>
            <p className="text-sm text-muted-foreground mt-2">Last updated: January 2025</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-yellow-500/10 border border-yellow-500/20 p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3" />
              <h2 className="font-display font-bold text-2xl text-foreground">General Disclaimer</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p className="font-medium text-yellow-700">
                This service is provided for educational and personal use only.
              </p>
              <p>
                We are not affiliated with, endorsed by, or connected to TikTok, ByteDance, or any of their
                subsidiaries. This is an independent tool created to help users download TikTok videos for legitimate
                purposes.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border p-6 hover-lift">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-primary mr-3" />
              <h2 className="font-display font-bold text-2xl text-foreground">Service Reliability</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>While we strive to provide reliable service:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We cannot guarantee 100% uptime or availability</li>
                <li>Download success depends on TikTok's API and policies</li>
                <li>Service may be interrupted for maintenance or updates</li>
                <li>We are not responsible for any data loss or service interruption</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border p-6 hover-lift">
            <div className="flex items-center mb-4">
              <ExternalLink className="w-6 h-6 text-primary mr-3" />
              <h2 className="font-display font-bold text-2xl text-foreground">Third-Party Content</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>Regarding downloaded content:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All content belongs to original creators and TikTok</li>
                <li>We do not host, store, or distribute any TikTok content</li>
                <li>Users are responsible for respecting copyright and intellectual property</li>
                <li>We are not liable for any copyright infringement by users</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border p-6 hover-lift">
            <div className="flex items-center mb-4">
              <Info className="w-6 h-6 text-primary mr-3" />
              <h2 className="font-display font-bold text-2xl text-foreground">Legal Compliance</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>Users must ensure compliance with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Local copyright and intellectual property laws</li>
                <li>TikTok's Terms of Service and Community Guidelines</li>
                <li>Fair use and educational use guidelines</li>
                <li>Any applicable regional or international laws</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border p-6 hover-lift">
            <div className="flex items-center mb-4">
              <Zap className="w-6 h-6 text-primary mr-3" />
              <h2 className="font-display font-bold text-2xl text-foreground">Technical Limitations</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>Please be aware of technical limitations:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Some videos may not be downloadable due to privacy settings</li>
                <li>Download quality depends on original video quality</li>
                <li>Processing time varies based on video length and server load</li>
                <li>Rate limiting may apply to prevent service abuse</li>
              </ul>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 p-6">
            <h3 className="font-display font-bold text-xl text-red-600 mb-2">Limitation of Liability</h3>
            <p className="text-muted-foreground mb-4">We shall not be liable for:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>Any direct, indirect, or consequential damages</li>
              <li>Loss of data, profits, or business opportunities</li>
              <li>Service interruptions or technical failures</li>
              <li>Actions taken by users in violation of terms</li>
            </ul>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 p-6">
            <h3 className="font-display font-bold text-xl text-blue-600 mb-2">Contact for Legal Issues</h3>
            <p className="text-muted-foreground mb-4">For legal concerns, copyright issues, or takedown requests:</p>
            <p className="text-muted-foreground">Email: kinghasanbd1@gmail.com</p>
            <p className="text-muted-foreground">Phone: +8801744298642</p>
          </div>

          <div className="bg-primary/10 border border-primary/20 p-6 text-center">
            <h3 className="font-display font-bold text-xl text-primary mb-2">Questions About This Disclaimer?</h3>
            <p className="text-muted-foreground mb-4">Contact us if you need clarification on any disclaimers.</p>
            <Button onClick={onBack} className="hover-lift">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
