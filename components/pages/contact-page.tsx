"use client"

import type React from "react"

import { ArrowLeft, Mail, MessageCircle, Send, MapPin, Clock, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface ContactPageProps {
  onBack: () => void
}

export function ContactPage({ onBack }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      value: "kinghasanbd1@gmail.com",
      action: "mailto:kinghasanbd1@gmail.com",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Chat with us on WhatsApp",
      value: "+8801744298642",
      action: "https://wa.me/8801744298642",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us directly",
      value: "+8801744298642",
      action: "tel:+8801744298642",
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

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
              <Mail className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-primary text-balance">Get in Touch</h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Have questions, suggestions, or need help? We'd love to hear from you!
            </p>
          </div>

          {/* Contact Methods */}
          <section className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="border-border text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent mx-auto flex items-center justify-center mb-4">
                    <method.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="font-display text-lg">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => {
                      if (method.action.startsWith("mailto:") || method.action.startsWith("tel:")) {
                        window.location.href = method.action
                      } else {
                        window.open(method.action, "_blank")
                      }
                    }}
                  >
                    {method.value}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Contact Form */}
          <section className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="font-display font-bold text-2xl text-foreground">Send us a Message</h2>
                <p className="text-muted-foreground text-pretty">
                  Fill out the form below and we'll get back to you as soon as possible. We typically respond within 24
                  hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your question or feedback..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full font-display font-semibold flex items-center gap-2" size="lg">
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="font-display font-bold text-2xl text-foreground">Other Ways to Reach Us</h2>
                <p className="text-muted-foreground text-pretty">
                  We're here to help! Choose the method that works best for you.
                </p>
              </div>

              <div className="space-y-4">
                <Card className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h3 className="font-display font-semibold text-sm">Office Location</h3>
                        <p className="text-muted-foreground text-sm">
                          Nilphamari, Rangpur City
                          <br />
                          Bangladesh
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h3 className="font-display font-semibold text-sm">Business Hours</h3>
                        <p className="text-muted-foreground text-sm">
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday: 10:00 AM - 4:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h3 className="font-display font-semibold text-sm">Response Time</h3>
                        <p className="text-muted-foreground text-sm">
                          Email: Within 24 hours
                          <br />
                          WhatsApp: Immediate
                          <br />
                          Phone: During business hours
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
