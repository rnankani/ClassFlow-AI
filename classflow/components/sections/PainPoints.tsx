"use client"

import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { Card } from "@/components/ui/Card"
import { 
  Layers, 
  AlertTriangle, 
  FileQuestion, 
  BrainCircuit,
  Laptop 
} from "lucide-react"

const painPoints = [
  {
    icon: Layers,
    title: "Too Many Assignments",
    description: "Juggling work across multiple classes with no central view of what's due when.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: AlertTriangle,
    title: "Missed Deadlines",
    description: "Forgetting about assignments until it's too late, leading to rushed work and stress.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: FileQuestion,
    title: "Confusing Instructions",
    description: "Spending more time trying to understand the assignment than actually doing it.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: BrainCircuit,
    title: "Decision Fatigue",
    description: "Not knowing what to work on first when everything feels equally important.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Laptop,
    title: "Tools That Don't Help",
    description: "School portals show your work but don't actually help you get it done.",
    color: "bg-gray-100 text-gray-600",
  },
]

export function PainPoints() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
            The Problem
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900">
            School shouldn't feel this hard
          </h2>
          <p className="mt-4 text-lg text-dark-600 max-w-2xl mx-auto">
            Students are overwhelmed by fragmented tools and unclear priorities. 
            Here's what we hear every day.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <AnimatedSection key={point.title} delay={index * 0.1}>
              <Card className="h-full">
                <div className={`w-12 h-12 ${point.color} rounded-xl flex items-center justify-center mb-4`}>
                  <point.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-dark-900 mb-2">{point.title}</h3>
                <p className="text-dark-600">{point.description}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
