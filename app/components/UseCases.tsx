import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Briefcase, Stethoscope, Scale } from "lucide-react"

export default function UseCases() {
  const cases = [
    {
      title: "Education",
      description: "Perfect for students and educators, from K-12 to higher education.",
      icon: GraduationCap,
      examples: ["Interactive learning materials", "Personalized study guides", "Exam preparation"],
    },
    {
      title: "Corporate Training",
      description: "Streamline employee onboarding and professional development.",
      icon: Briefcase,
      examples: ["Company policies and procedures", "Compliance training", "Skill development courses"],
    },
    {
      title: "Healthcare",
      description: "Simplify complex medical information for professionals and patients.",
      icon: Stethoscope,
      examples: ["Patient education materials", "Medical procedure explanations", "Healthcare professional training"],
    },
    {
      title: "Legal",
      description: "Make legal documents more accessible and understandable.",
      icon: Scale,
      examples: ["Terms and conditions visualization", "Legal document simplification", "Policy explanations"],
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

