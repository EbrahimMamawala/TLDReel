"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TopicButton } from "@/app/components/TopicButtons"
import { BookIcon as BookQuiz, Play, Map } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { LanguageSelector } from "@/app/components/language-selector"

export default function TopicSelection({ params }: { params: { topicId: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [topics, setTopics] = useState({ easy: [], medium: [], difficult: [] });
  const [additionalTopic, setAdditionalTopic] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    const topicsFromParams = searchParams.get("topics");
    if (topicsFromParams) {
      try {
        setTopics(JSON.parse(decodeURIComponent(topicsFromParams)));
      } catch (error) {
        console.error("Failed to parse topics:", error);
      }
    }
  }, [searchParams]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]));
  };

  const handleQuizButtonClick = async () => {
    const allTopics = [...selectedTopics, additionalTopic].filter(topic => topic.trim() !== "");
    const response = await fetch('/generate-quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topicId: params.topicId, topics: allTopics, language: selectedLanguage }),
    });
    router.push(`/dashboard/${params.topicId}/quiz`);
  };

  const handleRoadmapButtonClick = async () => {
    const allTopics = [...selectedTopics, additionalTopic].filter(topic => topic.trim() !== "");
    const response = await fetch('/generate-roadmap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topicId: params.topicId, topics: allTopics}),
    });
    router.push(`/dashboard/${params.topicId}/roadmap`);
  };

  const handleVideoButtonClick = async () => {
    const allTopics = [...selectedTopics, additionalTopic].filter(topic => topic.trim() !== "");
    const response = await fetch('/generate-video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topicId: params.topicId, topics: allTopics, language: selectedLanguage }),
    });
    router.push(`/dashboard/${params.topicId}/video`);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <LanguageSelector selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
      </div>
      <div className="flex flex-col w-full max-w-4xl mx-auto">
        <div className="space-y-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            Topics you want us to cover
          </h1>

          <div className="grid gap-6">
            {Object.entries(topics).map(([difficulty, topicList]) => (
              <ScrollArea key={difficulty} className="w-full whitespace-nowrap rounded-lg">
                <div className="flex justify-center space-x-4">
                  {topicList.map((topic) => (
                    <TopicButton
                      key={topic}
                      content={topic}
                      rowIndex={difficulty}
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
            <Input 
              placeholder="Add additional topics..." 
              className="pr-24 h-12 w-full" 
              value={additionalTopic}
              onChange={(e) => setAdditionalTopic(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button
              size="default"
              variant="outline"
              className="gap-2"
              onClick={handleQuizButtonClick}
            >
              <BookQuiz className="h-4 w-4" />
              Quiz
            </Button>
            <Button
              size="default"
              variant="outline"
              className="gap-2"
              onClick={handleVideoButtonClick}
            >
              <Play className="h-4 w-4" />
              Watch Videos
            </Button>
            <Button
              size="default"
              variant="outline"
              className="gap-2"
              onClick={handleRoadmapButtonClick}
            >
              <Map className="h-4 w-4" />
              Generate Roadmap
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
