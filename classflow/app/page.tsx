import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/sections/Hero"
import { ProblemStatement } from "@/components/sections/ProblemStatement"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { FeatureShowcase } from "@/components/sections/FeatureShowcase"
import { SeeItInAction } from "@/components/sections/SeeItInAction"
import { LiveDemo } from "@/components/sections/LiveDemo"
import { UserPersonas } from "@/components/sections/UserPersonas"
import { Integrations } from "@/components/sections/Integrations"
import { Roadmap } from "@/components/sections/Roadmap"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ProblemStatement />
      <HowItWorks />
      <FeatureShowcase />
      <SeeItInAction />
      <LiveDemo />
      <UserPersonas />
      <Integrations />
      <Roadmap />
      <FinalCTA />
      <Footer />
    </main>
  )
}
