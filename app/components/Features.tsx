import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Shield, BarChart } from "lucide-react"

export default function Features() {
  const features = [
    {
      title: "Lightning Fast",
      description: "Our platform is optimized for speed, ensuring quick load times and responsive interactions.",
      icon: Zap,
    },
    {
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security measures and regular backups.",
      icon: Shield,
    },
    {
      title: "Powerful Analytics",
      description: "Gain valuable insights with our comprehensive analytics and reporting tools.",
      icon: BarChart,
    },
  ]

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
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

