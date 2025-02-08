"use client"

import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface Video {
  id: number
  title: string
  description: string
  src: string
  username: string
  likes: string
  comments: string
  userAvatar: string
}

interface VideoListProps {
  videos: Video[]
  currentVideoIndex: number
  onVideoSelect: (index: number) => void
}

export default function VideoList({ videos, currentVideoIndex, onVideoSelect }: VideoListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const currentItem = itemRefs.current[currentVideoIndex]
    if (currentItem && scrollRef.current) {
      currentItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }
  }, [currentVideoIndex])

  return (
    <ScrollArea className="h-[calc(100vh-2rem)] rounded-md border">
      <div ref={scrollRef} className="p-4 space-y-4">
        {videos.map((video, index) => (
          <Card
            key={video.id}
            ref={(el) => {
              itemRefs.current[index] = el // ✅ Fix: Removed the return statement
            }}
            className={`cursor-pointer transition-colors ${
              index === currentVideoIndex ? "bg-primary/10 border-primary" : "hover:bg-muted"
            }`}
            onClick={() => onVideoSelect(index)}
          >
            <CardHeader>
              <CardTitle className="text-sm">{video.title}</CardTitle>
              <CardDescription className="text-xs line-clamp-2">{video.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}
