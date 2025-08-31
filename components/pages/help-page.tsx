"use client"

import { ArrowLeft, Download, Link, AlertCircle, CheckCircle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface HelpPageProps {
  onBack: () => void
}

export function HelpPage({ onBack }: HelpPageProps) {
  const faqs = [
    {
      question: "How do I download a Facebook video?",
      answer:
        "Simply paste the Facebook video URL into the input field on the home page and click the Download button. Our system will process the video and provide download options.",
    },
    {
      question: "What video formats are supported?",
      answer:
        "We support MP4 video downloads in various qualities (HD, Full HD) and MP3 audio extraction. You can choose the format that best suits your needs.",
    },
    {
      question: "Is it free to use?",
      answer: "Yes! Our Facebook video downloader is completely free to use. No registration or subscription required.",
    },
    {
      question: "Can I download private videos?",
      answer:
        "No, you can only download public Facebook videos. Private videos are not accessible through our service.",
    },
    {
      question: "Why is my download failing?",
      answer:
        "Downloads may fail due to invalid URLs, private videos, or temporary server issues. Make sure you're using a valid public Facebook video URL.",
    },
  ]

  const steps = [
    {
      icon: Link,
      title: "Copy Facebook URL",
      description: "Go to Facebook, find the video you want to download, and copy its URL from the share menu.",
    },
    {
      icon: Download,
      title: "Paste & Download",
      description: "Paste the URL into our downloader input field and click the Download button.",
    },
    {
      icon: CheckCircle,
      title: "Choose Quality",
      description: "Select your preferred video quality or audio format from the available options.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Page Title */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary mx-auto flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-primary text-balance">Help & Support</h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Everything you need to know about using our Facebook video downloader
            </p>
          </div>

          {/* How to Use Section */}
          <section className="space-y-8">
            <h2 className="font-display font-bold text-2xl text-foreground text-center">How to Use</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((step, index) => (
                <Card key={index} className="border-border">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-accent mx-auto flex items-center justify-center mb-4">
                      <step.icon className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <CardTitle className="font-display text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-pretty">{step.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-8">
            <h2 className="font-display font-bold text-2xl text-foreground text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-border">
                  <CardHeader>
                    <CardTitle className="font-display text-lg flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-pretty pl-8">{faq.answer}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Support Section */}
          <section className="bg-card p-8 border border-border text-center space-y-6">
            <h2 className="font-display font-bold text-2xl text-card-foreground">Still Need Help?</h2>
            <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
              If you couldn't find the answer to your question, feel free to reach out to us. We're here to help!
            </p>
            <Button onClick={() => onBack()} className="font-display font-semibold" size="lg">
              Contact Support
            </Button>
          </section>
        </div>
      </div>
    </div>
  )
}
