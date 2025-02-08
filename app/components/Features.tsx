import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {Route, Film, FileQuestion } from "lucide-react"

export default function Features() {
  const features = [
    {
      title: "Short Video Lessons",
      description: "Videos designed for quick and efficient learning, ensuring users grasp concepts without lengthy lectures.",
      icon: Film,
    },
    {
      title: "Structured Learning Roadmap",
      description: "Guided step-by-step learning path to help users navigate through topics in a structured manner.",
      icon: Route,
    },
    {
      title: "Interactive Quizzes",
      description: "Engaging quizzes to reinforce learning and test understanding.",
      icon: FileQuestion,
    },
  ]

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-thin tracking-tighter sm:text-6xl text-center mb-12 flex justify-center items-center space-x-2">
          Key &nbsp;
          <Button
            variant="outline"
            className="rounded-full bg-transparent border-purple-700 text-3xl sm:text-6xl font-thin h-12 sm:h-16 cursor-default text-[#8161FF] sm:hover:text-white sm:hover:bg-[#8161FF]"
          >
            Features
          </Button>
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

