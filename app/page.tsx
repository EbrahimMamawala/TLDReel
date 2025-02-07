import Header from "./components/Header"
import Hero from "./components/Hero"
import Features from "./components/Features"
import UseCases from "./components/UseCases"
import CTA from "./components/CTA"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <UseCases />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

