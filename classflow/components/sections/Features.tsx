"use client"

import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import {
  RefreshCcw,
  AlertCircle,
  Sparkles,
  ListChecks,
  BrainCircuit,
  Target,
} from "lucide-react"

const features = [
  {
    icon: RefreshCcw,
    title: "Auto-Sync with Google Classroom",
    description:
      "Connect once and every class, assignment, and deadline flows in automatically. Always up to date, zero manual entry.",
    span: "md:col-span-2",
    iconBg: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: AlertCircle,
    title: "Urgent Work Detection",
    description:
      "AI flags what needs attention right now so you never miss another deadline.",
    span: "",
    iconBg: "bg-red-500/10 text-red-600",
  },
  {
    icon: Sparkles,
    title: "AI Assignment Breakdown",
    description:
      "Confusing instructions become clear, actionable summaries you can actually understand.",
    span: "",
    iconBg: "bg-primary-500/10 text-primary-600",
  },
  {
    icon: Target,
    title: "Today's Focus",
    description:
      "Start each day knowing exactly what to work on. No more decision fatigue about where to begin.",
    span: "md:col-span-2",
    iconBg: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: ListChecks,
    title: "Step-by-Step Checklists",
    description:
      "Every assignment becomes a checklist you can work through, one task at a time.",
    span: "",
    iconBg: "bg-green-500/10 text-green-600",
  },
  {
    icon: BrainCircuit,
    title: "Practice Quiz Generator",
    description:
      "AI creates practice questions from your materials so you can test yourself before the real thing.",
    span: "",
    iconBg: "bg-violet-500/10 text-violet-600",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-primary-600 font-semibold text-sm tracking-wider mb-4">
            FEATURES
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 tracking-tight">
            Everything you need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-500">
              stay on top
            </span>
          </h2>
          <p className="mt-5 text-lg text-dark-500 max-w-2xl mx-auto">
            ClassFlow doesn&apos;t just list your assignments&mdash;it helps you
            actually get them done.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className={`group relative h-full rounded-2xl border border-dark-200/80 bg-dark-50 p-6 lg:p-8 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300 ${feature.span}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-dark-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-dark-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
