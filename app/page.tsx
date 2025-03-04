import Header from "./components/Header"
import Hero from "./components/Hero"
import { Features } from "./components/Features"
import { UseCases } from "./components/UseCases"
import { Footer } from "./components/Footer"
import Team from "./components/Team"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <UseCases />
        <Team />
      </main>
      <Footer />
    </div>
  )
}

