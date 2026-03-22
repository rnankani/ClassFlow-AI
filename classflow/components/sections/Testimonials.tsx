"use client"

import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "I went from missing deadlines every week to finishing assignments early. ClassFlow completely changed how I manage school.",
    author: "Sarah M.",
    role: "AP Student, Junior Year",
    initials: "SM",
  },
  {
    quote:
      "The AI summaries actually help me understand what my teachers want. My grades improved within the first month.",
    author: "James K.",
    role: "College Freshman",
    initials: "JK",
  },
  {
    quote:
      "Finally, a tool that was made for students. It doesn't just show me my work — it helps me get through it.",
    author: "Emily R.",
    role: "High School Senior",
    initials: "ER",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-primary-600 font-semibold text-sm tracking-wider mb-4">
            TESTIMONIALS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 tracking-tight">
            Students are loving it
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <AnimatedSection key={t.author} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col rounded-2xl border border-dark-200/80 bg-dark-50 p-6 lg:p-8 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300"
              >
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-dark-700 leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-dark-200/60">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-dark-900 text-sm">
                      {t.author}
                    </p>
                    <p className="text-xs text-dark-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
