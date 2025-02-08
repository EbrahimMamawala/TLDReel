"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TopicButton } from "@/app/components/TopicButton"
import { BookIcon as BookQuiz, Play, Map } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const TOPICS = [
  ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"],
  ["History", "Geography", "Economics", "Politics", "Sociology"],
  ["Literature", "Art", "Music", "Philosophy", "Psychology"],
]

export default function TopicSelection({ params }: { params: { topicId: string } }) {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const router = useRouter()

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]))
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col w-full max-w-4xl mx-auto">
        <div className="space-y-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            Topics you want us to cover
          </h1>

          <div className="grid gap-6">
            {TOPICS.map((row, rowIndex) => (
              <ScrollArea key={rowIndex} className="w-full whitespace-nowrap rounded-lg">
                <div className="flex justify-center space-x-4">
                  {row.map((topic) => (
                    <TopicButton
                      key={topic}
                      content={topic}
                      rowIndex={rowIndex}
                      isSelected={selectedTopics.includes(topic)}
                      onClick={() => toggleTopic(topic)}
                    />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            ))}
          </div>

          <div className="relative w-full max-w-2xl mx-auto">
            <Input placeholder="Add additional topics..." className="pr-24 h-12 w-full" />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button
              size="default"
              variant="outline"
              className="gap-2"
              onClick={() => router.push(`/dashboard/${params.topicId}/quiz`)}
            >
              <BookQuiz className="h-4 w-4" />
              Quiz
            </Button>
            <Button
              size="default"
              variant="outline"
              className="gap-2"
              onClick={() => router.push(`/dashboard/${params.topicId}/video`)}
            >
              <Play className="h-4 w-4" />
              Watch Videos
            </Button>
            <Button
              size="default"
              variant="outline"
              className="gap-2"
              onClick={() => router.push(`/dashboard/${params.topicId}/roadmap`)}
            >
              <Map className="h-4 w-4" />
              Generate Roadmap
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

