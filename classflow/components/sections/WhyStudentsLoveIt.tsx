"use client"

import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { Card } from "@/components/ui/Card"
import { 
  Heart, 
  Clock, 
  Lightbulb, 
  Zap, 
  LayoutGrid, 
  Trophy 
} from "lucide-react"

const benefits = [
  {
    icon: Heart,
    title: "Less Stress",
    description: "Finally feel in control of your workload instead of drowning in it.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: Clock,
    title: "Fewer Missed Deadlines",
    description: "Never forget an assignment again with smart reminders and priority alerts.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Lightbulb,
    title: "Clearer Understanding",
    description: "AI breaks down confusing instructions so you know exactly what's expected.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: Zap,
    title: "Faster Study Prep",
    description: "Generate practice quizzes and study guides in seconds, not hours.",
    color: "bg-primary-100 text-primary-600",
  },
  {
    icon: LayoutGrid,
    title: "Better Organization",
    description: "All your classes, assignments, and deadlines in one beautiful dashboard.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Trophy,
    title: "More Confidence",
    description: "Walk into every assignment knowing you're prepared and on track.",
    color: "bg-purple-100 text-purple-600",
  },
]

export function WhyStudentsLoveIt() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
            Student Benefits
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900">
            Why students actually love this
          </h2>
          <p className="mt-4 text-lg text-dark-600 max-w-2xl mx-auto">
            It's not just about features. It's about how ClassFlow AI makes you feel.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <AnimatedSection key={benefit.title} delay={index * 0.1}>
              <Card className="h-full group">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-12 h-12 ${benefit.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <benefit.icon className="w-6 h-6" />
                </motion.div>
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
