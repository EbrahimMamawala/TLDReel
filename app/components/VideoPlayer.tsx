"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface VideoPlayerProps {
  videoSrc: string;
  title: string;
  onNextVideo: () => void;
  onPreviousVideo: () => void;
}

const VideoPlayer = ({
  videoSrc,
  onNextVideo,
  onPreviousVideo,
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [videoSrc]);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        onNextVideo();
      } else if (event.deltaY < 0) {
        onPreviousVideo();
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [onNextVideo, onPreviousVideo]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full max-w-[400px] mx-auto h-[calc(100vh-4rem)]">
      <div className="relative h-full rounded-lg overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-cover"
          loop
          suppressHydrationWarning
          onClick={togglePlay}
        />

        {/* Top controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-center">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/50 hover:bg-black/75 text-white"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/50 hover:bg-black/75 text-white"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </Button>
          </div>
        </div>

        {/* Right side controls */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 hover:bg-black/75 text-white"
            onClick={onPreviousVideo}
          >
            <ChevronUp size={24} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 hover:bg-black/75 text-white"
            onClick={onNextVideo}
          >
            <ChevronDown size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default dynamic (() => Promise.resolve(VideoPlayer), {ssr: false})
