import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Transform PDFs into Interactive Videos
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Save time and enhance learning with AI-powered video content creation. Perfect for education, corporate
              training, and more.
            </p>
          </div>
          <div className="space-x-4">
            <Button size="lg">Start Free Trial</Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">50%</span>
              <span className="text-sm text-gray-500">Time Saved</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">10+</span>
              <span className="text-sm text-gray-500">Languages Supported</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">1M+</span>
              <span className="text-sm text-gray-500">Users Worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

