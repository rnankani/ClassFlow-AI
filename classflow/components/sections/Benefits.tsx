"use client"

import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { Card } from "@/components/ui/Card"
import { 
  RefreshCcw, 
  AlertCircle, 
  Sparkles, 
  ListChecks, 
  BrainCircuit,
  Target 
} from "lucide-react"

const benefits = [
  {
    icon: RefreshCcw,
    title: "Google Classroom Sync",
    description: "Automatically imports all your classes and assignments. No manual entry needed.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: AlertCircle,
    title: "Urgent Work Detection",
    description: "AI prioritizes what needs your attention first, so you never miss a deadline.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: Sparkles,
    title: "AI Assignment Help",
    description: "Turns confusing instructions into simple, actionable summaries you can actually understand.",
    color: "bg-primary-100 text-primary-600",
  },
  {
    icon: ListChecks,
    title: "Action Checklists",
    description: "Breaks down complex assignments into step-by-step tasks you can check off.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: BrainCircuit,
    title: "Mini Quiz Generator",
    description: "Creates practice questions from your materials so you're ready before you submit.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Target,
    title: "Today's Focus",
    description: "Get a clear, prioritized plan for exactly what to work on right now.",
    color: "bg-orange-100 text-orange-600",
  },
]

export function Benefits() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
            The Solution
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900">
            Your AI-powered academic copilot
          </h2>
          <p className="mt-4 text-lg text-dark-600 max-w-2xl mx-auto">
            ClassFlow AI doesn't just show your assignments—it helps you actually get them done.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <AnimatedSection key={benefit.title} delay={index * 0.1}>
              <Card className="h-full group">
                <div className={`w-12 h-12 ${benefit.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-dark-900 mb-2">{benefit.title}</h3>
                <p className="text-dark-600">{benefit.description}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
