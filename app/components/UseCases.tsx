import { Briefcase, GraduationCap, Handshake, BookOpen } from "lucide-react"

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
    examples: [
      "Video content on topics like digital marketing and team leadership",
      "Explanation on business concepts",
    ],
  },
  {
    title: "Teachers",
    description: "Teachers can use the platform to create dynamic, personalized learning experiences for students",
    icon: BookOpen,
    examples: ["Interactive quizzes", "Develop engaging, curriculum-aligned content across various subjects"],
  },
]

export function UseCases() {
  return (
    <section className="py-16 bg-gray-50 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold inline-flex items-center gap-2">
            Use <span className="bg-purple-100 text-purple-600 px-4 py-1 rounded-full">Cases</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {cases.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-50 p-3 rounded-xl">
                  <item.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.examples.map((example, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

