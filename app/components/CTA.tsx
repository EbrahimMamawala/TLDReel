import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to learn something quick ?</h2>
            <p className="mx-auto max-w-[700px] text-primary-foreground/90 md:text-xl">
              Join thousands of satisfied customers and take your productivity to the next level.
            </p>
          </div>
          <div className="space-x-4">
            <Button size="lg" variant="secondary">
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

