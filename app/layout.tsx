import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Poppins, Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Facebook Video Downloader - Download FB Videos in High Quality",
  description:
    "Download Facebook videos, reels, and posts in high quality for free. Fast, secure, and easy-to-use Facebook video downloader with no registration required.",
  keywords:
    "facebook video downloader, download facebook videos, fb video downloader, facebook reels downloader, facebook video download, social media downloader",
  authors: [{ name: "Facebook Video Downloader" }],
  creator: "Facebook Video Downloader",
  publisher: "Facebook Video Downloader",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://facebook-video-downloader.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Facebook Video Downloader - Download FB Videos in High Quality",
    description:
      "Download Facebook videos, reels, and posts in high quality for free. Fast, secure, and easy-to-use Facebook video downloader.",
    url: "https://facebook-video-downloader.vercel.app",
    siteName: "Facebook Video Downloader",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Facebook Video Downloader - Download FB Videos",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Facebook Video Downloader - Download FB Videos in High Quality",
    description:
      "Download Facebook videos, reels, and posts in high quality for free. Fast, secure, and easy-to-use Facebook video downloader.",
    images: ["/og-image.png"],
    creator: "@fbvideodownloader",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${dmSans.variable} ${poppins.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
