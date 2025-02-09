import { MapIcon, PlayCircle, HelpCircle } from "lucide-react"

export function Features() {  // Remove the ** around Features
  const features = [
    {
      title: "Short Video Lessons",
      description:
        "Bite-sized, high-quality videos designed for quick and efficient learning, ensuring users grasp concepts without lengthy lectures.",
      icon: PlayCircle,
      highlight: "quick and efficient learning",
    },
    {
      title: "Structured Learning Roadmaps",
      description: "Guided step-by-step learning paths that help users navigate through topics in a structured manner.",
      icon: MapIcon,
      highlight: "structured manner",
    },
    {
      title: "Interactive Quizzes",
      description: "Engaging quizzes to test users' understanding, providing immediate feedback and explanations.",
      icon: HelpCircle,
      highlight: "Engaging quizzes",
    },
  ]

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">  {/* Remove *asterisks* around className */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold inline-flex items-center gap-2">
            Key <span className="bg-purple-100 text-purple-600 px-4 py-1 rounded-full">Features</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex gap-6 items-start ${index === features.length - 1 ? "md:col-span-2 md:max-w-2xl md:mx-auto" : ""}`}
            >
              <div className="bg-purple-50 p-3 rounded-2xl">
                <feature.icon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description.split(feature.highlight).map((part, i, arr) => (
                    <span key={i}>
                      {i === arr.length - 1 ? (
                        part
                      ) : (
                        <>
                          {part}
                          <span className="text-purple-600">{feature.highlight}</span>
                        </>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}