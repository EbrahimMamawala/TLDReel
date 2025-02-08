import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Briefcase, BookOpen, Handshake } from "lucide-react"

export default function UseCases() {
  const cases = [
    {
      title: "Professional Skills Transition",
      description: "Mid-career professionals can create structured learning journeys to switch industries",
      icon: Briefcase,
      examples: ["Interactive learning materials", "Personalized study guides", "Bite sized explainer videos"],
    },
    {
      title: "High School Students",
      description: "Explore advanced subjects beyond standard curriculum as well as learn new skills.",
      icon: GraduationCap,
      examples: ["Gamified quizzes", "Validate understanding", "Maintain learning motivation through bite-sized videos"],
    },
    {
      title: "Small Business Owner",
      description: "Training Entrepreneurs improve specific business skills.",
      icon: Handshake,
      examples: ["Video content on topics like digital marketing and team leadership", "Explanation on business concepts"],
    },
    {
      title: "Teachers",
      description: "Teachers can use the platform to create dynamic, personalized learning experiences for students",
      icon: BookOpen,
      examples: ["Interactive quizzes", "Develop engaging, curriculum-aligned content across various subjects"],
    },
  ]

  return (
    <section id="use-cases" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Use Cases</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cases.map((useCase, index) => (
            <Card key={index}>
              <CardHeader>
                <useCase.icon className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>{useCase.title}</CardTitle>
                <CardDescription>{useCase.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1">
                  {useCase.examples.map((example, i) => (
                    <li key={i}>{example}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

