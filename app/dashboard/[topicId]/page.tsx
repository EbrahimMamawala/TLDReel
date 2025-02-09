"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TopicButton } from "@/app/components/TopicButtons"
import { BookIcon as BookQuiz, Play, Map } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { LanguageSelector } from "@/app/components/language-selector"

const topics = {
  easy: [
    "Basic HTML and CSS for web design",
    "Introduction to JavaScript programming",
    "Setting up a development environment with tools like VS Code",
    "Version control with Git and GitHub",
    "Introduction to responsive web design principles"
  ],
  medium: [
    "Working with APIs and fetching data in frontend applications",
    "Using modern JavaScript frameworks like React or Vue",
    "Styling web applications with CSS preprocessors like SASS or LESS",
    "Understanding and implementing state management in frontend applications",
    "Testing frontend code using tools like Jest or Cypress"
  ],
  difficult: [
    "Implementing advanced animations with CSS and JavaScript",
    "Optimizing website performance using webpack and code splitting",
    "Creating complex responsive layouts with flexbox and CSS grid",
    "Building accessible web interfaces with ARIA and WCAG guidelines",
    "Implementing server-side rendering and SSR optimization"
  ]
};

export default function TopicSelection({ params }: { params: { topicId: string } }) {
  const router = useRouter();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [additionalTopic, setAdditionalTopic] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]));
  };

  const handleButtonClick = (endpoint: string) => {
    const allTopics = [...selectedTopics, additionalTopic].filter(topic => topic.trim() !== "");
    router.push(`/dashboard/${params.topicId}/${endpoint}`);
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
            <Button size="default" variant="outline" className="gap-2" onClick={() => handleButtonClick("quiz")}>
              <BookQuiz className="h-4 w-4" />
              Quiz
            </Button>
            <Button size="default" variant="outline" className="gap-2" onClick={() => handleButtonClick("video")}>
              <Play className="h-4 w-4" />
              Watch Videos
            </Button>
            <Button size="default" variant="outline" className="gap-2" onClick={() => handleButtonClick("roadmap")}>
              <Map className="h-4 w-4" />
              Generate Roadmap
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}