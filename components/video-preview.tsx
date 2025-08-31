"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { TikTokVideoData, TikTokMedia } from "@/lib/tiktok-api"

interface VideoPreviewProps {
  videoData: TikTokVideoData
  onDownload: (media: TikTokMedia) => void
  isDownloading?: boolean
}

export function VideoPreview({ videoData, onDownload, isDownloading = false }: VideoPreviewProps) {
  const videoMedias = videoData.medias.filter((media) => media.videoAvailable)
  const audioMedias = videoData.medias.filter((media) => media.audioAvailable && !media.videoAvailable)

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Video Thumbnail */}
          <div className="flex justify-center">
            <img
              src={videoData.thumbnail || "/placeholder.svg"}
              alt="Video thumbnail"
              className="w-full max-w-md h-64 object-cover bg-muted rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/video-thumbnail.png"
              }}
            />
          </div>

          {/* Download Options */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-base text-card-foreground">Download Options</h4>

            {/* Video Downloads */}
            {videoMedias.length > 0 && (
              <div className="space-y-2">
                <h5 className="font-medium text-sm text-muted-foreground">Video Files</h5>
                <div className="grid gap-2">
                  {videoMedias.map((media, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary flex items-center justify-center rounded">
                          <span className="text-primary-foreground text-xs font-bold">
                            {media.extension.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-card-foreground">{media.quality} Quality</p>
                          <p className="text-xs text-muted-foreground">{media.formattedSize || "Size unknown"}</p>
                        </div>
                      </div>

                      <Button
                        onClick={() => onDownload(media)}
                        disabled={isDownloading}
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Audio Downloads */}
            {audioMedias.length > 0 && (
              <div className="space-y-2">
                <h5 className="font-medium text-sm text-muted-foreground">Audio Files</h5>
                <div className="grid gap-2">
                  {audioMedias.map((media, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent flex items-center justify-center rounded">
                          <span className="text-accent-foreground text-xs font-bold">
                            {media.extension.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-card-foreground">{media.quality} Audio</p>
                          <p className="text-xs text-muted-foreground">{media.formattedSize || "Size unknown"}</p>
                        </div>
                      </div>

                      <Button
                        variant="secondary"
                        onClick={() => onDownload(media)}
                        disabled={isDownloading}
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
