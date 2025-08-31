"use client"
import { ArrowLeft, FileText, AlertCircle, CheckCircle, XCircle, Scale, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TermsPageProps {
  onBack: () => void
}

export function TermsPage({ onBack }: TermsPageProps) {
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
              <FileText className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display font-bold text-4xl text-primary mb-2">Terms of Service</h1>
            <p className="text-muted-foreground text-lg">Please read these terms carefully</p>
            <p className="text-sm text-muted-foreground mt-2">Last updated: January 2025</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-card border border-border p-6 hover-lift">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
              <h2 className="font-display font-bold text-2xl text-foreground">Acceptable Use</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>You may use our Facebook video downloader service for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Downloading Facebook videos for personal use</li>
                <li>Educational and research purposes</li>
                <li>Content creation with proper attribution</li>
                <li>Backup of your own Facebook content</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border p-6 hover-lift">
            <div className="flex items-center mb-4">
              <XCircle className="w-6 h-6 text-red-500 mr-3" />
              <h2 className="font-display font-bold text-2xl text-foreground">Prohibited Activities</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>You must NOT use our service for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Copyright infringement or unauthorized distribution</li>
                <li>Commercial use without proper licensing</li>
                <li>Harassment, bullying, or harmful content</li>
                <li>Automated or bulk downloading (rate limiting applies)</li>
                <li>Any illegal activities or violations of Facebook's terms</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border p-6 hover-lift">
            <div className="flex items-center mb-4">
              <Scale className="w-6 h-6 text-primary mr-3" />
              <h2 className="font-display font-bold text-2xl text-foreground">Copyright & Intellectual Property</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>Important copyright information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All downloaded content remains property of original creators</li>
                <li>Respect copyright laws and fair use guidelines</li>
                <li>We are not responsible for copyright violations by users</li>
                <li>Report copyright infringement to us immediately</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border p-6 hover-lift">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-primary mr-3" />
              <h2 className="font-display font-bold text-2xl text-foreground">Service Limitations</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>Please be aware of these service limitations:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Service availability is not guaranteed 24/7</li>
                <li>Download speeds may vary based on server load</li>
                <li>Some videos may not be downloadable due to privacy settings</li>
                <li>We may implement rate limiting to prevent abuse</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border p-6 hover-lift">
            <div className="flex items-center mb-4">
              <Globe className="w-6 h-6 text-primary mr-3" />
              <h2 className="font-display font-bold text-2xl text-foreground">Disclaimer</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>Important disclaimers:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Service is provided "as is" without warranties</li>
                <li>We are not affiliated with Facebook or Meta</li>
                <li>Users are responsible for compliance with local laws</li>
                <li>We reserve the right to modify or discontinue service</li>
              </ul>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 p-6">
            <h3 className="font-display font-bold text-xl text-red-600 mb-2">Violation Consequences</h3>
            <p className="text-muted-foreground mb-4">Violation of these terms may result in:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>Temporary or permanent service suspension</li>
              <li>Legal action if necessary</li>
              <li>Reporting to relevant authorities</li>
            </ul>
          </div>

          <div className="bg-primary/10 border border-primary/20 p-6 text-center">
            <h3 className="font-display font-bold text-xl text-primary mb-2">Questions About Terms?</h3>
            <p className="text-muted-foreground mb-4">Contact us if you need clarification on any terms.</p>
            <Button onClick={onBack} className="hover-lift">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
