"use client"

import { useState } from "react"
import VideoPlayer from "../../../components/VideoPlayer"

const videos = [
  {
    id: 1,
    src: "/video1.mp4",
    title: "Video 1",
    username: "abcd",
    likes: "3.3M",
    comments: "14K",
    userAvatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    src: "/video2.mp4",
    title: "Video 2",
    username: "efgh",
    likes: "3.3M",
    comments: "14K",
    userAvatar: "/placeholder.svg?height=32&width=32"
  },
  {
    id: 3,
    src: "/video3.mp4",
    title: "Video 3",
    username: "ijkl",
    likes: "3.3M",
    comments: "14K",
    userAvatar: "/placeholder.svg?height=32&width=32"
  },
  // Add more videos as needed
]

export default function Home() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  const nextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
  }

  const previousVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length)
  }

  const currentVideo = videos[currentVideoIndex]

  return (
    <div className="flex items-center justify-center bg-background">
      <VideoPlayer
        videoSrc={currentVideo.src}
        title={currentVideo.title}
        username={currentVideo.username}
        likes={currentVideo.likes}
        comments={currentVideo.comments}
        userAvatar={currentVideo.userAvatar}
        onNextVideo={nextVideo}
        onPreviousVideo={previousVideo}
      />
    </div>
  )
}

