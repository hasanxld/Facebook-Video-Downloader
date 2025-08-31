"use client"

import { ArrowLeft, Download, Shield, Zap, Heart, Users, Globe, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AboutPageProps {
  onBack: () => void
}

export function AboutPage({ onBack }: AboutPageProps) {
  const features = [
    {
      icon: Download,
      title: "High Quality Downloads",
      description:
        "Download Facebook videos in their original quality with multiple format options including HD and Full HD.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Our advanced API system ensures quick processing and reliable downloads with minimal waiting time.",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description:
        "No registration required. We don't store your data or downloaded content. Your privacy is protected.",
    },
    {
      icon: Globe,
      title: "Always Available",
      description:
        "Multiple API endpoints ensure maximum uptime and availability whenever you need to download videos.",
    },
  ]

  const stats = [
    { label: "Videos Downloaded", value: "1M+", icon: Download },
    { label: "Happy Users", value: "50K+", icon: Users },
    { label: "Countries Served", value: "100+", icon: Globe },
    { label: "Uptime", value: "99.9%", icon: Zap },
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
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-primary text-balance">
              About Our Platform
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              We're passionate about creating the best Facebook video downloading experience for users worldwide
            </p>
          </div>

          {/* Mission Section */}
          <section className="bg-card p-8 border border-border text-center space-y-6">
            <h2 className="font-display font-bold text-2xl text-card-foreground">Our Mission</h2>
            <p className="text-muted-foreground text-pretty max-w-3xl mx-auto text-lg leading-relaxed">
              We believe that everyone should have easy access to download and save their favorite Facebook content. Our
              platform provides a simple, fast, and secure way to download Facebook videos without any hassle. We're
              committed to maintaining the highest quality standards while keeping our service completely free.
            </p>
          </section>

          {/* Features Section */}
          <section className="space-y-8">
            <h2 className="font-display font-bold text-2xl text-foreground text-center">Why Choose Us</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-border">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <CardTitle className="font-display text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-pretty">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="space-y-8">
            <h2 className="font-display font-bold text-2xl text-foreground text-center">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-3">
                  <div className="w-12 h-12 bg-primary mx-auto flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-display font-bold text-2xl text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Section */}
          <section className="bg-card p-8 border border-border space-y-6">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-secondary mx-auto flex items-center justify-center">
                <Code className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h2 className="font-display font-bold text-2xl text-card-foreground">Built with Modern Technology</h2>
              <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
                Our platform is built using cutting-edge web technologies including Next.js, React, and TypeScript. We
                use multiple API endpoints to ensure reliability and implement advanced security measures to protect
                user privacy.
              </p>
            </div>
          </section>

          {/* Team Section */}
          <section className="text-center space-y-6">
            <h2 className="font-display font-bold text-2xl text-foreground">Meet the Developer</h2>
            <div className="max-w-md mx-auto bg-card p-6 border border-border">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-primary mx-auto flex items-center justify-center">
                  <span className="text-primary-foreground font-display font-bold text-2xl">HI</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl text-card-foreground">Hasan Islam</h3>
                  <p className="text-muted-foreground text-sm text-pretty">
                    Full-stack developer passionate about creating beautiful and functional web applications.
                    Specialized in React, Next.js, and modern web technologies.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
