"use client"

import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { DashboardMockup } from "@/components/DashboardMockup"
import { GoogleAuthButton } from "@/components/GoogleAuthButton"
import { Button } from "@/components/ui/Button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const features = [
  "Real-time sync with Google Classroom",
  "AI-powered assignment summaries",
  "Smart deadline prioritization",
  "One-click study plan generation",
]

export function ProductPreview() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section id="preview" className="py-20 lg:py-32 bg-gradient-to-b from-orange-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <AnimatedSection>
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
              Product Preview
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900">
              Your assignments, finally organized
            </h2>
            <p className="mt-4 text-lg text-dark-600 mb-8">
              See everything at a glance. Know what's urgent, what's coming up, 
              and exactly how to tackle each assignment.
            </p>

            {/* Feature List */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span className="text-dark-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <GoogleAuthButton variant="primary" />
              <Button variant="outline" onClick={scrollToTop}>
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </AnimatedSection>

          {/* Right Content - Dashboard Mockup */}
          <AnimatedSection delay={0.2}>
            <DashboardMockup />
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
