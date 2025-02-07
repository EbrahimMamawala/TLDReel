"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TopicButton } from "@/app/components/TopicButton"
import { BookIcon as BookQuiz, Play, Map } from "lucide-react"

// Simulating backend data
const TOPICS = [
  ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"],
  ["History", "Geography", "Economics", "Politics", "Sociology"],
  ["Literature", "Art", "Music", "Philosophy", "Psychology"],
]

export default function TopicSelection() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]))
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-col h-screen justify-center mx-auto">
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-bold mb-5">Choose the topics that you want us to cover</h1>

          <div className="grid gap-6">
            {TOPICS.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-4">
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
            ))}
          </div>

          <div className="relative w-full max-w-6xl mx-auto">
            <Input placeholder="Add additional topics..." className="pr-24 h-14" />
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button size="lg" variant="outline" className="gap-2">
              <BookQuiz className="h-5 w-5" />
              Quiz
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Play className="h-5 w-5" />
              Watch Videos
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Map className="h-5 w-5" />
              Generate Roadmap
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

