"use client"

import { useState, useEffect } from "react"
import { Download, Calendar, Trash2, Eye, ArrowLeft, Search, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface FetchedVideo {
  id: string
  title: string
  thumbnail: string
  url: string
  fetchedAt: string
  videoDetails: {
    duration: string
    views: string
    author: string
    description: string
  }
}

interface DownloadedVideo {
  id: string
  title: string
  thumbnail: string
  url: string
  downloadedAt: string
  fileSize: string
  quality: string
  format: string
  videoDetails: {
    duration: string
    views: string
    author: string
    description: string
  }
}

const STORAGE_KEYS = {
  FETCHED_VIDEOS: "facebook_fetched_videos",
  DOWNLOADED_VIDEOS: "facebook_downloaded_videos",
}

const getStoredVideos = (key: string): any[] => {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const setStoredVideos = (key: string, videos: any[]) => {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, JSON.stringify(videos))
  } catch (error) {
    console.error("Failed to save to localStorage:", error)
  }
}

export const addFetchedVideo = (video: any) => {
  const newVideo = {
    ...video,
    id: Date.now().toString(),
    fetchedAt: new Date().toISOString(),
  }
  const existing = getStoredVideos(STORAGE_KEYS.FETCHED_VIDEOS)
  const updated = [newVideo, ...existing]
  setStoredVideos(STORAGE_KEYS.FETCHED_VIDEOS, updated)
}

export const addDownloadedVideo = (video: any) => {
  const newVideo = {
    ...video,
    id: Date.now().toString(),
    downloadedAt: new Date().toISOString(),
  }
  const existing = getStoredVideos(STORAGE_KEYS.DOWNLOADED_VIDEOS)
  const updated = [newVideo, ...existing]
  setStoredVideos(STORAGE_KEYS.DOWNLOADED_VIDEOS, updated)
}

interface DownloadsPageProps {
  onBack?: () => void
}

export function DownloadsPage({ onBack }: DownloadsPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [fetchedVideos, setFetchedVideos] = useState<any[]>([])
  const [downloadedVideos, setDownloadedVideos] = useState<any[]>([])
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null)
  const [showClearDialog, setShowClearDialog] = useState(false)

  useEffect(() => {
    setFetchedVideos(getStoredVideos(STORAGE_KEYS.FETCHED_VIDEOS))
    setDownloadedVideos(getStoredVideos(STORAGE_KEYS.DOWNLOADED_VIDEOS))
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const deleteFetchedVideo = (id: string) => {
    const updated = fetchedVideos.filter((video) => video.id !== id)
    setFetchedVideos(updated)
    setStoredVideos(STORAGE_KEYS.FETCHED_VIDEOS, updated)
  }

  const deleteDownloadedVideo = (id: string) => {
    const updated = downloadedVideos.filter((video) => video.id !== id)
    setDownloadedVideos(updated)
    setStoredVideos(STORAGE_KEYS.DOWNLOADED_VIDEOS, updated)
  }

  const clearAllHistory = () => {
    setFetchedVideos([])
    setDownloadedVideos([])
    setStoredVideos(STORAGE_KEYS.FETCHED_VIDEOS, [])
    setStoredVideos(STORAGE_KEYS.DOWNLOADED_VIDEOS, [])
    setShowClearDialog(false)
  }

  const filteredFetchedVideos = fetchedVideos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredDownloadedVideos = downloadedVideos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="md:hidden h-16" />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          {/* Header with Back Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {onBack && (
                <Button variant="ghost" onClick={onBack} className="hover-lift">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <div>
                <h1 className="font-display font-bold text-3xl text-foreground">Downloads</h1>
                <p className="text-muted-foreground">Manage your Facebook video history</p>
              </div>
            </div>
            <Button
              variant="destructive"
              onClick={() => setShowClearDialog(true)}
              disabled={fetchedVideos.length === 0 && downloadedVideos.length === 0}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear History
            </Button>
          </div>

          {/* Search Bar */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Video Fetching ({filteredFetchedVideos.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredFetchedVideos.length === 0 ? (
                <div className="text-center py-8">
                  <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No fetched videos found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredFetchedVideos.map((video) => (
                    <div
                      key={video.id}
                      className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-all duration-200"
                    >
                      {/* Thumbnail */}
                      <div className="flex-shrink-0">
                        <img
                          src={video.thumbnail || "/placeholder.svg?height=64&width=64&query=video thumbnail"}
                          alt="Video thumbnail"
                          className="w-16 h-16 object-cover rounded-lg bg-muted"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate mb-1">{video.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(video.fetchedAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedVideo(video)}>
                          <Eye className="w-4 h-4 mr-1" />
                          View Info
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteFetchedVideo(video.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Video Downloads ({filteredDownloadedVideos.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredDownloadedVideos.length === 0 ? (
                <div className="text-center py-8">
                  <Download className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No downloaded videos found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredDownloadedVideos.map((video) => (
                    <div
                      key={video.id}
                      className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-all duration-200"
                    >
                      {/* Thumbnail */}
                      <div className="flex-shrink-0">
                        <img
                          src={video.thumbnail || "/placeholder.svg?height=64&width=64&query=video thumbnail"}
                          alt="Video thumbnail"
                          className="w-16 h-16 object-cover rounded-lg bg-muted"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate mb-1">{video.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(video.downloadedAt)}</span>
                          </div>
                          <span className="font-medium">{video.fileSize}</span>
                          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 text-xs font-semibold shadow-sm border border-blue-500">
                            {video.format}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {video.quality}
                          </Badge>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedVideo(video)}>
                          <Eye className="w-4 h-4 mr-1" />
                          View Info
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteDownloadedVideo(video.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Video Details</DialogTitle>
          </DialogHeader>
          {selectedVideo && (
            <div className="space-y-4">
              <div className="flex space-x-4">
                <img
                  src={selectedVideo.thumbnail || "/placeholder.svg?height=120&width=120&query=video thumbnail"}
                  alt="Video thumbnail"
                  className="w-32 h-32 object-cover rounded-lg bg-muted"
                />
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-lg">{selectedVideo.title}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium">Author:</span> {selectedVideo.videoDetails.author}
                    </p>
                    <p>
                      <span className="font-medium">Duration:</span> {selectedVideo.videoDetails.duration}
                    </p>
                    <p>
                      <span className="font-medium">Views:</span> {selectedVideo.videoDetails.views}
                    </p>
                    {selectedVideo.fileSize && (
                      <>
                        <p>
                          <span className="font-medium">File Size:</span> {selectedVideo.fileSize}
                        </p>
                        <p>
                          <span className="font-medium">Quality:</span> {selectedVideo.quality}
                        </p>
                        <p>
                          <span className="font-medium">Format:</span> {selectedVideo.format}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedVideo.videoDetails.description}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">URL</h4>
                <p className="text-sm text-muted-foreground break-all">{selectedVideo.url}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setSelectedVideo(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Clear All History
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to clear all video history? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowClearDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={clearAllHistory}>
              Clear All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
