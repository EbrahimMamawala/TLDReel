import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs"

export default function Hero() {
  return (
    <section
      className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center"
      style={{ backgroundImage: "url('/HeroBackground.jpeg')" }}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-thin tracking-tighter sm:text-4xl md:text-5xl lg:text-9xl/none pb-7">
              TLDReel
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl pb-7">
              Save time and enhance learning with AI-powered video content creation. Perfect for education, corporate
              training, and more.
            </p>
          </div>
          <div className="space-x-4">
            <SignInButton mode="modal">
              <Button size="lg" variant="outline" className="rounded-full bg-transparent border-purple-700 h-16 w-64">Get Started</Button>
            </SignInButton>
          </div>
        </div>
      </div>
    </section>
  );
}
